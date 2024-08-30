import { infoEntetById, listEntetLign, listTaux, getFoldersNameEntet } from '../../service.js';
$(document).ready(function () {
    var idEntet;
    load();
    function load() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let info = infoEntetById({ id: idEntet })[0];
        infoEntet(info);
        let line = listEntetLign({ id: idEntet });
        listLignEntet(line);
        totalEntet(info);
        randerTableTaux(idEntet);
        getfolders_name();
    }
    $('#chnage_model').on('change', this, function () {
        let url_string = window.location.href;
        let url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let url1 = "imprimant/entet/" + $(this).val() + "/index.html?id=" + idEntet;
        window.location.href = url.origin + "/" + url1;
    });
});
const infoEntet = function (list) {
    $('#codetype').text(list.nomFacture);
    $('#numFactur').text(ittone.stringWithZero(list.numFactur, 5) + " / " + ittone.getYear(list.dateEntet));
    $('#dateEntet').text(ittone.convertDate(list.dateEntet));
    $('#nomDepot').text(list.nomDepot);
    if (ittone.convertDate(list.dateEcheanche)) {
        $('#dateEcheanche').text(ittone.convertDate(list.dateEcheanche))
    } else {
        $('#echeanche').remove();
    }
    $('#nomModRglm').text(list.nomModRglm);
    $('#nom').text(list.nom);
    $('#info').text(list.info);
    if (list.idClient) {
        $('#code').text(list.codeClient);
        $('#ice').text(list.iceClient);
    } else {
        $('#code').text(list.codeFournisseur);
        $('#ice').text(list.iceFournisseur);
    }
    let data = JSON.parse(sessionStorage.getItem('dataDossier'));
    console.log(data)
    $('.footer').html(data.Pied_dossier);
}
const listLignEntet = function (list) {
    var row = 0;
    var rowbreak = 23;
    var mntttc = 0;
    var mntht = 0;
    var rows = list.length;
    var page = 0;
    var montantTaxable=0;
    var montantNonTaxable=0;
    for (i in list) {
        if (row == rowbreak) {
            page = 0;
            $('#table_line').append('<!-- tfoot--><tr class="tfoot">'
                + '<td class="short_cell"></td>'
                + '<td class="short_cell"></td>'
                + '<td class="short_cell"></td>'
                + '<td class="short_cell"></td>'
                + '<td class="short_cell"></td>'
                + '<td class="short_cell text">Total</td>'
                + '<td class="short_cell number">' + ittone.CurrencyFormat(mntht) + '</td>'
                + '<td class="short_cell number">' + ittone.CurrencyFormat(mntttc) + '</td>'
                + '</tr><tr class="page-break"></tr>'
                + '<tr class="thead_break thead2">'
                // + '<th class="short_cell">R\xE9ference</th>'
                + '<th class="short_cell">D\xE9signation</th>'
                + '<th class="short_cell">Quantit\xE9</th>'
                + '<th class="short_cell">Quantit Box\xE9</th>'
                + '<th class="short_cell">P.U HT</th>'
                + '<th class="short_cell">TOTAL</th>'
                + '</tr>');
            row = 0;
            mntttc = 0;
            mntht = 0;
        }
        // let lgnTva = list[i].lgnTVA;
        if (list[i].lgnTVA == 0) {
            // lgnTva = 'non taxable'
            $('#table_line').append('<tr class="short_row">'
            // + '<td class="short_cell text">' + list[i].refArticle + '</td>'
            + '<td class="short_cell text desc">' + list[i].descLign + '</td>'
            + '<td class="short_cell number">' + ittone.QteFormat(list[i].qteLign) + '</td>'
            + '<td class="short_cell number">' + ittone.CurrencyFormat(list[i].prixHT) + '</td>'
            + '<td class="short_cell number"> - </td>'
            + '<td class="short_cell number">' + ittone.CurrencyFormat(list[i].lgnTTC) + '</td>'
            + '</tr>');
        }
        else{
            $('#table_line').append('<tr class="short_row">'
            // + '<td class="short_cell text">' + list[i].refArticle + '</td>'
            + '<td class="short_cell text desc">' + list[i].descLign + '</td>'
            + '<td class="short_cell number">' + ittone.QteFormat(list[i].qteLign) + '</td>'
            + '<td class="short_cell number"> - </td>'
            + '<td class="short_cell number">' + ittone.CurrencyFormat(list[i].prixTTC) + '</td>'
            + '<td class="short_cell number">' + ittone.CurrencyFormat(list[i].lgnTTC) + '</td>'
            + '</tr>');
        }
        row++;
        mntttc = mntttc + list[i].lgnTTC;
        mntht = mntht + list[i].lgnHT;
        page++;
    }
    var y = rowbreak - page;
    for (var i = 1; i < Math.abs(y); i++) {
        $('#table_line').append(tr_break());
    }
}
var ttttc=0;
const totalEntet = function (list) {
    console.log(list)
        $('#tfoot_table').append(Tt_Taxable(list.TT_ht));
    $('#tfoot_table').append(Tt_ht(list.TT_ht));
    $('#tfoot_table').append(Tt_tva(list.TT_tva));
    $('#tfoot_table').append(Tt_ttc(list.TT_ttc));
}
const randerTableTaux = function (id) {
    let list = listTaux({ id: id });
    for (let i in list) {
        $('#tfoot_taux').append('<tr><td class="cell">' + list[i].lgnTVA + ' %</td><td class="cell">' + ittone.CurrencyFormat(list[i].taux) + '</td><td class="cell">' + ittone.CurrencyFormat(list[i].Base) + '</td></tr>')
    }
}
function Tt_ht(HT) {
    var $tr = '<tr>'
        + '<td></td>'
        + '<td class="cell">Total HT</td>'
        + '<td class="cell number">' + ittone.CurrencyFormat(HT) + '</td>'
        + '</tr>';
    return $tr;
}
function Tt_tva(tva) {
    var $tr = '<tr>'
        + '<td></td>'
        + '<td class="cell">Total TVA</td>'
        + '<td class="cell number">' + ittone.CurrencyFormat(tva) + '</td>'
        + '</tr>';
    return $tr;
}
function Tt_ttc(ttc) {
    var $tr = '<tr>'
        + '<td></td>'
        + '<td class="cell">Total TTC</td>'
        + '<td class="cell number">' + ittone.CurrencyFormat(ttc) + '</td>'
        + '</tr>';
    return $tr;
}
function Tt_Taxable(Taxable) {
    var $tr = '<tr>' +
        '<td></td>' +
        '<td class="cell">Total Non Taxable</td>' +
        '<td class="cell number">' + ittone.CurrencyFormat(Taxable)+ '</td>' +
        '</tr>';
    return $tr;
}
function tr_break() {
    var $tr = '<tr>'
        + '<td class="short_cell_breack" style="padding: 11px;"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        // + '<td class="short_cell_breack"></td>'
        + '</tr>';
    return $tr;
}
function getfolders_name() {
    $('#chnage_model').append('<option> </option>');
    var list = getFoldersNameEntet();
    for (let i in list) {
        if (list[i] != 'Modele_barcode' && list[i] != 'Modele_Virement') {
            $('#chnage_model').append('<option>' + list[i] + '</option>');
        }
    }
}
