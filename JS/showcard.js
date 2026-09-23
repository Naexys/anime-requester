function affCard(animes) {

    const board = document.getElementById("board");
    const card = document.createElement("div");
    card.classList.add("card");
    board.appendChild(card);
    card.innerHTML = `${animes[data][0][title]}`
}


export {affCard};