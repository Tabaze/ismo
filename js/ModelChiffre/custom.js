$(document).ready(function () {
    $.tableView = $('.screen-afficher.screen .tableView');
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'caar': pdfParArticle(); break;
            case 'cafa': pdfParFamille(); break;
            case 'cacl': pdfParClient(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'caar': excelParArticle(); break;
            case 'cafa': excelParFamille(); break;
            case 'cacl': excelParClient(); break;
        }
    });
});
const pdfParArticle = function () {
    let titel = '';
    titel = '<tr><td>Chiffre Affaire par Article</td></tr>';
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle"), },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        {
            "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"), render: (dt) => {
                return dt.toFixed(2) + ' DH'
            }
        },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
            }
        },
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
const pdfParFamille = function () {
    let titel = '';
    titel = '<tr><td>Chiffre Affaire par Famille</td></tr>';
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille"), },
        { "data": "desFamille", "title": i18n.translate("desFamille") },
        {
            "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"), render: (dt) => {
                return dt.toFixed(2) + ' DH'
            }
        },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
            }
        },
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
const pdfParClient = function () {
    let titel = '';
    titel = '<tr><td>Chiffre Affaire par Client</td></tr>';
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient"), },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        {
            "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"), render: (dt) => {
                return dt.toFixed(2) + ' DH'
            }
        },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
            }
        },
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
const excelParArticle = function () {
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle"), },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        {
            "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"), render: (dt) => {
                return dt.toFixed(2) + ' DH'
            }
        },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
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
const excelParFamille = function () {
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille"), },
        { "data": "desFamille", "title": i18n.translate("desFamille") },
        {
            "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"), render: (dt) => {
                return dt.toFixed(2) + ' DH'
            }
        },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
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
const excelParClient = function () {
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient"), },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        {
            "data": "chiffre_affaire", "title": i18n.translate("chiffre_affaire"), render: (dt) => {
                return dt.toFixed(2) + ' DH'
            }
        },
        {
            "data": "pour", "title": i18n.translate("pour"), render: (dt) => {
                return dt.toFixed(2) + ' %'
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