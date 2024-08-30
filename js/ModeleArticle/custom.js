$(document).ready(function () {
    $.screenAfficher = $('.screen-afficher.screen');
    $.tableView = $('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalFamille = $.modal.find('.Famille');
    $.btnSauvegarderFamille = $.modalFamille.find('.btn-sauvegarder');
    $.btnNewFamille = $.modalFamille.find('.btn-new');
    $.btnAnnulerFamille = $.modalFamille.find('.btn-annuler');

    $.modalBateau = $.modal.find('.Bateau');
    $.modalEmail = $.modal.find('.sendEmail');
    $.modalWoo = $.modal.find('.linkWoo');
    $.btnAnnulerEmail = $.modalEmail.find('.btn-annuler');
    $.btnSauvegarderEmail = $.modalEmail.find('.btn-sauvegarder');
    $.btnAnnulerWoo = $.modalWoo.find('.btn-annuler');
    $.btnSauvegarderWoo = $.modalWoo.find('.btn-sauvegarder');
    $.modalPdfViewer = $.modal.find('.pdfViewer');
    $.btnSauvegarderBateau = $.modalBateau.find('.btn-sauvegarder');
    $.btnNewBateau = $.modalBateau.find('.btn-new');
    $.btnAnnulerBateau = $.modalBateau.find('.btn-annuler');

    $.screenArticle = $('.screen-create.screen.Article');
    $.btnSauvegarderArticle = $.screenArticle.find('.btn-sauvegarder');
    $.btnNewArticle = $.screenArticle.find('.btn-new');
    $.btnAnnulerArticle = $.screenArticle.find('.btn-annuler');

    $.btnCreate.on('click', this, function () {
        settingForma(false);
        switch (ittone.getSubMenu()) {
            case 'Famille': ittone.show($.modalFamille.parent()); break;
            case 'Bateau': ittone.show($.modalBateau.parent()); break;
            case 'Article': ittone.hide($.screenAfficher); ittone.show($.screenArticle); break;
        }
    });
    $.btnAnnulerFamille.on('click', this, function () {
        ittone.hide($.modalFamille.parent());
    });
    $.modalEmail.on('click', '.btn-annuler,.btn-close', function () {
        ittone.show($.modalPdfViewer.parent())
        ittone.hide($.modalEmail.parent());
    });
    $.btnNewFamille.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerBateau.on('click', this, function () {
        ittone.hide($.modalBateau.parent());
    });
    $.btnNewBateau.on('click', this, function () {
        settingForma(false);
    });
    $.btnAnnulerArticle.on('click', this, function () {
        ittone.show($.screenAfficher); ittone.hide($.screenArticle);
        setTimeout(() => { $.tableView.find('table').DataTable().draw(); }, 200);
    });
    $.btnNewArticle.on('click', this, function () {
        settingForma(false);
    });
    $('#favorisArticle').on('change', this, function () {
        let favorisArticle = $(this).is(":checked");
        if (favorisArticle) {
            $('#favorisSpan i').removeClass('far');
            $('#favorisSpan i').addClass('fas');
        } else {
            $('#favorisSpan i').addClass('far');
            $('#favorisSpan i').removeClass('fas');
        }
    });
    $('#prixAchat_HT,#prixVente_HT').on('change keyup', this, function () {
        if (ittone.getSubMenu() == 'Article') {
            let prixAchat_HT = +$('#prixAchat_HT').val();
            let prixAchat_TTC = +$('#prixAchat_TTC').val();
            let prixVente_HT = +$('#prixVente_HT').val();
            let prixVente_TTC = +$('#prixVente_TTC').val();
            let taxeAchat = $('#idTaxeAchat').select2('data')[0].data;
            let taxeVente = $('#idTaxeVente').select2('data')[0].data;
            let pourCent = ((prixVente_HT - prixAchat_HT) / prixAchat_HT) * 100;
            if (pourCent == Infinity) {
                $('#pourCentArticle').setVal(100)
            } else {
                if (isNaN(pourCent)) {
                    $('#pourCentArticle').setVal(0)
                } else {
                    $('#pourCentArticle').setVal(pourCent.toFixed(2))
                }
            }
            if (taxeAchat) {
                taxeAchat = taxeAchat.cauxTaxe;
                prixAchat_TTC = (parseFloat(prixAchat_HT) * (1 + (taxeAchat / 100))).toFixed(2);
                $('#prixAchat_TTC').setVal(prixAchat_TTC);
            } else {
                taxeAchat = 0;
                $('#prixAchat_TTC').setVal(prixAchat_HT);
            }
            if (taxeVente) {
                taxeVente = taxeVente.cauxTaxe;
                prixVente_TTC = (parseFloat(prixVente_HT) * (1 + (taxeVente / 100))).toFixed(2);
                $('#prixVente_TTC').setVal(prixVente_TTC);
            } else {
                taxeVente = 0;
                $('#prixVente_TTC').setVal(prixVente_HT);
            }
        }
    });
    $('#prixAchat_TTC,#prixVente_TTC').on('change keyup', this, function () {
        if (ittone.getSubMenu() == 'Article') {
            let prixAchat_HT = +$('#prixAchat_HT').val();
            let prixAchat_TTC = +$('#prixAchat_TTC').val();
            let prixVente_HT = +$('#prixVente_HT').val();
            let prixVente_TTC = +$('#prixVente_TTC').val();
            let taxeAchat = $('#idTaxeAchat').select2('data')[0].data;
            let taxeVente = $('#idTaxeVente').select2('data')[0].data;
            let pourCent = ((prixVente_TTC - prixAchat_TTC) / prixAchat_TTC) * 100;
            if (pourCent == Infinity) {
                $('#pourCentArticle').setVal(100)
            } else {
                if (isNaN(pourCent)) {
                    $('#pourCentArticle').setVal(0)
                } else {
                    $('#pourCentArticle').setVal(pourCent.toFixed(2))
                }
            }
            if (taxeAchat) {
                taxeAchat = taxeAchat.cauxTaxe;
                prixAchat_HT = (parseFloat(prixAchat_TTC) / (1 + (taxeAchat / 100))).toFixed(2);
                $('#prixAchat_HT').setVal(prixAchat_HT);
            } else {
                taxeAchat = 0;
                $('#prixAchat_HT').setVal(prixAchat_TTC);
            }
            if (taxeVente) {
                taxeVente = taxeVente.cauxTaxe;
                prixVente_HT = (parseFloat(prixVente_TTC) / (1 + (taxeVente / 100))).toFixed(2);
                $('#prixVente_HT').setVal(prixVente_HT);
            } else {
                taxeVente = 0;
                $('#prixVente_HT').setVal(prixVente_TTC);
            }
        }
    });
    $('#checkVente2').on('change', this, function () {
        if ($(this).is(":checked")) {
            ittone.show($('#prixVente_TTC_1').closest('.form-outline'));
            ittone.show($('#prixVente_HT_1').closest('.form-outline'));
        } else {
            ittone.hide($('#prixVente_TTC_1').closest('.form-outline'));
            ittone.hide($('#prixVente_HT_1').closest('.form-outline'));
        }
    });
    $('#checkVente3').on('change', this, function () {
        if ($(this).is(":checked")) {
            ittone.show($('#prixVente_TTC_2').closest('.form-outline'));
            ittone.show($('#prixVente_HT_2').closest('.form-outline'));
        } else {
            ittone.hide($('#prixVente_TTC_2').closest('.form-outline'));
            ittone.hide($('#prixVente_HT_2').closest('.form-outline'));
        }
    });
    $('#idTaxeAchat,#idTaxeVente').on('change', this, function () {
        $('#prixAchat_HT,#prixVente_HT,#prixAchat_TTC,#prixVente_TTC').change();
    });
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Famille': pdfFamille(); break;
            case 'Article': pdfArticle(); break;
            case 'Bateau': pdfBateau(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'Famille': excelFamille(); break;
            case 'Article': excelArticle(); break;
            case 'Bateau': excelBateau(); break;
        }
    });
    $('#import').on('click', this, function () {
        window.location.href = 'Import.aspx?name=' + ittone.getSubMenu();
    });
    $('#generCodeBare').on('click', this, function () {
        $('#codeBareArticle').setVal(generer_Code_Barre());
    });
    $('#typeArticle').on('change', this, function () {
        let typ = $(this).val();
        switch (typ) {
            case 'Standard': $('#achatArticle').setChecked(true);
                $('#venteArticle').setChecked(true); break;
            case 'Service': $('#achatArticle').setChecked(true);
                $('#venteArticle').setChecked(true); break;
            case 'Nomenclature': $('#achatArticle').setChecked(false);
                $('#venteArticle').setChecked(true); break;
            case 'Fabrication': $('#achatArticle').setChecked(true);
                $('#venteArticle').setChecked(false); break;
            case 'Consommable': $('#achatArticle').setChecked(true);
                $('#venteArticle').setChecked(false); break;
            case 'Livraison': $('#achatArticle').setChecked(true);
                $('#venteArticle').setChecked(true); break;
        }
    });
    $('#pourCentArticle').on('keyup', this, function () {
        let prixAchat_HT = +$('#prixAchat_HT').val();
        let pourCent = $(this).val() / 100;
        let prixAchat_TTC = +$('#prixAchat_TTC').val();
        let prixVente_HT = parseFloat(prixAchat_HT) + (parseFloat(prixAchat_HT) * pourCent);
        $('#prixVente_HT').val(prixVente_HT);
        let prixVente_TTC = parseFloat(prixAchat_TTC) + (parseFloat(prixAchat_TTC) * pourCent);
        $('#prixVente_TTC').val(prixVente_TTC);
    });
    $.tableView.on('click', '.photoArticleTable .icon', function () {
        console.log($(this))
        ittone.show($('#popup'))
        $('#popup').find('img').attr('src', $(this).closest('.photoArticleTable').find('img').attr('src'));
    });
    $('#popup').on('click', this, function () {
        ittone.hide($(this))
    });
    $('#checkDureDevie').on('change', this, function () {
        if ($(this).is(':checked')) { ittone.show($('.checkDure')); } else { ittone.hide($('.checkDure')); }
    });
    $('#checkCollaboration').on('change', this, function () {
        if ($(this).is(':checked')) { ittone.hide($('.checkCollaboration')); } else { ittone.show($('.checkCollaboration')); }
    })
    $('#dimensionX,#dimensionY,#prixM').on('keydown change', this, function () {
        if (!$('#checkCollaboration').is(':checked')) {
            let prxVente = parseFloat(+$('#dimensionX').val()) * parseFloat(+$('#dimensionY').val()) * parseFloat(+$('#prixM').val());
            $('#prixVente_TTC1').setVal(prxVente);
        }
    })
    $('#sendMail').on('click', this, function () {
        $.modalEmail.find('input').val('')
        SetContents('', CKEDITOR.instances.editor)
        ittone.show($.modalEmail.parent())
        ittone.hide($.modalPdfViewer.parent())
    })
    $('#linkWoo').on('click', this, function () {
        let rows = $.tableView.find('tr.selected')
        if (rows.length) {
            $.modalWoo.data('data-id', rows.data('info'))
            $.modalWoo.find('input').val('')
            $.modalWoo.find('input[name=titleWoo]').val(rows.data('info').nomArticle)
            $.modalWoo.find('input[name=refArticle]').val(rows.data('info').refArticle)
            SetContents(rows.data('info').descArticle, CKEDITOR.instances.descAticleWoo)
            $.modalWoo.find('select').val(0).trigger('change')
            ittone.show($.modalWoo.parent())
            document.querySelectorAll('.form-outline').forEach((formOutline) => {
                new mdb.Input(formOutline).update();
            });
        }
        else {
            ittone.warning("N'a pas sélectionné");
        }
    })
    $.btnAnnulerWoo.on('click', this, function () {
        ittone.hide($.modalWoo.parent());
    })
});
const settingForma = function (update) {
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Famille':
                $.modalFamille.data('update', true);
                ittone.show($.btnNewFamille);
                break;
            case 'Bateau':
                $.modalBateau.data('update', true);
                ittone.show($.btnNewBateau);
                break;
            case 'Article':
                $.screenArticle.data('update', true);
                $('#refArticle').setReadonly(true);
                ittone.show($.btnNewArticle);
                $('#favorisArticle').change();
                $('#checkDureDevie').change();
                $('#photoArticle').closest('.circular_image').removeClass('.changed');
                ittone.show($('.pictures'))
                break;
        }
    } else {
        switch (ittone.getSubMenu()) {
            case 'Famille':
                $.modalFamille.data('update', false);
                ittone.hide($.btnNewFamille);
                $('#formFamille')[0].reset();
                break;
            case 'Bateau':
                $.modalBateau.data('update', false);
                ittone.hide($.btnNewBateau);
                $('#formBateau')[0].reset();
                break;
            case 'Article':
                $(".slider .imgs").html('')
                $.screenArticle.data('update', false);
                ittone.hide($('.pictures'))
                $('#refArticle').setReadonly(false);
                clearAll()
                ittone.hide($.btnNewArticle);
                $('#formArticle')[0].reset();
                $('.tableAdd tbody').html('')
                $('#favorisArticle').change();
                $('#checkDureDevie').change();
                $('#photoArticle').closest('.circular_image').removeClass('.changed');
                $('#photoArticle').closest('.circular_image').css('background-image', "url('" + ittone.defaultImgArticle + "')");
                break;
        }
        $('select').trigger('change');
    }
}
const pdfFamille = function () {
    let titel = '';
    titel = '<tr><td>Famille</td></tr>';
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "desFamille", "title": i18n.translate("desFamille") },
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
const pdfArticle = function () {
    let titel = '';
    titel = '<tr><td>Article</td></tr>';
    let columns_title = [
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
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "etatMater", "title": i18n.translate("etatMater") },
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        { "data": "descArticle", "title": i18n.translate("descArticle"), render: (dt) => dt.replace(/\n/g, '<br>') },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
        { "data": "createDate", "title": i18n.translate("createDate"), render: (dt) => dt ? moment(dt).format('L') : '' },
        { "data": "dateMAJ", "title": i18n.translate("dateMAJ"), render: (dt) => dt ? moment(dt).format('L') : '' },
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
const pdfBateau = function () {
    let titel = '';
    titel = '<tr><td>Bateau</td></tr>';
    let columns_title = [
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
const excelFamille = function () {
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "desFamille", "title": i18n.translate("desFamille") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelArticle = function () {
    let columns_title = [
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
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "etatMater", "title": i18n.translate("etatMater") },
        { "data": "nomIndustrie", "title": i18n.translate("nomIndustrie") },
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "nomPays", "title": i18n.translate("nomPays") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        { "data": "descArticle", "title": i18n.translate("descArticle"), render: (dt) => dt.replace(/\n/g, '<br>') },
        { "data": "nomUser", "title": i18n.translate("nomUser") },
        { "data": "createDate", "title": i18n.translate("createDate"), render: (dt) => dt ? moment(dt).format('L') : '' },
        { "data": "dateMAJ", "title": i18n.translate("dateMAJ"), render: (dt) => dt ? moment(dt).format('L') : '' },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelBateau = function () {
    let columns_title = [
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
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const generer_Code_Barre = function () {
    var controlCodeBarre;
    var d = new Date()
    var array = [];
    var codeBarre;
    var total = 0
    var total_2 = 0
    // var total_3;
    var total_4;
    var modulo;
    var gCodeBarre;
    try {
        codeBarre = d.getFullYear() + '' + ("0" + (d.getMonth() + 1)).slice(-2) + '' + ("0" + d.getDate()).slice(-2) + '' + Math.floor((Math.random() * Math.pow(10, 4)));
        if (codeBarre.length > 12 || codeBarre.length < 12) {
            codeBarre = d.getFullYear() + '' + ("0" + (d.getMonth() + 1)).slice(-2) + '' + ("0" + d.getDate()).slice(-2) + '' + Math.floor((Math.random() * Math.pow(10, 4)));
        } else {
            codeBarre = codeBarre;
        }
        var sCodeBarre = codeBarre.toString();
        for (var i = 0, len = sCodeBarre.length; i < len; i += 1) {
            array.push(+sCodeBarre.charAt(i));
        }
        for (var i = 0, len = array.length; i < len; i += 2) {
            total = array[i] + total;
        }
        for (var i = 1, len = array.length; i < len; i += 2) {
            total_2 = array[i] + total_2;
        }
        total_2 = total_2 * 3;
        total_4 = total_2 + total;
        modulo = total_4 % 10;
        if (modulo == 0) {
            controlCodeBarre = modulo;
        } else {
            controlCodeBarre = 10 - modulo;
        }
        gCodeBarre = codeBarre + "" + controlCodeBarre
    } catch (error) {
        alertify.error(error.Message);
    }
    array = [];
    return gCodeBarre;
}