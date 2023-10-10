const apiWorks = fetch("http://localhost:5678/api/works")
    .then (reponse => reponse.json())
let gallery = document.querySelector(".gallery")

for (let i = 0; i < apiWorks.length; i++){
    const figure = document.createElement("figure")
    const imgFigure = document.createElement("img")
    const figCaption = document.createElement("figcaption")

    gallery.appendChild(figure)
    figure.appendChild(imgFigure)
    figure.appendChild(figCaption)

    imgFigure.src.innerText(works.body.imageUrl)
    figCaption.innerText(works.body.title)
}

/* Filtres */

/*Tous */

const btnfiltres1 = document.querySelector(".filtre1")

/*Objets */

const btnfiltres2 = document.querySelector(".filtre2")
btnfiltres2.addEventListener("click", function(){
    const galleryFiltree = apiWorks.filter(function (piece) {
        return piece.apiWorks.category.name === "Objets";
    });
   console.log(galleryFiltree);
})

/*Appartements */

const btnfiltres3 = document.querySelector(".filtre3")
btnfiltres3.addEventListener("click", function(){
    const galleryFiltree = apiWorks.filter(function (piece) {
        return piece.apiWorks.category.name === "Appartements";
    });
   console.log(galleryFiltree);
})

/*Hôtel & restaurants */

const btnfiltres4 = document.querySelector(".filtre4")
btnfiltres4.addEventListener("click", function(){
    const galleryFiltree = apiWorks.filter(function (piece) {
        return piece.apiWorks.category.name === "Hotels & restaurants";
    });
   console.log(galleryFiltree);
})