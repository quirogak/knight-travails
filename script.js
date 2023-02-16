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

    // conditionals to remove possible out of board moves.

    possibleMoves.push([currentPos[0] + 3, currentPos[0] + 1]); // push every possible move of a knight in that situation.

    // return every possible movement from every position on the board.

    return possibleMoves;
  };

  return possibleKnightMoves(createMatrix(8), [0, 0]);
};

console.log(createMatrix(8));

console.log(createKnight());
