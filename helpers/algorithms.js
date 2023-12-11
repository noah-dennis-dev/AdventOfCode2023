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

        let priorityQueue = [{ node: startNode, distance: 0 }];

        while (priorityQueue.length > 0) {
            priorityQueue.sort((a, b) => a.distance - b.distance);
            let currentNodeObj = priorityQueue.shift();
            let node = currentNodeObj.node;
            let currentNodeDistance = currentNodeObj.distance;

            const neighbours = this.graph.getNeighbours(node);

            for (let neighbour of neighbours) {
                if (this.nodeConnections[neighbour].finalDistanceFound !== true) {
                    let neighbourDistance = this.graph.getEdgeValue(node, neighbour);
                    if (
                        this.nodeConnections[neighbour].distance == -1 ||
                        neighbourDistance + currentNodeDistance < this.nodeConnections[neighbour].distance
                    ) {
                        this.nodeConnections[neighbour].distance = neighbourDistance + currentNodeDistance;
                        this.nodeConnections[neighbour].prev = node;

                        priorityQueue.push({ node: neighbour, distance: this.nodeConnections[neighbour].distance });
                    }
                }
            }

            this.nodeConnections[node].finalDistanceFound = true;
        }

        return this.nodeConnections;
    }
}


module.exports = { Dijkstras }