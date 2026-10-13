const apiKey = sessionStorage.getItem("api_key");

if (!apiKey) {
    window.location.href = "../index.html";
}