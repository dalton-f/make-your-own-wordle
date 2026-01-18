/* eslint-disable no-magic-numbers */
import Swal from "sweetalert2";

// These two arrays only work for the standard Wordle format of a 5-letter word
// where possibleSolutions represents a subset of 2315 words that could act as the correctWord
// legalGuesses is a much larger array of all words that are legal to guess
// This ruleset will only be applied if the user generates a 5 letter Wordle, or is generating random games - for any other length,
// invalid and nonsense strings will be valid
import legalGuesses from "./legalGuesses";
import possibleSolutions from "./possibleSolutions";

const board = document.getElementById("board");

const NUMBER_OF_ATTEMPTS = 6;
const DEFAULT_LENGTH_OF_WORD = 5;

let currentRow = 0;
let currentCol = 0;
let currentGuess = "";

let correctWord;

const initializeBoard = (
  rows = NUMBER_OF_ATTEMPTS,
  cols = DEFAULT_LENGTH_OF_WORD,
) => {
  board.innerHTML = "";

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
  if (currentCol >= correctWord.length) return;

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
  // If the word is too short, ignore it
  if (currentGuess.length < correctWord.length) {
    Swal.fire({
      theme: "dark",
      text: "Not enough letters!",
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      width: 220,
    });

    return;
  }

  // Only check for legal word guesses for standard 5 letter Wordles
  if (correctWord.length === DEFAULT_LENGTH_OF_WORD) {
    const guessIsLegal =
      possibleSolutions.includes(currentGuess.toLowerCase()) ||
      legalGuesses.includes(currentGuess.toLowerCase());

    if (!guessIsLegal) {
      Swal.fire({
        theme: "dark",
        text: "Not in word list!",
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        width: 220,
      });

      return;
    }
  }

  // Track remaining letters in correctWord
  const remainingLetters = correctWord.split("");

  // First pass to mark correct letters
  for (let i = 0; i < correctWord.length; i++) {
    const letter = currentGuess[i];
    const tile = document.querySelector(`[data-id="${currentRow}${i}"]`);

    if (correctWord[i] === letter) {
      tile.dataset.state = "correct";
      // Remove this letter so it can't be remarked
      remainingLetters[i] = null;
    }
  }

  // Second pass to mark present or absent letters
  for (let i = 0; i < correctWord.length; i++) {
    const letter = currentGuess[i];
    const tile = document.querySelector(`[data-id="${currentRow}${i}"]`);

    // Skip letters already marked correct
    if (tile.dataset.state === "correct") continue;

    const index = remainingLetters.indexOf(letter);

    if (index !== -1) {
      tile.dataset.state = "present";
      // Consume letter so duplicate marking doesn't occur - ie. both T's in TAUNT get marked for the comparison to JAUNT
      remainingLetters[index] = null;
    } else {
      tile.dataset.state = "absent";
    }
  }

  // The Swal code below isn't at all necessary, or important to the actual game logic, just helps for interactions and giving the user some information
  // Handle the sucess modal
  if (currentGuess === correctWord) {
    Swal.fire({
      title: "You win!",
      icon: "success",
      theme: "dark",
      width: 400,
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#279b4e",
      confirmButtonText: "Play random",
      cancelButtonText: "Generate link",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) resetGame();

      if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the link generation modal
        Swal.fire({
          title: "Make your own Wordle",
          text: "Words can be of any length",
          input: "text",
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }

            if (/\s/.test(value)) {
              return "Spaces are not allowed. Enter a single word.";
            }

            if (!/^[A-Za-z]+$/.test(value)) {
              return "Only letters are allowed. No spaces, numbers, or symbols.";
            }
          },
          theme: "dark",
          width: 400,
          icon: "question",
          confirmButtonColor: "#279b4e",
          confirmButtonText: "Generate link",
        }).then((result) => {
          if (result.isConfirmed) generateLink(result.value);
        });

        // For safety, also reset the base game here in case the user someone closes out - they can still play
        resetGame();
      }
    });
  }

  // Update row and column values to allow for the next guess
  currentRow++;
  currentCol = 0;
  currentGuess = "";
};

const base64Encode = (str) => {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const base64Decode = (base64) => {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const generateLink = (word) => {
  const encodedData = base64Encode(word);
  const urlSafeData = encodeURIComponent(encodedData);

  console.log(word);

  console.log(encodedData);
  console.log(urlSafeData);

  const url = new URL(window.location.href);
  url.searchParams.set("payload", urlSafeData);

  window.location.href = url.toString();
};

const resetGame = (
  rows = NUMBER_OF_ATTEMPTS,
  cols = DEFAULT_LENGTH_OF_WORD,
  chosenWord = "",
) => {
  currentCol = 0;
  currentRow = 0;
  currentGuess = "";

  correctWord =
    chosenWord.toUpperCase() ||
    possibleSolutions[
      Math.floor(Math.random() * possibleSolutions.length)
    ].toUpperCase();

  initializeBoard(rows, cols);
};

document.addEventListener("DOMContentLoaded", () => {
  // Check URL for payload from a generated link
  const params = new URLSearchParams(window.location.search);
  const urlSafeBase64 = params.get("payload");

  if (!urlSafeBase64) {
    resetGame();
    return;
  }

  // Decode is and overwrite resetGame for custom word and length
  const base64 = decodeURIComponent(urlSafeBase64);
  const decoded = base64Decode(base64);

  resetGame(NUMBER_OF_ATTEMPTS, decoded.length, decoded);
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  if (event.key === "Backspace") deleteLetter();

  if (event.key === "Enter") submitGuess();

  if (event.key.match(/[a-z]/i) && event.key.length === 1) addLetter(event);
});
