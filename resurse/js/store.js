window.onload = function(){
    document.getElementById("filters").addEventListener('input', function(){ //cand intervine o schimbare. 
        //daca vreau sa fie dupa buton, pot sa schimb id ul elementului si sa fac onclick 
        
        let val_nume = document.getElementById("i_text").value.toLowerCase(); //vedem ce se afla in casuta input text
        
        let val_pret = parseFloat(document.getElementById("i_range").value); //vedem care este pretul maxim selectat

        let val_publisher = document.getElementById("i_datalist").value.toLowerCase(); // vedem care este publisherul selectat
        
        //preluam datele din radio button uri

        let radioButtons = document.getElementsByName("gr_rad");
        let physical_copies;
        if(radioButtons[0].checked){
            physical_copies = false;
        } else {
            physical_copies = true;
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
        let produseAfisate = 0, produseMaxPePagina = 15, pagini = 0;
        if(document.getElementById("pagini")){ //daca avem pagini deja, sterge le afisarea
            document.getElementById("pagini").innerHTML = "";
        }
        for(let prod of products){ //iteram prin fiecare
           
            prod.style.display="none"; //facem sa nu fie afisate niciunul initial

            let numeProdus = prod.getElementsByClassName("val-name")[0].innerHTML.toLowerCase(); //luam numele produsului
            let cond1 = (numeProdus.includes(val_nume));

            let pretProdus = parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML);
            let cond2 = pretProdus <= val_pret;

            let publisherProdus = prod.getElementsByClassName("val-publisher")[0].innerHTML.toLowerCase();
            let cond3 = (publisherProdus == val_publisher) || val_publisher == "";
    
            let physical_copies_produs = prod.getElementsByClassName("val-copies")[0].innerHTML.toLowerCase();
            if(physical_copies_produs == "false"){
                physical_copies_produs = false;
            } else physical_copies_produs = true;
            let cond4 = false;
            if(!physical_copies){
                cond4 = true;
            } else {
                if(physical_copies_produs){
                    cond4 = true;
                }
            }

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
                produseAfisate++;
                prod.style.display = "block";
            }
            
        }
        if(produseAfisate == 0){
            if(document.getElementById("produse-zero")){
                document.getElementById("produse-zero").remove();
            }
            let element = document.createElement("p");
            element.id = "produse-zero"
            element.innerHTML = "No found products, maybe change the filters a bit!"
            let parentNode = document.getElementsByClassName("grid-store");
            parentNode[0].appendChild(element)
        } else {
            if(document.getElementById("produse-zero")){
                document.getElementById("produse-zero").remove();
            }
        }
        let displayedProducts = Array.from(products).filter(element => {
            let style = window.getComputedStyle(element);
            return style.display === "block";
        })
        makePages(produseAfisate, displayedProducts);
        
        if(document.getElementById("info-suma")){
            let suma = 0;
            for(let prod of products){
                console.log("PRODUSE");
                if(prod.style.display != "none"){
                    let pret = parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML);
                    console.log(pret);
                    suma+=pret;
                }
            }
            suma = suma.toFixed(2);
            document.getElementById("info-suma").innerHTML = "<b>Pret total produse afisate:</b>" + suma;
        }

    })

    document.getElementById("buton-resetare").onclick = () => resetFilters();
    document.addEventListener('beforeunload', resetFilters());

    function resetFilters(){
        document.getElementById("i_text").value = "";
        document.getElementById("i_range").innerHTML = " (0)";
        document.getElementById("i_rad0").checked = true;
        document.getElementById("allplatforms").checked = true;
        uncheckPlatforms();
        document.getElementById("i_textarea").value = "";
        document.getElementById("i_sel_simplu").value = 0;
        document.getElementById("i_sel_multiplu").value = "all";

        let products = document.getElementsByClassName("product");
        for(let prod of products){
            prod.style.display = "block";
        }
    }

    function sortare(semn){
        var products = document.getElementsByClassName("product");
        var v_products = Array.from(products);

        v_products.sort(function (a, b){
            let price_a = parseFloat(a.getElementsByClassName("val-price")[0].innerHTML);
            let price_b = parseFloat(b.getElementsByClassName("val-price")[0].innerHTML);
            if(price_a == price_b){
                let name_a = a.getElementsByClassName("val-name")[0].innerHTML;
                let name_b = b.getElementsByClassName("val-name")[0].innerHTML;
                return semn * name_a.localeCompare(name_b);
            }
            return (price_a-price_b) * semn;
        })

        for(let product of v_products){
            product.parentNode.appendChild(product); // luam parentNode care este gridul, si adaugam in el articolul la final. 
            //daca v_products sortat crescator, atunci primul va fi pus la final, al doilea la final, si tot asa
        }
    }
    document.getElementById("buton-sortare-crescator").onclick = () => sortare(1);
    document.getElementById("buton-sortare-descrescator").onclick = () => sortare(-1);

    window.onkeydown = function(e){
        if(e.key == "c" && e.altKey){
           
            if(document.getElementById("info-suma"))
                return;
            var products = document.getElementsByClassName("product");
            let suma = 0;
            for(let prod of products){
                if(prod.style.display != "none"){
                    let pret = parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML);
                    suma+=pret;
                }
            }

            suma = suma.toFixed(2);
            let p = document.createElement("p");
            p.innerHTML = "<b>Pret total produse afisate:</b>" + suma;
            p.id = "info-suma";
            p.style.display = "block";
            ps = document.getElementById("p-suma");
            container = ps.parentNode;
            frate = ps.nextElementSibling;
            container.insertBefore(p, frate);
            setTimeout(function(){
                let info = document.getElementById("info-suma");
                if(info)
                    info.remove();
            }, 5000)
        }
    }
    function makePages(produseAfisateDupaFiltrare, displayedProducts){
        
        var products = displayedProducts || document.getElementsByClassName("product");
        console.log(products);
        let produseAfisate = produseAfisateDupaFiltrare || products.length;

        let produseMaxPePagina = 15;

        pagini = Math.ceil(produseAfisate / produseMaxPePagina);

        for(let i = 0;  i < pagini; i++){
            let divPagini = document.getElementById("pagini");
            let pageNumber = document.createElement("p");

            pageNumber.innerHTML = i+1;
            pageNumber.onclick = () => {
                let clickedPage = parseInt(pageNumber.innerHTML);
                let calculationVar = (clickedPage-1) * produseMaxPePagina;
                let productsLength = products.length;
                for(let j = 0; j < productsLength; j++){
                    if(j < calculationVar || j > (clickedPage * produseMaxPePagina) - 1){
                        products[j].style.display = "none";
                    } else {
                        products[j].style.display = "block";
                    }
                }
            }
            divPagini.appendChild(pageNumber);
        }
    }
     makePages();
     
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
        let checkboxes = document.querySelectorAll("#platforms input");

        for(let checkboxToChange of checkboxes){
        //    checkboxToChange.checked = false
            if(checkboxToChange.id != "allplatforms"){
                checkboxToChange.checked = false;
            }
        }
    }
}
