$(document).ready(function() {
    $.screenAfficherOrdre=$('.screen-afficher-Ordre.screen');
    $.tableViewOrdre=$('.screen-afficher-Ordre.screen .tableView');
    $.btnCreateOrdre = $('.screen-afficher-Ordre.screen .btn-create');
    $.kaibanViewOrdre=$('.screen-afficher-Ordre.screen .kaibanView');
    $.modalOrdre = $.modal.find('.Ordre');
    
    $.btnSauvegarderOrdre = $.modalOrdre.find('.btn-sauvegarder');
    $.btnNewOrdre = $.modalOrdre.find('.btn-new');
    $.btnAnnulerOrdre = $.modalOrdre.find('.btn-annuler');

    $.modalCalculQte=$.modal.find('.CalculQte');
    $.btnSauvegarderCalculQte = $.modalCalculQte.find('.btn-sauvegarder');
    $.btnAnnulerCalculQte = $.modalCalculQte.find('.btn-annuler');

    $.tablelistArticleStock=$('#tablelistArticleStock');
    $.validerOrdre=$.modal.find('.validerOrdre');
    $.btnSauvegardervaliderOrdre = $.validerOrdre.find('.btn-sauvegarder');
    //$.btnNewOrdre = $.modalvaliderOrdre.find('.btn-new');
    $.btnAnnulervaliderOrdre = $.validerOrdre.find('.btn-annuler');
    
    $.modalOrdreLine = $.modal.find('.OrdreLine');
    $.tableViewOrdreLine=$.modalOrdreLine.find('.tableOrdreLine')
    $.btnAnnulerOrdre.on('click',this,function(){
        ittone.hide($.modalOrdre.parent());
    });
    $.btnAnnulerCalculQte.on('click',this,function(){
        ittone.hide($.modalCalculQte.parent());
    });


    $.btnNewOrdre.on('click',this,function(){
        //settingFormaOrdre(false);
        $.btnCreateOrdre.click();
    });
    $('#pdfOrdre').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Ordre':pdfOrdre();break; 
        }
    });
    $('#excelOrdre').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Ordre':excelOrdre();break; 
        }
    });
    $('#tableView,#kaibanView').on('click',this,function(){
        if($(this).attr('id')=='tableView'){
            ittone.show($.tableViewOrdre);
            ittone.hide($.kaibanViewOrdre);
            $(this).addClass('active');
            $('#kaibanView').removeClass('active');
        }else{
            ittone.hide($.tableViewOrdre);
            ittone.show($.kaibanViewOrdre);
            $(this).addClass('active');
            $('#tableView').removeClass('active');
        }
    });
    $.btnSauvegarderCalculQte .on('click',this,function(){
       let calculQte=0;
       let qteFabrication=$('#idLignArticleQte').select2('data')[0].data.qteFabrication;
       let qteLignFabrication=$('#idLignArticleQte').select2('data')[0].data.qteLignFabrication;
       let qteCalculQte=+$('#qteCalculQte').val();
       calculQte=(qteFabrication*qteCalculQte)/qteLignFabrication;
       if(calculQte>0){
        $('#qteOrdre').setVal(calculQte);
        ittone.hide($.modalCalculQte.parent());
       }
    });
});


const settingFormaOrdre=function(update){

    if(update){
        switch(ittone.getSubMenu()){
            case 'Ordre': 
            $.modalOrdre.data('update',true);
            ittone.show($.btnNewOrdre);
            break;
                   
        }
        
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Ordre': 
            $.modalOrdre.data('update',false);
            ittone.hide($.btnNewOrdre);
            $('#formOrdre')[0].reset();
            $('#datePlanification').setDate(moment());
            break;  
        }               
    }
}

const pdfOrdre=function(){
    let titel = '';
    titel = '<tr><td>Ordre</td></tr>';
    let columns_title = [
        { "data": "numOrdre", "title": i18n.translate("numOrdre") },
        { "data": "qteOrdre", "title": i18n.translate("qteOrdre") },
        { "data": "datePlanification", "title": i18n.translate("datePlanification"),
                render: function(datePlanification){
                return ittone.convertDate(datePlanification);
            } },
        { "data": "dateEndPlanification", "title": i18n.translate("dateEndPlanification"),
            render: function(dateEndPlanification){
            return ittone.convertDate(dateEndPlanification);
        } },
        { "data": "reference", "title": i18n.translate("reference") },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    let getData_Table = $.tableViewOrdre.find('table').DataTable().rows({ page: 'current' }).data().toArray();
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
}

const excelOrdre=function(){
    let columns_title = [
        { "data": "numOrdre", "title": i18n.translate("numOrdre") },
        { "data": "qteOrdre", "title": i18n.translate("qteOrdre") },
        { "data": "datePlanification", "title": i18n.translate("datePlanification"),
                render: function(datePlanification){
                return ittone.convertDate(datePlanification);
            } },
        { "data": "dateEndPlanification", "title": i18n.translate("dateEndPlanification"),
            render: function(dateEndPlanification){
            return ittone.convertDate(dateEndPlanification);
        } },
        { "data": "reference", "title": i18n.translate("reference") },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    let getData_Table = $.tableViewOrdre.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
