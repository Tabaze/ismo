$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $('#pdf').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'parArticle': pdfStock(); break;
            case 'parFamille': pdfStock(); break;
            case 'parDepot': pdfStock(); break;
            case 'parDepotSample': pdfStock(); break;
            case 'parEmplacement': pdfStock(); break;
            case 'mvmArticle': pdfMouvement(); break;
            case 'articleParDoc': pdfMouvement(); break;
            case 'mvmFamille': pdfMouvement(); break;
        }
    });
    $('#excel').on('click', this, function () {
        switch (ittone.getSubMenu()) {
            case 'parArticle': excelStock(); break;
            case 'parFamille': excelStock(); break;
            case 'parDepot': excelStock(); break;
            case 'parDepotSample': excelStock(); break;
            case 'parEmplacement': excelStock(); break;
            case 'mvmArticle': excelMouvement(); break;
            case 'articleParDoc': excelMouvement(); break;
            case 'mvmFamille': excelMouvement(); break;
        }
    });
});
const pdfStock = function () {
    let titel = '';
    switch (ittone.getSubMenu()) {
        case 'parArticle': titel = '<tr><td>Stock Valorisé Par Article</td></tr>'; break;
        case 'parFamille': titel = '<tr><td>Stock Valorisé Par Famille</td></tr>'; break;
        case 'parDepot': titel = '<tr><td>Stock Valorisé Par Dépôt</td></tr>'; break;
        case 'parDepotSample': titel = '<tr><td>Stock Simple</td></tr>'; break;
        case 'parEmplacement': titel = '<tr><td>Stock Valorisé Par Emplacement</td></tr>'; break;
    }
    let name=ittone.getSubMenu();
    let columns_title= [
        { "data": "nomDepot", "title": i18n.translate("nomDepot")  },
        { "data": "refArticle", "title": i18n.translate("refArticle")  },
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle")  },
        { "data": "nomArticle", "title": i18n.translate("nomArticle")  },
        { "data": "nomFamille", "title": i18n.translate("nomFamille")  },
        { "data": "lastPrix", "title": i18n.translate("lastPrix"),
            render: function(lastPrix){
            return ittone.CurrencyFormat(lastPrix);
            }   
        },       
        { "data": "qteDepot", "title": i18n.translate("qteDepot"),
            render: function(qteDepot){
            return ittone.QteFormat(qteDepot);
            }   
        },
        { "data": "cmup", "title": i18n.translate("cmup"),
            render: function(cmup){
            return ittone.CurrencyFormat(cmup);
            }   
        },
        { "data": "valeurlastPrix", "title": i18n.translate("valeurlastPrix"),
            render: function(valeurlastPrix){
            return ittone.CurrencyFormat(valeurlastPrix);
            }   
        },
        
        { "data": "valeurCmup", "title": i18n.translate("valeurCmup"),
            render: function(valeurCmup){
            return ittone.CurrencyFormat(valeurCmup);
            }   
        },
    ];
    if(name=='parDepotSample'){
        columns_title.splice(0,1);
        columns_title.splice(4,1);
        columns_title.splice(6,1);
        columns_title.splice(6,1);
        columns_title.splice(6,1);
    }
    if (name == 'parEmplacement') {
        columns_title.splice(0, 1);
    }
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
const pdfMouvement = function () {
    let name = ittone.getSubMenu();
    let titel = '';
    switch (ittone.getSubMenu()) {
        case 'articleParDoc': 
        let article = $('#idArticle').select2('data')[0].text;
        titel = '<tr><td>Article: '+article+' par Document</td></tr>'; break;
        case 'mvmArticle': 
        let article2 = $('#idArticle').select2('data')[0].text;
        titel = '<tr><td>Mouvement Article: '+article2+'</td></tr>'; break;
        case 'mvmFamille': 
        let famille = $('#idFamille').select2('data')[0].text;
        titel = '<tr><td>Mouvement Famille: '+famille+'</td></tr>'; break;
    }
    const columns_title= [
        { "data": "nom", "title": i18n.translate("nom") },
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "descLign", "title": i18n.translate("descLign") },
        {
            "data": "prixHT", "title": i18n.translate("prixHT"),
            render: function (prixHT) {
                return ittone.CurrencyFormat(prixHT);
            }
        },
        {
            "data": "prixTTC", "title": i18n.translate("prixTTC"),
            render: function (prixTTC) {
                return ittone.CurrencyFormat(prixTTC);
            }
        },
        { "data": "qteLign", "title": i18n.translate("qteLign") },
        {
            "data": "lgnHT", "title": i18n.translate("lgnHT"),
            render: function (lgnHT) {
                return ittone.CurrencyFormat(lgnHT);
            }
        },
        {
            "data": "lgnTTC", "title": i18n.translate("lgnTTC"),
            render: function (lgnTTC) {
                return ittone.CurrencyFormat(lgnTTC);
            }
        },
        { "data": "descType", "title": i18n.translate("descType") },
    ];
    if (name == 'mvmArticle' || name=='articleParDoc') {
        columns_title.splice(1, 1);
    }
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
const excelStock = function () {
    let name=ittone.getSubMenu();
    let columns_title= [
        { "data": "nomDepot", "title": i18n.translate("nomDepot")  },
        { "data": "refArticle", "title": i18n.translate("refArticle")  },
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle")  },
        { "data": "nomArticle", "title": i18n.translate("nomArticle")  },
        { "data": "nomFamille", "title": i18n.translate("nomFamille")  },
        { "data": "lastPrix", "title": i18n.translate("lastPrix"),
            render: function(lastPrix){
            return ittone.CurrencyFormat(lastPrix);
            }   
        },       
        { "data": "qteDepot", "title": i18n.translate("qteDepot"),
            render: function(qteDepot){
            return ittone.QteFormat(qteDepot);
            }   
        },
        { "data": "cmup", "title": i18n.translate("cmup"),
            render: function(cmup){
            return ittone.CurrencyFormat(cmup);
            }   
        },
        { "data": "valeurlastPrix", "title": i18n.translate("valeurlastPrix"),
            render: function(valeurlastPrix){
            return ittone.CurrencyFormat(valeurlastPrix);
            }   
        },
        
        { "data": "valeurCmup", "title": i18n.translate("valeurCmup"),
            render: function(valeurCmup){
            return ittone.CurrencyFormat(valeurCmup);
            }   
        },
    ];
    if(name=='parDepotSample'){
        columns_title.splice(0,1);
        columns_title.splice(4,1);
        columns_title.splice(6,1);
        columns_title.splice(6,1);
        columns_title.splice(6,1);
    }
    if (name == 'parEmplacement') {
        columns_title.splice(0, 1);
    }
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}
const excelMouvement = function () {
    let columns_title= [
        { "data": "nom", "title": i18n.translate("nom") },
        { "data": "descLign", "title": i18n.translate("descLign") },
        {
            "data": "prixHT", "title": i18n.translate("prixHT"),
            render: function (prixHT) {
                return ittone.CurrencyFormat(prixHT);
            }
        },
        {
            "data": "prixTTC", "title": i18n.translate("prixTTC"),
            render: function (prixTTC) {
                return ittone.CurrencyFormat(prixTTC);
            }
        },
        { "data": "qteLign", "title": i18n.translate("qteLign") },
        {
            "data": "lgnHT", "title": i18n.translate("lgnHT"),
            render: function (lgnHT) {
                return ittone.CurrencyFormat(lgnHT);
            }
        },
        {
            "data": "lgnTTC", "title": i18n.translate("lgnTTC"),
            render: function (lgnTTC) {
                return ittone.CurrencyFormat(lgnTTC);
            }
        },
        { "data": "descType", "title": i18n.translate("descType") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let data = {
        columns_title: columns_title,
        getData: getData_Table
    };
    excel.Defualt(data);
}