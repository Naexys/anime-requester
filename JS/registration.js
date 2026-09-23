const inputAPI = document.getElementById("input_api");
const button_go = document.getElementById("go");

button_go.addEventListener('click', () => {
    // check api key (not empty, ...)
    // TODO
    // store in sessionStorage
    let apiKey = inputAPI.value;
    sessionStorage.setItem("api_key", apiKey);
    // go to home.html
    window.location.href = "home.html";
});