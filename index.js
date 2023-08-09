//aici avem ca un fel de #include

const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const sass = require("sass");
const {Client} = require("pg");
const formidable = require("formidable");
const session = require("express-session");
const helmet = require("helmet")
const {Utilizator} = require('./resurse/js/module_proprii/utilizator.js');
const Drepturi = require('./resurse/js/module_proprii/drepturi.js');
const {RolFactory, RolAdmin, RolModerator, RolClient} = require('./resurse/js/module_proprii/roluri.js')
const AccessBD = require("./resurse/js/module_proprii/accessbd.js");
const utilizator = require("./resurse/js/module_proprii/utilizator.js");

const targetUrl = 'http://localhost:8080';
const numberofReq = 1000;


// Utilizator.cautaAsync({username: "facutieri"}).then(rows => {
//     console.log(rows);
// }).catch(e => {
//     console.error(e)
// })

// async function myFunction(){
//     try{
//         let rows = await Utilizator.cautaAsync({username: "lalal"});
//         console.log(rows);
//     } catch (e) {
//         console.error(e);
//     }
// }
// myFunction();
// myUser = new Utilizator({
//     username: "facutieri",
//     lastname: "stratulat",
//     firstname: "vladimir",
//     password: "parolamea",
//     rol: "common",
//     email: "vladimir_stratulat99@yahoo.com",
//     chat_color: "black",
//     picture: "nopic.png",
//     phone: "02255445"
// })


// myUser.salvareUtilizator()
// Utilizator.stergeUtilizator("facutAcum");

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

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}))
app.use("/resurse", express.static(path.join(__dirname, "resurse"))); //ii aratam de unde sa ia toate resursele necesare pt afisarea site ului
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/*", function(req, res, next){ //incearca astea cu use sa fie inainte de toate app.get
    res.locals.optiuniMeniu = obGlobal.optiuniMeniu;
    res.locals.Drepturi = Drepturi;

    if(req.session.utilizator){
        req.utilizator = res.locals.utilizator = new Utilizator(req.session.utilizator);
    }
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

// ******************************** SECURITATE ******************************** // 

var ipuriActive = {};
var nrAccesari = {};

app.use(helmet.frameguard({ action: 'deny' })); //evitam deschiderea in iframe

app.all("/*", function(req, res, next){ //protectie impotriva DDOS
   
   
    if((nrAccesari[req.ip] > 15) && (Math.floor(new Date().getTime() / 1000) - ipuriActive[req.ip]) < 11){
        return;
    }
    if(ipuriActive[req.ip] == null){
        nrAccesari[req.ip] = 1;
        ipuriActive[req.ip] = Math.floor(new Date().getTime() / 1000);
       
    } else {
        if((Math.floor(new Date().getTime() / 1000) - ipuriActive[req.ip]) < 11){
            nrAccesari[req.ip]+=1;
            if(nrAccesari[req.ip] > 15){
                afisEroare(res, 429);
                return;
            }
        } else {
            nrAccesari[req.ip] = 0;
            ipuriActive[req.ip] = null;
            
        }
        
    }
    next();

})

// function escapeData(dirtyText){
//     return dirtyText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
// }
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
    let sir = req.session.mesajLogin;
    req.session.mesajLogin = null;
    res.render("pagini/index", {ip:req.ip, imagini:obGlobal.obImagini.imagini, mesajLogin: sir, servertime: new Date().toLocaleTimeString()}); //la randare ii dam niste obiecte pe care sa le poata accesa, IP ul si imaginile
    
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



// ************* INREGISTRARE *********************//

app.post("/inregistrare", function(req, res){
    var username;
    var picture;
    var originalFilenamePropriu;
    var formular = new formidable.IncomingForm();
    formular.parse(req, async function(err, campuriText, campuriFisier){
        username = campuriText.username;
        let lastname = campuriText.lastname;
        let firstname = campuriText.firstname;
        let password = campuriText.password;
        let retypedPassword = campuriText.retypedPassword;
        let email = campuriText.email;
        let phone = campuriText.tel;
        let chat_color = campuriText.culoare_chat;
        let birth_date = campuriText.bday;
        let regExUsername = /^[A-Za-z0-9#_.]{3,49}$/;
        let regExName = /^[A-Za-z]{1,100}$/;
        let regExEmail = /^[A-Za-z0-9#_.-]+@[A-Za-z0-9-]+\.com$/;
        let regExPhone = /^[+]?0[0-9]{9,20}$/;

       if(!validateField(regExUsername, username)){
            res.render("pagini/inregistrare", {raspuns: "Invalid username!"});
       } else if((!validateField(regExName, lastname)) || (!validateField(regExName, firstname))){
        res.render("pagini/inregistrare", {raspuns: "Invalid name!"});
       } else if(password != retypedPassword){
        res.render("pagini/inregistrare", {raspuns: "Passwords do not match!"});
       } else if(!validateField(regExEmail, email)){
        res.render("pagini/inregistrare", {raspuns: "Invalid email address!"});
       } else if(!validateField(regExPhone, phone)){
        res.render("pagini/inregistrare", {raspuns: "Invalid phone number!"});
       } else if(birth_date == null || birth_date == undefined || birth_date == ""){
            res.render("pagini/inregistrare", {raspuns: "Please fill out the birth date field! Of course we also check on the server-side..."});
        }
        else {
            let pictureSplit = picture.split("."); //verificam pt extensii multiple sau extensii neacceptate
            let acceptedExtensions = ['.jpeg', '.jpg', '.png']
            picture = "poza_" + username + path.extname(picture);
            if(pictureSplit.length > 2 || !acceptedExtensions.includes(path.extname(picture))){
                picture = '';
            } 
            
            utilizNou = new Utilizator({username: username, lastname: lastname, 
            firstname: firstname, password: password, email: email, chat_color: chat_color, phone: phone, picture: path.join("poze_uploadate", username, picture).split(path.sep).join('/'), birth_date: birth_date});
           if(await checkIfOkToCreateUser(username)){
           
            if(picture == null || picture == ''){
                utilizNou.picture = 'null';
            }
           
            utilizNou.salvareUtilizator();
          
            
            let folderUser = path.join(__dirname, "resurse", "poze_uploadate", username);
            if(!fs.existsSync(folderUser)){
                fs.mkdirSync(folderUser, {recursive: true});
            }
                if(picture){
                  
                 fs.renameSync(path.join(__dirname, "temp", originalFilenamePropriu), path.join(folderUser, "poza_" + username + path.extname(picture)));
                } else {
                    fs.renameSync(path.join(__dirname, "temp", originalFilenamePropriu), path.join(__dirname,  "temp"))
                }
            res.render("pagini/inregistrare", {raspuns: "You have sucessfully registered!"})
           
           } else {
                if(picture){
                    fs.unlinkSync(path.join(__dirname, "temp", picture))
                }
            
                res.render("pagini/inregistrare", {raspuns: "Username taken!"});
           }
       }
        
    })
    formular.on("field", function(nume, val){
        // console.log(`NUME CAMP: ${nume}\nVALOARE CAMP: ${val}`);
        if(nume == "username")
            username = val;
    })

    formular.on("fileBegin", function(nume, fisier){
        let tempFolder = path.join(__dirname, "temp");
        
        if(!fs.existsSync(tempFolder)){
            fs.mkdirSync(tempFolder);
        }
        if(fisier.originalFilename.includes("../")){ //protectie impotriva traversal
            fisier.originalFilename.replace("../", "");    
        } else if(fisier.originalFilename.includes("%2E")){
            fisier.originalFilename.replace("%2E", "");    
        } else if(fisier.originalFilename.includes("%2F")){
            fisier.originalFilename.replace("%2F", "");    
        }
        
        fisier.filepath = path.join(tempFolder, fisier.originalFilename);
        picture = fisier.originalFilename;
        originalFilenamePropriu = fisier.originalFilename;
        //AICI PICTURE ESTE NUMELE FISIERULUI UPLOADAT
        
    })
})

function validateField(regEx, fieldData){
    return regEx.test(fieldData) && (fieldData != "");
}

async function checkIfOkToCreateUser(username){
    let user = await Utilizator.getUtilizDupaUsernameAsync(username);
    return user == null;
}


// ************* CONFIRMARE MAIL *********************//

app.get("/cod_mail/:token/:username", function(req, res){
    try {
        Utilizator.getUtilizDupaUsername(req.params.username, {res:res, token: req.params.token}, function(u, obparam){
            AccessBD.getInstance().updateParametrizat(
                {tabel: "users", 
                campuri: ["confirmed_email"],
                valori: ["true"],
                campuriConditii: [["code"]],
                valoriConditii: [obparam.token]},
                                            function(err, rezUpdate){
                                                if(err || rezUpdate.rowCount == 0){
                                                    afisEroare(res, 404);
                                                } else {
                                                    res.render("pagini/confirmare")
                                                }
                                            })
        })
    } catch (e){
        afisEroare(res, 404);
    }
})


// ************* LOGIN USERPROFILE LOGOUT *********************//


app.post("/login", function(req, res){
    var username;
    var formular = new formidable.IncomingForm();
    formular.parse(req, function(err, campuriText, campuriFisier){
        Utilizator.getUtilizDupaUsername(campuriText.username, {
            req: req,
            res:res,
            password: campuriText.password
        }, function(u, obparam){
            
            let parolaCriptata = Utilizator.criptareParola(obparam.password);
            
            if(obparam.password && u && u.password == parolaCriptata && u.confirmed_email){
                u.picture = u.picture ? u.picture : "";
                obparam.req.session.utilizator = u;
                console.log("LOGARE CU SUCCES");
                obparam.req.session.mesajLogin = u.username + ", you are logged in! Good job!";
                obparam.res.redirect("/index");
            } else {
                console.log("NU A MERS");
                obparam.req.session.mesajLogin = "Oops... try again!";
                obparam.res.redirect("/index");
            }
        })
    })
})


app.post("/profil", function(req, res){
    if(!req.session.utilizator){
       
        afisEroare(res, 403);
        res.render("pagini/eroare", {text: "You are not logged in!"});
        return;
    }
    var formular = new formidable.IncomingForm();
    formular.parse(req, function(err, campuriText, campuriFisier){
        
        var parolaCriptata = Utilizator.criptareParola(campuriText.password);
      
        var picture;
        if(campuriFisier.picture.originalFilename == ''){
            picture = req.session.utilizator.picture;
        } else picture =  path.join("poze_uploadate", campuriText.username, campuriFisier.picture.originalFilename).split(path.sep).join('/');
        
        fs.rename(campuriFisier.picture.filepath, path.join(__dirname, "resurse", picture), function(err){});
        var parolaSchimbata;
        if(campuriText.newpassword == campuriText.retypednewpassword){
           
            if(campuriText.newpassword != '' && campuriText.retypednewpassword != ''){
                parolaSchimbata = Utilizator.criptareParola(campuriText.newpassword);
            }
            else parolaSchimbata = parolaCriptata;
        } else parolaSchimbata = parolaCriptata;
          
            console.log(campuriText);
        AccessBD.getInstance().updateParametrizat({tabel: "users", campuri: ["lastname", "firstname", "email", "chat_color", "picture", "password"], 
        valori: [campuriText.lastname, campuriText.firstname, campuriText.email, campuriText.culoare_chat, picture, parolaSchimbata],
    campuriConditii: [["password", "username"]], valoriConditii: [parolaCriptata, campuriText.username]}, function(err, rez){
        if(err){
            console.log(err);
            afisEroare(res, 404);
            return;
        } if(rez.rowCount == 0){
            res.render("pagini/profil", {mesaj: "Please check your password!"});
            return;
        } else {
            req.session.utilizator.lastname = campuriText.lastname;
            req.session.utilizator.firstname = campuriText.firstname;
            req.session.utilizator.email = campuriText.email;
            req.session.utilizator.chat_color = campuriText.culoare_chat;
            req.session.utilizator.picture = picture;

            Utilizator.getUtilizDupaUsername(campuriText.username, {}, function(utiliz, {}, err){
                utiliz.trimiteMail("Successful account details change!", "", `<h1>Hello dear ${utiliz.firstname},</h1>
                <p>Here are your new account details:</p><p>Username: ${utiliz.username}</p><p>Last name: ${utiliz.lastname}</p><p>First name: ${utiliz.firstname}</p>
                <p>Email: ${utiliz.email}</p><p>Phone number: ${utiliz.phone}</p><p>Chat color: ${utiliz.chat_color}</p>`, []);
            });

        }

        res.render("pagini/profil", {mesaj: "Update successful!"})
    })

    })
})


app.get("/logout", function(req, res){
    req.session.destroy();
    res.locals.utilizator = null;
    res.render("pagini/logout");
    console.log("DELOGARE CU SUCCES");
})


// ****************************** ADMIN ACTIONS ****************************** //


app.get("/users", function(req, res){

    if(req?.utilizator?.areDreptul?.(Drepturi.vizualizareUtilizatori)){
        AccessBD.getInstance().select({tabel: "users", campuri: ["*"]}, function(err, rezQuery){
            console.log(err);
            console.log(rezQuery.rows);
            res.render("pagini/users", {users: rezQuery.rows})
        });
    } else {
        afisEroare(res, 403);
    }
});


app.get("/getUserRole/:userId", function(req, res){
    if(req?.utilizator?.areDreptul?.(Drepturi.modificareUtilizatori)){
        const userId = req.params.userId;
        AccessBD.getInstance().select({tabel: "users", campuri: ["role"], conditii: [[`user_id = ${userId}`]]}, function(err, rezQuery){
            console.log(err);
            const userRole = rezQuery.rows[0].role;
            res.json({userRole});
            
    });
    } else {
        afisEroare(res, 403);
    }
})

app.put("/promoteUser/:userId", function(req, res){
    if(req?.utilizator?.areDreptul?.(Drepturi.modificareUtilizatori)){
        const userId = req.params.userId;
        AccessBD.getInstance().update({tabel: "users", campuri: {role: "admin"}, conditii: [[`user_id = ${userId}`]]}, function(err, rezUpdate){
            if(err){
                console.log(err);
            } 
            else{
                res.json({message: "User promovat cu succes!"})
            }
        })
    } else {
        afisEroare(res, 403);
    }
})

app.put("/demoteUser/:userId", function(req, res){
    if(req?.utilizator?.areDreptul?.(Drepturi.modificareUtilizatori)){
        const userId = req.params.userId;
        AccessBD.getInstance().update({tabel: "users", campuri: {role: "common"}, conditii: [[`user_id = ${userId}`]]}, function(err, rezUpdate){
            if(err){
                console.log(err);
            } 
            else {
                res.json({message: "User retrogradat cu succes!"})

            }
        })
    } else {
        afisEroare(res, 403);
    }
})


// **************** Delete Account **************** //
app.delete("/deleteUser", express.json(), function(req, res){
    const username = req.session.utilizator.username;
    console.log(req.body);
    const password = req.body.password;
    
    let cryptedPassword = Utilizator.criptareParola(password);
    Utilizator.getUtilizDupaUsername(username, {}, function(user, obparam, error){
        if(error){
            console.log(error);
            res.status(500).json({status: 'error', message:'Internal server error'});
        } else {
            if(cryptedPassword == user.password){
                Utilizator.stergeUtilizator(username);
                res.status(200).json({status: 'success', message: 'Account deleted'});
                req.session.destroy();
                user.trimiteMail("Goodbye!", "We are sad to see you go :(")
            } else {
                res.status(401).json({status: 'failure', message: 'Invalid password'});
            }

        }
    })
})


// ********************************************************************************************** //

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

