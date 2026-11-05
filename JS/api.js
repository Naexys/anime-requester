const BASE_URL = "https://kitsu.io/api/edge";

// Transforme un anime Kitsu pour pas recoder tout frontend... format de l'ancienne API
function formatAnime(item, included = []) {
	if (!item) return null;
	const attr = item.attributes || {};

	// Récupère les noms des genres
	let genres = [];
	if (item.relationships?.categories?.data && Array.isArray(included)) {
		const ids = item.relationships.categories.data.map(c => c.id);
		genres = included
			.filter(inc => ids.includes(inc.id))
			.map(inc => inc.attributes?.title || inc.attributes?.slug);
	}

	return {
		_id: item.id,
		title: attr.titles?.en || attr.canonicalTitle || attr.titles?.en_jp || "No title",
		image: attr.posterImage?.medium || attr.posterImage?.original || "",
		synopsis: attr.synopsis || "No description available.",
		genres: genres,
		ranking: attr.ratingRank ?? "N/A",
		episodes: attr.episodeCount ?? "N/A"
	};
}

// Fonction fetch de base
async function request(endpoint) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`);
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		console.error("Erreur API:", error);
		return null;
	}
}

// Recherche par nom
async function fetchByName(name, page = 1, size = 20) {
	const offset = (page - 1) * size;
	const res = await request(`/anime?filter[text]=${encodeURIComponent(name)}&page[limit]=${size}&page[offset]=${offset}&include=categories`);
	if (!res || !res.data) return { data: [] };
	return { data: res.data.map(item => formatAnime(item, res.included)) };
}

// Recherche par ID
async function fetchByID(id) {
	const res = await request(`/anime/${id}?include=categories`);
	if (!res || !res.data) return null;
	return formatAnime(res.data, res.included);
}

// Recherche par Rang exact
// L'API ne permet pas de filtrer par ratingRank, mais trie avec sort=ratingRank
// Le rang N est exactement à la position offset = N - 1
async function fetchByRank(rank) {
	if (!rank || rank < 1) return null;
	const offset = rank - 1;
	const res = await request(`/anime?sort=ratingRank&page[limit]=1&page[offset]=${offset}&include=categories`);
	if (!res || !res.data || res.data.length === 0) return null;
	return formatAnime(res.data[0], res.included);
}

// Liste des genres
async function fetchAvailableGenres() {
	const res = await request('/categories?page[limit]=40&sort=-totalMediaCount');
	if (!res || !res.data) return [];
	return res.data.map(cat => ({
		id: cat.attributes?.title || cat.attributes?.slug || cat.id
	}));
}

// Recherche par un genre
async function searchBySingleGenre(genreName, page = 1, size = 20) {
	const offset = (page - 1) * size;
	const res = await request(`/anime?filter[categories]=${encodeURIComponent(genreName.toLowerCase())}&page[limit]=${size}&page[offset]=${offset}&include=categories`);
	if (!res || !res.data) return { data: [] };
	return { data: res.data.map(item => formatAnime(item, res.included)) };
}

// Recherche par plusieurs genres
async function searchByMultipleGenres(genresNames, page = 1, size = 20) {
	const offset = (page - 1) * size;
	const query = genresNames.map(g => g.toLowerCase()).join(',');
	const res = await request(`/anime?filter[categories]=${encodeURIComponent(query)}&page[limit]=${size}&page[offset]=${offset}&include=categories`);
	if (!res || !res.data) return { data: [] };
	return { data: res.data.map(item => formatAnime(item, res.included)) };
}

export { 
	fetchByName, 
	fetchByID, 
	fetchByRank, 
	fetchAvailableGenres, 
	searchBySingleGenre, 
	searchByMultipleGenres
};
