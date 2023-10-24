// Afficher les travaux sur la page Index

const gallery = document.querySelector('.gallery');

function indexWork(apiData) {

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

/* Login

Compte de test pour Sophie Bluel

email: sophie.bluel@test.tld

password: S0phie 

*/

/* Method POST */

/*

newLog = {
    "email" : "sophie.bluel@test.tld",
    "password" : "S0phie"
}

export const chargeUtile = json.stringify(newLog)

function token (){
    res.status(200).json({
        userId: user._id,
        token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET'
        )
    });
}

export const chargeUtile2 = json.stringify(token)

*/

/* creation de token

const jwt = require('jsonwebtoken');

/*


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 */

 /*

const formLog = document.querySelector('.form-log')

formLog.addEventListener("submit", function (event){
    event.preventDefault()
    const formulaire = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=psw]").value
    };

    if (formulaire == newLog){
        window.location.href="FrontEnd/login.html"
    } 
    else {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
    }
})

const login = document.querySelector('.btn-log')

login.addEventListener("click", function (){

})

*/

/* La modale */

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}

/* La modale */

const picture = document.querySelector(".modal-picture");

/*
picture.innerHTML= ''
*/

const btnEdition = document.querySelector(".edition2");
const modalContainer2 = document.querySelector(".modal-container2");
const cross = document.querySelector(".close-modal2");
const overlay = document.querySelector(".overlay2");

function addActive(){
    modalContainer2.classList.add("active")
}

btnEdition.addEventListener("click", addActive)

function deleteActive(){
    modalContainer2.classList.remove("active")
}

cross.addEventListener("click", deleteActive)
overlay.addEventListener("click", deleteActive)

console.log(btnEdition)