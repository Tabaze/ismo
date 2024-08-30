$(document).ready(function () {
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalDepot = $.modal.find('.Depot');
    $.btnSauvegarderDepot = $.modalDepot.find('.btn-sauvegarder');
    $.btnNewDepot = $.modalDepot.find('.btn-new');
    $.btnAnnulerDepot = $.modalDepot.find('.btn-annuler');

    $.modalDepotSup = $.modal.find('.DepotSup');
    $.btnSauvegarderDepotSup = $.modalDepotSup.find('.btn-sauvegarder');
    $.btnNewDepotSup = $.modalDepotSup.find('.btn-new');
    $.btnAnnulerDepotSup = $.modalDepotSup.find('.btn-annuler');

    $.modalTresor = $.modal.find('.Tresor');
    $.btnSauvegarderTresor = $.modalTresor.find('.btn-sauvegarder');
    $.btnNewTresor = $.modalTresor.find('.btn-new');
    $.btnAnnulerTresor = $.modalTresor.find('.btn-annuler');

    $.modalVille = $.modal.find('.Ville');
    $.btnSauvegarderVille = $.modalVille.find('.btn-sauvegarder');
    $.btnNewVille = $.modalVille.find('.btn-new');
    $.btnAnnulerVille = $.modalVille.find('.btn-annuler');

    $.modalPays = $.modal.find('.Pays');
    $.btnSauvegarderPays = $.modalPays.find('.btn-sauvegarder');
    $.btnNewPays = $.modalPays.find('.btn-new');
    $.btnAnnulerPays = $.modalPays.find('.btn-annuler');

    $.modalModRglm = $.modal.find('.ModRglm');
    $.btnSauvegarderModRglm = $.modalModRglm.find('.btn-sauvegarder');
    $.btnNewModRglm = $.modalModRglm.find('.btn-new');
    $.btnAnnulerModRglm = $.modalModRglm.find('.btn-annuler');

    $.modalTaxe = $.modal.find('.Taxe');
    $.btnSauvegarderTaxe = $.modalTaxe.find('.btn-sauvegarder');
    $.btnNewTaxe = $.modalTaxe.find('.btn-new');
    $.btnAnnulerTaxe = $.modalTaxe.find('.btn-annuler');

    $.modalService = $.modal.find('.Service');
    $.btnSauvegarderService = $.modalService.find('.btn-sauvegarder');
    $.btnNewService = $.modalService.find('.btn-new');
    $.btnAnnulerService = $.modalService.find('.btn-annuler');

    $.modalUnite = $.modal.find('.uniteMesure');
    $.btnSauvegarderUnite = $.modalUnite.find('.btn-sauvegarder');
    $.btnNewUnite = $.modalUnite.find('.btn-new');
    $.btnAnnulerUnite = $.modalUnite.find('.btn-annuler');

    $.modalPropriete = $.modal.find('.Propriete');
    $.btnSauvegarderPropriete = $.modalPropriete.find('.btn-sauvegarder');
    $.btnNewPropriete = $.modalPropriete.find('.btn-new');
    $.btnAnnulerPropriete = $.modalPropriete.find('.btn-annuler');

    $.modalOrigine = $.modal.find('.OriContact');
    $.btnSauvegarderOrigine = $.modalOrigine.find('.btn-sauvegarder');
    $.btnNewOrigine = $.modalOrigine.find('.btn-new');
    $.btnAnnulerOrigine = $.modalOrigine.find('.btn-annuler');

    $.modalIndustrie = $.modal.find('.Industrie');
    $.btnSauvegarderIndustrie = $.modalIndustrie.find('.btn-sauvegarder');
    $.btnNewIndustrie = $.modalIndustrie.find('.btn-new');
    $.btnAnnulerIndustrie = $.modalIndustrie.find('.btn-annuler');

    $.modalCategorie = $.modal.find('.Categorie');
    $.btnSauvegarderCategorie = $.modalCategorie.find('.btn-sauvegarder');
    $.btnNewCategorie = $.modalCategorie.find('.btn-new');
    $.btnAnnulerCategorie = $.modalCategorie.find('.btn-annuler');

    $.modalType = $.modal.find('.Type');
    $.btnSauvegarderType = $.modalType.find('.btn-sauvegarder');
    $.btnNewType = $.modalType.find('.btn-new');
    $.btnAnnulerType = $.modalType.find('.btn-annuler');

    $.modalType = $.modal.find('.Type');
    $.btnSauvegarderType = $.modalType.find('.btn-sauvegarder');
    $.btnNewType = $.modalType.find('.btn-new');
    $.btnAnnulerType = $.modalType.find('.btn-annuler');

    $.modalPotClient = $.modal.find('.PotClient');
    $.btnSauvegarderPotClient = $.modalPotClient.find('.btn-sauvegarder');
    $.btnNewPotClient = $.modalPotClient.find('.btn-new');
    $.btnAnnulerPotClient = $.modalPotClient.find('.btn-annuler');


    $.btnAnnulerDepot.on('click', this, function () {
        ittone.hide($.modalDepot.parent());
    });
    $.btnNewDepot.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerDepotSup.on('click', this, function () {
        ittone.hide($.modalDepotSup.parent());
    });
    $.btnNewDepotSup.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerTresor.on('click', this, function () {
        ittone.hide($.modalTresor.parent());
    });
    $.btnNewTresor.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerVille.on('click', this, function () {
        ittone.hide($.modalVille.parent());
    });
    $.btnNewVille.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerPays.on('click', this, function () {
        ittone.hide($.modalPays.parent());
    });
    $.btnNewPays.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerModRglm.on('click', this, function () {
        ittone.hide($.modalModRglm.parent());
    });
    $.btnNewModRglm.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerTaxe.on('click', this, function () {
        ittone.hide($.modalTaxe.parent());
    });
    $.btnNewTaxe.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerService.on('click', this, function () {
        ittone.hide($.modalService.parent());
    });
    $.btnNewService.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerUnite.on('click', this, function () {
        ittone.hide($.modalUnite.parent());
    });
    $.btnNewUnite.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerPropriete.on('click', this, function () {
        ittone.hide($.modalPropriete.parent());
    });
    $.btnNewPropriete.on('click', this, function () {
        settingForma(false);
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Depot': pdfDepot(); break;
            case 'Tresororie': pdfTresororie(); break;
            case 'Ville': pdfVille(); break;
            case 'Pays': pdfPays(); break;
            case 'ModRglm': pdfModRglm(); break;
            case 'Taxe': pdfModTaxe(); break;
            case 'Service': pdfService(); break;
            case 'uniteMesure': pdfUnite(); break;
            case 'Propriete': pdfPropriete(); break;
            case 'OriContact': pdfOriContact(); break;
            case 'Industrie': pdfIndustrie(); break;
            case 'Categorie': pdfCategorie(); break;
            case 'Type': pdfType(); break;
            case 'PotClient': pdfPotClient(); break;
            case 'Relation': pdfRelation(); break;
            case 'Rebrique': pdfRebrique(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Depot': excelDepot(); break;
            case 'Tresororie': excelTresororie(); break;
            case 'Ville': excelVille(); break;
            case 'Pays': excelPays(); break;
            case 'ModRglm': excelModRglm(); break;
            case 'Taxe': excelTaxe(); break;
            case 'Service': excelService(); break;
            case 'uniteMesure': excelUnite(); break;
            case 'Propriete': excelPropriete(); break;
            case 'OriContact': excelOriContact(); break;
            case 'Industrie': excelIndustrie(); break;
            case 'Categorie': excelCategorie(); break;
            case 'Type': excelType(); break;
            case 'PotClient': excelPotClient(); break;
            case 'Relation': excelRelation(); break;
            case 'Rebrique': excelRebrique(); break;
        }
    });
});
const settingForma = function (update) {
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Depot':
                $.modalDepot.data('update', true);
                ittone.show($.btnNewDepot);
                break;
            case 'DepotSup':
                $.modalDepotSup.data('update', true);
                $('#idDepot').setDisabled(true);
                ittone.show($.btnNewDepotSup);
                break;
            case 'Tresororie':
                $.modalTresor.data('update', true);
                ittone.show($.btnNewTresor);
                break;
            case 'Ville':
                $.modalVille.data('update', true);
                ittone.show($.btnNewVille);
                break;
            case 'Pays':
                $.modalPays.data('update', true);
                ittone.show($.btnNewPays);
                break;
            case 'ModRglm':
                $.modalModRglm.data('update', true);
                ittone.show($.btnNewModRglm);
                break;
            case 'Taxe':
                $.modalTaxe.data('update', true);
                ittone.show($.btnNewTaxe);
                break;
            case 'Service':
                $.modalService.data('update', true);
                ittone.show($.btnNewService);
                break;
            case 'uniteMesure':
                $.modalUnite.data('update', true);
                ittone.show($.btnNewUnite);
                break;
            case 'Propriete':
                $.modalPropriete.data('update', true);
                ittone.show($.btnNewPropriete);
                break;
        }

    } else {
        switch (ittone.getSubMenu()) {
            case 'Depot':
                $.modalDepot.data('update', false);
                ittone.hide($.btnNewDepot);
                $('#formDepot')[0].reset();
                break;
            case 'DepotSup':
                $.modalDepotSup.data('update', false);
                ittone.hide($.btnNewDepotSup);
                $('#formDepotSup')[0].reset();
                $('#idDepot').setDisabled(false);
                break;
            case 'Tresororie':
                $.modalTresor.data('update', false);
                ittone.hide($.btnNewTresor);
                $('#formTresor')[0].reset();
                break;
            case 'Ville':
                $.modalVille.data('update', false);
                ittone.hide($.btnNewVille);
                $('#formVille')[0].reset();
                break;
            case 'Pays':
                $.modalPays.data('update', false);
                ittone.hide($.btnNewPays);
                $('#formPays')[0].reset();
                break;
            case 'ModRglm':
                $.modalModRglm.data('update', false);
                ittone.hide($.btnNewModRglm);
                $('#formModRglm')[0].reset();
                break;
            case 'Taxe':
                $.modalTaxe.data('update', false);
                ittone.hide($.btnNewTaxe);
                $('#formTaxe')[0].reset();
                break;
            case 'Service':
                $.modalService.data('update', false);
                ittone.hide($.btnNewService);
                $('#formService')[0].reset();
                break;
            case 'uniteMesure':
                $.modalUnite.data('update', false);
                ittone.hide($.btnNewUnite);
                $('#formUniteMesure')[0].reset();
                break;
            case 'Propriete':
                $.modalPropriete.data('update', false);
                ittone.hide($.btnNewPropriete);
                $('#formPropriete')[0].reset();
                break;
        }
        $('select').trigger('change');
    }
}
//done
const pdfDepot = function () {
    let titel = '';
    titel = '<tr><td>Dépôts</td></tr>';
    let columns_title = [
        { "data": "nomDepot", "title": i18n.translate("nomDepot"), render: (dt) => dt ? dt : '' },
        { "data": "adressDepot", "title": i18n.translate("adressDepot"), render: (dt) => dt ? dt : '' },
        {
            "data": "prcpDepot", "title": i18n.translate("prcpDepot"),
            render: function (prcpDepot) {
                if (prcpDepot) {
                    return '<i class="fa-solid fa-star" style="color: #ffcc00;"><span class="d-none">oui</span></i>';
                } else {
                    return '<i class="fa-regular fa-star"><span class="d-none">no</span></i>';
                }

            },
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
const excelDepot = function () {
    let columns_title = [
        { "data": "nomDepot", "title": i18n.translate("nomDepot"), render: (dt) => dt ? dt : '' },
        { "data": "adressDepot", "title": i18n.translate("adressDepot"), render: (dt) => dt ? dt : '' },
        {
            "data": "prcpDepot", "title": i18n.translate("prcpDepot"),
            render: function (prcpDepot) {
                if (prcpDepot) {
                    return '<i class="fa-solid fa-star" style="color: #ffcc00;"><span class="d-none">oui</span></i>';
                } else {
                    return '<i class="fa-regular fa-star"><span class="d-none">no</span></i>';
                }

            },
        },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfTresororie = function () {
    let titel = '';
    titel = '<tr><td>Trésororie</td></tr>';
    let columns_title = [
        { "data": "nameTreso", "title": i18n.translate("nameTreso"), render: (dt) => dt ? dt : '' },
        { "data": "adresseTreso", "title": i18n.translate("adresseTreso"), render: (dt) => dt ? dt : '' },
        { "data": "soldAutoriseTreso", "title": i18n.translate("soldAutoriseTreso"), render: (dt) => dt ? dt : '' },
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
const excelTresororie = function () {
    let columns_title = [
        { "data": "nameTreso", "title": i18n.translate("nameTreso"), render: (dt) => dt ? dt : '' },
        { "data": "adresseTreso", "title": i18n.translate("adresseTreso"), render: (dt) => dt ? dt : '' },
        { "data": "soldAutoriseTreso", "title": i18n.translate("soldAutoriseTreso"), render: (dt) => dt ? dt : '' },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfVille = function () {
    let titel = '';
    titel = '<tr><td>Villes</td></tr>';
    let columns_title = [
        { "data": "name", "title": i18n.translate("nomVille") },
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
const excelVille = function () {
    let columns_title = [
        { "data": "name", "title": i18n.translate("nomVille") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfPays = function () {
    let titel = '';
    titel = '<tr><td>Pays</td></tr>';
    let columns_title = [
        { "data": "id", "title": i18n.translate("Code Pays") },
        { "data": "name", "title": i18n.translate("nomPays") },
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
const excelPays = function () {
    let columns_title = [
        { "data": "id", "title": i18n.translate("Code Pays") },
        { "data": "name", "title": i18n.translate("nomPays") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfModRglm = function () {
    let titel = '';
    titel = '<tr><td>Mode de réglement</td></tr>';
    let columns_title = [
        { "data": "nomModRglm", "title": i18n.translate("nomModRglm") },
        { "data": "timbre", "title": i18n.translate("timbre") },
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
const excelModRglm = function () {
    let columns_title = [
        { "data": "nomModRglm", "title": i18n.translate("nomModRglm") },
        { "data": "timbre", "title": i18n.translate("timbre") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfModTaxe = function () {
    let titel = '';
    titel = '<tr><td>Taxes</td></tr>';
    let columns_title = [
        { "data": "nomTaxe", "title": i18n.translate("nomTaxe") },
        { "data": "cauxTaxe", "title": i18n.translate("cauxTaxe") },
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
const excelTaxe = function () {
    let columns_title = [
        { "data": "nomTaxe", "title": i18n.translate("nomTaxe") },
        { "data": "cauxTaxe", "title": i18n.translate("cauxTaxe") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfService = function () {
    let titel = '';
    titel = '<tr><td>Services</td></tr>';
    let columns_title = [
        { "data": "nomService", "title": i18n.translate("nomService") },
        { "data": "DescriptionService", "title": i18n.translate("descService") },
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
const excelService = function () {
    let columns_title = [
        { "data": "nomService", "title": i18n.translate("nomService") },
        { "data": "DescriptionService", "title": i18n.translate("descService") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfUnite = function () {
    let titel = '';
    titel = '<tr><td>Unités</td></tr>';
    let columns_title = [
        { "data": "descUnite", "title": i18n.translate("descUnite") },
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
const excelUnite = function () {
    let columns_title = [
        { "data": "descUnite", "title": i18n.translate("descUnite") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfPropriete = function () {
    let titel = '';
    titel = '<tr><td>Propriétés</td></tr>';
    let columns_title = [
        { "data": "nomPropriete", "title": i18n.translate("nomPropriete") },
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
const excelPropriete = function () {
    let columns_title = [
        { "data": "nomPropriete", "title": i18n.translate("nomPropriete") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfOriContact = function () {
    let titel = '';
    titel = '<tr><td>' + ittone.getSubMenu() + '</td></tr>';
    let columns_title = [
        { "data": "nomOrigine", "title": i18n.translate("nomOrigine") },
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
const excelOriContact = function () {
    let columns_title = [
        { "data": "nomOrigine", "title": i18n.translate("nomOrigine") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfIndustrie = function () {
    let titel = '';
    titel = '<tr><td>' + ittone.getSubMenu() + '</td></tr>';
    let columns_title = [
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
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
const excelIndustrie = function () {
    let columns_title = [
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfCategorie = function () {
    let titel = '';
    titel = '<tr><td>' + ittone.getSubMenu() + '</td></tr>';
    let columns_title = [
        { "data": "codeCategorie", "title": i18n.translate("codeCategorie") },
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
const excelCategorie = function () {
    let columns_title = [
        { "data": "codeCategorie", "title": i18n.translate("codeCategorie") },
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfType = function () {
    let titel = '';
    titel = '<tr><td>' + ittone.getSubMenu() + '</td></tr>';
    let columns_title = [
        { "data": "nomType", "title": i18n.translate("nomType") },
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
const excelType = function () {
    let columns_title = [
        { "data": "nomType", "title": i18n.translate("nomType") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfPotClient = function () {
    let titel = '';
    titel = '<tr><td>Potentiel du Société</td></tr>';
    let columns_title = [
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient") },
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
const excelPotClient = function () {
    let columns_title = [
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfRelation = function () {
    let titel = '';
    titel = '<tr><td>' + ittone.getSubMenu() + '</td></tr>';
    let columns_title = [
        { "data": "nomRelation", "title": i18n.translate("nomRelation") },
        { "data": "codeColor", "title": i18n.translate("codeColor") },
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
const excelRelation = function () {
    let columns_title = [
        { "data": "nomRelation", "title": i18n.translate("nomRelation") },
        { "data": "codeColor", "title": i18n.translate("codeColor") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
//done
const pdfRebrique = function () {
    let titel = '';
    titel = '<tr><td>' + ittone.getSubMenu() + '</td></tr>';
    let columns_title = [
        { "data": "nomRebrique", "title": i18n.translate("nomRebrique") },
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
const excelRebrique = function () {
    let columns_title = [
        { "data": "nomRebrique", "title": i18n.translate("nomRebrique") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}