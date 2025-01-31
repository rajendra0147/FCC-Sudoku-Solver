class SudokuSolver {

  validate(puzzle) {
        if(!puzzle){
            return "Required field missing";
        }
        if(puzzle.length != 81){
            return 'Expected puzzle to be 81 characters long' ;
        }
        
        if(/[^0-9.]/g.test(puzzle)){
            return  "Invalid characters in puzzle"
        }
        return "Valid"
  }

  letterToNumber(row){
    switch(row.toUpperCase()){
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        case 'D':
            return 4;
        case 'E':
            return 5;
        case 'F':
            return 6;
        case 'G':
            return 7;
        case 'H':
            return 8;
        case 'I':
            return 9;
        default:
            return 'none';
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    console.log(row, column)
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    for(let i=0; i<9;i++){
        if(grid[row-1][i] == value){
            return false;
        }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    for(let i=0; i<9; i++){
        if(grid[i][column - 1] == value){
            return false;
        }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    let startRow = row - (row % 3),
        startCol = column - (column % 3);
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(grid[i+startRow][j+startCol] == value){
                return false;
            }
        }
    }
    return true;
  }

  solveSudoku(grid, row, col)
{
    let N=9;
    if (row == N - 1 && col == N)
        return grid;

    if (col == N)
    {
        row++;
        col = 0;
    }
 
    if (grid[row][col] != 0)
        return this.solveSudoku(grid, row, col + 1);
 
    for(let num = 1; num < 10; num++)
    {
        if (this.isSafe(grid, row, col, num))
        {
            grid[row][col] = num;
            if (this.solveSudoku(grid, row, col + 1))
                return grid;
        }
        grid[row][col] = 0;
    }
    return false;
}

isSafe(grid, row, col, num)
{
    for(let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;

    for(let x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;
 
    let startRow = row - row % 3, 
        startCol = col - col % 3;
         
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num)
                return false;
 
    return true;
}

transform(puzzleString) {
  const grid = [];
  let index = 0;

  for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
          const char = puzzleString[index++];
          const num = char === '.' ? 0 : parseInt(char);
          row.push(num);
      }
      grid.push(row);
  }

  return grid;
}

transformBack(grid){
  return grid.flat().join("");
}


  solve(puzzleString) {
    let grid = this.transform(puzzleString);
    let solved = this.solveSudoku(grid,0,0);
    if(!solved){
      return false
    }
    let solvedString = this.transformBack(solved);
    console.log("solvedString :>> ", solvedString);
    return solvedString;
  }
}

module.exports = SudokuSolver;



