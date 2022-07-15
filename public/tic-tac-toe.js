import { Board } from "./board.js";

window.onload = () => {
    const squares = document.querySelectorAll(".square");
    const newGame = document.querySelector(".new-game");
    const giveUp = document.querySelector(".give-up");
    const h1 = document.querySelector("h1");
    const xImage = '<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg">';
    const oImage = '<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg">';
    let isWon;
    let board;
    let currentPlayer;

    function startGame() {
        isWon = false;
        giveUp.classList.remove("disabled");
        board = new Board();
        const getCurrentPlayer = localStorage.getItem("currentPlayer");
        if (getCurrentPlayer) {
            currentPlayer = getCurrentPlayer;
            const getWinner = localStorage.getItem("winner");
            if (getWinner) {
                h1.innerText = `Winner: ${getWinner}`;
                isWon = getWinner;
                newGame.classList.remove("disabled");
                giveUp.classList.add("disabled");
            } else {
                h1.innerText = "";
            }
        } else {
            currentPlayer = "X";
        }
    }

    function addSymbol(square) {
            const index = square.getAttribute("data-value");
            if (!square.innerHTML && !isWon) {
                if (currentPlayer === "X") {
                    square.innerHTML = xImage;
                    board.placeMark(index, "X");
                    localStorage.setItem(index, "X");
                    currentPlayer = "O";
                    localStorage.setItem("currentPlayer", "O");
                } else {
                    square.innerHTML = oImage;
                    board.placeMark(index, "O");
                    localStorage.setItem(index, "O");
                    currentPlayer = "X";
                    localStorage.setItem("currentPlayer", "X");
                }
                isWon = board.isWon();
                if (isWon) {
                    h1.innerText = `Winner: ${isWon}`;
                    localStorage.setItem("winner", isWon);
                    newGame.classList.remove("disabled");
                    giveUp.classList.add("disabled");
                }
            }
    };

    function setSquares() {
        squares.forEach(square => {
                square.addEventListener("click", () => addSymbol(square));
                const index = square.getAttribute("data-value");
                const storedVal = localStorage.getItem(index);
                if (storedVal === "X") {
                    square.innerHTML = xImage;
                    board.placeMark(index, "X");
                } else if (storedVal === "O") {
                    square.innerHTML = oImage;
                    board.placeMark(index, "O");
                } else {
                    square.innerHTML = "";
                }
        });
    }

    const newGamePress = () => {
        if (isWon) {
            newGame.classList.add("disabled");
            h1.innerText = "";
            localStorage.clear();
            startGame();
            setSquares();
        }
    }

    newGame.addEventListener("click", newGamePress);

    const giveUpPress = () => {
        if (!isWon) {
            if (currentPlayer === "X") {
                isWon = "O";
            } else {
                isWon = "X";
            }
            h1.innerText = `Winner: ${isWon}`;
            localStorage.setItem("winner", isWon);
            giveUp.classList.add("disabled");
            newGame.classList.remove("disabled");
        }
    }

    giveUp.addEventListener("click", giveUpPress);

    startGame();
    setSquares();
}
