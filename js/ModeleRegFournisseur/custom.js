$(document).ready(function() {
    $.screenAfficher=$('.screen-afficher.screen');
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');


    $.screenReglement = $('.screen-create.screen.ReglementFournisseur');
    $.btnSauvegarderReglement = $.screenReglement.find('.btn-sauvegarder');
    $.btnNewReglement = $.screenReglement.find('.btn-new');
    $.btnAnnulerReglement = $.screenReglement.find('.btn-annuler');

   
    $.btnAnnulerReglement.on('click',this,function(){      
        ittone.show($.screenAfficher);
        ittone.hide($.screenReglement);
       
    });
    $.btnNewReglement.on('click',this,function(){
        settingForma(false);
    });
    $('#pdf').on('click',this,function(){
        let titel = '';
        switch (ittone.getSubMenu()) {
            case 'ESPF': titel = '<tr><td>ESPECE</td></tr>'; break;
            case 'CHFFF': titel = '<tr><td>CHEQUE</td></tr>'; break;
            case 'EFFETFR': titel = '<tr><td>EFFET DE COMMERCE</td></tr>'; break;
            case 'VRMBNQFR': titel = '<tr><td>VIREMENT BANCAIRE</td></tr>'; break;
            case 'PRLFR': titel = '<tr><td>PRELEVEMENT</td></tr>'; break;
            case 'PYF': titel = '<tr><td>PAYES</td></tr>'; break;
            case 'IPYF': titel = '<tr><td>IMPAYES</td></tr>'; break;
            case 'RNDF': titel = '<tr><td>RENDU</td></tr>'; break;
        }
        let columns_title = [
            { "data": "numReglement", "title": i18n.translate("numReglement") },
            { "data": "dateReglement", "title": i18n.translate("dateReglement"),   
            render: function(dateReglement){
                return ittone.convertDate(dateReglement);
            } },
            { "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),   
            render: function(dateEcheanche){
                return ittone.convertDate(dateEcheanche);
            } },
            { "data": "numCheque", "title": i18n.translate("numCheque") },
            { "data": "nom", "title": i18n.translate("nom") },
            { "data": "info", "title": i18n.translate("info") },
            { "data": "nameTreso", "title": i18n.translate("nameTreso") },
            { "data": "montant", "title": i18n.translate("montant"),
                render: function(montant){
                return ittone.CurrencyFormat(montant);
                } 
            },
            { "data": "nomUser", "title": i18n.translate("nomUser") }
        ];
        let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let columns_foter = [];
        let getData_foter = '<tr><td></td></tr>';
    
        let option = {
            orientation:'l',
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
    $('#excel').on('click',this,function(){
        let columns_title = [
            { "data": "numReglement", "title": i18n.translate("numReglement") },
            { "data": "dateReglement", "title": i18n.translate("dateReglement"),   
            render: function(dateReglement){
                return ittone.convertDate(dateReglement);
            } },
            { "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),   
            render: function(dateEcheanche){
                return ittone.convertDate(dateEcheanche);
            } },
            { "data": "numCheque", "title": i18n.translate("numCheque") },
            { "data": "nom", "title": i18n.translate("nom") },
            { "data": "info", "title": i18n.translate("info") },
            { "data": "nameTreso", "title": i18n.translate("nameTreso") },
            { "data": "montant", "title": i18n.translate("montant"),
                render: function(montant){
                return ittone.CurrencyFormat(montant);
                } 
            },
            { "data": "nomUser", "title": i18n.translate("nomUser") }
        ];
        let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
            let data = {
                columns_title: columns_title,
                getData: getData_Table
            };
        excel.Defualt(data);
    });
    $('#import').on('click',this,function(){
        window.location.href = 'Import.aspx?name=' + ittone.getSubMenu();
    })
});
const settingForma=function(update){
    if(update){
        $.screenReglement.data('update',true);
        ittone.show($.btnNewReglement);
        
    }else{ 
        $.screenReglement.data('update',false);
        ittone.hide($.btnNewReglement);
        $('#formReglement')[0].reset();
        $.screenReglement.attr('id','');
        $('#dateReglement').setDate(moment());
    }
    $('select').trigger('change');
}
