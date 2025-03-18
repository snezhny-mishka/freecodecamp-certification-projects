/*
optional 1 +
optional space \s +
optional ( +
numbers (3) +
optional )
optional -
optional space
numbers (3)
optional -
optional space
numbers (4)
OR
10 numbers without the first 1 and spaces

/^1?(?:\s|\(|\s\()?[0-9]{3}(?:\s|\)|-|\)\s)?[0-9]{3}(?:\s|\)|-)?[0-9]{4}$/g
*/


const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const expectedInput = /^1?(?:\s|\(|\s\()?[0-9]{3}(?:\s|\)|-|\)\s)?[0-9]{3}(?:\s|\)|-)?[0-9]{4}$/;

// const str = "2 (757) 622-7382";


const inputValidation = (str) => expectedInput.test(str);
// console.log(inputValidation(str));

checkBtn.addEventListener('click', () => {
    if (userInput.value === "") {
        alert("Please provide a phone number");
        return;
    } else if (inputValidation(userInput.value)) {
        result.textContent = `Valid US number: ${userInput.value}`;
        
        
    } else {
        
        result.textContent = `Invalid US number: ${userInput.value}`;
        
    }
}
);

const clear = () => {
    userInput.value = "";
    result.textContent = "";
}

clearBtn.addEventListener('click', clear);


// result.textContent = inputValidation(userInput.value) 
// ? `Valid US number: ${userInput.value}`
// : `"Invalid US number: ${userInput.value}`;
