const { TwoDimensionalCoords, sumArray, countOccurrences } = require('./functions.js');
const { Graph, Stack, Queue, PriorityQueue, Grid } = require('./helpers/data-structures.js');
const { InputController } = require('./helpers/inputs.js');
const { Dijkstras } = require('./helpers/algorithms.js');


(async () => {
    const DAY = 7;
    let testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

    testInput = ''
    const input = new InputController(DAY, testInput);
    await input.getInput();
    let lines = input.split("\n", false);
    console.log(`Part One: ${partOne(lines)}`);
    console.log(`Part Two: ${partTwo(lines)}`);
})();

function getCardScore(card) {
    let counts = card.split('').map(char => countOccurrences(card, char));
    if (counts.includes(5)) {
        return 6;
    } else if (counts.includes(4)) {
        return 5;
    } else if (counts.includes(3)) {
        if (counts.includes(2)) {
            return 4;
        }

        return 3;
    } else if (counts.includes(2)) {
        if (counts.filter(el => el == 2).length == 4) {
            return 2
        }

        return 1;
    }

    return 0
}

function partOne(lines) {
    let map = { 'T': 'A', 'J': 'B', 'Q': 'C', 'K': 'D', 'A': 'E' };

    let total = 0;
    let hands = [];
    for (let line of lines) {
        let [hand, val] = line.split(' ');
        hands.push({ hand, val: parseInt(val) })
    }

    hands.sort((a, b) => {
        let typeA = getCardScore(a.hand);
        let typeB = getCardScore(b.hand);

        if (typeA !== typeB) {
            return typeA - typeB;
        } else {
            let mappedHandA = a.hand.split('').map(card => map[card] || card).join('');
            let mappedHandB = b.hand.split('').map(card => map[card] || card).join('');
            return mappedHandA.localeCompare(mappedHandB);
        }
    })

    for (let i = 0; i < hands.length; i++) {
        total += hands[i].val * (i + 1);
    }

    return total;
}

function partTwo(lines) {
    let map = { 'T': 'A', 'J': '!', 'Q': 'C', 'K': 'D', 'A': 'E' };

    function getReplacements(hand) {
        if (hand == "") {
            return [""];
        }

        let items = [];
        if (hand[0] == 'J') {
            for (let x of "23456789TQKA") {
                for (let y of getReplacements(hand.slice(1))) {
                    items.push(x + y)
                }
            }
        } else {
            for (let y of getReplacements(hand.slice(1))) {
                items.push(hand[0] + y);
            }
        }

        return items;
    }

    function getMaxScore(hand) {
        let maxScore = Number.NEGATIVE_INFINITY;

        for (let el of getReplacements(hand)) {
            const score = getCardScore(el);
            if (score > maxScore) {
                maxScore = score;
            }
        }

        return maxScore;
    }

    function getHandScore(hand) {
        let handMap = [];
        for (let char of hand) {
            handMap.push(map[char] || char);
        }

        return [getMaxScore(hand), handMap]
    }

    let total = 0;
    let hands = [];
    for (let line of lines) {
        let [hand, val] = line.split(' ');
        hands.push({ hand, val: parseInt(val) })
    }

    hands.sort((a, b) => {
        let [typeA, cardsA] = getHandScore(a.hand);
        let [typeB, cardsB] = getHandScore(b.hand)

        if (typeA !== typeB) {
            return typeA - typeB;
        } else {
            let joinedA = cardsA.join('');
            let joinedB = cardsB.join('');
            return joinedA.localeCompare(joinedB);
        }
    })

    for (let i = 0; i < hands.length; i++) {
        total += hands[i].val * (i + 1);
    }

    return total;
}