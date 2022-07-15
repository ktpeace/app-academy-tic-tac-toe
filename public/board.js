export class Board {
    constructor() {
        this.grid = [['','',''],
                     ['','',''],
                     ['','','']];
    }

    placeMark(index, mark) { // "1,1"
        const row = index[0];
        const col = index[2];
        this.grid[row][col] = mark;
    }

    isWon() {
        let grid = this.grid;
        for (let i = 0; i < grid.length; i++) {
            const checker = el => {
                return (el ==="X" || el === "O") && grid[i][0] === el;
            }
            if (grid[i].every(checker)) return grid[i][0];

            let row0 = grid[0][i];
            let topLeft = grid[0][0];
            let topRight = grid[0][2];
            if ((row0 ==="X" || row0 === "O") && row0 === grid[1][i] && row0 === grid[2][i]) return row0;
            if ((topLeft ==="X" || topLeft === "O") && topLeft === grid[1][1] && topLeft === grid[2][2]) return topLeft;
            if ((topRight ==="X" || topRight === "O") && topRight === grid[1][1] && topRight === grid[2][0]) return topRight;
        }

        if (grid.flat().every(el => el)) return "none";

        return false;
    }

}

// const board = new Board();
// // board.placeMark("0,2", "O");
// // board.placeMark("1,2", "O");
// // board.placeMark("2,2", "O");
// console.log(board.isWon());
// console.log(board)
