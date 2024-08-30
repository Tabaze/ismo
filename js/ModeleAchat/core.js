import { selectDepot, selectSubDepotbyId, selectModRglm, selectTresor } from './../ModeleBase/component.js';
import { tableEntet, tableEntetArticle, modeleForEntet, templateControl, tableLingEntet, templateControlTotal, templateLingEntet } from '../ModeleEntet/component.js';
import {
    cmupQteByArticle, entetLastNum, entetInsertUpdate,
    getValCmupStock, lignEntetInsertUpdate, entetFixed, entetById, clotureEntet, entetCopier, entetCopierAll, checkNumEntet
} from '../ModeleEntet/service.js';
import { selectFournisseur, templateFournisseurInsert } from '../ModeleTier/component.js';
import { initFile } from '../uploadFiles.js';
import { validerEntetAchat } from './service.js';
import { templateArticleInsert } from '../ModeleArticle/component.js';
import { reglementLastNumWithData, reglementInsertUpdate } from '../ServiceReglement/service.js'
$(function () {
    loadApp();
    $.btnCreate.on('click', this, function () {
        settingForma(false);
        ittone.hide($.screenAfficher);
        ittone.show($.screenINVT);
        let numFacture = entetLastNum()[0].numFacture;
        $('#numFactur').setVal(numFacture);
        $('#Numero_entet').text(numFacture);
        randerTableLingEntet();
        templateControlTotal($('.controleTotal'));

    });
    $('#filterDateEntet').on('click', this, function () {
        let name = ittone.getSubMenu();
        randerTableAchat(name, 'dateEntet');
    });
    $('#filterDateEcheanche').on('click', this, function () {
        let name = ittone.getSubMenu();
        randerTableAchat(name, 'dateEcheanche');
    });
    $.btnSauvegarderINVT.on('click', this, function () {
        let data = ittone.convertFormToJSON($('#formEntet'));
        data.dateEntet = $('#dateEntet').getDate();
        data.dateEcheanche = $('#dateEcheanche').getDate();
        data.checkExpiration = $('#checkExpiration').is(':checked');
        data.tva = $('#tva').is(':checked');
        data.ttc = $('#ttc').is(':checked');
        data.codeType = ittone.getSubMenu();
        data.idDossier = ittone.idDossier();
        if ($.screenINVT.data('update') && role.update()) {
            data.idEntet = $.screenINVT.attr('id');
            data.statment = 'update';
            let param = {
                param: [data]
            }
            let list = entetInsertUpdate(param)[0];
            if (list.idEntet) {
                ittone.success('successfully');
                ittone.updateInDataTable(tableRander, list, list.idEntet);
            }

        } else if (!$.screenINVT.data('update') && role.insert()) {
            data.statment = 'insert';
            if (!data.idDepot || data.idDepot == '') {
                ittone.warning('Dépot Obligatoire');
                return false;
            }
            let param = {
                param: [data]
            }
            let check = checkNumEntet({ codeType: data.codeType, idDossier: data.idDossier, numFactur: data.numFactur });
            if (check) {
                ittone.warning('numFactur double');
                return false;
            }
            let list = entetInsertUpdate(param)[0];
            if (list.idEntet) {
                ittone.success('successfully');
                settingForma(true);
                $.screenINVT.attr('id', list.idEntet);
                ittone.addInDataTable(tableRander, list)
            }
        }
    });
    $.btnAnnulerINVT.on('click', this, function () {
        let idEntet = $.screenINVT.attr('id');
        if (idEntet) {
            ittone.updateInDataTable(tableRander, entetFixed({ idEntet: idEntet })[0], idEntet);
        }
        ittone.show($.screenAfficher); ittone.hide($.screenINVT);
        setTimeout(() => { tableRander.draw(false); }, 200);
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        randerFormEntet(tableRander.row(this).data().idEntet);
    });
    $.tableView.on('click', '.showLineEntet', function () {
        let columns_title = [
            { "data": "refArticle", "title": i18n.translate("refArticle") },
            { "data": "descLign", "title": i18n.translate("descLign") },
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
            }
            ,
            {
                "data": "lgnRemise", "title": i18n.translate("lgnRemise"),
                render: function (lgnRemise) {
                    return ittone.toFixedMoney(lgnRemise) + '%';
                }
            }
            ,
            {
                "data": "lgnTVA", "title": i18n.translate("lgnTVA"),
                render: function (lgnTVA) {
                    return ittone.toFixedMoney(lgnTVA);
                }
            }
            ,
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
            }
        ];
        let tr = tableRander.row($(this).closest('tr'));
        let data;
        if (tr.data()) {
            data = tr.data();
        } else {
            tr = tableRander.row($(this).closest('tr').prev());
            data = tr.data();
        }
        let dt = {
            idEntet: data.idEntet
        }
        templateLingEntet(columns_title, dt);
    });
    $('.tableArticleEntet').on('dblclick', 'tbody tr', function () {
        let dataArticle = tableRanderArticle.row(this).data();
        let formLine = {
            idArticle: dataArticle.idArticle,
            refArticle: dataArticle.refArticle,
            nomArticle: dataArticle.nomArticle,
            qteLign: 0,
            prixAchat_HT: dataArticle.prixAchat_HT,
            prixAchat_TTC: dataArticle.prixAchat_TTC,
            lgnTVA: dataArticle.cauxTaxeAchat,
            typeArticle: dataArticle.typeArticle
        }
        let idDepot = $('#idDepot').val();
        let idDossier = ittone.idDossier();
        let idSupDepot = null;
        let param = {
            param: [{ idArticle: formLine.idArticle, idDepot: idDepot, idDossier: idDossier, idSupDepot: idSupDepot, subDepot: false }]
        };
        $('#idSupDepot').on('change', function () {
            if (subDepot) {
                idSupDepot = $('#idSupDepot').val();
                let param = {
                    param: [{ idArticle: formLine.idArticle, idDepot: idDepot, idDossier: idDossier, idSupDepot: idSupDepot, subDepot: subDepot }]
                };
                dblClickTblLigne(param, formLine)
            }
        });
        dblClickTblLigne(param, formLine);
        $('#qteLign').blur();
        setTimeout(function () {
            $('#idSupDepot').select2('open');
        }, 0);
    });
    $('#ajouterLign').on('click', this, function () {
        let data = getDataLine();
        if ($('#formLine').data('update') && role.update()) {
            data.idLign = $('#formLine').data('info').idLign;
            data.statment = 'update';
            let param = {
                param: [data]
            }
            let list = lignEntetInsertUpdate(param)[0];
            if (list.idLign) {
                ittone.success('successfully');
                ittone.updateInDataTable(tableRanderLingEntet, list, list.idLign);
                settingFormLine();
            }

        } else if (!$('#formLine').data('update') && role.insert()) {
            data.statment = 'insert';
            let param = {
                param: [data]
            }
            let list = lignEntetInsertUpdate(param)[0];
            if (list.idLign) {
                ittone.success('successfully');
                ittone.addInDataTable(tableRanderLingEntet, list);
                settingFormLine();
            }
        }
        //checkServiceLivraison();
        let list = entetFixed({ idEntet: data.idEntet })[0];
        templateControlTotal($('.controleTotal'), list);
        ittone.updateInDataTable(tableRander, list, list.idEntet);
    });
    $.tableEntetLign.on('click', '.updateLign', function () {
        let $tr = $(this).closest('tr');
        let row = tableRanderLingEntet.row($tr).data();
        if (!row) {
            row = tableRanderLingEntet.row($tr.prev()).data();
        }
        if (subDepot) {
            $('#idSupDepot').val(row.idSupDepot);
            if (ittone.getSubMenu() == 'MVTR') {
                $('#idSupDepot_2').val(row.idSupDepot_2);
            }
            $('#idSupDepot').trigger('change', false);
            $('#idSupDepot_2').trigger('change');
        }
        $('#formLine').data('update', true);
        $('#formLine').data('info', row);
        $('#refArticle').setVal(row.refArticle);
        $('#descLign').setVal(row.descLign);
        $('#lgnRemise').setVal(row.lgnRemise);
        $('#qteLign').setVal(row.qteLign);
        if ($('#ttc').is(':checked')) {
            $('#prixLign').setVal(row.prixTTC);
            $('#totalLign').setVal(row.lgnTTC);
        } else {
            $('#prixLign').setVal(row.prixHT);
            $('#totalLign').setVal(row.lgnHT);
        }
        if ($('#checkExpiration').is(':checked')) {
            $('#dateExpiration').setDate(row.dateExpiration);
        }
    });
    $('#idDepot').on('change', this, function () {
        if (subDepot) {
            selectSubDepotbyId($('#idSupDepot'), $('#idDepot').val());
        }
    });
    $('#validerRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Est ce que tu veux le valider/Dévalider', function () {
                let data = rows.data();
                data.map(function (dt) {
                    let idEntet = dt.idEntet;
                    let idDossier = dt.idDossier;
                    let list = validerEntetAchat({ idEntet: idEntet, idDossier: idDossier })[0];
                    console.log(list)
                    if (list.idEntet) {
                        ittone.success('successfully');
                        ittone.updateInDataTable(tableRander, list, list.idEntet);
                        ittone.getTrDatatable(tableRander, list.idEntet).toggleClass('validerRow');
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#cloturRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Est ce que tu veux le Cloture', function () {
                let data = rows.data();
                data.map(function (dt) {
                    let idEntet = dt.idEntet;
                    if (dt.valider) {
                        if (!dt.clotur) {
                            let list = clotureEntet({ idEntet: idEntet })[0];
                            if (list.idEntet) {
                                ittone.success('successfully');
                                ittone.updateInDataTable(tableRander, list, list.idEntet);
                                ittone.getTrDatatable(tableRander, list.idEntet).addClass('cloturRow')
                            }
                        } else {
                            ittone.warning("déjà cloture");
                        }

                    } else {
                        ittone.warning("N'a pas encore validé");
                    }

                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#listCopier').on('click', '.dropdown-item', function () {
        let codeTypeCopier = $(this).attr('data-model');
        let text = $(this).text();
        let rows = tableRander.rows({ selected: true });
        let data = rows.data();
        if (rows.count() == 1) {
            ittone.alert('Confirmer', 'Est ce que tu veux le copier vers ' + text, function () {
                data.map(function (dt) {
                    let idEntet = dt.idEntet;
                    let idDossier = dt.idDossier;
                    if (dt.valider) {
                        entetCopier({ idEntet: idEntet, idDossier: idDossier, codeTypeCopier: codeTypeCopier });
                        ittone.success('successfully');
                    } else {
                        ittone.warning("N'a pas encore validé");
                    }
                })
            }, function () {
                ittone.warning("Cancel");
            });
        }
        else if (rows.count() > 1) {
            ittone.alert2('Confirmer', 'Voulez-vous confirmer de rendre ces factures sélectionnées en une seule facture ?', function () {
                let idFournisseur = data[0].idFournisseur;
                let checkFournisseur = 0;
                let checkValider = 0;
                let codeType = ittone.getSubMenu();
                let arrayIdEntete = [];
                let idDossier = '';
                for (let i = 0; i < data.length; i++) {
                    let idEntet = data[i].idEntet;
                    arrayIdEntete.push(idEntet);
                    idDossier = data[i].idDossier;
                    if (data[i].valider) {
                        checkValider = 1;
                        if (data[i].idFournisseur == idFournisseur) {
                            checkFournisseur = 1;
                        }
                        else {
                            checkFournisseur = 0;
                            break;
                        }
                    } else {
                        checkValider = 0;
                        break;
                    }
                }
                if (checkValider == 1) {
                    if (checkFournisseur == 1) {
                        copierVersAllEntet(arrayIdEntete, codeType, codeTypeCopier, idDossier);
                        ittone.success('successfully');
                    }
                    else {
                        ittone.warning("Vos lignes sélectionnées n'ont pas le même fournisseur !!")
                    }
                }
                else {
                    ittone.warning("L'un de vos lignes sélectionnées n'est pas validée !!")
                }
            }, function () {
                data.map(function (dt) {
                    let idEntet = dt.idEntet;
                    let idDossier = dt.idDossier;
                    if (dt.valider) {
                        entetCopier({ idEntet: idEntet, idDossier: idDossier, codeTypeCopier: codeTypeCopier });
                        ittone.success('successfully');
                    } else {
                        ittone.warning("N'a pas encore validé");
                    }
                })
            }, function () {
                ittone.warning("Cancel");
            });
        }
        else {
            ittone.warning("dont Selection");
        }
        // if (rows.count() > 0) {
        //     ittone.alert('Confirmer', 'Est ce que tu veux le copier vers ' + text, function () {
        //         let data = rows.data();
        //         data.map(function (dt) {
        //             let idEntet = dt.idEntet;
        //             let idDossier = dt.idDossier;
        //             alertify.confirm('Confirmer', 'Voulez-vous confirmer de rendre ces factures sélectionnées en une seule facture ?',
        //                 function () {
        //                     if (dt.valider) {
        //                         entetCopier({ idEntet: idEntet, idDossier: idDossier, codeTypeCopier: codeTypeCopier });
        //                         ittone.success('successfully');
        //                     } else {
        //                         ittone.warning("N'a pas encore validé");
        //                     }
        //                 }), function () {
        //                     ittone.warning("Cancel");
        //                 };
        //         });
        //     }, function () {
        //         ittone.warning("Cancel");
        //     });
        // } else {
        //     ittone.warning("dont Selection");
        // }
    });
    $('#imprementEntet').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            let data = rows.data();
            data.map(function (dt) {
                if (dt.valider) {
                    let dataDossier = JSON.parse(sessionStorage.getItem('dataDossier'));
                    let url = ittone.pathImrementEntet + dataDossier.Style_dossier + "/index.html?id=" + dt.idEntet;
                    let win = window.open(url, '_blank');
                    win.focus();
                } else {
                    ittone.warning("N'a pas encore validé");
                }
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#idReg').on('change', this, function () {
        let numReglement = reglementLastNumWithData(
            {
                idDossier: ittone.idDossier(),
                codeType: $('#idReg').val()
            })[0].numFacture;
        $('#numReg').setVal(numReglement);
        if ($('#idReg').val() == 'CHFFF' || $('#idReg').val() == 'EFFETFR') {
            ittone.show($('#numCh').closest('.form-outline'))
        } else {
            ittone.hide($('#numCh').closest('.form-outline'))
        }
    });
    $('#rgc').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() == 1) {
            let data = rows.data();
            data.map(function (dt) {
                if (dt.valider) {
                    if (!dt.clotur) {
                        let numReglement = reglementLastNumWithData(
                            {
                                idDossier: ittone.idDossier(),
                                codeType: $('#idReg').val()
                            })[0].numFacture;
                        let dataReg = {
                            idEntet: dt.idEntet,
                            nom: dt.nom,
                            info: dt.info,
                            idFournisseur: dt.idFournisseur,
                            montant: dt.TT_ttc
                        };
                        $.modalReglement.data('info', dataReg);
                        $('#numReg').setVal(numReglement);
                        $('#dateReglement').setDate(moment());
                        ittone.show($.modalReglement.parent());
                    }
                    else {
                        ittone.warning("déjà cloture");
                    }
                }
                else {
                    ittone.warning("Cette facture n'est pas encore validé");
                }
            })
        }
        else {
            ittone.warning("dont Selection")
        }
    });
    $('#formReglement').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateReglement = $('#dateReglement').getDate();
            data.dateEcheanche = $('#dateEcheancheRG').getDate();
            data.idDossier = ittone.idDossier();
            let dataReg = $.modalReglement.data('info');
            data = {
                ...data,
                ...dataReg
            }
            if ($.modalReglement.data('update') && role.update()) {
                data.idReglement = $.modalReglement.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = reglementInsertUpdate(param)[0];
                if (list.idReglement) {
                    ittone.success('successfully');
                }
            } else if (!$.modalReglement.data('update') && role.insert()) {
                let param = {
                    param: [data]
                }
                let list = reglementInsertUpdate(param)[0];
                if (list.idReglement) {
                    ittone.success('successfully');
                    settingFormReglement(true);
                    let idEntet = list.idEntet;
                    let list2 = clotureEntet({ idEntet: idEntet })[0];
                    if (list2.idEntet) {
                        ittone.updateInDataTable(tableRander, list2, list2.idEntet);
                        ittone.getTrDatatable(tableRander, list2.idEntet).addClass('cloturRow')
                    }
                }
            }
        }
    });
    $('#file').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() == 1) {
            let data = rows.data();
            initFile('entet', data[0].idEntet);
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#newCompte').on('click', this, function () {
        templateFournisseurInsert($('#idFournisseur'));
    });
    $('#newArticle').on('click', this, function () {
        templateArticleInsert(tableRanderArticle);
    });
});
var tableRander;
var tableRanderArticle;
var tableRanderLingEntet;
var cmupStock = {
    valStock: 0,
    valCmup: 0
};
const loadApp = function () {
    //initFile();
    let name = ittone.getSubMenu();
    let dateDossier = ittone.dateExeDossier();
    const startOfMonth = moment().startOf('Month').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    const endOfMonth = moment().endOf('Month').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    $('#dateEntet').inputDate({
        minDate: dateDossier.dateExeStart,
        maxDate: dateDossier.dateExeEnd
    });
    let val = getValCmupStock()[0];
    cmupStock.valCmup = val.valCmup;
    cmupStock.valStock = val.valStock;
    randerTableAchat(name, 'dateEntet');
    selectDepot($('[name=idDepot]'));
    selectFournisseur($('#idFournisseur'));
    selectModRglm($('#idModRglm'));
    selectTresor($('#idTreso'));
    if (subDepot) {
        selectSubDepotbyId($('#idSupDepot'), $('#idDepot').val());
    }
    // if(name!='BCFR'){
    //     $('#imprementEntet').remove();
    // }    
    randerTableArticle();
    switch (name) {
        case 'FFR':
            $('#rgc').remove();
            $('#listCopier').find('[data-model="FFR"]').remove();
            break;
        case 'FPRA':
            $('#rgc').remove();
            $('#listCopier').find('[data-model="FPRA"]').remove();
            break;
        case 'BAVFR':
            $('#rgc').remove();
            break;
        case 'BRFR':
            $('#listCopier').find('[data-model="BLFFR"],[data-model="FFR"],[data-model="FPRA"],[data-model="BRFR"]').remove();
            break;
        case 'BCFR':
            $('#listCopier').find('[data-model="FFR"],[data-model="FPRA"],[data-model="BRFR"],[data-model="BAVFR"]').remove();
            $('#rgc').remove();
            break;
        case 'BLFFR':
            $('#listCopier').find('[data-model="BLFFR"],[data-model="BAVFR"]').remove();
            break;
        default: $('#listCopier').remove(); $('#copierVers').remove(); break;
    }
}
const randerTableAchat = function (name, Filter) {
    let columns_title = [
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },
        {
            "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function (dateEntet) {
                return ittone.convertDate(dateEntet);
            }
        },
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },
        { "data": "nom", "title": i18n.translate("nom") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        {
            "data": "TT_ht", "title": i18n.translate("TT_ht"), render: function (TT_ht) {
                return ittone.CurrencyFormat(TT_ht);
            }
        },
        {
            "data": "TT_tva", "title": i18n.translate("TT_tva"), render: function (TT_tva) {
                return ittone.CurrencyFormat(TT_tva);
            }
        },
        {
            "data": "TT_ttc", "title": i18n.translate("TT_ttc"), render: function (TT_ttc) {
                return ittone.CurrencyFormat(TT_ttc);
            }
        },
        { "data": "nomModRglm", "title": i18n.translate("nomModRglm") },
        {
            "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),
            render: function (dateEcheanche) {
                return ittone.convertDate(dateEcheanche);
            }
        },
        { "data": "obs", "title": i18n.translate("obs") },
        {
            "data": "valider", "title": i18n.translate("valider"), render: function (valider) {
                if (valider) {
                    return '<div class="text-center"><i class="fas fa-check-double"><span class="d-none">oui</span></i></div>';
                } else {
                    return '<div class="text-center"><i class="fas fa-times-circle"><span class="d-none">non</span></i></div>';
                }
            },
        },
        {
            "data": "clotur", "title": i18n.translate("clotur"), render: function (clotur) {
                if (clotur) {
                    return '<div class="text-center"><i class="fas fa-lock"><span class="d-none">oui</span></i></div>';
                } else {
                    return '<div class="text-center"><i class="fas fa-lock-open"><span class="d-none">non</span></i></div>';
                }
            }
        },
        {
            "data": "nomUser", "title": i18n.translate("nomUser"), render: function (nomUser) {
                return nomUser + '<div class="showLineEntet"><i class="fas fa-eye"></i></div>';
            }
        },
    ];
    let dt = {
        idDossier: ittone.idDossier(),
        codeType: name,
        dateStart: $('#dateStart').getDate(),
        dateEnd: $('#dateEnd').getDate(),
        Filter: Filter
    }
    let param = {
        param: [dt]
    }
    tableRander = tableEntet($.tableView, columns_title, param);
    //console.log(tableRander.column( 7 ).data().sum())
}
const randerTableArticle = function () {
    let columns_title = [
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle") },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        {
            "data": "prixAchat_HT", "title": i18n.translate("prixAchat_HT"),
            render: function (prixAchat_HT) {
                return ittone.CurrencyFormat(prixAchat_HT);
            }
        },
        {
            "data": "prixAchat_TTC", "title": i18n.translate("prixAchat_TTC"),
            render: function (prixAchat_TTC) {
                return ittone.CurrencyFormat(prixAchat_TTC);
            }
        }
    ];
    let dt = {
        param: [{
            modele: modeleForEntet.achat
        }]
    }
    tableRanderArticle = tableEntetArticle($.tableArticleEntet, columns_title, dt);
}
const randerTableLingEntet = function () {
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "descLign", "title": i18n.translate("descLign") },
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
            "data": "prixTTC", "title": i18n.translate("prixTTC"),
            render: function (prixTTC) {
                return ittone.CurrencyFormat(prixTTC);
            }
        }
        ,
        {
            "data": "lgnRemise", "title": i18n.translate("lgnRemise"),
            render: function (lgnRemise) {
                return ittone.toFixedMoney(lgnRemise) + '%';
            }
        }
        ,
        {
            "data": "lgnTVA", "title": i18n.translate("lgnTVA"),
            render: function (lgnTVA) {
                return ittone.toFixedMoney(lgnTVA);
            }
        }
        ,
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
        {
            "data": "idLign", "title": "",
            render: function (idLign) {
                return `<button type="button" class="fs-6 btn btn-floating deleteLign">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" class="fs-6 btn btn-floating updateLign">
                    <i class="fa-solid fa-edit"></i>
                </button>
                `
            }
        }
    ];
    if (ittone.settingParam().ttcCheck) {
        columns_title.splice(3, 1);

    } else {
        columns_title.splice(4, 1);

    }
    let dt = {
        idEntet: $.screenINVT.attr('id') || -1
    }
    tableRanderLingEntet = tableLingEntet($.tableEntetLign, columns_title, dt);
}
const randerFormLine = function (data) {
    $('#formLine').data('info', data);
    $('#refArticle').setVal(data.refArticle);
    $('#descLign').setVal(data.nomArticle);
    $('#qteLign').setVal(data.qteLign);
    if ($('#ttc').is(':checked')) {
        $('#prixLign').setVal(data.prixAchat_TTC);
    } else {
        $('#prixLign').setVal(data.prixAchat_HT);
    }
    if (subDepot) {
        $('#qteLign').blur();
        $('#idSupDepot').select2('open');
    }
    else {
        $('#qteLign').focus().select();
    }
}
const randerFormEntet = function (id) {
    let list = entetById({ id: id })[0];
    $.screenINVT.attr('id', id);
    ittone.convertJsonToForm($('#formEntet'), list);
    $('#dateEntet').setDate(list.dateEntet);
    $('#dateEcheanche').setDate(list.dateEcheanche);
    $('#checkExpiration').setChecked(list.checkExpiration);
    $('#ttc').setChecked(list.ttc);
    $('#tva').setChecked(list.tva);
    $('#Numero_entet').text(list.numFactur);
    $('#checkExpiration').change();
    settingForma(true);
    ittone.hide($.screenAfficher);
    ittone.show($.screenINVT);
    randerTableLingEntet();
    templateControlTotal($('.controleTotal'), list);
    if (list.valider) {
        $('.card-article,#formLine').addClass('disabled');
        $('#formEntet').addClass('disabled');
        hideColumn(false);
        $.btnSauvegarderINVT.addClass('disabled');
    } else {
        $('.card-article,#formLine').removeClass('disabled');
        $('#formEntet').removeClass('disabled');
        $.btnSauvegarderINVT.removeClass('disabled');
        hideColumn(true);
    }

}
const getDataLine = function () {
    let formLine = $('#formLine').data('info');
    let data = {};
    let ttc = $('#ttc').is(':checked');
    let tva = $('#tva').is(':checked');
    let lgnTVA = formLine.lgnTVA;
    let tvaCalcul = lgnTVA / 100;
    data.idEntet = $.screenINVT.attr('id');
    data.idArticle = formLine.idArticle;
    if (data.idEntet == undefined || data.idArticle == undefined) {
        ittone.warning('warning');
        return false;
    }
    data.refArticle = $('#refArticle').val();
    data.descLign = $('#descLign').val();
    data.qteLign = +$('#qteLign').val();
    data.lgnRemise = +$('#lgnRemise').val();
    data.lgnTVA = lgnTVA;
    if (ttc) {
        data.prixTTC = +$('#prixLign').val();
        data.prixHT = ittone.toFixedMoney((data.prixTTC / (1 + tvaCalcul)));
    } else {
        data.prixHT = +$('#prixLign').val();
        data.prixTTC = ittone.toFixedMoney((data.prixHT * (1 + tvaCalcul)));
    }

    if (tva) {
        data.lgnHT = (data.qteLign * data.prixHT * (1 - data.lgnRemise / 100));
        data.lgnTTC = (data.qteLign * data.prixTTC * (1 - data.lgnRemise / 100));
    } else {
        data.prixTTC = +$('#prixLign').val();
        data.prixHT = +$('#prixLign').val();
        data.lgnHT = +$('#totalLign').val();
        data.lgnTTC = +$('#totalLign').val();
    }
    data.valStock = cmupStock.valStock;
    data.valCmup = cmupStock.valCmup;
    if ($('#checkExpiration').is(':checked')) {
        data.dateExpiration = $('#dateExpiration').getDate();
    }
    if (subDepot) {
        data.idSupDepot = $('#idSupDepot').val();
    }
    return data;
}
const hideColumn = function (hide) {
    setTimeout(() => {
        let colIndex = tableRanderLingEntet.columns().header().length;
        tableRanderLingEntet.column(colIndex - 1).visible(hide);
    }, 200);
}
const checkServiceLivraison = function () {
    let data = tableRanderLingEntet.rows().data();
    let totalQte = 0;
    let totalPrixLivraison = 0;
    let totalPlus = 0;
    data.map(
        function (data) {
            if (data.typeArticle == 'Livraison') {
                totalPrixLivraison += data.lgnTTC;
            } else {
                totalQte += data.qteLign
            }
        }
    );
    if (totalPrixLivraison > 0) {
        if (totalQte != 0) {
            totalPlus = totalPrixLivraison / totalQte;
            data.map(function (e) {
                if (data.typeArticle == 'Livraison') { }
            });
        }

    }
}
const dblClickTblLigne = function (param, formLine) {
    let cmupQte = cmupQteByArticle(param)[0];
    templateControl($('.controleInventer'), cmupQte);
    if (cmupQte) {
        if (cmupQte.cmup > 0) {
            formLine.prixLign = cmupQte.cmup;
        }
    }
    randerFormLine(formLine);
}
const copierVersAllEntet = function (data, codeType, codeTypeCopier, idDossier) {
    if (data.length) {
        let newIdEntet = entetCopierAll({ IdEntet: data[0], IdDossier: idDossier, CodeType: codeType, CodeTypeCopier: codeTypeCopier, statment: 'insertFirst', newIdEntet: '-1' });
        for (let l of data) {
            entetCopierAll({ IdEntet: l, IdDossier: idDossier, CodeType: codeType, CodeTypeCopier: codeTypeCopier, statment: 'insertLine', newIdEntet: newIdEntet });
        }
    }
}