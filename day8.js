const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 8;
    //let testInput = ``;
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split("\n", false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part Two: ${partTwo(lines)}`);
})();


function partOne(lines) {
    let total = 0;
    let movements = lines[0].split('');
    let nextMap = {};
    for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        let [current, nextNodes] = lines[lineIndex].split(' = ');
        let [nextLeft, nextRight] = nextNodes.replace('(', '').replace(')', '').split(', ');
        nextMap[current] = { L: nextLeft, R: nextRight };
    }

    let currentNode = 'AAA';
    while (currentNode != 'ZZZ') {
        currentNode = nextMap[currentNode][movements[total % movements.length]];
        total++;
    }

    return total;
}

function partTwo(lines) {
    let total = 0;
    let movements = lines[0].split('');
    let nextMap = {};
    for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        let [current, nextNodes] = lines[lineIndex].split(' = ');
        let [nextLeft, nextRight] = nextNodes.replace('(', '').replace(')', '').split(', ');
        nextMap[current] = { L: nextLeft, R: nextRight };
    }

    let currentNodes = [];
    let startNodes = [];
    for (let node of Object.keys(nextMap)) {
        if (node[2] == 'A') {
            currentNodes.push([node]);
            startNodes.push(node);
        }
    }

    for (let currNodeI = 0; currNodeI < currentNodes.length; currNodeI++) {
        let i = 0;
        while (true) {
            if (currentNodes[currNodeI][currentNodes[currNodeI].length - 1][2] == 'Z') {
                break;
            }

            currentNodes[currNodeI].push(nextMap[currentNodes[currNodeI][currentNodes[currNodeI].length - 1]][movements[i % movements.length]]);
            i++;
        }
    }

    return currentNodes.map(el => el.length - 1);
}
