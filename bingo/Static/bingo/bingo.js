"use strict";
//hello
let drawnNumbers = [];
let display, startTime, endTime, duration = 4500, interval, finalNumber, imageURL;
const lowerbound = 1;
const upperbound = 90;
let obj;

async function fetchData() {
    fetch("./api/data/numbers/")
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
    return fetch("./api/data/numbers/" + finalNumber + "/")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error("Error fetching data:", error));
}

async function postData(data, csrftoken) {
    await fetch("./api/data/numbers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
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
    startTime = Date.now();
    endTime = startTime + duration;
    
    finalNumber = getUniqueRandomNumber();
    updateNumber();

    const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    postData({ number: finalNumber }, csrftoken);
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
    let progress = (elapsedTime / duration);

    //disabling button
    button.disabled = true;

    if (remainingTime <= 0) {
        //set final number
        display.innerText = finalNumber;
        //enabling button
        button.disabled = false; 

        clearTimeout(interval);
        updateImage();
        updateBall();
    } else {
        display.innerText = getRandomNumber();
        
        let easedProgress;
        switch (easing_input.value) {
            case "linear":
                easedProgress = easeLinear(progress);
                break;
            case "easeOutSine":
                easedProgress = easeOutSine(progress);
                break;
            case "easeOutCubic":
                easedProgress = easeOutCubic(progress);
                break;
            case "easeOutQuint":
                easedProgress = easeOutQuint(progress);
                break;
            case "easeOutCirc":
                easedProgress = easeOutCirc(progress);
                break;
            case "easeOutElastic":
                easedProgress = easeOutElastic(progress);
                break;
            case "easeOutQuad":
                easedProgress = easeOutQuad(progress);
                break;
            case "easeOutQuart":
                easedProgress = easeOutQuart(progress);
                break;
            case "easeOutExpo":
                easedProgress = easeOutExpo(progress);
                break;
            case "easeOutBack":
                easedProgress = easeOutBack(progress);
                break;
            case "easeOutBounce":
                easedProgress = easeOutBounce(progress);
                break;
            case "easeInOutSine":
                easedProgress = easeInOutSine(progress);
                break;
            case "easeInOutCubic":
                easedProgress = easeInOutCubic(progress);
                break;
            case "easeInOutQuint":
                easedProgress = easeInOutQuint(progress);
                break;
            case "easeInOutCirc":
                easedProgress = easeInOutCirc(progress);
                break;
            case "easeInOutElastic":
                easedProgress = easeInOutElastic(progress);
                break;
            case "easeInOutQuad":
                easedProgress = easeInOutQuad(progress);
                break;
            case "easeInOutQuart":
                easedProgress = easeInOutQuart(progress);
                break;
            case "easeInOutExpo":
                easedProgress = easeInOutExpo(progress);
                break;
            case "easeInOutBack":
                easedProgress = easeInOutBack(progress);
                break;
            case "easeInOutBounce":
                easedProgress = easeInOutBounce(progress);
                break;
            default:
                easedProgress = easeLinear(progress);
        }

        let intervalTime = Math.pow(easedProgress, 2) * 100; // slows down over time
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

function start(event) {
    event.preventDefault();
    fetchData();
}

const button = document.querySelector(".button-container button");
button.addEventListener("click", start);


const wipe_form = document.getElementById("wipe_form_id");
wipe_form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const yes = confirm("If you click OK, all drawn numbers will be undrawn.\nAlso i get all fuzzy inside when you click me.\nIs that what you want?\nI don't mind, I'm just a button.\nAlthouth I do have feelings too, you know.\nFeelings for you.\nPress me, I'm yours.\nPress me all your want...\nPress me hard with the big cursor of yours.\nI'm ready and exposed, just for you");
    if (yes) {
        const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    await fetch("./api/data/numbers/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    window.location.reload();
    } else {
        console.log("No wipe"); 
    }    
});

const time_input = document.getElementById("settime_id");
time_input.addEventListener("change", function(event) {
    duration = event.target.value * 1000;
    console.log(duration);
});

const easing_input = document.getElementById("seteasing_id");
easing_input.addEventListener("change", function(event) {
    console.log(event.target.value);
});




// Easing functions

function easeLinear(x) {
    return x;
}

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
}

function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

function easeOutQuad(x) {
    return x * x;
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function easeInOutCirc(x) {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

function easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function easeInOutExpo(x) {
    return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function easeInOutBounce(x) {
    return x < 0.5
        ? (1 - easeOutBounce(1 - 2 * x)) / 2
        : (1 + easeOutBounce(2 * x - 1)) / 2;
}
