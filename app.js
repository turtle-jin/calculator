
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

let inputArr = [];
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


//TODO add negative logic
    //multiply -1 to the num

function getInput(btns) {
    btns.forEach(btn => {
        btn.addEventListener("click", () => { 
            inputArr.push(btn.value);
            console.log(inputArr); 
            if (inputArr.includes("C")) {
                result = ""; 
                clearArr(inputArr); 
            }

            if (inputArr.includes("DEL")) {
                del_last(inputArr);
            }

            displayTopRow.textContent = inputArr.join("");
            let operatorIndex = inputArr.findIndex(item => operatorArr.includes(item));
            if (operatorIndex !== -1) {
                firstInput = Number(inputArr.slice(0, operatorIndex).join(""));
                operatorChosen = inputArr[operatorIndex];
                     
                let equalIndex = inputArr.indexOf("=");
                if (equalIndex !== -1) {
                    secondInput = Number(inputArr.slice(operatorIndex + 1, equalIndex).join(""));
                    console.log(`second input is ${secondInput}`);
                    // Perform calculation
                    result = operate(operatorChosen, firstInput, secondInput);
                    console.log(`result is ${result}`);
                    clearArr(inputArr);   
                    }

    

                if (operatorArr.includes(inputArr[0])) {
                     inputArr.unshift(result);   
                     console.log(`the new arr is now ${inputArr}`);     
                }

                if (operatorArr.includes(inputArr[1]) && inputArr.length >= 3) {
                    result = "";
                }
            } 
                        
            displayBottomRow.textContent = result;
            // displayTopRow.textContent = inputArr.join("");
            
           
        });
    });
}


getInput(btns);


