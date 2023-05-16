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
    obGlobal.erori = obJson; // aici nu inteleg ce se intampla
}

initErori();

// function afisEroare(res, _identificator = -1,_titlu, _text, _imagine = "default"){
//     let vErori = obGlobal.erori.info_erori;
//     let eroare = vErori.find(function(element){
//         return element.identificator == _identificator
//     })
//     if(eroare){

//     }
// }

// afisEroare(res, 10, {_titlu: "a", _text:"b"})


app.get("/*", function(req, res){ //app.get primeste 2 argumente, calea din care porneste, iar functia este o functie callback care primeste req si res
    //care se afla in metoda get() din app; pe urma definim functia function(req, res) si spunem ce vrem sa facem cu obiectele req si res
    //pe care le primeste ca argumente
    res.render("pagini" + req.url, function(err, rezultatRandare){ //res.render primeste 2 argumente, folderul din views + numele paginii cerute
        //si o functie callback, care este chemata la finalul metodei render(), si primeste un obiect eroare si rezultat randare
        const correctHomePaths = ["/index", "/home"];//definesc un vector pt a folosi index si home pt a merge catre prima pagina
        console.log("Eroare", err);
        if(err){
            if(correctHomePaths.includes(req.url)){ //daca avem o eroare de pagina indexistenta dar cererea este index sau home
                res.render("pagini/index.ejs"); //afiseaza index.ejs
            }
            else{ //daca nu este index sau home, verificam daca incepe cu string ul acela
                if(err.message.startsWith("Failed to lookup view")){
                    res.status(404).send("EROARE!!!!");
                }
            }  
        }
        else{ //daca nu avem eroare
           res.send(rezultatRandare); //trimitem catre client rezultatul randarii html a fisierului .ejs
        }
    });
})
