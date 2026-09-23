// Collection de fonctions liées à l'API, tout les fetch de donées sont regroupés ici ! 

async function request(endpoint) {
	let userApiKey = window.sessionStorage.getItem('api_key');
	const url = `https://anime-db.p.rapidapi.com${endpoint}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': userApiKey,
			'x-rapidapi-host': 'anime-db.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			console.error(`HTTP Error ${response.status}: ${response.statusText}`);
			return null;
		}
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
}

async function fetchByName(name, page = 1, size = 20) {
	if (typeof name !== "string") {
		throw new Error("Wrong parameter type, 'name' must be a String");
	}
	return await request(`/anime?search=${name}&page=${page}&size=${size}`);
}

async function fetchByID(id) {
	if (typeof id !== "number" && typeof id !== "string") {
		throw new Error("Wrong parameter type, 'id' must be a String or Number");
	}
	return await request(`/anime/by-id/${id}`);
}

async function fetchByRank(rank) {
	if (typeof rank !== "number") {
		throw new Error("Wrong parameter type, 'rank' must be a Number");
	}
	return await request(`/anime/by-ranking/${rank}`);
}

async function fetchAvailableGenres() {
	return await request('/genre');
}

async function searchBySingleGenre(genreName, page = 1, size = 20) {
	if (typeof genreName !== "string") {
		throw new Error("Wrong parameter type, 'genreName' must be a String");
	}
	return await request(`/anime?genres=${genreName}&page=${page}&size=${size}`);
}

async function searchByMultipleGenres(genresNames, page = 1, size = 20) {
	if (!Array.isArray(genresNames)) {
		throw new Error("Wrong parameter type, 'genresNames' must be an Array");
	}
	const genresQuery = genresNames.join(',');
	return await request(`/anime?genres=${genresQuery}&page=${page}&size=${size}`);
}


export { fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres };