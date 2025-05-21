# 🃏 Dobble (Spot It!) Card Generator

This JavaScript script generates cards for a **Dobble-style game (Spot It!)**, where each card contains a fixed number of symbols, and **every pair of cards shares exactly one symbol**.

## 📦 Contents
- Dynamically loads images from an `images/` folder
- Images taken from https://github.com/DavidFitoussi/DubbleGame/tree/master
- Two generation modes:
  - **Draft mode**: combinatorial generation
  - **Final mode**: optimized algorithmic generation
- Graphical visualization of cards using a canvas

## 📁 File Structure
- `images/` – Folder containing `.jpg` images used as symbols
- `index.html` – HTML file containing parameters and buttons (`#run`, `#run_draft`, etc.)
- `main.js` – Main JavaScript file (this script)

## 🚀 How It Works

### `preload()`
Loads all the images listed in the `fileNames` array so they can be used in the card generation.

### `setup()`
Initializes UI buttons:
- `#run_draft` → Triggers the draft combinatorial generation (`generateCardsDraft`)
- `#run` → Triggers the final Dobble algorithm (`generateCards`)

### `execute(drawAlgorithm)`
Main entry point:
- Reads parameters from the HTML (`#num_symbols_per_card`, `#num_tot_symbols`, etc.)
- Runs the selected generation method
- Draws cards on the HTML canvas with corresponding symbols

### `generateCardsDraft(numSymbolsPerCard, numSameSymbolsPerCard, numTotSymbols)`
Recursive backtracking algorithm that generates all valid combinations of cards. Ensures each new card has **at most or exactly** a specified number of symbols in common with existing ones.

### `generateCards(numSymbolsPerCard)`
Mathematical algorithm based on finite projective planes. Guarantees:
- Every pair of cards has **exactly one symbol in common**
- Works only with specific numbers of symbols (related to prime numbers)

### Other helper functions:
- `compareEqualSymbols` – Compares two cards for the number of symbols in common
- `checkCandidateCard` – Validates whether a candidate card is valid
- `addCandidateCard` – Adds a valid card to the final set
- `tryCardCandidate` – Combines validation and insertion of a card

## 📐 Parameters (from HTML)
- `#num_symbols_per_card` – Number of symbols per card
- `#num_tot_symbols` – Total number of different symbols
- `#num_symbols_per_card2`, `#num_tot_symbols2` – Alternate inputs for final mode

## 🖼️ Visualization
Cards are rendered on an HTML canvas:
- Each row = one card
- Each cell = either a symbol image or a dash if not present


