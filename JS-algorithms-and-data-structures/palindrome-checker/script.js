const originalInput = document.getElementById("text-input");
const buttonCheck = document.getElementById("check-btn");
const inputResult = document.getElementById("result");

buttonCheck.addEventListener("click", addTextToDiv);

function addTextToDiv() {
    if (originalInput.value == "") {
        alert("Please input a value");
    } else {
        inputResult.innerHTML = checkPalindrome(originalInput.value);
    }
}

function checkPalindrome(text) {
    const stringFirst = text.replace(/[^A-Za-z0-9]/g, "");
    const stringLowerCase = stringFirst.toLowerCase();
    const arrFirst = stringLowerCase.split("");
    const arrSecond = arrFirst.toReversed();

    if (compareTwoArrays(arrFirst, arrSecond)) {
        return `${text} is a palindrome`;
    } else {
        return `${text} is not a palindrome`;
    }
}

function compareTwoArrays(arrFirst, arrSecond) {
    for (let i = 0; i < arrFirst.length; i++) {
        if (arrFirst[i] !== arrSecond[i]) {
            return false;
        }
    }
    return true;
}