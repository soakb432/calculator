// -- OPERATION VARIABLES -- //

let firstOperand;
let operator;
let secondOperand;

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
    }
}