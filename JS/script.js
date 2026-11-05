// Gestion d'API et de fetch par Thomas
import { fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres } from "./api.js";
import { showCard, showCardOneCard } from "./showcard.js";
import "./search.js";

if(sessionStorage.getItem("genre_list") == null){
    window.location.href = "../index.html";
}

//showCard(await fetchByName("OverFlow")) -- ex de méthode a appelé quand l'utilisateur rentre recherche par nom et met "Overflow"  