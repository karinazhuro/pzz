// !function (e) {
// 		"function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) {
// 				for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;) ++n;
// 				return Boolean(o[n])
// 		}), "function" != typeof e.closest && (e.closest = function (e) {
// 				for (var t = this; t && 1 === t.nodeType;) {
// 						if (t.matches(e)) return t;
// 						t = t.parentNode
// 				}
// 				return null
// 		})
// }(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  const modalButtons = document.getElementById('open-modal');
  const overlay = document.querySelector('.overlay-modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  modalButtons.addEventListener('click', function (e) {
    e.preventDefault();

    const modalId = this.getAttribute('data-modal');
    const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

    modalElem.classList.add('active');
    overlay.classList.add('active');
  }); // end click

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      const parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  document.body.addEventListener('keyup', function (e) {
    const key = e.keyCode;

    if (key === 27) {
      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    }
  }, false);

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });


});

$(document).on('click', '#sendStreet', searchStreet);
$(document).on('click', '#sendHouse', searchHouse);
$(document).on('click', '#sendAddress', sendAddress);

let id = '';
let houseTitleOrder = '';

async function searchStreet(e) {
  const streetTitle = $('#street').val().toUpperCase();
  const streetUrl = `https://pzz.by/api/v1/streets?order=title%3Aasc&search=title%3A${streetTitle}%2Ctitle%3A${streetTitle}`;

  e.preventDefault();

  await fetch(streetUrl)
    .then(function (response) {
      response.json()
        .then(function (obj) {
          const data = obj.response.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].title.toUpperCase() === streetTitle) {
              id = data[i].id;
            }
          }
        })
    })
}

async function searchHouse(e) {
  const streetOrderUrl = `https://pzz.by/api/v1/streets/${id}?order=title:asc&load=region.pizzeria`;
  const houseTitle = $('#house').val();

  e.preventDefault();

  await fetch(streetOrderUrl)
    .then(function (response) {
      response.json()
        .then(function (obj) {
          const data = obj.response.data;
          for (let i = 0; i < data.length; i++) {
            if (houseTitle === data[i].title) {
              houseTitleOrder = data[i].id;
            }
          }
        })
    })
}

async function sendAddress(e) {
  const houseUrl = `https://pzz.by/api/v1/house/resolve-pizzeria/${houseTitleOrder}`;

  e.preventDefault();

  await fetch(houseUrl)
    .then(function (response) {
      response.json();
    })
}