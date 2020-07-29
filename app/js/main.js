'use strict';

const xhr = new XMLHttpRequest();
const url = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
// const proxyUrl = "https://cryptic-headland-94862.herokuapp.com/";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

xhr.open('GET', proxyUrl + url, true);
xhr.responseType = 'json';
xhr.send();

xhr.onerror = function () {
		alert("Запрос не удался");
};

xhr.onload = function () {
		let newContent = '';
		const cart = {};
		const content = document.getElementById('content');
		// const basket = document.getElementsByClassName('button');
		const basket = document.querySelector('button');
		const order = document.getElementsByClassName('order');

		if (xhr.status === 200) {
				let responseObject = xhr.response;
				for (let i = 0; i < responseObject.response.data.length; i++) {
						newContent += '<div class="pizzas">';
						newContent += '<img src="' + responseObject.response.data[i].photo_small + '">';
						newContent += '<p class="title"><a>' + responseObject.response.data[i].title + '</a></p>';
						newContent += '<div class="size">' +
										'<p class="pizza">' + 'Большая' + '</p>' +
										'<p class="price">' + responseObject.response.data[i].big_price / 10000 + '0' +
										'<button class="basket" data-id="' + responseObject.response.data[i].title + '">' + 'В корзину' +
										'</button>' + '</p>' +
										'<p class="weight">' + responseObject.response.data[i].big_weight + '</p>' +
										'</div> '; // bigSize
						newContent += '<div class="size">' +
										'<p class="pizza">' + 'Стандартная' + '</p>' +
										'<p class="price">' + responseObject.response.data[i].medium_price / 10000 + '0' +
										'<button class="basket" data-id="' + responseObject.response.data[i].title + '">' + 'В корзину' +
										'</button>' + '</p>' +
										'<p class="weight">' + responseObject.response.data[i].medium_weight + '</p>' +
										'</div> ';// mediumSize
						newContent += '<p class="anonce">' + responseObject.response.data[i].anonce + '</p>';
						newContent += '</div> '; // pizzas
				}
		}
		content.innerHTML = newContent;

		document.onclick = event => {
				if (event.target.classList.contains('basket')) {
						localStorage.setItem('pizza', event.target.dataset.id);
						// addToCart(event.target.dataset.id);
				}
		}
};