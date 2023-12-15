function log() {
  let editMode = document.querySelector(".headEdit");
  let editMode2 = document.querySelector(".edition2");

  if (localStorage.getItem("token")) {
    editMode.style.display = "flex";
    editMode2.style.display = "flex";

    let logTxt = document.querySelector(".logTxt");
    logTxt.innerHTML = '<button class="logTxt">Logout</button>';

    logTxt.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location = "login.html";
    });

    let filterOff = document.querySelector(".filtres");
    filterOff.style.display = "none";
  } else {
    editMode.style.display = "none";
    editMode2.style.display = "none";
  }
}

log();
