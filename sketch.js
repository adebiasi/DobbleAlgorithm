let fileNames = ["1.jpg", "36.jpg", "babybottle.jpg", "Bird.jpg", "body.jpg", "bomb.jpg", "cactus.jpg", "Car.jpg", "Carrot.jpg", "cat.jpg", "cheese.jpg", "Cible.jpg", "clock.jpg", "clown.jpg", "crayon.jpg", "dobble.jpg", "dragon.jpg", "drop.jpg", "exclamationsign.jpg", "Eye.jpg", "fire.jpg", "flange.jpg", "flower.jpg", "freeze.jpg", "ghost.jpg", "Glasses.jpg", "hammer.jpg", "igloo.jpg", "lamp.jpg", "leaf.jpg", "leafred.jpg", "musicnote.jpg", "NoEntry.jpg", "questionsign.jpg", "Scissors.jpg", "skelton.jpg", "spider.jpg", "stain.jpg", "sun.jpg", "Turtle.jpg", "yinyang.jpg"];
let imageSize = 20; // Dimensione delle immagini
let images = []; // Array per memorizzare le immagini

let numSymbolsPerCard;

let numTotSymbols;
let cards = []; // Array per memorizzare le immagini

function preload() {
    console.log("preload")

    for (let i = 0; i < fileNames.length; i++) {
        if (i >= fileNames.length) {
            images[i] = loadImage('images/' + fileNames[0]); // Assicurati di avere le immagini image0.jpg, image1.jpg, ecc.

        } else {
            images[i] = loadImage('images/' + fileNames[i]); // Assicurati di avere le immagini image0.jpg, image1.jpg, ecc.

        }
    }
}

function setup() {
    let runDraftButton = select('#run_draft');
    runDraftButton.mousePressed(() => {
        // Passa i parametri necessari a execute
        execute(true);
    });
    let runButton = select('#run');
    runButton.mousePressed(() => {
        // Passa i parametri necessari a execute
        execute(false);
    });
    execute(true)
}

function execute(drawAlgorithm = true) {
    console.log("setup")

    if (drawAlgorithm) {
        numSymbolsPerCard = parseInt(select("#num_symbols_per_card").html());
        numTotSymbols = parseInt(select("#num_tot_symbols").html());
    } else {
        numSymbolsPerCard = parseInt(select("#num_symbols_per_card2").html());
        numTotSymbols = parseInt(select("#num_tot_symbols2").html());
    }

    if (drawAlgorithm) {
        cards = generateCardsDraft(numSymbolsPerCard, 1, numTotSymbols);
    } else {
        cards = generateCards(numSymbolsPerCard)
    }

    for (let i = 0; i < numTotSymbols; i++) {
        if (i >= fileNames.length) {
            images[i] = images[0];
        }
    }

    createCanvas(numTotSymbols * imageSize, cards.length * imageSize);
    textAlign(LEFT, LEFT);
    for (let y = 0; y < cards.length; y++) {
        for (let x = 0; x < numTotSymbols; x++) {
            if (y == 0) {
                text(x, x * imageSize, imageSize / 2 + y * imageSize)
            }
            if (cards[y].includes(x) == 1) {
                image(images[x], x * imageSize, y * imageSize, imageSize, imageSize);
                // text(x, imageSize / 2 + x * imageSize, imageSize / 2 + y * imageSize)

            } else {
                text("-", imageSize / 2 + x * imageSize, imageSize / 2 + y * imageSize)
            }
        }
    }
}


function compareEqualSymbols(candidateCard, card, numSameSymbolsPerCard, sameOrLessSymbols = false) {
    // Count of common elements
    let count = 0;

    // Loop through the first array
    for (let i = 0; i < candidateCard.length; i++) {
        // Check if the element is also present in the second array
        if (card.includes(candidateCard[i])) {
            count++;
        }
    }

    if (sameOrLessSymbols) {
        // Return true if the count matches n
        return count <= numSameSymbolsPerCard;
    } else {
        // Return true if the count matches n
        return count === numSameSymbolsPerCard;
    }

}

function checkCandidateCard(candidateCard, outputCards, numSameSymbolsPerCard, sameOrLessSymbols = false) {

    if (outputCards === undefined) return true;

    for (let i = 0; i < outputCards.length; i++) {

        if (!compareEqualSymbols(candidateCard, outputCards[i], numSameSymbolsPerCard, sameOrLessSymbols)) {
            return false
        }
    }
    return true;
}

function addCandidateCard(candidateCard, outputCards) {
    outputCards.push(candidateCard);
}

function tryCardCandidate(cardCandidate, cards, numSameImagesPerCard, sameOrLessSymbols = false) {
    if (checkCandidateCard(cardCandidate, cards, numSameImagesPerCard, sameOrLessSymbols)) {
        addCandidateCard(cardCandidate, cards);
    }
}


function generateCardsDraft(numSymbolsPerCard, numSameSymbolsPerCard, numTotSymbols) {
    const cards = [];
    var totCandidates = 0;

    // Funzione ricorsiva per generare combinazioni
    function backtrack(start, current) {

        if (current.length === numSymbolsPerCard) {
            var candidate = current.slice();
            totCandidates++;
            tryCardCandidate(candidate, cards, numSameSymbolsPerCard);

        } else {
            for (let i = start; i < numTotSymbols; i++) {
                current.push(i);

                if (checkCandidateCard(current, cards, numSameSymbolsPerCard, true)) {
                    backtrack(i + 1, current); // Chiamata ricorsiva con l'indice successivo
                }
                current.pop();
            }
        }
    }


    backtrack(0, []);
    console.log("tot candidates: " + totCandidates)
    return cards;
}

// code adapted from https://www.101computing.net/the-dobble-algorithm/
function generateCards(numSymbolsPerCard) {

    const cards = [];
    var n = numSymbolsPerCard - 1;

    for (let i = 0; i < n + 1; i++) {
        cards.push([0]);
        for (let j = 0; j < n; j++) {
            cards[i].push((j + 1) + (i * n));
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            cards.push([i + 1]);
            for (let k = 0; k < n; k++) {
                let val = (n + 1 + n * k + (i * k + j) % n);
                cards[cards.length - 1].push(val);
            }
        }
    }

    return cards;
}

