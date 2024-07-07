function navigateToDestination(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    if(selectedOption =="Lisboa"){
        window.location.href = "../screens/lisboa.html";
    }else{
        alert("Destination not found!");
    }
}
