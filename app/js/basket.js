'use strict';

import {pzzNetService} from './pzzNetService.js';

class Cart {
	showBasket(data) {
		const notice = document.getElementById('notice');
		const orderRegistration = document.getElementById('orderRegistration');

		if (data.items.length === 0) {
			notice.style.display = 'flex';
		} else {
			const order = document.getElementById('order');

			notice.style.display = 'none';
			orderRegistration.style.display = 'flex';

			cart.updateUICart(data, order);
		}
	}

	updateUICart(data, order) {
		const getPizzaSizeOrderCounter = document.getElementsByClassName('pizzaSizeOrderCounter');

		console.log(getPizzaSizeOrderCounter, getPizzaSizeOrderCounter.length)
		for (let i = 0; i < data.items.length; i++) {

			if (getPizzaSizeOrderCounter.length === 0) {
				cart.buildCart(data.items[0], order);
				getPizzaSizeOrderCounter[0].textContent = String(Number(getPizzaSizeOrderCounter[0].textContent) + 1);
			}

			if (data.items[i + 1].id !== getPizzaSizeOrderCounter[i].getAttribute('data-id') &&
				data.items[i + 1].size !== getPizzaSizeOrderCounter[i].getAttribute('data-size')) {
				cart.buildCart(data.items[i + 1], order);
				getPizzaSizeOrderCounter[i].textContent = String(Number(getPizzaSizeOrderCounter[i].textContent) + 1)
			} else {
				getPizzaSizeOrderCounter[i].textContent = String(Number(getPizzaSizeOrderCounter[i].textContent) + 1)
			}
		}
	}

	buildCart(data, order) {
		const pizzaItem = document.createElement('div');
		const pizzaDesc = document.createElement('div');
		const pizzaTitle = document.createElement('h3');
		const pizzaSize = document.createElement('h6');
		const pizzaSizeCount = document.createElement('div');
		const pizzaRemove = document.createElement('button');
		const pizzaSizeOrderCounter = document.createElement('p');
		const pizzaAdd = document.createElement('button');
		const pizzaSum = document.createElement('p');
		let sizeCondition = '';

		if (data.size === 'big') {
			sizeCondition = 'Большая';
		} else if (data.size === 'medium') {
			sizeCondition = 'Стандартная';
		}

		pizzaItem.classList.add('pizzaItem');
		pizzaDesc.classList.add('pizzaDesc');
		pizzaTitle.classList.add('pizzaTitle');
		pizzaSize.classList.add('pizzaSize');
		pizzaSizeCount.classList.add('pizzaSizeCount');
		pizzaRemove.classList.add('pizzaRemove');
		pizzaSizeOrderCounter.classList.add('pizzaSizeOrderCounter');
		pizzaAdd.classList.add('pizzaAdd');
		pizzaSum.classList.add('pizzaSum');

		pizzaRemove.dataset.id = `${data.id}`;
		pizzaRemove.dataset.size = `${data.size}`;

		pizzaAdd.dataset.id = `${data.id}`;
		pizzaAdd.dataset.size = `${data.size}`;

		pizzaSizeOrderCounter.dataset.id = `${data.id}`;
		pizzaSizeOrderCounter.dataset.size = `${data.size}`;

		pizzaTitle.textContent = `${data.title}`;
		pizzaSize.textContent = `${sizeCondition}`;
		pizzaRemove.textContent = `-`;
		// pizzaSizeOrderCounter.textContent = `0`;
		pizzaAdd.textContent = `+`;
		pizzaSum.textContent = `${(data.price / 10000).toFixed(2)}`;

		order.append(pizzaItem);
		pizzaItem.append(pizzaDesc);
		pizzaDesc.append(pizzaTitle)
		pizzaDesc.append(pizzaSize);
		pizzaItem.append(pizzaSizeCount);
		pizzaSizeCount.append(pizzaRemove);
		pizzaSizeCount.append(pizzaSizeOrderCounter);
		pizzaSizeCount.append(pizzaAdd);
		pizzaItem.append(pizzaSum);
	}

	getCollectPizzas(data) {
		let collectPizzas = [];

		for (let item of data.items) {
			collectPizzas.push({
				type: item.type,
				title: item.title,
				id: item.id,
				size: item.size,
				price: item.price,
				count: 1,
			})
		}

		// for (let piz = 0; piz < collectPizzas.length; piz++) {
		// 	for (let piz1 = piz + 1; piz1 < collectPizzas.length; piz1++) {
		// 		if (collectPizzas[piz].id === collectPizzas[piz1].id &&
		// 			collectPizzas[piz].size === collectPizzas[piz1].size) {
		// 			collectPizzas[piz].count += 1;
		// 		}
		// 	}
		// }
		console.log(collectPizzas)
	}
}

const cart = new Cart();

pzzNetService.getCart()
	.then(cart.getCollectPizzas);

// pzzNetService.getCart()
// 	.then(cart.showBasket);

$(document).on('click', '.pizzaAdd', event => {
	pzzNetService.addProductToBasket(pzzNetService.makeProductFormData(event.target.dataset))
		.then(cart.showBasket);
})

$(document).on('click', '.pizzaRemove', event => {
	pzzNetService.removeProductToBasket(pzzNetService.makeProductFormData(event.target.dataset))
		.then(cart.showBasket);
})

// $(function (events, handler) {
// 		const totalCost = document.getElementById('totalCost');
// 		const total = document.getElementById('total');
//
// 		function showBasket(data) {
// 				for (let i = 0; i < data.items.length; i++) {
// 						totalCost.innerHTML = `${(data.total / 10000).toFixed(2)}`;
// 						total.innerHTML = `${(data.total / 10000).toFixed(2)}`;
// 				}
// 		}
//
// 		$(document).on('click', ".orderPlus", addToCart);
// 		$(document).on('click', '.orderMinus', removeToCart);
// 		$(document).on('click', '#saveOrder', saveOrder);
// 		$(document).on('click', '#sendOrder', sendOrder);
//
// 		async function addToCart(e) {
// 				const id = e.target.dataset.id;
// 				const size = e.target.dataset.size;
//
// 				await changeToCart(addToCartUrl, id, size);
// 		}
//
// 		async function removeToCart(e) {
// 				const removeToCartUrl = 'https://pzz.by/api/v1/basket/remove-item';
// 				const id = e.target.dataset.id;
// 				const size = e.target.dataset.size;
//
// 				await changeToCart(removeToCartUrl, id, size)
// 		}
//
// 		async function changeToCart(url, id, size) {
// 				const formData = new FormData();
//
// 				formData.append('type', 'pizza');
// 				formData.append('id', id);
// 				formData.append('size', size);
// 				formData.append('dough', 'thin');
//
// 				await fetch(url, {
// 						method: 'POST',
// 						body: formData,
// 				})
// 				.then(function (response) {
// 						response.json()
// 						.then(function (obj) {
// 								const data = obj.response.data;
//
// 								order.innerHTML = '';
// 								totalCost.innerHTML = '';
// 								total.innerHTML = '';
//
// 								showBasket(data)
// 						})
// 				})
// 		}
//
// 		async function saveOrder(e) {
// 				e.preventDefault();
//
// 				const updateAddressUrl = `https://pzz.by/api/v1/basket/update-address`;
// 				const formData = new FormData();
//
// 				formData.append('name', $('#name').val());
// 				formData.append('flat', $('#flat').val());
// 				formData.append('entrance', $('#entrance').val());
// 				formData.append('floor', $('#floor').val());
// 				formData.append('intercom', $('#intercom').val());
// 				formData.append('comment', $('#comment').val());
// 				formData.append('preorder_datetime', '');
// 				formData.append('no-contact-delivery', '1');
// 				formData.append('renting', '');
// 				formData.append('phone', $('#phone').val());
// 				formData.append('preorder_date', '');
// 				formData.append('preorder_time', '');
// 				formData.append('no_contact_delivery', '0');
// 				formData.append('street', $('#street').val());
// 				formData.append('house', $('#house').val());
// 				formData.append('payment', $('#charge').attr('id'));
//
// 				await fetch(updateAddressUrl, {
// 						method: 'POST',
// 						body: formData,
// 				});
// 		}
//
// 		async function sendOrder() {
// 				const sendOrderUrl = `https://pzz.by/api/v1/basket/save`;
//
// 				await fetch(sendOrderUrl, {
// 						method: 'POST',
// 				});
// 		}
// })