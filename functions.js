const fs = require('fs');

class InputController {
    constructor(day) {
        this.day = day;
        this.data;
    }

    async getInput() {
        try {
            const { session } = JSON.parse(fs.readFileSync(`./session.json`).toString());

            if (!fs.existsSync(`./inputs/day-${this.day}.txt`)) {
                const response = await fetch(`https://adventofcode.com/2023/day/${this.day}/input`, {
                    headers: {
                        Cookie: `session=${session};`
                    }
                });

                let textVal = await response.text();
                let valArray = textVal.split('\n');
                valArray.pop();
                textVal = valArray.join('\n');
                fs.writeFileSync(`./inputs/day-${this.day}.txt`, textVal);
                console.log('Fetched Input')
            }

            this.data = fs.readFileSync(`./inputs/day-${this.day}.txt`).toString();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
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

class TwoDimentionalCoords {
    constructor() {
        this.directions = [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: 0 }
        ]

        this.position = { x: 0, y: 0 };
        this.directionFacingIndex = 0;
    }

    turnLeft() {
        this.directionFacingIndex--;
        if (this.directionFacingIndex <= -1) {
            this.directionFacingIndex = 3;
        }
    }

    turnRight() {
        this.directionFacingIndex++;
        if (this.directionFacingIndex >= 4) {
            this.directionFacingIndex = 0;
        }
    }

    moveForward(steps) {
        this.position.x += this.directions[this.directionFacingIndex].x * steps;
        this.position.y += this.directions[this.directionFacingIndex].y * steps;
    }
}

function sumArray(input) {
    let total = 0;
    for (let item of input) {
        total += item;
    }

    return total;
}

function countOccurrences(string, target) {
    count = 0;
    for (let char of string) {
        if (char == target) {
            count++;
        }
    }
    return count;
}

module.exports = { InputController, TwoDimentionalCoords, sumArray, countOccurrences };