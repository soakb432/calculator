// -- OPERATION VARIABLES -- //

let firstOperand = null;
let operator = null
let secondOperand = null;
let result = null;

// -- MATH OPERATIONS -- //

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
    }
}

// -- DISPLAY POPULATION -- //

const display = document.querySelector(".display");
const numKey = document.querySelectorAll(".number");

numKey.forEach((key) => {
    key.addEventListener("click", () => {
        if (display.textContent === "0") {
            display.textContent = key.textContent;
        } else {
            display.textContent += key.textContent;
        }
    })
});

const opKey = document.querySelectorAll(".operator");

opKey.forEach((key) => {
    key.addEventListener("click", () => {
        operator = key.textContent;
        if (firstOperand === null) {
            firstOperand = parseInt(display.textContent);
        }
        display.textContent = `${firstOperand} ${operator} `;
    })
});