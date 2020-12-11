'use strict';

import {pzzNetService} from './pzzNetService.js';

class Pizza {
	showListPizzas(data) {
		const pizzasList = document.getElementById('pizzasList');

		for (let i = 0; i < data.length; i++) {
			const pizzaItem = document.createElement("div");
			const pizzaImg = document.createElement("img");
			const pizzaDesc = document.createElement("div");
			const pizzaTitle = document.createElement("p");
			const pizzaSizes = document.createElement("div");
			const anonce = document.createElement("p");

			const pizzaSizeBig = document.createElement("div");
			const pizzaSizeMedium = document.createElement("div");
			const pizzaSizeThin = document.createElement("div");

			const pizzaSizesBigContent = document.createElement("div");
			const pizzaSizesMediumContent = document.createElement("div");
			const pizzaSizesThinContent = document.createElement("div");

			const pizzaSizeBigTitle = document.createElement("p");
			const pizzaSizeMediumTitle = document.createElement("p");
			const pizzaSizeThinTitle = document.createElement("p");

			const pizzaSizeBigPrice = document.createElement("p");
			const pizzaSizeMediumPrice = document.createElement("p");
			const pizzaSizeThinPrice = document.createElement("p");

			const pizzaSizeBigWeight = document.createElement("p");
			const pizzaSizeMediumWeight = document.createElement("p");
			const pizzaSizeThinWeight = document.createElement("p");

			const pizzaSizeBigAddToCart = document.createElement("button");
			const pizzaSizeMediumAddToCart = document.createElement("button");
			const pizzaSizeThinAddToCart = document.createElement("button");

			const pizzaSizeBigCount = document.createElement("div");
			const pizzaSizeMediumCount = document.createElement("div");
			const pizzaSizeThinCount = document.createElement("div");

			const pizzaSizeBigOrderMinus = document.createElement("button");
			const pizzaSizeMediumOrderMinus = document.createElement("button");
			const pizzaSizeThinOrderMinus = document.createElement("button");

			const pizzaSizeBigOrderCounter = document.createElement("p");
			const pizzaSizeMediumOrderCounter = document.createElement("p");
			const pizzaSizeThinOrderCounter = document.createElement("p");

			const pizzaSizeBigOrderPlus = document.createElement("button");
			const pizzaSizeMediumOrderPlus = document.createElement("button");
			const pizzaSizeThinOrderPlus = document.createElement("button");

			function addListSize() {
				const pizzaSizeTitle = 'pizzaSizeTitle';
				const pizzaSizePrice = 'pizzaSizePrice';
				const pizzaSizeWeight = 'pizzaSizeWeight';
				const pizzaSizeAddToCart = 'pizzaSizeAddToCart';
				const pizzaSizeCount = 'pizzaSizeCount';
				const pizzaSizeOrderMinus = 'pizzaSizeOrderMinus';
				const pizzaSizeOrderCounter = 'pizzaSizeOrderCounter';
				const pizzaSizeOrderPlus = 'pizzaSizeOrderPlus';
				const pizzaSizesContent = 'pizzaSizesContent';

				const btnPizzaSizeOrderMinus = document.getElementsByClassName('pizzaSizeOrderMinus');
				const btnPizzaSizeOrderPlus = document.getElementsByClassName('pizzaSizeOrderPlus');
				const btnPizzaSizeOrderCounter = document.getElementsByClassName('pizzaSizeOrderCounter');

				const addToCartBig = [pizzaSizeBigAddToCart, pizzaSizeBigOrderPlus];
				const addToCartMedium = [pizzaSizeMediumAddToCart, pizzaSizeMediumOrderPlus];
				const addToCartThin = [pizzaSizeThinAddToCart, pizzaSizeThinOrderPlus];

				pizzaSizeBigTitle.classList.add(`${pizzaSizeTitle}`);
				pizzaSizeMediumTitle.classList.add(`${pizzaSizeTitle}`);
				pizzaSizeThinTitle.classList.add(`${pizzaSizeTitle}`);

				pizzaSizeBigPrice.classList.add(`${pizzaSizePrice}`);
				pizzaSizeMediumPrice.classList.add(`${pizzaSizePrice}`);
				pizzaSizeThinPrice.classList.add(`${pizzaSizePrice}`);

				pizzaSizeBigWeight.classList.add(`${pizzaSizeWeight}`);
				pizzaSizeMediumWeight.classList.add(`${pizzaSizeWeight}`);
				pizzaSizeThinWeight.classList.add(`${pizzaSizeWeight}`);

				pizzaSizeBigAddToCart.classList.add(`${pizzaSizeAddToCart}`);
				pizzaSizeMediumAddToCart.classList.add(`${pizzaSizeAddToCart}`);
				pizzaSizeThinAddToCart.classList.add(`${pizzaSizeAddToCart}`);

				pizzaSizeBigCount.classList.add(`${pizzaSizeCount}`);
				pizzaSizeMediumCount.classList.add(`${pizzaSizeCount}`);
				pizzaSizeThinCount.classList.add(`${pizzaSizeCount}`);

				pizzaSizeBigOrderMinus.classList.add(`${pizzaSizeOrderMinus}`);
				pizzaSizeMediumOrderMinus.classList.add(`${pizzaSizeOrderMinus}`);
				pizzaSizeThinOrderMinus.classList.add(`${pizzaSizeOrderMinus}`);

				Array.prototype.forEach.call(btnPizzaSizeOrderMinus, element => {
					element.textContent = '-';
				});

				pizzaSizeBigOrderCounter.classList.add(`${pizzaSizeOrderCounter}`);
				pizzaSizeMediumOrderCounter.classList.add(`${pizzaSizeOrderCounter}`);
				pizzaSizeThinOrderCounter.classList.add(`${pizzaSizeOrderCounter}`);

				Array.prototype.forEach.call(btnPizzaSizeOrderCounter, element => {
					element.textContent = '0';
				});

				pizzaSizeBigOrderPlus.classList.add(`${pizzaSizeOrderPlus}`);
				pizzaSizeMediumOrderPlus.classList.add(`${pizzaSizeOrderPlus}`);
				pizzaSizeThinOrderPlus.classList.add(`${pizzaSizeOrderPlus}`);

				Array.prototype.forEach.call(btnPizzaSizeOrderPlus, element => {
					element.textContent = '+';
				});

				addToCartBig.forEach((item) => {
					item.dataset.id = `${data[i].id}`;
					item.dataset.size = 'big';
					pizzaSizeBigOrderCounter.dataset.id = `${data[i].id}`;
					pizzaSizeBigOrderCounter.dataset.size = 'big';
					pizzaSizeBigOrderMinus.dataset.id = `${data[i].id}`;
					pizzaSizeBigOrderMinus.dataset.size = 'big';

				})

				addToCartMedium.forEach((item) => {
					item.dataset.id = `${data[i].id}`;
					item.dataset.size = 'medium';
					pizzaSizeMediumOrderCounter.dataset.id = `${data[i].id}`;
					pizzaSizeMediumOrderCounter.dataset.size = 'medium';
					pizzaSizeMediumOrderMinus.dataset.id = `${data[i].id}`;
					pizzaSizeMediumOrderMinus.dataset.size = 'medium';
				})

				addToCartThin.forEach((item) => {
					item.dataset.id = `${data[i].id}`;
					item.dataset.size = 'thin';
					pizzaSizeThinOrderCounter.dataset.id = `${data[i].id}`;
					pizzaSizeThinOrderCounter.dataset.size = 'thin';
					pizzaSizeThinOrderMinus.dataset.id = `${data[i].id}`;
					pizzaSizeThinOrderMinus.dataset.size = 'thin';
				})

				pizzaSizesBigContent.classList.add(`${pizzaSizesContent}`);
				pizzaSizesMediumContent.classList.add(`${pizzaSizesContent}`);
				pizzaSizesThinContent.classList.add(`${pizzaSizesContent}`);
			}

			pizzaItem.classList.add('pizzaItem');
			pizzasList.append(pizzaItem);

			pizzaImg.classList.add('pizzaImg');
			pizzaImg.src = `${data[i]["photo_small"]}`;
			pizzaImg.alt = 'пицца';
			pizzaItem.append(pizzaImg);

			pizzaDesc.classList.add('pizzaDesc');
			pizzaItem.append(pizzaDesc);

			pizzaTitle.id = 'pizzaTitle';
			pizzaTitle.textContent = `${data[i].title}`;
			pizzaDesc.append(pizzaTitle);

			pizzaSizes.classList.add('pizzaSizes');
			pizzaDesc.append(pizzaSizes);

			anonce.classList.add('anonce');
			anonce.textContent = `${data[i]["anonce"]}`;
			pizzaDesc.append(anonce);

			if (data[i]["is_big"] === 1) {
				addListSize();
				pizzaSizeBig.classList.add('pizzaSizeBig');
				pizzaSizes.append(pizzaSizeBig);
				pizzaSizeBig.append(pizzaSizesBigContent);

				pizzaSizeBigTitle.textContent = 'Большая';
				pizzaSizesBigContent.append(pizzaSizeBigTitle);

				pizzaSizeBigPrice.textContent = `${(data[i]["big_price"] / 10000).toFixed(2)}`;
				pizzaSizesBigContent.append(pizzaSizeBigPrice);

				pizzaSizeBigWeight.textContent = `${data[i]["big_weight"]}`;
				pizzaSizesBigContent.append(pizzaSizeBigWeight);

				pizzaSizeBigAddToCart.textContent = 'В корзину';
				pizzaSizeBig.append(pizzaSizeBigAddToCart);

				pizzaSizeBig.append(pizzaSizeBigCount);

				pizzaSizeBigCount.append(pizzaSizeBigOrderMinus);
				pizzaSizeBigCount.append(pizzaSizeBigOrderCounter);
				pizzaSizeBigCount.append(pizzaSizeBigOrderPlus);
			}

			if (data[i]["is_medium"] === 1) {
				addListSize();
				pizzaSizeMedium.classList.add('pizzaSizeMedium');
				pizzaSizes.append(pizzaSizeMedium);
				pizzaSizeMedium.append(pizzaSizesMediumContent);

				pizzaSizeMediumTitle.textContent = 'Стандартная';
				pizzaSizesMediumContent.append(pizzaSizeMediumTitle);

				pizzaSizeMediumPrice.textContent = `${(data[i]["medium_price"] / 10000).toFixed(2)}`;
				pizzaSizesMediumContent.append(pizzaSizeMediumPrice);

				pizzaSizeMediumWeight.textContent = `${data[i]["medium_weight"]}`;
				pizzaSizesMediumContent.append(pizzaSizeMediumWeight);

				pizzaSizeMediumAddToCart.textContent = 'В корзину';
				pizzaSizeMedium.append(pizzaSizeMediumAddToCart);

				pizzaSizeMedium.append(pizzaSizeMediumCount);

				pizzaSizeMediumCount.append(pizzaSizeMediumOrderMinus);
				pizzaSizeMediumCount.append(pizzaSizeMediumOrderCounter);

				pizzaSizeMediumCount.append(pizzaSizeMediumOrderMinus);
				pizzaSizeMediumCount.append(pizzaSizeMediumOrderCounter);
				pizzaSizeMediumCount.append(pizzaSizeMediumOrderPlus);
			}

			if (data[i]["is_thin"] === 1) {
				addListSize();

				pizzaSizeThin.classList.add('pizzaSizeThin');
				pizzaSizes.append(pizzaSizeThin);
				pizzaSizeThin.append(pizzaSizesThinContent);

				pizzaSizeThinTitle.textContent = 'Тонкое тесто 36 см';
				pizzaSizesThinContent.append(pizzaSizeThinTitle);

				pizzaSizeThinPrice.textContent = `${(data[i]["thin_price"] / 10000).toFixed(2)}`;
				pizzaSizesThinContent.append(pizzaSizeThinPrice);

				pizzaSizeThinWeight.textContent = `${data[i]["thin_weight"]}`;
				pizzaSizesThinContent.append(pizzaSizeThinWeight);

				pizzaSizeThinAddToCart.textContent = 'В корзину';
				pizzaSizeThin.append(pizzaSizeThinAddToCart);

				pizzaSizeThin.append(pizzaSizeThinCount);

				pizzaSizeThinCount.append(pizzaSizeThinOrderMinus);
				pizzaSizeThinCount.append(pizzaSizeThinOrderCounter);

				pizzaSizeThinCount.append(pizzaSizeThinOrderMinus);
				pizzaSizeThinCount.append(pizzaSizeThinOrderCounter);
				pizzaSizeThinCount.append(pizzaSizeThinOrderPlus);
			}
		}
	}

	updateUI(data) {
		const btnAddToCart = document.getElementsByClassName('pizzaSizeAddToCart');
		const btnCount = document.getElementsByClassName('pizzaSizeCount');
		const pizzaSizeOrderCounter = document.getElementsByClassName('pizzaSizeOrderCounter');

		for (let j = 0; j < btnAddToCart.length; j++) {
			pizzaSizeOrderCounter[j].textContent = '0';

			for (let i = 0; i < data.items.length; i++) {
				if (data.items[i].id === btnAddToCart[j].getAttribute('data-id') &&
					data.items[i].size === btnAddToCart[j].getAttribute('data-size')) {
					btnAddToCart[j].style.display = 'none';
					btnCount[j].style.display = 'flex';
					pizzaSizeOrderCounter[j].textContent = String(Number(pizzaSizeOrderCounter[j].textContent) + 1);
				}
			}

			if (pizzaSizeOrderCounter[j].textContent === '0') {
				btnAddToCart[j].style.display = 'flex';
				btnCount[j].style.display = 'none';
			}
		}
	}

	makeProductFormData(date) {
		const formData = new FormData();
		const id = date.id;
		const size = date.size;

		formData.append('type', 'pizza');
		formData.append('id', id);
		formData.append('size', size);
		formData.append('dough', 'thin');

		return formData;
	}
}

export const pizza = new Pizza();

pzzNetService.getListPizzas().then(pizza.showListPizzas);
pzzNetService.getCart().then(pizza.updateUI);

$(document).on('click', '.pizzaSizeAddToCart', (event) => {
	pzzNetService.addProductToBasket(pizza.makeProductFormData(event.target.dataset))
		.then(pizza.updateUI);
});

$(document).on('click', '.pizzaSizeOrderPlus', (event) => {
	pzzNetService.addProductToBasket(pizza.makeProductFormData(event.target.dataset))
		.then(pizza.updateUI);
});

$(document).on('click', '.pizzaSizeOrderMinus', (event) => {
	pzzNetService.removeProductToBasket(pizza.makeProductFormData(event.target.dataset))
		.then(pizza.updateUI);
});