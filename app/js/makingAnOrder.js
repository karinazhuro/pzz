'use strict';

import {pzzNetService} from "./pzzNetService.js";

const getStreetItem = document.getElementsByClassName('streetItem');
const getInputHouse = document.getElementById('inputHouse');
const getInputStreet = document.getElementById('inputStreet');
const getSendOrder = document.getElementById('sendOrder');
const getPaymentBtn = document.getElementsByClassName('paymentBtn');

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

function getInformationForDeliveryContact() {
	const getCheckedPayment = document.querySelector('input[name="payment"]:checked').value;
	const getChangeInput = document.getElementById('changeInput').value;

	return {
		getCheckedPayment,
		getChangeInput,
	}
}

getInputStreet.addEventListener('input', func);

getInputStreet.addEventListener('change', findIdStreet);

getInputHouse.addEventListener('change', findIdHouse);

Array.prototype.forEach.call(getPaymentBtn, elem => {
	elem.addEventListener('click', () => {
		const getPaymentChecked = document.querySelector('input[name="payment"]:checked');
		const getChange = document.getElementById('change');

		if (getPaymentChecked) {
			getPaymentChecked.parentElement.classList.remove('checked');
			elem.classList.add('checked');

			if (elem.children[0].getAttribute('id') === 'cash') {
				getChange.style.display = 'block'
			} else {
				getChange.style.display = 'none';
			}
		}
	})
})

getSendOrder.addEventListener('click', () => {
	pzzNetService.updateInformation(pzzNetService.makeInformationFormData(getInformationForDeliveryContact()))
		// .then(pzzNetService.saveOrder);
});