"use strict";

let drawnNumbers = [];
let display, startTime, endTime, duration, interval, finalNumber, imageURL;
const lowerbound = 1;
const upperbound = 12;
let csrftoken = getToken("csrftoken")
let obj;

function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0,name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function fetchData() {
    fetch("./api/data/")
        .then(response => response.json())
        .then(data => {
            data.forEach(number => {
                drawnNumbers.push(number.number);
            });
            startCycling();
        })
        .catch(error => console.error("Error fetching data:", error));
}

async function fetchObj() {
    return fetch("./api/data/" + finalNumber + "/")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error("Error fetching data:", error));
}

async function postData(data) {
    fetch("./api/data/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken":csrftoken,
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

async function startCycling() {
    display = document.querySelector(".image-container .image-text");
    duration = 4444; // miliseconds
    startTime = Date.now();
    endTime = startTime + duration;
    
    finalNumber = getUniqueRandomNumber();
    updateNumber();
    postData({ number: finalNumber });
    obj = await fetchObj();

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
        updateImage();
        updateBall();
    } else {
        display.innerText = getRandomNumber();
        let intervalTime = Math.pow(progress, 2) * 100; // slows down over time
        interval = setTimeout(updateNumber, intervalTime);
    }
}

function updateBall() {
    document.getElementById("ball_" + finalNumber).classList = "bingo-ball on";
}

function updateImage() {
    const image = document.querySelector(".image-container img");
    image.src = obj.url;
    image.alt = obj.text;
}


const button = document.querySelector(".button-container button");
button.addEventListener("click", fetchData);