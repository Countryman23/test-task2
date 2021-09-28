//slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
	showSlides(slideIndex += 1);
}

function minusSlide() {
	showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("slider_item");
	let dots = document.getElementsByClassName("slider-dots_item");
	if (n > slides.length) {
	  slideIndex = 1
	}
	if (n < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

//send field
const {form} = document.forms;

function retrieveFormValue(event) {
	event.preventDefault();

	const {name, gender, country, city, date} = form;

	const values = {
		name: name.value,
		gender: gender.value,
		country: country.value,
		city: city.value,
		date: date.value,
	};

	console.log(values);
}

form.addEventListener('submit', retrieveFormValue);

//visibl field
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
const input5 = document.getElementById('input5');

function checkInput() {
	if(input1.value && input2.value) {
		input3.style.display = "block"
		input4.style.display = "block"
		input5.style.display = "block"
	}
}

input1.addEventListener("change", checkInput);
input2.addEventListener("change", checkInput);

//add file
const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");
const addDocument = document.getElementById("addDocument");

customBtn.addEventListener("click", function() {
	realFileBtn.click();
	addDocument.style.display = "block"
	});

realFileBtn.addEventListener("change", function() {
	if (realFileBtn.value) {
		customTxt.innerText = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
	} else {
		customTxt.innerText = "Файл не выбран.";
	}
});

//completed
const sendBtn = document.getElementById("Send-btn");
const completed = document.getElementById("completed");

function visibl() {
	completed.style.display = "block"
};

sendBtn.addEventListener("click", visibl)