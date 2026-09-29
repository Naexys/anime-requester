import { showCard, showCardOneCard } from "./showcard.js";
import { fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres } from "./api.js";

const genre_list = sessionStorage.getItem('genre_list');
const select = document.querySelector(".form-select");
const search = document.getElementById('search');
const li = JSON.parse(genre_list);

function updateSearch() {
    if (select.value === "4") {
        search.innerHTML = `<div class="btn-group" id="dropdown-genres" aria-label="Dropdown selection menu">
        <button class="btn border border-current text-reset dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" >Genres</button>
        </div>`;

        search.className = "d-flex gap-2";

        let button_search = document.createElement("button");
        button_search.className = "btn border border-current text-reset";
        button_search.textContent = "Search";
        button_search.addEventListener('click', searchGenre);
        search.appendChild(button_search);

        const genreSelect = document.getElementById("dropdown-genres");

        let option_list = document.createElement("ul");
        option_list.className = "dropdown-menu";
        genreSelect.appendChild(option_list);
        li.forEach(element => {
            // create option
            let option = document.createElement("li");
            option.value = element.id;

            // create label
            let option_label = document.createElement("label");
            option_label.className = "form-check-label dropdown-item";

            // create checkbox
            let option_check = document.createElement("input");
            option_check.type = "checkbox";
            option_check.className = "form-check-input";
            option_check.id = element.id;

            option_label.appendChild(option_check);
            option_label.appendChild(document.createTextNode(" " + element.id));


            option.appendChild(option_label);
            option_list.appendChild(option);
        });

    }
    else if (select.value === "0") {
        search.innerHTML = `<form action="">
            <fieldset disabled>
              <input
                type="search"
                id="disabledTextInput"
                class="form-control"
                placeholder="Research"
              />
              
            </fieldset>
          </form>`;

    }
    else {
        search.innerHTML = `<form action="" id="searchForm">
                <input id="sBy" type="text" class="form-control" placeholder="Research" />
                <input type="submit" class="btn btn-primary" value="Submit">
                </form>`;
        document.getElementById("searchForm").addEventListener("submit", handleSubmit);
    }
}

async function searchGenre() {
    const board = document.getElementById("board");
    board.querySelectorAll(".card").forEach(card => card.remove());

    // count checkboxes
    const container = document.querySelector('#dropdown-genres');
    const checkboxData = {};

    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const identifier = checkbox.id;
        if (identifier) {
            checkboxData[identifier] = checkbox.checked;
        }
    }); 
    
    let nbChecked = 0;
    let oneGenre;
    let multipleGenres = [];
    Object.entries(checkboxData).forEach(([property, value]) => {
        if (value == true){
            nbChecked++;
            oneGenre = property;
            multipleGenres.push(property);
        }
    });

    // search one genre
    if (nbChecked == 1){
        showCard(await searchBySingleGenre(oneGenre));
    }

    // search multiple genres
    else {
        showCard(await searchByMultipleGenres(multipleGenres));
    }

}

async function handleSubmit(event) {
    const board = document.getElementById("board");
    board.querySelectorAll(".card").forEach(card => card.remove());
    event.preventDefault();
    const sBy = document.getElementById("sBy").value;
    if (select.value === "1") {
        showCard(await fetchByName(sBy))
    }
    if (select.value === "2") {
        showCardOneCard(await fetchByID(sBy))
    }
    if (select.value === "3") {
        console.log(await fetchByRank(parseInt(sBy)))
        showCardOneCard(await fetchByRank(parseInt(sBy)))
    }
}

select.addEventListener("change", updateSearch);
updateSearch();