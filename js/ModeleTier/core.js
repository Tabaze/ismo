import { insertUpdateClient, clientById, deleteClient, deleteContact, deleteAction, offerById, deleteOffers, offerAddUp, deleteParc, ExcelEmail, listEmailClient, listContact, listActionClient, listOfferClient, listParcClient } from './service.js';/* Client */
import { insertUpdateFournisseur, fournisseurById, deleteFournisseur, GenerateurCode } from './service.js';/* Fournisseurr */
import { selectVille, selectPays, selectPropriete, selectOriContact, selectCategorie, selectType, selectIndustrie, selectPotClient, selectRelation, templateOrigine, templateCategorie, templatePotClient, templateRelation, templateIndustrie, templateRebrique, selectRebrique } from './../ModeleBase/component.js';
import { selectContact, tableAction, tableClient, tableCntact, tableEmailClient, tableFournisseur, tableOffre, tableParc, templateActions, templateContact, templateOffers, templateParc } from './component.js';
import { selectArticleDesire, selectArticleNon } from '../ModeleArticle/component.js';
import { selectUsers } from '../ModeleUsers/component.js';
import { CategorieById, deleteTaxe, rebriqueById } from '../ModeleBase/service.js';
$(function () {
    loadApp();
    $('.generateurCode').on('click', this, function () {
        let data = GenerateurCode({ statement: ittone.getSubMenu() });
        if (data.length) {
            switch (ittone.getSubMenu()) {
                case 'Client':
                    let codeC = data[0].codeClient;
                    codeC = parseInt(codeC.substring(2, codeC.length)) + 1;
                    $('#codeClient').setVal("CL" + ittone.stringWithZero(codeC, 4)); break;
                case 'Fournisseur':
                    let codeF = data[0].codeFournisseur;
                    codeF = parseInt(codeF.substring(2, codeF.length)) + 1;
                    $('#codeFournisseur').setVal("FR" + ittone.stringWithZero(codeF, 4)); break;
            }
        } else {
            switch (ittone.getSubMenu()) {
                case 'Client': $('#codeClient').setVal("CL0001"); break;
                case 'Fournisseur': $('#codeFournisseur').setVal("FR0001"); break;
            }
        }
    });
    $.btnAnnulerINVT.on('click', this, function () {
        ittone.show($.screenAfficher);
        ittone.hide($.screenINVT);
        setTimeout(() => { tableRander.draw(false); }, 200);
    });
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Client': data.map(function (dt) {
                        if (deleteClient({ id: dt.idClient })) {
                            ittone.deleteRowDataTable(tableRander, dt.idClient);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Fournisseur': data.map(function (dt) {
                        if (deleteFournisseur({ id: dt.idFournisseur })) {
                            ittone.deleteRowDataTable(tableRander, dt.idFournisseur);
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
    $('#formClient').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.contratClient = $('#contratClient').is(':checked');
            data.vendeurClient = $('#vendeurClient').is(':checked');
            data.distributeur = $('#distributeur').is(':checked');
            data.memo = GetContents(CKEDITOR.instances.editor);
            data.produit_desire = JSON.stringify($(this).find('select[name=produit_desire]').val());
            // data.tableEmp = JSON.stringify(tableEmp)
            delete data.editor

            data.idCategorie = JSON.stringify($('#idCategorie').val())
            data.nomCategories = ''
            $('#idCategorie').select2('data').forEach(element => {
                console.log(element)
                data.nomCategories += element.data.nomCategorie + ' - '
            });
            data.nomCategories = data.nomCategories.substring(0, data.nomCategories.length - 2).trim();
            data.idRebrique = JSON.stringify($('#idRebrique').val())
            data.nomRubrique = ''
            $('#idRebrique').select2('data').forEach(element => {
                data.nomRubrique += element.data.nomRebrique + ' - '
            });
            data.nomRubrique = data.nomRubrique.substring(0, data.nomRubrique.length - 2).trim();
            if ($.screenINVT.data('update') && role.update()) {
                data.idClient = $.screenINVT.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateClient(param)[0];
                if (list.error) {
                    ittone.warning(list.message);
                }
                else if (list.idClient) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idClient);
                }
            }
            else if (!$.modalClient.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateClient(param)[0];
                if (list.error) {
                    ittone.warning(list.message);
                }
                else if (list.idClient) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.screenINVT.attr('id', list.idClient);
                    ittone.addInDataTable(tableRander, list)
                    randerTableContact(list.idClient)
                    randerTableAction(list.idClient)
                    randerTableOffres(list.idClient)
                    randerTableEmail(list.idClient)
                    randerTableParc(list.idClient)
                }
            }
        }
    });
    //Table contact
    $('.addEmp').on('click', this, () => {
        templateContact(tableContact)
    });
    $(".modEmp").on('click', this, () => {
        if ($('#tableContact').find('tbody tr.selected').length) {
            templateContact(tableContact, $('#tableContact').find('tbody tr.selected').attr('data-id'))
        }
    });
    $('.delEmp').on('click', this, () => {
        let rows = tableContact.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                data.map(function (dt) {
                    if (deleteContact({ id: dt.idContact })) {
                        ittone.deleteRowDataTable(tableContact, dt.idContact);
                        ittone.success("successfully");
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    //Table Action
    $('.addAction').on('click', this, () => {
        templateActions(randerAction, null, $.screenINVT.attr('id'))
    });
    $(".modAction").on('click', this, () => {
        if ($('#tableAction').find('tbody tr.selected').length) {
            templateActions(randerAction, $('#tableAction').find('tbody tr.selected').attr('data-id'), $.screenINVT.attr('id'))
        }
    });
    $('.delAction').on('click', this, () => {
        let rows = randerAction.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                data.map(function (dt) {
                    if (deleteAction({ id: dt.idAction })) {
                        ittone.deleteRowDataTable(randerAction, dt.idAction);
                        ittone.success("successfully");
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    //Table Offre
    $('.addOffre').on('click', this, () => {
        templateOffers(randerOffres)
    });
    $(".modOffre").on('click', this, () => {
        if ($('#tableOffre').find('tbody tr.selected').length) {
            templateOffers(randerOffres, $('#tableOffre').find('tbody tr.selected').attr('data-id'))
        }
    });
    $('.delOffre').on('click', this, () => {
        let rows = randerOffres.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                data.map(function (dt) {
                    if (deleteOffers({ id: dt.idOffre })) {
                        ittone.deleteRowDataTable(randerOffres, dt.idOffre);
                        ittone.success("successfully");
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    //Table Parc
    $('.addParc').on('click', this, () => {
        templateParc(randerParc)
    });
    $(".modParc").on('click', this, () => {
        if ($('#tableParc').find('tbody tr.selected').length) {
            templateParc(randerParc, $('#tableParc').find('tbody tr.selected').attr('data-id'))
        }
    });
    $('.delParc').on('click', this, () => {
        let rows = randerParc.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                data.map(function (dt) {
                    if (deleteParc({ id: dt.idParc })) {
                        ittone.deleteRowDataTable(randerParc, dt.idParc);
                        ittone.success("successfully");
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#tableParc').on('dblclick', 'tbody tr', function () {
        let id = randerParc.row(this).data().id
        window.open('ModeleArticle.aspx?name=Article&id=' + id, '_blank').focus();
    });
    //
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Client':
                rabderFormClient(tableRander.row(this).data().idClient);
                randerTableContact(tableRander.row(this).data().idClient)
                randerTableAction(tableRander.row(this).data().idClient)
                randerTableOffres(tableRander.row(this).data().idClient)
                randerTableEmail(tableRander.row(this).data().idClient)
                randerTableParc(tableRander.row(this).data().idClient)
                break;
            case 'Fournisseur': randerFormFournisseur(tableRander.row(this).data().idFournisseur); break;
        }
    });
    $('#ajouterPropr').on('click', this, function () {
        let prop = $('#idPropriete').select2('data')[0].text;
        let val = $('#valeur').val();
        let $table = $('.tableAddProp').find('tbody');
        $table.append("<tr><td>" + prop +
            "</td><td>" + val + "</td><td><button type='button' class='fs-6 btn btn-floating deleteProp'>" +
            "<i class='fa-solid fa-trash-can'></i></button></td></tr>");
        $('#idPropriete').val('').trigger('change');
        $('#valeur').val('');
    });
    $('.tableAddProp').on('click', '.deleteProp', function () {
        let $tr = $(this).closest('tr');
        $tr.remove();
        $.btnSauvegarderClient.click();
    });
    $('#Offre').on('click', this, function () {
        window.open('ModeleVente.aspx?name=FPRV' + '&idClient=' + $.screenINVT.attr('id'), '_blank').focus();
    })
    $('#tableOffre').on('dblclick', 'tbody tr', function () {
        let id = randerOffres.row(this).data().idEntet
        let codeType = randerOffres.row(this).data().codeType
        window.open('ModeleVente.aspx?name=' + codeType + '&id=' + id, '_blank').focus();
    });
    $('#sendEmail').on('click', this, function () {
        window.open('ModeleEmails.aspx?name=Sent&id=' + $.screenINVT.attr('id'), '_blank').focus();
    })
    $('.btn-modal').on('click', this, function () {
        switch ($(this).attr('data-model')) {
            case 'Origine':
                templateOrigine(null, null, $('#idOrigine'))
                break;
            case 'Cate':
                templateCategorie(null, null, $('#idCategorie'))
                break;
            case 'Rebrique':
                templateRebrique(null, null, $('#idRebrique'))
                break;
            case 'Potentiel':
                templatePotClient(null, null, $('#idPotentiel'))
                break;
            case 'Industrie':
                templateIndustrie(null, null, $('#idIndustrie'))
                break;
            case 'Relation':
                templateRelation(null, null, $('#idRelation'))
                break;
        }
    })
    $('#idRelation').on('change', this, function () {
        if (!$(this).val() || ($('#codeClient').val() != '' && $.modalClient.data('update'))) return
        let char = $(this).select2('data')[0].data.nomRelation.substring(0, 2).toUpperCase()
        let data = GenerateurCode({ param: [{ statement: ittone.getSubMenu(), chars: char }] })
        if (data.length > 0) {
            let codeC = data[0].codeClient;
            codeC = parseInt(codeC.substring(2, codeC.length)) + 1;
            $('#codeClient').setVal(char + ittone.stringWithZero(codeC, 4));
        }
        else {
            $('#codeClient').setVal(char + "0001")
        }
    })
    $('.nav-link').on('click', this, () => {
        randerAction.draw(false);
        randerEmail.draw(false);
        tableContact.draw(false);
        randerOffres.draw(false);
        randerParc.draw(false);
    })
    $('#formClient').find('[name=idPays]').on('change', this, function () {
        if (!$(this).val()) return
        let dt = { id: $(this).val() }
        selectVille($('#formClient').find('[name=idVille]'), dt);
    })
    $('#listImprement').on('click', 'button.dropdown-item', function () {
        let rows = tableRander.rows({ selected: true });
        let path = $(this).attr('data-model')
        if (rows.count() > 0) {
            if (path == 'pdf') {
                generatePdf(rows.data()[0].idClient)
            }
            else {
                generateExcel(rows.data()[0].idClient)
            }
        }
        else {
            ittone.warning("N'a pas sélectionné");
        }
    });
    $('#excelEmail').on('click', this, function () {
        let columns_title = [
            { "data": "nomClient", "title": i18n.translate("nomClient"), render: (dt) => dt ? dt : '' },
            { "data": "civilite", "title": i18n.translate("civilite"), render: (dt) => dt ? dt : '' },
            { "data": "nomContact", "title": i18n.translate("nomContact"), render: (dt) => dt ? dt : '' },
            { "data": "nomComplet", "title": i18n.translate("nomComplet"), render: (dt) => dt ? dt : '' },
            { "data": "fonctionalite", "title": i18n.translate("fonctionalite"), render: (dt) => dt ? dt : '' },
            { "data": "adresseClient", "title": i18n.translate("adresseClient"), render: (dt) => dt ? dt : '' },
            { "data": "postalClient", "title": i18n.translate("postalClient"), render: (dt) => dt ? dt : '' },
            { "data": "nomCategories", "title": i18n.translate("nomCategorie"), render: (dt) => dt ? dt : '' },
            { "data": "nomRubrique", "title": i18n.translate("nomRebrique"), render: (dt) => dt ? dt : '' },
            { "data": "nomVille", "title": i18n.translate("nomVille"), render: (dt) => dt ? dt : '' },
            { "data": "nomPays", "title": i18n.translate("nomPays"), render: (dt) => dt ? dt : '' },
            { "data": "gsm", "title": i18n.translate("gsm"), render: (dt) => dt ? dt : '' },
            { "data": "email", "title": i18n.translate("email"), render: (dt) => dt ? dt : '' },
            { "data": "codeClient", "title": i18n.translate("codeClient"), render: (dt) => dt ? dt : '' },
        ];
        let id = ''
        $.tableView.find('tbody tr').each(function (index, tr) {
            id += $(tr).attr('data-id') + ','
        });
        id = id.substring(0, id.length - 1);
        let getData_Table = ExcelEmail({
            idClient: id
        })
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
        excel.Defualt(data);
    });
});
var tableRander, tableContact, randerAction, randerOffres, randerParc, randerEmail;
const loadApp = function () {
    let name = ittone.getSubMenu();
    selectPays($('[name=idPays]'));
    selectArticleDesire($('.article'));
    selectPropriete($('#idPropriete'));
    selectOriContact($('#idOrigine'))
    selectCategorie($('#idCategorie'))
    selectType($('#idType'))
    selectRebrique($('#idRebrique'))
    selectIndustrie($('#idIndustrie'))
    selectPotClient($('#idPotentiel'))
    selectRelation($('#idRelation'))
    selectUsers($('#idUser'))
    switch (name) {
        case 'Client': randerTableClient(); break;
        case 'Fournisseur': randerTableFournisseur(); break;
    }
}
const randerTableClient = function () {
    let columns_title = [
        {
            "data": "codeColor", "title": i18n.translate(""), render: (dt) => {
                return `<div style='width:25px;height:15px;background:${dt};border-radius:5px;border:0.5px solid rgba(0,0,0,0.2)'></div>`
            }
        },
        { "data": "codeClient", "title": i18n.translate("codeClient") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        { "data": "postalClient", "title": i18n.translate("postalClient") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "teleClient", "title": i18n.translate("teleClient") },
        { "data": "fixClient", "title": i18n.translate("fixClient") },
        { "data": "emailClient", "title": i18n.translate("emailClient") },
        { "data": "siteweb", "title": i18n.translate("siteweb") },
        { "data": "nomRelation", "title": i18n.translate("nomRelation") },
        { "data": "nomOrigine", "title": i18n.translate("nomOrigine") },
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient") },
        {
            "data": "nomCategories", "title": i18n.translate("nomCategorie"),
        },
        {
            "data": "nomRubrique", "title": i18n.translate("nomRebrique"),
        },
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
        { "data": "codeFamille", "title": i18n.translate("Code Famille") },
        { "data": "produitUtilise", "title": i18n.translate("produitUtilise"), render: (dt) => dt ? dt : '', },
        { "data": "numeroTva", "title": i18n.translate(" Tva") },
        { "data": "products", "title": i18n.translate("products"), render: (dt) => dt ? dt : '', },
        { "data": "iceClient", "title": i18n.translate(" Siret") },
        { "data": "Contacts", "title": i18n.translate(" Contacts") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    tableRander = tableClient($.tableView, columns_title);
}
const rabderFormClient = function (id) {
    let list = clientById({ id: id })[0];
    $.screenINVT.attr('id', id);
    settingForma(true);
    ittone.convertJsonToForm($('#formClient'), list);
    $('#createdateCl').setDate(list.createdate);
    $('#dateMAJ').setDate(list.dateMaj);
    $('#contratClient').setChecked(list.contratClient);
    $('#distributeur').setChecked(list.distributeur);
    $('#formClient').find('#idCategorie').val(JSON.parse(list.idCategorie)).trigger('change');
    $('#formClient').find('#idRebrique').val(JSON.parse(list.idRebrique)).trigger('change');
    $('#formClient').find('select[name=produit_desire]').val(JSON.parse(list.produit_desire)).trigger('change');
    $('#vendeurClient').setChecked(list.vendeurClient);
    SetContents(list.memo, CKEDITOR.instances.editor);
    ittone.hide($.screenAfficher);
    ittone.show($.screenINVT);
    setTimeout(() => {
        $('#codeClient').val(list.codeClient)
    }, 100)
}
const randerTableFournisseur = function () {
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
    tableRander = tableFournisseur($.tableView, columns_title);
}
const randerTableEmail = function (id) {
    let columns_title = [
        { "data": "createDate", "title": i18n.translate("dateEmail"), render: (dt) => dt ? moment(dt).format('l') : '' },
        { "data": "to", "title": i18n.translate("to") },
        { "data": "subject", "title": i18n.translate("subject") },
        { "data": "message", "title": i18n.translate("Message"), render: (dt) => '<div>' + dt.replace(/><(?=\/)/g, '><br><') + '</div>' },
        { "data": "typeClient", "title": i18n.translate("Type") },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
    ];
    let dt = {
        param: [{
            idClient: id
        }]
    }
    randerEmail = tableEmailClient($('#tableEmail'), columns_title, dt)
    setTimeout(() => {
        randerEmail.draw(false);
    }, 200);
}
const randerFormFournisseur = function (id) {
    let list = fournisseurById({ id: id })[0];
    $.modalFournisseur.attr('id', id);
    ittone.convertJsonToForm($('#formFournisseur'), list);
    $('#sous_traitance').setChecked(list.sous_traitance);
    $('#createdateFR').setDate(list.createdate);
    $('#fournisseur').setChecked(list.fournisseur);
    ittone.show($.modalFournisseur.parent());
    settingForma(true);
}
const randerTablePropriete = function (id) {
    let list = clientById({ id: id })[0];
    let $table = $('.tableAddProp').find('tbody');
    $table.html("");
    let dataProp = JSON.parse(list.propriete)
    for (let i = 0; i < dataProp.length; i++) {
        $table.html($table.html() + "<tr><td>" + dataProp[i].Propriete + "</td><td>" + dataProp[i].Valeur + "</td><td><button type='button' class='fs-6 btn btn-floating deleteProp'>" +
            "<i class='fa-solid fa-trash-can'></i></button></td></tr>")
    }
}
//Contacts
const randerTableContact = function (id) {
    let columns_title = [
        { "data": "civilite", "title": i18n.translate("Civilite") },
        { "data": "nomComplet", "title": i18n.translate("nomComplet") },
        { "data": "nomContact", "title": i18n.translate("nomContact") },
        { "data": "fonctionalite", "title": i18n.translate("fonctionalite") },
        {
            "data": "gsm", "title": i18n.translate("gsm"), render: (dt) => {
                console.log(dt.indexOf('['))
                if (dt.indexOf('[') != -1) {
                    let txt = ''
                    JSON.parse(dt).forEach((ele) => {
                        txt += ele + ' - '
                    })
                    return txt.substring(0, txt.length - 2)
                }
                else {
                    return dt
                }
            }
        },
        {
            "data": "useWtsp", "title": i18n.translate("Whatsapp"), render: (dt) => {
                if (dt) return '<i class="fa-solid fa-check"></i>'
                else return '<i class="fa-solid fa-xmark"></i>'
            }
        },
        { "data": "email", "title": i18n.translate("email") },
        { "data": "note", "title": i18n.translate("note") },
    ];
    let dt = {
        param: [{
            idClient: id
        }]
    }
    tableContact = tableCntact($('#tableContact'), columns_title, dt);
    setTimeout(() => {
        tableContact.draw(false);
    }, 200);
}
//Actions
const randerTableAction = function (id) {
    let columns_title = [
        {
            "data": "fait", "title": i18n.translate("fait"), render: (dt) => {
                if (dt) return '<i class="fa-solid fa-check"></i>'
                else return '<i class="fa-solid fa-xmark"></i>'
            }
        },
        { "data": "dateDebut", "title": i18n.translate("dateDebut"), render: (dt) => moment(dt).format('L') },
        { "data": "nomUser", "title": i18n.translate("faitPar") },
        // {
        //     "data": "nomCategorie", "title": i18n.translate("nomCategorie"), render: (dt) => {
        //         if (!dt) return ''
        //         else return dt
        //     }
        // },
        { "data": "objet", "title": i18n.translate("objet") },
        { "data": "nomCate", "title": i18n.translate("nomCate") },
        { "data": "nomComplet", "title": i18n.translate("nomComplet") },
        { "data": "nomContact", "title": i18n.translate("nomContact") },
    ];
    let dt = {
        param: [{
            idClient: id
        }]
    }
    randerAction = tableAction($('#tableAction'), columns_title, dt);
    setTimeout(() => {
        randerAction.draw(false);
    }, 200);
}
//Offres
const randerTableOffres = function (id) {
    let columns_title = [
        { "data": "dateEntet", "title": i18n.translate("emisLe"), render: (dt) => moment(dt).format('L') },
        { "data": "nomUser", "title": i18n.translate("emisPar") },
        { "data": "codeType", "title": i18n.translate("codeType"), render: (dt) => getcodeType(dt) },
        { "data": "numFactur", "title": i18n.translate("refer"), render: (dt) => ittone.stringWithZero(dt, 4) },
        { "data": "descLign", "title": i18n.translate("designation") },
        { "data": "dateEcheanche", "title": i18n.translate("dateValide"), render: (dt) => dt ? moment(dt).format('L') : '' },
        { "data": "lgnTTC", "title": i18n.translate("prixSurSite") },
    ];
    let dt = {
        param: [{
            idClient: id
        }]
    }
    randerOffres = tableOffre($('#tableOffre'), columns_title, dt);
    setTimeout(() => {
        randerOffres.draw(false);
    }, 200);
}
//Parc
const randerTableParc = function (id) {
    let columns_title = [
        { "data": "dateParc", "title": i18n.translate("dateParc"), render: (dt) => moment(dt).format('L') },
        { "data": "reference", "title": i18n.translate("Reference") },
        { "data": "designation", "title": i18n.translate("designation") },
        { "data": "prix", "title": i18n.translate("Prix"), render: (dt) => dt.toFixed(2) },
        { "data": "etat", "title": i18n.translate("etat") },
    ];
    let dt = {
        param: [{
            idClient: id
        }]
    }
    randerParc = tableParc($('#tableParc'), columns_title, dt);
    setTimeout(() => {
        randerParc.draw(false);
    }, 200);
}
const generatePdf = (id) => {
    let client = clientById({ id: id })[0];
    console.log(client)
    var $tr = ''
    if (client.tableAddons) {
        for (let i of JSON.parse(client.tableAddons)) {
            $tr += `
            <tr>
                <td>${i.code}</td>
                <td>${i.desc}</td>
            </tr>
            `
        }
    }
    setTimeout(() => {
        let dt = {
            param: [{
                idClient: id
            }]
        }
        const tbodyActions = listActionClient(dt).map(action => `
        <tr>
            <td>${action.fait ? '<i class="fa-solid fa-check"></i>'
                : '<i class="fa-solid fa-xmark"></i>'}</td>
            <td>${moment(action.dateDebut).format('L')}</td>
            <td>${action.nomUser}</td>
            <td>${action.objet}</td>
            <td>${action.nomCate}</td>
            <td>${action.nomComplet + ' ' + action.nomContact}</td>
        </tr>
      `).join('');
        const tbodyContact = listContact(dt).map(contact => {
            let txt = ''
            if (contact.gsm.indexOf('[') != -1) {
                JSON.parse(contact.gsm).forEach((ele) => {
                    txt += ele + ' - '
                })
                txt = txt.substring(0, txt.length - 2)
            }
            else {
                txt = contact.gsm
            }
            return `
        <tr>
          <td>${contact.civilite}</td>
          <td>${contact.nomComplet + ' ' + contact.nomContact}</td>
          <td>${contact.fonctionalite}</td>
          <td>${txt}</td>
          <td>${contact.email}</td>
        </tr>
      `
        }).join("");
        const tbodyOffre = listOfferClient(dt).map(offre => `
        <tr>
            <td>${moment(offre.dateEntet).format('L')}</td>
            <td>${offre.nomUser}</td>
            <td>${getcodeType(offre.codeType)}</td>
            <td>${offre.numFactur}</td>
            <td>${offre.descLign}</td>
            <td>${moment(offre.dateEcheanche).format('L')}</td>
            <td>${offre.lgnTTC}</td>
        </tr>
      `).join('');
        const tbodyEmail = listEmailClient(dt).map(email => `
        <tr>
            <td>${moment(email.dateEmail).format('L')}</td>
            <td>${email.to}</td>
            <td>${email.subject}</td>
            <td>${email.typeClient}</td>
        </tr>
      `).join('');
        const tbodyParc = listParcClient(dt).map(parc => `
        <tr>
            <td>${moment(parc.dateParc).format('L')}</td>
            <td>${parc.reference}</td>
            <td>${parc.designation}</td>
            <td>${parc.prix}</td>
            <td>${parc.etat}</td>
        </tr>
      `).join('');
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                .main tr,.main td{
                    border:none;
                    padding: 10px 5px;
                }
                body.pdf{
                    padding:0px
                }
                .noBorder,
                table:not(.noBorder,.main) td,
                table:not(.noBorder,.main) th{
                    border: 1px solid rgba(0,0,0,0.5);
                    font-size: 16px !important;
                }
                table:not(.noBorder,.main) th{
                    background:rgba(221, 221, 221,0.5);
                    font-weight:bold;
                }
                .main{
                    width:98%;
                }
                caption {
                    color:black;
                    width:96%;
                    caption-side: top;
                    font: 26px bolder !important;
                    padding: 20px 10px;
                }
                
                .caption {
                    background:#DDDDDD;
                    color:black;
                    width:100%;
                    caption-side: top;
                    font: 22px bolder !important;
                    padding: 10px !important;
                    text-align: start;
                    border-bottom: none ;
                }
                table:not(.noBorder) .caption{
                    border: 1px solid rgba(0,0,0,0.5);
                    border-bottom: none !important;
                }
                body.pdf table {
                    width:100%;
                    border-collapse: collapse;
                }
                
                table td{
                    font-weight: 100 !important;
                }
            </style>
        </head>
        
        <body class="pdf">
            <table class='main'>
                <caption>FICHE SOCIETE</caption>
                <tr></tr>
                <tr></tr>
                <tr style="padding: 10px;"></tr>
                <tr style="padding: 10px;"></tr>
                <tr style="padding: 10px;"></tr>
                <tr style='margin:auto 10px;margin-top:10px;text-align: end;'>
                    <th colspan="8">Date de création :   ${moment(client.createdate).format('L')}</th>
                </tr>
                <tr style='margin:auto 10px;margin-top:10px;text-align: end;'>
                    <th colspan="8">Date de mise à jour :  ${moment(client.dateMAJ).format('L')}</th>
                </tr>
                <tr>
                    <th colspan='8'>
                        <table class="noBorder" style="border-collapse: collapse;width:100%">
                            <caption class="caption">Nom de la societe : <span style='font-size:30px !important'><b><u>${client.nomClient}</u></b></span></caption>
                            <tr>
                                <th colspan="2">TYPE DE FICHE :</th>
                                <td colspan='4'>${client.nomRelation}</td>
                            </tr>
                            <tr>
                                <th colspan="2">CODE :</th>
                                <td colspan='4'>${client.codeClient}</td>
                            </tr>
                            <tr>
                                <th colspan="2">ADRESSE :</th>
                                <td colspan='4'>${client.adresseClient}</td>
                            </tr>
                            <tr>
                                <th>Ville :</th>
                                <td>${client.nomVille}</td>
                                <th>Code postal :</th>
                                <td>${client.postalClient}</td>
                                <th>Pays :</th>
                                <td>${client.nomPays}</td>
                            </tr>
                            <tr>
                                <th colspan="2">E-MAIL :</th>
                                <td colspan='4'>${client.emailClient}</td>
                            </tr>
                            <tr>
                                <th colspan="2">E-TELEPHONE MOBILE :</th>
                                <td colspan='4'>${client.teleClient}</td>
                            </tr>
                            <tr>
                                <th colspan="2">TELEPHONE FIXE :</th>
                                <td colspan='4'>${client.fixClient}</td>
                            </tr>
                            <tr>
                                <th colspan="2">SITE WEB :</th>
                                <td colspan='4'>${client.siteweb}</td>
                            </tr>
                        </table>
                    </th>
                </tr>
                <tr>
                    <th colspan='8'>
                        <table style="border-collapse: collapse;width:100%">
                            <tr>
                                <th style='width:50%'>POTENTIEL :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.nomPotClient}</td>
                            </tr>
                            <tr>
                                <th style='width:50%'>ORIGINE DU CONTACT :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.nomOrigine}</td>
                            </tr>
                            <tr>
                                <th style='width:50%'>INDUSTRIE :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.nomIndustrie}</td>
                            </tr>
                            <tr>
                                <th style='width:50%'>CATEGORIE :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.nomCategories}</td>
                            </tr>
                            <tr>
                                <th style='width:50%'>RUBRIQUE :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.nomRubrique}</td>
                            </tr>
                            <tr>
                                <th style='width:50%'>PRODUIT DÉSIRÉ :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.products}</td>
                            </tr>
                            <tr>
                                <th style='width:50%'>PRODUIT UTILISÉ :</th>
                                <td style='width:50%;border-bottom:1px solid rgba(0,0,0,0.5);'>${client.produitUtilise}</td>
                            </tr>
                        </table>
                    </th>
                </tr>
                ${client.memo ? `
                <tr>
                    <th>
                        <table style='width:100%;border-collapse: collapse;'>
                            <caption class="caption">Memo</caption>
                            <tr>
                                <td style='border:1px solid rgba(0,0,0,0.5)'> ${client.memo} </td>
                            </tr>
                        </table>
                    </th>
                </tr>
                `: ''}
                <tr>
                    <th colspan='8'>
                        ${tbodyContact ? `<table style='width:100%'>
                            <caption class="caption">Liste
                                Contacts</caption>
                            <tr>
                                <th>Civilite</th>
                                <th>Nom Complet</th>
                                <th>Fonction</th>
                                <th>GSM</th>
                                <th>Email</th>
                            </tr>
                            ${tbodyContact}
                        </table>`: ''}
                    </th>
                </tr>
                <tr>
                    <th colspan='8'>
                        ${tbodyActions ? `
                        <table style='width:100%'>
                            <caption class="caption">Liste
                                Actions</caption>
                            <tr>
                                <th>Fait</th>
                                <th>Date</th>
                                <th>Fait Par</th>
                                <th>Objet</th>
                                <th>Catégorie</th>
                                <th>Nom</th>
                            </tr>
                            ${tbodyActions}
                        </table>`: ''}
                    </th>
                </tr>
                <tr>
                    <th colspan='8'>
                        ${tbodyOffre ? `
                        <table style='width:100%'>
                            <caption class="caption">Liste
                                Offres</caption>
                            <tr>
                                <th>Emis Le</th>
                                <th>Emis Par</th>
                                <th>codeType</th>
                                <th>Référence</th>
                                <th>Désignation</th>
                                <th>Validé</th>
                                <th>Moantant</th>
                            </tr>
                            ${tbodyOffre}
                        </table>`: ''}
                    </th>
                </tr>
                <tr>
                    <th colspan='8'>
                        ${tbodyEmail ? `<table style='width:100%'>
                            <caption class="caption">Liste
                                Des Emails</caption>
                            <tr>
                                <th>Date E-mail</th>
                                <th>Pour</th>
                                <th>Objet</th>
                                <th>Type</th>
                            </tr>
                            ${tbodyEmail}
                        </table>`: ''}
                    </th>
                </tr>
                <tr>
                    <th colspan='8'>
                        ${tbodyParc ? `
                        <table style='width:100%'>
                            <caption class="caption">Liste
                                Des Parcs</caption>
                            <tr>
                                <th>Date</th>
                                <th>Reference</th>
                                <th>Désignation</th>
                                <th>Prix</th>
                                <th>etat</th>
                            </tr>
                            ${tbodyParc}
                        </table>`: ''}
                    </th>
                </tr>
            </table>
        </body>
        
        </html>`
        const fileName = client.nomClient + new Date().getMilliseconds()
        const options = {
            margin: [0, 0, 0, 0],
            filename: fileName + '.pdf',
            pagebreak: { avoid: ['td[colspan],tr'] },
            image: { type: 'svg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'p' },
        }
        // console.log(sendEmail())
        html2pdf()
            .set(options)
            .from(html).toPdf().get('pdf').then(function (pdf) {
                var pdfData = pdf.output('blob')
                $.modalPdfViewer.find('iframe').attr('src', URL.createObjectURL(pdf.output('blob')));
                $.modalPdfViewer.data('pdf', pdfData)
                ittone.show($.modalPdfViewer.parent());
            })
    }, 200);
}
const generateExcel = (id) => {
    let client = clientById({ id: id })[0]

    randerTableAction(id)
    randerTableContact(id)
    randerTableOffres(id)
    randerTableEmail(id)
    randerTableParc(id)

    setTimeout(() => {
        var tab = document.createElement("table");

        $(tab).html(`
        <tr>
            <td></td>
            <td></td>
            <td colspan='5' rowspan='3' style='text-align:center;font-size:20px'>FICHE SOCIETE</td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style="text-align:center" colspan="8">Editée Le : ${moment(client.dateMAJ).format('L')}</th></tr>
        <tr style="border-bottom:none">
            <th style="border-bottom:none" colspan="3">Societé :</th>
            <td style="border-bottom:none">${client.nomClient}</td>
            <th style="border-bottom:none" colspan="3">Tél :</th>
            <td style="border-bottom:none">${client.teleClient}</td>
        </tr>
        <tr style="border-bottom:none">
            <th style="border-bottom:none" colspan="3">Adresse :</th>
            <td style="border-bottom:none">${client.adresseClient}</td>
            <th style="border-bottom:none" colspan="3">Fix :</th>
            <td style="border-bottom:none">${client.fixClient}</td>
        </tr>
        <tr style="border-bottom:none">
            <th style="border-bottom:none" colspan="3">E-mail :</th>
            <td style="border-bottom:none">${client.emailClient}</td>
            <th style="border-bottom:none" colspan="3">Code :</th>
            <td style="border-bottom:none">${client.codeClient}</td>
        </tr>
        <tr style="border-bottom:none">
            <th style="border-bottom:none" colspan="3">Origine :</th>
            <td style="border-bottom:none">${client.nomOrigine}</td>
            <th style="border-bottom:none" colspan="3">Type Client :</th>
            <td style="border-bottom:none">${client.nomRelation}</td>
        </tr>
        ${client.memo != '' ? "<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan='8'></th></tr>" +
                "<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style='text-align:center' colspan='8'>Memo</th></tr>" +
                "<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan='8'>" + client.memo + " </th></tr>" : ''}
        
        ${$('#tableContact').find('table tbody tr td[colspan]').length == 0 ?
                `<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan="8"></th></tr>
                            <tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style="text-align:center" colspan="8">Liste Contacts</th></tr>
                            <tr style='width:80%'>
                                <th>Civilite</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Fonction</th>
                                <th>GSM</th>
                                <th>Whatsapp</th>
                                <th>Email</th>
                                <th>Note</th>
                            </tr>`
                + $('#tableContact').find('table tbody').html() : ''}
        
        ${$('#tableAction').find('table tbody tr td[colspan]').length == 0 ?
                `<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan="8"></th></tr>
                            <tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style="text-align:center" colspan="8">Liste Actions</th></tr>
                            <tr>
                                <th>Fait</th>
                                <th>Date</th>
                                <th>Fait Par</th>
                                <th>Objet</th>
                                <th>Catégorie</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                            </tr>`
                + $('#tableAction').find('table tbody').html() : ''}
        
        ${$('#tableOffre').find('table tbody tr td[colspan]').length == 0 ?
                `<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan="8"></th></tr>
                    <tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style="text-align:center" colspan="8">Liste Offres</th></tr>
                    <tr>
                        <th>Emis Le</th>
                        <th>Emis Par</th>
                        <th>codeType</th>
                        <th>Référence</th>
                        <th>Désignation</th>
                        <th>Validé</th>
                        <th>Moantant</th>
                    </tr>`
                + $('#tableOffre').find('table tbody').html() : ''}
        
        ${$('#tableEmail').find('table tbody tr td[colspan]').length == 0 ?
                `<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan="8"></th></tr>
                        <tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style="text-align:center" colspan="8">Liste Des Emails</th></tr>
                        <tr>
                            <th>Date E-mail</th>
                            <th>Pour</th>
                            <th>Objet</th>
                            <th>Message</th>
                            <th>Type</th>
                            <th>Opérateur</th>
                        </tr>`
                + $('#tableEmail').find('table tbody').html() : ''}

        ${$('#tableParc').find('table tbody tr td[colspan]').length == 0 ?
                `<tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th colspan="8"></th></tr>
                        <tr style='border-bottom:1px solid rgba(0,0,0,0.2);width:95%;margin:auto 10px;margin-bottom:10px'><th style="text-align:center" colspan="8">Liste Des Parcs</th></tr>    
                        <tr>
                            <th>Date</th>
                            <th>Reference</th>
                            <th>Désignation</th>
                            <th>Prix</th>
                            <th>etat</th>
                        </tr>`
                + $('#tableParc').find('table tbody').html() : ''}
        `)

        var wb = XLSX.utils.table_to_book(tab, { sheet: "sheet1" });
        var ws = wb.Sheets.sheet1
        ws['!cols'] = [{ width: 20 }, { width: 20 }, { width: 20 }, { width: 30 }, { width: 20 }, { width: 20 }, { width: 30 }, { width: 20 }];
        var range = XLSX.utils.decode_range(ws['!ref']);
        var mergedCells = ws['!merges'] || [];

        for (var rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
            for (var colNum = range.s.c; colNum <= range.e.c; colNum++) {
                var cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
                for (var i = 0; i < mergedCells.length; i++) {
                    if (rowNum >= mergedCells[i].s.r && rowNum <= mergedCells[i].e.r &&
                        colNum >= mergedCells[i].s.c && colNum <= mergedCells[i].e.c) {
                        if (ws[cellAddress]) {
                            ws[cellAddress].s = {
                                font: { sz: ws[cellAddress].v == "FICHE SOCIETE" ? 20 : 12, bold: ws[cellAddress].v == "FICHE SOCIETE" },
                                alignment: { vertical: "center", horizontal: "center" },
                            };
                        }
                        break;
                    }
                }
            }
        }
        return XLSX.writeFile(wb, ('Fiche_' + client.nomClient + '_' + moment().format('DD-MM-YYYY') + '_' +
            new Date().getTime() + '.xlsx'));
    }, 200)

}
const getcodeType = (dt) => {
    switch (dt) {
        case 'BCC':
            return 'B.COMMANDE-CL'
        case 'BLFC':
            return 'B.LIVRAISON-CL'
        case 'FC':
            return 'FACTURE-CL'
        case 'FPRV':
            return 'FACTURE-PROFORMA'
        case 'BRC':
            return 'B.AVOIR-CL'
        case 'FC':
            return 'B.AVOIR-CL'
        default: return ''
    }
}