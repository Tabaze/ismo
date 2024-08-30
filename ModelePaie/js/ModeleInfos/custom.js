$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalNiveau = $.modal.find('.Niveau');
    $.btnSauvegarderNiveau = $.modalNiveau.find('.btn-sauvegarder');
    $.btnNewNiveau = $.modalNiveau.find('.btn-new');
    $.btnAnnulerNiveau = $.modalNiveau.find('.btn-annuler');

    $.modalDepartement = $.modal.find('.Departement');
    $.btnSauvegarderDepartement = $.modalDepartement.find('.btn-sauvegarder');
    $.btnNewDepartement = $.modalDepartement.find('.btn-new');
    $.btnAnnulerDepartement = $.modalDepartement.find('.btn-annuler');

    $.modalFonction = $.modal.find('.Fonction');
    $.btnSauvegarderFonction = $.modalFonction.find('.btn-sauvegarder');
    $.btnNewFonction = $.modalFonction.find('.btn-new');
    $.btnAnnulerFonction = $.modalFonction.find('.btn-annuler');

    $.modalCategorie = $.modal.find('.Categorie');
    $.btnSauvegarderCategorie = $.modalCategorie.find('.btn-sauvegarder');
    $.btnNewCategorie = $.modalCategorie.find('.btn-new');
    $.btnAnnulerCategorie = $.modalCategorie.find('.btn-annuler');

    $.modalTaux = $.modal.find('.Taux');
    $.btnSauvegarderTaux = $.modalTaux.find('.btn-sauvegarder');
    $.btnNewTaux = $.modalTaux.find('.btn-new');
    $.btnAnnulerTaux = $.modalTaux.find('.btn-annuler');

    $.modalContrat = $.modal.find('.Contrat');
    $.btnSauvegarderContrat = $.modalContrat.find('.btn-sauvegarder');
    $.btnNewContrat = $.modalContrat.find('.btn-new');
    $.btnAnnulerContrat = $.modalContrat.find('.btn-annuler');

    $.btnCreate.on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'Paie_Niveau': ittone.show($.modalNiveau.parent());break;
            case 'Paie_Departement': ittone.show($.modalDepartement.parent());break;
            case 'Paie_Fonction': ittone.show($.modalFonction.parent());break;
            case 'Paie_Categorie': ittone.show($.modalCategorie.parent());break;
            case 'Paie_Taux': ittone.show($.modalTaux.parent());break;
            case 'Paie_Contrat': ittone.show($.modalContrat.parent());break;
        }
    });
    $.btnAnnulerNiveau.on('click',this,function(){
        ittone.hide($.modalNiveau.parent());
    });
    $.btnNewNiveau.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerDepartement.on('click',this,function(){
        ittone.hide($.modalDepartement.parent());
    });
    $.btnNewDepartement.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerFonction.on('click',this,function(){
        ittone.hide($.modalFonction.parent());
    });
    $.btnNewFonction.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerCategorie.on('click',this,function(){
        ittone.hide($.modalCategorie.parent());
    });
    $.btnNewCategorie.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerTaux.on('click',this,function(){
        ittone.hide($.modalTaux.parent());
    });
    $.btnNewTaux.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerContrat.on('click',this,function(){
        ittone.hide($.modalContrat.parent());
    });
    $.btnNewContrat.on('click',this,function(){
        settingForma(false);
    });
    $('#iR').on('change',this,function(){
        if($(this).is(':checked')){
            ittone.show($('#plafondIR').parent());
        }
        else{
            ittone.hide($('#plafondIR').parent());
        }
    })
    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Niveau':pdfNiveau();break; 
            case 'Paie_Departement': pdfDepartement();break;
            case 'Paie_Fonction': pdfFonction();break;
            case 'Paie_Categorie': pdfCategorie();break;
            case 'Paie_Taux': pdfTaux();break;
            case 'Paie_Contrat': pdfContrat();break;
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Niveau':excelNiveau();break; 
            case 'Paie_Departement': excelDepartement();break;
            case 'Paie_Fonction': excelFonction();break;
            case 'Paie_Categorie': excelCategorie();break;
            case 'Paie_Taux': excelTaux();break;
            case 'Paie_Contrat': excelContrat();break;
        }
    });
});
const settingForma=function(update){
    console.log(update)
    if(update){
        switch(ittone.getSubMenu()){
            case 'Paie_Niveau': 
            $.modalNiveau.data('update',true);
            ittone.show($.btnNewNiveau);
            break;
            case 'Paie_Departement': 
            $.modalDepartement.data('update',true);
            ittone.show($.btnNewDepartement);
            break;
            case 'Paie_Fonction': 
            $.modalFonction.data('update',true);
            ittone.show($.btnNewFonction);
            break;
            case 'Paie_Categorie': 
            $.modalCategorie.data('update',true);
            ittone.show($.btnNewCategorie);
            break;
            case 'Paie_Taux': 
            $.modalTaux.data('update',true);
            ittone.show($.btnNewTaux);
            break;
            case 'Paie_Contrat': 
            $.modalContrat.data('update',true);
            ittone.show($.btnNewContrat);
            break;
        }
        
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Paie_Niveau': 
            $.modalNiveau.data('update',false);
            ittone.hide($.btnNewNiveau);
            $('#formNiveau')[0].reset();
            break;
            case 'Paie_Departement': 
            $.modalDepartement.data('update',false);
            ittone.hide($.btnNewDepartement);
            $('#formDepartement')[0].reset();
            break;
            case 'Paie_Fonction': 
            $.modalFonction.data('update',false);
            ittone.hide($.btnNewFonction);
            $('#formFonction')[0].reset();
            break;
            case 'Paie_Categorie': 
            $.modalCategorie.data('update',false);
            ittone.hide($.btnNewCategorie);
            $('#formCategorie')[0].reset();
            break;
            case 'Paie_Taux': 
            $.modalTaux.data('update',false);
            ittone.hide($.btnNewTaux);
            $('#formTaux')[0].reset();
            break;
            case 'Paie_Contrat': 
            $.modalContrat.data('update',false);
            ittone.hide($.btnNewContrat);
            $('#formContrat')[0].reset();
            break;
        }
        $('select').trigger('change');
    }
}
const pdfNiveau=function(){
    let titel = '';
    titel = '<tr><td>Niveaux</td></tr>';
    let columns_title = [
        { "data": "nomNiveau", "title": i18n.translate("nomNiveau") },
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
const pdfDepartement=function(){
    let titel = '';
    titel = '<tr><td>Départements</td></tr>';
    let columns_title = [
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
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
const pdfFonction=function(){
    let titel = '';
    titel = '<tr><td>Fonctions</td></tr>';
    let columns_title = [
        { "data": "nomFonction", "title": i18n.translate("nomFonction") },
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
const pdfCategorie=function(){
    let titel = '';
    titel = '<tr><td>Catégories</td></tr>';
    let columns_title = [
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
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
const pdfTaux=function(){
    let titel = '';
    titel = '<tr><td>Taux Frais Professionnel</td></tr>';
    let columns_title = [
        { "data": "codeTaux", "title": i18n.translate("codeTaux") },
        { "data": "libelleTaux", "title": i18n.translate("libelleTaux") },
        { "data": "taux", "title": i18n.translate("taux") },
        { "data": "plafond", "title": i18n.translate("plafond") },
        { "data": "refTaux", "title": i18n.translate("refTaux") },
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
const pdfContrat=function(){
    let titel = '';
    titel = '<tr><td>Profil Des Contrats</td></tr>';
    let columns_title = [
        { "data": "nomProfil", "title": i18n.translate("nomProfil") },
        { "data": "typeProfil", "title": i18n.translate("typeProfil") },
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
const excelNiveau=function(){
    let columns_title = [
        { "data": "nomNiveau", "title": i18n.translate("nomNiveau") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelDepartement=function(){
    let columns_title = [
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelFonction=function(){
    let columns_title = [
        { "data": "nomFonction", "title": i18n.translate("nomFonction") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelCategorie=function(){
    let columns_title = [
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelTaux=function(){
    let columns_title = [
        { "data": "codeTaux", "title": i18n.translate("codeTaux") },
        { "data": "libelleTaux", "title": i18n.translate("libelleTaux") },
        { "data": "taux", "title": i18n.translate("taux") },
        { "data": "plafond", "title": i18n.translate("plafond") },
        { "data": "refTaux", "title": i18n.translate("refTaux") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelContrat=function(){
    let columns_title = [
        { "data": "nomContrat", "title": i18n.translate("nomContrat") },
        { "data": "typeProfil", "title": i18n.translate("typeProfil") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
