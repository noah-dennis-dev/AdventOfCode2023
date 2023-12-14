const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 14;
    let testInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

    testInput = '';
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.splitTwice("\n", '', false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part Two: ${partTwo(lines)} `);
})();


function partOne(lines) {
    let total = 0;

    /*moveColItems(lines);
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] == 'O') {
                total += lines.length - y;
            }
        }
    }*/

    return total;
}

let prev = [];

function partTwo(lines) {
    let total = 0;

    let loopOrigin;
    let loopLength;
    for (let i = 0; i < 1000000000; i++) {
        cycle(lines);

        const linesStr = lines.map(el => el.join('')).join('\n');
        const index = prev.indexOf(linesStr);
        if (index != -1) {
            loopOrigin = index;
            loopLength = i - index;
            break;
        }
        prev.push(linesStr);
    }


    console.log(loopOrigin, loopLength)
    let rem = 1000000000 - loopLength + loopOrigin - 1;
    let modRem = rem % loopLength;

    for (let i = 0; i < modRem; i++) {
        cycle(lines);
    }

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] == 'O') {
                total += lines.length - y;
            }
        }
    }

    return total;
}

function cycle(input) {
    for (let col = 0; col < input.length; col++) {
        for (let i = 0; i < input.length; i += 1) {
            if (input[i][col] == 'O') {
                let newY = (findEndY(input, col, i, -1, 0));
                input[i][col] = '.';
                input[newY][col] = 'O';
            }
        }
    }

    for (let row = 0; row < input.length; row++) {
        for (let i = 0; i < input[0].length; i += 1) {
            if (input[row][i] == 'O') {
                let newX = (findEndX(input, row, i, -1, 0));
                input[row][i] = '.';
                input[row][newX] = 'O';
            }
        }
    }


    for (let col = 0; col < input.length; col++) {
        for (let i = input.length - 1; i >= 0; i -= 1) {
            if (input[i][col] == 'O') {
                let newY = (findEndY(input, col, i, 1, input.length - 1));
                input[i][col] = '.';
                input[newY][col] = 'O';
            }
        }
    }

    for (let row = 0; row < input.length; row++) {
        for (let i = input[0].length - 1; i >= 0; i -= 1) {
            if (input[row][i] == 'O') {
                let newX = (findEndX(input, row, i, 1, input[0].length - 1));
                input[row][i] = '.';
                input[row][newX] = 'O';
            }
        }
    }
}

function findEndY(input, col, y, diff, end) {
    if (y == end) {
        return y;
    }

    if (input[y + diff][col] == '.') {
        return findEndY(input, col, y + diff, diff, end);
    } else {
        return y;
    }
}

function findEndX(input, row, x, diff, end) {
    if (x == end) {
        return x;
    }

    if (input[row][x + diff] == '.') {
        return findEndX(input, row, x + diff, diff, end);
    } else {
        return x;
    }
}