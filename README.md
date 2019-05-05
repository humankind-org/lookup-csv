# csv-lookup

A node module to quickly search and lookup rows from a csv file

### Installation

Install module `npm i csv-lookup`

```js
const csvlookup = require('csv-lookup');

// Create a lookup table using lookup column name to use from the csv data
const lookupTable = csvLookup('./path/to.csv', [['lookup-col-name']])

// Get all mathing rows in the csv where the lookup column has the lookup value
matchingRows = lookupTable.getAll('col-value')
```

Lookup results are formatted as an array of JSON rows