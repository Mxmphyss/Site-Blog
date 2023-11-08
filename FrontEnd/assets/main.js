// Afficher les travaux sur la page Index

const gallery = document.querySelector('.gallery');

function indexWork(apiData) {

    // Affiche les travaux sur la gallerie Index
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

    // Affiche les travaux sur la galerie de la modale
}

/* création de Filtres */

function btnfiltres(categoryData){

    let filtres = document.querySelector('.filtres');

    filtres.innerHTML = '<button class="btn-filtre all">Tous</button>';

    for(let i = 0; i < categoryData.length; i++){
        // const btnfiltre = document.createElement('button[data-id]')
        filtres.innerHTML += '<button class = "btn-filtre" data-id = "' + categoryData[i].id + '">' + categoryData[i].name + '</button>';
    }

    const btnfiltre = document.querySelectorAll('.btn-filtre[data-id]');

    btnfiltre.forEach(button => {
        button.addEventListener('click', () => {
            const dataId = button.dataset.id
            let filtre = apiData.filter(function(element){
                return element.categoryId == dataId;
            });
            gallery.innerHTML = '';
            indexWork(filtre);
        });
    });

    const btnAll = document.querySelector('.all');

    btnAll.addEventListener('click', () => {
        gallery.innerHTML = '';
        return indexWork(apiData);
    });
}

/* La modale */

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}

/* La modale */

const btnEdition = document.querySelector(".edition2");
const modalContainer2 = document.querySelector(".modal-container2");

function addActive(){
    modalContainer.classList.add("active");
    modalContainer2.classList.remove("active");
}

btnEdition.addEventListener("click", addActive)

const addPicture = document.querySelector(".addPicture")

function deleteActive(){
    modalContainer.classList.remove("active");
    modalContainer2.classList.add("active")
}

addPicture.addEventListener("click", deleteActive)


const retour = document.querySelector(".return-modal");

retour.addEventListener("click", addActive)


const cross = document.querySelector(".close-modal");
const cross2 = document.querySelector(".close-modal2");
const overlay = document.querySelector(".overlay2");

function deleteAll(){
    modalContainer.classList.remove("active");
    modalContainer2.classList.remove("active")
}

cross.addEventListener("click", deleteAll)
cross2.addEventListener("click", deleteAll)
overlay.addEventListener("click", deleteAll)

/* Supprimer une photo */

/*

const picture = document.querySelector(".modal-picture");

function modalIndex(apiData) {

    apiData.forEach(element => {

    // Affiche les travaux sur la galerie de la modale        
        newFigure = document.createElement('figure');
        newFigure.classList.add('figureSize')
        newFigure.id = element.id;

        newImg = document.createElement('img');
        newImg.classList.add('imgSize')
        newImg.src = element.imageUrl
        newImg.alt = element.title

        trash = document.createElement('button');
        trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        trash.classList.add('trashSize')
        trash.classList.add('trashSize'+ element.id)

        picture.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(trash)

    });

}

const btnTrash = document.querySelector(".trashSize");

function deletePost(){
    let id = document.getElementById("id").value;
    console.log(id)
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        body: null,
        headers: { "Content-Type": "application/json" },
    })
    .then ((response) => response.json())
    .then ((json) => console.log(json));
}

btnTrash.addEventListener("click", deletePost);

*/