import { dossierInsertUapdate, dossierList, dossierById } from './service.js';
import { templateDossier, templateAddDossier, selectAllDossier, checkBoxUsers, selectFoldersNameEntet } from './component.js';
import { insertNewUser, userLieeDossier, insertLieeDossier, deconnexion } from '../login/service.js';
$(function () {
    $.btnSauvegarderDossier.on('click', this, function () {
        let nav = $.tapDossier.find('.nav-link.active').attr('id');
        switch (nav) {
            case 'Generale-tab': $('#btnGenerale').click(); break;
            case 'Mise-page-tab': $('#btnMisePage').click(); break;
            case 'Woocommerce-tab': $('#btnWoocommerce').click(); break;
            case 'Exercice-tab':
                if ($.tapDossier.data('update')) {
                    let data = {
                        dateExeEnd: $('#dateExeEnd').getDate(),
                        dateExeStart: $('#dateExeStart').getDate(),
                    }
                    data.idDossier = $.tapDossier.attr('id');
                    data.statment = 'update';
                    data.update = 'Exercice-tab';
                    let param = {
                        param: [data]
                    }
                    if (dossierInsertUapdate(param)[0].idDossier) {
                        ittone.success('successfully');
                    }
                }
                break;
        }
    });
    $.btnSauvegarderGestionUser.on('click', this, function () {
        let nav = $.tapGestionUser.find('.nav-link.active').attr('id');
        switch (nav) {
            case 'addUser-tab': $('#btnAddUser').click(); break;
            case 'lieeDossier-tab': saveLieeDossier(); break;
            //case 'Woocommerce-tab':$('#btnWoocommerce').click();break;
        }
    });
    $('#listUsers').on('change', 'input', function () {
        $(this).toggleClass('change');
    });
    $('#idDossier').on('change', this, function () {
        randerCheckUsers();
    });
    $('#formAddUser').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.Type_usr = $('#Type_usr').is(':checked');
            if (insertNewUser(data)) {
                ittone.success('successfully');
            } else {
                ittone.warning('Incorrect information');
            }
        }
    });
    $('#formGenerale').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.tapDossier.data('update')) {
                data.idDossier = $.tapDossier.attr('id');
                data.statment = 'update';
                data.update = 'Generale-tab';
                let param = {
                    param: [data]
                }
                if (dossierInsertUapdate(param)[0].idDossier) {
                    ittone.success('successfully');
                }
            } else {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let idDossier = dossierInsertUapdate(param)[0].idDossier;
                if (idDossier) {
                    ittone.success('successfully');
                    $.tapDossier.attr('id', idDossier);
                    settingForma(true);
                    randerListDossier();
                } else {
                    ittone.error('error');
                }
            }
        }
    });
    $('#formMisePage').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.tapDossier.data('update')) {
                data.idDossier = $.tapDossier.attr('id');
                data.statment = 'update';
                data.update = 'Mise-page-tab';
                let param = {
                    param: [data]
                }
                if (dossierInsertUapdate(param)[0].idDossier) {
                    ittone.success('successfully');
                }
            }
        }
    });
    $('#formWoocommerce').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($.tapDossier.data('update')) {
                data.idDossier = $.tapDossier.attr('id');
                data.statment = 'update';
                data.update = 'Woocommerce-tab';
                let param = {
                    param: [data]
                }
                if (dossierInsertUapdate(param)[0].idDossier) {
                    ittone.success('successfully');
                }
            }
        }
    });
    $.listDossier.on('click', '.folder:not(.add-folder)', function (e) {
        if (!$(e.target).hasClass('fa-ellipsis-vertical') && !$(e.target).hasClass('dropdown-item')) {
            sessionStorage.setItem('dataDossier', JSON.stringify($(this).data('dataDossier')));
            window.location.href = 'HomeMenu.aspx';
        }
    });
    $.listDossier.on('click', '.dropdown-menu .dropdown-item', function () {
        let dataName = $(this).attr('data-name');
        let id = $(this).closest('.folder').data('dataDossier').idDossier;
        switch (dataName) {
            case 'updateDossier': randerModalDossier(id); break;
        }
    });
    $('#deconnecter').on('click', this, function () {
        if (deconnexion()) {
            window.location.href = 'Default.aspx';
        }
    });
    loadApp();
});
const loadApp = function () {
    selectAllDossier($('#idDossier'));
    selectFoldersNameEntet($('#Style_dossier'));
    randerCheckUsers();
    randerListDossier();
}
const randerListDossier = function () {
    $.listDossier.html('');
    let list = dossierList();
    for (let i in list) {
        let $temp = $(templateDossier(list[i]));
        $temp.data('dataDossier', list[i]);
        $.listDossier.append($temp);
    }
    let admin = JSON.parse(sessionStorage.getItem('user')).typeAdmin;
    if (admin) {
        $.listDossier.append(templateAddDossier());
    }
}
const randerModalDossier = function (id) {
    ittone.show($.modalDossier.parent());
    let data = dossierById({ idDossier: id })[0];
    ittone.convertJsonToForm($('#formGenerale'), data);
    ittone.convertJsonToForm($('#formMisePage'), data);
    ittone.convertJsonToForm($('#formWoocommerce'), data);
    $('#dateExeStart').setDate(data.dateExeStart);
    $('#dateExeEnd').setDate(data.dateExeEnd);
    $.tapDossier.attr('id', id);
    settingForma(true);
}
const randerCheckUsers = function () {
    let list = userLieeDossier({ idDossier: $('#idDossier').val() });
    $('#listUsers').html('');
    for (let i in list) {
        let $check = $(checkBoxUsers(list[i]));
        $($check.find('input')).setChecked(list[i].count)
        $('#listUsers').append($check);
    }
}
const saveLieeDossier = function () {
    $('#listUsers').find('input.change').each(function () {
        let idDossier = $('#idDossier').val();
        let Id_usr_login = $(this).attr('data-id');
        let type = $(this).is(':checked');
        insertLieeDossier({ idDossier: idDossier, idUser: Id_usr_login, type: type });
    })
}