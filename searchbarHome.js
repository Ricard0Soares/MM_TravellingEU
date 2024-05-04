function navigateToDestination(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    if(selectedOption =="Lisboa"){
        window.location.href = "lisboa.html";
    }
}