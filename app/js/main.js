'use strict';

const xhr = new XMLHttpRequest();

// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const pizzas = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
const addItem = 'https://pzz.by/api/v1/basket/add-item?type=responseObjectXhrAddItem.response.data.type';

xhr.open('GET', pizzas, true);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function () {
		let newContent = '';
		const content = document.getElementById('content');
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

		document.onclick = event => {
				if (event.target.classList.contains('basket')) {
								const xhrAddItem = new XMLHttpRequest();
								const formData = new FormData();
								// const responseObjectXhrAddItem = xhrAddItem.response;

								formData.append('type', 'responseObjectXhrAddItem.response.data.type');
								// formData.append('id', 'responseObjectXhrAddItem.response.data.id');
								// formData.append('size', 'responseObjectXhrAddItem.response.data.size');
								// formData.append('dough', 'responseObjectXhrAddItem.response.data.dough');

								xhrAddItem.open('POST', addItem, true);
								xhrAddItem.setRequestHeader('Content-Type', 'multipart/form-data');
								xhrAddItem.send(formData);
				}
		}

};
