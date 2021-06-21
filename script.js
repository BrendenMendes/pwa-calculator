var buttons = document.querySelectorAll('.button')

buttons.forEach(element => {
	element.addEventListener('click', function (e) {
	    console.log(e.target.id);
	});
})