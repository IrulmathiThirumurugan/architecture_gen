const fs = require('fs');
const path = require('path');
const { parseArchmark } = require('../dsl/parser');

const filePath = process.argv[2];

if (!filePath) {
  console.error('❌ Usage: node cli/index.js <path-to-arch-file>');
  process.exit(1);
}

const fullPath = path.resolve(filePath);
const rawDSL = fs.readFileSync(fullPath, 'utf-8');
const parsed = parseArchmark(rawDSL);

console.log(JSON.stringify(parsed, null, 2));
