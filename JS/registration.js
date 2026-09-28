import { fetchAvailableGenresWithApiTestKey } from "./api.js";

const inputAPI = document.getElementById("input_api");
const button_go = document.getElementById("go");
const divAPI = document.getElementById("divAPI");

//Stack overflow 
function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, (s * 1000)));
}

button_go.addEventListener('click', async () => {
    console.log("Bouton cliqué");
    // check api key (not empty, ...)
    button_go.setAttribute("disabled", "disabled");

    let api_ket_to_try = inputAPI.value.trim();

    let availableGenresList = [];
    let validKey = false;
    try {
        availableGenresList = await fetchAvailableGenresWithApiTestKey(api_ket_to_try);
        if (availableGenresList !== null) {
            validKey = true;
            button_go.value = "Clé valide !";
        }
    } catch (error) {
        validKey = false;
        button_go.value = "Clé invalide !";
    }

    button_go.setAttribute("disabled", "enable");

    var newP = document.createElement('p');
    if (validKey === true) {
        newP.textContent = "Votre clé RapidAPI est valide, bonne utilisation de notre application";
    }
    else {
        newP.textContent = "Votre clé RapidAPI n'est PAS valide, merci de la vérifier ou vérifiez que vous n'avais pas fait plus de 30 reqûetes dans la journée";
    }
    
    divAPI.appendChild(document.createElement('br'));
    divAPI.appendChild(newP);

    // store in sessionStorage
    let apiKey = inputAPI.value;
    sessionStorage.setItem("api_key", apiKey);
    sessionStorage.setItem("genre_list", availableGenresList);
    await sleep(5);

    if (validKey === true) {
        // envoie vers l'application
        window.location.href = "/HTML/home.html";
    }
    else {
        //renvoie à la saisie de l'API
        window.location.reload();
    }


});