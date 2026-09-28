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
    }
    else if (select.value === "0") {
        search.innerHTML = `<form action="">
            <fieldset disabled>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="Research"
              />
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

select.addEventListener("change", updateSearch);
updateSearch();


