class AccessBD{
    static #instanta = null; //vrem sa avem o singura conexiune catre baza de date
    static #initializat = false;

    constructor() {
        if(AccessBD.#instanta){
            throw new Error("Deja a fost instantiat!!");
        } else if(!AccessBD.#initializat){
            throw new Error("Trebuie apelat doar din getInstanta");
        }
    }

    initLocal(){ //aici init conexiunea la baza de date
        this.client = new Client({database:"SPARKLE",
            user: "vladimir",
            password: "vladimir",
            host: "localhost",
            port: 5432
        })
    }

    getClient(){ //returneaza obiectul client, conexiunea practic
        if(!AccessBD.#instanta){
            throw new Error("Nu a fost inca instantiata clasa!!");
        }
        return this.client;
    }
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
    }
}