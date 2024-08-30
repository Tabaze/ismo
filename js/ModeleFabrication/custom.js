$(document).ready(function() {
    $.screenAfficher=$('.screen-afficher.screen');
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.tableArticleEntet=$('.tableArticleEntet');
    $.tableFabricationLign=$('.tableFabricationLign');
    $.modalOrdre = $.modal.find('.Ordre');
    $.btnSauvegarderOrdre = $.modalOrdre.find('.btn-sauvegarder');
    $.btnNewOrdre = $.modalOrdre.find('.btn-new');
    $.btnAnnulerOrdre = $.modalOrdre.find('.btn-annuler');

    $.screenFabrication = $('.screen-create.screen.Fabrication');
    $.btnSauvegarderFabrication = $.screenFabrication.find('.btn-sauvegarder');
    $.btnNewFabrication = $.screenFabrication.find('.btn-new');
    $.btnAnnulerFabrication = $.screenFabrication.find('.btn-annuler');

    $.btnCreate.on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'Ordre': ittone.show($.modalOrdre.parent());break;
            case 'Fabrication': ittone.hide($.screenAfficher);ittone.show($.screenFabrication); break;             
        }
    });
    $.btnAnnulerOrdre.on('click',this,function(){
        ittone.hide($.modalOrdre.parent());
    });
    $.btnNewOrdre.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerFabrication.on('click',this,function(){      
        ittone.show($.screenAfficher);ittone.hide($.screenFabrication);
        setTimeout(() => {   $.tableView.find('table').DataTable().draw(); }, 200);
       
    });
    $.btnNewFabrication.on('click',this,function(){
        settingForma(false);
    });
    $('#formLine').on('keyup','input',function(e){
        if(e.keyCode==13){
         $('#ajouterLign').click();
        }
     });
     $('#annulerLign').on('click',this,function(){
        settingFormLine();
    });
    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Fabrication':pdfFabrication();break; 
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Fabrication':excelFabrication();break; 
        }
    });
    $('#import').on('click',this,function(){
        window.location.href = 'Import.aspx?name=' + ittone.getSubMenu();
    })
});


const settingForma=function(update){
    setTimeout(() => {   $.tableArticleEntet.find('table').DataTable().draw(false); }, 200);
    setTimeout(() => {   $.tableFabricationLign.find('table').DataTable().draw(false); }, 200);
    if(update){
        switch(ittone.getSubMenu()){
            case 'Ordre': 
            $.modalOrdre.data('update',true);
            ittone.show($.btnNewOrdre);
            break;
            case 'Fabrication': 
            $.screenFabrication.data('update',true);
            ittone.show($.btnNewFabrication);
            break;             
        }
        
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Ordre': 
            $.modalOrdre.data('update',false);
            ittone.hide($.btnNewOrdre);
            $('#formOrdre')[0].reset();
            break;  
            case 'Fabrication': 
            $.screenFabrication.data('update',false);
            ittone.hide($.btnNewFabrication);
            $('#formFabrication')[0].reset();
            $.tableFabricationLign.find('table').DataTable().clear().draw();
            break;          
        }
        
        
    }
}
const settingFormLine =function(){
    $('#formLine').data('update',false);
    $('#formLine').data('info','');
    $('#refArticle').setVal('');
    $('#descLign').setVal('');
    $('#qteLignFabrication').setVal('');
    $('#qteFabrication').setVal('');
}

const pdfFabrication=function(){
    let titel = '';
    titel = '<tr><td>Fabrication</td></tr>';
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "reference", "title": i18n.translate("referenceArticle") },
        { "data": "info", "title": i18n.translate("info") },
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
}

const excelFabrication=function(){
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "reference", "title": i18n.translate("referenceArticle") },
        { "data": "info", "title": i18n.translate("info") },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}