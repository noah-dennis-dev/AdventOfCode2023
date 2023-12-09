const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 9;
    let testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
    testInput = '';
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split("\n", false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part Two: ${partTwo(lines)}`);
})();

function zeroCheck(layers) {
    let valid = true;
    for (let num of layers[layers.length - 1]) {
        if (num != 0) {
            valid = false;
            break;
        }
    }

    return valid;
}

function partOne(lines) {
    let total = 0;

    for (let line of lines) {
        let startNums = line.split(' ').map(el => parseInt(el));
        let layers = [startNums];

        while (!zeroCheck(layers)) {
            let nextLayer = [];
            for (let i = 1; i < layers[layers.length - 1].length; i++) {
                nextLayer.push(layers[layers.length - 1][i] - layers[layers.length - 1][i - 1]);
            }
            layers.push(nextLayer);
        }

        layers[layers.length - 1].push(0);
        for (let i = layers.length - 2; i >= 0; i--) {
            let sumVal = layers[i + 1][layers[i + 1].length - 1];
            let thisVal = sumVal + layers[i][layers[i].length - 1];
            layers[i].push(thisVal);
        }

        total += layers[0][layers[0].length - 1];
    }

    return total;
}

function partTwo(lines) {
    let total = 0;

    for (let line of lines) {
        let startNums = line.split(' ').map(el => parseInt(el));
        let layers = [startNums];

        while (!zeroCheck(layers)) {
            let nextLayer = [];
            for (let i = 1; i < layers[layers.length - 1].length; i++) {
                nextLayer.push(layers[layers.length - 1][i] - layers[layers.length - 1][i - 1]);
            }
            layers.push(nextLayer);
        }

        layers[layers.length - 1].push(0);
        for (let i = layers.length - 2; i >= 0; i--) {
            let sumVal = layers[i + 1][0];
            let thisVal = layers[i][0] - sumVal;
            layers[i].splice(0, 0, thisVal);
        }

        total += layers[0][0];
    }

    return total;
}
