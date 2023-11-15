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
                fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    Authorization: `Bearer ${token}`
                })
                .then((response) => {
                    if(response.ok){
                        figure.remove(apiData)
                    } else {
                        // Message d'erreur
                        document.querySelector('.alert-error1').innerText = "l'élément n'a pas pû être supprimé";
                    }
                })
                .catch(error => {
                    console.log('error: ' + error)    
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
			const img = document.createElement('img');
			img.src = imgUrl;
			imgTarget.appendChild(img);
			imgTarget.classList.add('active');
			imgTarget.dataset.img = image.name;
            const allImg = imgTarget.querySelector('img');
            allImg.addEventListener('click', function (){
                allImg.remove();
                imgTarget.classList.remove('active');
                inputFile.click();
            });
		}
		reader.readAsDataURL(image);
	} else {
		alert("la taille de l'image est supérieur à 4MB");
	}
})

const btnCheck = document.querySelector('.addPicture2');

btnCheck.addEventListener("click", function(event2){
    event2.preventDefault();

    // On récupère la valeurs des champs email et mot de passe
    let title = document.querySelector("[name=titre]").value;
    let category = document.querySelector(".input-box").value;

    console.log(category)

    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "id": 1,
            "title": title,
            "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
            "categoryId": 1,
            "userId": 1,
            "category": {
              "id": 1,
              "name": category
            }
          })
    })
    .catch(error => 
        console.log('error: ' + error)    
    );

})

/* Liste catégorie stylisée */

let input = document.querySelector(".input-box");
      input.onclick = function () {
        this.classList.toggle("open");
        let list = this.nextElementSibling;
        if (list.style.maxHeight) {
          list.style.maxHeight = null;
          list.style.boxShadow = null;
        } else {
          list.style.maxHeight = list.scrollHeight + "px";
          list.style.boxShadow =
            "0 1px 2px 0 rgba(0, 0, 0, 0.15),0 1px 3px 1px rgba(0, 0, 0, 0.1)";
        }
      };

let rad = document.querySelectorAll(".radio");
      rad.forEach((item) => {
        item.addEventListener("change", () => {
          input.innerHTML = item.nextElementSibling.innerHTML;
          input.click();
        });
      });

let label = document.querySelectorAll("label");
      function search(searchin) {
        let searchVal = searchin.value;
        searchVal = searchVal.toUpperCase();
        label.forEach((item) => {
          let checkVal = item.querySelector(".name").innerHTML;
          checkVal = checkVal.toUpperCase();
          if (checkVal.indexOf(searchVal) == -1) {
            item.style.display = "none";
          } else {
            item.style.display = "flex";
          }
          let list = input.nextElementSibling;
          list.style.maxHeight = list.scrollHeight + "px";
        });
      }
