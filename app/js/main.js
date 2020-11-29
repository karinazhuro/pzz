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
      const pizzaItem = document.createElement("div");
      const pizzaImg = document.createElement("img");
      const pizzaDesc = document.createElement("div");
      const pizzaTitle = document.createElement("p");
      const pizzaSizes = document.createElement("div");
      const anonce = document.createElement("p");

      const pizzaSizeBig = document.createElement("div");
      const pizzaSizeMedium = document.createElement("div");
      const pizzaSizeThin = document.createElement("div");

      const pizzaSizesBigContent = document.createElement("div");
      const pizzaSizesMediumContent = document.createElement("div");
      const pizzaSizesThinContent = document.createElement("div");

      const pizzaSizeBigTitle = document.createElement("p");
      const pizzaSizeMediumTitle = document.createElement("p");
      const pizzaSizeThinTitle = document.createElement("p");

      const pizzaSizeBigPrice = document.createElement("p");
      const pizzaSizeMediumPrice = document.createElement("p");
      const pizzaSizeThinPrice = document.createElement("p");

      const pizzaSizeBigWeight = document.createElement("p");
      const pizzaSizeMediumWeight = document.createElement("p");
      const pizzaSizeThinWeight = document.createElement("p");

      const pizzaSizeBigAddToCart = document.createElement("button");
      const pizzaSizeMediumAddToCart = document.createElement("button");
      const pizzaSizeThinAddToCart = document.createElement("button");

      const pizzaSizeBigCount = document.createElement("div");
      const pizzaSizeMediumCount = document.createElement("div");
      const pizzaSizeThinCount = document.createElement("div");

      const pizzaSizeBigOrderMinus = document.createElement("button");
      const pizzaSizeMediumOrderMinus = document.createElement("button");
      const pizzaSizeThinOrderMinus = document.createElement("button");

      const pizzaSizeBigOrderCounter = document.createElement("p");
      const pizzaSizeMediumOrderCounter = document.createElement("p");
      const pizzaSizeThinOrderCounter = document.createElement("p");

      const pizzaSizeBigOrderPlus = document.createElement("button");
      const pizzaSizeMediumOrderPlus = document.createElement("button");
      const pizzaSizeThinOrderPlus = document.createElement("button");

      function addListSize() {
        const pizzaSizeTitle = 'pizzaSizeTitle';
        const pizzaSizePrice = 'pizzaSizePrice';
        const pizzaSizeWeight = 'pizzaSizeWeight';
        const pizzaSizeAddToCart = 'pizzaSizeAddToCart';
        const pizzaSizeCount = 'pizzaSizeCount';
        const pizzaSizeOrderMinus = 'pizzaSizeOrderMinus';
        const pizzaSizeOrderCounter = 'pizzaSizeOrderCounter';
        const pizzaSizeOrderPlus = 'pizzaSizeOrderPlus';
        const pizzaSizesContent = 'pizzaSizesContent';

        const btnPizzaSizeOrderMinus = document.getElementsByClassName('pizzaSizeOrderMinus');
        const btnPizzaSizeOrderPlus = document.getElementsByClassName('pizzaSizeOrderPlus');

        pizzaSizeBigTitle.classList.add(`${pizzaSizeTitle}`);
        pizzaSizeMediumTitle.classList.add(`${pizzaSizeTitle}`);
        pizzaSizeThinTitle.classList.add(`${pizzaSizeTitle}`);

        pizzaSizeBigPrice.classList.add(`${pizzaSizePrice}`);
        pizzaSizeMediumPrice.classList.add(`${pizzaSizePrice}`);
        pizzaSizeThinPrice.classList.add(`${pizzaSizePrice}`);

        pizzaSizeBigWeight.classList.add(`${pizzaSizeWeight}`);
        pizzaSizeMediumWeight.classList.add(`${pizzaSizeWeight}`);
        pizzaSizeThinWeight.classList.add(`${pizzaSizeWeight}`);

        pizzaSizeBigAddToCart.classList.add(`${pizzaSizeAddToCart}`);
        pizzaSizeMediumAddToCart.classList.add(`${pizzaSizeAddToCart}`);
        pizzaSizeThinAddToCart.classList.add(`${pizzaSizeAddToCart}`);

        pizzaSizeBigCount.classList.add(`${pizzaSizeCount}`);
        pizzaSizeMediumCount.classList.add(`${pizzaSizeCount}`);
        pizzaSizeThinCount.classList.add(`${pizzaSizeCount}`);

        pizzaSizeBigOrderMinus.classList.add(`${pizzaSizeOrderMinus}`);
        pizzaSizeMediumOrderMinus.classList.add(`${pizzaSizeOrderMinus}`);
        pizzaSizeThinOrderMinus.classList.add(`${pizzaSizeOrderMinus}`);

        Array.prototype.forEach.call(btnPizzaSizeOrderMinus, element => {
          element.textContent = '-';
        });

        pizzaSizeBigOrderCounter.classList.add(`${pizzaSizeOrderCounter}`);
        pizzaSizeMediumOrderCounter.classList.add(`${pizzaSizeOrderCounter}`);
        pizzaSizeThinOrderCounter.classList.add(`${pizzaSizeOrderCounter}`);

        pizzaSizeBigOrderPlus.classList.add(`${pizzaSizeOrderPlus}`);
        pizzaSizeMediumOrderPlus.classList.add(`${pizzaSizeOrderPlus}`);
        pizzaSizeThinOrderPlus.classList.add(`${pizzaSizeOrderPlus}`);

        Array.prototype.forEach.call(btnPizzaSizeOrderPlus, element => {
          element.textContent = '+';
        });

        pizzaSizesBigContent.classList.add(`${pizzaSizesContent}`);
        pizzaSizesMediumContent.classList.add(`${pizzaSizesContent}`);
        pizzaSizesThinContent.classList.add(`${pizzaSizesContent}`);
      }

      pizzaItem.classList.add('pizzaItem');
      pizzasList.append(pizzaItem);

      pizzaImg.classList.add('pizzaImg');
      pizzaImg.src = `${data[i].photo_small}`;
      pizzaImg.alt = 'пицца';
      pizzaItem.append(pizzaImg);

      pizzaDesc.classList.add('pizzaDesc');
      pizzaItem.append(pizzaDesc);

      pizzaTitle.id = 'pizzaTitle';
      pizzaTitle.textContent = `${data[i].title}`;
      pizzaDesc.append(pizzaTitle);

      pizzaSizes.classList.add('pizzaSizes');
      pizzaDesc.append(pizzaSizes);

      anonce.classList.add('anonce');
      anonce.textContent = `${data[i].anonce}`;
      pizzaDesc.append(anonce);

      if (data[i].is_big === 1) {
        addListSize();
        pizzaSizeBig.classList.add('pizzaSizeBig');
        pizzaSizes.append(pizzaSizeBig);
        pizzaSizeBig.append(pizzaSizesBigContent);

        pizzaSizeBigTitle.textContent = 'Большая';
        pizzaSizesBigContent.append(pizzaSizeBigTitle);

        pizzaSizeBigPrice.textContent = `${(data[i].big_price / 10000).toFixed(2)}`;
        pizzaSizesBigContent.append(pizzaSizeBigPrice);

        pizzaSizeBigWeight.textContent = `${data[i].big_weight}`;
        pizzaSizesBigContent.append(pizzaSizeBigWeight);

        pizzaSizeBigAddToCart.dataset.id = `${data[i].id}`;
        pizzaSizeBigAddToCart.dataset.sizebig = data[i].is_big;
        pizzaSizeBigAddToCart.textContent = 'В корзину';
        pizzaSizeBig.append(pizzaSizeBigAddToCart);

        pizzaSizeBig.append(pizzaSizeBigCount);

        pizzaSizeBigCount.append(pizzaSizeBigOrderMinus);
        pizzaSizeBigCount.append(pizzaSizeBigOrderCounter);
        pizzaSizeBigCount.append(pizzaSizeBigOrderPlus);
      }

      if (data[i].is_medium === 1) {
        addListSize();
        pizzaSizeMedium.classList.add('pizzaSizeMedium');
        pizzaSizes.append(pizzaSizeMedium);
        pizzaSizeMedium.append(pizzaSizesMediumContent);

        pizzaSizeMediumTitle.textContent = 'Стандартная';
        pizzaSizesMediumContent.append(pizzaSizeMediumTitle);

        pizzaSizeMediumPrice.textContent = `${(data[i].medium_price / 10000).toFixed(2)}`;
        pizzaSizesMediumContent.append(pizzaSizeMediumPrice);

        pizzaSizeMediumWeight.textContent = `${data[i].medium_weight}`;
        pizzaSizesMediumContent.append(pizzaSizeMediumWeight);

        pizzaSizeMediumAddToCart.dataset.id = `${data[i].id}`;
        pizzaSizeMediumAddToCart.dataset.sizemedium = data[i].is_medium;
        pizzaSizeMediumAddToCart.textContent = 'В корзину';
        pizzaSizeMedium.append(pizzaSizeMediumAddToCart);

        pizzaSizeMedium.append(pizzaSizeMediumCount);

        pizzaSizeMediumCount.append(pizzaSizeMediumOrderMinus);
        pizzaSizeMediumCount.append(pizzaSizeMediumOrderCounter);

        pizzaSizeMediumCount.append(pizzaSizeMediumOrderMinus);
        pizzaSizeMediumCount.append(pizzaSizeMediumOrderCounter);
        pizzaSizeMediumCount.append(pizzaSizeMediumOrderPlus);
      }

      if (data[i].is_thin === 1) {
        addListSize();

        pizzaSizeThin.classList.add('pizzaSizeThin');
        pizzaSizes.append(pizzaSizeThin);
        pizzaSizeThin.append(pizzaSizesThinContent);

        pizzaSizeThinTitle.textContent = 'Тонкое тесто 36 см';
        pizzaSizesThinContent.append(pizzaSizeThinTitle);

        pizzaSizeThinPrice.textContent = `${(data[i].medium_price / 10000).toFixed(2)}`;
        pizzaSizesThinContent.append(pizzaSizeThinPrice);

        pizzaSizeThinWeight.textContent = `${data[i].thin_weight}`;
        pizzaSizesThinContent.append(pizzaSizeThinWeight);

        pizzaSizeThinAddToCart.dataset.id = `${data[i].id}`;
        pizzaSizeThinAddToCart.dataset.sizethin = data[i].is_medium;
        pizzaSizeThinAddToCart.textContent = 'В корзину';
        pizzaSizeThin.append(pizzaSizeThinAddToCart);

        pizzaSizeThin.append(pizzaSizeThinCount);

        pizzaSizeThinCount.append(pizzaSizeThinOrderMinus);
        pizzaSizeThinCount.append(pizzaSizeThinOrderCounter);

        pizzaSizeThinCount.append(pizzaSizeThinOrderMinus);
        pizzaSizeThinCount.append(pizzaSizeThinOrderCounter);
        pizzaSizeThinCount.append(pizzaSizeThinOrderPlus);
      }
    }
  }

  async addToCart(pizza) {
    const id = pizza.id;
    const sizeBig = pizza.sizebig;
    const sizeMedium =pizza.sizemedium;
    const formData = new FormData();
    let size = '';

    if (sizeBig) {
      size = 'big';
    } else if (sizeMedium) {
      size = 'medium';
    } else {
      size = 'thin';
    }

    formData.append('type', 'pizza');
    formData.append('id', id);
    formData.append('size', size);
    formData.append('dough', 'thin');

    await fetch(addToCartUrl, {
      method: 'POST',
      body: formData,
    })

    // .then(function (response) {
    // 	response.json()
    // 		.then(function (obj) {
    // 			const dataAddToCart = obj.response.data;
    // 		})
    // })

  }
}

const pizza = new Pizza();
pizza.getListPizzas();
// $(document).on('click', '.pizzaSizeAddToCart', function () {
//   console.log($('.pizzaSizeAddToCart').data('id'));
// });
$(document).on('click', '.pizzaSizeAddToCart', function (e) {
  // console.log(e.target.dataset.id);
});

// $(function () {

// 	async function getListPizzas() {
// 		const pizzasUrl = `${prefix}https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`;
//
// 		await fetch(pizzasUrl)
// 			.then(function (response) {
// 				response.json()
// 					.then(function (obj) {
// 						const data = obj.response.data;
// 						showListPizzas(data)
// 					})
// 			});
// 	}

// 	// getListPizzas();

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

// 	$(document).on('click', '.basket', addToCart);
//
// 	async function addToCart(e) {
// 		const id = e.target.dataset.id;
// 		const sizeBig = e.target.dataset.sizebig;
// 		const sizeMedium = e.target.dataset.sizemedium;
// 		const formData = new FormData();
// 		let size = '';
//
// 		if (sizeBig) {
// 			size = 'big';
// 		} else if (sizeMedium) {
// 			size = 'medium';
// 		}
//
// 		formData.append('type', 'pizza');
// 		formData.append('id', id);
// 		formData.append('size', size);
// 		formData.append('dough', 'thin');
//
// 		await fetch(addToCartUrl, {
// 			method: 'POST',
// 			body: formData,
// 		})
// 			.then(function (response) {
// 				response.json()
// 					.then(function (obj) {
// 						const dataAddToCart = obj.response.data;
// 					})
// 			})
// 	}

// 	getBasket();

// 	async function getBasket() {
// 		await fetch(basketUrl)
// 			.then(function (response) {
// 				response.json()
// 					.then(function (obj) {
// 						const dataBasket = obj.response.data;
// 					})
// 			})
// 	}
//
// 	// async function checkBasket(dataAddToCart, dataBasket) {
// 	// 		// console.log(dataBasket.items)
// 	//
// 	// 		for (let i = 0; i < dataAddToCart.length; i++) {
// 	// 				for (let i = 0; i < dataBasket.length; i++) {
// 	// 						if (dataAddToCart.items[i].id === dataBasket.items[i].id) {
// 	// 								console.log(true);
// 	// 						}
// 	// 				}
// 	// 		}
// 	// }
//
// })