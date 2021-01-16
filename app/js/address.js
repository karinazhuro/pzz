'use strict';

import {pzzNetService, getInputStreet} from "./pzzNetService.js";

const getStreetItem = document.getElementsByClassName('streetItem');
const getInputHouse = document.getElementById('inputHouse');

function debounce(func, time) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(func, time);
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

function searchIDStreet() {
  let id = '';

  for (let item of getStreetItem) {
    if (getInputStreet.value === item.textContent) {
      id = item.dataset.id;
    }
  }

  return id;
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

function searchIDHouse() {
  const getHouseItem = document.getElementsByClassName('houseItem');
  let id = '';

  for (let item of getHouseItem) {
    if (getInputHouse.value === item.textContent) {
      id = item.dataset.id;
    }
  }

  return id;
}

let func =  debounce(() => pzzNetService.getStreets().then(searchStreet), 300);

getInputStreet.addEventListener('input', func);

getInputStreet.addEventListener('change', () => {
  pzzNetService.choiceStreet(searchIDStreet())
    .then(searchHouse);
});

getInputHouse.addEventListener('change', () => {
  pzzNetService.choiceHouse(searchIDHouse())
    .then()
});

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