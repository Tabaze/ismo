

import { selectClientAll, selectClient } from './../ModeleTier/component.js';
import { clientCredit } from './../ModeleRegClient/service.js';
import { tableListChiffre } from './component.js';
$(function () {
    loadApp();
    $('#filterDateEntet').on('click', this, function () {
        let name = ittone.getSubMenu();
        switch (name) {
            case 'cacl':
                randerTablelistChiffreClient();
                break;
            case 'caar':
                randerTablelistChiffreArticle();
                break;
            case 'cafa':
                randerTablelistChiffreFamille();
                break;
        }
    });
    $('#trimistre').on('change', this, function () {
        switch ($(this).val()) {
            case 'Trimistre 1':
                $('#dateStart').setDate('01-01-2023'),
                $('#dateEnd').setDate('03-31-2023')
                break;
            case 'Trimistre 2':
                $('#dateStart').setDate('04-01-2023'),
                $('#dateEnd').setDate('06-30-2023')
                break;
            case 'Trimistre 3':
                $('#dateStart').setDate('07-01-2023'),
                $('#dateEnd').setDate('09-30-2023')
                break;
            case 'Trimistre 4':
                $('#dateStart').setDate('10-01-2023'),
                $('#dateEnd').setDate('12-31-2023')
                break;
        }
        $('#filterDateEntet').click()
    })
});
const loadApp = function () {
    let name = ittone.getSubMenu();
    const startOfMonth = moment().startOf('Month').toDate();
    const endOfMonth = moment().endOf('Month').toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    switch (name) {
        case 'cacl':
            ittone.show($('.filterParArticle'));
            randerTablelistChiffreClient();
            break;
        case 'caar':
            ittone.show($('.filterParArticle'));
            randerTablelistChiffreArticle();
            break;
        case 'cafa':
            ittone.show($('.filterParArticle'));
            randerTablelistChiffreFamille();
            break;
    }
    //randerTable();
}

const randerTablelistChiffreClient = function () {
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient"), },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"),render:(dt)=>{
            return dt.toFixed(2) + ' DH'
        } },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
            }
        },
    ];
    let dt = {
        param: [{
            idDossier: ittone.idDossier(),
            name: ittone.getSubMenu(),
            dateS: $('#dateStart').getDate(),
            dateE: $('#dateEnd').getDate(),
        }]
    }
    tableListChiffre($.tableView, columns_title, dt);
}
const randerTablelistChiffreArticle = function () {
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle"), },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"),render:(dt)=>{
            return dt.toFixed(2) + ' DH'
        } },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
            }
        },
    ];
    let dt = {
        param: [{
            idDossier: ittone.idDossier(),
            name: ittone.getSubMenu(),
            dateS: $('#dateStart').getDate(),
            dateE: $('#dateEnd').getDate(),
        }]
    }
    tableListChiffre($.tableView, columns_title, dt);
}
const randerTablelistChiffreFamille = function () {
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille"), },
        { "data": "desFamille", "title": i18n.translate("desFamille") },
        { "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"),render:(dt)=>{
            return dt.toFixed(2) + ' DH'
        } },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
            }
        },
    ];
    let dt = {
        param: [{
            idDossier: ittone.idDossier(),
            name: ittone.getSubMenu(),
            dateS: $('#dateStart').getDate(),
            dateE: $('#dateEnd').getDate(),
        }]
    }
    tableListChiffre($.tableView, columns_title, dt);
}