const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 10;
    let testInput = `.....
.S-7.
.|.|.
.L-J.
.....`;

    testInput = '';
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split("\n", false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part Two: ${partTwo(lines)}`);
})();

function partOne(lines) {
    const graph = new Graph(true);

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            graph.addNode(`${y},${x}`);
        }
    }

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] == '.') {
                continue;
            }
            for (let { nY, nX } of [{ nY: y - 1, nX: x }, { nY: y + 1, nX: x }, { nY: y, nX: x - 1 }, { nY: y, nX: x + 1 }]) {
                if (nY >= 0 && nY < lines.length && nX >= 0 && nX < lines[y].length) {
                    if (lines[nY][nX] == '.') {
                        continue;
                    }

                    let difference = { x: nX - x, y: nY - y };
                    if (lines[y][x] == 'S') {
                        if (difference.x == 0) {
                            if (difference.y == -1) {
                                if (['|', '7', 'F'].includes(lines[nY][nX])) {
                                    graph.addEdge(`${y},${x}`, `${nY},${nX}`, 1);
                                }
                            } else {
                                if (['|', 'L', 'J'].includes(lines[nY][nX])) {
                                    graph.addEdge(`${y},${x}`, `${nY},${nX}`, 1);
                                }
                            }
                        } else {
                            if (difference.x == 1) {
                                if (['-', 'J', '7'].includes(lines[nY][nX])) {
                                    graph.addEdge(`${y},${x}`, `${nY},${nX}`, 1);
                                }
                            } else {
                                if (['-', 'L', 'F'].includes(lines[nY][nX])) {
                                    graph.addEdge(`${y},${x}`, `${nY},${nX}`, 1);
                                }
                            }
                        }
                        continue;
                    }

                    const pipe1 = lines[y][x];
                    const pipe2 = lines[nY][nX];

                    let valid = false;
                    if (difference.x == 0) {
                        // Verical Diff
                        if (difference.y == -1) {
                            if (['|', 'L', 'J'].includes(pipe1) && ['|', '7', 'F'].includes(pipe2)) {
                                valid = true;
                            }
                        } else {
                            if (['|', 'L', 'J'].includes(pipe2) && ['|', '7', 'F'].includes(pipe1)) {
                                valid = true;
                            }
                        }
                    } else {
                        if (difference.x == -1) {
                            if (['-', 'J', '7'].includes(pipe1) && ['-', 'L', 'F'].includes(pipe2)) {
                                valid = true;
                            }
                        } else {
                            if (['-', 'J', '7'].includes(pipe2) && ['-', 'L', 'F'].includes(pipe1)) {
                                valid = true;
                            }
                        }
                    }

                    if (valid) {
                        graph.addEdge(`${y},${x}`, `${nY},${nX}`, 1);
                    }
                }
            }
        }
    }


    const start = { x: 0, y: 0 };;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] == 'S') {
                start.x = x;
                start.y = y;
            }
        }
    }

    const distance = findFurthestDistance(graph.adjacencyList, `${start.y},${start.x}`);

    return distance;
}


function findFurthestDistance(graph, startNode) {
    const queue = new Queue();
    queue.enqueue({ node: startNode, distance: 0 });
    //const queue = [{ node: startNode, distance: 0 }];
    const visited = new Set([startNode]);
    let maxDistance = 0;

    while (!queue.isEmpty()) {
        const { node, distance } = queue.dequeue();

        maxDistance = Math.max(maxDistance, distance);
        for (const [neighbour, weight] of Object.entries(graph[node] || {})) {
            if (!visited.has(neighbour)) {
                visited.add(neighbour);
                queue.enqueue({ node: neighbour, distance: distance + weight });
            }
        }
    }

    return maxDistance;
}


function partTwo(lines) {

}
