
/**
 @typedef Drepturi
 @type {Object}
 @property {Symbol} vizualizareUtilizatori Dreptul de a intra pe  pagina cu tabelul de utilizatori.
 @property {Symbol} stergereUtilizatori Dreptul de a sterge un utilizator
 @property {Symbol} cumparareProduse Dreptul de a cumpara
 @property {Symbol} vizualizareProduse Dreptul de a vizualiza tabelul cu produse
 @property {Symbol} adaugareProduse Dreptul de a adauga produse in tabel
 @property {Symbol} stergereProduse Dreptul de a sterge din tabelul cu produse
 @property {Symbol} vizualizareGrafice Dreptul de a vizualiza graficele de vanzari

 */


/**
 * @name module.exports.Drepturi
 * @type Drepturi
 */

const Drepturi = {
    vizualizareUtilizatori: Symbol("vizualizareUtilizatori"), //folosim symbol sa ne asiguram ca folosim exact ce am declarat aici, nu alt string care sa fie echivalent cu acesta
    stergereUtilizatori: Symbol("stergereUtilizatori"),
    cumparareProduse: Symbol("cumparareProduse"),
    vizualizareProduse: Symbol("vizualizareProduse"),
    adaugareProduse: Symbol("adaugareProduse"),
    stergereProduse: Symbol("stergereProduse"),
    vizualizareGrafice: Symbol("vizualizareGrafice")
}