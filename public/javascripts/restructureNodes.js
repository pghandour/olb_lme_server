// Step 4: restructure nodes to bring all nodes to the same level
function restructuring(nodes, list) {
  nodes.forEach(node => {
    list.push(node);
    if (node.children.length > 0) {
      restructuring(node.children, list);
    }
  });

  return list;
}

function restructureNodes(nodes) {
  let nodesList = [];
  return restructuring(nodes, nodesList);
}

module.exports = restructureNodes;
