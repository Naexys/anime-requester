function showCard(animes) {
    const board = document.getElementById("board");

    animes.data.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card");
        board.appendChild(card);
        const genreList = element.genres ?? element.genre ?? [];
        const genres = Array.isArray(genreList) ? genreList.join(", ") : genreList;
        card.innerHTML = `<h2>${element.title}</h2>
        <img src="${element.image}" alt="${element.title}">
        <p>${element.synopsis}</p>
        <p>Genre : ${genres}</p>
        <p>Rank : ${element.ranking}</p>
        <p>Episodes : ${element.episodes}</p>
        `
    });

}


export { showCard };