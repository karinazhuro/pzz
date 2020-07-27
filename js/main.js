const xhr = new XMLHttpRequest();
const url = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
const proxyurl = "https://cors-anywhere.herokuapp.com/";


xhr.open('GET', proxyurl + url, true);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function () {
		let newContent = '';
		if (xhr.status === 200) {
				let responseObject = xhr.response;
				for (let i = 0; i < responseObject.data.length; i++) {
						newContent = responseObject.data[i].title;
				}
		}
		document.getElementById('content').innerHTML = newContent;
}

xhr.onerror = function () {
	alert("Запрос не удался");
}