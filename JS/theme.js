const bChange = document.getElementById("theme-change");

if (sessionStorage.getItem("theme") === null) {
    sessionStorage.setItem("theme", "dark")
}

function setTheme() {
    if (sessionStorage.getItem("theme") == "light"){
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
    else if (sessionStorage.getItem("theme") == "dark") {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
}

setTheme();

function changeTheme(){
    if (sessionStorage.getItem("theme") == "light"){
        sessionStorage.setItem("theme", "dark");
    }
    else if (sessionStorage.getItem("theme") == "dark") {
        sessionStorage.setItem("theme", "light");
    }
    setTheme();
}

bChange.addEventListener('click', () => {
    changeTheme();
})
