// Api Works

const apiWorks = async () => {
    await fetch("http://localhost:5678/api/works")
    .then (reponse => reponse.json())
    .then ((data) => (apiData = data) )

    indexWork(apiData);
   //modalIndex(apiData);
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