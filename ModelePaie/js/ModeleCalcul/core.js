import { insertUpdateAvance, AvanceById, deleteAvance } from './service.js';/* Avances */
import { insertUpdateGrpEntete, GrpEnteteById, deleteGrpEntete, GrpEnteteLastNum } from './service.js';/* Bulletins : Groupe Entete */
import { insertUpdateCalculEntete, calculBulletinPaie } from './service.js';/* Bulletins : Calcul Entete */
import { insertUpdateLigneRubrique } from './service.js';/* Bulletins : Ligne Rubrique */
import { tableAvance, tableGrpEntete, tableCalculEntete, tableLigneRubrique } from './component.js';
import { selectEmploye, tableEmploye } from '../ModeleEmploye/component.js';
import { selectRubrique } from '../ModeleCotisation/component.js';
$(function () {
    loadApp();
    $.btnCreate.on('click', this, function () {
        settingForma(false);
        switch (ittone.getSubMenu()) {
            case 'Paie_Avance': ittone.show($.modalAvance.parent()); break;
            case 'Paie_Bulletin':
                ittone.hide($.screenAfficher);
                ittone.show($.modalBulletin);
                randerTableEmploye();
                randerTableCalculEntete();
                let numPaie = (GrpEnteteLastNum()[0].numPaie) + 1;
                $('#numPaie').setVal(numPaie);
                $('#numeroPaie').text(numPaie);
                break;
        }
    });
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Paie_Avance': data.map(function (dt) {
                        if (deleteAvance({ id: dt.idAvance })) {
                            ittone.deleteRowDataTable(tableRander, dt.idAvance);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Bulletin': data.map(function (dt) {
                        if (deleteGrpEntete({ id: dt.idGrpEnt })) {
                            ittone.deleteRowDataTable(tableRander, dt.idGrpEnt);
                            ittone.success("successfully");
                        }
                    }); break;
                }
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#filterDate').on('click', this, function () {
        let name = ittone.getSubMenu();
        if (name == 'Paie_Avance') {
            randerTableAvance();
        }
    });
    $('#formAvance').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateAvance = $('#dateAvance').getDate();
            if ($.modalAvance.data('update') && role.update()) {
                data.idAvance = $.modalAvance.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateAvance(param)[0];
                if (list.idAvance) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idAvance);
                }

            } else if (!$.modalAvance.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateAvance(param)[0];
                if (list.idAvance) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalAvance.attr('id', list.idAvance);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formBulletin').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.datePaie = $('#datePaie').getDate();
            data.periodeD = $('#periodeD').getDate();
            data.periodeF = $('#periodeF').getDate();
            data.idDossier = ittone.idDossier();
            if ($.modalBulletin.data('update') && role.update()) {
                data.idGrpEnt = $.modalBulletin.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateGrpEntete(param)[0];
                if (list.idGrpEnt) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idGrpEnt);
                }
            } else if (!$.modalBulletin.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateGrpEntete(param)[0];
                if (list.idGrpEnt) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalBulletin.attr('id', list.idGrpEnt);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formRubrique').on('submit', this, function () {
        // deleteLigneRubrique({ id: $.modalLierRubrique.attr('data-id') });
        // var checkedValues = $('input[type=checkbox]:checked');
        // checkedValues.each(function () {
        //     let data = {};
        //     data.idEntete = $.modalLierRubrique.attr('data-id');
        //     data.idRubrique = $(this).attr('id');
        //     data.codeRubrique = $(this).attr('data-id');
        //     data.libelleRubrique = $(this).attr('value');
        //     data.typeRubrique = 'Rubrique';
        //     let param = {
        //         param: [data]
        //     }
        //     let list = insertUpdateLigneRubrique(param)[0];
        //     if (list.idLigne) {
        //         ittone.success('successfully');
        //     }
        // });
        ittone.success('successfully');
    });
    $('#addRubrique').on('click', this, function () {
        let idEntete = $.modalLierRubrique.attr('data-id');
        let idRubrique = $('.idRubrique').val();
        let codeRubrique = $('.idRubrique').select2('data')[0].data.codeRubrique
        let libelleRubrique = $('.idRubrique').select2('data')[0].data.libelleRubrique
        let typeRubrique = 'Rubrique'
        let taux = $('.idRubrique').select2('data')[0].data.taux
        let valeur = $('.idRubrique').select2('data')[0].data.valeur
        let dt = {
            idEntete: idEntete,
            idRubrique: idRubrique,
            codeRubrique: codeRubrique,
            libelleRubrique: libelleRubrique,
            typeRubrique: typeRubrique,
            taux: taux,
            valeur: valeur,
            statement: 'insert'
        }
        let param = { param: [dt] }
        let list = insertUpdateLigneRubrique(param)[0];
        if (list) {
            ittone.success('successfully');
            ittone.addInDataTable(tableRanderLigneRubr, list);
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Avance': randerFormAvance(tableRander.row(this).data().idAvance); break;
            case 'Paie_Bulletin': randerFormGrpEntete(tableRander.row(this).data().idGrpEnt); break;
        }
        $('select').trigger('change');
    });
    $.tableViewBulletinEmp.on('click', '.LierRubrique', function () {
        selectRubrique($('.idRubrique'));
        ittone.show($.modalLierRubrique.parent());
        setTimeout(() => { $.tableViewRubriques.find('table').DataTable().draw(false); }, 2000);
        let $tr = $(this).closest('tr');
        let row = tableRanderCalculEnt.row($tr).data();
        if (!row) {
            row = tableRanderCalculEnt.row($tr.prev()).data();
        }
        $.modalLierRubrique.attr('data-id', row.idEntete);
        randerTableLigneRubrique();
        // let data = listLigneRubrique({ idEntete: row.idEntete });
        // $('#listRubriques').html('');
        // data.forEach((element) => {
        //     if (element.checked == 1) {
        //         $('#listRubriques').append(`<div class="form-check">
        //             <input class="form-check-input" type="checkbox" value="`+ element.libelleRubrique + `" id="` + element.idRubrique +
        //             `" data-id="` + element.codeRubrique + `" checked>
        //             <label class="form-check-label" for="`+ element.idRubrique + `">
        //                 `+ (element.codeRubrique + ' - ' + element.libelleRubrique) + `
        //             </label>
        //         </div>`)
        //     }
        //     else {
        //         $('#listRubriques').append(`<div class="form-check">
        //         <input class="form-check-input" type="checkbox" value="`+ element.libelleRubrique + `" id="` + element.idRubrique +
        //             `" data-id="` + element.codeRubrique + `">
        //             <label class="form-check-label" for="`+ element.idRubrique + `">
        //                 `+ (element.codeRubrique + ' - ' + element.libelleRubrique) + `
        //             </label>
        //         </div>`)
        //     }
        // });
        // ittone.show($.modalLierRubrique.parent());
    });
    $.tableViewBulletinEmp.on('click', '.calculBulletin', function () {
        let $tr = $(this).closest('tr');
        let row = tableRanderCalculEnt.row($tr).data();
        if (!row) {
            row = tableRanderCalculEnt.row($tr.prev()).data();
        }
        let data = { idEntete: row.idEntete }
        let param = { param: [data] }
        calculBulletinPaie(param);
        ittone.success('Calcul de Bulletin de Paie avec succès');
    });
    $.tableViewBulletinEmp.on('click', '.updateLign', function () {
        let $tr = $(this).closest('tr');
        let row = tableRanderCalculEnt.row($tr).data();
        if (!row) {
            row = tableRanderCalculEnt.row($tr.prev()).data();
        }
        let data = {
            idEmploye: row.idEmploye,
            idGrpEnt: $.modalBulletin.attr('id'),
            salaireBase: row.salaireBase,
            totalBrut: 0,
            joursTravail: $tr.find('.jTrav').val(),
            hS0: $tr.find('.hS0').val(),
            hS25: $tr.find('.hS25').val(),
            hS50: $tr.find('.hS50').val(),
            hS100: $tr.find('.hS100').val(),
            idEntete: row.idEntete,
            statement: 'update'
        }
        let param = {
            param: [data]
        }
        let list = insertUpdateCalculEntete(param)[0];
        if (list.idEntete) {
            ittone.success('successfully');
            ittone.updateInDataTable(tableRanderCalculEnt, list, list.idEntete);
        }
    });
    $.tableViewRubriques.on('click', '.updateLignR', function () {
        let $tr = $(this).closest('tr');
        let row = tableRanderLigneRubr.row($tr).data();
        if (!row) {
            row = tableRanderLigneRubr.row($tr.prev()).data();
        }
        let data = {
            codeRubrique: $tr.find('.codeRubrique').val(),
            idRubrique: row.idRubrique,
            libelleRubrique: $tr.find('.libelleRubrique').val(),
            valeur: $tr.find('.valeur').val(),
            taux: $tr.find('.taux').val(),
            idEntete: $.modalLierRubrique.attr('data-id'),
            typeRubrique: 'Rubrique',
            idLigne: row.idLigne,
            statement: 'update'
        }
        let param = {
            param: [data]
        }
        let list = insertUpdateLigneRubrique(param)[0];
        if (list.idLigne) {
            ittone.success('successfully');
            ittone.updateInDataTable($.tableViewRubriques, list, list.idLigne);
        }
    });
    $('#ajouterLign').on('click', this, function () {
        let dataTableEmp = $.tableViewBulletinEmp.find('table').DataTable().rows().data().toArray();
        for (let i = 0; i < dataTableEmp.length; i++) {
            let data = {
                idEmploye: dataTableEmp[i].idEmploye,
                idGrpEnt: $.modalBulletin.attr('id'),
                salaireBase: dataTableEmp[i].salaireBase,
                totalBrut: 0,
                joursTravail: $('#trav').val(),
                hS0: $('#hs0').val(),
                hS25: $('#hs25').val(),
                hS50: $('#hs50').val(),
                hS100: $('#hs100').val(),
                idEntete: dataTableEmp[i].idEntete,
                statement: 'update'
            }
            let param = {
                param: [data]
            }
            let list = insertUpdateCalculEntete(param)[0];
            if (list.idEntete) {
                ittone.success('successfully');
                ittone.updateInDataTable(tableRanderCalculEnt, list, list.idEntete);
            }
        }
        settingFormLine();
    });
    $('#ajouterEmploye').on('click', this, function () {
        let dataEmploye = $('.tableEmployes').find('table').DataTable().rows({ selected: true }).data().toArray();
        for (let i = 0; i < dataEmploye.length; i++) {
            let data = {
                idEmploye: dataEmploye[i].idEmploye,
                idGrpEnt: $.modalBulletin.attr('id'),
                salaireBase: dataEmploye[i].salaireBase,
                totalBrut: 0,
                joursTravail: 26,
                hS0: 0,
                hS25: 0,
                hS50: 0,
                hS100: 0,
            }
            data.statement = 'insert';
            let param = {
                param: [data]
            }
            let list = insertUpdateCalculEntete(param)[0];
            if (list) {
                ittone.success('successfully');
                settingForma(true);
                ittone.addInDataTable(tableRanderCalculEnt, list);
                settingFormLine();
            }
        }
    });
    $('.idEmploye').on('change', this, function () {
        let data = $('.idEmploye').select2('data')[0].data;
        if (data) {
            $('#matricule').setVal(data.matricule);
        }
        else {
            $('#matricule').setVal('');
        }
    });
    $.tableViewBulletinEmp.on('click', '.TelechargerBulletin', function () {
        let $tr = $(this).closest('tr');
        let row = tableRanderCalculEnt.row($tr).data();
        if (!row) {
            row = tableRanderCalculEnt.row($tr.prev()).data();
        }
        let url = window.location.origin+"/imprimant/entet/BulletinDePaie/index.html?id=" + row.idEntete;
        let win = window.open(url, '_blank');
        win.focus();
    });
});
var tableRander;
var tableRanderE;
var tableRanderCalculEnt;
var tableRanderLigneRubr;
const loadApp = function () {
    let name = ittone.getSubMenu();
    let dateDossier = ittone.dateExeDossier();
    const startOfMonth = moment().startOf('Month').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    const endOfMonth = moment().endOf('Month').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    switch (name) {
        case 'Paie_Avance': selectEmploye($('.idEmploye')); randerTableAvance(); break;
        case 'Paie_Bulletin': selectEmploye($('.idEmploye')); randerTableGrpEntete(); break;
    }
}
const randerTableAvance = function () {
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        {
            "data": "montant", "title": i18n.translate("montant"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
        {
            "data": "dateAvance", "title": i18n.translate("dateAvance"),
            render: function (dateAvance) {
                return ittone.convertDate(dateAvance);
            }
        },
    ];
    let dt = {
        dateD: $('#dateStart').getDate(),
        dateE: $('#dateEnd').getDate(),
    }
    let param = {
        param: [dt]
    }
    tableRander = tableAvance($.tableView, columns_title, param);
}
const randerFormAvance = function (id) {
    let list = AvanceById({ id: id })[0];
    $.modalAvance.attr('id', id);
    ittone.convertJsonToForm($('#formAvance'), list);
    $('#dateAvance').setDate(list.dateAvance);
    ittone.show($.modalAvance.parent());
    settingForma(true);
}
const randerTableEmploye = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "prenomEmployee", "title": i18n.translate("prenomEmployee") },
    ];
    tableRanderE = tableEmploye($('.tableEmployes'), columns_title);
}
const randerTableGrpEntete = function () {
    let columns_title = [
        { "data": "numPaie", "title": i18n.translate("numPaie") },
        {
            "data": "datePaie", "title": i18n.translate("datePaie"),
            render: function (datePaie) {
                return ittone.convertDate(datePaie);
            }
        },
        {
            "data": "periodeD", "title": i18n.translate("periodeD"),
            render: function (periodeD) {
                return ittone.convertDate(periodeD);
            }
        },
        {
            "data": "periodeF", "title": i18n.translate("periodeF"),
            render: function (periodeF) {
                return ittone.convertDate(periodeF);
            }
        },
    ];
    tableRander = tableGrpEntete($.tableView, columns_title);
}
const randerFormGrpEntete = function (id) {
    let list = GrpEnteteById({ id: id })[0];
    $.modalBulletin.attr('id', id);
    ittone.convertJsonToForm($('#formBulletin'), list);
    $('#datePaie').setDate(list.datePaie);
    $('#periodeD').setDate(list.periodeD);
    $('#periodeF').setDate(list.periodeF);
    $('#numeroPaie').text(list.numPaie);
    settingForma(true);
    ittone.hide($.screenAfficher);
    ittone.show($.modalBulletin);
    randerTableEmploye();
    randerTableCalculEntete();
}
const randerTableCalculEntete = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        {
            "data": "joursTravail", "title": i18n.translate("joursTravail"),
            render: function (joursTravail) {
                return `<input type="text" class="form-control form-control-lg jTrav" value="` + joursTravail + `" /> `
            }
        },
        {
            "data": "hS0", "title": i18n.translate("hS0"),
            render: function (hS0) {
                return `<input type="text" class="form-control form-control-lg hS0" value="` + hS0 + `" /> `
            }
        },
        {
            "data": "hS25", "title": i18n.translate("hS25"),
            render: function (hS25) {
                return `<input type="text" class="form-control form-control-lg hS25" value="` + hS25 + `" /> `
            }
        },
        {
            "data": "hS50", "title": i18n.translate("hS50"),
            render: function (hS50) {
                return `<input type="text" class="form-control form-control-lg hS50" value="` + hS50 + `" /> `
            }
        },
        {
            "data": "hS100", "title": i18n.translate("hS100"),
            render: function (hS100) {
                return `<input type="text" class="form-control form-control-lg hS100" value="` + hS100 + `" /> `
            }
        },
        {
            "data": "matricule", "title": "",
            render: function (matricule) {
                return `<button type="button" class="fs-6 btn btn-floating deleteLign">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" class="fs-6 btn btn-floating updateLign">
                    <i class="fa-solid fa-check"></i>
                </button>
                `
            }
        },
        {
            "data": "matricule", "title": "",
            render: function (matricule) {
                return `<div class="dropdown">
                <button class="btn btn-floating dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item LierRubrique" href="#">Lier Rubrique</a></li>
                  <li><a class="dropdown-item calculBulletin" href="#">Calculer bulletin de paie</a></li>
                  <li><a class="dropdown-item TelechargerBulletin" href="#">Télécharger Bulletin de paie</a></li>
                </ul>
              </div>
                `
            }
        }
    ];
    let dt = {
        idGrpEnt: $.modalBulletin.attr('id') || -1
    }
    tableRanderCalculEnt = tableCalculEntete($.tableViewBulletinEmp, columns_title, dt);
}
const randerTableLigneRubrique = function () {
    let columns_title = [
        {
            "data": "codeRubrique", "title": i18n.translate("codeRubrique"),
            render: function (codeRubrique) {
                return `<input type="text" class="form-control form-control-lg codeRubrique" value="` + codeRubrique + `" /> `
            }
        },
        {
            "data": "libelleRubrique", "title": i18n.translate("libelleRubrique"),
            render: function (libelleRubrique) {
                return `<input type="text" class="form-control form-control-lg libelleRubrique" value="` + libelleRubrique + `" /> `
            }
        },
        {
            "data": "valeur", "title": i18n.translate("valeur"),
            render: function (valeur) {
                return `<input type="text" class="form-control form-control-lg valeur" value="` + valeur + `" /> `
            }
        },
        {
            "data": "taux", "title": i18n.translate("taux"),
            render: function (taux) {
                return `<input type="text" class="form-control form-control-lg taux" value="` + taux + `" /> `
            }
        },
        {
            "data": "taux", "title": "",
            render: function (taux) {
                return `<button type="button" class="fs-6 btn btn-floating deleteLignR">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" class="fs-6 btn btn-floating updateLignR">
                    <i class="fa-solid fa-check"></i>
                </button>
                `
            }
        }
    ];
    let dt = {
        idEntete: $.modalLierRubrique.attr('data-id')
    }
    tableRanderLigneRubr = tableLigneRubrique($.tableViewRubriques, columns_title, dt);
}
