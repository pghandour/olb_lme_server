const fs = require('fs');
const himalaya = require('himalaya');
const removeWhitespace = require('./removeWhitespace.js');

function convertHtml2Json(templateName) {
  const templatePath = `./uploads/${templateName}`;
  const jsonName = templateName.slice(0, -5);
  const jsonFilePath = `./json/${jsonName}.json`;

  // read html file
  const html = fs.readFileSync(templatePath, { encoding: 'utf8' });

  // convert html to json
  const json = himalaya.parse(html);

  // remove whitespace and linebreaks
  const cleanJson = removeWhitespace(json);

  // get contents inside html tag
  const htmlTag = cleanJson[1];

  // get an array of all tags inside body tag
  let arrayOfTags = htmlTag.children[1].children;
  arrayOfTags = JSON.stringify(arrayOfTags);

  // write json data into a file on the server
  fs.writeFile(jsonFilePath, arrayOfTags, function (err) {
    if (err) throw err;
    console.log(`File \"${jsonName}\" is Saved!`);
  });
}

module.exports = convertHtml2Json;