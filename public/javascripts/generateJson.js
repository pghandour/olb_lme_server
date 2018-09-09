// step 6: generate a new nodes object with tagName and data-name
function generateJson(nodes) {
  let list = [];

  nodes.forEach(node => {
    let dataName = "";

    // get data-name value of the node
    node.attributes.forEach(attr => {
      if (attr.key === "data-name") {
        dataName = attr.value;
        return;
      }
    });

    list.push(
      {
        "tagName": node.tagName,
        "data-name": dataName
      }
    );
  });

  return list;
}

module.exports = generateJson;