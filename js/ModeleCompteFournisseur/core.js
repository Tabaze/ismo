

import { selectFournisseur, selectFournisseurAll } from './../ModeleTier/component.js';
import { tableDocFournisseur } from './component.js';
import { fournisseurCredit } from './../ModeleRegFournisseur/service.js';
$(function () {
    loadApp();
    $('#idFournisseur').on('change', this, function () {
        let name = ittone.getSubMenu();
        switch (name) {
            case 'DocFournisseur':
                randerTable();
                break;
            case 'DocFournisseurDetail':
                randerTableDocFournisseurDetail();
                break;
            case 'GrandLiveFournisseur':
                randerTableGrandLiveFournisseur();
                break;
            case 'SoldeCreditFournisseur':
                randerTableSoldeCreditFournisseur();
                break;
        }
        let dt = {
            id: $('#idFournisseur').val() || -1,
            idDossier: ittone.idDossier()
        }
        let credit = fournisseurCredit(dt);
        if (credit.length) {
            $('#credit').text(ittone.CurrencyFormat(credit[0].credit));
        } else {
            $('#credit').text(ittone.CurrencyFormat(0));
        }
    });
    $('#filterDateEntet').on('click', this, function () {
        let name = ittone.getSubMenu();
        switch (name) {
            case 'DocFournisseur':
                randerTable();
                break;
            case 'DocFournisseurDetail':
                randerTableDocFournisseurDetail();
                break;
            case 'GrandLiveFournisseur':
                randerTableGrandLiveFournisseur();
                break;
            case 'SoldeCreditFournisseur':
                randerTableSoldeCreditFournisseur();
                break;

        }
    });
});
const loadApp = function () {
    let name = ittone.getSubMenu();
    const startOfMonth = moment().startOf('Month').toDate();
    const endOfMonth = moment().endOf('Month').toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    switch (name) {
        case 'DocFournisseur':
            ittone.show($('.filterParArticle'));
            selectFournisseurAll($('#idFournisseur'));
            randerTable();
            break;
        case 'DocFournisseurDetail':
            ittone.show($('.filterParArticle'));
            selectFournisseurAll($('#idFournisseur'));
            randerTableDocFournisseurDetail();
            break;
        case 'GrandLiveFournisseur':
            ittone.show($('.filterParArticle'));
            selectFournisseurAll($('#idFournisseur'));
            randerTableGrandLiveFournisseur();
            break;
        case 'SoldeCreditFournisseur':
            ittone.show($('.filterParArticle'));
            selectFournisseurAll($('#idFournisseur'));
            randerTableSoldeCreditFournisseur();
            $('.classFilter').remove();  
            break;
    }
    //randerTable();
}
const randerTable = function () {
    let name = ittone.getSubMenu();
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        {
            "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function (dateEntet) {
                return ittone.convertDate(dateEntet);
            }
        },
        {
            "data": "TT_ht", "title": i18n.translate("TT_ht"), render: function (TT_ht,r,dt) {
                return ittone.CurrencyFormat(TT_ht*dt.valCaisse);
            }
        },
        {
            "data": "TT_tva", "title": i18n.translate("TT_tva"), render: function (TT_tva) {
                return ittone.CurrencyFormat(TT_tva);
            }
        },
        {
            "data": "TT_ttc", "title": i18n.translate("TT_ttc"), render: function (TT_ttc,r,dt) {
                return ittone.CurrencyFormat(TT_ttc*dt.valCaisse);
            }
        },
    ];
    if($('#idFournisseur').val()!=-1){
        columns_title.splice(1,1);
    }
    let dt = {
        id: $('#idFournisseur').val() || -1,
        idDossier: ittone.idDossier(),
        statment: name,
        dateStart: $('#dateStart').getDate(),
        dateEnd: $('#dateEnd').getDate(),
    }
    tableDocFournisseur($.tableView, columns_title, dt);
}
const randerTableDocFournisseurDetail = function () {
    let name = ittone.getSubMenu();
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "descLign", "title": i18n.translate("descLign") },
        {
            "data": "qteLign", "title": i18n.translate("qteLign"), render: function (qteLign) {
                return ittone.QteFormat(qteLign);
            }
        },
        {
            "data": "lgnHT", "title": i18n.translate("lgnHT"), render: function (lgnHT,r,dt) {
                return ittone.CurrencyFormat(lgnHT*dt.valCaisse);
            }
        },
        {
            "data": "lgnTTC", "title": i18n.translate("lgnTTC"), render: function (lgnTTC,r,dt) {
                return ittone.CurrencyFormat(lgnTTC*dt.valCaisse);
            }
        },
        {
            "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function (dateEntet) {
                return ittone.convertDate(dateEntet);
            }
        },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
    ];
    let dt = {
        id: $('#idFournisseur').val() || -1,
        idDossier: ittone.idDossier(),
        statment: name,
        dateStart: $('#dateStart').getDate(),
        dateEnd: $('#dateEnd').getDate(),
    }
    tableDocFournisseur($.tableView, columns_title, dt);
}
const randerTableGrandLiveFournisseur = function () {
    let name = ittone.getSubMenu();
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },        
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },     
        { "data": "TT_ttc", "title": i18n.translate("credit"),render:function(TT_ttc,r,dt){
            if(dt.codeType == "BLFFR" || dt.codeType == "BAVFR"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }     
        }},
        { "data": "TT_ttc", "title": i18n.translate("paye"),render:function(TT_ttc,r,dt){
            if(dt.codeType == "ESPF" || dt.codeType == "VRMBNQFR" || dt.codeType=="PRLFR" || dt.codeType=="PYF" || dt.codeType=="IPYF" ){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }    
        } }
    ];
    if($('#idFournisseur').val()==-1){
        columns_title.unshift({ "data": "nom", "title": i18n.translate("nom") });
    }
    let dt = {
        id: $('#idFournisseur').val() || -1,
        idDossier: ittone.idDossier(),
        statment: name,
        dateStart: $('#dateStart').getDate(),
        dateEnd: $('#dateEnd').getDate(),
    }
    tableDocFournisseur($.tableView, columns_title, dt);
}
const randerTableSoldeCreditFournisseur = function () {
    let name = ittone.getSubMenu();
    let columns_title = [
        { "data": "codeFournisseur", "title": i18n.translate("codeFournisseur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "debit", "title": i18n.translate("Debit"),render:function(Débit){
            return ittone.CurrencyFormat(Débit);
        }},
        { "data": "credit", "title": i18n.translate("Credit"),render:function(Crédit){
            return ittone.CurrencyFormat(Crédit);
        }},
        { "data": "credit", "title": i18n.translate("Solde"),
           render:function(credit,r,dt){
            return ittone.CurrencyFormat((dt.credit)-(dt.debit));
        }}
    ];
    let dt = {
        id: $('#idFournisseur').val() || -1,
        idDossier: ittone.idDossier(),
        statment: name,
        dateStart: $('#dateStart').getDate(),
        dateEnd: $('#dateEnd').getDate(),
    }
    tableDocFournisseur($.tableView, columns_title, dt);
}