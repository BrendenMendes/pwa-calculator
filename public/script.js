var buttons = document.querySelectorAll('.button')
var clear = document.querySelector('#⌫')
var clearTimer;
var inputValues = ""
var input1 = null
var input2 = 0
var operand = null
var total = 0

function compute(input){
	console.log(input)
	input1 = input.match(/\d*\.?\d*/)[0]
	input = input.replace(/\d*\.?\d*/, "")
	console.log(input)
	operand = input.match(/[\+\−\×\÷]/)[0]
	input = input.replace(/[\+\−\×\÷]/, "")
	input2 = input
	console.log(input1, input2)
	total = Big(input1)
	switch (operand) {
		case "+":
			total = total.plus(input2)
			break;
		case "−":
			total = total.minus(input2)
			break;
		case "×":
			total = total.times(input2)
			break;
		default:
			total = total.div(input2)
	}
	return total.toFixed()
}

function clearInputStart(){
	clearTimer = setTimeout(function() {
		document.getElementsByClassName("input")[0].innerHTML = 0
		input1 = null
		operand = null
		input2 = 0
		return false;
	},500);
}

function clearInputEnd(){
	clearTimeout(clearTimer);
	return false;
}

clear.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

clear.addEventListener('mouseup', clearInputEnd);

clear.addEventListener('touchend', clearInputEnd);

clear.addEventListener('mousedown', clearInputStart);

clear.addEventListener('touchstart', clearInputStart);

buttons.forEach(element => {
	element.addEventListener('contextmenu', (e) => {
	    e.preventDefault();
	});

	element.addEventListener('click', function (e) {
	    if(e.target.id == "⌫"){
	    	console.log(document.getElementsByClassName("input")[0].innerHTML)
    		let character = document.getElementsByClassName("input")[0].innerHTML.slice(-1);
    		if(operand && character.match(/\d/)){
    			input2 = input2.slice(0, -1)
    			document.getElementsByClassName("computed")[0].innerHTML = compute(input1+operand+input2)
    		}
    		else if(character.includes("+", "−", "×", "÷")){
    			operand = null
    			input2 = null
    		}
    		else if(character.match(/\d*\.?\d*/)){
    			input1 = document.getElementsByClassName("input")[0].innerHTML.slice(0, -1)
    		}
    		document.getElementsByClassName("input")[0].innerHTML = document.getElementsByClassName("input")[0].innerHTML.slice(0, -1)
    		if(document.getElementsByClassName("input")[0].innerHTML == ""){
    			document.getElementsByClassName("input")[0].innerHTML = 0
    			input1 = null
    			input2 = 0
    			operand = null
    		}
    	}
    	else {
    		if(input1 == null && (e.target.id == "÷" || e.target.id == "×")){
    			alert("Enter a number to begin")
    		}
		    else if (input1 == null){
		    	if(e.target.id == "." && !document.getElementsByClassName("input")[0].innerHTML.includes(".")){
		    		document.getElementsByClassName("input")[0].innerHTML = "0" + e.target.id
			    	input1 = "0" + e.target.id
		    	}
		    	else{
		    		document.getElementsByClassName("input")[0].innerHTML = e.target.id
			    	input1 = e.target.id
		    	}
		    }
		    else{
		    	if(input1 != null && operand != null && input2 == 0 && e.target.id == "." && !document.getElementsByClassName("input")[0].innerHTML.includes(".")){
		    		console.log(false)
		    		// document.getElementsByClassName("input")[0].innerHTML += "0" + e.target.id
		    	}
		    	if(e.target.id == "+" || e.target.id == "−" || e.target.id == "×" || e.target.id == "÷"){
		    		document.getElementsByClassName("input")[0].innerHTML += e.target.id
		    		switch (e.target.id) {
		    			case "+":
		    				operand = "+"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    				break;
		    			case "−":
		    				operand = "−"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    				break;
		    			case "×":
		    				operand = "×"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    				break;
		    			default:
		    				operand = "÷"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    		}
		    	}
		    	else if(operand != null && e.target.id != "="){
		    		console.log(input2)
		    		if(input2 === 0){
		    			if(e.target.id == "."){
		    				document.getElementsByClassName("input")[0].innerHTML += "0" + e.target.id
		    				input2 = "0" + e.target.id
		    			}
		    			else{
		    				document.getElementsByClassName("input")[0].innerHTML += e.target.id
		    				input2 = e.target.id
		    			}
		    		}
		    		else{
		    			console.log(e.target.id, input2)
		    			if(input2.includes(".") && e.target.id == "."){
		    				console.log('here')
		    			}
		    			else{
		    				document.getElementsByClassName("input")[0].innerHTML += e.target.id
		    				input2 += e.target.id
		    			}
		    		}
		    		document.getElementsByClassName("computed")[0].innerHTML = compute(input1+operand+input2)
		    		
		    	}
		    	else if(e.target.id == "="){
		    		document.getElementsByClassName("input")[0].innerHTML = total
		    		document.getElementsByClassName("computed")[0].innerHTML = ""
		    		input1 = total
		    		input2 = 0
		    		operand = null
		    	}
		    	else {
		    		if(input1.includes(".") && e.target.id == "."){
			    		console.log('non')
			    	}
			    	else{
			    		document.getElementsByClassName("input")[0].innerHTML += e.target.id
			    		input1 += e.target.id
			    	}
		    	}
		    }
		}
	});
})