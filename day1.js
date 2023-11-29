const { InputController, TwoDimentionalCoords, sumArray, countOccurrences } = require('./functions.js');

(async () => {
    const DAY = 1;
    const input = new InputController(DAY);
    await input.getInput();
    const data = input.split('\n', false);
    let rawData = input.data;

    let total = 0;

    for (let item of data) {

    }

    for (let i = 0; i < data.length; i++) {
        const currentItem = data[i];
        const previousItem = data[i - 1];
        const nextItem = data[i + 1];


    }




    console.log(total)
})();