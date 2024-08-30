import { infoEntetById, listEntetLign, listTaux, getFoldersNameEntet } from '../../service.js'
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
        var url_string = window.location.href;
        var url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        // console.log(Id_entet, $(this).val());
        let url1 = "imprimant/entet/" + $(this).val() + "/index.html?id=" + idEntet;
        window.location.href = url.origin + "/" + url1;
    });
});
const infoEntet = function (list) {
    $('#nomFacture').text(list.nomFacture);
    $('#numFactur').text(ittone.stringWithZero(list.numFactur, 5) + " / " + ittone.getYear(list.dateEntet));
    $('#dateEntet').text(ittone.convertDate(list.dateEntet));
    //$('#nomDepot').text(list.nomDepot);
    if (ittone.convertDate(list.dateEcheanche)) {
        $('#dateEcheanche').text(ittone.convertDate(list.dateEcheanche))
    } else {
        $('#echeanche').remove();
    }
    //$('#nomModRglm').text(list.nomModRglm);
    $('#nom').text(list.nom);
    $('#info').text(list.info);
    if (list.idClient) {
        //$('#code').text(list.codeClient);
        $('#ice').text(list.iceClient);
    } else {
        //$('#code').text(list.codeFournisseur);
        $('#ice').text(list.iceFournisseur);
    }
    let data = JSON.parse(sessionStorage.getItem('dataDossier'));
    $('.infosFooter').html(data.Pied_dossier);
}
const listLignEntet = function (list) {
    // //var lign_entet = data.d;
    // console.log(list)
    var row = 0;
    var rowbreak = 5;
    var page = 0;
    var $page;
    var newList = [];
    var cloumList = [
        { "data": "refArticle", "title": i18n.translate("refArticleImp") },
        { "data": "descLign", "title": i18n.translate("descLignImp") },
        {
            "data": "qteLign", "title": i18n.translate("qteLign"),
            render: function (qteLign) {
                return ittone.QteFormat(qteLign);
            }
        },
        {
            "data": "prixHT", "title": i18n.translate("prixHT"),
            render: function (prixHT) {
                return ittone.CurrencyFormat(prixHT);
            }
        },
        {
            "data": "lgnTVA", "title": i18n.translate("lgnTVA"),
            render: function (lgnTVA) {
                return (lgnTVA + '%');
            }
        },
        {
            "data": "lgnRemise", "title": i18n.translate("lgnRemise"),
            render: function (lgnRemise) {
                return (lgnRemise + "%");
            }
        },
        {
            "data": "lgnHT", "title": "Total",
            render: function (lgnHT) {
                return ittone.CurrencyFormat(lgnHT);
            }
        },
    ];
    for (let i in list) {
        if (row == rowbreak) {
            rowbreak = 6;
            $page = $(`<div class="page mg-290"><table class="table">` + ittone.generatorTable(cloumList, newList) + `</table></div>`);
            page += 1;
            $('#allPage').append($page);
            row = 0;
            newList = [];
        }
        newList.push(list[i]);
        row++;
        if (newList.length > 0 && i == list.length - 1) {
            $page = $(`<div class="page mg-290"><table class="table">` + ittone.generatorTable(cloumList, newList) + `</table></div>`);
            page += 1;
            $('#allPage').append($page);
        }
    }
    var y = newList.length - rowbreak;
    for (let i = 0; i < Math.abs(y); i++) {
        // console.log('tr break')
    }
}
const totalEntet = function (list) {
    $('#totalRemise').text(ittone.CurrencyFormat(list.TT_remis));
    $('#totalHt').text(ittone.CurrencyFormat(list.TT_ht));
    $('#totalTVA').text(ittone.CurrencyFormat(list.TT_tva));
    $('#totalTTC').text(ittone.CurrencyFormat(list.TT_ttc));
    $('#totalNet').text(ittone.CurrencyFormat(list.TT_ttc));
    $('.moneyLettres').html('<span>Arrêtée la présente facture à la somme de :</span><br><b>' + ittone.numberToletter(list.TT_ttc)+"</b>");
}
const randerTableTaux = function (id) {
    let list = listTaux({ id: id });
    for (let i in list) {
        $('#tfoot_taux').append('<tr><td class="cell">' + list[i].lgnTVA + ' %</td><td class="cell">' + ittone.CurrencyFormat(list[i].taux) + '</td><td class="cell">' + ittone.CurrencyFormat(list[i].Base) + '</td></tr>')
    }
}
function Tt_remise(Remise) {
    var $tr = '<tr>'
        + '<td></td>'
        + '<td class="cell">Total Remise</td>'
        + '<td class="cell number">' + ittone.CurrencyFormat(Remise) + '</td>'
        + '</tr>';
    return $tr;
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
    //$('#montantWord').html('<span>Arrêtée la présente facture à la somme de:</span><br>' + trans(String(ttc)));
    var $tr = '<tr>'
        + '<td></td>'
        + '<td class="cell">Total TTC</td>'
        + '<td class="cell number">' + ittone.CurrencyFormat(ttc) + '</td>'
        + '</tr>';
    return $tr;
}
function Tt_Net(Net) {
    //$('#montantWord').html('<span>Arrêtée la présente facture à la somme de:</span><br>' + trans(String(ttc)));
    var $tr = '<tr>'
        + '<td></td>'
        + '<td class="cell">Total Net</td>'
        + '<td class="cell number">' + ittone.CurrencyFormat(Net) + '</td>'
        + '</tr>';
    return $tr;
}
function tr_break() {
    var $tr = '<tr>'
        + '<td class="short_cell_breack" style="padding: 11px;"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        + '<td class="short_cell_breack"></td>'
        + '</tr>';
    return $tr;
}
function getfolders_name() {
    $('#chnage_model').append('<option> </option>');
    var list = getFoldersNameEntet();
    // console.log(list)
    for (let i in list) {
        if (list[i] != 'Modele_barcode' && list[i] != 'Modele_Virement') {
            $('#chnage_model').append('<option>' + list[i] + '</option>');
        }
    }
}
