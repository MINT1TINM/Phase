const hasChildren = (node: any) => {
  if (node.data !== undefined && node.data !== null) {
    return true;
  }
  return false;
};

const searchNode = (node: any, value: string) => {
  const n = node;
  const fileList = [];
  let path: string[] = [];
  // tslint:disable-next-line: forin
  for (const key in n) {
    if (n[key].name.indexOf(value) !== -1) {
      fileList.push({ file: n[key], path });
      path = [];
    }

    let subNode = n[key];
    while (hasChildren(subNode)) {
      for (const subKey in subNode.data) {
        if (
          subNode.data[subKey].name &&
          subNode.data[subKey].name.indexOf(value) !== -1
        ) {
          path.push(subNode.name);
          fileList.push({ file: subNode.data[subKey], path });
          path = [];
        }
      }
      subNode = subNode.data;
    }
  }

  return fileList;
};

export { searchNode };
