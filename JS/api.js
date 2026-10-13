function showRateLimitAlert() {
	if (typeof document === "undefined") return;

	let targetContainer = document.getElementById("api-rate-limit-alert");

	if (!targetContainer) {
		targetContainer = document.createElement("div");
		targetContainer.id = "api-rate-limit-alert";
		const parent = document.querySelector("main") || document.body;
		if (parent) parent.prepend(targetContainer);
	}

	targetContainer.className = "alert alert-warning alert-dismissible fade show container my-3 text-center";
	targetContainer.setAttribute("role", "alert");
	targetContainer.innerHTML = `
		<strong>Rate limit exceeded (Error 429) !</strong> 
		Your RapidAPI key has exceeded the daily limit of 30 requests per day.
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	`;
}

function updateRemainingRequests(remaining, resetTimer) {
	sessionStorage.setItem("remaining-requests", remaining);
	sessionStorage.setItem("reset-timer", resetTimer);
}
function getRemainingRequests() {
	return sessionStorage.getItem("remaining-requests") || 30;
}
function getResetTimer() {
	return sessionStorage.getItem("reset-timer") || 0;
}

// Stack overflow
function toShortTime(secs) {
	if (!secs || isNaN(secs)) return "";
	let t = new Date();
	t.setSeconds(Number(secs));
	return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateRemainingRequestsDisplay() {
	const remainingRequests = getRemainingRequests();
	const remainingRequestsElement = document.getElementById("remaining-requests");
	if (remainingRequestsElement) {
		remainingRequestsElement.textContent = remainingRequests;
	}

	const resetTimer = getResetTimer();
	const resetTimerElement = document.getElementById("reset-timer");
	if (resetTimerElement) {
		resetTimerElement.textContent = toShortTime(resetTimer);
	}
}

// when the page is loaded, update the display of remaining requests
window.onload = function () {
	updateRemainingRequestsDisplay();
}
async function request(endpoint, api_key_to_test) {
	let apiKeyToUse;
	if (api_key_to_test) {
		apiKeyToUse = api_key_to_test;
	}
	else {
		let userApiKey = window.sessionStorage.getItem('api_key');
		apiKeyToUse = userApiKey;
	}
	const url = `https://anime-db.p.rapidapi.com${endpoint}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': apiKeyToUse,
			'x-rapidapi-host': 'anime-db.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			if (response.status === 429) {
				showRateLimitAlert();
			} else {
				console.error(`HTTP Error ${response.status}: ${response.statusText}`);
			}
			return null;
		}

		let remaining = response.headers.get('x-ratelimit-requests-remaining');
		let resetTimer = response.headers.get('x-ratelimit-rapid-free-plans-hard-limit-reset');

		updateRemainingRequests(remaining, resetTimer);
		updateRemainingRequestsDisplay();

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

async function fetchAvailableGenresWithApiTestKey(api_key) {
	return await request('/genre', api_key);
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


export { fetchByName, fetchByID, fetchByRank, fetchAvailableGenres, searchBySingleGenre, searchByMultipleGenres, fetchAvailableGenresWithApiTestKey };