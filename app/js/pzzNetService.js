'use strict';

import {pizza} from "./main";

class PzzNetService {
	prefix = 'https://cors-anywhere.herokuapp.com/';
	pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
	addToCartUrl = `https://pzz.by/api/v1/basket/add-item`;

	async getListPizzas(callback) {
		await fetch(this.prefix + this.pizzasUrl)
			.then(function (response) {
				response.json()
					.then(function (obj) {
						const data = obj.response.data;
						callback(data);
					})
			});
	}

	async addProductToBasket() {
		const formData = pizza.makeProductFormData();
		await fetch(this.prefix + this.addToCartUrl, {
			method: 'POST',
			body: formData,
		})
			.then(function (response) {
				response.json()
					.then(function (obj) {
						const dataAddToCart = obj.response.data;
					})
			})
	}
}

export const pzzNetService = new PzzNetService();