var link=document.querySelector(".contacts-btn"),popup=document.querySelector(".write-us"),close=popup.querySelector(".modal-close"),form=popup.querySelector("form"),login=popup.querySelector("[name=login]"),email=popup.querySelector("[name=email]"),text=popup.querySelector("[name=text]"),isStorageSupport=!0,storage="";try{storage=localStorage.getItem("login"),storage=localStorage.getItem("email")}catch(e){isStorageSupport=!1}link.addEventListener("click",function(e){e.preventDefault(),popup.classList.add("modal-show"),storage?(login.value=storage,email.value=storage,text.focus()):login.focus()}),close.addEventListener("click",function(e){e.preventDefault(),popup.classList.remove("modal-show"),popup.classList.remove("modal-error")}),form.addEventListener("submit",function(e){login.value&&email.value?isStorageSupport&&(localStorage.setItem("login",login.value),localStorage.setItem("email",email.value)):(e.preventDefault(),popup.classList.remove("modal-error"),popup.offsetWidth=popup.offsetWidth,popup.classList.add("modal-error"))}),window.addEventListener("keydown",function(e){27===e.keyCode&&(e.preventDefault(),popup.classList.contains("modal-show")&&(popup.classList.remove("modal-show"),popup.classList.remove("modal-error")))});