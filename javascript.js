// TODO
// Add word list
// Add game logic
// Add game visual effects
// Add functionality with the keyboard

let addMore = true;

const squares = document.querySelectorAll('.box');
const rows = document.querySelectorAll('.row');
const restart = document.querySelector('.restart');

let rowComplete = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
}


restart.addEventListener('click', function(){
    clearGame();
});

const typing = window.addEventListener('keydown', function(letter){
    determineKey(letter);
});


// Clears all the squares
function clearGame(){
    squares.forEach(square => square.textContent = '')
    rowComplete = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    }
    addMore = true;
}


function determineKey(letter){
    if (letter.keyCode >= 65 && letter.keyCode <= 90){
        fillBoxes(letter.key.toUpperCase());
    }
    else if (letter.key == "Backspace"){
        addMore = true;
        deleteBoxContent();
    }
    else if (letter.key == "Enter"){
        enterWord();
    }
}

function enterWord(){
    for (let j = rows.length - 1; j >= 0; j += -1){
        let boxes = rows[j].querySelectorAll('.box');
        if (boxes[4].textContent != ""){
            addMore = true;
            rowComplete[j + 1] = true;
            break;
        }
    }
}

function fillBoxes(letter){
    let breaker = false;
    if (addMore == true){
        for (let i = 0; i < rows.length; i ++){
            let boxes = rows[i].querySelectorAll('.box');
            if (breaker == true){
                break;
            }
            else if (rowComplete[i + 1] == false){
                for (let j = 0; j < boxes.length; j += 1){
                    if (boxes[j].textContent == ''){
                        boxes[j].textContent = letter;
                        breaker = true;
                        if (j == 4){
                            addMore = false;
                        }
                        break;
                    }
    
                }
            }
        }
    }

}


// Use the backspace key to delete the row you are working on
function deleteBoxContent(){
    let stopCheck = false;
    for (let j = rows.length - 1; j >= 0; j += -1){
        let boxes = rows[j].querySelectorAll('.box');
        if (stopCheck == true){
            break;
        }
        // Break if you are past this row
        else if (rowComplete[j + 1] == true){
            break;
        }
        for (let k = boxes.length - 1; k >= 0; k += -1){
            if (boxes[k].textContent != ''){
                boxes[k].textContent = '';
                stopCheck = true;
                break;
            }
        }
    }
}