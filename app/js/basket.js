'use strict';

import {pzzNetService} from './pzzNetService.js';

class Cart {
	showBasket(data) {
		// const notice = document.getElementById('notice');
		// const orderRegistration = document.getElementById('orderRegistration');

		if (data.items.length === 0) {
			notice.style.display = 'flex';
		} else {
			notice.style.display = 'none';
			orderRegistration.style.display = 'flex';

			cart.getCollectPizzas(data);
		}
	}

	getCollectPizzas(data) {
		let collectPizzas = [];
		let filtered = '';

		for (let i = 0; i < data.items.length; i++) {
			collectPizzas.push({
				type: data.items[i].type,
				title: data.items[i].title,
				id: data.items[i].id,
				size: data.items[i].size,
				price: data.items[i].price,
				count: 1,
			})
		}


		for (let i = 0; i < collectPizzas.length; i++) {
			for (let j = i + 1; j < collectPizzas.length; j++) {
				if (collectPizzas[i] === undefined) continue;

				if (collectPizzas[i].id === collectPizzas[j].id &&
					collectPizzas[i].size === collectPizzas[j].size) {
					collectPizzas[i].count += 1;
					collectPizzas[i].price += data.items[i].price;
					delete collectPizzas[j];
				}
			}

			filtered = collectPizzas.filter(el => Object.keys(el).length);
		}

		for (let i = 0; i < filtered.length; i++) {
			cart.updateUICart(filtered[i]);
		}
	}

	updateUICart(filtered) {
		// for (let i = 0; i < filtered.length; i++) {
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

			pizzaItem.classList.add('pizzaItem');
			pizzaDesc.classList.add('pizzaDesc');
			pizzaTitle.classList.add('pizzaTitle');
			pizzaSize.classList.add('pizzaSize');
			pizzaSizeCount.classList.add('pizzaSizeCount');
			pizzaRemove.classList.add('pizzaRemove');
			pizzaSizeOrderCounter.classList.add('pizzaSizeOrderCounter');
			pizzaAdd.classList.add('pizzaAdd');
			pizzaSum.classList.add('pizzaSum');


			order.append(pizzaItem);
			pizzaItem.append(pizzaDesc);
			pizzaDesc.append(pizzaTitle)
			pizzaDesc.append(pizzaSize);
			pizzaItem.append(pizzaSizeCount);
			pizzaSizeCount.append(pizzaRemove);
			pizzaSizeCount.append(pizzaSizeOrderCounter);
			pizzaSizeCount.append(pizzaAdd);
			pizzaItem.append(pizzaSum);

			if (filtered[i].size === 'big') {
				sizeCondition = 'Большая';
			} else if (filtered[i].size === 'medium') {
				sizeCondition = 'Стандартная';
			}

			pizzaRemove.dataset.id = `${filtered[i].id}`;
			pizzaRemove.dataset.size = `${filtered[i].size}`;

			pizzaAdd.dataset.id = `${filtered[i].id}`;
			pizzaAdd.dataset.size = `${filtered[i].size}`;

			pizzaSizeOrderCounter.dataset.id = `${filtered[i].id}`;
			pizzaSizeOrderCounter.dataset.size = `${filtered[i].size}`;

			pizzaTitle.textContent = `${filtered[i].title}`;
			pizzaSize.textContent = `${sizeCondition}`;
			pizzaRemove.textContent = `-`;
			pizzaSizeOrderCounter.textContent = `${filtered[i].count}`;
			pizzaAdd.textContent = `+`;
			pizzaSum.textContent = `${(filtered[i].price / 10000).toFixed(2)}`;
		// }
	}
}

const cart = new Cart();

pzzNetService.getCart()
	.then(cart.showBasket);

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