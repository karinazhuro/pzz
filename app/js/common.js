const prefix = 'https://cors-anywhere.herokuapp.com/';
const addToCartUrl = `${prefix}https://pzz.by/api/v1/basket/add-item`;
const basketUrl = `${prefix}https://pzz.by/api/v1/basket`;

getBasket = async function(callback) {
		await fetch(basketUrl)
		.then(function (response) {
				response.json()
				.then(function (obj) {
						const data = obj.response.data
						callback(data);
				})
		})
}