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
    .then ((data) => (apiData = data) )

    btnfiltres(apiData);
}

apiCategory();

