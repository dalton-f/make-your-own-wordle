const board = document.getElementById("board");

const rows = 6; // Number of attempts/guesses the user has
const cols = 5; // Length of the word

for (let i = 0; i < rows; i++) {
  const row = document.createElement("div");
  row.className = "row";

  for (let j = 0; j < cols; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.state = "empty";

    row.appendChild(tile);
  }

  board.appendChild(row);
}
