'use strict';

$(function () {
  async function getListPizzas() {
    const content = document.getElementById('content');
    const pizzasUrl = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';

    await fetch(pizzasUrl)
      .then(function (response) {
        response.json()
          .then(function (obj) {
            const data = obj.response.data;
            for (let i = 0; i < data.length; i++) {
              content.innerHTML += `<div class="pizzas">
              <img class="imgPizza" src="${data[i].photo_small}">
              <p id="title">${data[i].title}</p>
              <div class="size">

              <p class="pizza">Большая</p>
              <p class="price">${(data[i].big_price / 10000).toFixed(2)}
              <button class="basket" data-id="${data[i].id}" data-sizebig="${data[i].is_big}">В корзину</button></p>
              <p class="weight">${data[i].big_weight}</p></div>

              <div class="size">
              <p class="pizza">Стандартная</p>
              <p class="price">${(data[i].medium_price / 10000).toFixed(2)}
              <button class="basket" data-id="${data[i].id}" data-sizemedium="${data[i].is_medium}">В корзину</button></p>
              <p class="weight">${data[i].medium_weight}</p></div>

              <p class="anonce">${data[i].anonce}</p></div>`;
            }
          })
      });
  }

  getListPizzas();

  $(document).on('click', '.basket', addToCart);
  async function addToCart(e) {
    const addToCart = 'https://pzz.by/api/v1/basket/add-item';
    const id = e.target.dataset.id;
    const sizeBig = e.target.dataset.sizebig;
    const sizeMedium = e.target.dataset.sizemedium;
    const formData = new FormData();
    let size = '';

    if (sizeBig) {
      size = 'big';
    } else if (sizeMedium) {
      size = 'medium';
    }

    formData.append('type', 'pizza');
    formData.append('id', id);
    formData.append('size', size);
    formData.append('dough', 'thin');

    await fetch(addToCart, {
      method: 'POST',
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
  }

});