

import { selectTresor, selectModRglm, selectServices } from '../ModeleBase/component.js';
import { tresoEntetLastNum, insertUpdateTresoEntet, tresoEntetById, deleteTresoEntet,MouvementCaisse } from './service.js';
import { tableTresorerieEntet, tableSoldCaisse,tableMouvementCaisse } from './component.js';
$(function () {
    loadApp();
    $('#filterDateEntet').on('click', this, function () {
        let name = ittone.getSubMenu();
        switch (ittone.getSubMenu()) {
            case 'CPTCPT': randerTableTresoEntet(name, 'dateTresoEntet'); break;
            case 'RCT': randerTableTresoEntet(name, 'dateTresoEntet'); break;
            case 'DPS': randerTableTresoEntet(name, 'dateTresoEntet'); break;
            case 'SoldTresor': randerTableSoldTresor(); break;
            case 'MvmCaisse': randerTableMvmCaisse(); break;
        }
    });
    $('#filterDateEcheanche').on('click', this, function () {
        let name = ittone.getSubMenu();
        switch (ittone.getSubMenu()) {
            case 'CPTCPT': randerTableTresoEntet(name, 'dateEcheanche'); break;
            case 'RCT': randerTableTresoEntet(name, 'dateEcheanche'); break;
            case 'DPS': randerTableTresoEntet(name, 'dateEcheanche'); break;
            case 'SoldTresor': randerTableSoldTresor(); break;
        }
    });
    $.btnCreate.on('click', this, function () {
        settingForma(false);
        ittone.hide($.screenAfficher);
        ittone.show($.screenTresorerieEntet);
        let numTresoEntet = tresoEntetLastNum()[0].numFacture;
        $('#numTresoEntet').setVal(numTresoEntet);

    });
    $('#formTresorerieEntet').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateTresoEntet = $('#dateTresoEntet').getDate();
            data.codeType = ittone.getSubMenu();
            data.idDossier = ittone.idDossier();
            if (data.codeType != 'CPTCPT') {
                data.dateEcheanche = $('#dateEcheanche').getDate();
            }
            if ($.screenTresorerieEntet.data('update') && role.update()) {
                data.idTresoEntet = $.screenTresorerieEntet.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateTresoEntet(param)[0];
                if (list.idTresoEntet) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idTresoEntet);
                }

            } else if (!$.screenTresorerieEntet.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateTresoEntet(param)[0];
                if (list.idTresoEntet) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.screenTresorerieEntet.attr('id', list.idTresoEntet);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        randerFormTresoEntet(tableRander.row(this).data().idTresoEntet)
    });
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                data.map(function (dt) {
                    if (deleteTresoEntet({ id: dt.idTresoEntet })) {
                        ittone.deleteRowDataTable(tableRander, dt.idTresoEntet);
                        ittone.success("successfully");
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#idTresoFiltrage').on('change',this,function(){
        $('#filterDateEntet').click();
    })
});
var tableRander;
const loadApp = function () {
    let name = ittone.getSubMenu();
    const startOfMonth = moment().startOf('Month').toDate();
    const endOfMonth = moment().endOf('Month').toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    let dateDossier = ittone.dateExeDossier();
    $('#dateTresoEntet').inputDate({
        minDate: dateDossier.dateExeStart,
        maxDate: dateDossier.dateExeEnd
    });
    if (name == 'CPTCPT') {
        randerTableTresoEntet(name, 'dateTresoEntet');
        selectTresor($('#idTreso'));
        $('#idModRglm,#idService').closest('div').remove();
        $('#numCheque,#banque,#numCheque').closest('.form-outline').remove();
        $('#dateEcheanche').remove();
        selectTresor($('#idTreso_2'));
        $('#idTresoFiltrage').parent().remove();
    } else if (name == 'SoldTresor') {
        $('#dateStart').remove();
        $('#dateEnd').remove();
        $.btnCreate.remove();
        randerTableSoldTresor();
        $('#filterDateEntet').remove();
        $('#filterDateEcheanche').remove();
        $('#idTresoFiltrage').parent().remove();
    } else if (name == 'MvmCaisse') {
        $.btnCreate.remove();
        selectTresor($('#idTresoFiltrage'));
        randerTableMvmCaisse();       
        $('#filterDateEcheanche').remove();
        $('#deleteRow').remove();
    } else {
        randerTableTresoEntet(name, 'dateTresoEntet');
        selectTresor($('#idTreso'));
        $('#idTreso_2').closest('div').remove();
        selectModRglm($('#idModRglm'));
        selectServices($('#idService'));
        $('#idTresoFiltrage').parent().remove();
    }
}
const randerTableTresoEntet = function (name, filter) {
    let columns_title = [
        { "data": "numTresoEntet", "title": i18n.translate("numTresoEntet") },
        {
            "data": "dateTresoEntet", "title": i18n.translate("dateTresoEntet"),
            render: function (dateTresoEntet) {
                return ittone.convertDate(dateTresoEntet);
            }
        },
        {
            "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),
            render: function (dateEcheanche) {
                return ittone.convertDate(dateEcheanche);
            }
        },
        { "data": "numCheque", "title": i18n.translate("numCheque") },
        { "data": "banque", "title": i18n.translate("banque") },
        { "data": "nomService", "title": i18n.translate("nomService") },
        { "data": "descTresoEntet", "title": i18n.translate("descTresoEntet") },
        { "data": "nameTreso", "title": i18n.translate("nameTreso") },
        { "data": "nameTreso_2", "title": i18n.translate("Compte a Transfert") },
        {
            "data": "montant", "title": i18n.translate("montant"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    if (name == 'CPTCPT') {
        columns_title.splice(2, 1);
        columns_title.splice(2, 1);
        columns_title.splice(2, 1);
        columns_title.splice(2, 1);
    } else {
        columns_title.splice(8, 1);
    }
    let dt = {
        idDossier: ittone.idDossier(),
        codeType: name,
        dateStart: $('#dateStart').getDate(),
        dateEnd: $('#dateEnd').getDate(),
        Filter: filter
    }
    let param = {
        param: [dt]
    }
    tableRander = tableTresorerieEntet($.tableView, columns_title, param);
}
const randerFormTresoEntet = function (id) {
    let list = tresoEntetById({ id: id })[0];
    $.screenTresorerieEntet.attr('id', id);
    ittone.convertJsonToForm($('#formTresorerieEntet'), list);
    $('#dateTresoEntet').setDate(list.dateTresoEntet);
    $('#dateEcheanche').setDate(list.dateEcheanche);
    settingForma(true);
    ittone.show($.screenTresorerieEntet); ittone.hide($.screenAfficher);
}
const randerTableSoldTresor = function () {
    let columns_title = [
        { "data": "nameTreso", "title": i18n.translate("nameTreso") },
        {
            "data": "soldTresorerie", "title": i18n.translate("soldTresorerie"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
        {
            "data": "DPS", "title": i18n.translate("DPS"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
        {
            "data": "RCT", "title": i18n.translate("RCT"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
    ];
    tableRander = tableSoldCaisse($.tableView, columns_title);
}
const randerTableMvmCaisse = function () {
    let columns_title = [
        {
            "data": "dateEntet", "title": i18n.translate("dateOp"),
            render: function (dateEntet) {
                return ittone.convertDate(dateEntet);
            }
        },
        {
            "data": "TypeDoc", "title": i18n.translate("LibeleOp")
        },
        {
            "data": "montantRecettes", "title": i18n.translate("Debit"),
            render: function (montant,r,dt) {
                if(montant == null || montant ==0){
                    return ' - '
                }
                else{               
                    return ittone.CurrencyFormat(montant);
                }
            }
        },
        {
            "data": "montantDepenses", "title": i18n.translate("Credit"),
            render: function (montant) {
                if(montant == null || montant ==0){
                    return ' - '
                }
                else{               
                    return ittone.CurrencyFormat(montant);
                }
            }
        },
    ];
    let dt={
        idDossier:ittone.idDossier(),
        dateD:$('#dateStart').getDate(),
        dateF:$('#dateEnd').getDate(),
        idTreso:$('#idTresoFiltrage').val(),
        statement:'table'
    }
    let param ={
        param:[dt]
    }
    tableRander = tableMouvementCaisse($.tableView, columns_title,param);
    dt.statement='';
    let v=MouvementCaisse({param:[dt]})[0];
    if(v){
        $('.SoldCaisse').html(ittone.CurrencyFormat(v.soldTresorerie))
        $('.totalTable').data('SoldCaisse',ittone.CurrencyFormat(v.soldTresorerie))
    }
    else{
        $('.SoldCaisse').html('0 DH');
        $('.totalTable').data('SoldCaisse',0)
    }
}