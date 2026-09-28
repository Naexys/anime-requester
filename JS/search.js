import { showCard } from "./showcard.js";
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
              <input type="button" onclick="myFunction()" value="Submit">
            </fieldset>
          </form>`;

    }
    else {
        search.innerHTML = `<form action="" id="searchForm">
                <input type="text"
                class="form-control" placeholder="Research" />
                </form>`;
    }
}

async function searchGenre(event) {
    const board = document.getElementById("board");
    board.querySelectorAll(".card").forEach(card => card.remove());
    let g = event.currentTarget.value
    console.log(event.currentTarget.value);
    showCard(await searchBySingleGenre(g))
}

select.addEventListener("change", updateSearch);
updateSearch();