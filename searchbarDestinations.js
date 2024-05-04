function navigateToCountry(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    if(selectedOption == "Portugal"){
        window.location.href = "cities_portugal.html";
    }
}