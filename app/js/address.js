'use strict';

import {pzzNetService, getInputStreet, getInputHouse, getStreetItem} from "./pzzNetService.js";

function debounce(func, time) {
  let timer = '';

  return function (data) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(data)
    }, time);
  }
}

function searchStreet(data) {
  if (getStreetItem.length > 0) {
    getStreetItem.forEach(elem.remove());
  }

  for (let i = 0; i < data.length; i++) {
    const option = document.createElement('option');

    option.classList.add('streetItem');
    option.textContent = data[i].title;
    option.dataset.id = data[i].id;
    $('#datalistStreet').append(option);
  }
}

function searchHouse(data) {
  for (let i = 0; i < data.length; i++) {
    const option = document.createElement('option');

    option.classList.add('houseItem');
    option.textContent = data[i].title;
    option.dataset.id = data[i].id;
    $('#datalistHouse').append(option);
  }
}

getInputStreet.addEventListener('input', () => {
  pzzNetService.getStreets()
    .then(debounce(searchStreet, 500));
});

getInputStreet.addEventListener('change', () => {
  pzzNetService.choiceStreet()
    .then(searchHouse);
});

getInputHouse.addEventListener('change', () => {
  pzzNetService.choiceHouse()
})
// getInputStreet.addEventListener('change', () => {
//   pzzNetService.choiceStreet(getIdStreet())
//     .then(searchHouse);
// });

// async function sendAddress(e) {
// 		e.preventDefault();
//
// 		const houseUrl = `https://pzz.by/api/v1/house/resolve-pizzeria/${houseTitleOrder}`;
//
// 		await fetch(houseUrl)
// 		.then(function (response) {
// 				response.json();
// 		})
// }