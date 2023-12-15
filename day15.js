const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 15;
    let testInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

    testInput = '';
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split(",", false);
    console.log(`Ans: ${exec(lines)}`);
    //console.log(`Part Two: ${partTwo(lines)} `);
})();


function exec(lines) {
    let total = 0;
    let boxes = Array.from({ length: 256 }, el => []);

    for (let item of lines) {
        let sum = 0;
        let val = item.split('=')[0].replace('-', '')
        for (let char of val) {
            sum += char.charCodeAt(0);
            sum *= 17;
            sum = sum % 256;
        }

        const index = boxes[sum].findIndex(el => el.tag == val);
        if (item.includes('=')) {
            if (index == -1) {
                boxes[sum].push({ tag: val, num: item.split('=')[1] });
            } else {
                boxes[sum][index] = { tag: val, num: item.split('=')[1] };
            }
        } else {
            if (index != -1) {
                boxes[sum].splice(index, 1);
            }
        }
    }

    for (let box = 0; box < boxes.length; box++) {
        for (let i = 0; i < boxes[box].length; i++) {
            total += (box + 1) * (i + 1) * boxes[box][i].num;
        }
    }


    return total;
}
