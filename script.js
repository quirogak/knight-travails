const createMatrix = (size) => {
  const containerMatrix = [];

  const recursive = (yPos) => {
    if (yPos === size) return;

    for (let i = 0; i < size; i++) {
      containerMatrix.push([yPos, i]);
    }

    recursive(yPos + 1);
  };
  recursive(0);
  return containerMatrix;
};

const createKnight = () => {
  const possibleKnightMoves = (board, currentPos) => {
    const possibleMoves = [];

    possibleMoves.push(
      [currentPos[0] + 2, currentPos[1] + 1],
      [currentPos[0] + 1, currentPos[1] + 2],
      [currentPos[0] - 1, currentPos[1] + 2],
      [currentPos[0] - 2, currentPos[1] + 1],
      [currentPos[0] - 2, currentPos[1] - 1],
      [currentPos[0] - 1, currentPos[1] - 2],
      [currentPos[0] + 1, currentPos[1] - 2],
      [currentPos[0] + 2, currentPos[1] - 1]
    ); // push every possible move of a knight in the current position.

    // clean out of board moves

    const stringPossibleMoves = [];

    const stringBoardPositions = [];

    for (let i = 0; i < possibleMoves.length; i++) {
      stringPossibleMoves.push(
        Object.values(possibleMoves[i]).toString().replace(",", "")
      ); // get every possible move as a two value string, then push it into an array.
    }

    for (let i = 0; i < board.length; i++) {
      stringBoardPositions.push(
        Object.values(board[i]).toString().replace(",", "")
      ); // get every board position as a two value string, then push it into an array .
    }

    const onlyPossibleMoves = [];

    for (let i = 0; i < stringPossibleMoves.length; i++) {
      if (stringBoardPositions.includes(stringPossibleMoves[i])) {
        onlyPossibleMoves.push(possibleMoves[i]); // push every possible (correct) position.
      }
    }

    if (!stringBoardPositions.includes(currentPos.toString().replace(",", "")))
      return "Please enter a valid position"; // if the user enters a non-existent position

      
    return onlyPossibleMoves;

  };

  return possibleKnightMoves(createMatrix(8), [0, 0]);
};

console.log(createMatrix(8));

console.log(createKnight());
