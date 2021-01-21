'use strict';

import {pzzNetService} from './pzzNetService.js';

class Cart {
	getCollectPizzas(data) {
		let collectPizzas = [];
		let filtered;

		for (let i = 0; i < data.items.length; i++) {
			collectPizzas.push({
				type: data.items[i].type,
				title: data.items[i].title,
				id: data.items[i].id,
				size: data.items[i].size,
				price: data.items[i].price,
				totalPrice: data.price,
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

		return filtered;
	}

	updateUICart(filtered) {
		const getNotice = document.getElementById('notice');
		const getOrderRegistration = document.getElementById('orderRegistration');
		const getOrder = document.getElementById('order');

		if (filtered === undefined) {
			getNotice.style.display = 'flex';
			getOrderRegistration.style.display = 'none';
		} else {
			const getPizzaItem = document.getElementsByClassName('pizzaItem');

			getNotice.style.display = 'none';
			getOrderRegistration.style.display = 'flex';

			while (getPizzaItem.length !== 0) {
				Array.prototype.forEach.call(getPizzaItem, item => {
					item.remove();
				})
			}
		}

		for (let i = 0; i < filtered.length; i++) {
			const pizzaItem = document.createElement('div');
			const pizzaDesc = document.createElement('div');
			const pizzaTitle = document.createElement('h3');
			const pizzaSize = document.createElement('h6');
			const pizzaSizeCount = document.createElement('div');
			const pizzaRemove = document.createElement('button');
			const pizzaSizeOrderCounter = document.createElement('p');
			const pizzaAdd = document.createElement('button');
			const pizzaSum = document.createElement('p');

			const getTotalCost = document.getElementsByClassName('totalCost');
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

			getOrder.append(pizzaItem);
			pizzaItem.append(pizzaDesc);
			pizzaDesc.append(pizzaTitle);
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

			Array.prototype.forEach.call(getTotalCost, elem => {
				elem.textContent = `${(filtered[i].totalPrice / 10000).toFixed(2)}`;
			})
		}
	}
}

const cart = new Cart();

pzzNetService.getCart()
	.then(cart.getCollectPizzas)
	.then(cart.updateUICart);

$(document).on('click', '.pizzaAdd', event => {
	pzzNetService.addProductToBasket(pzzNetService.makeProductFormData(event.target.dataset))
		.then(cart.getCollectPizzas)
		.then(cart.updateUICart);
});

$(document).on('click', '.pizzaRemove', event => {
	pzzNetService.removeProductToBasket(pzzNetService.makeProductFormData(event.target.dataset))
		.then(cart.getCollectPizzas)
		.then(cart.updateUICart);
});

// 		async function sendOrder() {
// 				const sendOrderUrl = `https://pzz.by/api/v1/basket/save`;
//
// 				await fetch(sendOrderUrl, {
// 						method: 'POST',
// 				});
// 		}
// })