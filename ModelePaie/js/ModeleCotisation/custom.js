$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalVariable = $.modal.find('.Variable');
    $.btnSauvegarderVariable = $.modalVariable.find('.btn-sauvegarder');
    $.btnNewVariable = $.modalVariable.find('.btn-new');
    $.btnAnnulerVariable = $.modalVariable.find('.btn-annuler');

    $.modalCotisation = $.modal.find('.Cotisation');
    $.btnSauvegarderCotisation = $.modalCotisation.find('.btn-sauvegarder');
    $.btnNewCotisation = $.modalCotisation.find('.btn-new');
    $.btnAnnulerCotisation = $.modalCotisation.find('.btn-annuler');

    $.modalRubrique = $.modal.find('.Rubrique');
    $.btnSauvegarderRubrique = $.modalRubrique.find('.btn-sauvegarder');
    $.btnNewRubrique = $.modalRubrique.find('.btn-new');
    $.btnAnnulerRubrique = $.modalRubrique.find('.btn-annuler');

    $.btnCreate.on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'Paie_Variable': ittone.show($.modalVariable.parent());break;
            case 'Paie_Cotisation': ittone.show($.modalCotisation.parent());break;
            case 'Paie_Rubrique': ittone.show($.modalRubrique.parent());break;
        }
    });
    $.btnAnnulerVariable.on('click',this,function(){
        ittone.hide($.modalVariable.parent());
    });
    $.btnNewVariable.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerCotisation.on('click',this,function(){
        ittone.hide($.modalCotisation.parent());
    });
    $.btnNewCotisation.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerRubrique.on('click',this,function(){
        ittone.hide($.modalRubrique.parent());
    });
    $.btnNewRubrique.on('click',this,function(){
        settingForma(false);
    });
    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Variable':pdfVariable();break; 
            case 'Paie_Cotisation': pdfCotisation();break;
            case 'Paie_Rubrique': pdfRubrique();break;
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Variable':excelVariable();break; 
            case 'Paie_Cotisation': excelCotisation();break;
            case 'Paie_Rubrique': excelRubrique();break;
        }
    });
});
const settingForma=function(update){
    if(update){
        switch(ittone.getSubMenu()){
            case 'Paie_Variable': 
            $.modalVariable.data('update',true);
            ittone.show($.btnNewVariable);
            break;
            case 'Paie_Cotisation': 
            $.modalCotisation.data('update',true);
            ittone.show($.btnNewCotisation);
            break;
            case 'Paie_Rubrique': 
            $.modalRubrique.data('update',true);
            ittone.show($.btnNewRubrique);
            break;
        }
        
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Paie_Variable': 
            $.modalVariable.data('update',false);
            ittone.hide($.btnNewVariable);
            $('#formVariable')[0].reset();
            break;
            case 'Paie_Cotisation': 
            $.modalCotisation.data('update',false);
            ittone.hide($.btnNewCotisation);
            $('#formCotisation')[0].reset();
            break;
            case 'Paie_Rubrique': 
            $.modalRubrique.data('update',false);
            ittone.hide($.btnNewRubrique);
            $('#formRubriques')[0].reset();
            break;
        }
        $('select').trigger('change');
    }
}
const pdfVariable=function(){
    let titel = '';
    titel = '<tr><td>Variables</td></tr>';
    let columns_title = [
        { "data": "codeVar", "title": i18n.translate("codeVar") },
        { "data": "libelleVar", "title": i18n.translate("libelleVar") },
        { "data": "valeurVar", "title": i18n.translate("valeurVar") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
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
            getData_foter: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const pdfCotisation=function(){
    let titel = '';
    titel = '<tr><td>Cotisations</td></tr>';
    let columns_title = [
        { "data": "codeCotis", "title": i18n.translate("codeCotis") },
        { "data": "libelleCotis", "title": i18n.translate("libelleCotis") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
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
            getData_foter: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const pdfRubrique=function(){
    let titel = '';
    titel = '<tr><td>Rubriques</td></tr>';
    let columns_title = [
        { "data": "codeRubrique", "title": i18n.translate("codeRubrique") },
        { "data": "libelleRubrique", "title": i18n.translate("libelleRubrique") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
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
            getData_foter: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
} 
const excelVariable=function(){
    let columns_title = [
        { "data": "codeVar", "title": i18n.translate("codeVar") },
        { "data": "libelleVar", "title": i18n.translate("libelleVar") },
        { "data": "valeurVar", "title": i18n.translate("valeurVar") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelCotisation=function(){
    let columns_title = [
        { "data": "codeCotis", "title": i18n.translate("codeCotis") },
        { "data": "libelleCotis", "title": i18n.translate("libelleCotis") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelRubrique=function(){
    let columns_title = [
        { "data": "codeRubrique", "title": i18n.translate("codeRubrique") },
        { "data": "libelleRubrique", "title": i18n.translate("libelleRubrique") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}