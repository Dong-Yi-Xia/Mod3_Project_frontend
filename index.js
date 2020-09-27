flavorList = document.querySelector('div.flavorList')
mainImage = document.querySelector('div.imageDisplay')



fetch('http://localhost:3000/flavors')
.then(r => r.json())
.then(objArr => {
    objArr.forEach(objFlavor => {
        turnintoList(objFlavor)
    })
});

function turnintoList(objFlavor) {
    let listUL = document.createElement('ul')
    let listLI = document.createElement('li')
    let imageFl = document.createElement('img')
    flavorList.append(listUL)
    listUL.append(listLI)
    mainImage.append(imageFl)

    listLI.innerText = objFlavor.name
    imageFl.src = objFlavor.image
    


}

