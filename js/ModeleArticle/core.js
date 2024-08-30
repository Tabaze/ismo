import { insertUpdateFamille, familleById, deleteFamille, file, ListImageArticle, sendEmail, AddUpWooArticle } from './service.js';/* Famille */
import { selectClient } from '../ModeleTier/component.js'
import { insertUpdateArticle, articleById, deleteArticle, checkRefCodeBarr, insertUpdateBateau, bateauById } from './service.js';/* Article */
import { tableFamille, tableArticle, selectParentFamille, selectFamilleGroup, tableBateau, templateFamilleArticleInsert, tableEmailArticle } from './component.js';
import { selectTaxeVente, selectTaxeAchat, selectUniteMesure, selectCategorie, selectIndustrie, selectRebrique, templateCategorie, templateRebrique, templateIndustrie, selectWoo } from './../ModeleBase/component.js';
import { initFile } from './../uploadFiles.js';
import { selectSocConEmail, selectTierEmail } from '../ModeleEmails/component.js';
import { GenerateurCode } from '../ModeleTier/service.js';

$(function () {
    loadApp();
    $('.generateurCode').on('click', this, function () {
        $('#codeFamille').setVal("FA0001");
    });
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de la suppression', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Famille': data.map(function (dt) {
                        if (deleteFamille({ id: dt.idFamille })) {
                            ittone.deleteRowDataTable(tableRander, dt.idFamille);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Article': data.map(function (dt) {

                        // ittone.deleteWooData(7269, '')
                        if (deleteArticle({ id: dt.idArticle })) {
                            ittone.deleteRowDataTable(tableRander, dt.idArticle);
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
    $('#formFamille').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.wooFamille = $('#wooFamille').is(':checked');
            if ($.modalFamille.data('update') && role.update()) {
                data.idFamille = $.modalFamille.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateFamille(param)[0];
                if (list.idFamille) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idFamille);
                }

            } else if (!$.modalFamille.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateFamille(param)[0];
                if (list.idFamille) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalFamille.attr('id', list.idFamille);
                    ittone.addInDataTable(tableRander, list)
                }
            }
            selectParentFamille($('#parentId'));
        }
    });
    $('#formBateau').on('submit', this, function () {
        if (this.checkValidity()) {
            let dataBateau = ittone.convertFormToJSON($(this));
            dataBateau.checkCollaboration = $('#checkCollaboration').is(':checked');
            dataBateau.dateDebut = $('#dateStart').getDate();
            dataBateau.dateFin = $('#dateEnd').getDate();
            if ($('#photoArticle1').closest('.circular_image.changed').length) {
                let fileName = dataBateau.refArticle + "_" + Date.now();
                console.log(fileName)
                dataBateau.photoArticle = ittone.UploaderImage($('#photoArticle1'), ittone.pathImgArticle, fileName);
                console.log(dataBateau.photoArticle)
            }
            if ($.modalBateau.data('update') && role.update()) {
                dataBateau.idBateau = $.modalBateau.attr('id');
                dataBateau.statment = 'update';
                let param = {
                    param: [dataBateau]
                }
                let list = insertUpdateBateau(param)[0];
                if (list.idBateau) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idBateau);
                }

            } else if (!$.modalBateau.data('update') && role.insert()) {
                dataBateau.statment = 'insert';
                let param = {
                    param: [dataBateau]
                }
                let list = insertUpdateBateau(param)[0];
                if (list.idBateau) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalBateau.attr('id', list.idBateau);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $('#formArticle').on('submit', this, function () {
        // let tableAddons = []
        // $(this).find('.tableAdd tbody tr').each(function (index, tr) {
        //     tableAddons.push({
        //         code: $(tr).find('td:first').text(),
        //         desc: $(tr).find('td:nth-child(2)').text(),
        //     });
        // });
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.favorisArticle = $('#favorisArticle').is(':checked');
            data.achatArticle = $('#achatArticle').is(':checked');
            data.venteArticle = $('#venteArticle').is(':checked');
            data.locationArticle = $('#locationArticle').is(':checked');
            data.checkDureDevie = $('#checkDureDevie').is(':checked');
            data.descArticle = GetContents(CKEDITOR.instances.tableAddons)
            //data.photoArticle=null;
            if ($('#photoArticle').closest('.circular_image.changed').length) {
                let fileName = data.refArticle + "_" + Date.now();
                data.photoArticle = ittone.UploaderImage($('#photoArticle'), ittone.pathImgArticle, fileName);
            }
            if (!data.idTaxeAchat) {
                data.idTaxeAchat = null;
            }
            if (!data.idTaxeVente) {
                data.idTaxeVente = null;
            }
            delete data.tableAddons
            console.log(data)
            if (!data.Disponibilite) data.Disponibilite = 3
            if ($.screenArticle.data('update') && role.update()) {
                data.idArticle = $.screenArticle.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateArticle(param)[0];
                if (list.idArticle) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, list, list.idArticle);
                }
            } else if (!$.screenArticle.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let check = checkRefCodeBarr({ refArticle: data.refArticle, codeBareArticle: data.codeBareArticle })[0];
                if (check.countRef > 0) {
                    ittone.warning("double Ref");
                    $('#refArticle').focus();
                    $('#refArticle').addClass('is-invalid');
                    return false;
                }
                if (check.countCodeBare > 0 && data.codeBareArticle != '') {
                    ittone.warning("double CodeBare");
                    $('#codeBareArticle').focus();
                    $('#codeBareArticle').addClass('is-invalid');
                    return false;
                }
                let list = insertUpdateArticle(param)[0];
                if (list.idArticle) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.screenArticle.attr('id', list.idArticle);
                    ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        switch (ittone.getSubMenu()) {
            case 'Famille': rabderFormFamille(tableRander.row(this).data().idFamille); break;
            case 'Article': randerFormArticle(tableRander.row(this).data().idArticle); break;
            case 'Bateau': randerFormBateau(tableRander.row(this).data().idBateau); break;
        }
    });
    $('#generRefArticle').on('click', this, function () {
        let data = GenerateurCode({ param: [{ statement: ittone.getSubMenu() }] });
        if (data.length) {
            let refArticle = data[0].refArticle;
            if (refArticle.indexOf('AR') != -1)
                refArticle = parseInt(refArticle.substring(2, refArticle.length)) + 1;
            else
                refArticle = parseInt(refArticle) + 1
            console.log(refArticle)
            $('#refArticle').setVal("AR" + ittone.stringWithZero(refArticle, 4));
        } else {
            $('#refArticle').setVal("AR00001");
        }
    });
    $('#file').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() == 1) {
            let data = rows.data();
            initFile(ittone.getSubMenu(), data[0].idArticle);
        } else {
            ittone.warning("dont Selection");
        }
    });
    $('#newFamille').on('click', this, function () {
        templateFamilleArticleInsert($('#idFamille'));
    });
    $(".next").on("click", function () {
        counter++;
        showCurrent();
    });

    $(".prev").on("click", function () {
        counter--;
        showCurrent();
    });

    if ("ontouchstart" in window) {
        $(".slider").swipe({
            swipeLeft: function () {
                counter++;
                showCurrent();
            },
            swipeRight: function () {
                counter--;
                showCurrent();
            }
        });
    }
    $('#ArticleImage').on('change', function () {
        for (let f of this.files) {
            let list = file(f, $.screenArticle.attr('id'))
            console.log(list)
            articlePicture({
                param: [{
                    idArticle: $.screenArticle.attr('id')
                }]
            })
        }
    });
    $('#imprement').on('click', this, function () {
        let rows = $.tableView.find('tr.selected')
        if (rows.length) {
            // ittone.iframeImprement("imprimant/article/index.html?id=" + rows.data('info').idArticle)
            let dt = articleById({ id: rows.data('info').idArticle })[0];
            var $tr = ''
            // if (dt.tableAddons) {
            //     for (let i of JSON.parse(dt.tableAddons)) {
            //         $tr += `
            //         <tr>
            //             <td>${i.code}</td>
            //             <td>${i.desc}</td>
            //         </tr>
            //         `
            //     }
            // }
            let $all = ''
            let lt = ListImageArticle({
                param: [{
                    idArticle: rows.data('info').idArticle
                }]
            })
            const header = ``;
            const footer = `<footer class="footer" style="margin-top:100px;text-align: start;width: 100%;display: flex;flex-wrap: nowrap;flex-direction: row;align-items: center;justify-content: center;bottom:0px;page-break-after: always;height:80px">
                                
                            </footer>`;
            lt.forEach(element => {
                $all += `
                ${header}
                <div style='
                display: flex;
                flex-wrap: nowrap;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding-top: 150px;margin-bottom:320px'>
                        <img style='width:600px;height:500px' id="Picture 185"
                            src="${element.pathFile}">
                            </div>
                            ${footer}
                `
            })
            const html = `
            ${header}
            <div style='margin-top:130px;color:black !important;;font-weight:bolder important;'><h1>${dt.nomArticle}</h1>
              <div style='width:100%;background:black;height:2px;margin-top:10px;margin-bottom:50px'></div>
              <div style='margin-bottom:10px;color:black !important;'>${dt.descArticle}</div>
              <!--<h2 style='text-align: center;border:1px solid rgba(0,0,0,0.5);width:95%;margin:auto 10px;margin-bottom:100px'>${dt.etatMater}</h2>-->
              ${footer}
              ${$all}
            </div>`;
            const fileName = dt.nomArticle + new Date().getMilliseconds()
            const options = {
                margin: [0, 10, 0, 10],
                filename: fileName + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                pagebreak: { after: "footer", mode: "css" },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            }
            // console.log(sendEmail())

            html2pdf()
                .set(options)
                .from(html).toPdf().get('pdf').then(function (pdf) {
                    var totalPages = pdf.internal.getNumberOfPages();
                    for (let i = 0; i <= totalPages; i++) {
                        console.log(i)
                        // set footer to every page
                        pdf.setPage(i);
                        pdf.addImage('./image/pdf/ISMO ENTETE 2.jpg', 35, 2, pdf.internal.pageSize.getWidth()-70, 30);
                        pdf.addImage('./image/pdf/ISMO PIED DE PAGE 2.jpg', 35, pdf.internal.pageSize.getHeight() - 30, pdf.internal.pageSize.getWidth()-70, 30);
                    }
                    var pdfData = pdf.output('blob')
                    const blob = new Blob([pdfData], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    $.modalPdfViewer.find('iframe').attr('src', url);
                    //$.modalPdfViewer.find('iframe').attr('data-src', pdfData)
                    $.modalPdfViewer.data('pdf', pdfData)
                    ittone.show($.modalPdfViewer.parent());
                })
        }
        else {
            ittone.warning("N'a pas sélectionné");
        }
    })
    $("#modAddons").on('click', this, () => {
        if ($('.tableAdd').find('tbody tr.selected').length) {
            $('.tableAdd').find('table tbody tr.selected').html(`<td>${$('#code').val()}</td>
                                                                <td>${$('#Desc').val()}</td>`)
        }
    });
    $('#delAddons').on('click', this, () => {
        $('.tableAdd').find('tbody tr.selected').remove()
    });
    $('#addon').on('click', this, () => {
        $('.tableAdd').find('table tbody').append(`<tr>
                                                        <td>${$('#code').val()}</td>
                                                        <td>${$('#Desc').val()}</td>
                                                    </tr>`)
        $('#code,#Desc').val('')
    });
    $('.tableAdd').on('click', 'tbody tr', function () {
        $('.tableAdd').find('tbody tr').removeClass('selected')
        $(this).addClass('selected')
    });
    $('#idClient').on('change', this, function () {
        let dt = $(this).select2('data')[0].data
        if (dt) {
            $('#commune').setVal(dt.adresseClient)
            $('#departement').setVal(dt.nomPays)
            $('#ville').setVal(dt.nomVille)
        }
    })
    $('#idCategorie').on('change', this, function () {
        if ($(this).val() == 0) return
        let cat = $(this).select2('data')[0].data.nomCategorie
        let char = ''
        if (cat.split(' ').length > 1) {
            char = cat.split(' ')[0].substring(0, 1).toUpperCase() + '.' + cat.split(' ')[1].substring(0, 2).toUpperCase()
        }
        else char = cat.substring(0, 2).toUpperCase()
        let data = GenerateurCode({ param: [{ statement: ittone.getSubMenu(), chars: char }] })[0]
        console.log(data)
        if (data) {
            let codeF = data.codefamille;
            codeF = parseInt(codeF.substring(2, codeF.length)) + 1;
            $('#codeFamille').setVal(char + ittone.stringWithZero(codeF, 4));
        }
        else {
            $('#codeFamille').setVal(char + "0001")
        }
    })
    $('#formEmail').on('submit', this, function () {
        let dt = ittone.convertFormToJSON($(this))
        dt.email = $('#to').select2('data')[0].data.email
        dt.typeTier = $('#to').select2('data')[0].data.typeTier
        dt.body = GetContents(CKEDITOR.instances.editor)
        dt.idArticle = $.tableView.find('tr.selected').data('info').idArticle
        delete dt.editor
        let file = $.modalPdfViewer.data('pdf').name;
        let fileName = file;
        fileName = Math.floor(Math.random() * 100000000) + '_' + Date.now() + '.pdf';
        const files = new File([f], fileName + '.pdf', {
            type: "application/pdf",
        })
        dt.files = files
        dt.fileName = fileName
        sendEmail(dt)
    })
    $('#displayEmail').on('click', this, () => {
        let rows = $.tableView.find('tr.selected')
        if (rows.length) {
            ittone.show($('#emailDetails').parent())
            let columns_title = [
                { "data": "dateEmail", "title": i18n.translate(""), },
                { "data": "dateEmail", "title": i18n.translate("dateEmail"), render: (dt) => moment(dt).format('L') },
                { "data": "recep", "title": i18n.translate("recep") },
                { "data": "to", "title": i18n.translate("to") },
                { "data": "subject", "title": i18n.translate("subject") },
                { "data": "message", "title": i18n.translate("Message"), render: (dt) => '<div>' + dt + '</div>' },
                { "data": "typeClient", "title": i18n.translate("Type") },
                { "data": "nomUser", "title": i18n.translate("nomUser") },
            ];
            let dt = {
                idArticle: rows.data('info').idArticle
            }
            tableEmailArticle($('#tableEmail'), columns_title, dt)
        }
        else {
            ittone.warning("N'a pas sélectionné");
        }
    })
    $('#newCategorie').on('click', this, () => {
        templateCategorie(null, null, $('#idCategorie'))
    })
    $('#newRebrique').on('click', this, () => {
        templateRebrique(null, null, $('#idRebrique'))
    })
    $('#newIndustrie').on('click', this, () => {
        templateIndustrie(null, null, $('#idIndustrie'))
    })
    $('#formWooLink').on('submit', this, async function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.idArticle = $.modalWoo.data('data-id').idArticle
            // data.refArticle = $.modalWoo.data('data-id').refArticle
            data.state = 'insert'
            console.log(data)
            // return
            await ittone.postWooDataAsync({
                name: data.titleWoo,
                description: data.descAticleWoo,
                type: "simple",
                suk: data.refArticle,
                categories: [
                    {
                        id: data.idWoo
                    },
                ]
            }, '').then(function (res) {
                data.id = res.id
                ittone.success("Success")
                ittone.hide($.modalWoo.parent());
            })
                .catch(function (error) {
                });
            if ($.screenArticle.data('update') && role.update()) {

            } else if (!$.screenArticle.data('update') && role.insert()) {
                data.state='insert'
                let lt = AddUpWooArticle({
                    param: [data]
                })[0]
                console.log(lt)
                if (lt.added) {
                    ittone.success("Success")
                    ittone.hide($.modalWoo.parent());
                }
            }
        }
    })
    $(document).on('click', '.read-more-link', function (e) {
        e.preventDefault();

        const $description = $(this).closest('.description');
        const rowData = $(this).closest('tr').data('info').descArticle;
        $description.html(rowData + '<a href="#" class="read-less-link">Read Less</a>');
        $description.toggleClass('expanded');
    });
    $(document).on('click', '.read-less-link', function (e) {
        e.preventDefault();

        const $description = $(this).closest('.description');
        const rowData = $(this).closest('tr').data('info').descArticle;
        const maxLength = 100; // Maximum length of the description
        const trimmedDesc = rowData.replace(/<.*?>/g, ' ').trim();
        const shouldTruncate = trimmedDesc.length > maxLength;
        const shortenedDesc = shouldTruncate ? trimmedDesc.slice(0, maxLength) + '...' : trimmedDesc;

        $description.html(shortenedDesc + '<a href="#" class="read-more-link">Read More</a>');
        $description.removeClass('expanded');
    });
});
var tableRander;
var counter = 0;
$.$items = $(".slider .imgs figure")
$.thumbs = $('.thumbnails img');
$.numItems = 0
const loadApp = async function () {
    let name = ittone.getSubMenu();
    const id = new URL(window.location.href).searchParams.get("id");
    switch (name) {
        case 'Famille': selectParentFamille($('#parentId')); randerTableFamille(); break;
        case 'Article': selectFamilleGroup($('#idFamille'));
            selectCategorie($('#idCategorie'))
            selectIndustrie($('#idIndustrie'))
            selectSocConEmail($('#to'))
            selectTaxeVente($('#idTaxeVente'));
            selectTaxeAchat($('#idTaxeAchat'));
            selectUniteMesure($('#idUnite'));
            selectRebrique($('#idRebrique'))
            selectClient($('#idClient'))
            randerTableArticle();
            if (id) {
                randerFormArticle(id);
            }
            selectWoo($('#idWoo'))
            break;
        case 'Bateau':
            selectClient($('#idClient'));
            randerTableBateau(); break;
    }
}
const randerTableFamille = function () {
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "desFamille", "title": i18n.translate("desFamille") },
    ];
    tableRander = tableFamille($.tableView, columns_title);
}
const rabderFormFamille = function (id) {
    let list = familleById({ id: id })[0];
    $.modalFamille.attr('id', id);
    ittone.convertJsonToForm($('#formFamille'), list);
    $('#wooFamille').setChecked(list.wooFamille);
    ittone.show($.modalFamille.parent());
    settingForma(true);
}
const randerTableArticle = function () {
    let columns_title = [
        {
            "data": "photoArticle", "title": "",
            render: function (photoArticle) {
                if (photoArticle) {
                    return `<div class="photoArticleTable"><img src="` + ittone.pathImgArticle + photoArticle + `" style="width: 100px;height: 100px;"/>
                    <div class="overlay">
                    <a href="#" class="icon" title="User Profile">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                    </div></div>`;
                } else {
                    return `<div class="photoArticleTable"><img src="` + ittone.defaultImgArticle + `"  style="width: 100px;height: 100px;"/>
                    <div class="overlay">
                    <a href="#" class="icon" title="User Profile">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                    </div></div>`;
                }
            }
        },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "hsCode", "title": i18n.translate("hsCode") },
        { "data": "typeArticle", "title": i18n.translate("typeArticle") },
        {
            "data": "prixAchat_TTC", "title": i18n.translate("prixAchat_TTC"),
            render: function (prixVente_TTC) {
                return ittone.CurrencyFormat(prixVente_TTC);
            }
        },
        {
            "data": "prixVente_TTC", "title": i18n.translate("prixVente_TTC"),
            render: function (prixVente_TTC) {
                return ittone.CurrencyFormat(prixVente_TTC);
            }
        },
        { "data": "pourCentArticle", "title": i18n.translate("pourCentArticle") },
        { "data": "codefamille", "title": i18n.translate("codefamille") },
        { "data": "etatMater", "title": i18n.translate("etatMater") },
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        {
            "data": "descArticle",
            "title": i18n.translate("descArticle"),
            "render": (dt) => {
                const maxLength = 100; // Maximum length of the description
                const trimmedDesc = dt.replace(/<.*?>/g, ' ').trim();
                const shouldTruncate = trimmedDesc.length > maxLength;
                const shortenedDesc = shouldTruncate ? trimmedDesc.slice(0, maxLength) + '...' : trimmedDesc;
                const fullDesc = trimmedDesc;
                const readMoreLink = shouldTruncate ? '<a href="#" class="read-more-link">Read More</a>' : '';
                const desc = `<p class="description">${shortenedDesc}${readMoreLink}</p>`;
                $(desc).data('full-desc', fullDesc)
                $(desc).data('short-desc', fullDesc)
                return desc
            }
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
        // {
        //     "data": "prixAchat_HT", "title": i18n.translate("prixAchat_HT"),
        //     render: function (prixAchat_HT) {
        //         return ittone.CurrencyFormat(prixAchat_HT);
        //     }
        // },
        // {
        //     "data": "prixVente_HT", "title": i18n.translate("prixVente_HT"),
        //     render: function (prixVente_HT) {
        //         return ittone.CurrencyFormat(prixVente_HT);
        //     }
        // },
    ];
    tableRander = tableArticle($.tableView, columns_title);
}
const randerFormArticle = function (id) {
    $('#prixAchat_HT,#prixVente_HT').off('change', this);
    $('#prixAchat_TTC,#prixVente_TTC').off('change', this);
    // $('#idCategorie').off('change', this);
    let list = articleById({ id: id })[0];
    $.screenArticle.attr('id', id);
    settingForma(true);
    ittone.convertJsonToForm($('#formArticle'), list);
    $('#favorisArticle').setChecked(list.favorisArticle);
    $('#achatArticle').setChecked(list.achatArticle);
    $('#venteArticle').setChecked(list.venteArticle);
    $('#locationArticle').setChecked(list.locationArticle);
    $('#checkDureDevie').setChecked(list.checkDureDevie);
    $('#createdateCl').setDate(list.createDate);
    $('#dateMAJ').setDate(list.dateMAJ);
    SetContents(list.descArticle, CKEDITOR.instances.tableAddons)
    $('#commune,#departement').focus()
    if (list.photoArticle) {
        $('#photoArticle').closest('.circular_image').css('background-image', "url('" + ittone.pathImgArticle + list.photoArticle + "')");
    } else {
        $('#photoArticle').closest('.circular_image').css('background-image', "url('" + ittone.defaultImgArticle + "')");
    }
    $('#prixAchat_HT,#prixVente_HT').on('change', this);
    $('#prixAchat_TTC,#prixVente_TTC').on('change', this);
    //$('#idTaxeAchat,#idTaxeVente').on('change', this);
    // $('.tableAdd tbody').html('')
    // if (list.tableAddons && list.tableAddons != '') {
    //     for (let i of JSON.parse(list.tableAddons)) {
    //         $('.tableAdd').find('table tbody').append(`<tr>
    //                                                     <td>${i.code}</td>
    //                                                     <td>${i.desc}</td>
    //                                                 </tr>`)
    //     }
    // }
    articlePicture({
        param: [{
            idArticle: $.screenArticle.attr('id')
        }]
    })
    ittone.show($.screenArticle);
    ittone.hide($.screenAfficher);
}
const randerTableBateau = function () {
    let columns_title = [
        {
            "data": "photoArticle", "title": "Photo",
            render: function (photoArticle) {
                if (photoArticle) {
                    return `<div class="photoArticleTable"><img src="` + ittone.pathImgArticle + photoArticle + `" style="width: 100px;height: 100px;"/>
                    <div class="overlay">
                    <a href="#" class="icon" title="User Profile">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                    </div></div>`;
                } else {
                    return `<div class="photoArticleTable"><img src="` + ittone.defaultImgArticle + `"  style="width: 100px;height: 100px;"/>
                    <div class="overlay">
                    <a href="#" class="icon" title="User Profile">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                    </div></div>`;
                }
            }
        },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        {
            "data": "prixVente_HT", "title": i18n.translate("prixVente_HT"),
            render: function (prixVente_HT) {
                return ittone.CurrencyFormat(prixVente_HT);
            }
        },
        {
            "data": "prixVente_TTC", "title": i18n.translate("prixVente_TTC"),
            render: function (prixVente_TTC) {
                return ittone.CurrencyFormat(prixVente_TTC);
            }
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    tableRander = tableBateau($.tableView, columns_title);
}
const randerFormBateau = function (id) {
    let list = bateauById({ id: id })[0];
    console.log(list)
    $.modalBateau.attr('id', id);
    $('#checkCollaboration').setChecked(list.checkCollaboration);
    $('#checkCollaboration').change();
    $('#dateStart').setDate(list.dateDebut);
    $('#dateEnd').setDate(list.dateFin);
    ittone.convertJsonToForm($('#formBateau'), list);
    if (list.photoArticle) {
        $('#photoArticle1').closest('.circular_image').css('background-image', "url('" + ittone.pathImgArticle + list.photoArticle + "')");
    } else {
        $('#photoArticle1').closest('.circular_image').css('background-image', "url('" + ittone.defaultImgArticle + "')");
    }
    settingForma(true);
    ittone.show($.modalBateau.parent());
}
const showCurrent = function () {
    if (counter < 0) {
        counter = $.numItems - 1; // prevents counter becoming negative
    }
    var itemToShow = Math.abs(counter % $.numItems);
    var next = itemToShow + 1;
    if (next >= $.numItems) {
        next = 0;
    }
    var prev = itemToShow - 1;
    if (prev < 0) {
        prev = $.numItems - 1;
    }
    $.items.removeClass("show");
    $.items.eq(itemToShow).addClass("show");
    $.items.removeClass("prevphoto").removeClass("nextphoto");
    $.thumbs.removeClass("activethumb");
    $.thumbs.eq(itemToShow).addClass("activethumb");
};
const articlePicture = (dt) => {
    $(".slider .imgs").html('')
    let lt = ListImageArticle(dt)
    console.log(lt)
    for (let i in lt) {
        let $fig=$(`
        <figure class="${i == 0 ? 'show' : ''}">
            <img src="${lt[i].pathFile}" alt="Random Photo">
        </figure>`)
        $fig.data('info',lt[i])
        $(".slider .imgs").append($fig)
    }
    $.items = $(".slider .imgs figure")
    $.thumbs = $('.thumbnails img');
    $.numItems = $.items.length;
}