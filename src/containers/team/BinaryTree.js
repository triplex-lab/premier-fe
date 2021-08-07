export class ReferalNode {
  constructor(id, data, childrens=[]) {
    this.id = id;
    this.data = data;
    this.childrens = childrens.length ? childrens : [];
  }
}

export class BinaryTree {
  constructor(data) {
    this.data = data;
    this.middleIndex = data && Math.floor(data.length / 2);
  }

  static convertToNodes = (array) => {
    let nodes = array.map(node => {
      if (node.childrens) {
        return new ReferalNode(
          node.id,
          node.data,
          [...BinaryTree.convertToNodes(node.childrens)]
        );
      }
      return new ReferalNode(
        node.id,
        node.data,
        []
      );
    })
    return nodes;
  }

  static updater(id, array, data) {
    let found = false;
    if (!array || !data) {
      return;
    }
    if (found) {
      return;
    }
    array.forEach(node => {
      console.log(node.id, id)
      if (node.id === id) {
        found = true;
        node.childrens = data;
        return;
      } else {
        this.updater(id, node.childrens, data);
      }
    })
    return array;
  }

  left() {
    if (!this.data.length) {
      return [];
    } else {
      let left = this.data.slice(0, this.middleIndex);
      return BinaryTree.convertToNodes(left);
    }
  }

  right() {
    if (!this.data.length) {
      return [];
    } else {
      let right = this.data.slice(this.middleIndex, this.data.length);
      return BinaryTree.convertToNodes(right);
    }
  }
}
