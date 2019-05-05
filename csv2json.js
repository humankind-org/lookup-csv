#!/usr/bin/env node

const Treeize = require('treeize')

/**
 * Convert each object into a tree
 * @param  {} jsonArrObj Array of onject
 */
function treeizeJson (jsonArrObj) {
  const treeize = new Treeize()
  treeize.setOptions({
    input: {
      detectCollections: false, // when true, plural path segments become collections
      delimiter: '.'
    },
    output: {
    // prune: true,
      uniformRows: true
    }
  }).grow(jsonArrObj)

  return treeize.getData()
}

module.exports = treeizeJson
