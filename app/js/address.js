'use strict';

import {pzzNetService, getInputStreet} from "./pzzNetService.js";

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
	const getOption = document.querySelectorAll('option');

	if (getOption.length > 0) {
		getOption.forEach(elem.remove());
	}

	for (let i = 0; i < data.length; i++) {
		const option = document.createElement('option');

		option.classList.add('streetItem');
		option.textContent = data[i].title;
		option.dataset.id = data[i].id;
		$('#datalistStreet').append(option);
	}
}

function getIdStreet() {
	const getOption = document.getElementsByClassName('streetItem');
const id = getInputStreet.getAttribute('data-id');
	// for (let i = 0; i < )
	console.log(id)
}

getInputStreet.addEventListener('input', () => {
	pzzNetService.getStreets()
		.then(debounce(searchStreet, 500))
	// .then(getIdStreet);
});

getInputStreet.addEventListener('change', getIdStreet);

// $(document).on('input', '#street', searchStreet);
// $(document).on('focus', '#house', optionStreet);
// $(document).on('click', '#sendAddress', sendAddress);
//
// let id = '';
// let houseTitleOrder = '';

// async function searchStreet(e) {
// 		e.preventDefault();
//
// 		const streetTitle = $('#street').val();
// 		const streetUrl = `https://pzz.by/api/v1/streets?order=title%3Aasc&search=title%3A${streetTitle.toUpperCase()}%2Ctitle%3A${streetTitle.toUpperCase()}`;
//
// 		if (streetTitle.length >= 2) {
// 				await fetch(streetUrl)
// 				.then(function (response) {
// 						response.json()
// 						.then(function (obj) {
// 								const data = obj.response.data;
// 								for (let i = 0; i < data.length; i++) {
// 										const option = document.createElement('option');
// 										option.value = data[i].title;
// 										$('#datalistStreet').append(option);
// 										if (data[i].title === streetTitle) {
// 												id = data[i].id;
// 										}
// 								}
// 						})
// 				})
// 		}
// }

// async function optionStreet(e) {
// 		e.preventDefault();
//
// 		const streetOrderUrl = `https://pzz.by/api/v1/streets/${id}?order=title:asc&load=region.pizzeria`;
//
// 		await fetch(streetOrderUrl)
// 		.then(function (response) {
// 				response.json()
// 				.then(function (obj) {
// 						const data = obj.response.data;
// 						for (let i = 0; i < data.length; i++) {
// 							const option = document.createElement('option');
// 							option.value = data[i].title;
// 							$('#datalistHouse').append(option);
// 							houseTitleOrder = data[i].title;
// 						}
// 				})
// 		})
// }
//
// // переписать функцию optionStreet на выбор улицы
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