const board = document.getElementById("board");

const rows = 6; // Number of attempts/guesses the user has
const cols = 5; // Length of the word

let currentRow = 0;
let currentCol = 0;
let currentGuess = "";

let correctWord = "FIERY";

const initializeBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < cols; j++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.state = "empty";
      tile.dataset.id = `${i}${j}`;

      row.appendChild(tile);
    }

    fragment.appendChild(row);
  }

  board.appendChild(fragment);
};

initializeBoard();

const deleteLetter = () => {
  if (currentCol <= 0) return;

  // Move to the previous tile
  currentCol -= 1;

  const targetTile = fetchTargetTile();
  targetTile.innerHTML = "";

  // Internally track a version of the current guess
  currentGuess = currentGuess.substring(0, currentGuess.length - 1);
};

const addLetter = (event) => {
  if (currentCol >= cols) return;

  // Add the input letter to the correct tile
  const targetTile = fetchTargetTile();
  targetTile.innerHTML = event.key;

  // Move to the next tile
  currentCol += 1;

  // Internally track a version of the current guess
  currentGuess += event.key.toUpperCase();
};

const fetchTargetTile = () => {
  const targetTile = document.querySelector(
    `[data-id="${currentRow}${currentCol}"]`,
  );

  return targetTile;
};

const submitGuess = () => {
  if (currentGuess.length < cols) return;

  // Compares the current guess to the correct word
  for (let i = 0; i < cols; i++) {
    const letter = currentGuess[i];
    // Ensures we keep track of the correct tile to change the state of within the current row
    const tile = document.querySelector(`[data-id="${currentRow}${i}"]`);

    // Update state accordingly
    let state = "absent";

    if (correctWord[i] === letter) state = "correct";
    else if (correctWord.includes(letter)) state = "present";

    tile.dataset.state = state;
  }

  // Update row and column values to allow for the next guess
  currentRow++;
  currentCol = 0;
  currentGuess = "";
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") deleteLetter();

  if (event.key === "Enter") submitGuess();

  if (event.key.match(/[a-z]/i) && event.key.length === 1) addLetter(event);
});
