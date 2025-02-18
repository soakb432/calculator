// -- OPERATION VARIABLES -- //

const DEFAULT_NUM = 0;
const DEFAULT_OPERATOR = "";

let firstOperand = DEFAULT_NUM;
let operator = "";
let secondOperand = DEFAULT_NUM;

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
const keypad = document.querySelectorAll(".keyboard .number");

keypad.forEach((key) => {
    key.addEventListener("click", () => {
        if (display.textContent === "0") {
            display.textContent = key.textContent;
        } else {
            display.textContent += key.textContent;
        }
    })
});
