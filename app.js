
//calculator logic 
//find sum
function sum(a, b) {
    return a + b; 
}

//find difference
function subtract(a, b) {
    return a - b; 
}

//find product 
function multiply(a, b) {
    return a * b; 
}

//find quotient 
function divide(a, b) {
    if( b === 0) {
        return "CANNOT DIVIDE BY 0"; 
    }else {
      return a / b;   
    }   
}

//find power
function power (base, power) {
    let result = 1
    for(let i = 0; i < power; i++) {
        result *= base; 
    }
    return result; 
}

//operate function
function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return sum(a, b); 
        case "-":
            return subtract(a, b); 
        case "*":
            return multiply(a, b); 
        case "/":
            return divide(a, b); 
        case "^": 
            return power(a, b); 
        default:
            return "Invalid Operator"
    }
}

//moo button
const mooBtn = document.querySelector("#moo"); 
const mooSound = document.querySelector("#mooSound");
mooBtn.addEventListener("click", ()=> {
    if (mooSound.paused) {
        mooSound.play();
        mooBtn.textContent = "Stop it!"
    } else {
        mooSound.pause();
        mooBtn.textContent = "Suprise!"
    }
})

const displayBottomRow = document.querySelector("#displayBottomRow");
const displayTopRow = document.querySelector("#displayTopRow");
const btns = document.querySelectorAll("button"); 

let inputArrA = [];
let inputOperatorArr = [];
let inputArrB = [];
let operatorArr = ["+", "-", "*", "/", "^"]
let firstInput; 
let secondInput; 
let operatorChosen;
let result; 

function clearArr (arr) {
    arr.length = 0; 
}


function del_last(arr) {
    arr.splice(-2);
}

function negative(arr, negIndex) {
    
    arr.splice(-1, 1, "*", "-1", "=");

    //TODO: ok I think i need to figure out a way to have this return an operation immediately on screen 
}


//TODO add negative logic
    //multiply -1 to the num

//TODO implement the continous operations like 1+2*3

//TODO round decimals if it gets out of the display window (22 digits total)

//TODO disable decimal button after user has pressed it once for each number


function calculator(btns) {
    btns.forEach(btn => {
        btn.addEventListener("click", () => { 
            //if operatorArr is empty, then add to arrA until operator sign is pressed
            if (inputArrA.length !== 0 && operatorArr.includes(btn.value)) {
                inputOperatorArr.push(btn.value);
                console.log(`operator arr is ${inputOperatorArr}`);
                if (inputOperatorArr.includes("DEL")) {
                    del_last(inputOperatorArr);
                }
            }
            if (inputOperatorArr.length === 0) {
                inputArrA.push(btn.value); 
                console.log(`arrA is ${inputArrA}`);
                if (inputArrA.includes("DEL")) {
                    del_last(inputArrA);
                }
            }

            if (inputOperatorArr.length !== 0 && !(operatorArr.includes(btn.value))) {
                inputArrB.push(btn.value);
                console.log(`arrB is ${inputArrB}`)
                if (inputArrB.includes("DEL")) {
                    del_last(inputArrB);
                }
            }
            //add operator to inputoperatorArr 
            //if inputoperatorArr is not empty, then add the following elements to arrB
                //until either an operator is clicked again or equalsign is clicked
                    //then run operate function 
            
            if (btn.value === "C") {
                result = ""; 
                clearArr(inputArrA); 
                clearArr(inputArrB);
                clearArr(inputOperatorArr);
            }

            

            if (inputArrA.includes("negative")) {
                negative(inputArrA);
            }

            
            
           
        });
    });
}


calculator(btns);


