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

  let isAMove = false;

  const path = [];

  const knightMoves = (initialPos, finalPos) => {
    // recursive function to calculate every possible next move without repeating (?), when it finds the path to the ending position (?).

    const visitedNodes = [];
    const Node = (data, moves) => {
      if (data === undefined) {
        data = null;
      }
      if (moves === undefined) {
        moves = null;
      }

      return { data, moves };
    };

    const initialNode = Node(
      initialPos,
      possibleKnightMoves(createMatrix(8), initialPos)
    );
    const finalNode = Node(
      finalPos,
      possibleKnightMoves(createMatrix(8), finalPos)
    );

    const finalMessage = (finalPath) => {
      const message = `You made it in ${
        path.length - 1
      } moves! Here's your path: `;

      console.log(message);

      for (let i = 0; i < finalPath.length; i++) {
        const element = finalPath[i];
        console.log(element);
      }

      return "end.";
    };

    const toNumberMoves = (Node) => {
      const changedNode = Node[0].replace(",", "");
      const stringMove = changedNode.split("");
      const numberMove = stringMove.map((element) => parseInt(element, 10));

      return numberMove;
    };

    const toStringMoves = (Node) => {
      const moves = [];

      if (Node.moves === undefined) {
        Node.forEach((element) => {
          moves.push(element.toString());
        });

        return moves;
      }

      Node.moves.forEach((element) => {
        moves.push(element.toString());
      });

      return moves;
    };

    // the difference between this algorithm and the previous one (see older commits), is that we are visiting the possible nodes using a sort-of breadth-first search, instead of a depth first.

    if (toStringMoves(initialNode).includes(finalNode.data.toString())) {
      // base case 1 when the initial move has the final move as a possible move.
      path.push(initialNode.data);
      path.push(finalNode.data);
      return finalMessage(path);
    }

    if (
      !visitedNodes.includes(initialNode.data.toString()) &&
      isAMove === false
    )
      path.push(initialNode.data);

    const searchCommonMoves = (arr1, arr2) =>
      arr1.some((item) => arr2.includes(item));

    if (
      searchCommonMoves(toStringMoves(initialNode), toStringMoves(finalNode))
    ) {
      // base case 2, the final node and initial node are connected by at least one move.

      const commonMove = toStringMoves(
        possibleKnightMoves(createMatrix(8), initialNode.data)
      ).filter((value) => toStringMoves(finalNode).includes(value));
      path.push(toNumberMoves(commonMove));
      path.push(finalNode.data);

      return finalMessage(path); 
    }

    visitedNodes.push(initialNode.data.toString());

    for (let i = 0; i < initialNode.moves.length; i++) {
      // i could have used a forEach loop, but i wouldn't be able to break it.

      if (isAMove === true) break; // if the shortest path is already found, break the loop to avoid path pollution.

      // if there is any common moves between the current element and the moves of the finalNode, push element to path and set isAMove to true.
      if (
        searchCommonMoves(
          toStringMoves(
            possibleKnightMoves(createMatrix(8), initialNode.moves[i])
          ),
          toStringMoves(finalNode)
        )
      ) {
        const commonMove = toStringMoves(
          possibleKnightMoves(createMatrix(8), initialNode.moves[i])
        ).filter((value) => toStringMoves(finalNode).includes(value));

        path.push(initialNode.moves[i]);
        path.push(toNumberMoves(commonMove));

        console.log(path);
        console.log("hit");
        isAMove = true;
        path.push(finalNode.data);
        return finalMessage(path);
      }
    }

    if (isAMove === true) {
      path.push(finalPos);
      return "end";
    } // if there is a movement in common in at least one move Node, we won't run knightMoves again, but we will evaluate the rest of the moves.

    // if there isn't any movement in common between the finalNode moves, and the current layer, go a layer deeper of possible moves.
    initialNode.moves.forEach((element) => {
      knightMoves(element, finalPos);
    });

    path.push(finalPos);
    return "end";
  };

  console.log(possibleKnightMoves(createMatrix(8), [0, 0]));
  console.log(possibleKnightMoves(createMatrix(8), [1, 7]));

  return { knightMoves };
})();

console.log(createKnight.knightMoves([7, 7], [1, 3]));
