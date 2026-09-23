// Gestion d'API et de fetch par Thomas
import {  fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres  }from "./api.js";
import {affCard} from "./showcard.js";

affCard(await fetchByName("OverFlow"))  