//testimonials slider//

let Index = 0;

function showTestimonial(index) {
	const items = document.querySelectorAll('.testimonials_slider-item');
	items[Index].classList.remove('active_testimonial');
	Index = (index + items.length) % items.length;
	items[Index].classList.add('active_testimonial');
}

function changeTestimonial(offset) {
	showTestimonial(Index + offset);
}

document.querySelector('.next-btn').addEventListener('click', () => {
	changeTestimonial(1);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
	changeTestimonial(-1);
});
//testimonials slider//

//gallery slider //

const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 20,
	navigation: {
		nextEl: '.next-button',
		prevEl: '.prev-button',
	},
	breakpoints: {
		900: {
			slidesPerView: 3,
		},

		513: {
			slidesPerView: 2,
		},
	},
});

//gallery slider //
