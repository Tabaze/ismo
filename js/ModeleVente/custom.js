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

    $.modalReglement = $.modal.find('.Reglement');

    $.modalLierPropriete = $.modal.find('.addPropr');
    $.btnLierProp = $.modalLierPropriete.find('.btn-sauvegarder');
    $.btnAnnulerProp = $.modalLierPropriete.find('.btn-annuler');

    $.btnNewINVT.on('click', this, function () {
        $.btnCreate.click();
    });
    $('#linkPropriete').on('click', this, function () {
        ittone.show($.modalLierPropriete.parent());
    });
    $.btnAnnulerProp.on('click', this, function () {
        ittone.hide($.modalLierPropriete.parent());
    });
    $('#checkExpiration').on('change', this, function () {
        if ($(this).is(':checked')) {
            ittone.show($('#dateExpiration').parent())
        } else {
            ittone.hide($('#dateExpiration').parent())
        }
    });
    $('#ttc').on('change', this, function () {
        if ($('#ttc').is(':checked')) {
            $('#tva').setChecked(true);
        }
    });
    $('#tva').on('change', this, function () {
        if ($('#tva').is(':checked') == false) {
            $('#ttc').setChecked(false);
        }
    });
    $('#qteLign,#prixLign,#lgnRemise').on('keyup', this, function () {
        let qteLign = +$('#qteLign').val();
        let priLign = +$('#prixLign').val();
        let lgnRemise = +$('#lgnRemise').val();
        let totalLign = ittone.toFixedMoney((parseFloat(qteLign) * parseFloat(priLign)) * (1 - lgnRemise / 100));
        $('#totalLign').setVal(totalLign);
    });
    $('#annulerLign').on('click', this, function () {
        settingFormLine();
    });
    $('#formLine').on('keyup', 'input', function (e) {
        if (e.keyCode == 13) {
            $('#ajouterLign').click();
        }
    });
    $('#idModRglm').on('change', this, function () {
        let mod = $(this).select2('data')[0].data;
        if (mod.categModRglm == 'Chèque' || mod.categModRglm == 'Effet_de_commerce') {
            ittone.show($('#numCheq').closest('.form-outline'))
        } else {
            ittone.hide($('#numCheq').closest('.form-outline'))
        }
    });
    $('#pdf').on('click', this, function () {
        let titel = '';
        switch (ittone.getSubMenu()) {
            case 'DVS': titel = '<tr><td>DEVIS</td></tr>'; break;
            case 'BCC': titel = '<tr><td>B.COMMANDE-CL</td></tr>'; break;
            case 'BCHV': titel = '<tr><td>BON DE CHARGEMENT</td></tr>'; break;
            case 'BLFC': titel = '<tr><td>B.LIVRAISON-CL</td></tr>'; break;
            case 'FC': titel = '<tr><td>FACTURE-CL</td></tr>'; break;
            case 'BRC': titel = '<tr><td>B.AVOIR-CL</td></tr>'; break;
        }
        let columns_title = [
            { "data": "etatDoc", "title": i18n.translate("etatDoc") },
            {
                "data": "dateEntet", "title": i18n.translate("dateEntet"),
                render: function (dateEntet) {
                    return ittone.convertDate(dateEntet);
                }
            },
            { "data": "numFactur", "title": i18n.translate("numFactur"), render: (dt) => dt ? dt : '' },
            { "data": "orderNumber", "title": i18n.translate("orderNumber"), render: (dt) => dt ? dt : '' },
            { "data": "nom", "title": i18n.translate("nom"), render: (dt) => dt ? dt : '' },
            { "data": "nomDepot", "title": i18n.translate("nomDepot"), render: (dt) => dt ? dt : '' },
            {
                "data": "TT_ht", "title": i18n.translate("TT_ht"), render: function (TT_ht) {
                    return TT_ht ?  ittone.CurrencyFormat(TT_ht) : '';
                }
            },
            {
                "data": "TT_tva", "title": i18n.translate("TT_tva"), render: function (TT_tva) {
                    return TT_tva ?  ittone.CurrencyFormat(TT_tva) : '';
                }
            },
            {
                "data": "TT_ttc", "title": i18n.translate("TT_ttc"), render: function (TT_ttc) {
                    return TT_ttc ? ittone.CurrencyFormat(TT_ttc) : '';
                }
            },
            { "data": "nomModRglm", "title": i18n.translate("nomModRglm"), render: (dt) => dt ? dt : '' },
            {
                "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),
                render: function (dateEcheanche) {
                    return dateEcheanche? ittone.convertDate(dateEcheanche) : '';
                }
            },
            { "data": "managerCompany", "title": i18n.translate("managerCompany"), render: (dt) => dt ? dt : '' },
            { "data": "deliveryAd", "title": i18n.translate("deliveryAd"), render: (dt) => dt ? dt : '' },
            {
                "data": "nomUser", "title": i18n.translate("nomUser"), render: function (nomUser) {
                    return nomUser + '<div class="showLineEntet"><i class="fas fa-eye"></i></div>';
                }
            },
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
    });
    $('#excel').on('click', this, function () {
        let columns_title = [
            { "data": "etatDoc", "title": i18n.translate("etatDoc") },
            {
                "data": "dateEntet", "title": i18n.translate("dateEntet"),
                render: function (dateEntet) {
                    return ittone.convertDate(dateEntet);
                }
            },
            { "data": "numFactur", "title": i18n.translate("numFactur"), render: (dt) => dt ? dt : '' },
            { "data": "orderNumber", "title": i18n.translate("orderNumber"), render: (dt) => dt ? dt : '' },
            { "data": "nom", "title": i18n.translate("nom"), render: (dt) => dt ? dt : '' },
            { "data": "nomDepot", "title": i18n.translate("nomDepot"), render: (dt) => dt ? dt : '' },
            {
                "data": "TT_ht", "title": i18n.translate("TT_ht"), render: function (TT_ht) {
                    return TT_ht ?  ittone.CurrencyFormat(TT_ht) : '';
                }
            },
            {
                "data": "TT_tva", "title": i18n.translate("TT_tva"), render: function (TT_tva) {
                    return TT_tva ?  ittone.CurrencyFormat(TT_tva) : '';
                }
            },
            {
                "data": "TT_ttc", "title": i18n.translate("TT_ttc"), render: function (TT_ttc) {
                    return TT_ttc ? ittone.CurrencyFormat(TT_ttc) : '';
                }
            },
            { "data": "nomModRglm", "title": i18n.translate("nomModRglm"), render: (dt) => dt ? dt : '' },
            {
                "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),
                render: function (dateEcheanche) {
                    return dateEcheanche? ittone.convertDate(dateEcheanche) : '';
                }
            },
            { "data": "managerCompany", "title": i18n.translate("managerCompany"), render: (dt) => dt ? dt : '' },
            { "data": "deliveryAd", "title": i18n.translate("deliveryAd"), render: (dt) => dt ? dt : '' },
            {
                "data": "nomUser", "title": i18n.translate("nomUser"), render: function (nomUser) {
                    return nomUser + '<div class="showLineEntet"><i class="fas fa-eye"></i></div>';
                }
            },
        ];
        let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
        excel.Defualt(data);
    });
});
const settingForma = function (update) {
    setTimeout(() => { $.tableEntetLign.find('table').DataTable().draw(false); }, 200);
    setTimeout(() => { $.tableArticleEntet.find('table').DataTable().draw(false); }, 200);
    if (update) {
        $.screenINVT.data('update', true);
        ittone.show($.btnNewINVT);
        ittone.show($('#linkPropriete'));
        $('#idDepot,#checkExpiration,#tva,#ttc').setDisabled(true);
        $('.card-article,#formLine').removeClass('disabled');
        ittone.collapseHide($('#formEntet').closest('.card'))
        switch (ittone.getSubMenu()) {
            case 'MVTR':
                $('#idDepot_2').setDisabled(true);
                break;
        }
    }
    else {
        $.screenINVT.attr('id', '');
        $.screenINVT.data('update', false);
        ittone.hide($.btnNewINVT);
        ittone.hide($('#linkPropriete'));
        $('#formEntet')[0].reset();
        $('#dateEntet').setDate();
        $('#idDepot,#checkExpiration,#tva,#ttc').setDisabled(false);
        $('.card-article,#formLine').addClass('disabled');
        ittone.collapseShow($('#formEntet').closest('.card'));
        $('#formEntet').removeClass('disabled');
        $.btnSauvegarderINVT.removeClass('disabled');
        $('#checkExpiration').setChecked(false);
        $('#tva').setChecked(tvaCheck);
        $('#ttc').setChecked(ttcCheck);
        ittone.hide($('#dateExpiration').parent());
        $('#idModRglm').change();
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
    $('#lgnRemise').setVal('');
    $('#qteLign').setVal('');
    $('#prixLign').setVal('');
    $('#totalLign').setVal('');
}
const settingFormReglement = function () {
    $.modalReglement.data('update', false);
    $('#formReglement')[0].reset();
    $.modalReglement.data('info', '');
    ittone.hide($.modalReglement.parent());
}
const ttcCheck = ittone.settingParam().ttcCheck;
const tvaCheck = ittone.settingParam().tvaCheck;
const subDepot = ittone.settingParam().subDepot;