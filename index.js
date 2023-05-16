//aici avem ca un fel de #include

const express = require("express");
const path = require("path");
const fs = require("fs");

obGlobal = {
    erori: {}
}

app = express(); //construim practic app prin express(), de acolo ne luam metodele din express.js
app.set("view engine", "ejs"); //setam view engine ul sa fie EJS

app.use("/resurse", express.static(path.join(__dirname, "resurse"))); //ii aratam de unde sa ia toate resursele necesare pt afisarea site ului

app.listen(8080, function(){ // ii dam portul, dupa definim o functie anonima care sa faca ceva dupa ce incepe ascultarea din app.listen()
    console.log("A pornit aplicatia");
    console.log("FOLDERUL CURENT: ", __dirname);
    console.log("FISIERUL CURENT: ", __filename);
    console.log("FOLDERUL CURENT DE LUCRU: ", process.cwd());
    console.log("Aplicatia asculta pe portul:", this.address().port);
})

app.get("/test", function(req, res){ //ii spunem ca daca este accesata pagina /test, sa randeze test.ejs
    res.render("pagini/test.ejs");
})


function initErori(){ //functie pt initializarea erori.json
    let continut = fs.readFileSync(path.join(__dirname, "resurse", "json_files", "erori.json")).toString("utf8"); //Sync face citirea pe loc, cand pornim serverul,  transformam in string in formatul utf8
    // console.log(continut); //printam continutul
    let obJson = JSON.parse(continut); // //////   cum??   //////convertim string ul din JSON intr un obiect
    for(let eroare of obJson.info_erori){// folosim of pt avea referinta la fiecare obiect the tip eroare din array ul cu info_erori din erori.json
        eroare.imagine = obJson.cale_baza+"/"+eroare.imagine;
    }
    obGlobal.erori = obJson; // atribuim obiectului erori din obiectul global,  fisierul JSON transformat in obiect
    obJson.eroare_default.imagine = obJson.cale_baza+"/"+obJson.eroare_default.imagine; 
    // obJson.eroare_default.imagine = path.join(__dirname, obJson.cale_baza, obJson.eroare_default.imagine);
}

initErori();

function afisEroare(res, _identificator = -1, _titlu, _text, _imagine){ //primeste obiectul res, un identificator, titlu, text si imagine
    let vErori = obGlobal.erori.info_erori; //luam vectorul cu info erori si il bagam in vErori
    let eroare = vErori.find(function(element){  //functia function(element) returneaza adev sau fals, catre metoda find(). daca elementul curent pe care il itereaza are acelasi 
        //identificator cu cel pe care l a primit, atunci eroarea va fi atribuita variabilei eroare
        return element.identificator == _identificator;
    })
    if(eroare){ //daca a gasit eroarea in vectorul cu erori
        let titlu1 = _titlu || eroare.titlu; //atribuim fie _titlu daca a fost dat ca argument, iar daca nu, eroare.titlu, asta daca a vrut programatorul
                                            // sa schimbe titlul erorii
        let text1 = _text || eroare.text; //idem
        let imagine1 = _imagine || eroare.imagine; //idem
        if(eroare.status){ //daca avem statusul erorii
            res.status(_identificator).render("pagini/eroare", {titlu: titlu1, text: text1, imagine: imagine1}) //setam in res codul erorii ca fiind identificatorul primit
            //si randam pagina cu erori, oferind calea si un obiect care poate contine titlu, text si imagine
        }
        else{
            res.render("pagini/eroare", {titlu: titlu1, text: text1, imagine:imagine1}) //altfel doar randam eroarea default in caz ca nu avem status
        }
    }
    else{
        let errDefault = obGlobal.erori.eroare_default; //repetam ce am facut mai sus doar ca utilizam eroarea default
        let titlu1 = _titlu || errDefault.titlu;
        let text1 = _text || errDefault.text;
        let imagine1 = _imagine || errDefault.imagine;
        res.render("pagini/eroare", {titlu: titlu1, text: text1, imagine: imagine1})
    }
}


const correctHomePaths = ["/", "/index", "/home"];
app.get(correctHomePaths, function(req, res){
    res.render("pagini/index", {ip:req.ip});
    
})

app.get("/*", function(req, res){ //app.get primeste 2 argumente, calea din care porneste, iar functia este o functie callback care primeste req si res
    //care se afla in metoda get() din app; pe urma definim functia function(req, res) si spunem ce vrem sa facem cu obiectele req si res
    //pe care le primeste ca argumente
    res.render("pagini" + req.url, function(err, rezultatRandare){ //res.render primeste 2 argumente, folderul din views + numele paginii cerute
        //si o functie callback, care este chemata la finalul metodei render(), si primeste un obiect eroare si rezultat randare
        const correctHomePaths = ["/index", "/home"];//definesc un vector pt a folosi index si home pt a merge catre prima pagina
        console.log("Eroare", err);
        if(err){
                if(err.message.startsWith("Failed to lookup view")){
                   afisEroare(res, 404);
                }
                else{
                    afisEroare(res);
                }
        }
        else{ //daca nu avem eroare
           res.send(rezultatRandare); //trimitem catre client rezultatul randarii html a fisierului .ejs
        }
    });
})
