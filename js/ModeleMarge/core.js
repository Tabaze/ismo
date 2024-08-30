

import {selectClientAll,selectClient} from './../ModeleTier/component.js';
import {tableParArticle} from './component.js';
import {clientCredit} from './../ModeleRegClient/service.js';
$(function () {
    loadApp();
    $('#filterDateEntet').on('click',this,function(){
        let name=ittone.getSubMenu();
        switch(name){
            case 'parArticle':
                randerTableParArticle();
                break;
            case 'parFamille':
                randerTableParFamille();
                break;
            case 'parClient':
                randerTableParClient();
            break;     
            case 'parVille':
                randerTableParVille();
            break;
        }
    });
});
const loadApp=function(){
    let name=ittone.getSubMenu();
    const startOfMonth = moment().startOf('Month').toDate();
    const endOfMonth = moment().endOf('Month').toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    switch(name){
        case 'parArticle':
            ittone.show($('.filterParArticle'));
            randerTableParArticle();
            break;
        case 'parFamille':
                ittone.show($('.filterParArticle'));
                randerTableParFamille();
                break;         
        case 'parClient':
                ittone.show($('.filterParArticle'));
                randerTableParClient();
                break;
        case 'parVille':
                ittone.show($('.filterParArticle'));
                randerTableParVille();
                break;     
    }
    //randerTable();
}

const randerTableParArticle=function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") ,
        render: function (lgnCmup) {
            return ittone.CurrencyFormat(lgnCmup);
        }}, 
        { "data": "valeur", "title": i18n.translate("valeur") ,
        render: function (valeur) {
            return ittone.CurrencyFormat(valeur);
        }},      
        { "data": "prixHT", "title": i18n.translate("prixHT"),
        render: function (prixHT) {
            return ittone.CurrencyFormat(prixHT);
        } },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let dt={
        param:[{
            idDossier:ittone.idDossier(),
            statment:name,
            dateStart:$('#dateStart').getDate(),
            dateEnd:$('#dateEnd').getDate(),
        }]
        }
    tableParArticle($.tableView,columns_title,dt);
}
const randerTableParFamille=function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let dt={
        param:[{
            idDossier:ittone.idDossier(),
            statment:name,
            dateStart:$('#dateStart').getDate(),
            dateEnd:$('#dateEnd').getDate(),
        }]
        }
    tableParArticle($.tableView,columns_title,dt);
}
const randerTableParClient=function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let dt={
        param:[{
            idDossier:ittone.idDossier(),
            statment:name,
            dateStart:$('#dateStart').getDate(),
            dateEnd:$('#dateEnd').getDate(),
        }]
        }
    tableParArticle($.tableView,columns_title,dt);
}
const randerTableParVille=function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let dt={
        param:[{
            idDossier:ittone.idDossier(),
            statment:name,
            dateStart:$('#dateStart').getDate(),
            dateEnd:$('#dateEnd').getDate(),
        }]
        }
    tableParArticle($.tableView,columns_title,dt);
}

