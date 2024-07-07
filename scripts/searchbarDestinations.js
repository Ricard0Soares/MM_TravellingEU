function navigateToCountry(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    if(selectedOption == "Portugal"){

        var currentPath = window.location.pathname;
        var refPath;

        if(currentPath.includes("navLinks")){
            refPath = "../../cities_portugal.html";
        }else{
            refPath = "cities_portugal.html";
        }
        
        window.location.href = refPath;
    }


}