'use strict';

class Pizza {
	async getListPizzas() {
		const pizzasUrl = `${prefix}https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;

		await fetch(pizzasUrl)
			.then(function (response) {
				response.json()
					.then(function (obj) {
						const data = obj.response.data;
						pizza.showListPizzas(data)
					})
			});
	}

	showListPizzas(data) {
		const pizzasList = document.getElementById('pizzasList');

		for (let i = 0; i < data.length; i++) {
			const pizza = document.createElement("div");
			const pizzaImg = document.createElement("img");
			const pizzaTitle = document.createElement("p");
			const pizzaSize = document.createElement("div");
			const pizzaSizeTitle = document.createElement("p");
			const pizzaSizePrice = document.createElement("p");
			const pizzaSizeBasket = document.createElement("button");
			const changeCount = document.createElement("div");
			const orderMinus = document.createElement("button");
			const orderCounter = document.createElement("div");
			const orderPlus = document.createElement("button");
			const pizzaWeight = document.createElement("p");

			pizza.classList.add('pizza');
			pizzasList.append(pizza);

			pizzaImg.classList.add('pizzaImg');
			pizzaImg.src = `${data[i].photo_small}`;
			pizzaImg.alt = 'пицца';
			pizza.append(pizzaImg);

			pizzaTitle.id = 'pizzaTitle';
			pizzaTitle.textContent = `${data[i].title}`;
			pizza.append(pizzaTitle);

			if (data[i].is_big === 1 ) {
				pizzaSize.classList.add('pizzaSize');
				pizza.append(pizzaSize);

				pizzaSizeTitle.classList.add('pizzaSizeTitle');
				pizzaSizeTitle.textContent = 'Большая';
				pizzaSize.append(pizzaSizeTitle);

				pizzaSizePrice.classList.add('pizzaSizePrice');
				pizzaSizePrice.textContent = `${(data[i].big_price / 10000).toFixed(2)}`;
				pizzaSize.append(pizzaSizePrice);

				pizzaSizeBasket.classList.add('pizzaSizeBasket');
				pizzaSizeBasket.dataset.id = `${data[i].id}`;
				pizzaSizeBasket.dataset.sizebig = `${data[i].is_big}`;
				pizzaSizeBasket.textContent = 'В корзину';
				pizzaSizePrice.append(pizzaSizeBasket);

				changeCount.id = 'changeCount';
				pizzaSize.append(changeCount);

				orderMinus.id = 'orderMinus';
				orderMinus.classList.add('orderMinus');
				orderMinus.textContent = '-';
				changeCount.append(orderMinus);

				orderCounter.id = 'orderCounter';
				orderCounter.textContent = '1';
				changeCount.append(orderCounter);

				orderPlus.id = 'orderPlus';
				orderPlus.classList.add('orderPlus');
				orderPlus.textContent = '+';
				changeCount.append(orderPlus);

				pizzaWeight.classList.add('pizzaWeight');
				pizzaWeight.textContent = `${data[i].big_weight}`;
				pizzaSize.append(pizzaWeight);
			}

			// pizzasList.innerHTML += `<div class="pizzas">
			//   		<img class="pizzaImg" src="${data[i].photo_small}" alt="пицца">
			//         <p id="title">${data[i].title}</p>
			//
			//         <div class="pizzaSize">
			//         	<p class="pizza">Большая</p>
			//         	<p class="price">${(data[i].big_price / 10000).toFixed(2)}
			//             <button class="basket" data-id="${data[i].id}" data-sizebig="${data[i].is_big}">В корзину</button>
			//         	</p>
			//       		<div id="changeCount">
			//       			<button id="orderMinus" class="orderMinus" >-</button>
			// 						<div id="orderCounter">1</div>
			// 						<button id="orderPlus" class="orderPlus">+</button>
			//     			</div>
			//       		<p class="weight">${data[i].big_weight}</p>
			//     		</div>
			//
			//     			<div class="pizzaSize">
			//       			<p class="pizza">Стандартная</p>
			//       			<p class="price">${(data[i].medium_price / 10000).toFixed(2)}
			//        	 		<button class="basket" data-id="${data[i].id}" data-sizemedium="${data[i].is_medium}">В корзину</button>
			//       			</p>
			//       			<p class="weight">${data[i].medium_weight}</p>
			//     			</div>
			//     			<p class="anonce">${data[i].anonce}</p></div>`;
		}
	}

}

const pizza = new Pizza();
pizza.getListPizzas();

$(function () {
	// async function getListPizzas() {
	// 	const pizzasUrl = `${prefix}https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
	//
	// 	await fetch(pizzasUrl)
	// 		.then(function (response) {
	// 			response.json()
	// 				.then(function (obj) {
	// 					const data = obj.response.data;
	// 					showListPizzas(data)
	// 				})
	// 		});
	// }

	// getListPizzas();

	// function showListPizzas(data) {
	// 	const pizzasList = document.getElementById('pizzasList');
	//
	// 	for (let i = 0; i < data.length; i++) {
	// 		pizzasList.innerHTML += `<div class="pizza">
	//     		<img class="pizzaImg" src="${data[i].photo_small}">
	//           <p id="pizzaTitle">${data[i].title}</p>
	//           <div class="pizzaSize">
	//           <p class="pizzaSizeTitle">Большая</p>
	//           <p class="pizzaSizePrice">${(data[i].big_price / 10000).toFixed(2)}
	//               <button class="pizzaSizeBasket" data-id="${data[i].id}" data-sizebig="${data[i].is_big}">В корзину</button>
	//           </p>
	//         <div id="changeCount">
	//         		<button id="orderMinus" class="orderMinus" >-</button>
	// 											<div id="orderCounter">1</div>
	// 											<button id="orderPlus" class="orderPlus">+</button>
	//       		</div>
	//
	//
	//         <p class="weight">${data[i].big_weight}</p>
	//       </div>
	//
	//       <div class="size">
	//         <p class="pizza">Стандартная</p>
	//         <p class="price">${(data[i].medium_price / 10000).toFixed(2)}
	//           <button class="basket" data-id="${data[i].id}" data-sizemedium="${data[i].is_medium}">В корзину</button>
	//         </p>
	//         <p class="weight">${data[i].medium_weight}</p>
	//       </div>
	//
	//       <p class="anonce">${data[i].anonce}</p></div>`;
	// 	}
	// }

	$(document).on('click', '.basket', addToCart);

	async function addToCart(e) {
		const id = e.target.dataset.id;
		const sizeBig = e.target.dataset.sizebig;
		const sizeMedium = e.target.dataset.sizemedium;
		const formData = new FormData();
		let size = '';

		if (sizeBig) {
			size = 'big';
		} else if (sizeMedium) {
			size = 'medium';
		}

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
						const dataAddToCart = obj.response.data;
					})
			})
	}

	getBasket();

	async function getBasket() {
		await fetch(basketUrl)
			.then(function (response) {
				response.json()
					.then(function (obj) {
						const dataBasket = obj.response.data;
					})
			})
	}

	// async function checkBasket(dataAddToCart, dataBasket) {
	// 		// console.log(dataBasket.items)
	//
	// 		for (let i = 0; i < dataAddToCart.length; i++) {
	// 				for (let i = 0; i < dataBasket.length; i++) {
	// 						if (dataAddToCart.items[i].id === dataBasket.items[i].id) {
	// 								console.log(true);
	// 						}
	// 				}
	// 		}
	// }

})