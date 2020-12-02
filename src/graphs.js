class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjList[node] = [];
  }

  addEdge(node1, node2) {
    this.adjList[node1].push(node2);
    this.adjList[node2].push(node1);
  }

  removeNode(node) {
    Object.values(this.adjList).forEach(edgeList => {
      // remove the node from all edge lists
      const edgeListIndex = edgeList.indexOf(node);
      if (edgeListIndex > -1) {
        edgeList.splice(edgeListIndex, 1);
      }
    });

    const nodeListIndex = this.nodes.indexOf(node);
    if (nodeListIndex > -1) {
      delete this.adjList[node];
      return this.nodes.splice(nodeListIndex, 1);
    }

    return false;
  }

  removeEdge(node1, node2) {
    const indexOfNode2 = this.adjList[node1] && this.adjList[node1].indexOf(node2);
    const indexOfNode1 = this.adjList[node2] && this.adjList[node2].indexOf(node1);

    const badIndices = this.adjList[node1] === undefined || this.adjList[node2] === undefined;

    if (badIndices) {
      return 'Please pass in valid indices';
    } else {
      this.adjList[node1].splice(indexOfNode2, 1);
      this.adjList[node2].splice(indexOfNode1, 1);
    }
  }

  depthFirstTraversal(startingNode, func = console.log) {
    if (startingNode === undefined) {
      return 'No starting node was provided'
    }
    let stack = [startingNode];
    let visited = {startingNode:true};

    while (stack.length) {
      const current = stack.pop();
      const neighbors = this.adjList[current];

      func(current);

      neighbors.forEach(neighbor => {
        if (!visited[neighbor]) {
          stack.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
  }

  breadthFirstTraversal(startingNode, func = console.log) {
    if (startingNode === undefined) {
      return 'No starting node was provided';
    }

    let queue = [startingNode];
    let visited = {startingNode:true};

    while (queue.length) {
      const current = queue.shift();
      const neighbors = this.adjList[current];

      neighbors.forEach(neighbor => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
  }
}

export default Graph;