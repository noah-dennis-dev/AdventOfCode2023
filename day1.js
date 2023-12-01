const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');

(async () => {
    const DAY = 1;
    const testInput = ``;
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let data = input.split('\n', false);

    let total = 0;

    const numberMappings = {
        one: "one1one",
        two: "two2two",
        three: "three3three",
        four: "four4four",
        five: "five5five",
        six: "six6six",
        seven: "seven7seven",
        eight: "eight8eight",
        nine: "nine9nine"
    }

    for (let item of data) {
        for (let num of Object.keys(numberMappings)) {
            item = item.replaceAll(num, numberMappings[num])
        }

        let numbersArr = item.split('');
        numbersArr = numbersArr.filter(el => !isNaN(parseInt(el)));
        let numbers = numbersArr.join('');
        let firstAndLast = `${parseInt(numbers[0])}${parseInt(numbers[numbers.length - 1])}`;
        total += parseInt(firstAndLast);
    }

    console.log(total);
})();