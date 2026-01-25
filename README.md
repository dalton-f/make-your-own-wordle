# Make Your Own Wordle

A customizable Wordle game implementation that allows you to play with random five letter words or create your own custom Wordle puzzles of any length to share with friends.

## Features

- **Classic Wordle Gameplay**: Guess the hidden word in 6 attempts or fewer
- **Custom Word Lengths**: Unlike the original Wordle, this supports words of any length (not just 5 letters)
- **Word Validation**: For 5-letter words, validates guesses against official Wordle word lists
- **Shareable Links**: Generate custom Wordle puzzles and share them via URL
- **Dark Theme**: Modern, accessible dark UI built with Tailwind CSS

## How to Play

1. **Random Game**: Start playing immediately with a randomly selected word
2. **Custom Game**: Win a game and choose "Generate link" to create a custom puzzle
3. **Guess Rules**:
   - Type letters to fill in the tiles
   - Press Enter to submit your guess
   - Press Backspace to delete letters
   - Green tiles = correct letter in correct position
   - Yellow tiles = correct letter in wrong position
   - Gray tiles = letter not in the word

## Technologies Used

- **JavaScript (ES6+)**: Game logic and interactivity
- **Tailwind CSS**: Utility-first CSS framework for styling
- **SweetAlert2**: Beautiful, responsive modals and notifications
- **Laravel Mix**: Asset compilation and build tool
- **PostCSS**: CSS processing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the original Wordle game
- Word lists sourced from official Wordle game data
- Built with modern web technologies for a smooth user experience
