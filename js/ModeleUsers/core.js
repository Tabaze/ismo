import { insertUpdateUsers, usersById, deleteUsers, insertUpdateLiaisonUsers, liaisonUsersById, emailParamById, insertUpdateEmailParam } from './service.js';/* Client */
import { insertUpdateRoles, rolesById, deleteRoles } from './service.js';/* Roles */
import { UpdateAppSettings, UserRolesUpdate, InstalUninstallerMenu, InstalUninstallerSubMenu, AppSettingsById } from './service.js';/* AppSettings */
import { insertUpdateEmailsSettings, EmailsSettingsByID } from './service.js';/* EmailsSettings */
import { tableUsers, tableRoles, selectUsersNotAdmin, selectRoles, templateMenu, templateSubMenu, tableEmailParam } from './component.js';
import { selectDepot, selectTresor, selectVille, selectPays } from '../ModeleBase/component.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Users': data.map(function (dt) {
                        if (deleteUsers({ id: dt.idUser })) {
                            ittone.deleteRowDataTable(tableRander, dt.idUser);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Roles': data.map(function (dt) {
                        if (deleteRoles({ id: dt.idRole })) {
                            ittone.deleteRowDataTable(tableRander, dt.idRole);
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
    $('#formUsers').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.typeAdmin = $('#typeAdmin').is(':checked');
            if ($.modalUsers.data('update') && role.update()) {
                data.idUser = $.modalUsers.attr('id');
                data.statment = 'update';
                if (data.passwordUser == '') {
                    data.passwordUser = null;
                }
                let param = {
                    param: [data]
                }
                let list = insertUpdateUsers(param)[0];
                if (list) {
                    if (list.idUser) {
                        ittone.success('successfully');
                        ittone.updateInDataTable(tableRander, list, list.idUser);
                    }
                } else {
                    ittone.warning('Informations Incorrectes');
                }


            } else if (!$.modalUsers.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateUsers(param)[0];
                if (list) {
                    if (list.idUser) {
                        ittone.success('successfully');
                        settingForma(true);
                        $.modalUsers.attr('id', list.idUser);
                        ittone.addInDataTable(tableRander, list)
                    }
                } else {
                    ittone.warning('Informations Incorrectes');
                }
            }
        }
    });
    $('#formLinks').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            // if($.modalLinks.data('update') && role.update()){
            let param = {
                param: [data]
            }
            let list = insertUpdateLiaisonUsers(param);
            if (list) {
                ittone.success('successfully');
            }
            // }else if(!$.modalLinks.data('update') && role.insert()){
            //     let param ={
            //             param:[data]
            //             }
            //     let list= insertUpdateLiaisonUsers(param)[0];    
            //     console.log(list)    
            //     if(list) {
            //         ittone.success('successfully');
            //         settingForma(true);
            //     }                           
            // }
        }
    });
    $('#formRoles').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.insertRole = $('#insertRole').is(':checked');
            data.updateRole = $('#updateRole').is(':checked');
            data.deleteRole = $('#deleteRole').is(':checked');
            data.selectByUser = $('#selectByUser').is(':checked');
            data.selectDoc = $('#selectDoc').is(':checked');
            data.selectALL = $('#selectALL').is(':checked');
            data.imprimerRole = $('#imprimerRole').is(':checked');
            data.valider = $('#valider').is(':checked');
            if ($.modalRoles.data('update') && role.update()) {
                data.idRole = $.modalRoles.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateRoles(param)[0];
                if (list.idRole) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idRole);
                }

            } else if (!$.modalRoles.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateRoles(param)[0];
                if (list.idRole) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalRoles.attr('id', list.idRole);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formAppSettings').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = {};
            data.tvaCheck = $('#tvaCheck').is(':checked');
            data.ttcCheck = $('#ttcCheck').is(':checked');
            data.subDepot = $('#subDepot').is(':checked');
            data.currencyFormat = JSON.stringify([{
                "pattern": $('#patternMoney').val(),
                "precision": $('#precisionMoney').val(),
                "symbol": $('#symbolMoney').val(),
                "decimal": $('#decimalMoney').val(),
                "separator": $('#separatorMoney').val()
            }]);
            data.qteFormat = JSON.stringify([{
                "pattern": $('#patternQTE').val(),
                "precision": $('#precisionQTE').val(),
                "symbol": $('#symbolQTE').val(),
                "decimal": $('#decimalQTE').val(),
                "separator": $('#separatorQTE').val()
            }]);
            let param = {
                param: [data]
            }
            let list = UpdateAppSettings(param);
            if (list) {
                ittone.success('successfully');
            }
        }
    });
    $('#formRolesUsers').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            let param = {
                param: [data]
            }
            let list = UserRolesUpdate(param);
            if (list) {
                ittone.success('successfully');
            }
        }
    });
    $('#formEmailParam').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.enableSsl = data.enableSsl == 'on'
            data.state = 'insert'
            console.log(data)
            if ($.modalEmail.data('update') && role.update()) {
                data.state = 'update'
                data.idParam = $.modalEmail.attr('data-id')
                let dt = insertUpdateEmailParam({ param: [data] })[0]
                if (dt.idParam) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, dt, dt.idParam);
                }
            }
            else if (role.insert()) {
                let dt = insertUpdateEmailParam({ param: [data] })[0]
                if (dt.idParam) {
                    ittone.success('Successfully')
                    ittone.addInDataTable(tableRander, dt)
                }
            }
        }
    });
    $('#formEmailsSettings').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.checkSMTP = $('#checkSMTP').is(':checked');
            data.idESettings = $.modalemailsSettings.attr('id');
            let param = {
                param: [data]
            }
            let list = insertUpdateEmailsSettings(param)[0];
            if (list) {
                ittone.success('successfully');
            }
        }
    });
    $('#Menu-tab-pane .m_appModeles').on('click', '.install,.uninstaller', function () {
        let data_in = $(this).attr('data-in');
        let idMenu = $(this).attr('data-id');
        let idUser = $('#idUserMenu').val();
        let list = InstalUninstallerMenu({ idMenu: idMenu, data_in: data_in, idUser: idUser });
        if (list)
            if (data_in == 'true') {
                $(this).addClass('install');
                $(this).removeClass('uninstaller');
                $(this).find('span').text('install');
                $(this).attr('data-in', 'false');
            } else {
                $(this).attr('data-in', 'true');
                $(this).removeClass('install');
                $(this).find('span').text('uninstaller');
                $(this).addClass('uninstaller');
            }
    });
    $('#idUserMenu').on('change', this, function () {
        templateMenu($('#Menu-tab-pane .m_appModeles'), $('#idUserMenu').val());
        templateSubMenu($('#listSubMenu'), $('#idUserMenu').val())
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Users': rabderFormUsers(tableRander.row(this).data().idUser); break;
            case 'Roles': randerFormRoles(tableRander.row(this).data().idRole); break;
            case 'email_param': randerFormEmailsParam(tableRander.row(this).data().idParam); break;
        }
    });
    $('#listSubMenu').on('change', 'input', function () {
        InstalUninstallerSubMenu({ data_in: $(this).is(':checked'), idSubMenu: $(this).attr('data-id'), idUser: $('#idUserMenu').val() })
    });
    $('#appSettings').on('click', this, function () {
        randerFormAppSettings();
    });
    $('#emailsSettings').on('click', this, function () {
        randerFormEmailsSettings();
    });
    $('#linkRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        let data = rows.data();
        let list = liaisonUsersById({ id: data[0].idUser })[0];
        if (list) {
            ittone.convertJsonToForm($('#formLinks'), list);
        }
        else {
            $('#formLinks')[0].reset();
        }
        $('select').trigger('change');
        ittone.show($.modalLinks.parent());
    });
    $('#idPays').on('change', this, function () {
        if ($(this).val()) {
            let dt = { id: $(this).val() }
            selectVille($('#idVille'), dt);
        }
    })
});
var tableRander;
const loadApp = function () {
    let name = ittone.getSubMenu();
    switch (name) {
        case 'Users': randerTableUsers();
            selectDepot($('#idDepot'));
            selectTresor($('#idTreso'));
            selectPays($('#idPays'));
            break;
        case 'Roles': randerTableRoles(); $('#linkRow').remove(); break;
        case 'Settings':
            ittone.show($.screenSettings); ittone.hide($.screenAfficher);
            selectUsersNotAdmin($('[name="idUser"]'));
            selectRoles($('#idRole'));
            templateMenu($('#Menu-tab-pane .m_appModeles'), $('#idUserMenu').val());
            templateSubMenu($('#listSubMenu'), $('#idUserMenu').val())
            $('#linkRow').remove();
            break;
        case 'email_param':
            randerTableEmailParam()
            ittone.hide($.btnCreate)
            break;
    }
}
const randerTableUsers = function () {
    let columns_title = [
        { "data": "nomUser", "title": i18n.translate("nomUser") },
        { "data": "userName", "title": i18n.translate("userName") },
        {
            "data": "typeAdmin", "title": i18n.translate("typeAdmin"), render: function (typeAdmin) {
                if (typeAdmin) {
                    return '<i class="fas fa-check-circle"><span class="d-none">oui</span></i>';
                } else {
                    return '<i class="fas fa-times-circle"><span class="d-none">no</span></i>';
                }
            },
        },
    ];
    tableRander = tableUsers($.tableView, columns_title);
}
const randerTableEmailParam = function () {
    let columns_title = [
        { "data": "host", "title": i18n.translate("Host") },
        { "data": "port", "title": i18n.translate("port") },
        { "data": "username", "title": i18n.translate("userName") },
        {
            "data": "enableSsl", "title": i18n.translate("Enable SSL"), render: function (typeAdmin) {
                if (typeAdmin) {
                    return '<i class="fas fa-check-circle"></i>';
                } else {
                    return '<i class="fas fa-times-circle"></i>';
                }
            },
        },
    ];
    tableRander = tableEmailParam($.tableView, columns_title);
}
const rabderFormUsers = function (id) {
    let list = usersById({ id: id })[0];
    $.modalUsers.attr('id', id);
    ittone.convertJsonToForm($('#formUsers'), list);
    $('#typeAdmin').setChecked(list.typeAdmin);
    ittone.show($.modalUsers.parent());
    settingForma(true);
}
const randerTableRoles = function () {
    let columns_title = [
        { "data": "nameRole", "title": "Nom Rôle" },
        { "data": "insertRole", "title": "Enregistrement Rôle" },
        { "data": "updateRole", "title": "Modification Rôle" },
        { "data": "deleteRole", "title": "Suppression Rôle" },
        { "data": "selectByUser", "title": "Séléctionner par utilisateur" },
        { "data": "selectALL", "title": "Séléctionner Tous" },
        { "data": "selectDoc", "title": "Séléctionner Doc" },
    ];
    tableRander = tableRoles($.tableView, columns_title);
}
const randerFormRoles = function (id) {
    let list = rolesById({ id: id })[0];
    $.modalRoles.attr('id', id);
    ittone.convertJsonToForm($('#formRoles'), list);
    $('#insertRole').setChecked(list.insertRole);
    $('#updateRole').setChecked(list.updateRole);
    $('#deleteRole').setChecked(list.deleteRole);
    $('#selectByUser').setChecked(list.selectByUser);
    $('#deleteRole').setChecked(list.deleteRole);
    $('#selectByUser').setChecked(list.selectByUser);
    $('#imprimerRole').setChecked(list.imprimerRole);
    $('#valider').setChecked(list.valider);
    if (list.selectByUser) {
        $('#selectDoc').setChecked(true);
        $('#selectALL').setChecked(false);
        ittone.show($('#selectALL').closest('.form-check'));
        ittone.show($('#selectDoc').closest('.form-check'));
    } else {
        $('#selectDoc').setChecked(false);
        $('#selectALL').setChecked(false);
        ittone.hide($('#selectALL').closest('.form-check'));
        ittone.hide($('#selectDoc').closest('.form-check'));
    }
    settingForma(true);
    ittone.show($.modalRoles.parent());
}
const randerFormAppSettings = function () {
    let list = AppSettingsById()[0];
    $('#tvaCheck').setChecked(list.tvaCheck);
    $('#ttcCheck').setChecked(list.ttcCheck);
    $('#subDepot').setChecked(list.subDepot);
    let currencyFormat = JSON.parse(list.currencyFormat);
    $('#patternMoney').setVal(currencyFormat[0].pattern);
    $('#precisionMoney').setVal(currencyFormat[0].precision);
    $('#symbolMoney').setVal(currencyFormat[0].symbol);
    $('#decimalMoney').setVal(currencyFormat[0].decimal);
    $('#separatorMoney').setVal(currencyFormat[0].separator);
    let qteFormat = JSON.parse(list.qteFormat);
    $('#patternQTE').setVal(qteFormat[0].pattern);
    $('#precisionQTE').setVal(qteFormat[0].precision);
    $('#symbolQTE').setVal(qteFormat[0].symbol);
    $('#decimalQTE').setVal(qteFormat[0].decimal);
    $('#separatorQTE').setVal(qteFormat[0].separator);
    settingForma(true);
    ittone.show($.modalAppSettings.parent());
}
const randerFormEmailsSettings = function () {
    let list = EmailsSettingsByID()[0];
    ittone.convertJsonToForm($('#formEmailsSettings'), list);
    $('#checkSMTP').setChecked(list.checkSMTP);
    ittone.show($.modalemailsSettings.parent());
}
const randerFormEmailsParam = function (id) {
    let list = emailParamById({ id: id })[0];
    ittone.convertJsonToForm($('#formEmailParam'), list);
    $.modalEmail.attr('data-id', id);
    $.modalEmail.data('update', true);
    $('#enableSsl').setChecked(list.enableSsl);
    ittone.show($.modalEmail.parent());
}