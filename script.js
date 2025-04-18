// -- OPERATION VARIABLES -- //

let firstOperand = null;
let operator = null
let secondOperand = null;
let result = null;
const errorMessage = "ERROR";

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

function modulo(a, b) {
    return a % b;
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
        case "%":
            return modulo(firstNum, secondNum);
    }
}

// -- DISPLAY POPULATION -- //

const mainDisplay = document.querySelector(".display .main");
const subDisplay = document.querySelector(".display .sub");
const numKey = document.querySelectorAll(".number");
const opKey = document.querySelectorAll(".operator");
const eqKey = document.querySelector(".equal");
const funcKey = document.querySelectorAll(".function");

numKey.forEach((key) => {
    key.addEventListener("click", () => {
        switch (mainDisplay.textContent) {
            case `${result}`:
                clearCalculator();
            default:
                if (mainDisplay.textContent === "0") {
                    mainDisplay.textContent = key.textContent;
                } else {
                    mainDisplay.textContent += key.textContent;
                }
        }
    })
});

opKey.forEach((key) => {
    key.addEventListener("click", () => {
        if (mainDisplay.textContent) {
            if (firstOperand === null) {
                firstOperand = parseFloat(mainDisplay.textContent);
            } else if (secondOperand === null) {
                secondOperand = parseFloat(mainDisplay.textContent);
            }
        }
        
        if (secondOperand || secondOperand === 0) {
            if (secondOperand === 0 && (operator === "/" || operator === "%")) {
                alert(errorMessage);
                clearCalculator();
            } else {
                result = operate(operator, firstOperand, secondOperand);
                firstOperand = result;
            }
        }
        
        if (firstOperand || firstOperand === 0) {
            operator = key.textContent;
            subDisplay.textContent = `${firstOperand} ${operator} `;
            secondOperand = null;
            result = null;
        }
        mainDisplay.textContent = "";
    })
});

eqKey.addEventListener("click", () => {
    let isOperable = ((firstOperand || firstOperand === 0) && (operator !== null) && (mainDisplay.textContent) && (result === null));
    if (isOperable) {
        secondOperand = parseFloat(mainDisplay.textContent);
        if (secondOperand === 0 && (operator === "/" || operator === "%")) {
            alert(errorMessage);
            clearCalculator();
        } else {
            result = operate(operator, firstOperand, secondOperand);
            subDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
            mainDisplay.textContent = `${result}`;
            firstOperand = null;
            secondOperand = null;
        }
    }
});

funcKey.forEach((key) => {
    key.addEventListener("click", () => {
        switch (key.textContent) {
            case "AC":
                clearCalculator();
                break;
            case "C":
                clearInput();
                break;
            case "+/-":
                convertPositiveToNegative();
                break;
            case ".":
                convertToDecimal();
                break;
        }
    })
});

// -- FUNCTIONS -- //

function clearCalculator() {
    mainDisplay.textContent = "";
    subDisplay.textContent = "";
    firstOperand = null;
    operator = null;
    secondOperand = null;
    result = null;
}

function clearInput() {
    if (result || mainDisplay.textContent === `${result}`) {
        subDisplay.textContent = "";
        result = null;
    }

    let currInput = mainDisplay.textContent.split("");
    if (currInput[0] === "-" && currInput.length === 2) {
        mainDisplay.textContent = "";
    } else {
        currInput.pop();
        mainDisplay.textContent = currInput.join("");
    }
}

function convertPositiveToNegative() {
    if (result || mainDisplay.textContent === `${result}`) {
        subDisplay.textContent = "";
        result = null;
    }

    if (mainDisplay.textContent && result === null) {
        mainDisplay.textContent = `${mainDisplay.textContent * -1}`;
    }
}

function convertToDecimal() {
    if (result || mainDisplay.textContent === `${result}`) {
        subDisplay.textContent = "";
        mainDisplay.textContent = "";
        result = null;
    }

    if (mainDisplay.textContent && !mainDisplay.textContent.includes(".")) {
        mainDisplay.textContent += ".";
    } else if (mainDisplay.textContent === "") {
        mainDisplay.textContent = "0.";
    }
}