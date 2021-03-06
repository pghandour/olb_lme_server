const fs = require('fs');
const himalaya = require('himalaya');
const removeWhitespace = require('./removeWhitespace.js');
const restructureNodes = require('./restructureNodes.js');
const filterNodes = require('./filterNodes.js');
const generateJson = require('./generateJson.js');

/**
  Convert HTML file to a useable JSON file involves 6 steps:
    1. Using fs module to read the HTML file.
    2. Using a tool called "himalaya" to convert HTML file to JSON file.
    3. Remove whitespaces and keep only "element" type of nodes
    4. Restructure the current JSON file to make all nodes at the same level
    5. Filter all nodes to keep only the nodes having "data-name" attribute
    6. Generate a more compact and usable JSON file with "tagName" and "data-name"
      
    Example of the final JSON file:
    [
      {
        "tagName": "button",
        "data-name": "button1"
      }
    ]

 */
function convertHtml2Json(templateName, lob, category, imagePath) {
  const templatePath = `./uploads/${templateName}`;
  const jsonName = `${templateName.slice(0, -5)}.json`;
  const jsonFilePath = `./convertedJson/${jsonName}`;

  // Step 1: read html file
  const html = fs.readFileSync(templatePath, { encoding: 'utf8' });

  // Step 2: using "himalaya" to convert html to json
  const json = himalaya.parse(html);

  // step 3: remove whitespace and linebreaks, and only keep element nodes
  const elementNodes = removeWhitespace(json);

  // step 4: restructure nodes to bring all nodes to the same level
  const sameLevelNodes = restructureNodes(elementNodes);

  // step 5: filter nodes to keep only nodes having data-name attribute
  const datanameNodes = filterNodes(sameLevelNodes);

  // step 6: generate a new nodes object with tagName and data-name
  const finalNodes = generateJson(datanameNodes);

  // write json data into a file on the server
  fs.writeFileSync(jsonFilePath, JSON.stringify(finalNodes));
  console.log(`\"${jsonName}\" is successfully saved in "/json" folder!`);
  console.log('--------------------------------------------------------');

  writeNamesAndPathInfo(templateName, templatePath, jsonName,
    jsonFilePath, lob, category, imagePath);
}

function writeNamesAndPathInfo(templateName, templatePath,
  jsonName, jsonFilePath, lob, category, imagePath) {

  const dataPath = './data/Template.json';
  let currentData = [];

  currentData = JSON.parse(fs.readFileSync(dataPath));

  const dataToSave = {
    "lob": lob,
    "category": category,
    "templateName": templateName,
    "templatePath": templatePath,
    "convertedJsonName": jsonName,
    "convertedJsonPath": jsonFilePath,
    "templateImgPath": imagePath
  };

  let len = currentData.length;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      if (currentData[i].templateName === dataToSave.templateName
        && currentData[i].lob === dataToSave.lob
        && currentData[i].category === dataToSave.category
      ) {
        currentData[i] = dataToSave;
        break;
      }
      if (i === len - 1) {
        currentData.push(dataToSave);
      }
    }
  } else {
    currentData.push(dataToSave);
  }

  fs.writeFileSync(dataPath, JSON.stringify(currentData));
  console.log(`Info for ${templateName} is successfully saved in "${dataPath}".`);
  console.log('--------------------------------------------------------');
}

module.exports = convertHtml2Json;