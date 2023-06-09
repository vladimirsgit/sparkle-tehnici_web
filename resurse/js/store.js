window.onload = function(){
    document.getElementById("buton-filtrare").onclick = function(){ //cand apasam pe butonul de filtrare
        
        let val_nume = document.getElementById("i_text").value.toLowerCase(); //vedem ce se afla in casuta input text
        
        let val_pret = parseFloat(document.getElementById("i_range").value); //vedem care este pretul maxim selectat

        let val_publisher = document.getElementById("i_datalist").value.toLowerCase(); // vedem care este publisherul selectat
        
        //preluam datele din radio button uri

        let radioButtons = document.getElementsByName("gr_rad");
        let val_copies = "";
        for(let rad of radioButtons){
            if(rad.checked){
                val_copies = rad.value;
                break;
            }
        }
        
        //preluam datele din checkboxuri

        let checkboxes = document.getElementsByName("gr_chck_platforms");
        let platformeSelectate = [];
        for(let ch of checkboxes){
            if(ch.checked){
                if(ch.id == "allplatforms"){ 
                    platformeSelectate.push(ch.value);
                   
                    break;
                } else {
                    platformeSelectate.push(ch.value)
                }
            }
        }

        //preluam keywords din descrierea jocului
        let val_descriere = document.getElementById("i_textarea").value;
        
        let keywords = val_descriere.split(",");

        for(let i = 0; i < keywords.length; i++){
            keywords[i] = keywords[i].trim().toLowerCase();
        }

        let val_age_restriction = parseInt( document.getElementById("i_sel_simplu").value); //preluam age restrictionul selectat
        
        //preluam genurile selectate
        let optiuniGenres = document.getElementById("i_sel_multiplu").options;
        let selectedGenres = [];
        for(let option of optiuniGenres){
            if(option.selected){
                selectedGenres.push(option.value)
                if(selectedGenres[0] == "all"){
                    break;
                }
            }
        }
        
        

        var products = document.getElementsByClassName("product"); //selectam toate produsele din pagina
        for(let prod of products){ //iteram prin fiecare
            prod.style.display="none"; //facem sa nu fie afisate niciunul initial

            let numeProdus = prod.getElementsByClassName("val-name")[0].innerHTML.toLowerCase(); //luam numele produsului
            let cond1 = (numeProdus.includes(val_nume));

            let pretProdus = parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML);
            let cond2 = pretProdus <= val_pret;

            let publisherProdus = prod.getElementsByClassName("val-publisher")[0].innerHTML.toLowerCase();
            let cond3 = (publisherProdus == val_publisher) || val_publisher == "";
    
            let physical_copies_produs = prod.getElementsByClassName("val-copies")[0].innerHTML.toLowerCase();
            let cond4 = physical_copies_produs == val_copies;

            let platformsProdus = prod.getElementsByClassName("val-platforms")[0].innerHTML;
            let cond5 = false || platformeSelectate.length == 0 || platformeSelectate[0] == "all";
            if(!cond5){
                for(let platforma of platformeSelectate){
                    if(platformsProdus.includes(platforma)){
                        cond5 = true;
                        break;
                    }
                }
            }

            let descriereProdus = prod.getElementsByClassName("val-description")[0].innerHTML.toLowerCase();
            let cond6 = false;
            for(let keyword of keywords){
                if(descriereProdus.includes(keyword)){
                    cond6 = true;
                    break;
                }
            }
            
            let restrictieProdus = parseInt(prod.getElementsByClassName("val-age-restriction")[0].innerHTML);
            let cond7 = restrictieProdus >= val_age_restriction;

            let genuriProdus = prod.getElementsByClassName("val-genres")[0].innerHTML;
            let cond8 = false || selectedGenres.length == 0 || selectedGenres[0] == "all";
            if(!cond8){
                for(let genre of selectedGenres){
                    if(genuriProdus.includes(genre)){
                        cond8 = true;
                        break;
                    }
                }
    
            }
            if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                prod.style.display = "block";
            }

           
            
        }
    }

    // var input = document.getElementById("i_text");
    // input.addEventListener('input', function(){
    //     let val_nume = document.getElementById("i_text").value.toLowerCase(); //vedem ce se afla in casuta input text
        
    //     var products = document.getElementsByClassName("product"); //selectam toate produsele din pagina
    //     for(let prod of products){ //iteram prin fiecare
    //         prod.style.display="none"; //facem sa nu fie afisate niciunul initial

    //         let numeProdus = prod.getElementsByClassName("val-name")[0].innerHTML.toLowerCase(); //luam numele produsului

    //         let cond1 = (numeProdus.includes(val_nume));

    //        if(cond1){
    //         prod.style.display="block";
    //        }
            
    //     }
    // })
}


document.getElementById("i_range").onchange=function(){
    document.getElementById("infoRange").innerHTML = ` (${this.value})`;
}

document.getElementById("i_range").addEventListener('mousedown', function(){
    document.getElementById("i_range").addEventListener('mousemove', function(){
        document.getElementById("infoRange").innerHTML = ` (${this.value})`;
    })
})

function toggleFilters(){
    var filters = document.querySelectorAll('#filters > :nth-child(n+3)');
    filters.forEach(function(filter){
        var display = window.getComputedStyle(filter).display;
        if(display === "none"){
            filter.style.display = "block";
        } else {
            filter.style.display = "none";
        }
    })
}

function uncheckPlatforms(){
    let checkbox = document.getElementById("allplatforms");
    
    if(checkbox.checked){
        console.log(checkbox.checked);
        let checkboxes = document.querySelectorAll("#platforms input");

        for(let checkboxToChange of checkboxes){
        //    checkboxToChange.checked = false;
            console.log(checkboxToChange);
            if(checkboxToChange.id != "allplatforms"){
                checkboxToChange.checked = false;
            }
        }
    }
}
