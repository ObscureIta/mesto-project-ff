(()=>{"use strict";var t,e,n,o,r={386:(t,e,n)=>{n.d(e,{Eg:()=>i,Ln:()=>u,Uw:()=>s,ck:()=>f,gL:()=>a,jG:()=>d,ld:()=>p,pz:()=>l});var o="https://nomoreparties.co/v1/wff-cohort-30/users/me",r="https://nomoreparties.co/v1/wff-cohort-30/cards",c="a4804a4c-45d8-4092-9048-57f3b23bd431",a=function(){return fetch(o,{headers:{authorization:c}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка выгрузки профиля"))})).catch((function(t){return console.log(t)}))},i=function(){return fetch(r,{headers:{authorization:c}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка выгрузки карт"))})).catch((function(t){return console.log(t)}))},u=function(t){return fetch(r,{method:"POST",headers:{authorization:c,"Content-Type":"application/json"},body:JSON.stringify({name:t.name,link:t.link})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка создания карты"))}))},s=function(t,e){return fetch(o,{method:"PATCH",headers:{authorization:c,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка обновления профиля"))}))},l=function(t){return fetch(o+"/avatar",{method:"PATCH",headers:{authorization:c,"Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка обновления аватара"))}))},d=function(t){return fetch("".concat(r,"/").concat(t),{method:"DELETE",headers:{authorization:c}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка удаления карты"))}))},p=function(t){return fetch("".concat(r,"/likes/").concat(t),{method:"PUT",headers:{authorization:c}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка лайка (Like)"))}))},f=function(t){return fetch("".concat(r,"/likes/").concat(t),{method:"DELETE",headers:{authorization:c}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," | Ошибка лайка (Unlike)"))}))}},262:(t,e,n)=>{n.d(e,{GO:()=>a,io:()=>i,zY:()=>c});var o=document.querySelector(".popup__image"),r=document.querySelector(".popup__caption");function c(t,e,n,c,a,i,u,s,l,d,p){var f=e.querySelector(".places__item.card").cloneNode(!0),m=f.querySelector(".card__title"),_=f.querySelector(".card__image"),v=f.querySelector(".card__delete-button"),y=f.querySelector(".card__like-button"),h=f.querySelector(".card__like-counter");return m.textContent=t.name,_.src=t.link,_.alt=t.name,t.likes.length>0?h.textContent=t.likes.length:h.textContent=0,t.likes.find((function(t){return t._id===p}))&&y.classList.add("card__like-button_is-active"),v.addEventListener("click",(function(){c(t._id).catch((function(t){return console.log(t)})),n(f)})),y.addEventListener("click",(function(){y.classList.contains("card__like-button_is-active")?u(t._id).then((function(t){h.textContent=t.likes.length})).catch((function(t){return console.log(t)})):i(t._id).then((function(t){h.textContent=t.likes.length})).catch((function(t){return console.log(t)})),a(f)})),_.addEventListener("click",(function(){d(_.src,_.alt,o,r),s(l)})),t.owner&&p!==t.owner._id&&v.remove(),f}function a(t){t.remove()}function i(t){t.querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}},26:(t,e,n)=>{n.a(t,(async(t,e)=>{try{var o=n(262),r=n(195),c=n(763),a=n(386);function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},u=document.querySelector("#card-template").content,s=document.querySelector(".places__list"),l=document.querySelector(".profile"),d=document.querySelector(".popup_type_new-card"),p=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_image"),m=document.querySelector(".popup_type_avatar"),_=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),y=document.querySelector(".profile__image"),h=document.forms.editProfile,b=document.forms.newPlace,k=document.forms.editAvatar,S=await(0,a.gL)(),g="";"object"===q(S)&&(g=S._id,j(_,v,y,S));var L=await(0,a.Eg)();function C(t,e,n,o){n.src=t,n.alt=e,o.textContent=e}function E(t,e){t.forEach((function(t){var n=(0,o.zY)(t,u,o.GO,a.jG,o.io,a.ld,a.ck,r.q,f,C,e);s.append(n)}))}function j(t,e,n,o){t.textContent=o.name,e.textContent=o.about,n.style.backgroundImage="url("+o.avatar+")"}function w(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=t.querySelector(".popup__button");e?"newPlace"===t.name?o.textContent="Создание...":o.textContent="Сохранение...":("newPlace"===t.name?o.textContent="Создать":o.textContent="Сохранить",n&&(o.textContent="Ошибка"))}"object"===q(L)&&E(L,g),(0,c.F)(i),l.addEventListener("click",(function(t){var e,n,o;t.target.classList.contains("profile__add-button")&&((0,c.R)(b,i),(0,r.q)(d)),t.target.classList.contains("profile__edit-button")&&(n=_,o=v,(e=h).elements.name.value=n.textContent,e.elements.description.value=o.textContent,(0,c.R)(h,i),(0,r.q)(p)),t.target.classList.contains("profile__edit-avatar-button")&&((0,c.R)(m,i),(0,r.q)(m))})),h.addEventListener("submit",(function(t){t.preventDefault(),w(h,!0),(0,a.Uw)(h.elements.name.value,h.elements.description.value).then((function(e){w(h,!1),j(_,v,y,e),(0,r.O)(p),t.target.reset()})).catch((function(t){w(b,!1,!0),console.log(t)}))})),b.addEventListener("submit",(function(t){var e={name:b.elements["place-name"].value,link:b.elements.link.value};t.preventDefault(),w(b,!0),(0,a.Ln)(e).then((function(n){e._id=n._id,e.likes=n.likes,w(b,!1);var c=(0,o.zY)(e,u,o.GO,a.jG,o.io,a.ld,a.ck,r.q,f,C,g);s.prepend(c),(0,r.O)(d),t.target.reset()})).catch((function(t){w(b,!1,!0),console.log(t)}))})),m.addEventListener("submit",(function(t){t.preventDefault(),w(k,!0),(0,a.pz)(k.elements.avatar.value).then((function(e){j(_,v,y,e),w(k,!1),(0,r.O)(m),t.target.reset()})).catch((function(t){w(b,!1,!0),console.log(t)}))})),e()}catch(x){e(x)}}),1)},195:(t,e,n)=>{function o(t){t.classList.add("popup_is-opened"),t.addEventListener("click",c),t.addEventListener("click",a),document.addEventListener("keydown",i)}function r(t){t.classList.remove("popup_is-opened"),t.removeEventListener("click",c),t.removeEventListener("click",a),document.removeEventListener("keydown",i)}function c(t){t.target.classList.contains("popup__close")&&r(u())}function a(t){t.target.classList.contains("popup")&&r(u())}function i(t){"Escape"===t.key&&r(u())}function u(){return document.querySelector(".popup_is-opened")}n.d(e,{O:()=>r,q:()=>o})},763:(t,e,n)=>{function o(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){e.addEventListener("input",(function(n){var o=n.target,r=e.querySelector(".".concat(o.id,"-error"));o.validity.patternMismatch?o.setCustomValidity(o.dataset.errorMessage):o.setCustomValidity(""),o.validity.valid?(a(e,t),c(o,r,t)):(a(e,t),function(t,e,n){t.classList.add(n.inputErrorClass),e.classList.add(n.errorClass),e.textContent=t.validationMessage}(o,r,t))}))}))}function r(t,e){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(n){c(n,t.querySelector(".".concat(n.id,"-error")),e)})),a(t,e)}function c(t,e,n){t.classList.remove(n.inputErrorClass),e.classList.remove(n.errorClass),e.textContent=""}function a(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.some((function(t){return!t.validity.valid}))?(o.classList.add(e.inactiveButtonClass),o.disabled=!0):(o.classList.remove(e.inactiveButtonClass),o.disabled=!1)}n.d(e,{F:()=>o,R:()=>r})}},c={};function a(t){var e=c[t];if(void 0!==e)return e.exports;var n=c[t]={exports:{}};return r[t](n,n.exports,a),n.exports}t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",o=t=>{t&&t.d<1&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},a.a=(r,c,a)=>{var i;a&&((i=[]).d=-1);var u,s,l,d=new Set,p=r.exports,f=new Promise(((t,e)=>{l=e,s=t}));f[e]=p,f[t]=t=>(i&&t(i),d.forEach(t),f.catch((t=>{}))),r.exports=f,c((r=>{var c;u=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[t])return r;if(r.then){var c=[];c.d=0,r.then((t=>{a[e]=t,o(c)}),(t=>{a[n]=t,o(c)}));var a={};return a[t]=t=>t(c),a}}var i={};return i[t]=t=>{},i[e]=r,i})))(r);var a=()=>u.map((t=>{if(t[n])throw t[n];return t[e]})),s=new Promise((e=>{(c=()=>e(a)).r=0;var n=t=>t!==i&&!d.has(t)&&(d.add(t),t&&!t.d&&(c.r++,t.push(c)));u.map((e=>e[t](n)))}));return c.r?s:a()}),(t=>(t?l(f[n]=t):s(p),o(i)))),i&&i.d<0&&(i.d=0)},a.d=(t,e)=>{for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),a(26)})();