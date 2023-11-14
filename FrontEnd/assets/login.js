/* Method POST */

const btnLog = document.querySelector('.btn-log');

btnLog.addEventListener("click", function(event){
    event.preventDefault();

    // On récupère la valeurs des champs email et mot de passe
    let email = document.querySelector("[name=email]").value;
    let password = document.querySelector("[name=psw]").value;

    // On affiche un message d'erreur si les valeurs ne sont pas correctes
    if(!email || !password){
        document.querySelector('.alert-form').innerText = "Identifiant ou mot de passe incorrect";
        return;
    }

    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
    .then(function(response){
        if(!response.ok){
            document.querySelector('.alert-form').innerText = "Identifiant ou mot de passe incorrect";
            return;
        } else {
            response.json().then(function(data){
                localStorage.setItem('token', data.token);
                window.location = "index.html";
            })
        }
    })
    .catch(error => 
        console.log('error: ' + error)    
    );

})