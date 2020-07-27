const xhr = new XMLHttpRequest();
const url = 'https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc';
const proxyUrl = "https://cors-anywhere.herokuapp.com/";


xhr.open('GET', proxyUrl + url, true);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function () {
  let newContent = '';
  if (xhr.status === 200) {
    let responseObject = xhr.response;
    for (let i = 0; i < responseObject.response.data.length; i++) {
      newContent += '<div class="pizzas">';
      newContent += '<img src="'+ responseObject.response.data[i].photo_small + '">';
      newContent += '<p>' + responseObject.response.data[i].title + '</p>';
      newContent += '</div> ';
    }
  }
  document.getElementById('content').innerHTML = newContent;
};

xhr.onerror = function () {
  alert("Запрос не удался");
};