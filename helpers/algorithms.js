class Dijkstras {
    constructor(graph) {
        this.graph = graph;
        this.nodeConnections = {};
    }

    performDijkstras(startNode) {
        for (let node of this.graph.nodes) {
            this.nodeConnections[node] = { distance: -1 };
        }

        this.nodeConnections[startNode].finalDistanceFound = true;
        this.nodeConnections[startNode].distance = 0;

        return this.dijkstrasLoop(startNode)
    }

    dijkstrasLoop(node) {
        const neighbours = this.graph.getNeighbours(node)
        let currentNodeDistance = this.nodeConnections[node].distance;
        for (let neighbour of neighbours) {
            if (this.nodeConnections[neighbour].finalDistanceFound !== true) {
                let neighbourDistance = this.graph.getEdgeValue(node, neighbour);
                if (this.nodeConnections[neighbour].distance == -1 || neighbourDistance + currentNodeDistance < this.nodeConnections[neighbour].distance) {
                    this.nodeConnections[neighbour].distance = neighbourDistance + currentNodeDistance;
                    this.nodeConnections[neighbour].prev = node;
                }
            }
        }

        let nextNode;
        let lowestDistance = Infinity;
        for (let possibleNextNode of this.graph.nodes) {
            let connection = this.nodeConnections[possibleNextNode];
            if (connection.finalDistanceFound !== true) {
                if (connection.distance < lowestDistance && connection.distance !== -1) {
                    lowestDistance = connection.distance;
                    nextNode = possibleNextNode;
                }
            }
        }

        if (nextNode !== undefined) {
            this.nodeConnections[nextNode].finalDistanceFound = true;
            return this.dijkstrasLoop(nextNode);
        } else {
            return this.nodeConnections;
        }
    }
}

module.exports = { Dijkstras }