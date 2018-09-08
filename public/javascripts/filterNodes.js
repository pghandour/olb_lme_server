// step 5: filter nodes to keep only nodes having data-name attribute
function filterNodes(nodes) {
  return nodes.filter(node => {
    let contains = false;

    if (node.attributes.length > 0) {
      node.attributes.forEach(attr => {
        if (attr.key === "data-name") {
          contains = true;
        }
      });

    }
    return contains;
  });
}

module.exports = filterNodes;