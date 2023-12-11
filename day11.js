const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 11;
    let testInput = ``;
    //testInput = '';
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split("\n", false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part Two: ${partTwo(lines)}`);
})();


function partOne(lines) {
    let total = 0;
    let noneX = [];

    for (let x = 0; x < lines[0].length; x++) {
        let valid = true;
        for (let y = 0; y < lines.length; y++) {
            if (lines[y][x] == '#') {
                valid = false;
            }
        }
        if (valid) {
            noneX.push(x);
        }
    }

    let noneY = [];
    for (let y = 0; y < lines.length; y++) {
        let valid = true;
        for (let x = 0; x < lines[0].length; x++) {
            if (lines[y][x] == '#') {
                valid = false;
            }
        }
        if (valid) {
            noneY.push(y);
        }
    }

    noneX = noneX.map((val, i) => val + i);
    noneY = noneY.map((val, i) => val + i);

    for (let val of noneX) {
        for (let y = 0; y < lines.length; y++) {
            let yItems = lines[y].split('');
            yItems.splice(val, 0, '.');
            lines[y] = yItems.join('');
        }
    }

    for (let val of noneY) {
        let str = '';
        for (let x = 0; x < lines[0].length; x++) {
            str += '.';
        }

        lines.splice(val, 0, str);
    }

    let galaxies = [];

    const graph = new Graph(true);
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            if (lines[y][x] == '#') {
                galaxies.push({ y, x });
            }

            graph.addNode(`${y},${x}`);
        }
    }

    let directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            for (let direction of directions) {
                if (direction.y + y >= 0 && direction.y + y < lines.length && direction.x + x >= 0 && direction.x + x < lines[0].length) {
                    graph.addEdge(`${y},${x}`, `${y + direction.y},${x + direction.x}`, 1);
                }
            }
        }
    }

    for (let i = 0; i < galaxies.length; i++) {
        const dijkstras = new Dijkstras(graph);
        dijkstras.performDijkstras(`${galaxies[i].y},${galaxies[i].x}`);
        for (let x = 0; x < galaxies.length; x++) {
            if (i == x) {
                continue;
            }

            total += dijkstras.nodeConnections[`${galaxies[x].y},${galaxies[x].x}`].distance;
        }
    }

    return total / 2;
}

function partTwo(lines) {
    let total = 0;
    let noneX = [];

    for (let x = 0; x < lines[0].length; x++) {
        let valid = true;
        for (let y = 0; y < lines.length; y++) {
            if (lines[y][x] == '#') {
                valid = false;
            }
        }
        if (valid) {
            noneX.push(x);
        }
    }

    let noneY = [];
    for (let y = 0; y < lines.length; y++) {
        let valid = true;
        for (let x = 0; x < lines[0].length; x++) {
            if (lines[y][x] == '#') {
                valid = false;
            }
        }
        if (valid) {
            noneY.push(y);
        }
    }

    let galaxies = [];

    const graph = new Graph(true);
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            if (lines[y][x] == '#') {
                galaxies.push({ y, x });
            }

            graph.addNode(`${y},${x}`);
        }
    }

    let directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            for (let direction of directions) {
                if (direction.y + y >= 0 && direction.y + y < lines.length && direction.x + x >= 0 && direction.x + x < lines[0].length) {
                    let weight = 1;
                    if (noneX.includes(x)) {
                        weight += 999999;
                    }
                    if (noneY.includes(y)) {
                        weight += 999999;
                    }
                    graph.addEdge(`${y},${x}`, `${y + direction.y},${x + direction.x}`, weight);
                }
            }
        }
    }

    for (let i = 0; i < galaxies.length; i++) {
        const dijkstras = new Dijkstras(graph);
        dijkstras.performDijkstras(`${galaxies[i].y},${galaxies[i].x}`);
        for (let x = 0; x < galaxies.length; x++) {
            if (i == x) {
                continue;
            }

            total += dijkstras.nodeConnections[`${galaxies[x].y},${galaxies[x].x}`].distance;
        }
    }

    return total / 2;
}
