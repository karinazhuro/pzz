'use strict';

$(function () {
		async function basket() {
				const urlBasket = 'https://pzz.by/api/v1/basket';
				const response = await fetch(urlBasket)
								.then(function (response) {
										response.json()
														.then(function (obj) {
																const data = obj.response.data.items;
																for (let i = 0; i < data.length; i++) {
																		const order = document.getElementById('order');
																		const total = document.getElementById('total');
																		let size = '';

																		if (data[i].size === 'big') {
																				size = 'Большая';
																		} else if (data[i].size === 'medium') {
																				size = 'Стандартная';
																		}

																		order.innerHTML += `<h3 id="orderTitle">${data[i].title}</h3>
                <p id="orderSize">${size}</p>
                <button id="orderPlus">+</button>
                <div id="orderCounter">1</div>
                <button id="orderMinus">-</button>
                <p id="orderCost">${(data[i].price / 1000).toFixed(2)}</p>`;
																		total.innerHTML = `${data[i].total}`;
																}
														})
								})

		}

		basket();

		$(document).on('click', '.orderPlus', function (e) {
				console.log(true);
		})

});