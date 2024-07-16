function navigateToDestination(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    if(selectedOption =="Lisboa"){
        window.location.href = "home_lisboa.html";
    } else if(selectedOption == "Madrid"){
        window.location.href = "home_madrid.html";
    }else if(selectedOption == "Paris"){
        window.location.href = "home_paris.html";
    }else if(selectedOption == "Mosteiro dos Jerónimos"){
        window.location.href = "mosteiro.html";
    }else if(selectedOption == "Padrão dos Descobrimentos"){
        window.location.href = "padrao_descobrimentos.html";
    }else if(selectedOption == "Parque das Nações"){
        window.location.href = "parque_nacoes.html";
    }else if(selectedOption == "Torre de Belém"){
        window.location.href = "torre_belem.html";
    }
    
    else{
        alert("Destination not found!");
    }
}
