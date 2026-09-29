# anime-requester

An anime discovery web app built to search, filter, and request anime information using the Anime DB API. Developed as part of our IUT web development project.

Accessible at https://naexys.github.io/anime-requester/

## Features

- RapidAPI key registration and validation
- Anime search by title keywords
- Genre-based filtering (single and multiple genres)
- Detailed anime cards displaying posters, synopses, rankings, and episode counts
- Local session storage persistence using `sessionStorage` with JSON serialization, to avoid to use too much API Calls
- Modular JavaScript design using differents modules, one module per functionnality

## Local usage

Here is how to run the website on your machine:

```bash
  git clone https://github.com/Naexys/anime-requester.git Naexys-anime-requester
  cd Naexys-anime-requester
  python3 -m http.server
```

Then serve the project using a local web server (such as Live Server in VS Code, `npx serve`, or `python3 -m http.server`) and open `index.html`.

## Authors

- Nicolas Blaison ([@Naexys](https://www.github.com/Naexys))
- Victor Anger--Renault ([@TXC-VIKTOR](https://github.com/TXC-VIKTOR))
- Thomas Constantin ([@GalaxyShadow99](https://github.com/GalaxyShadow99))

### Frameworks & Libraries

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)](https://docs.github.com/fr/pages) [![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/) [![RapidAPI](https://img.shields.io/badge/RapidAPI-0055DA?style=for-the-badge&logo=rapid&logoColor=white)](https://rapidapi.com/brian.rofiq/api/anime-db)

### Languages

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]() [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]() [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()

