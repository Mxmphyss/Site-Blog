
// Afficher les travaux sur la page Index

function indexWork(apiData) {

    let gallery = document.querySelector('.gallery')

    apiData.forEach(element => {
        
        newFigure = document.createElement('figure');
        newFigure.id = element.id;

        newImg = document.createElement('img');
        newImg.src = element.imageUrl
        newImg.alt = element.title

        newTitle = document.createElement('figcaption');
        newTitle.innerText = element.title

        gallery.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(newTitle)

    });
}

/* création de Filtres */

function btnfiltres (categoryData){

    let filtres = document.querySelector('.filtres')

    for(let i = 0; i < categoryData.length; i++){
        // const btnfiltre = document.createElement('button[data-id]')
        filtres.innerHTML += '<button class = "btn-filtre filtres' + categoryData[i].id +'" data-id = "' + categoryData[i].id + '">' + categoryData[i].name + '</button>'
    }
}

/* Filtres */

/*Tous */

const btnfiltres1 = document.querySelector(".filtre1")

/*Objets */

const btnfiltres2 = document.querySelector(".filtres1")

btnfiltres2.addEventListener("click", function () {
    const galleryFiltree = apiCategory.filter(function (piece) {
        return piece.categoryData.name === "Objets";
    });
   console.log(galleryFiltree);
})

/*Appartements */

const btnfiltres3 = document.querySelector(".filtre2")

btnfiltres3.addEventListener("click", function(){
    const galleryFiltree = categoryData.filter(function (piece) {
        return piece.categoryData.name === "Appartements";
    });
   console.log(galleryFiltree);
})

/*Hôtel & restaurants */

const btnfiltres4 = document.querySelector(".filtre3")

btnfiltres4.addEventListener("click", function(){
    const galleryFiltree = categoryData.filter(function (piece) {
        return piece.categoryData.name === "Hotels & restaurants";
    });
   console.log(galleryFiltree);
})