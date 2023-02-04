// TODO
// Add game visual effects
// Add new game button
// Add winner/loser on screen
// Add invalid word on screen

import {wordList} from "./wordlist.js";
let randomWord = getRandomWord();
console.log(randomWord);

// Controls whether keys can be added
let addMore = true;

const squares = document.querySelectorAll('.box');
const rows = document.querySelectorAll('.row');
const restart = document.querySelector('.restart');
const keys = document.querySelectorAll('.letters');
const enterButton = document.querySelector('.enter');
const delButton = document.querySelector('.delete');
const newGameButton = document.querySelector('.new-game');

// Once you click enter and your word is accepted, the row becomes complete and cannot be changed
let rowComplete = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
}

keys.forEach(key => key.addEventListener('click', function(){
    fillBoxes(key.textContent);
}))

enterButton.addEventListener('click', function(){
    enterWord();
})

delButton.addEventListener('click', function(){
    deleteBoxContent();
})

restart.addEventListener('click', function(){
    clearGame();
});

const typing = window.addEventListener('keydown', function(letter){
    determineKey(letter);
});

function getRandomWord(){
    return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

// Clears all the squares
function clearGame(){
    squares.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = "white";
    });

    keys.forEach(key => {
        key.style.backgroundColor = "white";
    });

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

// Gets a letter from the keyboard input
function determineKey(letter){
    // Only accepts letters (not numbers or special keys)
    if (letter.keyCode >= 65 && letter.keyCode <= 90){
        fillBoxes(letter.key.toUpperCase());
    }
    else if (letter.key == "Backspace"){
        deleteBoxContent();
    }
    else if (letter.key == "Enter"){
        enterWord();
    }
}

// Submits the word to be checked when you press enter
function enterWord(){
    for (let j = rows.length - 1; j >= 0; j += -1){
        let boxes = rows[j].querySelectorAll('.box');
        if (boxes[4].textContent != "" && rowComplete[j + 1] == false){
            if (checkValidWord(boxes)){
                addMore = true;
                rowComplete[j + 1] = true;
                wordComparison(j);
                checkWinner(j);
                break;
            }
            else{
                console.log("Invalid Word");
                break;
            }
        }
    }
}

// Checks if the word is a real recognized word
function checkValidWord(boxes){
    let boxesWord = (boxes[0].textContent + boxes[1].textContent + boxes[2].textContent + boxes[3].textContent + boxes[4].textContent)
    if (wordList.includes(boxesWord.toLowerCase())){
        return true;
    }
    else{
        return false;
    }
}

// Stylizes the boxes and the keyboard appropriately
function wordComparison(rowIndex)
    {
        let boxes = rows[rowIndex].querySelectorAll('.box');
        // check if each letter is in the word
        for (let i = 0; i < 5; i ++){
            if (randomWord.includes(boxes[i].textContent)){
                boxes[i].style.backgroundColor = "yellow";
            }
            else{
                boxes[i].style.backgroundColor = "lightgrey";
            }
            // check if each letter is in the right place
            if (boxes[i].textContent == randomWord[i]){
                boxes[i].style.backgroundColor = "green";
            }
        }
        // Change the color of the keys as well
        for (let j = 0; j < 5; j ++){
            for (let k = 0; k < keys.length; k ++){
                if (keys[k].textContent == boxes[j].textContent){
                    if (keys[k].style.backgroundColor != "green"){
                        keys[k].style.backgroundColor = boxes[j].style.backgroundColor;
                    }
                }
            }
        }
        
    }

// Checks to see if your newest input was a winner
function checkWinner(rowIndex){
    let boxes = rows[rowIndex].querySelectorAll('.box');
    for (let i = 0; i < 5; i ++){
        if (boxes[i].style.backgroundColor != "green"){
            return;
        }
    }
    console.log("WINNER");
    addMore = false;
}

// Fills the next box in the row
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
    addMore = true;
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
