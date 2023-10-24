// Api Works

const apiWorks = async () => {
    await fetch("http://localhost:5678/api/works")
    .then (reponse => reponse.json())
    .then ((data) => (apiData = data) )

    indexWork(apiData);
}

apiWorks();

// Api Category

const apiCategory = async () => {
    await fetch("http://localhost:5678/api/categories")
    .then (reponse => reponse.json())
    .then ((data) => (categoryData = data) )

    btnfiltres(categoryData);
}

apiCategory();

// Api Category

/*

const apiLogin = async () => {
    await fetch("http://localhost:5678/api/users/login", {
        method:"post",
        headers: { "Content-Type": "application/json" },
        body: newLog
    } )
    .then (reponse => reponse.json())
    .then ((data) => (loginData = data) )

    ;
}

apiLogin();

*/
