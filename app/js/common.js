const addToCartUrl = 'https://pzz.by/api/v1/basket/add-item';
const basketUrl = 'https://pzz.by/api/v1/basket';

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