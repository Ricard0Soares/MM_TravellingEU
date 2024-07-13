function navigateToCountry(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    if(selectedOption == "Lisboa"){

        var currentPath = window.location.pathname;
        var refPath;

        if(currentPath.includes("navLinks")){
            refPath = "../../home_lisboa.html";
        }else{
            refPath = "home_lisboa.html";
        }
        
        window.location.href = refPath;
    }


}