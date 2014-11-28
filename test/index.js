var assert = require("assert");
var spawn  = require("child_process").spawn;

function call(cmd, opts, done) {
  var data = "";
  var ps = spawn(cmd, opts);
  ps.stdout.on("data", function(d) { data += d; });
  ps.stderr.on("data", function(d) { data += d; });

  ps.on("close", function() {
    data = data.replace(/^\s+|\s+$/g, "");
    done(undefined, ps.exitCode, data);
  });
}

describe('semversionizer-cli', function() {
  it("should return exit code 1 for invalid semver", function(done) {

    call("./bin/cmd.js", ["1.2.3-beta+build23"], function(err, exitCode, data) {
      var out = JSON.stringify({
        "major": 1,
        "minor": 2,
        "patch": 3,
        "prerelease": ["beta"],
        "build": ["build23"]
      }, null, "  ");

      assert.equal(exitCode, 0);
      assert.equal(data, out);
      done();
    });

  });

  it("should return exit code 0 and stdout description for a valid semver", function(done) {

    call("./bin/cmd.js", ["1.2"], function(err, exitCode, data) {
      assert.equal(exitCode, 1);
      done();
    });

  });
});

