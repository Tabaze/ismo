import { selectDepot, selectSubDepotbyId, selectSubDepot } from './../ModeleBase/component.js';
import { selectArticle, selectFamilleGroup } from '../ModeleArticle/component.js';
import { tableGestionParArticle } from './component.js';
$(function () {
    loadApp();
    $('#idArticle').on('change', this, function () {
        let name = ittone.getSubMenu();
        if (name == 'articleParDoc') {
            randerTableMvmArticle($('#idArticle').val());
        }
        else if (name == 'mvmArticle') {
            randerTableMvmArticle($('#idArticle').val());
        }
        else {
            randerTable($('#idArticle').val());

        }
    });
    $('#idFamille').on('change', this, function () {
        let name = ittone.getSubMenu();
        if (name == 'mvmFamille') {
            randerTableMvmArticle($('#idFamille').val());
        }
        else {
            randerTable($('#idFamille').val());
        }
    });
    $('#idDepot').on('change', this, function () {
        randerTable($('#idDepot').val());
    });
    $('#idEmplacement').on('change', this, function () {
        randerTable($('#idEmplacement').val());
    });
    $('#filterDateEntet').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'articleParDoc':
                randerTableMvmArticle($('#idArticle').val()); break;
            case 'mvmArticle':
                randerTableMvmArticle($('#idArticle').val()); break;
            case 'mvmFamille':
                randerTableMvmArticle($('#idFamille').val()); break;
        }
    });
});
var tableRander;
const loadApp = function () {
    const startOfMonth = moment().startOf('Month').toDate();
    const endOfMonth = moment().endOf('Month').toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    let name = ittone.getSubMenu();
    switch (name) {
        case 'parArticle':
            ittone.show($('.filterParArticle'));
            selectArticle($('#idArticle'));
            randerTable($('#idArticle').val());
            $('.divCalendar').remove();
            break;
        case 'parFamille':
            ittone.show($('.filterParFamille'));
            selectFamilleGroup($('#idFamille'));
            randerTable($('#idFamille').val());
            $('.divCalendar').remove();
            break;
        case 'parDepot':
            ittone.show($('.filterParDepot'));
            selectDepot($('#idDepot'));
            randerTable($('#idDepot').val());
            $('.divCalendar').remove();
            $('.QteDiv').remove();
            break;
        case 'parDepotSample':
            ittone.show($('.filterParDepot'));
            selectDepot($('#idDepot'));
            randerTable($('#idDepot').val());
            $('.divCalendar').remove();
            $('.QteDiv').remove();
            break;
        case 'parEmplacement':
            ittone.show($('.filterParEmplacement'));
            selectSubDepot($('#idEmplacement'));
            randerTable($('#idEmplacement').val());
            $('.divCalendar').remove();
            $('.QteDiv').remove();
            break;
        case 'articleParDoc':
            ittone.show($('.filterParArticle'));
            selectArticle($('#idArticle'));
            randerTableMvmArticle($('#idArticle').val());
            $('.QteDiv').remove();
            break;
        case 'mvmArticle':
            ittone.show($('.filterParArticle'));
            selectArticle($('#idArticle'));
            randerTableMvmArticle($('#idArticle').val());
            $('.QteDiv').remove();
            break;
        case 'mvmFamille':
            ittone.show($('.filterParFamille'));
            selectFamilleGroup($('#idFamille'));
            randerTableMvmArticle($('#idFamille').val());
            $('.QteDiv').remove();
            break;
    }
    //randerTable();
}
const randerTable = function (id) {
    let name = ittone.getSubMenu();
    const columns_title = [
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        {
            "data": "lastPrix", "title": i18n.translate("lastPrix"),
            render: function (lastPrix) {
                return ittone.CurrencyFormat(lastPrix);
            }
        },
        {
            "data": "qteDepot", "title": i18n.translate("qteDepot"),
            render: function (qteDepot) {
                return ittone.QteFormat(qteDepot);
            }
        },
        {
            "data": "qteBox", "title": i18n.translate("qteBox"),
            render: function (qteBox, data, dt) {
                if (dt.qteBox == 0 || dt.qteBox == null) {
                    return ittone.QteFormat(1);
                } else {
                    let quotient = Math.floor(dt.qteDepot / dt.qteBox); // => 4 => the times 3 fits into 13  
                    let remainder = dt.qteDepot % dt.qteBox;
                    if (remainder > 0) {
                        return quotient + ' ' + i18n.translate("Box") + ' ' + remainder + ' ' + i18n.translate("Unit");
                    } else {
                        return quotient + ' ' + i18n.translate("Box");
                    }

                }

            }
        },
        {
            "data": "cmup", "title": i18n.translate("cmup"),
            render: function (cmup) {
                return ittone.CurrencyFormat(cmup);
            }
        },
        {
            "data": "valeurlastPrix", "title": i18n.translate("valeurlastPrix"),
            render: function (valeurlastPrix) {
                return ittone.CurrencyFormat(valeurlastPrix);
            }
        },

        {
            "data": "valeurCmup", "title": i18n.translate("valeurCmup"),
            render: function (valeurCmup) {
                return ittone.CurrencyFormat(valeurCmup);
            }
        },
    ];
    let dt = {
        id: id || -1,
        idDossier: ittone.idDossier(),
        statment: name
    }
    let param = {
        param: [dt]
    }
    if (name == 'parDepotSample') {
        columns_title.splice(0, 1);
        columns_title.splice(4, 1);
        columns_title.splice(6, 1);
        columns_title.splice(6, 1);
        columns_title.splice(6, 1);
    }
    if (name == 'parEmplacement') {
        columns_title.splice(0, 1);
    }
    tableRander = tableGestionParArticle($.tableView, columns_title, param);
    if (name == 'parArticle' || name == 'parFamille') {
        $('#totalQte').html(tableRander.column(6).data().sum())
    }
}
const randerTableMvmArticle = function (id) {
    let name = ittone.getSubMenu();
    const columns_title = [
        { "data": "nom", "title": i18n.translate("nom") },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "descLign", "title": i18n.translate("descLign") },
        {
            "data": "prixHT", "title": i18n.translate("prixHT"),
            render: function (prixHT) {
                return ittone.CurrencyFormat(prixHT);
            }
        },
        {
            "data": "prixTTC", "title": i18n.translate("prixTTC"),
            render: function (prixTTC) {
                return ittone.CurrencyFormat(prixTTC);
            }
        },
        { "data": "qteLign", "title": i18n.translate("qteLign") },
        {
            "data": "lgnHT", "title": i18n.translate("lgnHT"),
            render: function (lgnHT) {
                return ittone.CurrencyFormat(lgnHT);
            }
        },
        {
            "data": "lgnTTC", "title": i18n.translate("lgnTTC"),
            render: function (lgnTTC) {
                return ittone.CurrencyFormat(lgnTTC);
            }
        },
        { "data": "descType", "title": i18n.translate("descType") },
    ];
    if (name == 'articleParDoc' || name == 'mvmArticle') {
        columns_title.splice(1, 1);
    }
    let dt = {
        id: id || -1,
        dateD: $('#dateStart').getDate(),
        dateE: $('#dateEnd').getDate(),
        idDossier: ittone.idDossier(),
        statment: name
    }
    let param = {
        param: [dt]
    }
    tableGestionParArticle($.tableView, columns_title, param);
}