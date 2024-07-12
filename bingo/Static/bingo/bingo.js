'use strict';

let drawnNumbers = [];
let display, startTime, endTime, duration, interval, finalNumber;
const lowerbound = 1;
const upperbound = 90;

function startCycling() {
    display = document.querySelector('.image-container .image-text');
    duration = 4321; // miliseconds
    startTime = Date.now();
    endTime = startTime + duration;
    
    finalNumber = getUniqueRandomNumber();
    updateNumber();
    
    console.log(drawnNumbers);
    console.log(finalNumber);
}

function getUniqueRandomNumber() {
    let availableNumbers = [];
    for (let i = lowerbound; i <= upperbound; i++) {
        if (!drawnNumbers.includes(i)) {
            availableNumbers.push(i);
        }
    }
    if (availableNumbers.length === 0) {
        alert("All numbers have been drawn!");
        return;
    }
    let randomIndex = Math.floor(Math.random() * availableNumbers.length);
    let number = availableNumbers[randomIndex];
    drawnNumbers.push(number);
    return number;
}

function getRandomNumber() {
    return Math.floor(Math.random() * upperbound) + 1;
}

function updateNumber() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;
    let remainingTime = endTime - currentTime;
    let progress = elapsedTime / duration;

    if (remainingTime <= 0) {
        display.innerText = finalNumber;
        clearTimeout(interval);
    } else {
        display.innerText = getRandomNumber();
        let intervalTime = Math.pow(progress, 2) * 100; // slows down over time
        interval = setTimeout(updateNumber, intervalTime);
    }
}

const button = document.querySelector(".button-container button");
button.addEventListener("click", startCycling);