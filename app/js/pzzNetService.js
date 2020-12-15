'use strict';

class PzzNetService {
	prefix = 'https://cors-anywhere.herokuapp.com/';
	pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
	basketUrl = `https://pzz.by/api/v1/basket`;
	addToCartUrl = `https://pzz.by/api/v1/basket/add-item`;
	removeToCartUrl = `https://pzz.by/api/v1/basket/remove-item`;

	async getListPizzas() {
		const response = await fetch(this.pizzasUrl);
		// const response = await fetch(this.prefix + this.pizzasUrl);
		const json = await response.json();
		return json.response.data;
	}

	async getCart() {
		const response = await fetch(this.basketUrl);
		// const response = await fetch(this.prefix + this.basketUrl);
		const json = await response.json();
		return json.response.data;
	}

	async addProductToBasket(formData) {
		const response = await fetch(this.addToCartUrl, {
		// const response = await fetch(this.prefix + this.addToCartUrl, {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();
		return json.response.data;
	}

	async removeProductToBasket(formData) {
		const response = await fetch(this.removeToCartUrl, {
		// const response = await fetch(this.prefix + this.removeToCartUrl, {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();
		return json.response.data;
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

	updateUI(data) {
		const btnAddToCart = document.getElementsByClassName('pizzaSizeAddToCart');
		const btnCount = document.getElementsByClassName('pizzaSizeCount');
		const pizzaSizeOrderCounter = document.getElementsByClassName('pizzaSizeOrderCounter');

		for (let j = 0; j < pizzaSizeOrderCounter.length; j++) {
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
}

export const pzzNetService = new PzzNetService();