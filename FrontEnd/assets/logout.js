function log(){

    let editMode = document.querySelector('.headEdit');
    let editMode2 = document.querySelector('.edition2');

    if(localStorage.getItem('token')){
        editMode.style.display = "flex";
        editMode2.style.display = "flex";

        let logTxt = document.querySelector('.logTxt');
        logTxt.innerHTML = '<li class="logTxt">Logout</li>';

        let filterOff = document.querySelector('.filtres')
        filterOff.style.display = "none";
    } else {
        editMode.style.display = "none";
        editMode2.style.display = "none";
    }
    
}

log();