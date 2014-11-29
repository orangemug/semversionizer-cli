var spawn = require("child_process").spawn;

module.exports = function(cmd, opts, done) {
  var data = "";
  var ps = spawn(cmd, opts);
  ps.stdout.on("data", function(d) { data += d; });
  ps.stderr.on("data", function(d) { data += d; });

  ps.on("close", function() {
    data = data.replace(/^\s+|\s+$/g, "");
    done(undefined, ps.exitCode, data);
  });
};
