$(document).ready(function () {
    $.screenAfficher = $('.screen-afficher.screen');
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalAvance = $.modal.find('.Avance');
    $.btnSauvegarderAvance = $.modalAvance.find('.btn-sauvegarder');
    $.btnNewAvance = $.modalAvance.find('.btn-new');
    $.btnAnnulerAvance = $.modalAvance.find('.btn-annuler');

    $.modalBulletin = $('.screen-create.screen.bulletinPaie');
    $.tableViewBulletinEmp = $.modalBulletin.find('.tableBulletinEmployes');
    $.btnSauvegarderBulletin = $.modalBulletin.find('.btn-sauvegarder');
    $.btnNewBulletin = $.modalBulletin.find('.btn-new');
    $.btnAnnulerBulletin = $.modalBulletin.find('.btn-annuler');

    $.modalLierRubrique = $.modal.find('.LierRubrique');
    $.tableViewRubriques = $.modalLierRubrique.find('.tableViewRubriques');
    $.btnSauvegarderLierRubrique = $.modalLierRubrique.find('.btn-sauvegarder');
    $.btnNewLierRubrique = $.modalLierRubrique.find('.btn-new');
    $.btnAnnulerLierRubrique = $.modalLierRubrique.find('.btn-annuler');

    $.btnAnnulerAvance.on('click', this, function () {
        ittone.hide($.modalAvance.parent());
    });
    $.btnNewAvance.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerBulletin.on('click', this, function () {
        ittone.hide($.modalBulletin);
        ittone.show($.screenAfficher);
    });
    $.btnNewBulletin.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerLierRubrique.on('click', this, function () {
        ittone.hide($.modalLierRubrique.parent());
    });
    $('#annulerLign').on('click', this, function () {
        settingFormLine();
    });
    $('#checkEmploye').on('change', this, function () {
        if ($(this).is(':checked')) {
            var table = $('.tableEmployes').find('table').DataTable();
            table.rows().select();
            $('.tableEmployes').find('tbody tr').addClass('selected');
        } else {
            var table = $('.tableEmployes').find('table').DataTable();
            table.rows().deselect();
            $('.tableEmployes').find('tbody tr').removeClass('selected');
        }
    });
    $('#mois').on('change', this, function () {
        let month = $('#mois').val();
        const startOfMonth = moment(month, 'M').startOf('Month').toDate();
        const endOfMonth = moment(month, 'M').endOf('Month').toDate();
        $('#periodeD').setDate(startOfMonth);
        $('#periodeF').setDate(endOfMonth);
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Avance': pdfAvance(); break;
            case 'Paie_Bulletin': pdfBulletin(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Avance': excelAvance(); break;
            case 'Paie_Bulletin': excelBulletin(); break;
        }
    });
});
const settingForma = function (update) {
    setTimeout(() => { $('.tableBulletinEmployes').find('table').DataTable().draw(false); }, 200);
    setTimeout(() => { $('.tableEmployes').find('table').DataTable().draw(false); }, 200);
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Paie_Avance':
                $.modalAvance.data('update', true);
                ittone.show($.btnNewAvance);
                break;
            case 'Paie_Bulletin':
                $.modalBulletin.data('update', true);
                ittone.show($.btnNewBulletin);
                $('.card-infos,#formLine').removeClass('disabled');
                ittone.collapseHide($('#formBulletin').closest('.card'))
                $('#formBulletin').addClass('disabled');
                break;
        }
    } else {
        switch (ittone.getSubMenu()) {
            case 'Paie_Avance':
                $.modalAvance.data('update', false);
                ittone.hide($.btnNewAvance);
                $('#formAvance')[0].reset();
                break;
            case 'Paie_Bulletin':
                $.modalBulletin.data('update', false);
                ittone.hide($.btnNewBulletin);
                $('#formBulletin')[0].reset();
                $('.card-infos,#formLine').addClass('disabled');
                ittone.collapseShow($('#formBulletin').closest('.card'));
                $('#formBulletin').removeClass('disabled');
                break;
        }
        $('select').trigger('change');
    }
}
const settingFormLine = function () {
    $('#formLine').data('update', false);
    $('#formLine').data('info', '');
    $('#trav').val('');
    $('#hs0').val('');
    $('#hs25').val('');
    $('#hs50').val('');
    $('#hs100').val('');
}
const pdfAvance = function () {
    let titel = '';
    titel = '<tr><td>Avances</td></tr>';
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        {
            "data": "montant", "title": i18n.translate("montant"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
        {
            "data": "dateAvance", "title": i18n.translate("dateAvance"),
            render: function (dateAvance) {
                return ittone.convertDate(dateAvance);
            }
        },
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
const pdfBulletin = function () {
    let titel = '';
    titel = '<tr><td>Bulletin de paie</td></tr>';
    let columns_title = [
        { "data": "numPaie", "title": i18n.translate("numPaie") },
        {
            "data": "datePaie", "title": i18n.translate("datePaie"),
            render: function (datePaie) {
                return ittone.convertDate(datePaie);
            }
        },
        {
            "data": "periodeD", "title": i18n.translate("periodeD"),
            render: function (periodeD) {
                return ittone.convertDate(periodeD);
            }
        },
        {
            "data": "periodeF", "title": i18n.translate("periodeF"),
            render: function (periodeF) {
                return ittone.convertDate(periodeF);
            }
        },
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
const excelAvance = function () {
    let columns_title = [
        { "data": "nomEmploye", "title": i18n.translate("nomEmploye") },
        {
            "data": "montant", "title": i18n.translate("montant"),
            render: function (montant) {
                return ittone.CurrencyFormat(montant);
            }
        },
        {
            "data": "dateAvance", "title": i18n.translate("dateAvance"),
            render: function (dateAvance) {
                return ittone.convertDate(dateAvance);
            }
        },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelBulletin = function () {
    let columns_title = [
        { "data": "numPaie", "title": i18n.translate("numPaie") },
        {
            "data": "datePaie", "title": i18n.translate("datePaie"),
            render: function (datePaie) {
                return ittone.convertDate(datePaie);
            }
        },
        {
            "data": "periodeD", "title": i18n.translate("periodeD"),
            render: function (periodeD) {
                return ittone.convertDate(periodeD);
            }
        },
        {
            "data": "periodeF", "title": i18n.translate("periodeF"),
            render: function (periodeF) {
                return ittone.convertDate(periodeF);
            }
        },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}