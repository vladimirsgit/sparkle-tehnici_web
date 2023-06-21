function setCookie(nume, val, timpExpirare){
    d = new Date();
    d.setTime(d.getTime() + timpExpirare);
    
    if(!(getCookie(nume) == "true")){
        document.cookie=`${nume}=${val}; expires=${d.toUTCString()}; path=/`;
    }

}

function getCookie(nume){
    vectorParametri = document.cookie.split(";");

    for(let param of vectorParametri){

        if(param.trim().startsWith(nume+"=")){
            return param.split("=")[1];
        }
    }
    return null;
}

function deleteCookie(nume){
    document.cookie = `${nume}=0; expires=${(new Date()).toUTCString()}`;
}


function deleteAllCookies(){
    vectorParametri = document.cookie.split(";");
    for(let param of vectorParametri){
       paramSplitted = param.split("=");
       deleteCookie(paramSplitted[0]);
    }
}

window.addEventListener("DOMContentLoaded", function(){
    if(getCookie("ok-cookies")){
        this.document.getElementById("cookies-banner").style.display = "none";
        addLastSeenProductCookie();
        displayLastSeenProductInUserStats();
    }

    this.document.getElementById("ok-cookies").onclick = () => {
        setCookie("ok-cookies", true, 2629800000);
        this.document.getElementById("cookies-banner").style.display = "none";
    }
    this.document.getElementById("delete-cookies").onclick = () => {
        deleteAllCookies();
    }
    
   
}) 


function addLastSeenProductCookie(){
    let currentLocation = window.location.href;

    let productURL = "http://localhost:8080/product/";
    if(currentLocation.startsWith(productURL)){
        let product = document.getElementsByClassName("name")[0];

        let currentLocationSplit = currentLocation.split("/");
        let pID = currentLocationSplit[currentLocationSplit.length - 1];
        setCookie("seenProdID", pID, 2629800000);
        setCookie("seenProdName", product.innerHTML, 2629800000);
    }
}

function displayLastSeenProductInUserStats(){
    let divLastSeenProd = document.getElementById("last-seen-product");
   
    if(divLastSeenProd && getCookie("seenProdName")){
        let showingProductData = document.createElement("p");
        showingProductData.innerHTML = "Last seen product: \"" + getCookie("seenProdName") + "\"";
        showingProductData.onclick = () => {
            window.location.href = "http://localhost:8080/product/" + getCookie("seenProdID");
        }
        showingProductData.style.cursor = "pointer";
        divLastSeenProd.appendChild(showingProductData);

    }
}
