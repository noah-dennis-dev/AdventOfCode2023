const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 5;
    let testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

    testInput = ''
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let groups = input.split("\n\n");
    console.log(`Result: ${calculate(groups)}`);

})();

function calculate(groups) {
    let seeds = groups[0].split(": ")[1].split(" ").map(el => parseInt(el));

    let maps = [];

    for (let i = 1; i < groups.length; i++) {
        let lines = groups[i].split('\n');
        let parsed = lines.slice(1).map(el => el.split(' ').map(num => parseInt(num)));
        maps.push([lines[0], parsed])
    }

    function calcLocation(seed) {
        let currentVal = seed;
        for (let data of maps) {
            let currentMapItems = data[1];
            for (let currentMap of currentMapItems) {
                if (currentVal >= currentMap[1] && currentVal <= currentMap[1] + currentMap[2]) {
                    currentVal = currentVal - currentMap[1] + currentMap[0];
                    break;
                }
            }
        }
        return currentVal;
    }

    let seedGroups = [];

    for (let seedIndex = 0; seedIndex < seeds.length; seedIndex += 2) {
        seedGroups.push([seeds[seedIndex], seeds[seedIndex + 1]]);
    }

    let lowestLocation = Infinity;
    for (let seedGroup of seedGroups) {
        for (let i = seedGroup[0]; i < seedGroup[0] + seedGroup[1]; i++) {
            let location = calcLocation(i);
            if (location < lowestLocation) {
                lowestLocation = location;
            }
        }
        console.log({ lowestLocation });
    }

    return lowestLocation;
}