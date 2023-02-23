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

const simplifyMove = (move) => move.toString().replace(",", "");

const createKnight = (() => {
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
      stringPossibleMoves.push(simplifyMove(Object.values(possibleMoves[i]))); // get every possible move as a two value string, then push it into an array.
    }

    for (let i = 0; i < board.length; i++) {
      stringBoardPositions.push(simplifyMove(Object.values(board[i]))); // get every board position as a two value string, then push it into an array .
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

  const knightMoves = (initialPos, finalPos) => {
    // recursive function to calculate every possible next move without repeating (?), when it finds the path to the ending position (?).

    const Node = (data, moves) => {
      if (data === undefined) {
        data = null;
      }
      if (moves === undefined) {
        moves = null;
      }

      return { data, moves };
    };

    const checkedMoves = []
    
    const recursive = (firstPos, lastPos) => {

      const firstObj = Node(
        firstPos,
        possibleKnightMoves(createMatrix(8), firstPos)
      );

      console.log(firstObj)
  

      firstObj.moves.forEach((e) => { // traverse possible moves, in order to find every path from firstPos to lastPos

        console.log(e)

        const currentNode = Node(e,possibleKnightMoves(createMatrix(8), e))

        console.log(currentNode)

        // here i need to call again the function recursively with each move until one of these paths lead me to the final position.

        if (currentNode.moves.find(
          (element) => element.toString() === lastPos.toString())){
          console.log("success")
        }
        

      });

     
    };

    return recursive(initialPos, finalPos);
  };

  console.log(possibleKnightMoves(createMatrix(8),[4,0]))


  possibleKnightMoves(createMatrix(8),[4,0]).forEach(element => {

    console.log(possibleKnightMoves(createMatrix(8),element))

  })
    
 
  return { knightMoves };
})();


console.log(createKnight.knightMoves([4, 0], [4,3]));
