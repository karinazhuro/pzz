'use strict';

$(function (events, handler) {
  async function basket() {
    const basketUrl = 'https://pzz.by/api/v1/basket';
    await fetch(basketUrl)
      .then(function (response) {
        response.json()
          .then(function (obj) {
            const data = obj.response.data;
            for (let i = 0; i < data.items.length; i++) {
              const order = document.getElementById('order');
              const total = document.getElementById('total');
              let size = '';

              if (data.items[i].size === 'big') {
                size = 'Большая';
              } else if (data.items[i].size === 'medium') {
                size = 'Стандартная';
              }

              order.innerHTML += `<div id="orderPizza">
                 <h3 id="orderTitle">${data.items[i].title}</h3>
                <p id="orderSize">${size}</p>
                <button class="orderPlus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">+</button>
                <div id="orderCounter">1</div>
                <button class="orderMinus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">-</button>
                <p id="orderCost">${(data.items[i].price / 1000).toFixed(2)}</p></div>`;
              total.innerHTML = `Итого: ${data.total}`;
            }
          })
      })
  }

  basket();

  $(document).on('click', ".orderPlus", addToCart);
  $(document).on('click', '.orderMinus', removeToCart);

  async function addToCart(e) {
    const addToCartUrl = 'https://pzz.by/api/v1/basket/add-item';
    const id = e.target.dataset.id;
    const size = e.target.dataset.size;
    const formData = new FormData();

    formData.append('type', 'pizza');
    formData.append('id', id);
    formData.append('size', size);
    formData.append('dough', 'thin');

    await fetch(addToCartUrl, {
      method: 'POST',
      body: formData,
    })
      .then(function (response) {
        response.json()
          .then(function (obj) {
            const order = document.getElementById('order');
            const data = obj.response.data;
            order.innerHTML = '';

            for (let i = 0; i < data.items.length; i++) {
              const total = document.getElementById('total');
              let size = '';

              if (data.items[i].size === 'big') {
                size = 'Большая';
              } else if (data.items[i].size === 'medium') {
                size = 'Стандартная';
              }


              order.innerHTML += `<div id="orderPizza">
				           <h3 id="orderTitle">${data.items[i].title}</h3>
				          <p id="orderSize">${size}</p>
				          <button class="orderPlus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">+</button>
				          <div id="orderCounter">1</div>
				          <button class="orderMinus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">-</button>
				          <p id="orderCost">${(data.items[i].price / 1000).toFixed(2)}</p></div>`;
              total.innerHTML = `Итого: ${data.total}`;
            }
          })
      })
  }

  async function removeToCart(e) {
    const removeToCartUrl = 'https://pzz.by/api/v1/basket/remove-item';
    const id = e.target.dataset.id;
    const size = e.target.dataset.size;
    const formData = new FormData();

    formData.append('type', 'pizza');
    formData.append('id', id);
    formData.append('size', size);
    formData.append('dough', 'thin');

    await fetch(removeToCartUrl, {
      method: 'POST',
      body: formData,
    })
      .then(function (response) {
        response.json()
          .then(function (obj) {
            const order = document.getElementById('order');
            const data = obj.response.data;
            order.innerHTML = '';

            for (let i = 0; i < data.items.length; i++) {
              const total = document.getElementById('total');
              let size = '';

              if (data.items[i].size === 'big') {
                size = 'Большая';
              } else if (data.items[i].size === 'medium') {
                size = 'Стандартная';
              }

              order.innerHTML += `<div id="orderPizza">
				         <h3 id="orderTitle">${data.items[i].title}</h3>
				        <p id="orderSize">${size}</p>
				        <button class="orderPlus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">+</button>
				        <div id="orderCounter">1</div>
				        <button class="orderMinus" data-id="${data.items[i].id}" data-size="${data.items[i].size}">-</button>
				        <p id="orderCost">${(data.items[i].price / 1000).toFixed(2)}</p></div>`;
              total.innerHTML = `Итого: ${data.total}`;
            }
          })
      })
  }

  $(document).on('click', '#saveOrder', saveOrder);

  async function saveOrder(e) {
    e.preventDefault();

    const updateAddressUrl = `https://pzz.by/api/v1/basket/update-address`;
    const formData = new FormData();
    formData.append('name', $('#name').val());
    formData.append('flat', $('#flat').val());
    formData.append('entrance', $('#entrance').val());
    formData.append('floor', $('#floor').val());
    formData.append('intercom', $('#intercom').val());
    formData.append('comment', $('#comment').val());
    formData.append('preorder_datetime', '');
    formData.append('no-contact-delivery', '1');
    formData.append('renting', '');
    formData.append('phone', $('#phone').val());
    formData.append('preorder_date', '');
    formData.append('preorder_time', '');
    formData.append('no_contact_delivery', '0');
    formData.append('street', $('#street').val());
    formData.append('house', $('#house').val());
    formData.append('payment', $('#charge').attr('id'));

    await fetch(updateAddressUrl, {
      method: 'POST',
      body: formData,
    });
  }

  $(document).on('click', '#sendOrder', sendOrder);

  async function sendOrder() {
    const sendOrderUrl = `https://pzz.by/api/v1/basket/save`;

    await fetch(sendOrderUrl, {
      method: 'POST',
    });
  }
});