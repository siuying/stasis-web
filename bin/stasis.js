#!/usr/bin/env node

const trap = require('../')
const debug = require('debug')("trap")
const cli = require('cli')

const options = cli.parse({
  address: [ 'a', 'address to fetch web page', 'string'],
  directory: [ 'd', 'directory to write the pages locally', 'file', './static' ]
})

if (!options.address) {
  console.log("you must provide address to fetch")
  process.exit(1)
}

trap(options.address, options.directory, function(e){
  console.log(e)
}, debug)