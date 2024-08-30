import { insertUpdateDepartement,DepartementById,deleteDepartement,insertUpdateEmployee,EmployeeById,deleteEmployee} from './service.js'
import { tableDepartement,tableEmployee,selectDepartement} from './component.js'
$(function () {
    loadApp();
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de la suppression', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Departement': data.map(function (dt) {
                        if (deleteDepartement({ id: dt.idDepartement })) {
                            ittone.deleteRowDataTable(tableRander, dt.idDepartement);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Employee': data.map(function (dt) {
                        if (deleteEmployee({ id: dt.idEmployee })) {
                            ittone.deleteRowDataTable(tableRander, dt.idEmployee);
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
    $('#formDepartement').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.modalDepartement.data('update') && role.update()) {
                data.idDepartement = $.modalDepartement.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDepartement(param)[0];
                if (list.idDepartement) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idDepartement);
                }
            } else if (!$.modalDepartement.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateDepartement(param)[0];
                if (list.idDepartement) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalDepartement.attr('id', list.idDepartement);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formEmployee').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateNaissance=$('#dateNaissance').getDate();
            if ($.modalEmployees.data('update') && role.update()) {
                data.idEmploye = $.modalEmployees.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateEmployee(param)[0];
                if (list.idEmploye) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idEmploye);
                }
            } else if (!$.modalEmployees.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateEmployee(param)[0];
                if (list.idEmploye) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalEmployees.attr('id', list.idEmploye);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Departement': randerFormDepartement(tableRander.row(this).data().idDepartement); break;
            case 'Employee': randerFormEmployee(tableRander.row(this).data().idEmploye); break;
        }
    });
});
var tableRander;
const loadApp = function () {
    let name = ittone.getSubMenu();
    switch (name) {
        case 'Departement': randerTableDepartement(); break;
        case 'Employee': 
            selectDepartement($('#idDepartement'));
            randerTableEmployee(); 
            break;
    }
}
const randerTableDepartement = function () {
    let columns_title = [
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
        { "data": "descDepartement", "title": i18n.translate("descDepartement") },
    ];
    tableRander = tableDepartement($.tableView, columns_title);
}
const randerFormDepartement = function (id) {
    let list = DepartementById({ id: id })[0];
    $.modalDepartement.attr('id', id);
    ittone.convertJsonToForm($('#formDepartement'), list);
    ittone.show($.modalDepartement.parent());
    settingForma(true);
}
const randerTableEmployee = function () {
    let columns_title = [
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "cinEmployee", "title": i18n.translate("cinEmployee") },
        { "data": "poste", "title": i18n.translate("poste") },
        { "data": "numBadge", "title": i18n.translate("numBadge") },
    ];
    tableRander = tableEmployee($.tableView, columns_title);
}
const randerFormEmployee = function (id) {
    let list = EmployeeById({ id: id })[0];
    $.modalEmployees.attr('id', id);
    ittone.convertJsonToForm($('#formEmployee'), list);
    $('#dateNaissance').setDate(list.dateNaissance);
    ittone.show($.modalEmployees.parent());
    settingForma(true);
}