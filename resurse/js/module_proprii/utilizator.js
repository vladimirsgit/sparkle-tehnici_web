
const {RolFactory} = require('./roluri.js');
const Drepturi = require('./drepturi.js');
const crypto = require("crypto");
const AccessBD = require("./accessbd.js");
const parole = require("./parole.js");
const nodemailer = require("nodemailer");
const Roluri = require('./roluri.js');

class Utilizator{
    static tipConexiune = "local";
    static tabel = "users";
    static parolaCriptare = "Iau10LaTW";
    static lungimeCod = 64; //lungimeaParolei
    static emailServer = "proiecttehniciwebvladimir@gmail.com";
    static numeDomeniu = "localhost:8080";
    #eroare;
    constructor({user_id,username, lastname, firstname, password, role, email, chat_color, picture, phone} = {}) {
        this.user_id = user_id;

        try {
            if(this.checkUsername(username)){
                this.username = username;
            }
        } catch (e) {
            this.#eroare = e.message;
        }
        for(let prop in arguments[0]){
            this[prop] = arguments[0][prop];
        }
        if(this.rol)
        this.rol = this.rol.cod ? RolFactory.creeazaRol(this.rol.cod) : RolFactory.creeazaRol(this.rol);
        console.log(this.rol);

        this.#eroare = "";
    }

    checkLastName(lastname){
        return lastname != "" && lastname.match(new RegExp("^[A-Z][a-z]+$"));
    }

    set setLastName(lastname){
        if(this.checkLastName(lastname)) this.lastname = lastname;
        else {
            throw new Error("Nume gresit!");
        }
    }

    set setUsername(username){
        return username != "" && username.match(new RegExp("^[A-Za-z0-9#_./]+$"));
    }

    static criptareParola(parola){
        return crypto.scryptSync(parola, Utilizator.parolaCriptare, Utilizator.lungimeCod).toString("hex");
    }

    salvareUtilizator(){
        let parolaCriptata = Utilizator.criptareParola(this.password);
        let utiliz = this;
        let token = parole.genereazaToken(100);

        AccessBD.getInstance(Utilizator.tipConexiune).insert({tabel: Utilizator.tabel,
        campuri:{
            username: this.username,
            lastname: this.lastname,
            firstname: this.firstname,
            password: parolaCriptata,
            email: this.email,
            phone: this.phone,
            chat_color: this.chat_color,
            code: token,
            picture: this.picture}
        },function(err, rez){
            if(err){
                console.log(err);
            } else {
                utiliz.trimiteMail("Successful SPARKLE registration!", "Your username is: " + utiliz.username,`<h1>Hi!</h1><p style='color: red'>Your username is: ${utiliz.username}.</p>
                <p><a href='http://${Utilizator.numeDomeniu}/cod/${utiliz.username}/${token}'>Click here for <b>confirmation</b></a></p>.`)
            }
        })
    }

    static modificaUtilizator(username, obiectDateUtilizator){
        console.log(username);

        AccessBD.getInstance(Utilizator.tipConexiune).select({tabel: Utilizator.tabel, campuri: ["*"], conditii: [[`username = '${username}'`]]}, function(err, rezSelect){
            if(err){
                console.log(err);
            } else if(rezSelect.rowCount == 0){
                console.log("No account with this username");
            } else {
                AccessBD.getInstance(Utilizator.tipConexiune).update({tabel: Utilizator.tabel, campuri: obiectDateUtilizator, conditii: [[`username = '${username}'`]]}, function(err, rezUpdate){
                    if(err){
                        console.log(err);
                    } else console.log(rezUpdate);
                })
            }
        })
    }

    static stergeUtilizator(username){
        AccessBD.getInstance(Utilizator.tipConexiune).delete({tabel: Utilizator.tabel, conditii: [[`username = '${username}'`]]}, function(err, rezDelete){
            if(err){
                console.log(err);
            } else if(rezDelete.rowCount == 0){ 
                console.log("No account with that username");
            } else {
                console.log(rezDelete);
            }
        })
    }

    async trimiteMail(subiect, mesajText, mesajHtml, atasamente = []) {
        var transp = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: Utilizator.emailServer,
                pass: "hfsazdceceibmjuw"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transp.sendMail({
            from: Utilizator.emailServer,
            to: this.email,
            subject: subiect,
            text: mesajText,
            html: mesajHtml,
            attachments: atasamente
        });
        console.log("Mail sent!");
    }

    static getUtilizDupaUsername(username, obparam, proceseazaUtiliz){ //proceseazaUtiliz este un callback oferit ca parametru
        if(!username) return null;

        let eroare = null;

        AccessBD.getInstance(Utilizator.tipConexiune).select({tabel: Utilizator.tabel, campuri: ['*'], conditii:[[`username = '${username}'`]]}, function(err, rezSelect) {
            let u = null;
            if(err){
                console.error("Utilizator: ", err);
                eroare = -2;
            } else if(rezSelect.rowCount == 0){
                eroare = -1;
            } else {
                u = new Utilizator(rezSelect.rows[0]);
                proceseazaUtiliz(u, obparam, eroare);
            }
        })
    }

    static async getUtilizDupaUsername(username){
        if(!username) return null;
        try {
            let rezSelect = await AccessBD.getInstance(Utilizator.tipConexiune).selectAsync(
                {tabel: Utilizator.tabel, campuri: ['*'],
                conditii:[[`username = '${username}'`]]});
                if(rezSelect.rowCount != 0){
                    return new Utilizator(rezSelect.rows[0])
                } else {
                    console.log("No account found with that username");
                    return null;
                }
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    static async cautaAsync(obParam){
        let coloane = Object.keys(obParam);
        let coloaneDefinite = coloane.filter((coloana) => obParam[coloana] != undefined)
        let conditii = coloaneDefinite.map((coloana) => `${coloana} = '${obParam[coloana]}'`);
        try{
            let rezCauta = await AccessBD.getInstance(Utilizator.tipConexiune).selectAsync({tabel: Utilizator.tabel, campuri: ['*'], conditii: [conditii]});
            if(rezCauta.rowCount != 0){
                return rezCauta.rows;
            } else {
                console.log("No accounts found with these details");
                return null;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static cauta(obParam, proceseazaUtiliz){
        let coloane = Object.keys(obParam);
        let coloaneDefinite = coloane.filter((coloana) => obParam[coloana] != undefined)
        let conditii = coloaneDefinite.map((coloana) => `${coloana} = '${obParam[coloana]}'`);
        AccessBD.getInstance(Utilizator.tipConexiune).select({tabel: Utilizator.tabel, campuri: ['*'], conditii: [conditii]}, function(err, rezCauta){
            if(err){
                console.log(err);
            } else if(rezCauta.rowCount == 0){
                console.log('No account like this');
            } else {
                proceseazaUtiliz(err, rezCauta);
                return rezCauta.rows[0];
            }
        })
    }

    areDreptul(drept){
        let v_drepturiAdmin = Roluri.RolAdmin.areDreptul();
        console.log(v_drepturiAdmin);
    }
    
}

module.exports = {Utilizator: Utilizator};