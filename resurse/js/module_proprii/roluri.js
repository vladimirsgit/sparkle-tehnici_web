const Drepturi = require('./drepturi.js'); //importan Drepturi pentru a le introduce in diferitele roluri

class Rol{ //asta e clasa parinte
    static get tip(){
        return "generic";
    }
    static get drepturi(){
        return [];
    }
    constructor (){
        this.cod = this.constructor.tip;
    }

    areDreptul(drept){ //drept trebuie sa fie Symbol
        console.log("In metoda lui Rol");
        return this.constructor.drepturi.includes(drept);
    }
}

class RolAdmin extends Rol{ //adminul are toate drepturile, de aia areDreptul returneaza true
    static get tip(){
        return "admin";
    }
    constructor (){
        super();
    }
    areDreptul(){
        return true;
    } 
}

class RolModerator extends Rol{ //aici moderatorul are dreptul de a vizualiza utilizatori si de a sterge utilizatori
    static get tip(){
        return "moderator";
    }
    static get drepturi(){
        return [Drepturi.vizualizareUtilizatori,
        Drepturi.stergereUtilizatori]
    }
    constructor(){
        super();
    }
}

class RolClient extends Rol{
    static get tip(){
        return "common";
    }
    static get drepturi(){
        return [Drepturi.cumparareProduse]
    }
    constructor(){
        super();
    }
}

class RolFactory{
    static creeazaRol(tip){
        switch(tip){
            case RolAdmin.tip : return new RolAdmin();
            case RolModerator.tip: return new RolModerator();
            case RolClient.tip : return new RolClient();
        }
    }
}

module.exports={
    RolFactory:RolFactory,
    RolAdmin:RolAdmin,
    RolModerator: RolModerator,
    RolClient: RolClient
}