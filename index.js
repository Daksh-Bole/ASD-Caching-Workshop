const fs = require('fs');
const path = require("path");

const dataPath = path.join(__dirname, 'data.json');

const data = fs.readFileSync(dataPath, 'utf8');
console.log(data);


