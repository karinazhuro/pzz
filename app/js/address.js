'use strict';

import {pzzNetService} from "./pzzNetService.js";

const getStreetItem = document.getElementsByClassName('streetItem');
const getInputHouse = document.getElementById('inputHouse');
const getInputStreet = document.getElementById('inputStreet');
const getSendOrder = document.getElementById('sendOrder');

let func = debounce(handleOnStreetInput, 300);

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

function handleOnStreetInput() {
  if (getInputStreet.value.length >= 2) {
    pzzNetService.getStreets(getInputStreet.value.toUpperCase()).then(searchStreet)
  }
}

function findIdStreet() {
  let id = '';

  for (let item of getStreetItem) {
    if (getInputStreet.value === item.textContent) {
      id = item.dataset.id;
      pzzNetService.choiceStreet(id).then(searchHouse);
    }
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

function findIdHouse() {
  const getHouseItem = document.getElementsByClassName('houseItem');
  let id = '';

  for (let item of getHouseItem) {
    if (getInputHouse.value === item.textContent) {
      id = item.dataset.id;
      pzzNetService.choiceHouse(id).then()
    }
  }
}

function getDeliveryContactInput() {
  const getDeliveryContactInput = document.querySelector('input[name="no-contact-delivery"]:checked').value;
  const getPaymentCheck = document.querySelector('input[name="payment"]:checked').value;

  return {
    getDeliveryContactInput,
    getPaymentCheck,
  };
}
getInputStreet.addEventListener('input', func);

getInputStreet.addEventListener('change', findIdStreet);

getInputHouse.addEventListener('change', findIdHouse);

getSendOrder.addEventListener('click', () => {
  pzzNetService.updateInformation(pzzNetService.makeInformationFormData(getDeliveryContactInput()))
    .then();
});

// pzzNetService.makeInformationFormData(getDeliveryContactInput)
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