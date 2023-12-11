class Graph {
    constructor(isDirected) {
        if (!(isDirected === false || isDirected === true)) {
            throw new Error('Graph isDirected not defined');
        }

        this.isDirected = isDirected;
        this.adjacencyList = {};
        this.nodes = new Set();
    }

    addNode(node) {
        if (this.nodes.has(node)) {
            throw new Error(`The node ${node} already exists.`);
        }

        this.nodes.add(node);
        this.adjacencyList[node] = {};
    }

    addEdge(node1, node2, weight = 1) {
        if (!this.nodes.has(node1)) {
            throw new Error(`The node ${node1} does exist (addEdge)`);
        }

        if (!this.nodes.has(node2)) {
            throw new Error(`The node ${node2} does exist (addEdge)`);
        }

        this.adjacencyList[node1][node2] = weight + (this.adjacencyList[node1][node2] || 0);

        if (!this.isDirected) {
            this.adjacencyList[node2][node1] = weight + (this.adjacencyList[node2][node1] || 0);
        }
    }

    removeEdge(node1, node2) {
        delete this.adjacencyList[node1][node2];

        if (!this.isDirected) {
            delete this.adjacencyList[node2][node1];
        }
    }

    //returns list of node ids
    getNeighbours(node) {
        if (!this.nodes.has(node)) {
            throw new Error(`The node ${node} does not exist (getNeighbours)`)
        }

        return Object.keys(this.adjacencyList[node]);
    }

    getEdgeValue(node1, node2) {
        if (!this.nodes.has(node1)) {
            throw new Error(`The node ${node1} does exist (addEdge)`);
        }

        if (!this.nodes.has(node2)) {
            throw new Error(`The node ${node2} does exist (addEdge)`);
        }

        return this.adjacencyList[node1][node2];
    }
}


class Stack {
    constructor() {
        this._stack = [];
    }

    push(element) {
        this._stack.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            throw Error(`Stack Empty (attempted to pop)`);
        }

        return this._stack.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw Error(`Stack Empty (attempted to peek)`);
        }

        return this._stack[this._stack.length - 1];
    }

    isEmpty() {
        return this._stack.length == 0;
    }

    get length() {
        return this._stack.length;
    }
}


class Queue {
    constructor() {
        this._queue = [];
    }

    enqueue(element) {
        this._queue.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            throw Error(`Queue Empty (attempted to dequeue)`);
        }

        return this._queue.shift();
    }

    peek() {
        if (this.isEmpty()) {
            throw Error(`Queue Empty (attempted to peek)`);
        }

        return this._queue[0];
    }

    isEmpty() {
        return this._queue.length == 0;
    }

    get length() {
        return this._queue.length;
    }
}


class PriorityQueue extends Queue {
    constructor() {
        super();
    }

    enqueue(element, priority) {
        const item = { priority, value: element };
        if (this.isEmpty()) {
            this._queue.push(item);
        } else {
            let added = false;
            let queueLength = this.length;
            for (let i = 0; i < queueLength; i++) {
                if (priority > this._queue[i].priority) {
                    this._queue.splice(i, 0, item);
                    added = true;
                    break;
                }
            }

            if (!added) {
                this._queue.push(item);
            }
        }
    }

    dequeue() {
        return super.dequeue();
    }

    peek() {
        return super.peek().value;
    }
}


class Grid {
    constructor(height, width, items = []) {
        this.grid;

        if (items != []) {
            this.grid = items;
        } else {
            for (let y = 0; y < height; y++) {
                let yItems = [];
                for (let x = 0; x < width; x++) {
                    yItems.push(null);
                }
                this.grid.push(yItems);
            }
        }
    }

    getCoordValue(y, x) {
        if (isNaN(parseInt(y)) || isNaN(parseInt(x))) {
            throw Error('y or x NaN. Tried to get coordinate value.');
        }

        return this.grid[y][x]
    }

    setCoordValue(y, x, value) {
        if (isNaN(parseInt(y)) || isNaN(parseInt(x))) {
            throw Error('y or x NaN. Tried to set coordinate value.');
        }

        this.grid[y][x] = value;
    }
}


module.exports = { Graph, Stack, Queue, PriorityQueue, Grid }