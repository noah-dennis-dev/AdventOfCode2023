const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 6;
    let testInput = `Time:      7  15   30
Distance:  9  40  200`;

    testInput = ''
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split("\n", false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part One: ${partTwo(lines)}`);
})();

function partOne(lines) {
    let total = 1;
    let times = [];
    let distances = [];

    let match;
    let pattern = /\d+/g;
    while ((match = pattern.exec(lines[0])) !== null) {
        times.push(parseInt(match[0]))
    }

    while ((match = pattern.exec(lines[1])) !== null) {
        distances.push(parseInt(match[0]))
    }

    for (let i = 0; i < times.length; i++) {
        let waysToWin = 0;
        for (let buttonLength = 0; buttonLength < times[i]; buttonLength++) {
            if ((times[i] - buttonLength) * buttonLength > distances[i]) {
                waysToWin++;
            }
        }

        total *= waysToWin;
    }

    return total;
}

function partTwo(lines) {
    let total = 1;
    let times = [];
    let distances = [];

    let match;
    let pattern = /\d+/g;
    while ((match = pattern.exec(lines[0])) !== null) {
        times.push(parseInt(match[0]))
    }

    while ((match = pattern.exec(lines[1])) !== null) {
        distances.push(parseInt(match[0]))
    }

    let time = parseInt(times.map(el => el.toString()).join(''));
    let distance = parseInt(distances.map(el => el.toString()).join(''));

    let waysToWin = 0;
    for (let buttonLength = 0; buttonLength < time; buttonLength++) {
        if ((time - buttonLength) * buttonLength > distance) {
            waysToWin++;
        }
    }

    total *= waysToWin;
    return total;
}