import { insertUpdateDevice, DeviceById, deleteDevice, testConnect, getUsers, logDataImport } from './service.js';/* Device */
import { deletePlanning, PlanningById, insertUpdatePlanning } from './service.js';/*Planning*/
import { insertPointage, PointageById, deletePointage } from './service.js';/*Pointage*/
import { tableDevice, selectDevice, tablePointageMachine, tablePointagePlanning, tablePlanning, tablePointageMachineAbsents } from './component.js';
import { selectEmploye } from '../ModeleEmploye/component.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Paie_Device': data.map(function (dt) {
                        if (deleteDevice({ id: dt.idDevice })) {
                            ittone.deleteRowDataTable(tableRander, dt.idDevice);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Planification': data.map(function (dt) {
                        if (deletePlanning({ id: dt.idPlanning })) {
                            ittone.deleteRowDataTable(tableRander, dt.idPlanning);
                            ittone.success("successfully");
                        }
                    }); break;
                }
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#deletePointage').on('click', this, function () {
        $('#idPointage').html('');
        ittone.show($.modalsupressionPointage.parent());
        let data = tableRander.row({ selected: true }).data();
        let combo = $('#idPointage');
        if (data.idSortie == null) {
            combo.append('<option value="' + data.idEntree + '">' + ittone.convertTime(data.timeEntree) + '</option>');
        }
        else {
            combo.append('<option value="' + data.idEntree + '">' + ittone.convertTime(data.timeEntree) + '</option>');
            combo.append('<option value="' + data.idSortie + '">' + ittone.convertTime(data.timeSortie) + '</option>');
        }
    });
    $('#supressionHeure').on('click', this, function () {
        let data = tableRander.row({ selected: true }).data();
        ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
            let dataCombo = $('#idPointage').find('option:selected').val();
            if (deletePointage({ id: dataCombo })) {
                ittone.deleteRowDataTable(tableRander, data.idLogData);
                randerTablePointageMachine();
                ittone.success("successfully");
            }
        }, function () {
            ittone.warning("Cancel");
        });
    });
    $('#filterDate').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Pointage_Planification': randerTablePointagePlanning(); break;
            case 'Paie_Pointage_Machine': randerTablePointageMachine(); break;
        }
    });
    $('#formDevice').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalDevice.data('update') && role.update()) {
                data.idDevice = $.modalDevice.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDevice(param)[0];
                if (list.idDevice) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idDevice);
                }

            } else if (!$.modalDevice.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDevice(param)[0];
                if (list.idDevice) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalDevice.attr('id', list.idDevice);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formLogData').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = {
                idDevice: $('#idDevice').val(),
                ip: $('#idDevice').select2('data')[0].data.ipDevice,
                port: $('#idDevice').select2('data')[0].data.portDevice,
                MachineNumber: $('#idDevice').select2('data')[0].data.machingNumber,
            }
            let result = logDataImport(data);
            if (result == false) {
                ittone.warning("L'appareil n'est pas connecté")
            }
            else {
                ittone.success("L'appareil est connecté avec succès")
            }
        }
    });
    $('#formPlanning').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.checkPause = $('#checkPause').is(':checked');
            data.heureDepartDe = $('#heureDepartDe').getTime();
            data.heureDepartA = $('#heureDepartA').getTime();
            if ($('#heurePauseDe').getTime() == '' || $('#heurePauseDe').getTime() == 'Invalid date') {
                data.heurePauseDe = null;
            }
            else {
                data.heurePauseDe = $('#heurePauseDe').getTime();
            }
            if ($('#heurePauseA').getTime() == '' || $('#heurePauseA').getTime() == 'Invalid date') {
                data.heurePauseA = null;
            }
            else {
                data.heurePauseA = $('#heurePauseA').getTime();
            }
            data.heureSortie = $('#heureSortie').getTime();
            if ($.modalPlanning.data('update') && role.update()) {
                data.idPlanning = $.modalPlanning.attr('id');
                data.statement = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePlanning(param)[0];
                if (list.idPlanning) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idPlanning);
                }

            } else if (!$.modalPlanning.data('update') && role.insert()) {
                data.statement = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdatePlanning(param)[0];
                if (list.idPlanning) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalPlanning.attr('id', list.idPlanning);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formPointage').on('submit', this, function () {
        if (this.checkValidity()) {
            let enrol = $('#idEmploye').val();
            enrol.forEach((element, i) => {
                let data = {};
                data.enrolNumber = $('#idEmploye').select2('data')[i].data.idUserDevice;
                data.dateTimeRecord = $('#dateTimeRecord').getDate();
                data.timeRecord = $('#timeRecord').getTime();
                let param = {
                    param: [data]
                }
                let list = insertPointage(param)[0];
                if (list.idLogData) {
                    if (ittone.getSubMenu() == 'Paie_Pointage_Machine') {
                        ittone.success('successfully');
                        settingForma(true);
                        randerTablePointageMachine();
                    }
                    else {
                        ittone.success('successfully');
                        settingForma(true);
                        ittone.addInDataTable(tableRander, list);
                    }
                }
            });
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Device': randerFormDevice(tableRander.row(this).data().idDevice); break;
            case 'Paie_Planification': randerFormPlanning(tableRander.row(this).data().idPlanning); break;
            case 'Paie_Pointage_Planification': randerFormPointage(tableRander.row(this).data().idLogData); break;
        }
        $('select').trigger('change');
    });
    $('#testConnect').on('click', this, function () {
        let ip = $('#ipDevice').val();
        let port = $('#portDevice').val();
        let MachineNumber = $('#machingNumber').val();
        if (ip == '' || port == '' || MachineNumber == '') {
            ittone.warning('Remplir Tous les champs !!')
        }
        else {
            let result = testConnect({ ip: ip, port: port, MachineNumber: MachineNumber });
            console.log(result);
            if (result == false) {
                ittone.warning("L'appareil n'est pas connecté")
            }
            else {
                ittone.success("L'appareil est connecté avec succès")
            }
        }
    });
    $('#getUsers').on('click', this, function () {
        //$.LoadingOverlay("show");
        let ip = $('#ipDevice').val();
        let port = $('#portDevice').val();
        let MachineNumber = $('#machingNumber').val();
        let idDevice = $.modalDevice.attr('id');
        if (ip == '' || port == '' || MachineNumber == '') {
            ittone.warning('Remplir Tous les champs !!')
        }
        else {
            let result = getUsers({ ip: ip, port: port, MachineNumber: MachineNumber, idDevice: idDevice }, function () {
                ittone.lodingShow();
            }, function (dt) {
                console.log(dt)
                ittone.warning(dt)
                ittone.lodingHide();
            });
            // console.log(result);
            // if (result == false) {
            //     ittone.warning("L'appareil n'est pas connecté")
            // }
            // else {
            //     ittone.success("L'appareil est connecté avec succès")
            // }
        }
        //$.LoadingOverlay("hide");
    });
    $('#checkEmploye').on('change', this, function () {
        if ($(this).is(':checked')) {
            $("#idEmploye > option:not([value=-1])").prop("selected", "selected");
            $("#idEmploye").trigger("change");
        }
        else {
            $("#idEmploye").val('').trigger("change");
        }
    });
    $('#filtrageEmp').on('change', this, function () {
        if ($('#filtrageEmp').val() == 'absents') {
            randerTablePointageMachineAbsents();
        }
        else {
            randerTablePointageMachine();
        }
    });
});
var tableRander;
const loadApp = function () {
    let name = ittone.getSubMenu();
    //ittone.lodingShow();
    //ittone.lodingHide();
    const startOfMonth = moment().startOf('Day').toDate();
    const endOfMonth = moment().endOf('Day').toDate();
    switch (name) {
        case 'Paie_Device': randerTableDevice(); $('#import').remove(); $('.CalendarDiv').remove(); $('#deletePointage').remove(); $('.filtrageEmpDiv').remove(); break;
        case 'Paie_Planification': randerTablePlanning(); $('#import').remove(); $('.CalendarDiv').remove(); $('#deletePointage').remove(); $('.filtrageEmpDiv').remove(); break;
        case 'Paie_Pointage_Machine':
            $('#dateStart').setDate(startOfMonth);
            $('#dateEnd').setDate(endOfMonth);
            randerTablePointageMachine();
            // selectDevice($('#idDevice'));
            selectEmploye($('#idEmploye'));
            $('#deleteRow').remove();
            //$.btnCreate.remove();
            //$('#import').remove();
            break;
        case 'Paie_Pointage_Planification':
            $('#dateStart').setDate(startOfMonth);
            $('#dateEnd').setDate(endOfMonth);
            randerTablePointagePlanning();
            selectDevice($('#idDevice'));
            selectEmploye($('#idEmploye'));
            $('#deleteRow').remove();
            $('#deletePointage').remove();
            $('.filtrageEmpDiv').remove();
            break;
    }
}
const randerTableDevice = function () {
    let columns_title = [
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
        { "data": "ipDevice", "title": i18n.translate("ipDevice") },
        { "data": "portDevice", "title": i18n.translate("portDevice") },
    ];
    tableRander = tableDevice($.tableView, columns_title);
}
const randerFormDevice = function (id) {
    let list = DeviceById({ id: id })[0];
    $.modalDevice.attr('id', id);
    ittone.convertJsonToForm($('#formDevice'), list);
    ittone.show($.modalDevice.parent());
    settingForma(true);
}
const randerTablePointageMachine = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
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
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
        // { "data": "descriptionPlanning", "title": i18n.translate("descriptionPlanning") },
        // { "data": "nomPlanning", "title": i18n.translate("nomPlanning") },
    ];
    let dt = {
        dateD: $('#dateStart').getDate(),
        dateE: $('#dateEnd').getDate(),
    }
    let param = {
        param: [dt]
    }
    tableRander = tablePointageMachine($.tableView, columns_title, param);
}
const randerTablePointageMachineAbsents = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        {
            "data": "nomEmploye", "title": i18n.translate("dateTimeRecord"),
            render: function (nomEmploye) {
                return ' - ';
            }
        },
        {
            "data": "nomEmploye", "title": i18n.translate("timeEntree"),
            render: function (nomEmploye) {
                return ' - ';
            }
        },
        {
            "data": "nomEmploye", "title": i18n.translate("timeSortie"),
            render: function (nomEmploye) {
                return ' - ';
            }
        },
        {
            "data": "nomEmploye", "title": i18n.translate("duree"),
            render: function (nomEmploye) {
                return ' - ';
            }
        },
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
    ];
    let dt = {
        dateD: $('#dateStart').getDate(),
        dateE: $('#dateEnd').getDate(),
    }
    let param = {
        param: [dt]
    }
    tableRander = tablePointageMachineAbsents($.tableView, columns_title, param);
}
const randerTablePointagePlanning = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
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
        // {
        //     "data": "duree", "title": i18n.translate("duree"),
        //     render: function (duree) {
        //         if (duree == null) {
        //             return ' '
        //         }
        //         else {
        //             let m = moment();
        //             m.set({ hour: duree.Hours, minute: duree.Minutes })
        //             return m.format('LT');
        //         }
        //     }
        // },
        { "data": "descriptionPlanning", "title": i18n.translate("descriptionPlanning") },
        { "data": "nomPlanning", "title": i18n.translate("nomPlanning") },
        { "data": "nameDevice", "title": i18n.translate("nameDevice") },
    ];
    let dt = {
        dateD: $('#dateStart').getDate(),
        dateE: $('#dateEnd').getDate(),
    }
    let param = {
        param: [dt]
    }
    tableRander = tablePointagePlanning($.tableView, columns_title, param);
}
const randerFormPointage = function (id) {
    let list = PointageById({ id: id })[0];
    $.modalPointage.attr('id', id);
    ittone.convertJsonToForm($('#formPointage'), list);
    $('#dateTimeRecord').setDate(list.dateTimeRecord);
    $('#idEmploye').val(list.idEmploye).trigger('change');
    $('#timeRecord').setTime(list.timeRecord);
    ittone.show($.modalPointage.parent());
    settingForma(true);
}
const randerTablePlanning = function () {
    let columns_title = [
        { "data": "nomPlanning", "title": i18n.translate("nomPlanning") },
        {
            "data": "heureDepartDe", "title": i18n.translate("heureDepartDe"),
            render: function (heureDepartDe) {
                let m = moment();
                m.set({ hour: heureDepartDe.Hours, minute: heureDepartDe.Minutes })
                return m.format('LT');
            }
        },
        {
            "data": "heureDepartA", "title": i18n.translate("heureDepartA"),
            render: function (heureDepartA) {
                let m = moment();
                m.set({ hour: heureDepartA.Hours, minute: heureDepartA.Minutes })
                return m.format('LT');
            }
        },
        {
            "data": "heurePauseDe", "title": i18n.translate("heurePauseDe"),
            render: function (heurePauseDe) {
                if (heurePauseDe == null) {
                    return 'Sans Pause'
                }
                else {
                    let m = moment();
                    m.set({ hour: heurePauseDe.Hours, minute: heurePauseDe.Minutes })
                    return m.format('LT');
                }
            }
        },
        {
            "data": "heurePauseA", "title": i18n.translate("heurePauseA"),
            render: function (heurePauseA) {
                if (heurePauseA == null) {
                    return 'Sans Pause'
                }
                else {
                    let m = moment();
                    m.set({ hour: heurePauseA.Hours, minute: heurePauseA.Minutes })
                    return m.format('LT');
                }
            }
        },
        {
            "data": "heureSortie", "title": i18n.translate("heureSortie"),
            render: function (heureSortie) {
                let m = moment();
                m.set({ hour: heureSortie.Hours, minute: heureSortie.Minutes })
                return m.format('LT');
            }
        },
    ];
    tableRander = tablePlanning($.tableView, columns_title);
}
const randerFormPlanning = function (id) {
    let list = PlanningById({ id: id })[0];
    $.modalPlanning.attr('id', id);
    ittone.convertJsonToForm($('#formPlanning'), list);
    $('#checkPause').setChecked(list.checkPause);
    $('#heureDepartDe').setTime(list.heureDepartDe);
    $('#heureDepartA').setTime(list.heureDepartA);
    $('#heurePauseDe').setTime(list.heurePauseDe);
    $('#heurePauseA').setTime(list.heurePauseA);
    $('#heureSortie').setTime(list.heureSortie);
    ittone.show($.modalPlanning.parent());
    settingForma(true);
}

