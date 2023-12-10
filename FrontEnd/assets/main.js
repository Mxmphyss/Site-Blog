// Afficher les travaux sur la page Index

const gallery = document.querySelector('.gallery');
const modalGallery = document.querySelector(".modal-picture");

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
        trash.setAttribute('data-id', element.id)

        modalGallery.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(trash)
    
    });
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


const btnTrash = document.querySelector(".trashSize");

// Supprimer un projet

function deletePost(){

    const btnDeletes = document.querySelectorAll('.trashSize');

    btnDeletes.forEach((btnDelete, index) => {
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault();

            const idDelete = btnDelete.dataset.id;
            const figure = btnDelete.parentNode;
            const token = localStorage.getItem('token');
            console.log(figure);

            if(token){
                fetch(`http://localhost:5678/api/works/${idDelete}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    if(response.ok){
                        figure.remove();
                    } else {
                        // Message d'erreur
                        document.querySelector('.alert-error1').innerText = "l'élément n'a pas pû être supprimé";
                    }
                })
                .catch(error => {
                    console.error('error: ' + error)    
                })
            }
        })
    })
}

/* Modale ajout photo */

const addImg = document.querySelector('.add-img');
const inputFile = document.querySelector('#file');
const imgTarget = document.querySelector('.dwnld-img');

addImg.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 4000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const imgUrl = reader.result;
			const img = imgTarget.querySelector('.imgCheck');
			img.src = this.innerText = "";
            img.src = imgUrl;
            img.classList.add('hidden');
			imgTarget.classList.add('active');
			imgTarget.dataset.img = image.name;
            const allImg = imgTarget.querySelector('img');
            allImg.addEventListener('click', function (){
                const imgSrc = img.src
                imgSrc.innerText = "";
                imgTarget.classList.remove('active');
                img.classList.remove('hidden');
                inputFile.click();
            });
		}
		reader.readAsDataURL(image);
	} else {
		alert("la taille de l'image est supérieur à 4MB");
	}
})

// Formulaire

const btnCheck = document.querySelector('.addPicture2');
const form = document.getElementById('form');

const image = document.getElementById('file');
const imgCheck = document.querySelector('.imgCheck')
const title = document.getElementById('title');
const category = document.getElementById('id_category');

/* Button disabled */

function checkFormInputs() {
    // Vérification des valeurs dans les champs
    if (image.files.length > 0 && title.value && category.value !== "0") {
        // Si les champs contiennent une image, un titre et une valeur différente de 0 pour les catégories, on retire l'attribut disabled
        btnCheck.removeAttribute('disabled');
        btnCheck.classList.add('active')
    } else {
        // Sinon on ajoute l'attribut disabled
        btnCheck.setAttribute('disabled', 'disabled');
    }
}

checkFormInputs();

// On créé un évènement pour chaque champs, on appelle la fonction qui permet de vérifier leur valeur
image.addEventListener('change', checkFormInputs);
title.addEventListener('input', checkFormInputs);
category.addEventListener('change', checkFormInputs);

/* Button check */

function addWork(){

    btnCheck.addEventListener("click", function(event2){
        event2.preventDefault();
    
        const token = localStorage.getItem('token');
        const formWork = new FormData(form);
    
        // On récupère la valeurs des champs email et mot de passe
        formWork.append('title', title.value);
        formWork.append('category', category.value);
        formWork.append('image', image.files[0]);
    
        fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formWork,
        })
        .then((response) => {
            return response.json;
        })
        .then(() => {
            gallery.innerHTML = "";
            modalGallery.innerHTML="";
            apiWorks();
            form.rest();
            const img = imgTarget.querySelector('.imgCheck')
            img.src="";
            imgTarget.classList.remove('active');
            img.classList.remove('hidden');
        })
        .catch(error => {
            console.error('error: ' + error)    
        })
    });
}