'use strict';
// promo slider //
let currentSlideIndex = 1;

function showSlide(n) {
	const slides = document.getElementsByClassName('slide');
	if (n > slides.length) {
		currentSlideIndex = 1;
	}
	if (n < 1) {
		currentSlideIndex = slides.length;
	}
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	slides[currentSlideIndex - 1].style.display = 'flex';
}

function activateStrip(n) {
	const strips = document.getElementsByClassName('promo__nav-strip');
	for (let i = 0; i < strips.length; i++) {
		strips[i].classList.remove('active-strip');
	}
	strips[n - 1].classList.add('active-strip');
}

function changeSlide(n) {
	showSlide((currentSlideIndex = n));
	activateStrip(n);
}

function autoSlide() {
	showSlide((currentSlideIndex += 1));
	activateStrip(currentSlideIndex);
	setTimeout(autoSlide, 5000); // 5000 milliseconds = 5 seconds
}

document.addEventListener('DOMContentLoaded', function () {
	autoSlide();

	const strips = document.getElementsByClassName('promo__nav-strip');
	for (let i = 0; i < strips.length; i++) {
		strips[i].addEventListener('click', function () {
			changeSlide(i + 1);
		});
	}
});

// promo slider //

//lessons mob //
const cardElements = document.querySelectorAll('.lessons__cards-mob');

cardElements.forEach(function (card) {
	const img = card.querySelector('.lessons__img-mob');
	const box = card.querySelector('.lessons__box');
	const close = card.querySelector('.close');

	card.addEventListener('click', function () {
		img.classList.add('hidden');
		box.style.opacity = '1';
	});

	if (close) {
		close.addEventListener('click', function (event) {
			event.stopPropagation();
			img.classList.remove('hidden');
			box.style.opacity = '0';
		});
	}
});

//lessons mob //

$('.your-class').slick({
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	adaptiveHeight: true,
});

const form = document.querySelector('.form');
const tel = document.querySelector('input[type="tel"]');
const inputMask = new Inputmask('');
const message = {
	loading: 'Sending...',
	failed: 'Form not submitted',
};
inputMask.mask(tel);
const validation = new JustValidate('.form', {});
validation
	.addField('.input-name', [
		{
			rule: 'required',
			errorMessage: 'Please fill out the field',
		},
		// {
		//     rule:"minLength",
		//     value: 3,
		//     errorMessage:"мало символов",

		// },
		// {
		//     rule:"maxLength",
		//     value:30,
		//     errorMessage:"много символов",
		// }
	])
	.addField('.input-mail', [
		{
			rule: 'required',
			errorMessage: 'Please fill out the field',
		},
		// {
		//     rule: 'email',
		//     errorMessage: 'Введите корректный Email',
		// },
	])
	.addField('.input-tel', [
		{
			rule: 'required',
			errorMessage: 'Please fill out the field',
		},
		// {
		//     rule: 'function',
		//     validator: function() {
		//         const phone = tel.inputmask.unmaskedvalue(); // получим чистое значение телефона без маски
		//          console.log(phone)
		//         return phone.length === 9   ; // должно быть 9 символов
		//     },
		//     errorMessage: 'Введите корректный телефон',
		// },
	])
	.onSuccess(event => {
		// здесь передается event - с помощью него мы можем получать нашу форму

		let formData = new FormData(event.target); // объект в который попадают все поля нашей формы единоразово
		// formData.append("file_attach", file_attach.files[0]); // если нужно из формы только один файл отправить

		let statusMessage = document.createElement('div');
		statusMessage.classList.add('status');
		event.target.appendChild(statusMessage);

		const ajaxSend = async formData => {
			document.querySelector('.status').innerHTML = message.loading;
			const response = await fetch('mail.php', {
				method: 'POST',
				body: formData,
			});
			if (!response.ok) {
				throw new Error(
					`Ошибка по адресу ${response.url}, статус ошибки ${response.status}`
				);
			}
			//console.log(response.text())
			return await response.text();
		};

		ajaxSend(formData)
			.then(response => {
				statusMessage.innerHTML = response;
			})
			.catch(err => {
				statusMessage.innerHTML = message.failed;
				console.error(err);
			})
			.finally(() => {
				event.target.reset(); // очищаем поля формы
				setTimeout(() => {
					statusMessage.remove(); // удаляем статус
				}, 5000);
			});
	});
