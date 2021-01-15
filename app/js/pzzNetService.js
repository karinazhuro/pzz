'use strict';

export const getInputStreet = document.getElementById('inputStreet');
export const getStreetItem = document.getElementsByClassName('streetItem');
export const getInputHouse = document.getElementById('inputHouse');


class PzzNetService {
  prefix = 'https://cors-anywhere.herokuapp.com/';

  pizzasUrl = `https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
  basketUrl = `https://pzz.by/api/v1/basket`;
  addItemUrl = `https://pzz.by/api/v1/basket/add-item`;
  removeItemUrl = `https://pzz.by/api/v1/basket/remove-item`;
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
    const response = await fetch(this.addItemUrl, {
      // const response = await fetch(this.prefix + this.addToCartUrl, {
      method: 'POST',
      body: formData,
    });
    const json = await response.json();

    return json.response.data;
  }

  async removeProductToBasket(formData) {
    const response = await fetch(this.removeItemUrl, {
      // const response = await fetch(this.prefix + this.removeToCartUrl, {
      method: 'POST',
      body: formData,
    });
    const json = await response.json();

    return json.response.data;
  }

  async getStreets() {
    const getInputStreetValue = getInputStreet.value.toUpperCase();
    const streetsUrl = `https://pzz.by/api/v1/streets?order=title%3Aasc&search=title%3A${getInputStreetValue}%2Ctitle%3A${getInputStreetValue}`;

    if (getInputStreet.value.length >= 2) {
      const response = await fetch(streetsUrl);
      // const response = await fetch(this.prefix + this.streetsUrl);
      const json = await response.json();

      return json.response.data;
    } else {
      return '';
    }
  }

  async choiceStreet() {
    let id = '';

    for (let item of getStreetItem) {
      if (getInputStreet.value === item.textContent) {
        id = item.dataset.id;
      }
    }

    const streetOrderUrl = `https://pzz.by/api/v1/streets/${id}?order=title:asc&load=region.pizzeria`;
    const response = await fetch(streetOrderUrl);
    // const response = await fetch(this.prefix + this.streetOrderUrl);
    const json = await response.json();

    return json.response.data;
  }

  async choiceHouse(id) {
    const houseUrl = `https://pzz.by/api/v1/house/resolve-pizzeria/${houseTitleOrder}`;
    const response = await fetch(houseUrl);
    // const response = await fetch(this.prefix + this.streetOrderUrl);
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
}

export const pzzNetService = new PzzNetService();