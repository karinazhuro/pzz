'use strict';

import {pizza} from "./main.js";

class PzzNetService {
	prefix = 'https://cors-anywhere.herokuapp.com/';
	pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
	basketUrl = `https://pzz.by/api/v1/basket`;
	addToCartUrl = `https://pzz.by/api/v1/basket/add-item`;

// Return Promise<List<Pizza>>
	async getListPizzas() {
		let response = await fetch(this.pizzasUrl);
		let json = await response.json();
		return json.response.data;
	}

	async getCart() {
		let response = await fetch(this.basketUrl);
		let json = await response.json();
		return json.response.data;
	}

	async addProductToBasket(formData) {
		let response = await fetch(this.addToCartUrl, {
			method: 'POST',
			body: formData,
		});
		let json = await response.json();
		return json.response.data;
	}
}

export const pzzNetService = new PzzNetService();