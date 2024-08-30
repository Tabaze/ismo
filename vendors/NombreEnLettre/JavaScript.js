var res, plus, diz, s, un, mil, mil2, ent, deci, centi, pl, pl2, conj;

var t = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
var t2 = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
var t3 = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// traitement des deux parties du nombre;
function decint(n) {

    switch (n.length) {
        case 1: return dix(n);
        case 2: return dix(n);
        case 3: return cent(n.charAt(0)) + " " + decint(n.substring(1));
        default: mil = n.substring(0, n.length - 3);
            if (mil.length < 4) {
                un = (mil == 1) ? "" : decint(mil);
                return un + mille(mil) + " " + decint(n.substring(mil.length));
            }
            else {
                mil2 = mil.substring(0, mil.length - 3);
                return decint(mil2) + million(mil2) + " " + decint(n.substring(mil2.length));
            }
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// traitement des nombres entre 0 et 99, pour chaque tranche de 3 chiffres;
function dix(n) {
    if (n < 10) {
        return t[parseInt(n)]
    }
    else if (n > 9 && n < 20) {
        return t2[n.charAt(1)]
    }
    else {
        plus = n.charAt(1) == 0 && n.charAt(0) != 7 && n.charAt(0) != 9 ? "" : (n.charAt(1) == 1 && n.charAt(0) < 8) ? " et " : "-";
        diz = n.charAt(0) == 7 || n.charAt(0) == 9 ? t2[n.charAt(1)] : t[n.charAt(1)];
        s = n == 80 ? "s" : "";

        return t3[n.charAt(0)] + s + plus + diz;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// traitement des mots "cent", "mille" et "million"
function cent(n) {
    return n > 1 ? t[n] + " cent" : (n == 1) ? " cent" : "";
}

function mille(n) {
    return n >= 1 ? " mille" : "";
}

function million(n) {
    return n >= 1 ? " millions" : " million";
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// conversion du nombre
function trans(n) {

    // vérification de la valeur saisie
    if (!/^\d+[.,]?\d*$/.test(n)) {
        return "L'expression entrée n'est pas un nombre."
    }

    // séparation entier + décimales
    n = n.replace(/(^0+)|(\.0+$)/g, "");
    n = n.replace(/([.,]\d{2})\d+/, "$1");
    n1 = n.replace(/[,.]\d*/, "");
    n2 = n1 != n ? n.replace(/\d*[,.]/, "") : false;

    // variables de mise en forme
    ent = !n1 ? "" : decint(n1);
    deci = !n2 ? "" : decint(n2);
    if (!n1 && !n2) {
        return "Zéro Euros. (Mais, de préférence, entrez une valeur non nulle!)"
    }
    conj = !n2 || !n1 ? "" : "  et ";
    euro = !n1 ? "" : !/[23456789]00$/.test(n1) ? " dirham" : "s dirham";
    centi = !n2 ? "" : " centime";
    pl = n1 > 1 ? "s" : "";
    pl2 = n2 > 1 ? "s" : "";

    // expression complète en toutes lettres
    return (ent + euro + pl + conj + deci + centi + pl2).replace(/\s+/g, " ").replace("cent s E", "cents E");

}