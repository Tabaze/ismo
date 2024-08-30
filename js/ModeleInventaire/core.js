import { selectDepot, selectSubDepotbyId } from './../ModeleBase/component.js';
import { tableEntet, tableEntetArticle, modeleForEntet, templateControl, tableLingEntet, templateControlTotal, templateLingEntet } from '../ModeleEntet/component.js';
import { cmupQteByArticle, entetLastNum, entetInsertUpdate, getValCmupStock, lignEntetInsertUpdate, entetFixed, entetById, checkNumEntet } from '../ModeleEntet/service.js';
import { initFile } from './../uploadFiles.js';
import { templateArticleInsert, selectFamilleGroup } from '../ModeleArticle/component.js';
import { listEtatInventaire, validerMouvementTransfert } from './service.js';
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
        randerTableINVT(name, 'dateEntet');
    });
    $.btnSauvegarderINVT.on('click', this, function () {
        let data = ittone.convertFormToJSON($('#formEntet'));
        data.dateEntet = $('#dateEntet').getDate();
        data.checkExpiration = $('#checkExpiration').is(':checked');
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
            if (ittone.getSubMenu() == 'MVTR') {
                if (!subDepot) {
                    if (data.idDepot_2 == data.idDepot) {
                        ittone.warning('warning');
                        $('#idDepot_2').focus();
                        return false;
                    }
                }
            }
            data.statment = 'insert';
            if (!data.idDepot || data.idDepot=='') {
                ittone.warning('Dépot Obligatoire');
                return false;
            }
            let check = checkNumEntet({ codeType: data.codeType, idDossier: data.idDossier, numFactur: data.numFactur });
            if (check) {
                ittone.warning('numFactur double');
                return false;
            }
            let param = {
                param: [data]
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
        setTimeout(() => { tableRander.draw(); }, 200);
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        randerFormEntet(tableRander.row(this).data().idEntet);
        switch (ittone.getSubMenu()) {
            case 'INVT': break;
        }
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
                "data": "lgnHT", "title": i18n.translate("lgnHT"),
                render: function (lgnHT) {
                    return ittone.CurrencyFormat(lgnHT);
                }
            },
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
            prixLign: dataArticle.prixAchat_HT,
        };
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
    });
    $('#ajouterLign').on('click', this, function () {
        let formLine = $('#formLine').data('info');
        let data = {};
        data.idEntet = $.screenINVT.attr('id');
        data.idArticle = formLine.idArticle;
        if (data.idEntet == undefined || data.idArticle == undefined) {
            ittone.warning('warning');
            return false;
        }
        data.refArticle = $('#refArticle').val();
        data.descLign = $('#descLign').val();
        data.qteLign = +$('#qteLign').val();
        data.prixHT = +$('#prixLign').val();
        data.lgnHT = +$('#totalLign').val();
        data.valStock = cmupStock.valStock;
        data.valCmup = cmupStock.valCmup;
        if ($('#checkExpiration').is(':checked')) {
            data.dateExpiration = $('#dateExpiration').getDate();
        }
        if (subDepot) {
            data.idSupDepot = $('#idSupDepot').val();
            if (ittone.getSubMenu() == 'MVTR') {
                data.idSupDepot_2 = $('#idSupDepot_2').val();
                if (data.idSupDepot == data.idSupDepot_2) {
                    ittone.warning('warning');
                    $('#idSupDepot_2').focus();
                    return false;
                }
            }
        }
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
        $('#formLine').data('update', true);
        $('#formLine').data('info', row);
        $('#refArticle').setVal(row.refArticle);
        $('#descLign').setVal(row.descLign);
        $('#descLign').setVal(row.descLign);
        $('#qteLign').setVal(row.qteLign);
        $('#prixLign').setVal(row.prixHT);
        $('#totalLign').setVal(row.lgnHT);
        if ($('#checkExpiration').is(':checked')) {
            $('#dateExpiration').setDate(row.dateExpiration);
        }
        if (subDepot) {
            $('#idSupDepot').val(row.idSupDepot);
            if (ittone.getSubMenu() == 'MVTR') {
                $('#idSupDepot_2').val(row.idSupDepot_2);
            }
            $('#idSupDepot').trigger('change');
            $('#idSupDepot_2').trigger('change');
        }
    });
    $('#idDepot').on('change', this, function () {
        if (subDepot) {
            selectSubDepotbyId($('#idSupDepot'), $('#idDepot').val());
        }
    });
    $('#idDepot_2').on('change', this, function () {
        if (subDepot) {
            selectSubDepotbyId($('#idSupDepot_2'), $('#idDepot_2').val());
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
    $('#newArticle').on('click', this, function () {
        templateArticleInsert(tableRanderArticle);
    });
    $('#pdfEtat').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            let data = rows.data();
            data.map(function (dt) {
                pdfEtatInventaire(dt.idEntet);
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#validerRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Est ce que tu veux le valider/Dévalider', function () {
                let data = rows.data();
                data.map(function (dt) {
                    let idEntet = dt.idEntet;
                    if (dt.valider == true) {
                        ittone.warning("DejaValide");
                    }
                    else {
                        console.log(dt.idEntet)
                        let list = validerMouvementTransfert({ idEntet: idEntet })[0];
                        console.log(list)
                        if (list.idEntet) {
                            ittone.success('successfully');
                            ittone.updateInDataTable(tableRander, list, list.idEntet);
                            ittone.getTrDatatable(tableRander, list.idEntet).toggleClass('validerRow');
                        }
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
});
var tableRander;
var tableRanderArticle;
var tableRanderLingEntet;
var cmupStock = {
    valStock: 0,
    valCmup: 0
};
var subDepot = ittone.settingParam().subDepot;
const loadApp = function () {
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
    randerTableINVT(name, 'dateEntet');
    selectDepot($('[name=idDepot]'));
    if (subDepot) {
        selectSubDepotbyId($('#idSupDepot'), $('#idDepot').val());
    }
    randerTableArticle();
    switch (name) {
        case 'INVT': $('#idDepot_2').parent().remove(); $('#idSupDepot_2').closest('.col').remove();
            selectFamilleGroup($('#idFamille'));
            $('#validerRow').remove();
            break;
        case 'MVTR': $('#idDepot_2').parent().removeClass('d-none'); selectDepot($('#idDepot_2'));
            selectFamilleGroup($('#idFamille'));
            if (subDepot) {
                selectSubDepotbyId($('#idSupDepot_2'), $('#idDepot_2').val());
            }
            break;
    }
}
const randerTableINVT = function (name, Filter) {
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
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        {
            "data": "TT_ht", "title": i18n.translate("TT_ht"), render: function (TT_ht) {
                return ittone.CurrencyFormat(TT_ht);
            }
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
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
}
const randerTableArticle = function () {
    let columns_title = [
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
    ];
    let dt = {
        param: [{
            modele: modeleForEntet.inventaire
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
        }
        ,
        {
            "data": "lgnHT", "title": i18n.translate("lgnHT"),
            render: function (lgnHT) {
                return ittone.CurrencyFormat(lgnHT);
            }
        },
        {
            "data": "nomSupDepot", "title": i18n.translate("nomSupDepot")
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
    if (!subDepot) {
        console.log(columns_title)
        columns_title.splice(5, 1);
        console.log(columns_title)
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
    $('#descLign').setVal(data.nomArticle);
    $('#qteLign').setVal(data.qteLign);
    $('#prixLign').setVal(data.prixLign);
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
    $('#dateEntet').setDate(list.dateEntet)
    $('#checkExpiration').setChecked(list.checkExpiration);
    $('#Numero_entet').text(list.numFactur);
    $('#checkExpiration').change();
    settingForma(true);
    ittone.hide($.screenAfficher);
    ittone.show($.screenINVT);
    randerTableLingEntet();
    if (list.valider) {
        $('.card-article,#formLine').addClass('disabled');
        $('#formEntet').addClass('disabled');
        $.btnSauvegarderINVT.addClass('disabled');
        hideColumn(false);
    } else {
        $('.card-article,#formLine').removeClass('disabled');
        $('#formEntet').removeClass('disabled');
        $.btnSauvegarderINVT.removeClass('disabled');
        hideColumn(true);
    }
}
const pdfEtatInventaire = function (id) {
    let titel = '';
    titel = '<tr><td>Etat Inventaire</td></tr>';
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "descLign", "title": i18n.translate("descLign") },
        { "data": "lastQte", "title": i18n.translate("lastQte") },
        { "data": "qteLign", "title": i18n.translate("qteLign") },
        { "data": "qteDepot", "title": i18n.translate("qteDepot") }
    ];
    let getData_Table = listEtatInventaire({ id: id });
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        putOnlyUsedFonts: true
    };
    let data = {
        titel: titel,
        table: {
            columns_title: columns_title,
            getData: getData_Table
        },
        foter: {
            columns_title: columns_foter,
            getData_foter: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const hideColumn = function (hide) {
    setTimeout(() => {
        let colIndex = tableRanderLingEntet.columns().header().length;
        tableRanderLingEntet.column(colIndex - 1).visible(hide);
    }, 200);
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