$(document).ready(function() {
    $.screenAfficher=$('.screen-afficher.screen');
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalEmployees = $('.modal-dialog.modal-lg.modal-dialog-centered.Employees');
    $.btnNewEmployee = $.modalEmployees.find('.btn-new');
    $.btnAnnulerEmployee = $.modalEmployees.find('.btn-annuler');

    $.modalDepartement = $('.modal-dialog.modal-lg.modal-dialog-centered.Departement');
    $.btnNewDepartement = $.modalDepartement.find('.btn-new');
    $.btnAnnulerDepartement = $.modalDepartement.find('.btn-annuler');

    $.btnCreate.on('click',this,function(){    
        settingForma(false);
        switch (ittone.getSubMenu()) {
            case 'Departement': ittone.show($.modalDepartement.parent()); break;
            case 'Employee': ittone.show($.modalEmployees.parent()); break;
        }  
    });
    $.btnAnnulerEmployee.on('click', this, function () {
        ittone.hide($.modalEmployees.parent());
    });
    $.btnNewEmployee.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerDepartement.on('click', this, function () {
        ittone.hide($.modalDepartement.parent());
    });
    $.btnNewDepartement.on('click', this, function () {
        settingForma(false);
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Departement': pdfDepartement(); break;
            case 'Employee': pdfEmployee(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Departement': excelDepartement(); break;
            case 'Employee': excelEmployee(); break;
        }
    });
});
const settingForma = function (update) {
    if(update){
        switch(ittone.getSubMenu()){
            case 'Departement': 
            $.modalDepartement.data('update',true);
            ittone.show($.btnNewDepartement);
            break;
            case 'Employee': 
            $.modalEmployees.data('update',true);
            ittone.show($.btnNewEmployee);
            break;           
        }       
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Departement': 
            $.modalDepartement.data('update',false);
            ittone.hide($.btnNewDepartement);
            $('#formDepartement')[0].reset();
            break;
            case 'Employee': 
            $.modalEmployees.data('update',false);
            ittone.hide($.btnNewEmployee);
            $('#formEmployee')[0].reset();
            break;         
        }  
    }
}
const pdfDepartement = function () {
    let titel = '';
    titel = '<tr><td>Département</td></tr>';
    let columns_title = [
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
        { "data": "descDepartement", "title": i18n.translate("descDepartement") },
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
const excelDepartement = function () {
    let columns_title = [
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
        { "data": "descDepartement", "title": i18n.translate("descDepartement") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const pdfEmployee = function () {
    let titel = '';
    titel = '<tr><td>Employée</td></tr>';
    let columns_title = [
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "cinEmployee", "title": i18n.translate("cinEmployee") },
        { "data": "poste", "title": i18n.translate("poste") },
        { "data": "numBadge", "title": i18n.translate("numBadge") },
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
const excelEmployee = function () {
    let columns_title = [
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "cinEmployee", "title": i18n.translate("cinEmployee") },
        { "data": "poste", "title": i18n.translate("poste") },
        { "data": "numBadge", "title": i18n.translate("numBadge") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}