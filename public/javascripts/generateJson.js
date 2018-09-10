// step 6: generate a new nodes object with tagName and data-name
function generateJson(nodes) {
  let list = [];

  nodes.forEach(node => {
    let dataName = "", dataName2 = "";

    // get data-name value of the node
    node.attributes.forEach(attr => {
      if (attr.key === "data-name") {
        dataName = attr.value;
      }

      if (attr.key === "data-name2") {
        dataName2 = attr.value;
      }
    });

    if (dataName2.length > 0) {
      list.push(
        {
          "tagName": node.tagName,
          "data-name": dataName,
          "data-name2": dataName2,
        }
      );
    } else {
      list.push(
        {
          "tagName": node.tagName,
          "data-name": dataName
        }
      );
    }
  });

  return list;
}

module.exports = generateJson;