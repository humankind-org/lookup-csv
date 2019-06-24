# lookup-csv
A node module to quickly search and lookup rows from a csv file using [treeize](https://www.npmjs.com/package/treeize) and [hasharray](https://www.npmjs.com/package/hasharray).

### Installation

Install module `npm i lookup-csv`

```js
const lookupCSV = require('lookup-csv');

// Create a lookup table using lookup column name to use from the csv data
const lookupTable = lookupCSV('./path/to.csv', [['lookup-col-name']])

// Get all mathing rows in the csv where the lookup column has the lookup value
matchingRows = lookupTable.getAll('col-value')
```

Lookup results are formatted as an array of JSON rows
