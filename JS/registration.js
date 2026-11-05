import { fetchAvailableGenres } from "./api.js";

const button_go = document.getElementById("go");

button_go.addEventListener('click', async () => {
    button_go.setAttribute("disabled", "disabled");
    button_go.textContent = "Loading...";

    try {
        const availableGenresList = await fetchAvailableGenres();
        if (availableGenresList && availableGenresList.length > 0) {
            sessionStorage.setItem("genre_list", JSON.stringify(availableGenresList));
        }
    } catch (error) {
        console.warn("Could not preload genres, will retry on home:", error);
    }

    sessionStorage.setItem("api_key", "kitsu_public");
    window.location.href = "HTML/home.html";
});
