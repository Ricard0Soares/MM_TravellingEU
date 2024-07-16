function navigateToCountry(){
    var input = document.querySelector(".search-bar");
    var selectedOption = input.value;
    var currentPath = window.location.pathname;
    var refPath;
    if(selectedOption == "Lisboa"){
        if(currentPath.includes("navLinks")){
            refPath = "../home_lisboa.html";
        }else{
            refPath = "home_lisboa.html";
        }
        
        window.location.href = refPath;

    } else if(selectedOption == "Madrid"){
        if(currentPath.includes("navLinks")){
            refPath = "../home_madrid.html";
        }else{
            refPath = "home_madrid.html";
        }
        
        window.location.href = refPath;

    }else if(selectedOption == "Paris"){
        if(currentPath.includes("navLinks")){
            refPath = "../home_paris.html";
        }else{
            refPath = "home_paris.html";
        }
        
        window.location.href = refPath;

    }else if(selectedOption == "Mosteiro dos Jerónimos"){
        if(currentPath.includes("navLinks")){
            refPath = "../mosteiro.html";
        }else{
            refPath = "mosteiro.html";
        }
        
        window.location.href = refPath;

    }else if(selectedOption == "Padrão dos Descobrimentos"){
        if(currentPath.includes("navLinks")){
            refPath = "../padrao_descobrimentos.html";
        }else{
            refPath = "padrao_descobrimentos.html";
        }
        
        window.location.href = refPath;

    }else if(selectedOption == "Parque das Nações"){
        if(currentPath.includes("navLinks")){
            refPath = "../parque_nacoes.html";
        }else{
            refPath = "parque_nacoes.html";
        }
        
        window.location.href = refPath;

    }else if(selectedOption == "Torre de Belém"){
        if(currentPath.includes("navLinks")){
            refPath = "../torre_belem.html";
        }else{
            refPath = "torre_belem.html";
        }
        
        window.location.href = refPath;
    }







}