"use strict";
function buttonGameStart() {
    window.location.href = "/LingoHuge/Game";
}

function startGame() {
    localStorage.setItem('activeRow', 1);
    drawGrid();
    setActiveRow(localStorage.getItem('activeRow'));
    makeWord();
}

function makeWord() {
    let randomValue = Math.floor(Math.random() * 478) + 1;
    let currentWord = words[randomValue];
    localStorage.setItem('word', currentWord);
}

function drawGrid() {
    let lingoTable = document.getElementById("lingoTable");
    for (let identifier = 1; identifier < 7; identifier++) {
        let row = drawRow(lingoTable, identifier);
        for (let identifierCol = 1; identifierCol < 6; identifierCol++) {
            drawCols(row, identifierCol)
        }
    }
}

function drawRow(lingoTable, identifier) {
    let trEl = document.createElement('tr');
    trEl.setAttribute('id', 'row' + identifier);
    lingoTable.appendChild(trEl);
    return trEl;
}

function drawCols(row, identifierCol) {
    let tdEl = document.createElement('td');
    tdEl.setAttribute('id', 'letter' + identifierCol);
    let textAreaEl = document.createElement('textarea');
    textAreaEl.classList.add("letterInput");
    textAreaEl.setAttribute("maxlength", "1");
    textAreaEl.setAttribute('disabled', "");
    tdEl.appendChild(textAreaEl);
    row.appendChild(tdEl);
}

function setActiveRow(identifier) {
    if (identifier < 7) {
        let currentRow = document.getElementById("row" + identifier);
        for (let i = 0; i < 5; i++) {
            currentRow.childNodes[i].childNodes[0].removeAttribute('disabled');
        }
    } else {
        document.getElementById("submitWord").outerHTML = "";
    }
}

function disablePreviousRow() {
    let previousRow = document.getElementById("row" + (parseInt(localStorage.getItem('activeRow')) - 1));
    for (let i = 0; i < 5; i++) {
        previousRow.childNodes[i].childNodes[0].setAttribute('disabled', '');
    }
}

function getLetters(identifier) {
    let wordArray = [];
    let currentRow = document.getElementById("row" + identifier);
    for (let i = 0; i < 5; i++) {
        wordArray.push(currentRow.childNodes[i].childNodes[0].value);
    }
    return wordArray;
}

function filterLetters(letterCurrentWord, letterGivenWord) {
    return letterCurrentWord === letterGivenWord;
}

function checkResult() {
    let result = [];
    let currentWord = localStorage.getItem('word').split("");
    let wordArray = getLetters(localStorage.getItem('activeRow'));
    let newRowValue = parseInt(localStorage.getItem('activeRow')) + 1;
    localStorage.setItem('activeRow', newRowValue);
    setActiveRow(localStorage.getItem('activeRow'));
    disablePreviousRow();
    let previousRow = document.getElementById("row" + (parseInt(localStorage.getItem('activeRow')) - 1));
    for (let i = 0; i < currentWord.length; i++) {
        result.push(filterLetters(currentWord[i], wordArray[i]));
    }
    result = filter(currentWord, wordArray);
    for (let j = 0; j < result.length; j++) {
        if (result[j] === 1) {
            previousRow.childNodes[j].childNodes[0].style.backgroundColor = "#84ff35";
        } else if (result[j] === 2) {
            previousRow.childNodes[j].childNodes[0].style.backgroundColor = "#ffe033";
        } else {
            previousRow.childNodes[j].childNodes[0].style.backgroundColor = "#e4453b";
        }
    }
}

function filter(attempt, correct) {
    let result = [];
    for (let letter in attempt) {
        if (!attempt.hasOwnProperty(letter)) {
            continue;
        }
        if (attempt[letter] === correct[letter]) {
            result[letter] = 1;
            delete attempt[letter];
            delete correct[letter];
        } else {
            result[letter] = 0;
        }
    }
    for (let key in correct) {
        if (!correct.hasOwnProperty(key)) {
            continue;
        }
        for (let letter in attempt) {
            if (!attempt.hasOwnProperty(letter)) {
                continue;
            }
            if (attempt[letter] == correct[key]) {
                result[key] = 2;
                delete attempt[letter];
                delete correct[key];
            }
        }
    }
    return result;
}
