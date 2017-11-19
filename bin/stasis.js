#!/usr/bin/env node

const trap = require('../')
const cli = require('cli')
const path = require('path')

cli.parse({
  address: [ 'a', 'address to fetch web page', 'string'],
  directory: [ 'd', 'directory to write the pages locally', 'file', './static' ]
})

cli.main((args, options) => {
  if (!options.address) {
    console.log("Usage: stasis -a url -d directory")
    return
  }

  trap(options.address, options.directory, function(e){
    console.log(e)
  })
})
