// Stable Element
// _______________________________________________________________________
let displayPrice = document.querySelector('div#displayPrice')
let flavorList = document.querySelector('div.flavorList')
let mainImage = document.querySelector('div.imageDisplay')
let menuNarBar = document.querySelector('div.menuNarBar')
let selectedOption = document.querySelector('div.selected_options')
let toppingDD = document.querySelector('select#toppingDropDown')
let milkDD = document.querySelector('select#milkDropDown')
let scoopDD = document.querySelector('select#scoopDropDown')

let selectedTopping = document.querySelector('p#selectedTopping')
let selectedMilk = document.querySelector('p#selectedMilk')
let selectedScoop = document.querySelector('p#selectedScoop')
let selectedPrice = document.querySelector('p#totalPrice')

let seeTotalButton = document.querySelector('button#addButton')
let purchaseButton = document.querySelector('button#purchaseButton')
let reviewBox = document.querySelector('div#reviews')
let reviewUL = document.querySelector('ul#reviewUL')

let foundToppingObj = {}
let foundMlikObj = {}
let foundScoopObj = {}
let foundFlavorObj = {}





// fetch request
// _______________________________________________________________________

fetch('http://localhost:3000/scoops')
.then(r => r.json())
.then(objArr => {
    objArr.forEach(objScoop => {
        addScoopOption(objScoop)
    })
});

fetch('http://localhost:3000/milks')
.then(r => r.json())
.then(objArr => {
    objArr.forEach(objMilk => {
        addMilkOption(objMilk)
    })
});

fetch('http://localhost:3000/toppings')
.then(r => r.json())
.then(objArr => {
    objArr.forEach(objTopping => {
        addToppingOption(objTopping)
    })
});


fetch('http://localhost:3000/flavors')
.then(r => r.json())
.then(objArr => {
    objArr.forEach(objFlavor => {
        turnintoList(objFlavor)
    })
});

// 
// _______________________________________________________________________

// menuNarBar.style.display = "none"

function turnintoList(objFlavor) {
    let listUL = document.createElement('ul')
    let listLI = document.createElement('li')
    let imageFl = document.createElement('img')
    flavorList.append(listUL)
    listUL.append(listLI)
    listLI.innerText = objFlavor.name
    
    changeToPointer(listLI)
    
    listLI.addEventListener("click", (evt)=>{
        // menuNarBar.style.display = "block"
        foundFlavorObj = objFlavor

        mainImage.innerText = ""
        mainImage.append(imageFl)
        imageFl.src = objFlavor.image
        
        reviewUL.innerText = ""
        objFlavor.reviews.forEach(reviewObj => {
            let reviewLI = document.createElement('li')
            reviewLI.innerText = reviewObj.review
            reviewUL.append(reviewLI)
        })

    })
}

// ice cream options
// _______________________________________________________________________

function options(element){  
    
    toppingDD.addEventListener("change", (evt)=>{
        currentInput = evt.target.value
        selectedTopping.innerText = `Selected Topping: ${currentInput}`
        fetch('http://localhost:3000/toppings')
        .then(r => r.json())
        .then(objArr => {
            let found = objArr.find(ele => {
                return ele.name === currentInput
            }) 
            foundToppingObj = found
        })
    })

    milkDD.addEventListener("change", (evt)=>{
        currentInput = evt.target.value
        selectedMilk.innerText = `Selected Milk: ${currentInput}`

        fetch('http://localhost:3000/milks')
        .then(r => r.json())
        .then(objArr => {
            let found = objArr.find(ele => {
                return ele.name === currentInput
            }) 
            foundMlikObj = found
        })
    })

    scoopDD.addEventListener("change", (evt)=>{
        currentInput = evt.target.value
        selectedScoop.innerText = `Selected Scoop: ${currentInput}`

        fetch('http://localhost:3000/scoops')
        .then(r => r.json())
        .then(objArr => {
            let found = objArr.find(ele => {
                return ele.number === Number(currentInput)
            }) 
            foundScoopObj = found
        })
    })

    displayTotal()

}


options()

// ice cream options display
// _______________________________________________________________________
function addToppingOption (objTopping) {
    let optionsTop = document.createElement('option')
        optionsTop.value = objTopping.name
        optionsTop.innerText = `$${objTopping.price} - ${objTopping.name}`
    toppingDD.append(optionsTop)
}

function addMilkOption (objMilk) {
    let optionsMilk = document.createElement('option')
        optionsMilk.value = objMilk.name
        optionsMilk.innerText = `$${objMilk.price} - ${objMilk.name}`
    milkDD.append(optionsMilk)
}

function addScoopOption (objScoop) {
    let optionsScoop = document.createElement('option')
        optionsScoop.value = objScoop.number
        optionsScoop.innerText = `$${objScoop.price} - ${objScoop.number}`
    scoopDD.append(optionsScoop)
}

function displayTotal(){
    seeTotalButton.addEventListener("click", (evt)=>{   
        displayPrice.innerText = ''
        let priceH2 = document.createElement('h2')
            priceH2.innerText = `$ ${foundToppingObj.price +foundMlikObj.price + foundScoopObj.price + foundFlavorObj.price}`
        displayPrice.append(priceH2)
        console.log(foundToppingObj, foundMlikObj, foundScoopObj, foundFlavorObj)
    })
}

// extra
// _______________________________________________________________________=

function changeToPointer(li){
    li.addEventListener("mouseover", (evt)=>{
        li.style.cursor = "pointer"
    })
}



