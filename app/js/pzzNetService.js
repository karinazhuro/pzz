'use strict';

class PzzNetService {
	prefix = 'https://cors-anywhere.herokuapp.com/';
	pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
	basketUrl = `https://pzz.by/api/v1/basket`;
	addToCartUrl = `https://pzz.by/api/v1/basket/add-item`;

	// Return Promise<List<Pizza>>
	async getListPizzas() {
		try {
			let response = await fetch(this.prefix + this.pizzasUrl);
			let json = await response.json();
			return json.response.data;
		} catch (e) {
			return 'Error'
		}
	}

	async getCart() {
		await fetch(this.prefix + this.basketUrl)
			.then(function (response) {
				response.json()
					.then(function (obj) {
						const data = obj.response.data
					})
			}).catch()
	}

	async addProductToBasket(formData) {
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