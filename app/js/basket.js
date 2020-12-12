'use strict';

import {pzzNetService} from './pzzNetService.js';

class Cart {

  showBasket(data) {
    const notice = document.getElementById('notice');
    const orderRegistration = document.getElementById('orderRegistration');

    if (data.items.length === 0) {

      notice.style.display = 'flex';
    } else {
      notice.style.display = 'none';
      orderRegistration.style.display = 'grid';

      const order = document.getElementById('order');

      const pizza = document.createElement('div');
      const title = document.createElement('h3');
      const size = document.createElement('h6');
      const count = document.createElement('div');
      const minus = document.createElement('button');
      const countContent = document.createElement('p');
      const plus = document.createElement('button');
      let sizeCondition = '';

      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].size === 'big') {
          sizeCondition = 'Большая';
        } else if (data.items[i].size === 'medium') {
          sizeCondition = 'Стандартная';
        }

        pizza.classList.add('pizza');
        title.classList.add('title');
        size.classList.add('size');
        count.classList.add('count');
        minus.classList.add('minus');
        countContent.classList.add('countContent');

        title.textContent = `${data.items[i].title}`;
        size.textContent = `${sizeCondition}`;
        minus.textContent = `-`;
        countContent.textContent = `1`;

        order.append(pizza);
        pizza.append(title);
        pizza.append(size);
        pizza.append(count);
        count.append(minus);
        count.append(countContent);

        // order.innerHTML += `<div id="orderPizza">
        // 				<div id="title">
        //   <h3 id="orderTitle">${data.items[i].title}</h3>
        //   <p id="orderSize">${size}</p>
        // </div>
        // <div id="changeCount">
        //   <button id="orderMinus" class="orderMinus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">-</button>
        // 						<div id="orderCounter">1</div>
        // 						<button id="orderPlus" class="orderPlus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">+</button>
        // </div>
        // <p id="orderPrice">${(data.items[i].price / 10000).toFixed(2)}</p>
        // 		</div>`;

        // totalCost.innerHTML = `${(data.total / 10000).toFixed(2)}`;
        // total.innerHTML = `${(data.total / 10000).toFixed(2)}`;
      }
    }
  }
}

const cart = new Cart();

pzzNetService.getCart().then(cart.showBasket);

// $(function (events, handler) {
// 		const order = document.getElementById('order');
// 		const totalCost = document.getElementById('totalCost');
// 		const total = document.getElementById('total');
//
// 		async function getBasket() {
// 				await fetch(basketUrl)
// 				.then(function (response) {
// 						response.json()
// 						.then(function (obj) {
// 								const data = obj.response.data;
// 								showBasket(data)
// 						})
// 				})
// 		}
//
// 	getBasket(showBasket);
//
// 		function showBasket(data) {
// 				for (let i = 0; i < data.items.length; i++) {
// 						let size = '';
//
// 						if (data.items[i].size === 'big') {
// 								size = 'Большая';
// 						} else if (data.items[i].size === 'medium') {
// 								size = 'Стандартная';
// 						}
//
// 						order.innerHTML += `<div id="orderPizza">
// 								<div id="title">
//           <h3 id="orderTitle">${data.items[i].title}</h3>
//           <p id="orderSize">${size}</p>
//         </div>
//         <div id="changeCount">
//           <button id="orderMinus" class="orderMinus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">-</button>
// 										<div id="orderCounter">1</div>
// 										<button id="orderPlus" class="orderPlus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">+</button>
//         </div>
//         <p id="orderPrice">${(data.items[i].price / 10000).toFixed(2)}</p>
// 						</div>`;
//
// 						totalCost.innerHTML = `${(data.total / 10000).toFixed(2)}`;
// 						total.innerHTML = `${(data.total / 10000).toFixed(2)}`;
// 				}
// 		}
//
// 		$(document).on('click', ".orderPlus", addToCart);
// 		$(document).on('click', '.orderMinus', removeToCart);
// 		$(document).on('click', '#saveOrder', saveOrder);
// 		$(document).on('click', '#sendOrder', sendOrder);
//
// 		async function addToCart(e) {
// 				const id = e.target.dataset.id;
// 				const size = e.target.dataset.size;
//
// 				await changeToCart(addToCartUrl, id, size);
// 		}
//
// 		async function removeToCart(e) {
// 				const removeToCartUrl = 'https://pzz.by/api/v1/basket/remove-item';
// 				const id = e.target.dataset.id;
// 				const size = e.target.dataset.size;
//
// 				await changeToCart(removeToCartUrl, id, size)
// 		}
//
// 		async function changeToCart(url, id, size) {
// 				const formData = new FormData();
//
// 				formData.append('type', 'pizza');
// 				formData.append('id', id);
// 				formData.append('size', size);
// 				formData.append('dough', 'thin');
//
// 				await fetch(url, {
// 						method: 'POST',
// 						body: formData,
// 				})
// 				.then(function (response) {
// 						response.json()
// 						.then(function (obj) {
// 								const data = obj.response.data;
//
// 								order.innerHTML = '';
// 								totalCost.innerHTML = '';
// 								total.innerHTML = '';
//
// 								showBasket(data)
// 						})
// 				})
// 		}
//
// 		async function saveOrder(e) {
// 				e.preventDefault();
//
// 				const updateAddressUrl = `https://pzz.by/api/v1/basket/update-address`;
// 				const formData = new FormData();
//
// 				formData.append('name', $('#name').val());
// 				formData.append('flat', $('#flat').val());
// 				formData.append('entrance', $('#entrance').val());
// 				formData.append('floor', $('#floor').val());
// 				formData.append('intercom', $('#intercom').val());
// 				formData.append('comment', $('#comment').val());
// 				formData.append('preorder_datetime', '');
// 				formData.append('no-contact-delivery', '1');
// 				formData.append('renting', '');
// 				formData.append('phone', $('#phone').val());
// 				formData.append('preorder_date', '');
// 				formData.append('preorder_time', '');
// 				formData.append('no_contact_delivery', '0');
// 				formData.append('street', $('#street').val());
// 				formData.append('house', $('#house').val());
// 				formData.append('payment', $('#charge').attr('id'));
//
// 				await fetch(updateAddressUrl, {
// 						method: 'POST',
// 						body: formData,
// 				});
// 		}
//
// 		async function sendOrder() {
// 				const sendOrderUrl = `https://pzz.by/api/v1/basket/save`;
//
// 				await fetch(sendOrderUrl, {
// 						method: 'POST',
// 				});
// 		}
// })