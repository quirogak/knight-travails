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

  let isAMove = false


  const knightMoves = (initialPos, finalPos) => {
    // recursive function to calculate every possible next move without repeating (?), when it finds the path to the ending position (?).
 
    const visitedNodes = []
    const Node = (data, moves) => {
      if (data === undefined) {
        data = null;
      }
      if (moves === undefined) {
        moves = null;
      }

      return { data, moves };
    };

  
    const initialNode = Node(initialPos,possibleKnightMoves(createMatrix(8),initialPos))
    const finalNode = Node(finalPos,possibleKnightMoves(createMatrix(8),finalPos))


    const toStringMoves = (Node) => {

      const moves = []

      if (Node.moves === undefined) {

        Node.forEach(element => {

          moves.push(element.toString())
        
        })

        return moves

      }

      Node.moves.forEach(element => {

        moves.push(element.toString())
      
      })

      return moves

    }

    // the difference between this algorithm and the previous one (see older commits), is that we are visiting the possible nodes using a sort-of breadth-first search, instead of a depth first.

    if(!visitedNodes.includes(initialNode.data.toString())) console.log(initialNode)
    

    const searchCommonMoves = (arr1, arr2) => arr1.some(item => arr2.includes(item))

    const searchCommonMoves2 = (arr1, arr2) => {arr1.some(item => arr2.includes(item))
      console.log(arr1)
      console.log(arr2)}

   
    if (searchCommonMoves(toStringMoves(initialNode),toStringMoves(finalNode))) return null // base case, the final node and initial node are connected by at least one move.
    
    
    if(visitedNodes.includes(initialNode.data.toString())) return null 

    visitedNodes.push(initialNode.data.toString()) 

    
    initialNode.moves.forEach(element => {

      console.log(element)
      console.log(possibleKnightMoves(createMatrix(8),element))

      searchCommonMoves2(toStringMoves(possibleKnightMoves(createMatrix(8),element)),toStringMoves(finalNode))

      if (searchCommonMoves(toStringMoves(possibleKnightMoves(createMatrix(8),element)),toStringMoves(finalNode))){
        console.log("hit")
        isAMove = true
      }  // here we are going a layer deep of possible moves.
  
    });

    console.log(isAMove)
    if(isAMove === true) return null; // if there is a movement in common in at least one move Node, we won't run knightMoves again, but we will evaluate the rest of the moves.

    // if there isn't any movement in common between the finalNode moves, and the current layer, go a layer deeper of possible moves.
    initialNode.moves.forEach(element => {
      knightMoves(element,finalPos)
    })
    
  }

  console.log(possibleKnightMoves(createMatrix(8),[7,7]))
  

 
  return { knightMoves };
})();


console.log(createKnight.knightMoves([0, 0], [7,7]));
