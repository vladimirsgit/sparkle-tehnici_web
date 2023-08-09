
const {Client, Pool} = require("pg");
class AccessBD{
    static #instanta = null; //vrem sa avem o singura conexiune catre baza de date
    static #initializat = false;

    constructor() {
        if(AccessBD.#instanta){ //am facut asta pentru a ne asigura ca nu va fi chemat constructorul din afara clasei, trebuie DOAR din metoda getInstance
            throw new Error("Deja a fost instantiat!!");
        } else if(!AccessBD.#initializat){
            throw new Error("Trebuie apelat doar din getInstance");
        }
    }

    initLocal(){ //aici init conexiunea la baza de date
        this.client = new Client({database:"SPARKLE",
            user: "vladimir",
            password: "vladimir",
            host: "localhost",
            port: 5432
        })
        this.client.connect();

    }

    getClient(){ //returneaza obiectul client, conexiunea practic
        if(!AccessBD.#instanta){
            throw new Error("Nu a fost inca instantiata clasa!!");
        }
        return this.client;
    }

    /**
     * @typedef {object} ObiectConexiune - obiect primit de functiile care realizeaza un query
     * @property {string} init - tipul de conexiune ("init", "render" etc.)
     * 
     * /

    /**
     * Returneaza instanta unica a clasei
     *
     * @param {ObiectConexiune} init - un obiect cu datele pentru query
     * @returns {AccessBD}
     */

    static getInstance({init = "local"}={}){
        console.log(this);
        if(!this.#instanta){
            this.#initializat = true;
            this.#instanta = new AccessBD(); 

            try{
                switch(init){
                    case "local":this.#instanta.initLocal();
                }
            } catch (e) {
                console.error("Eroare la initializarea bazei de date");
            }
        }
        return this.#instanta;
    }

    // select({tabel = "", campuri = [], conditiiAnd = []} = {}, callback, parametriQuery = []){ //metoda select primeste tabelul, coloanele, conditiile, functie in caz de eroare
    //     let conditieWhere = "";

    //     if(conditiiAnd.length > 0){
    //         conditieWhere = `where ${conditiiAnd.join(" and ")}`; //daca avem mai multe conditii and, facem join intre ele cu and si cream conditia principala WHERE
    //     }

    //     let comanda = `select ${campuri.join(",")} from ${tabel} ${conditieWhere}`;
    //     console.error(comanda);
        
    //     this.client.query(comanda, parametriQuery, callback);
    // }

    /**
     * @typedef {object}  ObiectQuerySelect - obiectul folosit pt functiile de query
     * @property {string} tabel - numele tabelului
     * @property {string []} campuri - lista de stringuri cu numele coloanelor afectate de query
     * @property {string [[]]} conditii - vector 2D; elementele din listele interioare vor fi unite cu AND, iar listele din lista principala vor fi unite cu OR 
     */

    /**
     * callback pentru queryuri
     * @callback QueryCallBack
     * @param {Error} err Eventuala eroare
     * @param {Object} rez Rezultatul query-ului
     *
     */

    /**
     * @param {ObiectQuerySelect} obj - obiect care va contine datele necesare query ului
     * @param {function} callback - functie callback cu 2 parametri: eroare si rezultatul query ului
     */
    select({tabel = "", campuri = [], conditii = [[]]} = {}, callback, parametriQuery = []){ //select folosind cu posibilitatea de a folosi OR
        let conditieWhere = "";
        if(conditii.length > 0 && conditii[0].length > 0){
            for(let i = 0; i < conditii.length; i++){
                conditii[i] = "(" + conditii[i].join(" and ") + ")";
            }
            conditieWhere = `where ${conditii.join(" or ")}`;
        }

        let comanda = `select ${campuri.join(",")} from ${tabel} ${conditieWhere}`;
        console.log(comanda);
        this.client.query(comanda, parametriQuery, callback);
    }
    
    async selectAsync({tabel = "", campuri = [], conditii = [[]]} = {}){
        let conditieWhere = "";
        if(conditii.length > 0 && conditii[0].length > 0){
            for(let i = 0; i < conditii.length; i++){
                conditii[i] = "(" + conditii[i].join(" and ") + ")";
            }
            conditieWhere = `where ${conditii.join(" or ")}`;
        }

        let comanda = `select ${campuri.join(",")} from ${tabel} ${conditieWhere}`;
        console.error(comanda);
        try{
            let rez = await this.client.query(comanda);
            return rez;
        } catch (e){
            console.log(e);
            return null;
        }
    }
    insert({tabel = "", campuri = {}} = {}, callback){
        /*
        campuri={
            nume:"savarina",
            pret: 10,
            calorii:500
        } ex: nume este cheia, valoarea savarina, samd
        */

        console.log("-----------------------------------------");
        console.log(Object.keys(campuri).join(","));
        console.log(Object.values(campuri).join(","));

        let comanda = `insert into ${tabel} (${Object.keys(campuri).join(",")}) values (${Object.values(campuri).map((x) => `'${x}'`).join(",")})`
        //aici comanda va fi: insert into products (nume, pret, calorii) values ('savarina', '10', '50')
        console.log(comanda);

        this.client.query(comanda, callback);
    }
    
    // update({tabel = "", campuri = {}, conditiiAnd=[]} = {}, callback, parametriQuery){
    //     let coloanePentruActualizare = [];

    //     for(let column in campuri){
    //         coloanePentruActualizare.push(`${column} ='${campuri[column]}'`);
    //     }

    //     let conditieWhere = "";
    //     if(conditiiAnd.length > 0){
    //         conditieWhere = `where ${conditiiAnd.join(" and ")}`;
    //     }

    //     let comanda = `update ${tabel} set ${coloanePentruActualizare.join(",")} ${conditieWhere}`;
    //     //comanda finala va fi: update products set name = 'savarina', pret = '10', calorii = '500' where conditie1 and conditie2
    //     console.log(comanda);

    //     this.client.query(comanda, callback);
    // }

    update({tabel = "", campuri = {}, conditii=[[]]} = {}, callback, parametriQuery){ //update utilizand si OR
        let coloanePentruActualizare = []; //cream vectorul cu coloanele pe care vrem sa le actualizam
        //campuri va arata key value pair: username: 'schimbat', firstname: 'simaicshimbat'
        for(let column in campuri){ //pt fiecare cheie din campuri
            coloanePentruActualizare.push(`${column} ='${campuri[column]}'`);
        }

        let conditieWhere = "";
        if(conditii.length > 0 && conditii[0].length > 0){
            for(let i = 0; i < conditii.length; i++){
                conditii[i] = "(" + conditii[i].join(" and ") + ")";
            }
            conditieWhere = `where ${conditii.join(" or ")}`;
        }

        let comanda = `update ${tabel} set ${coloanePentruActualizare.join(",")} ${conditieWhere}`;
        //comanda finala va fi: update products set name = 'savarina', pret = '10', calorii = '500' where conditie1 and conditie2
        console.log(comanda);

        this.client.query(comanda, callback);
    }


    updateParametrizat({tabel = "", campuri = [], valori = [], campuriConditii = [[]], valoriConditii = []} = {}, callback){
        if(campuri.length != valori.length){
            throw new Error("Numarul de campuri difera de numarul de valori");
        }
        let campuriActualizate = [];
        //campuri = ["coloana1", "coloana2"]
        //valori = ["valoare1", "valoare2"]
        var indexOfValue = 0;
        for(let i = 0; i < campuri.length; i++){
            campuriActualizate.push(`${campuri[i]} = $${i+1}`);
            indexOfValue = i+1;
        }
        //campuriActualizate = ["coloana1 = $1", "coloana2 = $2"];
        
        //campuriConditii = [["user_id", "username"] OR ["user_id"]];
        //valoriConditii = [["1", "solotravel"] OR ["2"]];
        
        let conditieWhere = "";
        if(campuriConditii.length > 0 && campuriConditii[0].length > 0 && valoriConditii.length > 0 && valoriConditii[0].length > 0){
            for(let i = 0; i < campuriConditii.length; i++){
                for(let j = 0; j < campuriConditii[i].length; j++){
                    campuriConditii[i][j]+= ` = $${++indexOfValue}`;
                    //adaugam userid = $1, username = $2, samd
                }
            }
          //facem join cu and si or
            for(let i = 0; i < campuriConditii.length; i++){
                campuriConditii[i] = "(" + campuriConditii[i].join(" and ") + ")";
            }
            conditieWhere = `where ${campuriConditii.join(" or ")}`;
        }
        //comanda finala va arata ceva de genul: update users set lastname = $1, firstname = $2 where (username = $3) or (firstname = $4)
        let comanda = `update ${tabel} set ${campuriActualizate.join(", ")} ${conditieWhere}`;
        valori = valori.concat(valoriConditii);
        this.client.query(comanda, valori, callback);
    }

    // delete({tabel = "", conditiiAnd = []} = {}, callback){
    //     let conditieWhere = "";
    //     if(conditiiAnd.length > 0){
    //         conditieWhere = `where ${conditiiAnd.join(" and ")}`;
    //     }
    //     let comanda = `delete from ${tabel} ${conditieWhere}`;
    //     console.log(comanda);

    //     this.client.query(comanda, callback);
    // }

        delete({tabel = "", conditii = [[]]} = {}, callback){ //delete cu OR
            let conditieWhere = "";
            if(conditii.length > 0 && conditii[0].length > 0){
                for(let i = 0; i < conditii.length; i++){
                    conditii[i] = "(" + conditii[i].join(" and ") + ")";
                }
                conditieWhere = `where ${conditii.join(" or ")}`;
            }
            let comanda = `delete from ${tabel} ${conditieWhere}`;
            console.log(comanda);

            this.client.query(comanda, callback);
        }


    query(comanda, callback){ //pt comenzi mai complexe pt care nu am definit vreo functie
        this.client.query(comanda, callback);
    }

}

module.exports = AccessBD;