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
    const newP = document.createElement('p');
    newP.classList.add("mt-3");

    if (validKey === true) {
        newP.classList.add("text-success");
        newP.textContent =
            "Votre clé RapidAPI est valide. Bonne utilisation de notre application.";

        // store in sessionStorage only if valid key
        let apiKey = inputAPI.value;
        console.table(availableGenresList);
        sessionStorage.setItem("api_key", apiKey);
        sessionStorage.setItem("genre_list", JSON.stringify(availableGenresList));

    } else {
        newP.classList.add("text-danger");
        newP.textContent =
            "Votre clé RapidAPI n'est pas valide. Merci de la vérifier ou de vérifier que vous n'avez pas effectué plus de 30 requêtes dans la journée.";

        // clear sessionStorage if invalid key, avoid storing old key and genres list
        sessionStorage.removeItem("api_key");
        sessionStorage.removeItem("genre_list");
        sessionStorage.removeItem("remaining-requests");
        sessionStorage.removeItem("reset-timer");
    }

    divAPI.parentElement.appendChild(newP);
    await sleep(2);

    if (validKey === true) {
        // envoie vers l'application
        window.location.href = "HTML/home.html";
    }
    else {
        //renvoie à la saisie de l'API
        window.location.reload();
    }


});