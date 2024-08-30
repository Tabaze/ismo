$(document).ready(function () {
    $.screenAfficher = $('.screen-afficher.screen');
    $.tableView = $('.screen-afficher.screen .tableView');
    $.tableEntetLign = $('.tableEntetLign');
    $.tableArticleEntet = $('.tableArticleEntet');
    $.btnCreate = $('.screen-afficher.screen .btn-create');

    $.screenINVT = $('.screen-create.screen.INVT');
    $.btnSauvegarderINVT = $.screenINVT.find('.btn-sauvegarder');
    $.btnNewINVT = $.screenINVT.find('.btn-new');
    $.btnAnnulerINVT = $.screenINVT.find('.btn-annuler');

    $.btnNewINVT.on('click', this, function () {
        $.btnCreate.click();
    });
    $('#checkExpiration').on('change', this, function () {
        if ($(this).is(':checked')) {
            ittone.show($('#dateExpiration').parent())
        } else {
            ittone.hide($('#dateExpiration').parent())
        }
    })
    $('#qteLign,#prixLign').on('keyup', this, function () {
        let qteLign = +$('#qteLign').val();
        let priLign = +$('#prixLign').val();
        let totalLign = ittone.toFixedMoney((parseFloat(qteLign) * parseFloat(priLign)));
        $('#totalLign').setVal(totalLign);
    });
    $('#annulerLign').on('click', this, function () {
        settingFormLine();
    });
    $('#formLine').on('keyup', 'input', function (e) {
        if (e.keyCode == 13) {
            $('#ajouterLign').click();
        }
    })
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'INVT': pdfInventaire(); break;
            case 'MVTR': pdfMouvement(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'INVT': excelInventaire(); break;
            case 'MVTR': excelMouvement(); break;
        }
    });
});
const settingForma = function (update) {
    setTimeout(() => { $.tableEntetLign.find('table').DataTable().draw(); }, 200);
    setTimeout(() => { $.tableArticleEntet.find('table').DataTable().draw(); }, 200);
    if (update) {
        $.screenINVT.data('update', true);
        ittone.show($.btnNewINVT);
        $('#idDepot,#checkExpiration').setDisabled(true);
        $('#checkExpiration').setDisabled(true);
        $('.card-article,#formLine').removeClass('disabled');
        ittone.collapseHide($('#formEntet').closest('.card'))
        switch (ittone.getSubMenu()) {
            case 'MVTR':
                $('#idDepot_2').setDisabled(true);
                break;
        }
    } else {
        $.screenINVT.attr('id', '');
        $.screenINVT.data('update', false);
        $('#formEntet')[0].reset();
        ittone.hide($.btnNewINVT);
        $('#dateEntet').setDate(moment());
        $('#idDepot,#checkExpiration').setDisabled(false);
        $('.card-article,#formLine').addClass('disabled');
        ittone.collapseShow($('#formEntet').closest('.card'));

        $('#checkExpiration').setChecked(false);
        ittone.hide($('#dateExpiration').parent())
        switch (ittone.getSubMenu()) {
            case 'MVTR':
                $('#idDepot_2').setDisabled(false);
                break;
        }
    }
    $('select').trigger('change');
}
const settingFormLine = function () {
    $('#formLine').data('update', false);
    $('#formLine').data('info', '');
    $('#refArticle').setVal('');
    $('#descLign').setVal('');
    $('#descLign').setVal('');
    $('#qteLign').setVal('');
    $('#prixLign').setVal('');
    $('#totalLign').setVal('');
}
const pdfInventaire = function () {
    let titel = '';
    titel = '<tr><td>Inventaire</td></tr>';
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
            "data": "TT_ht", "title": i18n.translate("TT_ht"),
            render: function (TT_ht) {
                return ittone.CurrencyFormat(TT_ht);
            }
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
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
const excelInventaire = function () {
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
        { "data": "TT_ht", "title": i18n.translate("TT_ht") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const pdfMouvement = function () {
    let titel = '';
    titel = '<tr><td>Mouvement Transfert</td></tr>';
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
            "data": "TT_ht", "title": i18n.translate("TT_ht"),
            render: function (TT_ht) {
                return ittone.CurrencyFormat(TT_ht);
            }
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
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
const excelMouvement = function () {
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
        { "data": "TT_ht", "title": i18n.translate("TT_ht") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}