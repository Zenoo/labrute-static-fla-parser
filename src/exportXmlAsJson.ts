import fs from 'fs';
import convert from 'xml-js';
import { parseJson } from './parseJson';
import { Symbol } from './common';

const jsons: Record<string, string> = {};

// Go through all files in /xml folder and get their JSON representation
const convertXMLtoJSON = (dir: string) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = `${dir}/${file}`;

    // Ignore non-XML files
    if (!filePath.endsWith('.xml')) return;

    // Read XML file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const splitFilePath = filePath.split('/');
    const symbol = splitFilePath[splitFilePath.length - 1].split('.')[0];

    // Convert XML to JSON
    const json = convert.xml2json(fileContent);

    // Store JSON in memory
    jsons[symbol] = json;
  };
};

convertXMLtoJSON('./src/xml');

// Empty the /json folder
fs.readdirSync('./src/json').forEach((file) => {
  fs.unlinkSync(`./src/json/${file}`);
}); 

// Go through all JSON strings and create JSON files
Object.entries(jsons).forEach(([symbol, json]) => {
  if (!json) {
    console.log(`No JSON found for ${symbol}`);
    return;
  }

  // Create subfolder if needed
  if (!fs.existsSync('./src/json')) {
    fs.mkdirSync('./src/json');
  }

  // Write JSON file
  fs.writeFileSync(`./src/json/${symbol.split(' ').join('')}.json`, JSON.stringify(parseJson(json), null, 2));
});

// Empty the /symbols folder
fs.readdirSync('./src/symbols').forEach((file) => {
  fs.unlinkSync(`./src/symbols/${file}`);
});

// Export JSON files as .ts files
const files = fs.readdirSync('./src/json');

for (const file of files) {
  const filePath = `./src/json/${file}`;
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const symbol = JSON.parse(fileContent) as Symbol;
  
  const dependencies = new Set<string>();

  // Replace parts with their name
  symbol.parts?.forEach((part) => {
    // If the part is a symbol
    if (part.type === 'symbol') {
      // Add the symbolItem to the dependencies
      dependencies.add(part.name);

      // Add replace tag to the name
      part.name = `REPLACE|${part.name}|REPLACE`;
    }
  });

  let stringifiedSymbol = JSON.stringify(symbol, null, 2);

    // Replace `"type": "symbol", "name": "REPLACE|{name}|REPLACE"` with `...{name}`
  stringifiedSymbol = stringifiedSymbol.replace(/"type": "symbol",\n\s+"name": "REPLACE\|(.*)\|REPLACE"/g, '...$1');

  const newFileContent = `import { Symbol } from '../common';
${[...dependencies].map((dependency) => `import { ${dependency.split(' ').join('')} } from './${dependency}';`).join('\n')}

export const ${symbol.name.split(' ').join('')}: Symbol = ${stringifiedSymbol};`;

  // Write Typescript file
  fs.writeFileSync(`./src/symbols/${file.split('.')[0]}.ts`, newFileContent);
};

// Create index.ts file
let indexFileContent = files.map((file) => `export { ${file.split('.')[0]} } from './${file.split('.')[0]}';`).join('\n');

// Write index.ts file
fs.writeFileSync('./src/symbols/index.ts', indexFileContent);