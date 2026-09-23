// Gestion d'API et de fetch par Thomas
const {  fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres  } = require("./api.js");
const {affCard} = require("./showcard.js");

affCard(await fetchByName("OverFlow"))  