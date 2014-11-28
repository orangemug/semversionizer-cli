#!/usr/bin/env node
var yargs  = require("yargs");
var parser = require("semversionizer-parser");

var argv = yargs
  .usage('Usage: $0 [semver]')
  .example('$0 1.1.3-beta+build23', 'Parses a semver')
  .describe("loose", "Loose semver matching which supports incomplete '1' and '1.2' versions")
  .demand(1)
  .argv;

var out = parser(argv._[0]);

if(!out) {
  process.exit(1);
}

console.log(JSON.stringify(out, null, "  "));
process.exit(0);
