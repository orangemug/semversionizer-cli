var assert = require("assert");
var call = require("./helpers/call");

describe('semversionizer-cli', function() {
  describe('semver-parse', function() {
    it("should return exit code 1 for invalid semver", function(done) {

      call("./bin/parse.js", ["1.2.3-beta+build23"], function(err, exitCode, data) {
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

      call("./bin/parse.js", ["1.2"], function(err, exitCode, data) {
        assert.equal(exitCode, 1);
        done();
      });

    });
  });
});

