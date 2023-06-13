//aici avem ca un fel de #include

const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const sass = require("sass");
const {Client} = require('pg');
const {Utilizator} = require('./resurse/js/module_proprii/utilizator.js');

const AccessBD = require("./resurse/js/module_proprii/accessbd.js")


// myUser = new Utilizator({
//     username: "euur12",
//     lastname: "stratulat",
//     firstname: "vladimir",
//     password: "parolamea",
//     rol: "common",
//     email: "vladimir_stratulat99@yahoo.com",
//     chat_color: "black",
//     picture: "nopic.png",
//     phone: "02255445"
// })
Utilizator.modificaUtilizator("dadada", {chat_color: "red",
            firstname: "schimbatde10ori"});

// AccessBD.getInstance().select(
//     {
//         tabel: "products",
//         campuri: ["name", "price"],
//         conditii: [["price > 50", "price < 70"], ["price < 30"]]},
//         function(err, rez){
//             console.log(err);
//             console.log(rez);
//         }
// )

obGlobal = {
    erori: {},
    obImagini: {},
    folderScss: path.join(__dirname, "resurse/scss_files"),
    folderCss: path.join(__dirname, "resurse/css_files"),
    folderBackup: path.join(__dirname, "backup"),
    optiuniMeniu: [],
    optiuniFiltre: []
}

app = express(); //construim practic app prin express(), de acolo ne luam metodele din express.js
app.set("view engine", "ejs"); //setam view engine ul sa fie EJS
const port = process.env.PORT || 8080;

app.listen(port, function(){ // ii dam portul, dupa definim o functie anonima care sa faca ceva dupa ce incepe ascultarea din app.listen()
    console.log("A pornit aplicatia");
    console.log("FOLDERUL CURENT: ", __dirname);
    console.log("FISIERUL CURENT: ", __filename);
    console.log("FOLDERUL CURENT DE LUCRU: ", process.cwd());
    console.log("Aplicatia asculta pe portul:", this.address().port);
})

app.use("/resurse", express.static(path.join(__dirname, "resurse"))); //ii aratam de unde sa ia toate resursele necesare pt afisarea site ului
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/*", function(req, res, next){ //incearca astea cu use sa fie inainte de toate app.get
    res.locals.optiuniMeniu = obGlobal.optiuniMeniu;
    next();
})

var client = new Client({database:"SPARKLE",
    user: "vladimir",
    password: "vladimir",
    host: "localhost",
    port: 5432});

    client.connect();

    client.query("select * from unnest(enum_range(null::categ_produs))", function(err, rezCategorie){
        if (err){
            console.log(err);
        }
        else{
            obGlobal.optiuniMeniu=rezCategorie.rows;
        }
    });
    
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

function initImagini(){
    var continut = fs.readFileSync(__dirname + "/resurse/json_files/galerie.json").toString("utf-8"); //citim fisierul JSON, si il transformam cu toString in format citibil

    obGlobal.obImagini = JSON.parse(continut); //transformam intr un obiect fisierul Json, si il bagam in obImagini
    let vImagini = obGlobal.obImagini.imagini; //vectorul cu imagini este creat, cu ajutorul vectorului imagini din JSON

    let caleAbs = path.join(__dirname, obGlobal.obImagini.cale_galerie); //aflam calea absoluta a galeriei
    let caleAbsMediu = path.join(__dirname, obGlobal.obImagini.cale_galerie, "mediu"); //calea absoluta a pozelor pt ecran mediu
    let caleAbsMic = path.join(__dirname, obGlobal.obImagini.cale_galerie, "mic"); //idem mic
    
    if(!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);
    if(!fs.existsSync(caleAbsMic))
        fs.mkdirSync(caleAbsMic);

    for(let imag of vImagini){ //iteram prin fiecare imagine a vectorului cu imagini
        [numeFis, ext] = path.basename(imag.cale_fisier).split("."); //scoatem extensia pt a avea numele fisierului

        let caleFisAbs = path.join(caleAbs, imag.cale_fisier); //facem rost de calea imaginilor mari
        let caleFisMediuAbs = path.join(caleAbsMediu, numeFis+".webp"); //facem rost de calea imaginilor medii
        let caleFisMicAbs = path.join(caleAbsMic, numeFis + ".webp");
        //astea de mai sus le am creat pt sharp
        if(!/^imagine/.test(path.basename(caleFisAbs))){ //verificam sa nu bage si imaginile pt galeria animata
            sharp(caleFisAbs).resize(350).toFile(caleFisMediuAbs); //facem resize cu width the 350px si il transformam in fisierul rezultat din caleFisMediuAbs
            sharp(caleFisAbs).resize(250).toFile(caleFisMicAbs);
        }
       

        imag.cale_fisier_mic = path.join("/", obGlobal.obImagini.cale_galerie, "mic", numeFis + "webp");
        imag.cale_fisier_mediu = path.join("/", obGlobal.obImagini.cale_galerie, "mediu", numeFis + ".webp"); //cream calea relativa a imaginii medii
        imag.cale_fisier = path.join("/", obGlobal.obImagini.cale_galerie, imag.cale_fisier); //cale relativa a imaginii normale
    }

}

initImagini();

const foldersForCreation = ["temp"];
for(let folder of foldersForCreation){
    let cale = path.join(__dirname, "resurse", folder);
    if(!fs.existsSync(cale)){
        fs.mkdirSync(cale);
    }
}
let caleBackup = path.join(obGlobal.folderBackup, "resurse/css_files"); //facem un folder de backup cu fostele variante ale fisierelor css
if(!fs.existsSync(caleBackup)) {        
    fs.mkdirSync(caleBackup, {recursive: true});
}

function compileazaScss(caleScss, caleCss){ //functie pt compilare automata scss files
    if(!caleCss){
        let numeFisExt = path.basename(caleScss); //luam numele fisierului din cale
        let numeFis = numeFisExt.split(".")[0]; //facem rost de numele fisierului fara extensie
        caleCss = numeFis+".css"; //facem rost de calea catre fisierului care va fi .css, ii adaugam extensia
    }

    if(!path.isAbsolute(caleScss)) //daca nu e cale absoluta, atunci ii dam calea unde stim ca avem scss_files
        caleScss = path.join(obGlobal.folderScss, caleScss);
    
    if(!path.isAbsolute(caleCss)) //idem pt css
        caleCss = path.join(obGlobal.folderCss, caleCss);    
    
    let vFisiereBackup = fs.readdirSync(caleBackup);

    if(vFisiereBackup.length < vFisiere.length){ //daca nr de fisiere e mai mic la start decat numarul de fisiere scss, atunci creeaza, altfel nu (pt ca vreau sa faca backup doar in fs.watch();
        createBackupCss(caleScss);
    }

    let rez = sass.compile(caleScss, {"sourceMap": true}); //compilam 
    fs.writeFileSync(caleCss, rez.css) //punem fisierul in folderul cu css
}

function createBackupCss(caleScss){ //functie pt a face backup
    let numeFisExt = path.basename(caleScss);
    let numeFis = numeFisExt.split(".")[0];
    let caleCss = numeFis + ".css";
    caleCss = path.join(obGlobal.folderCss, caleCss);
    let numeFisCss = path.basename(caleCss).split(".")[0]; //luam calea fisierului css
    if(fs.existsSync(caleCss)){
        let currentTime = new Date().getTime();
        numeFisCss+= "_" + currentTime + ".css"; //cream cu timestamp
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup, "resurse/css_files", numeFisCss)) //punem fosta varianta a css ului in folderul de backup
    }
}

vFisiere = fs.readdirSync(obGlobal.folderScss);
for(let numeFis of vFisiere){
    if(path.extname(numeFis) == ".scss"){
        compileazaScss(numeFis); 
    }
}

fs.watch(obGlobal.folderScss, function(eveniment, numeFis){//ne uitam continuu si cautam modificari a fisierelor scss, pt a fi recompilate
    console.log("EVENIMENT: ", eveniment);
    console.log("NUME FIS: ", numeFis);
    if(eveniment == "change" || eveniment == "rename"){
        let caleCompleta = path.join(obGlobal.folderScss, numeFis);
        console.log(caleCompleta);
        if(fs.existsSync(caleCompleta)){
            try{
                createBackupCss(caleCompleta); // in caz ca incearca sa faca backup sau sa compileze cand inca nu am terminat fisierul de editat si e serverul pornit, vreau sa prinda eroarea la compilare
                compileazaScss(caleCompleta);
            }
            catch(e){
                console.log("AM PRINS EROARE LA COMPILAREA SASS!");
            }
           
        }
    }
});
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





// *********************PRODUSE********************* //

function creeazaOptiuniFiltre(){

    client.query("select MIN(price) from products", function(err, rezPretMin){
        if(err){
            console.log(err);
        } else {
            obGlobal.optiuniFiltre.pretMinim = rezPretMin.rows[0].min;
        }
    })
    client.query("select MAX(price) from products", function(err, rezPretMax){
        if(err){
            console.log(err);
        } else {
            obGlobal.optiuniFiltre.pretMaxim = parseInt(rezPretMax.rows[0].max);
        }
    })
    client.query("select distinct publisher from products", function(err, rezPublisher){
        createOptiuniFiltre(err, rezPublisher, "publishers")
    })
    client.query("select distinct unnest(platform) AS platform from products", function(err, rezPlatform){
        createOptiuniFiltre(err, rezPlatform, "platforms")
    })
    client.query("select * from unnest(enum_range(null::age_restriction)) as restrictie", function(err, rezRestrictie){
        createOptiuniFiltre(err, rezRestrictie, "restrictions")
    })
    client.query("select distinct unnest(genres) AS genre from products", function(err, rezGenuri){
        createOptiuniFiltre(err, rezGenuri, "genres")
    })
    client.query("select distinct physical_copies as valabil from products", function(err, rezFizice){
        createOptiuniFiltre(err, rezFizice, "fizic")
    })
}

creeazaOptiuniFiltre();

function createOptiuniFiltre(err, rezQuery, type){
    if(err){
        console.log(err);
    } else {
        obGlobal.optiuniFiltre[type] = rezQuery.rows;
    }
}

app.get("/store", function(req, res){    
        client.query("select * from unnest(enum_range(null::categ_produs))", function(err, rezCategorie){
            if(err){
                console.log(err);
            } else {
                let restComanda = "where 1 = 1";
                if(req.query.category){
                    restComanda += ` and category = '${req.query.category}'`
                }
                client.query(`select * from products ${restComanda}`, function(err, rez){
                    if(err){
                        afisEroare(res);
                    }
                    else {
                        res.render("pagini/store", {products: rez.rows, optiuniMeniu: rezCategorie.rows, optiuniFiltre: obGlobal.optiuniFiltre});
                    }
                })
                }
        })
})


app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname, "resurse/ico/favicon.ico"));
})

app.get("/product/:id", function(req, res){
    client.query(`select * from products where product_id = ${req.params.id}`, function(err, rez){
        res.render("pagini/product", {product: rez.rows[0]});
    })
})



const correctHomePaths = ["/", "/index", "/home"];
app.get(correctHomePaths, function(req, res){
    res.render("pagini/index", {ip:req.ip, imagini:obGlobal.obImagini.imagini}); //la randare ii dam niste obiecte pe care sa le poata accesa, IP ul si imaginile
    
})



app.get("/test", function(req, res){ //ii spunem ca daca este accesata pagina /test, sa randeze test.ejs
    res.render("pagini/test.ejs");
})

app.get("/gallery", function(req, res){
    res.render("pagini/gallery", {imagini:obGlobal.obImagini.imagini}); //la randare ii dam niste obiecte pe care sa le poata accesa
    
})


app.get("/*.ejs", function(req, res){ //in caz ca se incearca a accesa un EJS, da i eroare
    afisEroare(res, 400);
})


app.get("/*", function(req, res){ //app.get primeste 2 argumente, calea din care porneste, iar functia este o functie callback care primeste req si res
    //care se afla in metoda get() din app; pe urma definim functia function(req, res) si spunem ce vrem sa facem cu obiectele req si res
    //pe care le primeste ca argumente

    if(req.url.match(/^\/resurse(\/[a-zA-Z0-9]*)*\/?/g)){
        afisEroare(res, 403);
    }

    try{
            res.render("pagini" + req.url, function(err, rezultatRandare){ //res.render primeste 2 argumente, folderul din views + numele paginii cerute
            //si o functie callback, care este chemata la finalul metodei render(), si primeste un obiect eroare si rezultat randare
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
    } catch(e){
                if(e.message.startsWith("Cannot find module")){
                    afisEroare(res, 404);
                }
                else{
                    afisEroare(res);
                }
    }
})
