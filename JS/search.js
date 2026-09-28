import { showCard, showCardByRank } from "./showcard.js";
import { fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres } from "./api.js";

const genre_list = sessionStorage.getItem('genre_list');
const select = document.querySelector(".form-select");
const search = document.getElementById('search');
const li = JSON.parse(genre_list);

function updateSearch() {
    if (select.value === "4") {
        search.innerHTML = `<select class="form-select" id="floatingSelect" aria-label="Floating label select example">
        <option selected>Genres</option>
        </select>`;

        const genreSelect = document.getElementById("floatingSelect");
        li.forEach(element => {
            genreSelect.add(new Option(element.id, element.id));
        });
        genreSelect.addEventListener("change", searchGenre);

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

async function searchGenre(event) {
    const board = document.getElementById("board");
    board.querySelectorAll(".card").forEach(card => card.remove());
    let g = event.currentTarget.value
    console.log(event.currentTarget.value);
    showCard(await searchBySingleGenre(g))
}

async function handleSubmit(event) {
    const board = document.getElementById("board");
    board.querySelectorAll(".card").forEach(card => card.remove());
    event.preventDefault();
    const sBy = document.getElementById("sBy").value;
    if (select.value === "1"){
        showCard(await fetchByName(sBy))
    }
    if (select.value === "2"){
        showCard(await fetchByID(sBy))
    }
    if (select.value === "3"){
        console.log(await fetchByRank(parseInt(sBy)))
        showCardByRank(await fetchByRank(parseInt(sBy)))
    }
}

select.addEventListener("change", updateSearch);
updateSearch();