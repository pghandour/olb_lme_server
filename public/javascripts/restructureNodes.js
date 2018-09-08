// Step 4: restructure nodes to bring all nodes to the same level
let list1 = [];
function restructureNodes(nodes) {
  nodes.forEach(node => {
    list1.push(node);
    if (node.children.length > 0) {
      restructureNodes(node.children);
    }
  });

  return list1;
}

module.exports = restructureNodes;
