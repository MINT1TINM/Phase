const hasChildren = (node: any) => {
  if (node.data !== undefined && node.data !== null) {
    return true;
  }
  return false;
};

// search in file structure
const searchNode = (node: any, value: string) => {
  const n = node;
  const result = [];
  let path: string[] = [];
  // tslint:disable-next-line: forin
  for (const key in n) {
    if (n[key].name.indexOf(value) !== -1) {
      result.push({ file: n[key], path });
      path = [];
    }

    let subNode = n[key];
    while (hasChildren(subNode)) {
      for (const subKey in subNode.data) {
        if (
          subNode.data[subKey].name
          && subNode.data[subKey].name.indexOf(value) !== -1
        ) {
          path.push(subNode.name);
          result.push({ file: subNode.data[subKey], path });
          path = [];
        }
      }
      subNode = subNode.data;
    }
  }

  return result;
};

// insert to department tree
const insertNodeToTree = (node: any, parentID: string, insertContent: any) => {
  console.log(node, parentID);

  for (const d of node) {
    if (d.id === parentID) {
      d.children.push(insertContent);
      return node;
    }

    let subNode = d;
    if (subNode.children) {
      for (const sn of subNode.children) {
        if (sn.id === parentID) {
          sn.push(insertContent);
          return node;
        }
        subNode = sn;
      }
    }
  }
  return node;
};

export { searchNode, insertNodeToTree };
