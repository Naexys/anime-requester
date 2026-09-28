let synopsisId = 0;

function createSynopsis(synopsis) {
    const text = String(synopsis ?? "");
    if (text.length <= 180) return `<p>${text}</p>`;

    const id = `synopsis-${synopsisId++}`;
    return `<p>${text.slice(0, 180)}<span class="collapse" id="${id}">${text.slice(180)}</span></p>
        <button class="btn btn-link p-0 text-decoration-none" type="button"
            data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false"
            aria-controls="${id}">Lire plus</button>`;
}

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
        ${createSynopsis(element.synopsis)}
        <p>Genre : ${genres}</p>
        <p>Rank : ${element.ranking}</p>
        <p>Episodes : ${element.episodes}</p>
        `
    });

}

function showCardByRank(animes) {
    const board = document.getElementById("board");

    const card = document.createElement("div");
    card.classList.add("card");
    board.appendChild(card);
    const genreList = animes.genres ?? animes.genre ?? [];
    const genres = Array.isArray(genreList) ? genreList.join(", ") : genreList;
    card.innerHTML = `<h2>${animes.title}</h2>
        <img src="${animes.image}" alt="${animes.title}">
        ${createSynopsis(animes.synopsis)}
        <p>Genre : ${genres}</p>
        <p>Rank : ${animes.ranking}</p>
        <p>Episodes : ${animes.episodes}</p>
        `
}

export { showCard, showCardByRank };