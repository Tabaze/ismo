$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'parArticle':pdfParArticle();break;
            case 'parFamille':pdfParFamille();break;
            case 'parClient':pdfParClient();break;     
            case 'parVille':pdfParVille();break;
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'parArticle':excelParArticle();break;
            case 'parFamille':excelParFamille();break;
            case 'parClient':excelParClient();break;     
            case 'parVille':excelParVille();break;
        }
    });
});
const pdfParArticle=function(){
    let titel = '';
    titel = '<tr><td>Etat Vente par Article</td></tr>';
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        orientation:'l',
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
const pdfParFamille=function(){
    let titel = '';
    titel = '<tr><td>Etat Vente par Famille</td></tr>';
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        orientation:'l',
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
const pdfParClient=function(){
    let titel = '';
    titel = '<tr><td>Etat Vente par Client</td></tr>';
    let columns_title = [
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        orientation:'l',
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
const pdfParVille=function(){
    let titel = '';
    titel = '<tr><td>Etat Vente par Ville</td></tr>';
    let columns_title = [
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        orientation:'l',
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
const excelParArticle=function(){
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelParFamille=function(){
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelParClient=function(){
    let columns_title = [
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelParVille=function(){
    let columns_title = [
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "lgnCmup", "title": i18n.translate("lgnCmup") }, 
        { "data": "valeur", "title": i18n.translate("valeur") },      
        { "data": "prixHT", "title": i18n.translate("prixHT") },
        { "data": "ca", "title": i18n.translate("ca") },
        { "data": "qteV", "title": i18n.translate("qteV")},
        { "data": "marge", "title": i18n.translate("marge"),render:function(marge){
            return ittone.CurrencyFormat(marge);
        } },
        { "data": "TauxMarge", "title": i18n.translate("TauxMarge"),render:function(TauxMarge){
            return TauxMarge*100 +'%';
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}