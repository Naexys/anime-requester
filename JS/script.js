// Gestion d'API et de fetch par Thomas
import {  fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres  }from "./api.js";
import {showCard} from "./showcard.js";

//showCard(await fetchByName("OverFlow")) -- ex de méthode a appelé quand l'utilisateur rentre recherche par nom et met "Overflow"  