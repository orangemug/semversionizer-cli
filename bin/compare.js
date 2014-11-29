#!/usr/bin/env node
var yargs  = require("yargs");
var compare = require("semversionizer-comparison");

var argv = yargs
  .usage("Usage: $0 [semver] [operator] [semver]\n\n\
Avaliable operators:\n\
  lt    less than\n\
  lte   less than or equal to\n\
  eq    equal to\n\
  gte   greater than or equal to\n\
  gt    greater than\n")
  .example("$0 1.0.1-beta lt 1.0.1', 'Check if semver '1.0.1-beta' is less than '1.0.1' ")
  .demand(3)
  .argv;

var ops = {
  "lt":  [-1],
  "lte": [-1, 0],
  "eq":  [ 0],
  "gte": [ 0, 1],
  "gt":  [ 1]
};

var s1 = argv._[0];
var op = argv._[1];
var s2 = argv._[2];

if(ops[op] === undefined) {
  throw op+" is not a valid operator";
}

var out = compare(s1, s2);

if(ops[op].indexOf(out) > -1) {
  console.log("true");
  process.exit(0);
}

console.log("false");
process.exit(1);
