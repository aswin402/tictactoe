let boxes = [...document.querySelectorAll('.box')];
let resetBtn = document.querySelector('#reset');
let turnO = true; // Player O starts
let newGameBtn = document.querySelector('#new-btn');
let popup = document.querySelector('.popup');
let msg = document.querySelector('#msg');


// Winning Patterns=============================
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Game Logic===================================
boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnO) {
            box.innerText = 'O';
            box.style.color = 'red';
            turnO = false;
            box.disabled = true;
            checkWinner();
        } else {
            box.innerText = 'X';
            box.style.color = 'blue';
            turnO = true;
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};


// Check Winner===============================

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    popup.classList.remove('hide');
    disableBoxes();
};

const checkWinner = () => {
    let hasWin = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" 
            && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }

    if (!hasWin) {
        const allBoxes = [...boxes].every((box) => box.innerText !== "");
        if (allBoxes) {
            popup.classList.remove('hide');
            msg.innerText = 'Match Drawn';
        }
    }
};

// Reset Game==================================
const resetGame = () => {
    turnO = true;
    enableBoxes();
    popup.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);