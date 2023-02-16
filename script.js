const createMatrix = (size) => {

  const containerMatrix = [];

  const recursive = (yPos) => {

    if(yPos === size) return;

    for (let i = 0; i < size; i++) {
      containerMatrix.push([yPos,i]);
    }
    
    recursive(yPos+1)
     
  
  };
  recursive(0)
  console.log(containerMatrix)
}


createMatrix(8);
