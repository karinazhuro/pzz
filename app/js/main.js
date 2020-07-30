'use strict';

const xhr = new XMLHttpRequest();
// const xhrAddItem = new XMLHttpRequest();

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const pizzas = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
const addItem = 'https://pzz.by/api/v1/basket/add-item';

xhr.open('GET', proxyUrl + pizzas, true);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function () {
		let newContent = '';
		const content = document.getElementById('content');
		const btn = document.querySelectorAll('.basket');
		const responseObject = xhr.response;
		const response = responseObject.response;

		if (xhr.status === 200) {
				for (let i = 0; i < responseObject.response.data.length; i++) {
						newContent += '<div class="pizzas">';
						newContent += '<img src="' + response.data[i].photo_small + '">';
						newContent += '<p class="title"><a>' + response.data[i].title + '</a></p>';
						newContent += '<div class="size">' +
										'<p class="pizza">' + 'Большая' + '</p>' +
										'<p class="price">' + response.data[i].big_price / 10000 + '0' +
										'<button class="basket" id="b" data-id="' + response.data[i].title + '">' + 'В корзину' +
										'</button>' + '</p>' +
										'<p class="weight">' + response.data[i].big_weight + '</p>' +
										'</div> '; // bigSize
						newContent += '<div class="size">' +
										'<p class="pizza">' + 'Стандартная' + '</p>' +
										'<p class="price">' + response.data[i].medium_price / 10000 + '0' +
										'<button class="basket" data-id="' + response.data[i].title + '">' + 'В корзину' +
										'</button>' + '</p>' +
										'<p class="weight">' + response.data[i].medium_weight + '</p>' +
										'</div> ';// mediumSize
						newContent += '<p class="anonce">' + response.data[i].anonce + '</p>';
						newContent += '</div> '; // pizzas
				}
		}
		content.innerHTML = newContent;
};

document.onclick = event => {
		if (event.target.classList.contains('basket')) {
				sendData({test: 'ok'});

				function sendData(data) {
						const xhrAddItem = new XMLHttpRequest();
						const formData = new FormData();
						const responseObjectXhrAddItem = xhrAddItem.response;
						const type = responseObjectXhrAddItem.response.data.type;

						for( name in data ) {
								formData.append('type', type);
								formData.append('id', responseObjectXhrAddItem.response.data.id);
								formData.append('size', responseObjectXhrAddItem.response.data.size);
								formData.append('dough', responseObjectXhrAddItem.response.data.dough);
						}

						xhrAddItem.addEventListener('load', function (event) {
								alert('Yeah! Data sent and response loaded.');
						});

						xhrAddItem.addEventListener(' error', function (event) {
								alert('Oops! Something went wrong.');
						});

						xhrAddItem.open('POST', proxyUrl + addItem, true);


						xhrAddItem.send(formData);
				}

// 				const order = document.getElementsByClassName('order');
//
// 				xhrAddItem.open('POST', proxyUrl + addItem, true);
// 				xhrAddItem.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 				xhrAddItem.send(formData);
//
// 				// xhrAddItem.onload = function () {
// 				// 		let contentPizza = '';
// 				// 		let a = 0;
// 				// 		const order = document.getElementsByClassName('order');
// 				// 		const responseObjectXhrAddItem = xhrAddItem.response;
// 				//
// 				// 		xhrAddItem.onreadystatechange = function () {
// 				// 				if (this.readyState === 4 && this.status === 200) {
// 				// 						for (let i = 0; i < responseObjectXhrAddItem.response.data.length; i++) {
// 				// 								contentPizza += '<div class="orderPizza"> ';
// 				// 						}
// 				// 				}
// 				//
// 				// 				order.innerHTML = contentPizza;
// 				// 		}
// 				// }
		}
}