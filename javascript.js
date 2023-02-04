const squares = document.querySelectorAll('.box');
const typing = window.addEventListener('keydown', function(letter){
    determineKey(letter);
})


// Clears all the squares
function clearGame(){
    squares.forEach(square => square.textContent = '')
}


function determineKey(letter){
    if (letter.keyCode >= 65 && letter.keyCode <= 90){
        fillBoxes(letter.key.toUpperCase());
    }
    if (letter.key == "Backspace"){
        deleteBoxContent();
    }
}

function fillBoxes(letter){
    for (let i = 0; i < squares.length; i ++){
        if (squares[i].textContent == ''){
            squares[i].textContent = letter;
            break;
        }
    }
}

function deleteBoxContent(){
    for (let j = squares.length - 1; j >= 0; j += -1){
        if (squares[j].textContent != ''){
            squares[j].textContent = '';
            break;
        }
    }
}