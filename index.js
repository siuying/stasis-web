'use strict';

const invariant = require('invariant')
const Crawler = require('simplecrawler')
const fs = require('node-fs')
const Spinner = require('cli-spinner').Spinner
const sprintf = require('sprintf')
const url = require('url')
const path = require('path')
const http = require('http')

module.exports = function (address, staticDirectory, callback, debug) {
  invariant(typeof address === 'string', '`address` must be a string')
  invariant(typeof staticDirectory === 'string', '`staticDirectory` must be a string')
  invariant(typeof callback === 'function', '`callback` must be a function')
  invariant(typeof debug === 'function', '`debug` must be a function')

  // configure the crawler
  const crawler = new Crawler(address)
  crawler.stripQuerystring = true

  // Make sure the user knows that we're doing something
  const spinner = new Spinner('Fetching … %s')
  spinner.setSpinnerString('|/-\\')

  // Set to crawl entire domain
  crawler.addFetchCondition((queueItem, referrerQueueItem, callback) => {
    callback(null, referrerQueueItem.host === crawler.host)
  })

  // When a file is received, save file in the appropriate place
  crawler.on('fetchcomplete', function (queueItem, responseBuffer, response) {
    let parsed = url.parse(queueItem.url)

    if (parsed.pathname.slice(-1) === '/') {
      parsed.pathname += 'index.html';
    }

    let dirname = staticDirectory + path.dirname(parsed.pathname)
    let filepath = staticDirectory + parsed.pathname

    // Check if DIR exists
    fs.exists(dirname, function (exists) {

      // If DIR exists, write file
      if (exists) {
        fs.writeFile(filepath, responseBuffer, function () {
          debug(sprintf('writeFile %s', filepath));
        });

      // Else, recursively create dir using node-fs, then write file
      } else {
        fs.mkdir(dirname, '0755', true, function () {
          debug(sprintf('mkdir %s', dirname));

          fs.writeFile(filepath, responseBuffer, function () {
            debug(sprintf('writeFile %s', filepath));
          });
        });
      }
    });

    debug(sprintf('fetchcomplete %s, %d bytes, %s, %s', parsed.pathname, responseBuffer.length, filepath, response.headers['content-type']));
  });

  // error out if the local domain server isn't running
  crawler.on('fetchclienterror', function (item, error) {
    // stop crawling
    this.stop();
    spinner.stop();

    callback(new Error(`${item} not accessible: ${error}`));
  });

  // return success message on complete
  crawler.on('complete', function () {
    spinner.stop();
    callback('success');
  });

  // start crawling
  crawler.start();
  spinner.start();
}