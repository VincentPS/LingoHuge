"use strict";


/**
 * TODO: woord zetten in een cookie/ajax call naar de server.
 */
function buttonGameStart() {
    window.location.href = "/LingoHuge/Game";
}

function startGame() {
    localStorage.setItem('activeRow', 1);
    makeWord();
    drawGrid();
    setActiveRow(localStorage.getItem('activeRow'));
    eventListenerTable();
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

/**
 * TODO: Style apart van de logica. (class toevoegen aan een childnode + css).
 */
function setActiveRow(identifier) {
    let currentWord = localStorage.getItem('word').split("");
    if (identifier < 7) {
        let currentRow = document.getElementById("row" + identifier);
        for (let i = 0; i < 5; i++) {
            currentRow.childNodes[i].childNodes[0].removeAttribute('disabled');
            currentRow.childNodes[0].childNodes[0].value = currentWord[0];
            currentRow.childNodes[0].childNodes[0].style.backgroundColor = "#e4453b";
            currentRow.childNodes[0].childNodes[0].style.borderRadius = "5%";
        }
    } else {
        document.getElementById("submitWord").outerHTML = "";
        window.location.href = "Game/GameOver";
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

/**
 * TODO: GULP even installeren :)
 */

function checkResult() {
    let result = [];
    let counter = 1;
    let currentWord = localStorage.getItem('word').split("");
    let wordArray = getLetters(localStorage.getItem('activeRow'));
    let newRowValue = parseInt(localStorage.getItem('activeRow')) + 1;
    localStorage.setItem('activeRow', newRowValue);
    disablePreviousRow();
    for (let i = 0; i < currentWord.length; i++) {
        result.push(filterLetters(currentWord[i], wordArray[i]));
    }
    result = filter(currentWord, wordArray);
    setResult(result, counter);
}

/**
 * TODO: ONKEYPRESS TAB
 */
function eventListenerTable() {
    let table = document.getElementById("lingoTable");
    table.addEventListener('keyup', function (e) {
        let target = e.target;
        let maxLength = parseInt(target.getAttribute('maxlength'));
        let myLength = target.value.length;
        if (myLength >= maxLength) {
            let next = target.value;
            if (next == target && target !== null) {
                next.removeAttribute('readonly');
                next.focus();
            }
        }
    });
}

function setResult(result, counter) {
    let previousRow = document.getElementById("row" + (parseInt(localStorage.getItem('activeRow')) - 1));
    setTimeout(function () {
        if (result[counter] === 1) {
            previousRow.childNodes[counter].childNodes[0].style.backgroundColor = "#e4453b";
            previousRow.childNodes[counter].childNodes[0].style.borderRadius = "5%";
        } else if (result[counter] === 2) {
            previousRow.childNodes[counter].childNodes[0].style.backgroundColor = "#ffe033";
            previousRow.childNodes[counter].childNodes[0].style.borderRadius = "45%";
        }
        counter++;
        if (counter < result.length) {
            setResult(result, counter);
        } else {
            gameStatus(result);
            setActiveRow(localStorage.getItem('activeRow'));
        }
    }, 300)
}

/**
 * TODO: OF opsplitsen in 2 function OF combineren met else if.
 */
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

function gameStatus(result) {
    let correct = 1;
    let all = true;
    let none = true;
    for (let i = 0; i < result.length; i++) {
        if (result[i] !== correct) {
            all = false;
        } else {
            none = false;
        }
    }
    if (all) {
        window.location.href = "Game/Completed";
    }
}
