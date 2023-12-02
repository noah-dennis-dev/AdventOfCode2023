const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 2;
    const testInput = ``;
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let data = input.split('\n', false);

    console.log(`Part one: ${partOne(data)}`);
    console.log(`Part two: ${partTwo(data)}`);

})();


function partOne(data) {
    let total = 0;
    for (let line of data) {
        let [game, info] = line.split(': ');
        let games = info.split('; ');
        let valid = true;

        for (let game of games) {
            let cubeCounts = {
                red: 12,
                green: 13,
                blue: 14
            };

            for (let cube of game.split(', ')) {
                let [count, colour] = cube.split(' ');
                count = parseInt(count);
                cubeCounts[colour] -= count;

                for (let key of Object.keys(cubeCounts)) {
                    if (cubeCounts[key] < 0) {
                        valid = false;
                        break;
                    }
                }
            }
        }

        if (valid) {
            total += parseInt(game.split(' ')[1])
        }
    }

    return total;
}


function partTwo(data) {
    let total = 0;
    for (let line of data) {
        let [game, info] = line.split(': ');
        let games = info.split('; ');

        let globalCounts = {
            red: 0,
            green: 0,
            blue: 0
        };

        for (let game of games) {
            let localCounts = {
                red: 0,
                green: 0,
                blue: 0
            };

            for (let cube of game.split(', ')) {
                let [count, colour] = cube.split(' ');
                count = parseInt(count)
                localCounts[colour] += count;
            }

            for (let key of Object.keys(localCounts)) {
                if (localCounts[key] > globalCounts[key]) {
                    globalCounts[key] = localCounts[key];
                }
            }
        }

        let multiply = globalCounts.red * globalCounts.blue * globalCounts.green;
        total += multiply;
    }

    return total;
}