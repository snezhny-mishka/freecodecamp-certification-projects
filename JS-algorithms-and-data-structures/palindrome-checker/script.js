


const originalInput = document.getElementById("text-input");
// const originalInput = "eyes";
const buttonCheck = document.getElementById("check-btn");
const inputResult = document.getElementById("result");
// const regex = /[^A-Za-z0-9]/;  //all the characters we don't need

// if (originalInput.value =='') {
// 	alert('Please input a value');
// 	return;
// }

buttonCheck.addEventListener('click', addTextToDiv);

function addTextToDiv() {
	if (originalInput.value == '') {
		alert("Please input a value");
	}
	else {
	inputResult.innerHTML = checkPalindrome(originalInput.value);
	}
} 

function checkPalindrome(text) {

	const stringFirst = text.replace(/[^A-Za-z0-9]/g, ''); 
	const stringLowerCase = stringFirst.toLowerCase();

	//turn my String to Array
	const arrFirst = stringLowerCase.split('');
	//Now I have the 1st array to compare and need to create a reversed copy
	const arrSecond = arrFirst.toReversed();
	
	if(compareTwoArrays(arrFirst, arrSecond)) {
		return `${text} is a palindrome`;
	}
	else {
		return `${text} is not a palindrome`;
	}
}
	//now I have to compare the two arrays
function compareTwoArrays(arrFirst, arrSecond) {
	for (let i = 0; i < arrFirst.length; i++) {
		if (arrFirst[i] !== arrSecond[i]) {
			return false;
		}
	}
	return true;
}












