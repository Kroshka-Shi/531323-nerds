  var link = document.querySelector(".contacts-btn");

  var popup = document.querySelector(".write-us");
  var close = popup.querySelector(".modal-close");

  var form = popup.querySelector("form");
  var login = popup.querySelector("[name=login]");
  var email = popup.querySelector("[name=email]");
  var text = popup.querySelector("[name=text]");

  var isStorageSupport = true;
  var storage = "";

  try {
  	storage = localStorage.getItem("login");
  	storage = localStorage.getItem("email");
  } catch (err) {
  	isStorageSupport = false;
  }

  link.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	popup.classList.add("modal-show");

  	if (storage) {
  		login.value = storage;
  		email.value = storage;
  		text.focus();
  	} else {
  		login.focus();
  	}
  });

  close.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	popup.classList.remove("modal-show");
  	popup.classList.remove("modal-error");
  });

  form.addEventListener("submit", function (evt) {
  	if (!login.value || !email.value) {
  		evt.preventDefault();
  		popup.classList.remove("modal-error");
  		popup.offsetWidth = popup.offsetWidth;
  		popup.classList.add("modal-error");
  	} else {
  		if (isStorageSupport) {
  			localStorage.setItem("login", login.value);
  			localStorage.setItem("email", email.value);
  		}
  	}
  });

  window.addEventListener("keydown", function (evt) {
  	if (evt.keyCode === 27) {
  		evt.preventDefault();
  		if (popup.classList.contains("modal-show")) {
  			popup.classList.remove("modal-show");
  			popup.classList.remove("modal-error");
  		}
  	}
  });
