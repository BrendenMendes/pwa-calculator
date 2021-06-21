var buttons = document.querySelectorAll('.button')
var inputValues = ""
var input1 = null
var input2 = 0
var operand = null
var total = 0

buttons.forEach(element => {
	element.addEventListener('click', function (e) {
	    console.log(e.target.id);
	    if(e.target.id == "⌫"){
	    	console.log(document.getElementsByClassName("input")[0].innerHTML)
    		document.getElementsByClassName("input")[0].innerHTML = document.getElementsByClassName("input")[0].innerHTML.slice(0, -1)
    		if(document.getElementsByClassName("input")[0].innerHTML == ""){
    			document.getElementsByClassName("input")[0].innerHTML = 0
    			input1 = null
    			input2 = 0
    			operand = null
    		}
    		else if(document.getElementsByClassName("input")[0].innerHTML.match(/\d+/) && ["+", "−", "×", "÷"].some(ele => document.getElementsByClassName("input")[0].innerHTML.includes(ele))){
    			console.log('here')
    		}
    	}
    	else {
    		if(input1 == null && (e.target.id == "÷" || e.target.id == "×")){
    			alert("Enter a number to begin")
    		}
		    else if (input1 == null){
		    	document.getElementsByClassName("input")[0].innerHTML = e.target.id
		    	input1 = e.target.id
		    }
		    else{
		    	document.getElementsByClassName("input")[0].innerHTML += e.target.id
		    	if(e.target.id == "+" || e.target.id == "−" || e.target.id == "×" || e.target.id == "÷"){
		    		switch (e.target.id) {
		    			case "+":
		    				operand = "+"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    				console.log(input1)
		    				break;
		    			case "−":
		    				operand = "-"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    				break;
		    			case "×":
		    				operand = "*"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    				break;
		    			default:
		    				operand = "/"
		    				if(input2 != 0){
		    					input1 = total
		    					input2 = 0
		    				}
		    		}
		    	}
		    	else if(operand != null && e.target.id != "="){
		    		input2 += e.target.id
		    		if(operand == "+"){
		    			console.log(parseFloat(input1) + parseFloat(input2))
		    			total = parseFloat(input1) + parseFloat(input2)
		    			document.getElementsByClassName("computed")[0].innerHTML = total
		    		}
		    		else if(operand == "-"){
		    			console.log(parseFloat(input1) - parseFloat(input2))
		    			total = parseFloat(input1) - parseFloat(input2)
		    			document.getElementsByClassName("computed")[0].innerHTML = total
		    		}
		    		else if(operand == "*"){
		    			console.log(parseFloat(input1) * parseFloat(input2))
		    			total = parseFloat(input1) * parseFloat(input2)
		    			document.getElementsByClassName("computed")[0].innerHTML = total
		    		}
		    		else{
		    			console.log(parseFloat(input1) / parseFloat(input2))
		    			total = parseFloat(input1) / parseFloat(input2)
		    			document.getElementsByClassName("computed")[0].innerHTML = total
		    		}
		    	}
		    	else if(e.target.id == "="){
		    		document.getElementsByClassName("input")[0].innerHTML = total
		    		document.getElementsByClassName("computed")[0].innerHTML = ""
		    		input1 = null
		    		input2 = 0
		    		operand = null
		    	}
		    	else {
		    		input1 += e.target.id
		    	}
		    }
		}
	});
})