'use strict';

const xhr = new XMLHttpRequest();

// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const pizzas = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
const addItem = 'https://pzz.by/api/v1/basket/add-item';

xhr.open('GET', pizzas, true);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function () {
  let newContent = '';
  const content = document.getElementById('content');
  const responseObject = xhr.response.response;

  if (xhr.status === 200) {
    for (let i = 0; i < responseObject.data.length; i++) {
      newContent += '<div class="pizzas">';
      newContent += '<img src="' + responseObject.data[i].photo_small + '">';
      newContent += '<p class="title"><a>' + responseObject.data[i].title + '</a></p>';
      newContent += '<div class="size">' +
        '<p class="pizza">' + 'Большая' + '</p>' +
        '<p class="price">' + responseObject.data[i].big_price / 10000 + '0' +
        '<button class="basket" id="b" data-id="' + responseObject.data[i].title + '">' + 'В корзину' +
        '</button>' + '</p>' +
        '<p class="weight">' + responseObject.data[i].big_weight + '</p>' +
        '</div> '; // bigSize
      newContent += '<div class="size">' +
        '<p class="pizza">' + 'Стандартная' + '</p>' +
        '<p class="price">' + responseObject.data[i].medium_price / 10000 + '0' +
        '<button class="basket" data-id="' + responseObject.data[i].title + '">' + 'В корзину' +
        '</button>' + '</p>' +
        '<p class="weight">' + responseObject.data[i].medium_weight + '</p>' +
        '</div> ';// mediumSize
      newContent += '<p class="anonce">' + responseObject.data[i].anonce + '</p>';
      newContent += '</div> '; // pizzas
    }
  }
  content.innerHTML = newContent;

  document.onclick = event => {
    if (event.target.classList.contains('basket')) {
      const body = 'type=pizza&id=67&size=big&dough=thin';

      xhrAddToCart.open('POST', addItem, true);
      xhrAddToCart.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhrAddToCart.send(body);

      const responseAddToCar = xhrAddToCart.response;
    }
  }
};