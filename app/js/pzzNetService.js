'use strict';

class PzzNetService {
  prefix = 'https://cors-anywhere.herokuapp.com/';

  pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
  basketUrl = `https://pzz.by/api/v1/basket`;
  addToCartUrl = `https://pzz.by/api/v1/basket/add-item`;
  removeToCartUrl = `https://pzz.by/api/v1/basket/remove-item`;
  // streetOrderUrl = `https://pzz.by/api/v1/streets/${id}?order=title:asc&load=region.pizzeria`;
  updateAddressUrl = `https://pzz.by/api/v1/basket/update-address`;

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

  async getStreets() {
    const getStreetValue = document.getElementById('street').value.toUpperCase();
    const streetUrl = `https://pzz.by/api/v1/streets?order=title%3Aasc&search=title%3A${getStreetValue}%2Ctitle%3A${getStreetValue}`;

    if (getStreetValue.length >= 2) {
      const response = await fetch(streetUrl);
      // const response = await fetch(this.prefix + this.streetUrl);
      const json = await response.json();
      return json.response.data;
    } else {
      return '';
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

export const pzzNetService = new PzzNetService();