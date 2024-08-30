import { insertUpdateDepot, depotById, deleteDepot, OriContactById, deleteOriContact, deleteIndustrie, deleteCategorie, deleteType, deletePotClient, deleteRelation, deleteRebrique, deleteWoo, deleteActionType,  } from './service.js';/* Depot */
import { insertUpdateDepotSup, depotSupById, deleteDepotSup } from './service.js';/* Depot */
import { insertUpdateTresor, tresorById, deleteTresor } from './service.js';/* Tresor */
import { insertUpdateVille, villeById, deleteVille } from './service.js';/* Ville */
import { insertUpdatePays, paysById, deletePays } from './service.js';/* Pays */
import { insertUpdateModRglm, modRglmById, deleteModRglm } from './service.js';/* ModRglm */
import { insertUpdateTaxe, taxeById, deleteTaxe } from './service.js';/* Taxe */
import { insertUpdateService, serviceById, deleteService } from './service.js';/* Service */
import { InsertUpdateUniteMesure, uniteById, deleteUnite } from './service.js';/* Unité Mesure */
import { insertUpdatePropriete, ProprieteById, deletePropriete } from './service.js';/* Propriété */
import {
    selectVille, selectPays, selectDepot, tableDepot, tableTresor,
    tableVille, tablePays, tableModRglm, tableTaxe, tableDepotSup, tableService,
    tableUniteMesure, tablePropriete, tableOriContact, templateOrigine, templateIndustrie,
    tableIndustrie, tableCategorie, templateCategorie, tableType,
    templateType, tablePotClient, templatePotClient, tableRelation,
    templateRelation, tableRebrique, templateRebrique, templateWoo, tableWoo, getWooCate
} from './component.js';
import { tableTypeAction, templateActionType } from '../ModeleTier/component.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Depot': data.map(function (dt) {
                        if (deleteDepot({ id: dt.idDepot })) {
                            ittone.deleteRowDataTable(tableRander, dt.idDepot);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'DepotSup': data.map(function (dt) {
                        if (deleteDepotSup({ id: dt.idSupDepot })) {
                            ittone.deleteRowDataTable(tableRander, dt.idSupDepot);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Tresororie': data.map(function (dt) {
                        if (deleteTresor({ id: dt.idTreso })) {
                            ittone.deleteRowDataTable(tableRander, dt.idTreso);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Ville': data.map(function (dt) {
                        if (deleteVille({ id: dt.idVille })) {
                            ittone.deleteRowDataTable(tableRander, dt.idVille);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Pays': data.map(function (dt) {
                        if (deletePays({ id: dt.id })) {
                            ittone.deleteRowDataTable(tableRander, dt.id);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'ModRglm': data.map(function (dt) {
                        if (deleteModRglm({ id: dt.idModRglm })) {
                            ittone.deleteRowDataTable(tableRander, dt.idModRglm);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Taxe': data.map(function (dt) {
                        if (deleteTaxe({ id: dt.idTaxe })) {
                            ittone.deleteRowDataTable(tableRander, dt.idTaxe);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Service': data.map(function (dt) {
                        if (deleteService({ id: dt.idService })) {
                            ittone.deleteRowDataTable(tableRander, dt.idService);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'uniteMesure': data.map(function (dt) {
                        if (deleteUnite({ id: dt.idUnite })) {
                            ittone.deleteRowDataTable(tableRander, dt.idUnite);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Propriete': data.map(function (dt) {
                        if (deletePropriete({ id: dt.idPropriete })) {
                            ittone.deleteRowDataTable(tableRander, dt.idPropriete);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'OriContact': data.map(function (dt) {
                        if (deleteOriContact({ id: dt.idOrigine })) {
                            ittone.deleteRowDataTable(tableRander, dt.idOrigine);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Industrie': data.map(function (dt) {
                        if (deleteIndustrie({ id: dt.idIndustrie })) {
                            ittone.deleteRowDataTable(tableRander, dt.idIndustrie);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Categorie': data.map(function (dt) {
                        if (deleteCategorie({ id: dt.idCategorie })) {  
                            ittone.deleteRowDataTable(tableRander, dt.idCategorie);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Type': data.map(function (dt) {
                        if (deleteType({ id: dt.idType })) {
                            ittone.deleteRowDataTable(tableRander, dt.idType);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'PotClient': data.map(function (dt) {
                        if (deletePotClient({ id: dt.idPotClient })) {
                            ittone.deleteRowDataTable(tableRander, dt.idPotClient);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Relation': data.map(function (dt) {
                        if (deleteRelation({ id: dt.idRelation })) {
                            ittone.deleteRowDataTable(tableRander, dt.idRelation);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Rebrique': data.map(function (dt) {
                        if (deleteRebrique({ id: dt.idRebrique })) {
                            ittone.deleteRowDataTable(tableRander, dt.idRebrique);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'CategorieWoo': data.map(function (dt) {
                        ittone.deleteWooData(dt.idWoo,'categorie')
                        if (deleteWoo({ id: dt.idWoo })) {
                            ittone.deleteRowDataTable(tableRander, dt.idWoo);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'TypeAction': data.map(function (dt) {
                        if (deleteActionType({ id: dt.idTypeAction })) {
                            ittone.deleteRowDataTable(tableRander, dt.idTypeAction);
                            ittone.success("successfully");
                        }
                    }); break;
                }
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("Rien n'est Selectionné");
        }
    });
    $('#formDepot').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.prcpDepot = $('#prcpDepot').is(':checked');
            if ($.modalDepot.data('update') && role.update()) {
                data.idDepot = $.modalDepot.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDepot(param)[0];
                if (list.idDepot) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idDepot);
                }

            } else if (!$.modalDepot.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDepot(param)[0];
                if (list.idDepot) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalDepot.attr('id', list.idDepot);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formDepotSup').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalDepotSup.data('update') && role.update()) {
                data.idSupDepot = $.modalDepotSup.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDepotSup(param)[0];
                if (list.idSupDepot) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idSupDepot);
                }

            } else if (!$.modalDepotSup.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDepotSup(param)[0];
                if (list.idSupDepot) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalDepotSup.attr('id', list.idSupDepot);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formTresor').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.defaultTreso = $('#defaultTreso').is(':checked');
            if ($.modalTresor.data('update') && role.update()) {
                data.idTreso = $.modalTresor.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateTresor(param)[0];
                if (list.idTreso) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idTreso);
                }

            } else if (!$.modalTresor.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateTresor(param)[0];
                if (list.idTreso) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalTresor.attr('id', list.idTreso);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formVille').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalVille.data('update') && role.update()) {
                data.idVille = $.modalVille.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateVille(param)[0];
                if (list.idVille) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idVille);
                }

            } else if (!$.modalVille.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateVille(param)[0];
                if (list.idVille) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalVille.attr('id', list.idVille);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formPays').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            console.log(data)
            if ($.modalPays.data('update') && role.update()) {
                data.idPays = $.modalPays.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePays(param)[0];
                if (list.id) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.id);
                }

            } else if (!$.modalPays.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePays(param)[0];
                if (list.id) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalPays.attr('id', list.id);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formModRglm').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalModRglm.data('update') && role.update()) {
                data.idModRglm = $.modalModRglm.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateModRglm(param)[0];
                if (list.idModRglm) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idModRglm);
                }

            } else if (!$.modalModRglm.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateModRglm(param)[0];
                if (list.idModRglm) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalModRglm.attr('id', list.idModRglm);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formTaxe').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalTaxe.data('update') && role.update()) {
                data.idTaxe = $.modalTaxe.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateTaxe(param)[0];
                if (list.idTaxe) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idTaxe);
                }

            } else if (!$.modalTaxe.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateTaxe(param)[0];
                if (list.idTaxe) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalTaxe.attr('id', list.idTaxe);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formService').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalService.data('update') && role.update()) {
                data.idService = $.modalService.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateService(param)[0];
                if (list.idService) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idService);
                }

            } else if (!$.modalService.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateService(param)[0];
                if (list.idService) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalService.attr('id', list.idService);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formUniteMesure').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.prcpUnite = $('#prcpUnite').is(':checked');
            if ($.modalUnite.data('update') && role.update()) {
                data.idUnite = $.modalUnite.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateUniteMesure(param)[0];
                if (list.idUnite) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idUnite);
                }

            } else if (!$.modalUnite.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateUniteMesure(param)[0];
                if (list.idUnite) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalUnite.attr('id', list.idUnite);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formPropriete').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalPropriete.data('update') && role.update()) {
                data.idPropriete = $.modalPropriete.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePropriete(param)[0];
                if (list.idPropriete) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idPropriete);
                }

            } else if (!$.modalPropriete.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePropriete(param)[0];
                if (list.idPropriete) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalPropriete.attr('id', list.idPropriete);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Depot': rabderFormDepot(tableRander.row(this).data().idDepot); break;
            case 'DepotSup': rabderFormDepotSup(tableRander.row(this).data().idSupDepot); break;
            case 'Tresororie': randerFormTreso(tableRander.row(this).data().idTreso); break;
            case 'Ville': randerFormVille(tableRander.row(this).data().idVille); break;
            case 'Pays': randerFormPays(tableRander.row(this).data().id); break;
            case 'ModRglm': randerFormModRglm(tableRander.row(this).data().idModRglm); break;
            case 'Taxe': randerFormTaxe(tableRander.row(this).data().idTaxe); break;
            case 'Service': randerFormService(tableRander.row(this).data().idService); break;
            case 'uniteMesure': randerFormUnite(tableRander.row(this).data().idUnite); break;
            case 'Propriete': randerFormPropriete(tableRander.row(this).data().idPropriete); break;
            case 'Categorie': templateCategorie(tableRander, tableRander.row(this).data().idCategorie); break;
            case 'OriContact': templateOrigine(tableRander, tableRander.row(this).data().idOrigine); break;
            case 'Industrie': templateIndustrie(tableRander, tableRander.row(this).data().idIndustrie); break;
            case 'Type': templateType(tableRander, tableRander.row(this).data().idType); break;
            case 'PotClient': templatePotClient(tableRander, tableRander.row(this).data().idPotClient); break;
            case 'Relation': templateRelation(tableRander, tableRander.row(this).data().idRelation); break;
            case 'Rebrique': templateRebrique(tableRander, tableRander.row(this).data().idRebrique); break;
            case 'CategorieWoo': templateWoo(tableRander, tableRander.row(this).data().idWoo); break;
            case 'TypeAction': templateActionType(tableRander, tableRander.row(this).data().idTypeAction); break;
        }
        $('select').trigger('change');
    });
    $.btnCreate.on('click', this, function () {
        settingForma(false);
        switch (ittone.getSubMenu()) {
            case 'Depot': ittone.show($.modalDepot.parent()); break;
            case 'DepotSup': ittone.show($.modalDepotSup.parent()); break;
            case 'Tresororie': ittone.show($.modalTresor.parent()); break;
            case 'Ville': ittone.show($.modalVille.parent()); break;
            case 'Pays': ittone.show($.modalPays.parent()); break;
            case 'ModRglm': ittone.show($.modalModRglm.parent()); break;
            case 'Taxe': ittone.show($.modalTaxe.parent()); break;
            case 'Service': ittone.show($.modalService.parent()); break;
            case 'uniteMesure': ittone.show($.modalUnite.parent()); break;
            case 'Propriete': ittone.show($.modalPropriete.parent()); break;
            case 'OriContact': templateOrigine(tableRander); break;
            case 'Industrie': templateIndustrie(tableRander); break;
            case 'Categorie': templateCategorie(tableRander); break;
            case 'Categorie': templateCategorie(tableRander); break;
            case 'Type': templateType(tableRander); break;
            case 'PotClient': templatePotClient(tableRander); break;
            case 'Relation': templateRelation(tableRander); break;
            case 'Rebrique': templateRebrique(tableRander); break;
            case 'CategorieWoo': templateWoo(tableRander); break;
            case 'TypeAction': templateActionType(tableRander);break;
        }
    });
    $('#idPays').on('change', this, function () {
        if (!$(this).val()) return
        let dt = { id: $(this).val() }
        selectVille($('#idVille'), dt)
    })
    $('#importer').on('click', this, () => {
        getWooCate(tableRander)
        ittone.success('successfully');
    })
});
var tableRander;
const loadApp = function () {
    let name = ittone.getSubMenu();
    switch (name) {
        case 'Depot': selectPays($('#idPays'));; randerTableDepot(); break;
        case 'DepotSup': selectDepot($('[name=idDepot]')); randerTableDepotSup(); break;
        case 'Tresororie': randerTableTresor(); break;
        case 'Ville': randerTableVille();selectPays($('select[name=idPays]')); break;
        case 'Pays': randerTablePays(); break;
        case 'ModRglm': randerTableModRglm(); break;
        case 'Taxe': randerTableTaxe(); break;
        case 'Service': randerTableService(); break;
        case 'uniteMesure': randerTableUnite(); break;
        case 'Propriete': randerTablePropriete(); break;
        case 'OriContact': randerTablelistOriContact(); break;
        case 'Industrie': randerTablelistIndustrie(); break;
        case 'Categorie': randerTablelistCategorie(); break;
        case 'Type': randerTablelistType(); break;
        case 'PotClient': randerTablelistPotClient(); break;
        case 'Relation': randerTablelistRelation(); break;
        case 'Rebrique': randerTablelistRebrique(); break;
        case 'CategorieWoo':
            randerTablelistWoo();
            ittone.show($('#importer'))
            break;
        case 'TypeAction':
            randerTablelistTypeAction();
            break;

    }
}
const randerTableDepot = function () {
    let columns_title = [
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        { "data": "adressDepot", "title": i18n.translate("adressDepot") },
        {
            "data": "prcpDepot", "title": i18n.translate("prcpDepot"),
            render: function (prcpDepot) {
                if (prcpDepot) {
                    return '<i class="fa-solid fa-star" style="color: #ffcc00;"><span class="d-none">oui</span></i>';
                } else {
                    return '<i class="fa-regular fa-star"><span class="d-none">no</span></i>';
                }

            },
        },
    ];
    tableRander = tableDepot($.tableView, columns_title);
}
const randerTableDepotSup = function () {
    let columns_title = [
        { "data": "nomSupDepot", "title": i18n.translate("nomSupDepot") },
        { "data": "couloirX", "title": i18n.translate("couloirX") },
        { "data": "rayonY", "title": i18n.translate("rayonY") },
        { "data": "hauteur", "title": i18n.translate("hauteur") },
        { "data": "codeBare", "title": i18n.translate("codeBare") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
    ];
    tableRander = tableDepotSup($.tableView, columns_title);
}
const rabderFormDepot = function (id) {
    let list = depotById({ id: id })[0];
    $.modalDepot.attr('id', id);
    ittone.convertJsonToForm($('#formDepot'), list);
    $('#prcpDepot').setChecked(list.prcpDepot);
    ittone.show($.modalDepot.parent());
    settingForma(true);
}
const rabderFormDepotSup = function (id) {
    let list = depotSupById({ id: id })[0];
    $.modalDepotSup.attr('id', id);
    ittone.convertJsonToForm($('#formDepotSup'), list);
    ittone.show($.modalDepotSup.parent());
    settingForma(true);
}
const randerTableTresor = function () {
    let columns_title = [
        { "data": "nameTreso", "title": i18n.translate("nameTreso") },
        { "data": "adresseTreso", "title": i18n.translate("adresseTreso") },
        { "data": "soldAutoriseTreso", "title": i18n.translate("soldAutoriseTreso") },
        {
            "data": "defaultTreso", "title": i18n.translate("defaultTreso"),
            render: function (defaultTreso) {
                if (defaultTreso) {
                    return '<i class="fa-solid fa-star" style="color: #ffcc00;"></i>';
                } else {
                    return '<i class="fa-regular fa-star"></i>';
                }

            },
        },
    ];
    tableRander = tableTresor($.tableView, columns_title);
}
const randerFormTreso = function (id) {
    let list = tresorById({ id: id })[0];
    $.modalTresor.attr('id', id);
    ittone.convertJsonToForm($('#formTresor'), list);
    $('#defaultTreso').setChecked(list.defaultTreso);
    ittone.show($.modalTresor.parent());
    settingForma(true);
}
const randerTableVille = function () {
    let columns_title = [
        { "data": "name", "title": i18n.translate("nomVille") },
    ];
    let dt = { id: '' }
    tableRander = tableVille($.tableView, columns_title, dt);
}
const randerFormVille = function (id) {
    let list = villeById({ id: id })[0];
    $.modalVille.attr('id', id);
    ittone.convertJsonToForm($('#formVille'), list);
    ittone.show($.modalVille.parent());
    settingForma(true);
}
const randerTablePays = function () {
    let columns_title = [
        { "data": "id", "title": i18n.translate("Code Pays") },
        { "data": "name", "title": i18n.translate("nomPays") },
    ];
    tableRander = tablePays($.tableView, columns_title);
}
const randerFormPays = function (id) {
    let list = paysById({ id: id })[0];
    $.modalPays.attr('id', id);
    console.log(list)
    ittone.convertJsonToForm($('#formPays'), list);
    $('input[name=idPays]').setVal(list.id)
    $('#nomPays').setVal(list.name)
    ittone.show($.modalPays.parent());
    settingForma(true);
}
const randerTableModRglm = function () {
    let columns_title = [
        { "data": "nomModRglm", "title": i18n.translate("nomModRglm") },
        { "data": "timbre", "title": i18n.translate("timbre") },
    ];
    tableRander = tableModRglm($.tableView, columns_title);
}
const randerFormModRglm = function (id) {
    let list = modRglmById({ id: id })[0];
    $.modalModRglm.attr('id', id);
    ittone.convertJsonToForm($('#formModRglm'), list);
    ittone.show($.modalModRglm.parent());
    settingForma(true);
}
const randerTableTaxe = function () {
    let columns_title = [
        { "data": "nomTaxe", "title": i18n.translate("nomTaxe") },
        { "data": "cauxTaxe", "title": i18n.translate("cauxTaxe") },
    ];
    tableRander = tableTaxe($.tableView, columns_title);
}
const randerFormTaxe = function (id) {
    let list = taxeById({ id: id })[0];
    $.modalTaxe.attr('id', id);
    ittone.convertJsonToForm($('#formTaxe'), list);
    ittone.show($.modalTaxe.parent());
    settingForma(true);
}
const randerTableService = function () {
    let columns_title = [
        { "data": "nomService", "title": i18n.translate("nomService") },
        { "data": "descService", "title": i18n.translate("descService") },
    ];
    tableRander = tableService($.tableView, columns_title);
}
const randerFormService = function (id) {
    let list = serviceById({ id: id })[0];
    $.modalService.attr('id', id);
    ittone.convertJsonToForm($('#formService'), list);
    ittone.show($.modalService.parent());
    settingForma(true);
}
const randerTableUnite = function () {
    let columns_title = [
        { "data": "descUnite", "title": i18n.translate("descUnite") },
        {
            "data": "prcpUnite", "title": i18n.translate("prcpUnite"),
            render: function (prcpUnite) {
                if (prcpUnite) {
                    return '<i class="fa-solid fa-star" style="color: #ffcc00;"><span class="d-none">oui</span></i>';
                } else {
                    return '<i class="fa-regular fa-star"><span class="d-none">no</span></i>';
                }

            },
        },
    ];
    tableRander = tableUniteMesure($.tableView, columns_title);
}
const randerFormUnite = function (id) {
    let list = uniteById({ id: id })[0];
    $.modalUnite.attr('id', id);
    ittone.convertJsonToForm($('#formUniteMesure'), list);
    $('#prcpUnite').setChecked(list.prcpUnite);
    ittone.show($.modalUnite.parent());
    settingForma(true);
}
const randerTablePropriete = function () {
    let columns_title = [
        { "data": "nomPropriete", "title": i18n.translate("nomPropriete") },
    ];
    tableRander = tablePropriete($.tableView, columns_title);
}
const randerFormPropriete = function (id) {
    let list = ProprieteById({ id: id })[0];
    $.modalPropriete.attr('id', id);
    ittone.convertJsonToForm($('#formPropriete'), list);
    ittone.show($.modalPropriete.parent());
    settingForma(true);
}

const randerTablelistOriContact = function () {
    let columns_title = [
        { "data": "nomOrigine", "title": i18n.translate("nomOrigine") },
    ];
    tableRander = tableOriContact($.tableView, columns_title);
}
const randerTablelistIndustrie = function () {
    let columns_title = [
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
    ];
    tableRander = tableIndustrie($.tableView, columns_title);
}
const randerTablelistCategorie = function () {
    let columns_title = [
        // { "data": "codeCategorie", "title": i18n.translate("codeCategorie") },
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
    ];
    tableRander = tableCategorie($.tableView, columns_title);
}
const randerTablelistType = function () {
    let columns_title = [
        { "data": "nomType", "title": i18n.translate("nomType") },
    ];
    tableRander = tableType($.tableView, columns_title);
}
const randerTablelistPotClient = function () {
    let columns_title = [
        { "data": "codeColor", "title": i18n.translate("codeColor") },
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient") },
    ];
    tableRander = tablePotClient($.tableView, columns_title);
}
const randerTablelistRelation = function () {
    let columns_title = [
        { "data": "nomRelation", "title": i18n.translate("nomRelation") },
        // { "data": "codeColor", "title": i18n.translate("codeColor") },
    ];
    tableRander = tableRelation($.tableView, columns_title);
}
const randerTablelistRebrique = function () {
    let columns_title = [
        { "data": "nomRebrique", "title": i18n.translate("nomRebrique") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    tableRander = tableRebrique($.tableView, columns_title);
}
const randerTablelistTypeAction = function () {
    let columns_title = [
        { "data": "nomType", "title": i18n.translate("nomType") },
        { "data": "codeColor", "title": i18n.translate("codeColor") },
    ];
    tableRander = tableTypeAction($.tableView, columns_title);
}
const randerTablelistWoo = function () {
    let columns_title = [
        { "data": "idWoo", "title": i18n.translate("idWoo") },
        { "data": "nomCate", "title": i18n.translate("nomCategorie") },
    ];
    tableRander = tableWoo($.tableView, columns_title);
}
