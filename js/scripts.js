
var keys = document.querySelectorAll('#calculator span'); //returns a nodeList // Get all the keys from document
var operators = ['+', '-', '/', '*'];
var input = document.querySelector('.input');
var resultDisplayed, decimalAdded;
; // storing current input's last character - used later
var init = function() {
	input.innerHTML = '0';
	decimalAdded = false;
	resultDisplayed = false;
}
init();

// adding click handlers to all keys
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		
		var inputVal = input.innerHTML;
		var lastChar = inputVal[inputVal.length - 1]
		var btnVal = this.getAttribute("data-value"); // Getting the input and button values 
				
		// If clear key is pressed, erase everything
		if (btnVal == 'C') {
			init();
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
							
			// Replacing all instances of x and ÷ with * and / using regex and the 'g' tag which will replace all instances of the matched character/substring
			// inputVal = inputVal.replace(/x/g, '*').replace(/÷/g, '/');
			
			// checking if the last character is an operator or decimal, and if so, remove it.
			if(operators.indexOf(lastChar) > -1 || lastChar == '.') {
				inputVal = inputVal.replace(/.$/, ''); ///.$/ targets the last character: '.' matches any character while $ denotes the end of string.
			}
		
			if(inputVal) { // avoid "undefined" if input field is empty
				input.innerHTML = eval(inputVal);
			}
			decimalAdded = false;
			resultDisplayed = true;
		}
		
		// fixing small oprator bugs
		else if(operators.indexOf(btnVal) > -1) { // Checking if an operator has been clicked (or that the value of bntVal is in the operator array)
			
			if (resultDisplayed) {
				resultDisplayed = false;
			}		
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal !== '0' && operators.indexOf(lastChar) == -1)  {
				input.innerHTML += btnVal;
			}
			// Allow minus if the string is empty
			else if(inputVal === '0' && btnVal == '-') {
				input.innerHTML = btnVal;
			}
			// Replace the last operator (if exists) with the newly pressed operator
			else if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) { //checking if the last character is an operator AND if there's more than one character in the input field (avoid unintentionally replacing the minus character)
				input.innerHTML = inputVal.replace(/.$/, btnVal);//targets the last character of the strong and replaces it with the new operator 
			}
		
			decimalAdded = false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if (btnVal == '.') {
			if (resultDisplayed) {
				resultDisplayed = false;
			}	
			if (!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		else if (btnVal == '%') {
				input.innerHTML = parseFloat(inputVal * 0.01);
				decimalAdded = true;
		}
		else if (btnVal == '+/-') {
			if (input.innerHTML >0) {
				input.innerHTML = -input.innerHTML;
			}
			else {
				input.innerHTML = input.innerHTML.replace(/-/g, '');
			}
		}
		// if any other key is pressed, append the key values (btnValue) to the input string 
		else {
			
			if (input.innerHTML === '0' || resultDisplayed) {
				input.innerHTML='';
				input.innerHTML += btnVal;
				resultDisplayed = false;
			}
			else {
				input.innerHTML += btnVal;
			}
		}
		// prevent page jumps
		e.preventDefault();
	} 
}