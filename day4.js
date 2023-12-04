const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 4;
    let testInput = ``;
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let data = input.split('\n', false);

    console.log(`Part one: ${partOne(data)}`);
    console.log(`Part two: ${partTwo(data)}`);

})();


function partOne(data) {
    let total = 0;

    for (let line of data) {
        let [cardId, data] = line.split(': ');
        let [winningStr, picked] = data.split('|');
        let winningNumbers = [];
        let pickedNumbers = [];
        let match;
        let pattern = /\d+/g;
        while ((match = pattern.exec(winningStr)) !== null) {
            winningNumbers.push(match[0])
        }

        while ((match = pattern.exec(picked)) !== null) {
            pickedNumbers.push(match[0])
        }

        let count = 0;
        for (let winningNum of winningNumbers) {
            if (pickedNumbers.includes(winningNum)) {
                count++;
            }
        }

        total += (count != 0) ? Math.pow(2, count - 1) : 0;
    }


    return total;
}

function partTwo(data) {
    let total = 0;

    let instances = {};

    for (let line of data) {
        let [cardId, data] = line.split(': ');
        let [winningStr, picked] = data.split('|');
        let winningNumbers = [];
        let pickedNumbers = [];
        let match;
        let pattern = /\d+/g;
        while ((match = pattern.exec(winningStr)) !== null) {
            winningNumbers.push(match[0])
        }

        while ((match = pattern.exec(picked)) !== null) {
            pickedNumbers.push(match[0])
        }

        let count = 0;
        for (let winningNum of winningNumbers) {
            if (pickedNumbers.includes(winningNum)) {
                count++;
            }
        }

        instances[cardId.replace('Card ', '').trim()] = count;
    }

    function cardCopy(input) {
        total++;
        const instancesCount = instances[input];

        if (instances[input] != 0) {
            for (let i = parseInt(input) + 1; i <= parseInt(input) + instancesCount; i++) {
                cardCopy(i);
            }
        }
    }

    for (let key of Object.keys(instances)) {
        cardCopy(key);
    }

    return total;
}