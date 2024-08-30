$(document).ready(function () {
    $.screenAfficher = $('.screen-afficher.screen');
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');


    $.screenTresorerieEntet = $('.screen-create.screen.TresorerieEntet');
    $.btnSauvegarderTresorerieEntet = $.screenTresorerieEntet.find('.btn-sauvegarder');
    $.btnNewTresorerieEntet = $.screenTresorerieEntet.find('.btn-new');
    $.btnAnnulerTresorerieEntet = $.screenTresorerieEntet.find('.btn-annuler');


    $.btnAnnulerTresorerieEntet.on('click', this, function () {
        ittone.show($.screenAfficher);
        ittone.hide($.screenTresorerieEntet);

    });
    $.btnNewTresorerieEntet.on('click', this, function () {
        $.btnCreate.click();
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'CPTCPT': pdfTresorerie(); break;
            case 'RCT': pdfTresorerie(); break;
            case 'DPS': pdfTresorerie(); break;
            case 'SoldTresor': pdfSoldTresor(); break;
            case 'MvmCaisse': pdfMouvementCaisse(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'CPTCPT': excelTresorerie(); break;
            case 'RCT': excelTresorerie(); break;
            case 'DPS': excelTresorerie(); break;
            case 'SoldTresor': excelSoldTresor(); break;
            case 'MvmCaisse': excelMouvementCaisse(); break;
        }
    });
    //     $('#import').on('click',this,function(){
    //         window.location.href = 'Import.aspx?name=' + ittone.getSubMenu();
    //     })
});
const settingForma = function (update) {
    if (update) {
        $.screenTresorerieEntet.data('update', true);
        ittone.show($.btnNewTresorerieEntet);

    } else {
        $.screenTresorerieEntet.data('update', false);
        ittone.hide($.btnNewTresorerieEntet);
        $('#formTresorerieEntet')[0].reset();
        $.screenTresorerieEntet.attr('id', '');
        $('#dateTresoEntet').setDate(moment());
    }
    $('select').trigger('change');
}
const pdfTresorerie = function () {
    let titel = '';
        switch (ittone.getSubMenu()) {
            case 'CPTCPT': titel = '<tr><td>Compte à Compte</td></tr>'; break;
            case 'RCT': titel = '<tr><td>Les Recettes</td></tr>'; break;
            case 'DPS': titel = '<tr><td>Les Dépenses</td></tr>'; break;
        }
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
        let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
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
const excelTresorerie = function () {
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
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const pdfSoldTresor = function () {
    let titel = '';
    titel = '<tr><td>Solde Caisse</td></tr>';
    let columns_title = [
        { "data": "nameTreso", "title": i18n.translate("nameTreso") },
        { "data": "soldTresorerie", "title": i18n.translate("soldTresorerie"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            }  },
        { "data": "DPS", "title": i18n.translate("DPS"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            }  },
        { "data": "RCT", "title": i18n.translate("RCT"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            }  },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
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
const excelSoldTresor = function () {
    let columns_title = [
        { "data": "nameTreso", "title": i18n.translate("nameTreso") },
        { "data": "soldTresorerie", "title": i18n.translate("soldTresorerie"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            }  },
        { "data": "DPS", "title": i18n.translate("DPS"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            }  },
        { "data": "RCT", "title": i18n.translate("RCT"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            }  },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const pdfMouvementCaisse = function () {
    let titel = '';
    let treso = $('#idTresoFiltrage').select2('data')[0].text
    titel = '<tr><td>RELEVÉ DE COMPTE : '+ treso +'</td></tr><tr><td style="font-size:14px;">Relevé du '+ ittone.convertDate($('#dateStart').getDate()) +' au '+ ittone.convertDate($('#dateEnd').getDate()) +'</td></tr>';
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
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [ 
        { "data": "soldTresorerie", "title": i18n.translate("soldTresorerie")},
        { "data": "montantRecettes", "title": i18n.translate("Debit") },
        { "data": "montantDepenses", "title": i18n.translate("Credit") }
    ];
    let getData_foter = [
        {
            soldTresorerie:$('.totalTable').data('SoldCaisse'),
            montantRecettes:$('.totalTable').data('totalDebit'),
            montantDepenses:$('.totalTable').data('totalCredit')}
    ];
    let option = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
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
            getData: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const excelMouvementCaisse = function () {
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
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}