const fs = require('fs');

class TwoDimensionalCoords {
    constructor() {
        this.directions = [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: 0 }
        ];

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

module.exports = { TwoDimensionalCoords, sumArray, countOccurrences };