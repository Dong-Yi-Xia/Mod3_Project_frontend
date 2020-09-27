"use strict";

flavorList = document.querySelector('div.flavorList');
mainImage = document.querySelector('div.imageDisplay');
fetch('http://localhost:3000/flavors').then(function (r) {
  return r.json();
}).then(function (objArr) {
  objArr.forEach(function (objFlavor) {
    turnintoList(objFlavor);
  });
});

function turnintoList(objFlavor) {
  var listUL = document.createElement('ul');
  var listLI = document.createElement('li');
  var imageFl = document.createElement('img');
  flavorList.append(listUL);
  listUL.append(listLI);
  mainImage.append(imageFl);
  listLI.innerText = objFlavor.name;
  imageFl.src = objFlavor.image;
}