import { insertUpdateEmploye, EmployeById, deleteEmploye, insertCotisationEmploye } from './service.js'; /*Employés*/
import { insertUpdateContrat, ContratById, deleteContrat } from './service.js'; /*Contrat*/
import { insertUpdateConge, CongeById, deleteConge } from './service.js'; /*Congés*/
import { insertUpdatePret, PretById, deletePret } from './service.js'; /*Prets*/
import { tableEmploye, selectEmploye, tableContrat, tableConge, tablePret, tableEmployeCotis, selectUsersDevice } from './component.js';
import { selectNiveau, selectDepartement, selectCategorie, selectFonction, selectContrat } from '../ModeleInfos/component.js';
import { selectCotisation } from '../ModeleCotisation/component.js';
import { insertUpdateCotisation, CotisationById } from '../ModeleCotisation/service.js';
import { selectPlanning } from '../ModelePointage/component.js';
import { selectVille, selectModRglm } from '../../../js/ModeleBase/component.js';
import { initFile } from '../../../js/uploadFiles.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Paie_Employe': data.map(function (dt) {
                        if (deleteEmploye({ id: dt.idEmploye })) {
                            ittone.deleteRowDataTable(tableRander, dt.idEmploye);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Contrat': data.map(function (dt) {
                        if (deleteContrat({ id: dt.idContrat })) {
                            ittone.deleteRowDataTable(tableRander, dt.idContrat);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Conges': data.map(function (dt) {
                        if (deleteConge({ id: dt.idConge })) {
                            ittone.deleteRowDataTable(tableRander, dt.idConge);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Pret': data.map(function (dt) {
                        if (deletePret({ id: dt.idPret })) {
                            ittone.deleteRowDataTable(tableRander, dt.idPret);
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
    $('#formEmploye').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateNaissance = $('#dateNaissance').getDate();
            data.dateAssurVie = $('#dateAssurVie').getDate();
            data.dateAssurRetraite = $('#dateAssurRetraite').getDate();
            data.dateEntree = $('#dateEntree').getDate();
            data.dateSortie = $('#dateSortie').getDate();
            data.checkSortie = $('#checkSortie').is(':checked');
            data.checkPointage = $('#checkPointage').is(':checked');
            data.salaireFix = $('#salaireFix').is(':checked');
            if ($('#photo').closest('.circular_image.changed').length) {
                let fileName = data.matricule + "_" + Date.now();
                data.photo = ittone.UploaderImage($('#photo'), 'image/data/employes/', fileName);
            }
            if (!data.idUserDevice) {
                data.idUserDevice = null;
            }
            if (!data.idPlanning) {
                data.idPlanning = null;
            }
            if (!data.idCategorie) {
                data.idCategorie = null;
            }
            if (!data.idDepartement) {
                data.idDepartement = null;
            }
            if (!data.idFonction) {
                data.idFonction = null;
            }
            if (!data.idNiveau) {
                data.idNiveau = null;
            }
            if ($.modalEmploye.data('update') && role.update()) {
                data.idEmploye = $.modalEmploye.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateEmploye(param)[0];
                if (list.idEmploye) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idEmploye);
                }

            } else if (!$.modalEmploye.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateEmploye(param)[0];
                if (list.idEmploye) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalEmploye.attr('id', list.idEmploye);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formCotisation').on('submit', this, function () {
        let data = ittone.convertFormToJSON($(this));
        console.log($.modalCotisation.data())
        if ($.modalCotisation.data('update') && role.update()) {
            data.idCotisation = $.modalCotisation.attr('id');
            data.statement = 'update';
            let param = {
                param: [data]
            }
            let list = insertUpdateCotisation(param)[0];
            if (list.idCotisation) {
                ittone.success('successfully');
                ittone.updateInDataTable(tableRanderC, list, list.idCotisation);
            }
        }
    });
    $('#formContrat').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateContrat = $('#dateContrat').getDate();
            data.periodeD = $('#periodeD').getDate();
            data.periodeF = $('#periodeF').getDate();
            if ($.modalContrat.data('update') && role.update()) {
                data.idContrat = $.modalContrat.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateContrat(param)[0];
                if (list.idContrat) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idContrat);
                }

            } else if (!$.modalContrat.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateContrat(param)[0];
                if (list.idContrat) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalContrat.attr('id', list.idContrat);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formConge').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalConge.data('update') && role.update()) {
                data.idConge = $.modalConge.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateConge(param)[0];
                if (list.idConge) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idConge);
                }

            } else if (!$.modalConge.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateConge(param)[0];
                if (list.idConge) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalConge.attr('id', list.idConge);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formPret').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateEcheanceD = $('#dateEcheanceD').getDate();
            data.dateEcheanceF = $('#dateEcheanceF').getDate();
            if ($.modalPret.data('update') && role.update()) {
                data.idPret = $.modalPret.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePret(param)[0];
                if (list.idPret) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idPret);
                }

            } else if (!$.modalPret.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePret(param)[0];
                if (list.idPret) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalPret.attr('id', list.idPret);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe':
                randerFormEmploye(tableRander.row(this).data().idEmploye);
                setTimeout(() => { $('.tableView.Cotis').find('table').DataTable().draw(false); }, 3000);
                break;
            case 'Paie_Conges': randerFormConge(tableRander.row(this).data().idConge); break;
            case 'Paie_Contrat':
                randerFormContrat(tableRander.row(this).data().idContrat);
                ittone.show($('.fileDiv'));
                break;
            // case 'Paie_Cotisation': randerFormCotisation(tableRander.row(this).data().idCotisation); break;
            case 'Paie_Pret': randerFormPret(tableRander.row(this).data().idPret); break;
        }
        $('select').trigger('change');
    });
    $('#file').on('click', this, function () {
        let id = $.modalContrat.attr('id');
        initFile('Paie_Contrat', id);
    });
    $.btnAddCotis.on('click', this, function () {
        let idEmploye = $.modalEmploye.attr('id');
        let idCotisation = $('.idCotisation').val();
        let codeCotis = $('.idCotisation').select2('data')[0].data.codeCotis
        let dt = {
            idEmploye: idEmploye,
            idCotisation: idCotisation,
            codeCotis: codeCotis
        }
        let param = { param: [dt] }
        let list = insertCotisationEmploye(param)[0];
        if (list) {
            ittone.success('successfully');
            ittone.addInDataTable(tableRanderC, list, list.idCotisation);
        }
    });
    // $.tableViewCotis.on('dblclick', this, function () {
    //     switch (ittone.getSubMenu()) {
    //         case 'Paie_Employe':
    //             ittone.show($.modalCotisation.parent());
    //             randerFormCotisation($.tableViewCotis.find('tr.selected').data().id);
    //             $.modalCotisation.data('update', true);
    //             break;
    //     }
    // });
    $.tableViewCotis.on('click', '.updateLign', function () {
        let $tr = $(this).closest('tr');
        let row = tableRanderC.row($tr).data();
        if (!row) {
            row = tableRanderC.row($tr.prev()).data();
        }
        let data = {
            codeCotis: $tr.find('.codeCotis').val(),
            idCotisation: row.idCotisation,
            libelleCotis: $tr.find('.libelleCotis').val(),
            partSalariel: $tr.find('.partSalariel').val(),
            cotisationPatr: $tr.find('.cotisationPatr').val(),
            plafond: $tr.find('.plafond').val(),
            formationProf:row.formationProf,
            prestationSoc:row.prestationSoc,
            tauxMajoration1:row.tauxMajoration1,
            tauxMajorationAutres:row.tauxMajorationAutres,
            tauxPenalite:row.tauxPenalite,
            allFamilial:row.allFamilial,
            statement: 'update'
        }
        let param = {
            param: [data]
        }
        let list = insertUpdateCotisation(param)[0];
        if (list.idCotisation) {
            ittone.success('successfully');
            ittone.updateInDataTable($.tableViewCotis, list, list.idCotisation);
        }
    });
});
var tableRander;
var tableRanderC;
const loadApp = function () {
    let name = ittone.getSubMenu();
    switch (name) {
        case 'Paie_Employe':
            selectVille($('#idVille'));
            selectModRglm($('#idModRglm'));
            selectNiveau($('#idNiveau'));
            selectDepartement($('#idDepartement'));
            selectCategorie($('#idCategorie'));
            selectFonction($('#idFonction'));
            selectCotisation($('.idCotisation'));
            selectUsersDevice($('#idUserDevice'));
            selectPlanning($('#idPlanning'));
            randerTableEmploye();
            break;
        case 'Paie_Conges':
            selectEmploye($('.idEmploye'));
            randerTableConge();
            break;
        case 'Paie_Contrat':
            selectEmploye($('.idEmploye'));
            selectContrat($('#idProfil'));
            randerTableContrat();
            break;
        // case 'Paie_Cotisation':
        //     selectEmploye($('.idEmploye'));
        //     ittone.hide($.btnCreate);
        //     // randerTableCotisation();
        //     break;
        case 'Paie_Pret':
            selectEmploye($('.idEmploye'));
            randerTablePret();
            break;
    }
}
const randerTableEmploye = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "enrolNumber", "title": i18n.translate("enrolNumber") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "prenomEmployee", "title": i18n.translate("prenomEmployee") },
        { "data": "cinEmployee", "title": i18n.translate("cinEmployee") },
        { "data": "telephone", "title": i18n.translate("telephone") },
        { "data": "busStation", "title": i18n.translate("busStation") },
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
        { "data": "nomFonction", "title": i18n.translate("nomFonction") },
        {
            "data": "dateNaissance", "title": i18n.translate("dateNaissance"),
            render: function (dateNaissance) {
                return ittone.convertDate(dateNaissance);
            }
        },
        {
            "data": "dateEntree", "title": i18n.translate("dateEntree"),
            render: function (dateEntree) {
                return ittone.convertDate(dateEntree);
            }
        },
        { "data": "typePaie", "title": i18n.translate("typePaie") },
    ];
    tableRander = tableEmploye($.tableView, columns_title);
}
const randerFormEmploye = function (id) {
    let list = EmployeById({ id: id })[0];
    $.modalEmploye.attr('id', id);
    ittone.convertJsonToForm($('#formEmploye'), list);
    $('#dateNaissance').setDate(list.dateNaissance);
    $('#dateAssurVie').setDate(list.dateAssurVie);
    $('#dateAssurRetraite').setDate(list.dateAssurRetraite);
    $('#dateEntree').setDate(list.dateEntree);
    $('#dateSortie').setDate(list.dateSortie);
    $('#checkSortie').setChecked(list.checkSortie);
    $('#checkPointage').setChecked(list.checkPointage);
    $('#salaireFix').setChecked(list.salaireFix);
    if (list.photo) {
        $('#photo').closest('.circular_image').css('background-image', "url('" + ittone.pathImgEmploye + list.photo + "')");
    } else {
        $('#photo').closest('.circular_image').css('background-image', "url('" + ittone.defaultImgEmploye + "')");
    }
    ittone.show($.modalEmploye.parent());
    settingForma(true);
    randerTableEmpCotis();
}
const randerTableConge = function () {
    let columns_title = [
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "annee", "title": i18n.translate("annee") },
        { "data": "jCongeN_1", "title": i18n.translate("jCongeN_1") },
        { "data": "jCongeN", "title": i18n.translate("jCongeN") },
        { "data": "jConsommes", "title": i18n.translate("jConsommes") },
        { "data": "jRestes", "title": i18n.translate("jRestes") },
    ];
    tableRander = tableConge($.tableView, columns_title);
}
const randerFormConge = function (id) {
    let list = CongeById({ id: id })[0];
    $.modalConge.attr('id', id);
    ittone.convertJsonToForm($('#formConge'), list);
    ittone.show($.modalConge.parent());
    settingForma(true);
}
const randerTableContrat = function () {
    let columns_title = [
        { "data": "numContrat", "title": i18n.translate("numContrat") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "nomProfil", "title": i18n.translate("nomProfil") },
        {
            "data": "dateContrat", "title": i18n.translate("dateContrat"),
            render: function (dateContrat) {
                return ittone.convertDate(dateContrat);
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
    tableRander = tableContrat($.tableView, columns_title);
}
const randerFormContrat = function (id) {
    let list = ContratById({ id: id })[0];
    $.modalContrat.attr('id', id);
    ittone.convertJsonToForm($('#formContrat'), list);
    $('#dateContrat').setDate(list.dateContrat);
    $('#periodeD').setDate(list.periodeD);
    $('#periodeF').setDate(list.periodeF);
    ittone.show($.modalContrat.parent());
    settingForma(true);
}
const randerTablePret = function () {
    let columns_title = [
        { "data": "nbEcheance", "title": i18n.translate("nbEcheance") },
        { "data": "montantEcheance", "title": i18n.translate("montantEcheance") },
        { "data": "montantDernierEcheance", "title": i18n.translate("montantDernierEcheance") },
        { "data": "codeRubrique", "title": i18n.translate("codeRubrique") },
    ];
    tableRander = tablePret($.tableView, columns_title);
}
const randerFormPret = function (id) {
    let list = PretById({ id: id })[0];
    $.modalPret.attr('id', id);
    ittone.convertJsonToForm($('#formPret'), list);
    $('#dateEcheanceD').setDate(list.dateEcheanceD);
    $('#dateEcheanceF').setDate(list.dateEcheanceF);
    ittone.show($.modalPret.parent());
    settingForma(true);
}
const randerTableEmpCotis = function () {
    let idEmploye = $.modalEmploye.attr('id');
    let columns_title = [
        {
            "data": "codeCotis", "title": i18n.translate("codeCotis"),
            render: function (codeCotis) {
                return `<input type="text" class="form-control form-control-lg codeCotis" value="` + codeCotis + `" /> `
            }
        },
        {
            "data": "libelleCotis", "title": i18n.translate("libelleCotis"),
            render: function (libelleCotis) {
                return `<input type="text" class="form-control form-control-lg libelleCotis" value="` + libelleCotis + `" /> `
            }
        },
        {
            "data": "partSalariel", "title": i18n.translate("partSalariel"),
            render: function (partSalariel) {
                return `<input type="text" class="form-control form-control-lg partSalariel" value="` + partSalariel + `" /> `
            }
        },
        {
            "data": "cotisationPatr", "title": i18n.translate("cotisationPatr"),
            render: function (cotisationPatr) {
                return `<input type="text" class="form-control form-control-lg cotisationPatr" value="` + cotisationPatr + `" /> `
            }
        },
        {
            "data": "plafond", "title": i18n.translate("plafond"),
            render: function (plafond) {
                return `<input type="text" class="form-control form-control-lg plafond" value="` + plafond + `" /> `
            }
        },
        {
            "data": "plafond", "title": "",
            render: function (plafond) {
                return `<button type="button" class="fs-6 btn btn-floating deleteLign">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" class="fs-6 btn btn-floating updateLign">
                    <i class="fa-solid fa-check"></i>
                </button>
                `
            }
        }
    ];
    let dt = {
        id: idEmploye
    }
    tableRanderC = tableEmployeCotis($.tableViewCotis, columns_title, dt);
}
const randerFormCotisation = function (id) {
    let list = CotisationById({ id: id })[0];
    $.modalCotisation.attr('id', id);
    ittone.convertJsonToForm($('#formCotisation'), list);
    ittone.show($.modalCotisation.parent());
    // settingForma(true);
}
// const randerTableCotisation = function () {
//     let columns_title = [
//         { "data": "code", "title": i18n.translate("code") },
//         { "data": "libelle", "title": i18n.translate("libelle") },
//         { "data": "nImmatriculation", "title": i18n.translate("nImmatriculation") },
//         { "data": "dateAffiliation", "title": i18n.translate("dateAffiliation") },
//         { "data": "tauxSal", "title": i18n.translate("tauxSal") },
//         { "data": "valeur", "title": i18n.translate("valeur") },
//         { "data": "formule", "title": i18n.translate("formule") },
//         { "data": "partSalarial", "title": i18n.translate("partSalarial") },
//         { "data": "cotisationPatro", "title": i18n.translate("cotisationPatro") },
//         { "data": "plafond", "title": i18n.translate("plafond") },
//     ];
//     tableRander = tableCotisation($.tableView, columns_title);
// }
// const randerFormCotisation = function (id) {
//     let list = CotisationById({ id: id })[0];
//     $.modalCotisation.attr('id', id);
//     ittone.convertJsonToForm($('#formCotisation'), list);
//     ittone.show($.modalCotisation.parent());
//     settingForma(true);
// }
