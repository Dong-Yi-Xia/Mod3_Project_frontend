"use strict";

// Stable Element
// _______________________________________________________________________
var flavorList = document.querySelector('div.flavorList');
var mainImage = document.querySelector('div.imageDisplay');
var menuNarBar = document.querySelector('div.menuNarBar');
var selectedOption = document.querySelector('div.selected_options');
var toppingDD = document.querySelector('select#toppingDropDown');
var milkDD = document.querySelector('select#milkDropDown');
var scoopDD = document.querySelector('select#scoopDropDown');
var selectedTopping = document.querySelector('p#selectedTopping');
var selectedMilk = document.querySelector('p#selectedMilk');
var selectedScoop = document.querySelector('p#selectedScoop');
var priceHolder = 0; // fetch request
// _______________________________________________________________________

fetch('http://localhost:3000/milks').then(function (r) {
  return r.json();
}).then(function (objArr) {
  objArr.forEach(function (objMilk) {
    addMilkOption(objMilk);
  });
});
fetch('http://localhost:3000/toppings').then(function (r) {
  return r.json();
}).then(function (objArr) {
  objArr.forEach(function (objTopping) {
    addToppingOption(objTopping);
  });
});
fetch('http://localhost:3000/flavors').then(function (r) {
  return r.json();
}).then(function (objArr) {
  objArr.forEach(function (objFlavor) {
    turnintoList(objFlavor);
  });
}); // 
// _______________________________________________________________________

function turnintoList(objFlavor) {
  var listUL = document.createElement('ul');
  var listLI = document.createElement('li');
  var imageFl = document.createElement('img');
  flavorList.append(listUL);
  listUL.append(listLI);
  listLI.innerText = objFlavor.name;
  changeToPointer(listLI);
  listLI.addEventListener("click", function (evt) {
    mainImage.innerText = "";
    mainImage.append(imageFl);
    imageFl.src = objFlavor.image;
  });
} // ice cream options
// _______________________________________________________________________


function options() {
  toppingDD.addEventListener("change", function (evt) {
    currentInput = evt.target.value;
    selectedTopping.innerText = "Selected Topping: ".concat(currentInput);
  });
  milkDD.addEventListener("change", function (evt) {
    currentInput = evt.target.value;
    selectedMilk.innerText = "Selected Milk: ".concat(currentInput);
  });
  scoopDD.addEventListener("change", function (evt) {
    currentInput = evt.target.value;
    selectedScoop.innerText = "Selected Scoop: ".concat(currentInput);
  });
}

options();

function addToppingOption(objTopping) {
  var optionsTop = document.createElement('option');
  optionsTop.value = objTopping.name;
  optionsTop.innerText = objTopping.name;
  toppingDD.append(optionsTop);
}

function addMilkOption(objMilk) {
  var optionsMilk = document.createElement('option');
  optionsMilk.value = objMilk.name;
  optionsMilk.innerText = objMilk.name;
  milkDD.append(optionsMilk);
} // extra
// _______________________________________________________________________=


function changeToPointer(li) {
  li.addEventListener("mouseover", function (evt) {
    li.style.cursor = "pointer";
  });
}