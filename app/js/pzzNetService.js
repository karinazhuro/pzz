'use strict';

// import {getDeliveryContactInput} from "./makingAnOrder.js";

class PzzNetService {
	prefix = 'https://cors-anywhere.herokuapp.com/';

	pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
	basketUrl = `https://pzz.by/api/v1/basket`;
	addItemUrl = `https://pzz.by/api/v1/basket/add-item`;
	removeItemUrl = `https://pzz.by/api/v1/basket/remove-item`;
	updateAddressUrl = `https://pzz.by/api/v1/basket/update-address`;
	saveUrl = `https://pzz.by/api/v1/basket/save`;

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
		const response = await fetch(this.addItemUrl, {
		// 	const response = await fetch(this.prefix + this.addToCartUrl, {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();

		return json.response.data;
	}

	async removeProductToBasket(formData) {
		const response = await fetch(this.removeItemUrl, {
		// 	const response = await fetch(this.prefix + this.removeToCartUrl, {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();

		return json.response.data;
	}

	async getStreets(getInputStreetValue) {
		const streetsUrl = `https://pzz.by/api/v1/streets?order=title%3Aasc&search=title%3A${getInputStreetValue}
       %2Ctitle%3A${getInputStreetValue}`;
		const response = await fetch(streetsUrl);
		// const response = await fetch(this.prefix + this.streetsUrl);
		const json = await response.json();

		return json.response.data;
	}

	async choiceStreet(id) {
		const streetsIdUrl = `https://pzz.by/api/v1/streets/${id}?order=title:asc&load=region.pizzeria`;
		const response = await fetch(streetsIdUrl);
		// const response = await fetch(this.prefix + this.streetsUrl);
		const json = await response.json();

		return json.response.data;
	}

	async choiceHouse(id) {
		const houseUrl = `https://pzz.by/api/v1/house/resolve-pizzeria/${id}`;
		const response = await fetch(houseUrl);
		// const response = await fetch(this.prefix + this.houseUrl);
		const json = await response.json();

		return json.response.data;
	}

	async updateInformation(formData) {
		const response = await fetch(this.updateAddressUrl, {
		// 	const response = await fetch(this.prefix + this.updateAddressUrl, {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();

		return json.response.data;
	}

	async saveOrder() {
		const response = await fetch(this.saveUrl, {
		// const response = await fetch(this.prefix + this.saveUrl, {
			method: 'POST',
		});
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

	makeInformationFormData(inf) {
		const formData = new FormData();

		formData.append('name', $('#name').val());
		formData.append('flat', $('#flat').val());
		formData.append('entrance', $('#entrance').val());
		formData.append('floor', $('#floor').val());
		formData.append('intercom', $('#intercom').val());
		formData.append('comment', $('#comment').val());
		formData.append('preorder_datetime', '');
		formData.append('no-contact-delivery', '1');
		formData.append('renting', inf.getChangeInput);
		formData.append('phone', `+375${$('#phone').val()}`);
		formData.append('preorder_date', '');
		formData.append('preorder_time', '');
		formData.append('no_contact_delivery', '0');
		formData.append('street', $('#inputStreet').val());
		formData.append('house', $('#inputHouse').val());
		formData.append('payment', inf.getCheckedPayment);

		return formData;
	}
}

export const pzzNetService = new PzzNetService();