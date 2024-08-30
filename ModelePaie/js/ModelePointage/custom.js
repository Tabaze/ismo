$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');

    $.modalDevice = $.modal.find('.Devices');
    $.btnSauvegarderDevice = $.modalDevice.find('.btn-sauvegarder');
    $.btnNewDevice = $.modalDevice.find('.btn-new');
    $.btnAnnulerDevice = $.modalDevice.find('.btn-annuler');

    $.modalimportLogData = $.modal.find('.importLogData');
    $.btnSauvegarderimportLogData = $.modalimportLogData.find('.btn-sauvegarder');
    $.btnAnnulerimportLogData = $.modalimportLogData.find('.btn-annuler');

    $.modalPlanning = $.modal.find('.Planning');
    $.btnSauvegarderPlanning = $.modalPlanning.find('.btn-sauvegarder');
    $.btnNewPlanning = $.modalPlanning.find('.btn-new');
    $.btnAnnulerPlanning = $.modalPlanning.find('.btn-annuler');

    $.modalPointage = $.modal.find('.pointage');
    $.btnSauvegarderPointage = $.modalPointage.find('.btn-sauvegarder');
    $.btnNewPointage = $.modalPointage.find('.btn-new');
    $.btnAnnulerPointage = $.modalPointage.find('.btn-annuler');

    $.modalsupressionPointage = $.modal.find('.supressionPointage');
    $.btnSauvegardersupressionPointage = $.modalsupressionPointage.find('#supressionHeure');
    $.btnAnnulersupressionPointage = $.modalsupressionPointage.find('.btn-annuler');

    $.btnCreate.on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'Paie_Device': ittone.show($.modalDevice.parent());break;
            case 'Paie_Planification': ittone.show($.modalPlanning.parent());break;
            case 'Paie_Pointage_Planification': ittone.show($.modalPointage.parent());break;
            case 'Paie_Pointage_Machine': ittone.show($.modalPointage.parent());break;
        }
    });
    $('#import').on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'Paie_Pointage_Planification': ittone.show($.modalimportLogData.parent());break;
            case 'Paie_Pointage_Machine': ittone.show($.modalimportLogData.parent());break;
        }
    });
    $.btnAnnulerDevice.on('click',this,function(){
        ittone.hide($.modalDevice.parent());
    }); 
    $.btnNewDevice.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerimportLogData.on('click',this,function(){
        ittone.hide($.modalimportLogData.parent());
    });
    $.btnAnnulerPlanning.on('click',this,function(){
        ittone.hide($.modalPlanning.parent());
    }); 
    $.btnNewPlanning.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerPointage.on('click',this,function(){
        ittone.hide($.modalPointage.parent());
    }); 
    $.btnNewPointage.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulersupressionPointage.on('click',this,function(){
        ittone.hide($.modalsupressionPointage.parent());
    }); 
    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Device': pdfDevice();break;
            case 'Paie_Pointage_Planification': pdfPointagePlanning();break;
            case 'Paie_Pointage_Machine': pdfPointageMachine();break;
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Device': excelDevice();break;
            case 'Paie_Pointage_Planification': excelPointagePlanning();break;
            case 'Paie_Pointage_Machine': excelPointageMachine();break;
        }
    });
    $('#checkPause').on('change', this, function () {
        if ($(this).is(':checked')) { ittone.show($('.pauseDiv')); } else { ittone.hide($('.pauseDiv')); }
    });
});
const settingForma=function(update){
    if(update){
        switch(ittone.getSubMenu()){
            case 'Paie_Device': 
            $.modalDevice.data('update',true);
            ittone.show($.btnNewDevice);
            break;
            case 'Paie_Planification': 
            $.modalPlanning.data('update',true);
            ittone.show($.btnNewPlanning);
            break;
            case 'Paie_Pointage_Planification': 
            $.modalPointage.data('update',true);
            ittone.show($.btnNewPointage);
            break;
            case 'Paie_Pointage_Machine': 
            $.modalPointage.data('update',true);
            ittone.show($.btnNewPointage);
            break;
        }      
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Paie_Device': 
            $.modalDevice.data('update',false);
            ittone.hide($.btnNewDevice);
            $('#formDevice')[0].reset();
            break;
            case 'Paie_Planification': 
            $.modalPlanning.data('update',false);
            ittone.hide($.btnNewPlanning);
            $('#formPlanning')[0].reset();
            break;
            case 'Paie_Pointage_Planification': 
            $.modalPointage.data('update',false);
            ittone.hide($.btnNewPointage);
            $('#formPointage')[0].reset();
            break;
            case 'Paie_Pointage_Machine': 
            $.modalPointage.data('update',false);
            ittone.hide($.btnNewPointage);
            $('#formPointage')[0].reset();
            break;
        }
        $('select').trigger('change');
    }
}
const pdfDevice=function(){
    let titel = '';
    titel = '<tr><td>Devices</td></tr>';
    let columns_title = [
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
        { "data": "ipDevice", "title": i18n.translate("ipDevice") },
        { "data": "portDevice", "title": i18n.translate("portDevice") },
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
};
const excelDevice=function(){
    let columns_title = [
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
        { "data": "ipDevice", "title": i18n.translate("ipDevice") },
        { "data": "portDevice", "title": i18n.translate("portDevice") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
};
const pdfPointagePlanning=function(){
    let titel = '';
    titel = '<tr><td>Liste Pointage Par Planification</td></tr>';
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        { "data": "matricule", "title": i18n.translate("matricule") },
        {
            "data": "dateTimeRecord", "title": i18n.translate("dateTimeRecord"),
            render: function (dateTimeRecord) {
                return ittone.convertDate(dateTimeRecord);
            }
        },
        {
            "data": "timeRecord", "title": i18n.translate("timeRecord"),
            render: function (timeRecord) {
                if (timeRecord == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: timeRecord.Hours, minute: timeRecord.Minutes })
                    return m.format('LT');
                }
            }
        },
        { "data": "descriptionPlanning", "title": i18n.translate("descriptionPlanning") },
        { "data": "nomPlanning", "title": i18n.translate("nomPlanning") },
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
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
};
const excelPointagePlanning=function(){
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        { "data": "matricule", "title": i18n.translate("matricule") },
        {
            "data": "dateTimeRecord", "title": i18n.translate("dateTimeRecord"),
            render: function (dateTimeRecord) {
                return ittone.convertDate(dateTimeRecord);
            }
        },
        {
            "data": "timeRecord", "title": i18n.translate("timeRecord"),
            render: function (timeRecord) {
                if (timeRecord == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: timeRecord.Hours, minute: timeRecord.Minutes })
                    return m.format('LT');
                }
            }
        },
        { "data": "descriptionPlanning", "title": i18n.translate("descriptionPlanning") },
        { "data": "nomPlanning", "title": i18n.translate("nomPlanning") },
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
};
const pdfPointageMachine=function(){
    let titel = '';
    titel = '<tr><td>Liste Pointage Par Machine</td></tr>';
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        {
            "data": "dateTimeRecord", "title": i18n.translate("dateTimeRecord"),
            render: function (dateTimeRecord) {
                return ittone.convertDate(dateTimeRecord);
            }
        },
        {
            "data": "timeEntree", "title": i18n.translate("timeEntree"),
            render: function (timeEntree) {
                if (timeEntree == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: timeEntree.Hours, minute: timeEntree.Minutes })
                    return m.format('LT');
                }
            }
        },
        {
            "data": "timeSortie", "title": i18n.translate("timeSortie"),
            render: function (timeSortie) {
                if (timeSortie == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: timeSortie.Hours, minute: timeSortie.Minutes })
                    return m.format('LT');
                }
            }
        },
        {
            "data": "duree", "title": i18n.translate("duree"),
            render: function (duree) {
                if (duree == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: duree.Hours, minute: duree.Minutes })
                    return m.format('LT');
                }
            }
        },
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
};
const excelPointageMachine=function(){
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        {
            "data": "dateTimeRecord", "title": i18n.translate("dateTimeRecord"),
            render: function (dateTimeRecord) {
                return ittone.convertDate(dateTimeRecord);
            }
        },
        {
            "data": "timeEntree", "title": i18n.translate("timeEntree"),
            render: function (timeEntree) {
                if (timeEntree == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: timeEntree.Hours, minute: timeEntree.Minutes })
                    return m.format('LT');
                }
            }
        },
        {
            "data": "timeSortie", "title": i18n.translate("timeSortie"),
            render: function (timeSortie) {
                if (timeSortie == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: timeSortie.Hours, minute: timeSortie.Minutes })
                    return m.format('LT');
                }
            }
        },
        {
            "data": "duree", "title": i18n.translate("duree"),
            render: function (duree) {
                if (duree == null) {
                    return ' '
                }
                else {
                    let m = moment();
                    m.set({ hour: duree.Hours, minute: duree.Minutes })
                    return m.format('LT');
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
};