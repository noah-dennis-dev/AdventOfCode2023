const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 1;
    const testInput = ``;
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let rawData = input.data;
    let data = input.split('\n', true);

    let total = 0;


    for (let item of data) {

    }



    console.log(total);
})();


/*regexMatches('[123] [ABC] [HELLO] [TESTING]')
function regexMatches(input) {
    const pattern = /\[(.*?)\]/g;
    const matches = [...input.matchAll(pattern)].map(match => match[1]);

    console.log(matches);
}*/