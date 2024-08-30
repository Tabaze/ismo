$(document).ready(function () {
    $.screenAfficher = $('.screen-afficher.screen');
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalUsers = $.modal.find('.Users');
    $.btnSauvegarderUsers = $.modalUsers.find('.btn-sauvegarder');
    $.btnNewUsers = $.modalUsers.find('.btn-new');
    $.btnAnnulerUsers = $.modalUsers.find('.btn-annuler');

    $.modalLinks = $.modal.find('.Links');
    $.btnSauvegarderLinks = $.modalLinks.find('.btn-sauvegarder');
    $.btnNewLinks = $.modalLinks.find('.btn-new');
    $.btnAnnulerLinks = $.modalLinks.find('.btn-annuler');

    $.modalRoles = $.modal.find('.Roles');
    $.btnSauvegarderRoles = $.modalRoles.find('.btn-sauvegarder');
    $.btnNewRoles = $.modalRoles.find('.btn-new');
    $.btnAnnulerRoles = $.modalRoles.find('.btn-annuler');


    $.modalEmail = $.modal.find('.email_param');
    $.btnSauvegarderEmail = $.modalEmail.find('.btn-sauvegarder');
    $.btnAnnulerEmail = $.modalEmail.find('.btn-annuler');

    $.modalMenu = $.modal.find('.Menu');
    $.btnAnnulerMenu = $.modalMenu.find('.btn-annuler');

    $.modalAppSettings = $.modal.find('.AppSettings');
    $.btnSauvegarderAppSettings = $.modalAppSettings.find('.btn-sauvegarder');
    $.btnNewAppSettings = $.modalAppSettings.find('.btn-new');
    $.btnAnnulerAppSettings = $.modalAppSettings.find('.btn-annuler');

    $.modalemailsSettings = $.modal.find('.emailsSettings');
    $.btnSauvegarderemailsSettings = $.modalemailsSettings.find('.btn-sauvegarder');
    $.btnNewemailsSettings = $.modalemailsSettings.find('.btn-new');
    $.btnAnnuleremailsSettings = $.modalemailsSettings.find('.btn-annuler');

    $.modalRolesUsers = $.modal.find('.RolesUsers');
    $.btnSauvegarderRolesUsers = $.modalRolesUsers.find('.btn-sauvegarder');
    $.btnNewRolesUsers = $.modalRolesUsers.find('.btn-new');
    $.btnAnnulerRolesUsers = $.modalRolesUsers.find('.btn-annuler');

    $.screenSettings = $('.screen-create.screen.Settings');


    $.btnCreate.on('click', this, function () {
        settingForma(false);
        switch (ittone.getSubMenu()) {
            case 'Users': ittone.show($.modalUsers.parent()); break;
            case 'Roles': ittone.show($.modalRoles.parent()); break;
            case 'email_param': ittone.show($.modalEmail.parent()); break;
        }
    });
    $.btnAnnulerUsers.on('click', this, function () {
        ittone.hide($.modalUsers.parent());
    });
    $.btnAnnulerEmail.on('click', this, function () {
        ittone.hide($.modalEmail.parent());
    });
    $.btnNewUsers.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnuleremailsSettings.on('click', this, function () {
        ittone.hide($.modalemailsSettings.parent());
    });
    $.btnNewemailsSettings.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerLinks.on('click', this, function () {
        ittone.hide($.modalLinks.parent());
    });
    $.btnNewLinks.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerRoles.on('click', this, function () {
        ittone.hide($.modalRoles.parent());
    });
    $.btnNewRoles.on('click', this, function () {
        settingForma(false);
    });
    $('#selectByUser').on('change', this, function () {
        let selectByUser = $('#selectByUser').is(':checked');
        if (selectByUser) {
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
    });
    $('#selectDoc').on('change', this, function () {
        let selectByUser = $('#selectByUser').is(':checked');
        let selectDoc = $('#selectDoc').is(':checked');
        if (selectDoc && selectByUser) {
            $('#selectALL').setChecked(false);
        } else if (selectByUser) {
            $('#selectALL').setChecked(true);
        }
    })
    $('#selectALL').on('change', this, function () {
        let selectALL = $('#selectALL').is(':checked');
        let selectByUser = $('#selectByUser').is(':checked');
        if (selectALL && selectByUser) {
            $('#selectDoc').setChecked(false);
        } else if (selectByUser) {
            $('#selectDoc').setChecked(true);
        }
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Users': pdfUsers(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Users': excelUsers(); break;
        }
    });
    $('#appSettings').on('click', this, function () {
        ittone.show($.modalAppSettings.parent());
    });
    $('#rolesUsers').on('click', this, function () {
        ittone.show($.modalRolesUsers.parent());
    });
    $('#MenuUsers').on('click', this, function () {
        ittone.show($.modalMenu.parent());
    });
    $.btnAnnulerRolesUsers.on('click', this, function () {
        ittone.hide($.modalRolesUsers.parent());
    });
    $.btnAnnulerAppSettings.on('click', this, function () {
        ittone.hide($.modalAppSettings.parent());
    });
    $('#patternMoney,#precisionMoney,#symbolMoney,#decimalMoney,#separatorMoney').on('change', this, function () {
        let settings = {
            "pattern": $('#patternMoney').val(),
            "precision": $('#precisionMoney').val(),
            "symbol": $('#symbolMoney').val(),
            "decimal": $('#decimalMoney').val(),
            "separator": $('#separatorMoney').val()
        };
        $('#exampleMoney').val(currency(123456.789, settings).format());
    });
    $('#patternQTE,#precisionQTE,#symbolQTE,#decimalQTE,#separatorQTE').on('change', this, function () {
        let settings = {
            "pattern": $('#patternQTE').val(),
            "precision": $('#precisionQTE').val(),
            "symbol": $('#symbolQTE').val(),
            "decimal": $('#decimalQTE').val(),
            "separator": $('#separatorQTE').val()
        };
        $('#exampleQTE').val(currency(123456.789, settings).format());
    });
    $('#idParentMenu').on('change', this, function () {
        var value = $(this).val();
        $("#AppModels>a,#listSubMenu>div").filter(function () {
            var dataset = $(this).data();
            var model = dataset.model;
            $(this).toggle($(this).attr('data-Model') === value);
        });
    });
});
const settingForma = function (update) {
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Users':
                $.modalUsers.data('update', true);
                ittone.show($.btnNewUsers);
                $('#passwordUser').prop('required', false);
                break;
            case 'Roles':
                $.modalRoles.data('update', true);
                ittone.show($.btnNewRoles);
                break;
        }

    } else {
        switch (ittone.getSubMenu()) {
            case 'Users':
                $.modalUsers.data('update', false);
                ittone.hide($.btnNewUsers);
                $('#formUsers')[0].reset();
                $('#passwordUser').prop('required', true);
                break;
            case 'Roles':
                $.modalRoles.data('update', false);
                ittone.hide($.btnNewRoles);
                $('#formRoles')[0].reset();
                ittone.hide($('#selectALL').closest('.form-check'));
                ittone.hide($('#selectDoc').closest('.form-check'));
                break;
        }
    }
}
const pdfUsers = function () {
    let titel = '';
    titel = '<tr><td>Users</td></tr>';
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "iceClient", "title": i18n.translate("iceClient") },
        { "data": "teleClient", "title": i18n.translate("teleClient") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
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
const pdfRoles = function () {
    let titel = '';
    titel = '<tr><td>Roles</td></tr>';
    let columns_title = [
        { "data": "codeRoles", "title": i18n.translate("codeRoles") },
        { "data": "nomRoles", "title": i18n.translate("nomRoles") },
        { "data": "adresseRoles", "title": i18n.translate("adresseRoles") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "iceRoles", "title": i18n.translate("iceRoles") },
        { "data": "teleRoles", "title": i18n.translate("teleRoles") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
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
const excelUsers = function () {
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "iceClient", "title": i18n.translate("iceClient") },
        { "data": "teleClient", "title": i18n.translate("teleClient") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelRoles = function () {
    let columns_title = [
        { "data": "codeRoles", "title": i18n.translate("codeRoles") },
        { "data": "nomRoles", "title": i18n.translate("nomRoles") },
        { "data": "adresseRoles", "title": i18n.translate("adresseRoles") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "iceRoles", "title": i18n.translate("iceRoles") },
        { "data": "teleRoles", "title": i18n.translate("teleRoles") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}