interface TreeNode {
  id: number;
  pid?: number;
  children?: TreeNode[];
  [key: string]: any;
}

export function arr2tree(arr: TreeNode[]) {
  const tree = [];
  for (const node of arr) {
    // 如果没有pid就可以认为是根节点
    if (!node.pid) {
      let p = { ...node };
      p.children = getChildren(p.id, arr);
      tree.push(p);
    }
  }
  function getChildren(id, arr) {
    let children = [];
    for (const node of arr) {
      if (node.pid === id) {
        children.push(node);
      }
    }

    for (const node of children) {
      const children = getChildren(node.id, arr);
      if (children?.length) {
        node.children = children;
      }
    }
    return children?.length ? children : null;
  }
  return tree;
}
