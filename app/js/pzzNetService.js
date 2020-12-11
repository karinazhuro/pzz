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
}

export const pzzNetService = new PzzNetService();