var assert = require("assert");
var call = require("./helpers/call");


describe('semversionizer-cli', function() {
  describe('semver-compare', function() {

    it("gt success", function(done) {
      call("./bin/compare.js", ["1.0.0", "gt", "1.0.0-beta"], function(err, exitCode, data) {
        assert.equal(exitCode, 0);
        assert.equal(data, "true");
        done();
      });
    });

    it("gt fail", function(done) {
      call("./bin/compare.js", ["1.0.0-beta", "gt", "1.0.0"], function(err, exitCode, data) {
        assert.equal(exitCode, 1);
        assert.equal(data, "false");
        done();
      });
    });

    it("lt success", function(done) {
      call("./bin/compare.js", ["1.0.0-beta", "lt", "1.0.0"], function(err, exitCode, data) {
        assert.equal(exitCode, 0);
        assert.equal(data, "true");
        done();
      });
    });

    it("lt fail", function(done) {
      call("./bin/compare.js", ["1.0.0", "lt", "1.0.0-beta"], function(err, exitCode, data) {
        assert.equal(exitCode, 1);
        assert.equal(data, "false");
        done();
      });
    });

    it("eq success", function(done) {
      call("./bin/compare.js", ["1.0.0", "eq", "1.0.0"], function(err, exitCode, data) {
        assert.equal(exitCode, 0);
        assert.equal(data, "true");
        done();
      });
    });

    it("eq fail", function(done) {
      call("./bin/compare.js", ["1.0.0", "eq", "2.0.0"], function(err, exitCode, data) {
        assert.equal(exitCode, 1);
        assert.equal(data, "false");
        done();
      });
    });

  });
});

