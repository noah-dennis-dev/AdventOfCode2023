const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 3;
    let testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

    testInput = ``
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let data = input.split('\n', false);

    console.log(`Part one: ${partOne(data)}`);
    console.log(`Part two: ${partTwo(data)}`);

})();


function partOne(data) {
    let total = 0;

    for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
        const numbers = data[lineIndex].match(/\d+/g);
        if (numbers != null) {
            let nextStart = 0;
            for (let number of numbers) {
                let partOfSum = false;
                let numberStart = data[lineIndex].indexOf(number, nextStart);
                nextStart = numberStart + 1;
                let numberEnd = numberStart + number.length;
                for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
                    for (let x = numberStart - 1; x <= numberEnd; x++) {
                        if (y >= 0 && y < data.length && x >= 0 && x < data[lineIndex].length) {
                            if (isNaN(parseInt(data[y][x])) && data[y][x] != '.') {
                                partOfSum = true;
                            }
                        }
                    }
                }
                if (partOfSum) {
                    total += parseInt(number)
                }
            }
        }
    }

    return total;
}


function partTwo(data) {
    let total = 0;
    let map = [];

    for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
        let numbers = [];

        let match;
        let pattern = /\d+/g;
        while ((match = pattern.exec(data[lineIndex])) !== null) {
            numbers.push({ start: match.index, end: pattern.lastIndex - 1, number: match[0] })
        }

        if (numbers != null) {
            for (let number of numbers) {
                for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
                    for (let x = number.start - 1; x <= number.end + 1; x++) {
                        if (y >= 0 && y < data.length && x >= 0 && x < data[lineIndex].length) {
                            if (data[y][x] == '*') {
                                map.push({ x, y, number: parseInt(number.number) });
                            }
                        }
                    }
                }
            }
        }
    }

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {

            let a = map.filter(el => el.x == x && el.y == y);
            if (a.length == 2) {
                let nums = a.map(el => el.number)
                total += nums[0] * nums[1]
            }
        }
    }

    return total;
}