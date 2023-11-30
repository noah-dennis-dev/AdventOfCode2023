const fs = require('fs');

class InputController {
    constructor(day, testInput) {
        this.day = day;
        this.data;
        this.testInput = testInput;
    }

    async getInput() {
        if (this.testInput != '') {
            this.data = this.testInput;
            return;
        }

        const { session } = JSON.parse(fs.readFileSync(`./session.json`).toString());

        if (!fs.existsSync(`./inputs/day-${this.day}.txt`)) {
            const response = await fetch(`https://adventofcode.com/2023/day/${this.day}/input`, {
                headers: {
                    Cookie: `session=${session};`
                }
            });

            if (response.status == 200) {
                let textVal = await response.text();
                let valArray = textVal.split('\n');
                valArray.pop();
                textVal = valArray.join('\n');
                fs.writeFileSync(`./inputs/day-${this.day}.txt`, textVal);
                console.log('Fetched Input')
            } else {
                throw Error('Failed to fetch input')
            }
        }

        this.data = fs.readFileSync(`./inputs/day-${this.day}.txt`).toString();
        //this.data = 'R8, R4, R4, R8';
    }

    split(delimeter, isInt = false) {
        let output = this.data.split(delimeter);
        if (isInt) {
            output = output.map(el => parseInt(el));
        }

        return output;
    }

    splitTwice(delimeter1, delimeter2, isInt = false) {
        let output = [];

        for (let items of this.data.split(delimeter1)) {
            let itemsArr = [];
            for (let item of items.split(delimeter2)) {
                if (isInt) {
                    itemsArr.push(parseInt(item));
                } else {
                    itemsArr.push(item);
                }
            }
            output.push(itemsArr);
        }

        return output;
    }
}

module.exports = { InputController };