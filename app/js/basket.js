'use strict';

$(function () {
  async function basket() {
    const urlBasket = 'https://pzz.by/api/v1/basket';
    const response = await fetch(urlBasket)
      .then(function (response) {
        response.json()
          .then(function (obj) {
            const data = obj.response.data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {

            }
          })
      })
  }

  basket();

});