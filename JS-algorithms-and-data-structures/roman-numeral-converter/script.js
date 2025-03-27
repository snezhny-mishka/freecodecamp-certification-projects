const inputNumber = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const result = document.getElementById('output');

const romanRef = {
    numbers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    letters: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
};

function toRoman(num) {
    let output = '';
    for (let i = 0; i < 13; i++) {
        while(num >= romanRef.numbers[i]) {
            output += romanRef.letters[i];
            num -= romanRef.numbers[i];
        }
    }
    return output;
}

//input validation
function inputValidation() {
    let errorText = "";
    if(inputNumber.value == '') {
        errorText  = "Please enter a valid number";
    } else if (inputNumber.value <= 0) {
        errorText = "Please enter a number greater than or equal to 1";    
    } else if(inputNumber.value > 3999) {
        errorText  = "Please enter a number less than or equal to 3999";
    } else {
        return true;
    }
    result.innerHTML = errorText;
    return false;
};

function displayResult() {
    result.classList.remove('hidden');
    if(inputValidation()) {
        result.innerHTML = toRoman(inputNumber.value);
    }
}

convertButton.addEventListener('click', displayResult);

inputNumber.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        displayResult();
    }
});  



