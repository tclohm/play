class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {

    function traverse(visitor, val) {
      if (visitor === null) {
        this.root = new Node(val);
        return this.root;
      }

      if (val <= visitor.value) {
        if (visitor.left === null) {
          visitor.left = new Node(value);
          return visitor.left;
        } else {
          traverse(visitor.left, val);
        }
      } else {
        if (visitor.right === null) {
          visitor.right = new Node(value);
          return visitor.right;
        } else {
          traverse(visitor.right, val);
        }
      }
    }

    return traverse.call(this, this.root, value);

  }

  contains(value) {
    function traverse(visitor, val) {
      if (visitor === null) {
        return false
      }

      if (visitor.value === val) {
        return true;
      } else if (val < visitor.value && visitor.left !== null) {
        return traverse(visitor.left, val);
      } else if (val > visitor.value && visitor.right !== null) {
        return traverse(visitor.right, val)
      }
      return false
    }

    return traverse.call(this, this.root, value);
  }

  min(node = null) {
    if (node === null) {
      return;
    }

    if (node.left === null) {
      return node;
    } else {
      return this.min(node.left);
    }
  }

  max(node) {
    if (node === null) {
      return null;
    }

    if (node.right === null) {
      return node;
    } else {
      return this.max(node.right);
    }
  }

  remove(value) {
    function traverse(visitor, value) {
      // no child
      if (visitor.value === value) {
        if (visitor.left === null && visitor.right === null) {
          visitor = null;
          return visitor;
        }

        // One child
        if (visitor.left === null) {
          visitor = visitor.right
          return visitor;
        }

        if (visitor.right === null) {
          visitor = visitor.left;
          return visitor;
        }

        // two children
        let successor = this.min(visitor.right);
        let tmp = visitor.value;
        visitor.value = successor.value;
        successor.value = tmp;
        visitor.right = traverse(visitor.right, tmp);
        return visitor;

      } else if (value < visitor.value && visitor.left !== null) {
        visitor.left = traverse.call(this, visitor.left, value);
      } else if (value > visitor.value && visitor.right !== null) {
        visitor.right = traverse.call(this, visitor.right, value);
      }
      return visitor;
    }

    this.root = traverse.call(this, this.root, value);
  }

  // left, root, right
  inOrderTraversal(node, func = console.log) {
    if (node === null) {
      return false;
    }

    if (node.left !== null) {
      this.inOrderTraversal(node.left, func)
    }

    func(node);

    if (node.right !== null) {
      this.inOrderTraversal(node.right, func)
    }
  }

  // root, left, right
  preOrderTraversal(node, func = console.log) {
    if (node === null) {
      return false;
    }

    func(node);

    if (node.left !== null) {
      this.preOrderTraversal(node.left, func);
    }

    if (node.right !== null) {
      this.preOrderTraversal(node.right, func);
    }
  }

  // left, right, root
  postOrderTraversal(node, func = console.log) {
    if (node === null) {
      return false;
    }

    if (node.left !== null) {
      this.postOrderTraversal(node.left, func);
    }

    if (node.right !== null) {
      this.postOrderTraversal(node.right, func);
    }

    func(node);
  }
}

export { BinarySearchTree, Node };