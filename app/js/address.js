'use strict';

// document.addEventListener('DOMContentLoaded', function () {
// 		const modalButtons = document.getElementById('openModalLink');
// 		const overlay = document.querySelector('.overlay-modal');
// 		const closeButtons = document.querySelectorAll('.modal-close');
//
// 		modalButtons.addEventListener('click', function (e) {
// 				e.preventDefault();
//
// 				const modalId = this.getAttribute('data-modal');
// 				const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
//
// 				modalElem.classList.add('active');
// 				overlay.classList.add('active');
// 		}); // end click
//
// 		closeButtons.forEach(function (item) {
// 				item.addEventListener('click', function (e) {
// 						const parentModal = this.closest('.modal');
//
// 						parentModal.classList.remove('active');
// 						overlay.classList.remove('active');
// 				});
// 		});
//
// 		document.body.addEventListener('keyup', function (e) {
// 				const key = e.keyCode;
//
// 				if (key === 27) {
// 						document.querySelector('.modal.active').classList.remove('active');
// 						document.querySelector('.overlay').classList.remove('active');
// 				}
// 		}, false);
//
// 		overlay.addEventListener('click', function () {
// 				document.querySelector('.modal.active').classList.remove('active');
// 				this.classList.remove('active');
// 		});
//
//
// });

import {pzzNetService} from "./pzzNetService.js";

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
	const getStreet = document.getElementById('street').value;
	const getStreetWrapper = document.getElementById('streetWrapper');
	const ul = document.createElement('ul');
	let id = '';

	if (getOption.length > 0) {
		getOption.forEach(elem.remove());
	}

	getStreetWrapper.append(ul);

	for (let i = 0; i < data.length; i++) {
		// const option = document.createElement('option');
		const li = document.createElement('li');

		li.classList.add('streetItem');
		li.textContent = data[i].title;
		ul.append(li);

		// option.textContent = data[i].title;
		// $('#datalistStreet').append(option);
	}

	// if (data[i].title === getStreet.value) {
	// 	id = data[i].id;
	// }

	console.log(getStreet)

	return id;
}

$(document).on('input', '#street', () => {
	pzzNetService.getStreets()
		.then(debounce(searchStreet, 500));
});

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