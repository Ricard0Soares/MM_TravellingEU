function applyTheme() {
    var theme = document.getElementById("theme-select").value;

    if (theme === "dark") {
        document.body.style.backgroundImage = "url('images/teste1.jpg')";
    } else if (theme === "light") {
        document.body.style.backgroundImage = "url('images/teste2.jpg')";
    } else {
        document.body.style.backgroundImage = "url('images/background.png')";
    }

    var searchBar = document.querySelector(".search-bar");
    if (theme === "dark") {
        searchBar.style.borderColor = "#ffffff";
        searchBar.style.color = "#ffffff";
    } else {
        searchBar.style.borderColor = "#000000";
        searchBar.style.color = "#000000";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    applyTheme();
});

