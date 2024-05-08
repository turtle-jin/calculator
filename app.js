
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
const mooBtn = document.querySelector(".moo"); 
const mooSound = document.querySelector("#mooSound");
mooBtn.addEventListener("click", ()=> {
    mooSound.play();
})

const currentDisplay = document.querySelector("#currentDisplay");
const displayTopRow = document.querySelector("#displayTopRow");
const btns = document.querySelectorAll("button"); 

let valueA = [];
let valueB = [];
let operatorChosen = [];
let firstInput; 
let secondInput; 
function getInput(btns) {
    btns.forEach(btn => {
        btn.addEventListener("click", () => { 
            if (btn.classList.contains("digits")) {
                valueA.push(btn.textContent);
                console.log(valueA);
                currentDisplay.textContent = valueA.join(""); 
            }else {
                firstInput = valueA.join("");
                console.log(`The first user inpust is ${firstInput}`);
                operatorChosen.push(btn.textContent); 
                console.log(`The operator user picked is ${operatorChosen[0]}`);
                displayTopRow.textContent = firstInput; 
                currentDisplay.textContent = operatorChosen[0];
                if(btn.classList.contains("digits")) {
                    valueB.push(btn.textContent);
                    console.log(valueB); 

                }

            }     
        }); 
    });
}

getInput(btns);


