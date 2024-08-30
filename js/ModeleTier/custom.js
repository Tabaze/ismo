$(document).ready(function () {
    $.screenAfficher = $('.screen-afficher.screen');
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalClient = $.modal.find('.Client');
    $.btnSauvegarderClient = $.modalClient.find('.btn-sauvegarder');
    $.btnNewClient = $.modalClient.find('.btn-new');
    $.btnAnnulerClient = $.modalClient.find('.btn-annuler');

    $.modalFournisseur = $.modal.find('.Fournisseur');
    $.btnSauvegarderFournisseur = $.modalFournisseur.find('.btn-sauvegarder');
    $.btnNewFournisseur = $.modalFournisseur.find('.btn-new');
    $.btnAnnulerFournisseur = $.modalFournisseur.find('.btn-annuler');

    $.modalEmp = $.modal.find('.addEp');
    $.modalAction = $.modal.find('.addAct');
    $.modalOffre = $.modal.find('.addOff');

    $.btnAnnulerEmp = $.modalEmp.find('.btn-annuler');
    $.btnAnnulerAction = $.modalAction.find('.btn-annuler');
    $.btnAnnulerOffre = $.modalOffre.find('.btn-annuler');

    $.modalProp = $.modal.find('.addPropr');
    $.btnSauvegarderProp = $.modalProp.find('.btn-sauvegarder');
    $.btnAnnulerProp = $.modalProp.find('.btn-annuler');

    $.screenINVT = $('.screen-create.screen');
    $.btnNewINVT = $.screenINVT.find('.btn-new');
    $.btnAnnulerINVT = $.screenINVT.find('.btn-annuler');
    $.btnSauvegarderINVT = $.screenINVT.find('.btn-sauvegarder');

    $.modalEmail = $.modal.find('.sendEmail');

    $.btnSauvegarderEmail = $.modalEmail.find('.btn-sauvegarder');
    $.modalPdfViewer = $.modal.find('.pdfViewer');

    $.modalEmail.on('click', '.btn-annuler,.btn-close', function () {
        ittone.show($.modalPdfViewer.parent())
        ittone.hide($.modalEmail.parent());
    });

    $('#sendMail').on('click', this, function () {
        $.modalEmail.find('input').val('')
        SetContents('')
        ittone.show($.modalEmail.parent())
        ittone.hide($.modalPdfViewer.parent())
    })
    $.btnCreate.on('click', this, function () {
        settingForma(false);
        settingForma(false);
        ittone.hide($.screenAfficher);
        ittone.show($.screenINVT);
    });
    $.btnNewINVT.on('click', this, function () {
        $.btnCreate.click();
    });
    $.btnAnnulerClient.on('click', this, function () {
        ittone.hide($.modalClient.parent());
    });
    $.btnNewClient.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerFournisseur.on('click', this, function () {
        ittone.hide($.modalFournisseur.parent());
    });
    $.btnNewFournisseur.on('click', this, function () {
        settingForma(false);
    });
    $('.addProp').on('click', this, () => {
        ittone.show($.modalProp.parent())
        $.modalProp.find('input').val('')
    });
    $.btnAnnulerProp.on('click', this, function () {
        ittone.hide($.modalProp.parent());
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Client': pdfClient(); break;
            case 'Fournisseur': pdfFournisseur(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Client': excelClient(); break;
            case 'Fournisseur': excelFournisseur(); break;
        }
    });
    $('#import').on('click', this, function () {
        window.location.href = 'Import.aspx?name=' + ittone.getSubMenu();
    });
    $('.NvModels').on('click', this, function () {
        ittone.warning("En Cours d'éxecution");
    })
    if (window.matchMedia("(max-width: 800px)").matches) {
        let html = $('#TabClient').html()
        $('#TabClient').html(` <li>
                                        <div data-bs-toggle="dropdown" aria-expanded="false" style="position: relative;padding:10px"
                                            class="dropdown">
                                            <i class="fa-solid fa-bars"></i>
                                        </div>
                                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="copier"
                                            >
                                            ${html}
                                        </ul>
                                    </li>`)
        $('#TabClient').css('overflow', 'visible')
        $('#TabClient').css('justify-content', 'start')
        $('#TabClient').css('background', 'white')
        $('#TabClient').on('click', '[data-bs-toggle="dropdown"]', function () {
            if ($(this).closest('li').find('ul.dropdown-menu').css('display') != 'block')
                $(this).closest('li').find('ul.dropdown-menu').css('display', 'block')
            else
                $(this).closest('li').find('ul.dropdown-menu').css('display', 'none')
        })
        $('#TabClient').on('click', 'button', function () {
            console.log(2132)
            $(this).closest('ul.dropdown-menu').css('display', 'none')
        })

    }
});
const settingForma = function (update) {
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Client':
                $.screenINVT.data('update', true)
                ittone.show($.btnNewClient);
                ittone.show($('.updates'))
                break;
            case 'Fournisseur':
                $.modalFournisseur.data('update', true);
                ittone.show($.btnNewFournisseur);
                break;
        }
    } else {
        switch (ittone.getSubMenu()) {
            case 'Client':
                $.screenINVT.data('update', false)
                ittone.hide($.btnNewClient);
                $('#formClient')[0].reset();
                ittone.hide($('.updates'))
                $.screenINVT.find('select').val('').trigger('change')
                break;
            case 'Fournisseur':
                $.modalFournisseur.data('update', false);
                ittone.hide($.btnNewFournisseur);
                $('#formFournisseur')[0].reset();
                break;
        }
    }
}
const pdfClient = function () {
    let titel = '';
    titel = '<tr><td>Sociétés</td></tr>';
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient"), render: (dt) => dt ? dt : '' },
        { "data": "nomClient", "title": i18n.translate("nomClient"), render: (dt) => dt ? dt : '' },
        { "data": "adresseClient", "title": i18n.translate("adresseClient"), render: (dt) => dt ? dt : '' },
        { "data": "postalClient", "title": i18n.translate("postalClient"), render: (dt) => dt ? dt : '' },
        { "data": "nomVille", "title": i18n.translate("nomVille"), render: (dt) => dt ? dt : '' },
        { "data": "nomPays", "title": i18n.translate("nomPays"), render: (dt) => dt ? dt : '' },
        { "data": "teleClient", "title": i18n.translate("teleClient"), render: (dt) => dt ? dt : '' },
        { "data": "fixClient", "title": i18n.translate("fixClient"), render: (dt) => dt ? dt : '' },
        { "data": "emailClient", "title": i18n.translate("emailClient"), render: (dt) => dt ? dt : '' },
        { "data": "siteweb", "title": i18n.translate("siteweb"), render: (dt) => dt ? dt : '' },
        { "data": "nomRelation", "title": i18n.translate("nomRelation"), render: (dt) => dt ? dt : '' },
        { "data": "nomOrigine", "title": i18n.translate("nomOrigine"), render: (dt) => dt ? dt : '' },
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient"), render: (dt) => dt ? dt : '' },
        // { "data": "nomCategorie", "title": i18n.translate("nomCategorie"), render: (dt) => dt ? dt : '' },
        // { "data": "nomRebrique", "title": i18n.translate("nomRebrique"), render: (dt) => dt ? dt : '' },
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie"), render: (dt) => dt ? dt : '' },
        // { "data": "codeFamille", "title": i18n.translate("Code Famille") },
        { "data": "numeroTva", "title": i18n.translate("Tva"), render: (dt) => dt ? dt : '' },
        { "data": "iceClient", "title": i18n.translate("Siret"), render: (dt) => dt ? dt : '' },
        { "data": "nomUser", "title": i18n.translate("nomUser"), render: (dt) => dt ? dt : '' },
        { "data": "createdate", "title": i18n.translate("createDate"), render: (dt) => dt ? moment(dt).format('L') : '' },
        { "data": "dateMaj", "title": i18n.translate("dateMAJ"), render: (dt) => dt ? moment(dt).format('L') : '' },
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
const pdfFournisseur = function () {
    let titel = '';
    titel = '<tr><td>Fournisseur</td></tr>';
    let columns_title = [
        { "data": "codeFournisseur", "title": i18n.translate("codeFournisseur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "adresseFournisseur", "title": i18n.translate("adresseFournisseur") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "iceFournisseur", "title": i18n.translate("iceFournisseur") },
        { "data": "teleFournisseur", "title": i18n.translate("teleFournisseur") },
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
const excelClient = function () {
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient"), render: (dt) => dt ? dt : '' },
        { "data": "nomClient", "title": i18n.translate("nomClient"), render: (dt) => dt ? dt : '' },
        { "data": "adresseClient", "title": i18n.translate("adresseClient"), render: (dt) => dt ? dt : '' },
        { "data": "postalClient", "title": i18n.translate("postalClient"), render: (dt) => dt ? dt : '' },
        { "data": "nomVille", "title": i18n.translate("nomVille"), render: (dt) => dt ? dt : '' },
        { "data": "nomPays", "title": i18n.translate("nomPays"), render: (dt) => dt ? dt : '' },
        { "data": "teleClient", "title": i18n.translate("teleClient"), render: (dt) => dt ? dt : '' },
        { "data": "fixClient", "title": i18n.translate("fixClient"), render: (dt) => dt ? dt : '' },
        { "data": "emailClient", "title": i18n.translate("emailClient"), render: (dt) => dt ? dt : '' },
        { "data": "siteweb", "title": i18n.translate("siteweb"), render: (dt) => dt ? dt : '' },
        { "data": "nomRelation", "title": i18n.translate("nomRelation"), render: (dt) => dt ? dt : '' },
        { "data": "nomOrigine", "title": i18n.translate("nomOrigine"), render: (dt) => dt ? dt : '' },
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient"), render: (dt) => dt ? dt : '' },
        // { "data": "nomCategorie", "title": i18n.translate("nomCategorie"), render: (dt) => dt ? dt : '' },
        // { "data": "nomRebrique", "title": i18n.translate("nomRebrique"), render: (dt) => dt ? dt : '' },
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie"), render: (dt) => dt ? dt : '' },
        // { "data": "codeFamille", "title": i18n.translate("Code Famille") },
        { "data": "numeroTva", "title": i18n.translate("Tva"), render: (dt) => dt ? dt : '' },
        { "data": "iceClient", "title": i18n.translate("Siret"), render: (dt) => dt ? dt : '' },
        { "data": "nomUser", "title": i18n.translate("nomUser"), render: (dt) => dt ? dt : '' },
        { "data": "produitUtilise", "title": i18n.translate("produitUtilise"), render: (dt) => dt ? dt : '' },
        { "data": "createdate", "title": i18n.translate("createDate"), render: (dt) => dt ? moment(dt).format('L') : '' },
        { "data": "dateMaj", "title": i18n.translate("dateMAJ"), render: (dt) => dt ? moment(dt).format('L') : '' },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelFournisseur = function () {
    let columns_title = [
        { "data": "codeFournisseur", "title": i18n.translate("codeFournisseur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "adresseFournisseur", "title": i18n.translate("adresseFournisseur") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "iceFournisseur", "title": i18n.translate("iceFournisseur") },
        { "data": "teleFournisseur", "title": i18n.translate("teleFournisseur") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}