$(document).ready(function () {
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');

    $.modalEmploye = $.modal.find('.Employe');
    $.tapDossier = $.modalEmploye.find('#TabEmploye');
    $.btnSauvegarderEmploye = $.modalEmploye.find('.btn-sauvegarder');
    $.btnNewEmploye = $.modalEmploye.find('.btn-new');
    $.btnAnnulerEmploye = $.modalEmploye.find('.btn-annuler');
    $.btnAddCotis = $.modalEmploye.find('#addCotis');
    $.tableViewCotis = $.modalEmploye.find('.tableView.Cotis');

    $.modalCotisation = $.modal.find('.Cotisation');
    $.btnSauvegarderCotisation = $.modalCotisation.find('.btn-sauvegarder');
    $.btnAnnulerCotisation = $.modalCotisation.find('.btn-annuler');

    $.modalContrat = $.modal.find('.Contrat');
    $.btnSauvegarderContrat = $.modalContrat.find('.btn-sauvegarder');
    $.btnNewContrat = $.modalContrat.find('.btn-new');
    $.btnAnnulerContrat = $.modalContrat.find('.btn-annuler');

    $.modalConge = $.modal.find('.Conge');
    $.btnSauvegarderConge = $.modalConge.find('.btn-sauvegarder');
    $.btnNewConge = $.modalConge.find('.btn-new');
    $.btnAnnulerConge = $.modalConge.find('.btn-annuler');

    $.modalPret = $.modal.find('.Pret');
    $.btnSauvegarderPret = $.modalPret.find('.btn-sauvegarder');
    $.btnNewPret = $.modalPret.find('.btn-new');
    $.btnAnnulerPret = $.modalPret.find('.btn-annuler');


    $.btnCreate.on('click', this, function () {
        settingForma(false);
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe': 
            ittone.show($.modalEmploye.parent()); 
            break;
            case 'Paie_Contrat': ittone.show($.modalContrat.parent()); break;
            case 'Paie_Conges': ittone.show($.modalConge.parent()); break;
            // case 'Paie_Cotisation': ittone.show($.modalCotisation.parent()); break;
            case 'Paie_Pret': ittone.show($.modalPret.parent()); break;
        }
    });
    $.btnAnnulerEmploye.on('click', this, function () {
        ittone.hide($.modalEmploye.parent());
    });
    $.btnNewEmploye.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerCotisation.on('click', this, function () {
        ittone.hide($.modalCotisation.parent());
    });
    $.btnAnnulerContrat.on('click', this, function () {
        ittone.hide($.modalContrat.parent());
    });
    $.btnNewContrat.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerConge.on('click', this, function () {
        ittone.hide($.modalConge.parent());
    });
    $.btnNewConge.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerPret.on('click', this, function () {
        ittone.hide($.modalPret.parent());
    });
    $.btnNewPret.on('click', this, function () {
        settingForma(false);
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe': pdfEmploye(); break;
            case 'Paie_Conges': pdfConges(); break;
            case 'Paie_Contrat': pdfContrat(); break;
            case 'Paie_Pret': pdfPret(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe': excelEmploye(); break;
            case 'Paie_Conges': excelConges(); break;
            case 'Paie_Contrat': excelContrat(); break;
            case 'Paie_Pret': excelPret(); break;
        }
    });
    $('#sitFamiliale').on('change', this, function () {
        if ($('#sitFamiliale').val() == 'Marié(e)') {
            $('#abattement').val('1');
        }
        else {
            $('#abattement').val('0');
        }
    })
});
const settingForma = function (update) {
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe':
                $.modalEmploye.data('update', true);
                $.modalEmploye.find('.nav-link.Cotis').prop('disabled', false);
                ittone.show($.btnNewEmploye);
                $('#photo').closest('.circular_image').removeClass('.changed');
                break;
            case 'Paie_Contrat':
                $.modalContrat.data('update', true);
                ittone.show($.btnNewContrat);
                break;
            case 'Paie_Conges':
                $.modalConge.data('update', true);
                ittone.show($.btnNewConge);
                break;
            case 'Paie_Pret':
                $.modalPret.data('update', true);
                ittone.show($.btnNewPret);
                break;
        }
    } else {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe':
                $.modalEmploye.data('update', false);
                $.tapDossier.find('.nav-link.Cotis').prop('disabled', true);
                ittone.hide($.btnNewEmploye);
                $('#formEmploye')[0].reset();
                $('#photo').closest('.circular_image').removeClass('.changed');
                $('#photo').closest('.circular_image').css('background-image', "url('" + ittone.defaultImgEmploye + "')");
                break;
            case 'Paie_Contrat':
                $.modalContrat.data('update', false);
                ittone.hide($.btnNewContrat);
                $('#formContrat')[0].reset();
                break;
            case 'Paie_Conges':
                $.modalConge.data('update', false);
                ittone.hide($.btnNewConge);
                $('#formConge')[0].reset();
                break;
            case 'Paie_Pret':
                $.modalPret.data('update', false);
                ittone.hide($.btnNewPret);
                $('#formPret')[0].reset();
                break;
        }
        $('select').trigger('change');
    }
}
const pdfEmploye = function () {
    let titel = '';
    titel = '<tr><td>Employés</td></tr>';
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "prenomEmployee", "title": i18n.translate("prenomEmployee") },
        { "data": "cinEmployee", "title": i18n.translate("cinEmployee") },
        { "data": "nomNiveau", "title": i18n.translate("nomNiveau") },
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
        { "data": "nomFonction", "title": i18n.translate("nomFonction") },
        { "data": "banque", "title": i18n.translate("banque") },
        {
            "data": "dateNaissance", "title": i18n.translate("dateNaissance"),
            render: function (dateNaissance) {
                return ittone.convertDate(dateNaissance);
            }
        },
        {
            "data": "dateEntree", "title": i18n.translate("dateEntree"),
            render: function (dateEntree) {
                return ittone.convertDate(dateEntree);
            }
        },
        { "data": "typePaie", "title": i18n.translate("typePaie") },
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
const pdfContrat = function () {
    let titel = '';
    titel = '<tr><td>Contrats</td></tr>';
    let columns_title = [
        { "data": "numContrat", "title": i18n.translate("numContrat") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "nomProfil", "title": i18n.translate("nomProfil") },
        {
            "data": "dateContrat", "title": i18n.translate("dateContrat"),
            render: function (dateContrat) {
                return ittone.convertDate(dateContrat);
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
const pdfConges = function () {
    let titel = '';
    titel = '<tr><td>Congés</td></tr>';
    let columns_title = [
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "annee", "title": i18n.translate("annee") },
        { "data": "jCongeN_1", "title": i18n.translate("jCongeN_1") },
        { "data": "jCongeN", "title": i18n.translate("jCongeN") },
        { "data": "jConsommes", "title": i18n.translate("jConsommes") },
        { "data": "jRestes", "title": i18n.translate("jRestes") },
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
const pdfPret = function () {
    let titel = '';
    titel = '<tr><td>Prêts</td></tr>';
    let columns_title = [
        { "data": "nbEcheance", "title": i18n.translate("nbEcheance") },
        { "data": "montantEcheance", "title": i18n.translate("montantEcheance") },
        { "data": "montantDernierEcheance", "title": i18n.translate("montantDernierEcheance") },
        { "data": "codeRubrique", "title": i18n.translate("codeRubrique") },
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
const excelEmploye = function () {
    let columns_title = [
        { "data": "matricule", "title": i18n.translate("matricule") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "prenomEmployee", "title": i18n.translate("prenomEmployee") },
        { "data": "cinEmployee", "title": i18n.translate("cinEmployee") },
        { "data": "nomNiveau", "title": i18n.translate("nomNiveau") },
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
        { "data": "nomFonction", "title": i18n.translate("nomFonction") },
        { "data": "banque", "title": i18n.translate("banque") },
        {
            "data": "dateNaissance", "title": i18n.translate("dateNaissance"),
            render: function (dateNaissance) {
                return ittone.convertDate(dateNaissance);
            }
        },
        {
            "data": "dateEntree", "title": i18n.translate("dateEntree"),
            render: function (dateEntree) {
                return ittone.convertDate(dateEntree);
            }
        },
        { "data": "typePaie", "title": i18n.translate("typePaie") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelContrat = function () {
    let columns_title = [
        { "data": "numContrat", "title": i18n.translate("numContrat") },
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "nomProfil", "title": i18n.translate("nomProfil") },
        {
            "data": "dateContrat", "title": i18n.translate("dateContrat"),
            render: function (dateContrat) {
                return ittone.convertDate(dateContrat);
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
const excelConges = function () {
    let columns_title = [
        { "data": "nomEmployee", "title": i18n.translate("nomEmployee") },
        { "data": "annee", "title": i18n.translate("annee") },
        { "data": "jCongeN_1", "title": i18n.translate("jCongeN_1") },
        { "data": "jCongeN", "title": i18n.translate("jCongeN") },
        { "data": "jConsommes", "title": i18n.translate("jConsommes") },
        { "data": "jRestes", "title": i18n.translate("jRestes") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelPret = function () {
    let columns_title = [
        { "data": "nbEcheance", "title": i18n.translate("nbEcheance") },
        { "data": "montantEcheance", "title": i18n.translate("montantEcheance") },
        { "data": "montantDernierEcheance", "title": i18n.translate("montantDernierEcheance") },
        { "data": "codeRubrique", "title": i18n.translate("codeRubrique") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}