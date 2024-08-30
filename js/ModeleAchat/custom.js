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

    $.btnNewINVT.on('click', this, function () {
        $.btnCreate.click();
    });
    $('#idFournisseur').on('change', this, function () {
        let data = $('#idFournisseur').select2('data')[0].data;
        if (data) {
            $('#nom').setVal(data.nomFournisseur);
            $('#info').setVal(data.nomVille + '\r\n' + data.nomPays)
        }
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
    })
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
            case 'BCFR': titel = '<tr><td>B.COMMANDE-FR</td></tr>'; break;
            case 'BLFFR': titel = '<tr><td>B.LIVRAISON-FR</td></tr>'; break;
            case 'FFR': titel = '<tr><td>FACTURE-FR</td></tr>'; break;
            case 'BRFR': titel = '<tr><td>B.RETOUR-FR</td></tr>'; break;
            case 'BAVFR': titel = '<tr><td>B.AVOIR-FR</td></tr>'; break;
        }
        let columns_title = [
            { "data": "etatDoc", "title": i18n.translate("etatDoc") },
            { "data": "dateEntet", "title": i18n.translate("dateEntet"),
                render: function(dateEntet){
                return ittone.convertDate(dateEntet);
            } 
            },
            { "data": "numFactur", "title": i18n.translate("numFactur") },
            { "data": "refFactur", "title": i18n.translate("refFactur") },
            { "data": "nom", "title": i18n.translate("nom") },
            { "data": "nomDepot", "title": i18n.translate("nomDepot") },
            { "data": "TT_ht", "title": i18n.translate("TT_ht"),render:function(TT_ht){
                return ittone.CurrencyFormat(TT_ht);
            } },
            { "data": "TT_tva", "title": i18n.translate("TT_tva"),render:function(TT_tva){
                return ittone.CurrencyFormat(TT_tva);
            } },
            { "data": "TT_ttc", "title": i18n.translate("TT_ttc"),render:function(TT_ttc){
                return ittone.CurrencyFormat(TT_ttc);
            } },
            { "data": "nomModRglm", "title": i18n.translate("nomModRglm") },
            { "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),
                render: function(dateEcheanche){
                return ittone.convertDate(dateEcheanche);
            }},
            { "data": "obs", "title": i18n.translate("obs") },
            { "data": "valider", "title": i18n.translate("valider"),render: function(valider) {
                if(valider){
                    return '<div class="text-center"><i class="fas fa-check-double"><span class="d-none">oui</span></i></div>';
                }else{
                    return '<div class="text-center"><i class="fas fa-times-circle"><span class="d-none">no</span></i></div>';
                }       
            }, },
            { "data": "clotur", "title": i18n.translate("clotur"),render: function(clotur) {
                if(clotur){
                    return '<div class="text-center"><i class="fas fa-lock"><span class="d-none">oui</span></i></div>';
                }else{
                    return '<div class="text-center"><i class="fas fa-lock-open"><span class="d-none">no</span></i></div>';
                }       
            } },
            { "data": "nomUser", "title": i18n.translate("nomUser"),render: function(nomUser) {
                return nomUser+'<div class="showLineEntet"><i class="fas fa-eye"></i></div>';
            } },
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
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },
        { "data": "nom", "title": i18n.translate("nom") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        { "data": "TT_ht", "title": i18n.translate("TT_ht"),render:function(TT_ht){
            return ittone.CurrencyFormat(TT_ht);
        } },
        { "data": "TT_tva", "title": i18n.translate("TT_tva"),render:function(TT_tva){
            return ittone.CurrencyFormat(TT_tva);
        } },
        { "data": "TT_ttc", "title": i18n.translate("TT_ttc"),render:function(TT_ttc){
            return ittone.CurrencyFormat(TT_ttc);
        } },
        { "data": "nomModRglm", "title": i18n.translate("nomModRglm") },
        { "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),
            render: function(dateEcheanche){
            return ittone.convertDate(dateEcheanche);
        }},
        { "data": "obs", "title": i18n.translate("obs") },
        { "data": "valider", "title": i18n.translate("valider"),render: function(valider) {
            if(valider){
                return '<div class="text-center"><i class="fas fa-check-double"><span class="d-none">oui</span></i></div>';
            }else{
                return '<div class="text-center"><i class="fas fa-times-circle"><span class="d-none">non</span></i></div>';
            }       
        }, },
        { "data": "clotur", "title": i18n.translate("clotur"),render: function(clotur) {
            if(clotur){
                return '<div class="text-center"><i class="fas fa-lock"><span class="d-none">oui</span></i></div>';
            }else{
                return '<div class="text-center"><i class="fas fa-lock-open"><span class="d-none">non</span></i></div>';
            }       
        } },
        { "data": "nomUser", "title": i18n.translate("nomUser"),render: function(nomUser) {
            return nomUser+'<div class="showLineEntet"><i class="fas fa-eye"></i></div>';
        } },
    
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
        $('#idDepot,#checkExpiration,#tva,#ttc').setDisabled(true);
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
        ittone.hide($.btnNewINVT);
        $('#formEntet')[0].reset();
        $('#dateEntet').setDate(moment());
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
const settingFormReglement =function(){
    $.modalReglement.data('update',false);
    $('#formReglement')[0].reset();
    $.modalReglement.data('info', '');
    ittone.hide($.modalReglement.parent());
}
const ttcCheck = ittone.settingParam().ttcCheck;
const tvaCheck = ittone.settingParam().tvaCheck;
const subDepot = ittone.settingParam().subDepot;
