sirAlphaNum = "";
v_intervale = [[48, 57], [65, 90], [97, 122]];

for(let i = 0; i < v_intervale.length; i++){
    for(let j = v_intervale[i][0]; j <= v_intervale[i][1]; j++){
        sirAlphaNum+= String.fromCharCode(j);
    }
}

function genereazaToken(n){
    let token = "";
    for(let i = 0; i < n; i++){
        token+=sirAlphaNum[Math.floor(Math.random() * sirAlphaNum.length)] //Math.random() returneaza un nr intre 0(inclusiv) si 1(exclusiv), si il inmultim cu lungimea sirAlphaNum
         //deci de fiecare data va alege un index random intre 0 si si in jur de 60, si caracterul de pe pozitia aceea din sirAlphaNum va fi adaugat la token
    }
    return token;
}

module.exports.genereazaToken=genereazaToken;