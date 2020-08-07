'use strict';

$(function () {
  async function getListPizzas() {
    const pizzas = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
    const response = await fetch(pizzas);
    const content = document.getElementById('content');
    let responseJson = await response.json();

    for (let i = 0; i < responseJson.response.data.length; i++) {
      content.innerHTML += `<div class="pizzas">
        <img class="imgPizza" src="${responseJson.response.data[i].photo_small}">
        <p id="title">${responseJson.response.data[i].title}</p>
        <div class="size">
        
        <p class="pizza">Большая</p>
        <p class="price">${(responseJson.response.data[i].big_price / 10000).toFixed(2)}
        <button class="basket" data-id="${responseJson.response.data[i].id}" data-sizebig="${responseJson.response.data[i].is_big}"">В корзину</button></p>
        <p class="weight">${responseJson.response.data[i].big_weight}</p></div>
        
        <div class="size">
        <p class="pizza">Стандартная</p>
        <p class="price">${(responseJson.response.data[i].medium_price / 10000).toFixed(2)}
        <button class="basket" data-id="${responseJson.response.data[i].id}" data-sizemedium="${responseJson.response.data[i].is_medium}"">В корзину</button></p>
        <p class="weight">${responseJson.response.data[i].medium_weight}</p></div>
        
        <p class="anonce">${responseJson.response.data[i].anonce}</p></div>`;
    }
  }

  getListPizzas();

  $(document).on('click', '.basket', function (e) {
    async function addPizzaToCart() {
      const addToCart = 'https://pzz.by/api/v1/basket/add-item';
      // const body = `type=pizza&id=id&size=size&dough=thin`;
      let formData = new FormData();
      const id = e.target.dataset.id;
      const sizeBig = e.target.dataset.sizebig;
      const sizeMedium = e.target.dataset.sizemedium;
      let size = '';

      if (sizeBig) {
        size = 'big';
      } else if (sizeMedium) {
        size = 'medium';
      }

      console.log(size);

      formData.append('type', 'pizza');
      formData.append('id', id);
      formData.append('size', size);
      formData.append('dough', 'thin');

      const response = await fetch(addToCart, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: formData,
      });
      const responseJson = await response.json();

      console.log(responseJson.response);
    }

    // let mes
    addPizzaToCart();
  });
});


// const xhr = new XMLHttpRequest();
// const xhrAddToCart = new XMLHttpRequest();
//
// // const proxyUrl = " https://cors-anywhere.herokuapp.com/";
// const pizzas = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
// const addItem = 'https://pzz.by/api/v1/basket/add-item';
//
// xhr.open('GET', pizzas, true);
// xhr.responseType = 'json';
// xhr.send();
//
// xhr.onload = function () {
//   let newContent = '';
//   const content = document.getElementById('content');
//   const responseObject = xhr.response.response;
//
//   if (xhr.status === 200) {
//     for (let i = 0; i < responseObject.data.length; i++) {
//       newContent += '<div class="pizzas">';
//       newContent += '<img src="' + responseObject.data[i].photo_small + '">';
//       newContent += '<p class="title"><a>' + responseObject.data[i].title + '</a></p>';
//       newContent += '<div class="size">' +
//         '<p class="pizza">' + 'Большая' + '</p>' +
//         '<p class="price">' + responseObject.data[i].big_price / 10000 + '0' +
//         '<button class="basket" id="b" data-id="' + responseObject.data[i].big_price + '">' + 'В корзину' +
//         '</button>' + '</p>' +
//         '<p class="weight">' + responseObject.data[i].big_weight + '</p>' +
//         '</div> '; // bigSize
//       newContent += '<div class="size">' +
//         '<p class="pizza">' + 'Стандартная' + '</p>' +
//         '<p class="price">' + responseObject.data[i].medium_price / 10000 + '0' +
//         '<button class="basket" data-id="' + responseObject.data[i].medium_price + '">' + 'В корзину' +
//         '</button>' + '</p>' +
//         '<p class="weight">' + responseObject.data[i].medium_weight + '</p>' +
//         '</div> ';// mediumSize
//       newContent += '<p class="anonce">' + responseObject.data[i].anonce + '</p>';
//       newContent += '</div> '; // pizzas
//     }
//   }
//   content.innerHTML = newContent;
// const cart = document.getElementById('cart');
// cart.addEventListener('click', openCart);
//
//
//   document.onclick = event => {
//     if (event.target.classList.contains('basket')) {
//
//       console.log(event.target.dataset.id);
//       // const body = 'type=pizza&id=67&size=big&dough=thin';
//       // const responseAddToCar = xhrAddToCart.response;
//       //
//       // xhrAddToCart.open('POST', addItem, true);
//       // xhrAddToCart.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//       // xhrAddToCart.send(body);
//
//     }
//   }
// };
//
// function openCart(str) {
//   alert(str);
// }