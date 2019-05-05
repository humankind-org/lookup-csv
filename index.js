#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const HashArray = require('hasharray');
const Treeize = require('treeize');

/**
   * Build a JSON hasharray from a CSV file for fast lookups in memory
   * Uses https://www.npmjs.com/package/treeize to convert every row of the CSV to a JSON tree
   * Uses https://www.npmjs.com/package/hasharray to build a fast lookup array
   * @param {string} filePath - Path to a CSV file to lookup
   * @param {Array} keyfields - Column names to use for lookup
   * @return {Object} A hasharray object
   */

function csvLookup(filePath, keyfields) {
  // Open a CSV stream of the matching spreadsheet
  const csvStream = fs.readFileSync(path.join(__dirname, filePath), 'utf8').split('\r');

  // Split CSV into array of strings and convert into a json object array
  const csvsplit = csvStream.map(line => line.split(','));
  const headers = csvsplit[0];

  const jsonArrObj = csvsplit.splice(1).map((line) => {
    const jsonObj = {};

    for (let i = 0; i < headers.length; i += 1) {
      // Convert enumerable object keys into arrays
      const key = headers[i].split('.');
      if (!Number.isNaN(parseInt(key.slice(-1)[0], 10))) {
        if (!parseInt(key.slice(-1)[0], 10)) {
          // Initialize an array for the tags
          jsonObj[key.slice(0, -1).join('.')] = [];
        }
        jsonObj[key.slice(0, -1).join('.')].push(line[i].trim());
      } else {
        jsonObj[headers[i]] = line[i].trim();
      }
    }

    return jsonObj;
  });

  //  Hash the CSV array json tree with given key

  const treeize = new Treeize();
  const treeizeOptions = {
    input: {
      detectCollections: false, // when true, plural path segments become collections
      delimiter: '.',
    },
    output: {
      // prune: true,
      uniformRows: false,
    },
  };

  const jsonTree = treeize.setOptions(treeizeOptions).grow(jsonArrObj).getData();
  const hashArray = new HashArray(keyfields).addAll(jsonTree);

  return hashArray;
}

module.exports = csvLookup;
