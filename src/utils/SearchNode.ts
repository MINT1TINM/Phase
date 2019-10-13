const hasChildren = (node: any) => {
  if (node.data !== undefined && node.data !== null) {
    return true;
  }
  return false;
};

const searchNode = (node: any, value: string) => {
  const n = node;
  const fileList = [];
  // tslint:disable-next-line: forin
  for (const key in n) {
    if (n[key].name.indexOf(value) !== -1) {
      fileList.push(n[key]);
    }

    let subNode = n[key];
    while (hasChildren(subNode)) {
      for (const subKey in subNode.data) {
        if (
          subNode.data[subKey].name &&
          subNode.data[subKey].name.indexOf(value) !== -1
        ) {
          fileList.push(subNode.data[subKey]);
        }
      }
      subNode = subNode.data;
    }
  }

  return fileList;
};

export { searchNode };
