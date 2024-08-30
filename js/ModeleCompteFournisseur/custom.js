$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'DocFournisseur':pdfDocFournisseur();break; 
            case 'DocFournisseurDetail':pdfDocFournisseurDetail();break; 
            case 'GrandLiveFournisseur': if ($('#idFournisseur').val() == -1) {
                pdfGrandLiveToutsFournisseurs();
            } else {
                pdfGrandLiveFournisseur();
            }
            break;
            case 'SoldeCreditFournisseur':pdfSoldeCreditFournisseur();break;
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'DocFournisseur':excelDocFournisseur();break; 
            case 'DocFournisseurDetail':excelDocFournisseurDetail();break; 
            case 'GrandLiveFournisseur':excelGrandLiveFournisseur();break;
            case 'SoldeCreditFournisseur':excelSoldeCreditFournisseur();break;
        }
    });
});
const pdfDocFournisseur=function(){
    let titel = '';
    let fournisseur =$('#idFournisseur').select2('data')[0].text;
    titel = '<tr><td>Document Fournisseur : '+ fournisseur +'</td></tr><tr><td style="font-size:14px;">Document du '+ ittone.convertDate($('#dateStart').getDate()) +' au '+ ittone.convertDate($('#dateEnd').getDate()) +'</td></tr>';
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") }, 
        { "data": "refFactur", "title": i18n.translate("refFactur") },       
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "TT_ht", "title": i18n.translate("TT_ht"),render:function(TT_ht){
            return ittone.CurrencyFormat(TT_ht);
        } },
        { "data": "TT_tva", "title": i18n.translate("TT_tva"),render:function(TT_tva){
            return ittone.CurrencyFormat(TT_tva);
        } },
        { "data": "TT_ttc", "title": i18n.translate("TT_ttc"),render:function(TT_ttc){
            return ittone.CurrencyFormat(TT_ttc);
        } },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [ { "data": "lgnTTC", "title": i18n.translate("lgnTTC") },{ "data": "lgnHT", "title": i18n.translate("lgnHT") },{ "data": "lgnTVA", "title": i18n.translate("lgnTVA") }];;
    let index=0;
    if($('#idFournisseur').val()==-1){
        index=7;
    }else{
        index=6;
    }
    let getData_foter = [
        {
            lgnTTC:ittone.CurrencyFormat($.tableView.find('table').DataTable().column( index+2, {page:'current'} ).data().sum()),
        lgnHT:ittone.CurrencyFormat($.tableView.find('table').DataTable().column( index, {page:'current'} ).data().sum()),
        lgnTVA:ittone.CurrencyFormat($.tableView.find('table').DataTable().column( index+1, {page:'current'} ).data().sum())
    }
    ];

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
            getData: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const pdfDocFournisseurDetail=function(){
    let titel = '';
    let fournisseur =$('#idFournisseur').select2('data')[0].text;
    titel = '<tr><td>Document Détaillé Fournisseur : '+ fournisseur +'</td></tr><tr><td style="font-size:14px;">Document du '+ ittone.convertDate($('#dateStart').getDate()) +' au '+ ittone.convertDate($('#dateEnd').getDate()) +'</td></tr>';
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") }, 
        { "data": "refFactur", "title": i18n.translate("refFactur") },       
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "refArticle", "title": i18n.translate("refArticle") }, 
        { "data": "descLign", "title": i18n.translate("descLign") }, 
        { "data": "qteLign", "title": i18n.translate("qteLign"),render:function(qteLign){
            return ittone.QteFormat(qteLign);
        } },
        { "data": "lgnHT", "title": i18n.translate("lgnHT"),render:function(lgnHT){
            return ittone.CurrencyFormat(lgnHT);
        } },
        { "data": "lgnTTC", "title": i18n.translate("lgnTTC"),render:function(lgnTTC){
            return ittone.CurrencyFormat(lgnTTC);
        } },
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [ { "data": "lgnTTC", "title": i18n.translate("lgnTTC") },{ "data": "lgnHT", "title": i18n.translate("lgnHT") }];;
    let index=0;
    if($('#idClient').val()==-1){
        index=7;
    }else{
        index=6;
    }
    let getData_foter = [
        {lgnTTC:ittone.CurrencyFormat($.tableView.find('table').DataTable().column( index+1, {page:'current'} ).data().sum()),
        lgnHT:ittone.CurrencyFormat($.tableView.find('table').DataTable().column( index, {page:'current'} ).data().sum())}
    ];

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
            getData: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const pdfGrandLiveFournisseur=function(){
    let titel = '';
    let fournisseur =$('#idFournisseur').select2('data')[0].text;
    titel = '<tr><td>Grand Livre Fournisseur : '+ fournisseur +'</td></tr><tr><td style="font-size:14px;">Document du '+ ittone.convertDate($('#dateStart').getDate()) +' au '+ ittone.convertDate($('#dateEnd').getDate()) +'</td></tr>';
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },       
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },     
        { "data": "TT_ttc", "title": i18n.translate("credit"),render:function(TT_ttc,data){
            if(data.codeType == "BLFFR"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }     
        }},
        { "data": "TT_ttc", "title": i18n.translate("paye"),render:function(TT_ttc,data){
            if(data.codeType == "ESPF" || data.codeType == "VRMBNQFR" || data.codeType=="PRLFR" || data.codeType=="PYF" || data.codeType=="IPYF" || data.codeType == "BAVFR"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }    
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [ { "data": "Total", "title": i18n.translate("Total") }];
    let getData_foter = [{Total:ittone.CurrencyFormat($.tableView.find('table').DataTable().column( 4, {page:'current'} ).data().sum())}];
    let option = {
        orientation:'p',
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
            getData: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const pdfGrandLiveToutsFournisseurs = function () {
    let titel = '';
    let fournisseur = $('#idFournisseur').select2('data')[0].text;
    titel = '<tr><td>Grand Livre Fournisseur : ' + fournisseur + '</td></tr><tr><td style="font-size:14px;">Document du ' + ittone.convertDate($('#dateStart').getDate()) + ' au ' + ittone.convertDate($('#dateEnd').getDate()) + '</td></tr>';
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let result = getData_Table.reduce((r, { idFournisseur: name, nom: fournisseur, ...object }) => {
        var temp = r.find(o => o.name === name);
        if (!temp) r.push(temp = { name, children: [], fournisseur });
        temp.children.push(object);
        return r;
    }, []);
    let $table = $(`<table class="table table-striped" style="width: 80%;margin: auto;margin-top: 20px;">
    <thead>
        <th>Date</th>
        <th>N° Piece</th>
        <th>Type Document</th>
        <th>Crédit</th>
        <th>Payé</th>
    </thead>
    <tbody id="columns">
    </tbody>
</table>`);
    result.forEach(element => {
        $table.append('<tr><td colspan="2" style="font-weight:bolder;font-size:18px;">' + element.fournisseur + '</td><td colspan="3"></td></tr>')
        let array = element.children;
        let credit = 0;
        let paye = 0;
        let totalCredit=0;
        let totalPaye=0;
        array.forEach(e => {
            if (e.codeType == "BLFFR") {
                credit += e.TT_ttc;
                totalCredit+=e.TT_ttc;
            }
            else {
                credit = 0;
                totalCredit+=0;
            }
            if (e.codeType == "ESPF" || e.codeType == "VRMBNQFR" || e.codeType == "PRLFR" || e.codeType == "PYF" || e.codeType == "IPYF" || e.codeType == "BAVFR") {
                paye += e.TT_ttc;
                totalPaye+=e.TT_ttc
            }
            else {
                paye = 0;
                totalPaye+=0;
            }
            $table.append('<tr><td>' + ittone.convertDate(e.dateEntet) + '</td><td>' + e.numFactur + '</td><td>' + e.descType + '</td><td>' + ittone.CurrencyFormat(credit) + '</td><td>' + ittone.CurrencyFormat(paye) + '</td></tr>');
        });
        $table.append('<tr><td colspan="3">Total de Fournisseur : ' + element.fournisseur + '</td><td colspan="2">' + ittone.CurrencyFormat(totalCredit+totalPaye) + '</td></tr>')
    });
    let sumCredit = 0;
    let sumPaye = 0;
    let dataX = getData_Table;
    for (let i in dataX) {
        if (dataX[i].codeType == "BLFFR" || dataX[i].codeType == "BAVFR") {
            sumCredit += dataX[i].TT_ttc;
        }
        if(dataX[i].codeType=="ESPF" || dataX[i].codeType=="VRMBNQFR" || dataX[i].codeType=="PRLFR" || dataX[i].codeType=="PYF" || dataX[i].codeType=="IPYF"){
            sumPaye += dataX[i].TT_ttc;
        }
    }
    footer = '<tr><td colspan="3">Total des Fournisseurs : </td><td colspan=2>' + ittone.CurrencyFormat(sumCredit + sumPaye) + '</td></tr>';
    $table.append('<tfoot>'+footer+'</tfoot>')
    let option = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    };
    let data = {
        titel: titel,
        table: $table.html(),
        footer: footer,
        option: option
    }
    pdf.FormatTableHtml(data);
}
const pdfSoldeCreditFournisseur=function(){
    let titel = '';
    titel = '<tr><td>Balance des Fournisseurs : </td></tr><tr><td style="font-size:14px;">Balance en '+ ittone.convertDate($('#dateStart').getDate()) +'</td></tr>';
    let columns_title = [
        { "data": "codeFournisseur", "title": i18n.translate("codeFournisseur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "debit", "title": i18n.translate("Debit"),render:function(Débit){
            return ittone.CurrencyFormat(Débit);
        }},
        { "data": "credit", "title": i18n.translate("Credit"),render:function(Crédit){
            return ittone.CurrencyFormat(Crédit);
        }},
        { "data": "credit", "title": i18n.translate("Solde"),
           render:function(credit,data){
            return ittone.CurrencyFormat((data.credit)-(data.debit));
        }}
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        orientation: 'p',
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
const excelDocFournisseur=function(){
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },       
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "TT_ht", "title": i18n.translate("TT_ht"),render:function(TT_ht){
            return ittone.CurrencyFormat(TT_ht);
        } },
        { "data": "TT_tva", "title": i18n.translate("TT_tva"),render:function(TT_tva){
            return ittone.CurrencyFormat(TT_tva);
        } },
        { "data": "TT_ttc", "title": i18n.translate("TT_ttc"),render:function(TT_ttc){
            return ittone.CurrencyFormat(TT_ttc);
        } },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelDocFournisseurDetail=function(){
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },       
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "refArticle", "title": i18n.translate("refArticle") }, 
        { "data": "descLign", "title": i18n.translate("descLign") }, 
        { "data": "qteLign", "title": i18n.translate("qteLign"),render:function(qteLign){
            return ittone.QteFormat(qteLign);
        } },
        { "data": "lgnHT", "title": i18n.translate("lgnHT"),render:function(lgnHT){
            return ittone.CurrencyFormat(lgnHT);
        } },
        { "data": "lgnTTC", "title": i18n.translate("lgnTTC"),render:function(lgnTTC){
            return ittone.CurrencyFormat(lgnTTC);
        } },
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelGrandLiveFournisseur=function(){
    let columns_title = [
        { "data": "refFactur", "title": i18n.translate("refFactur") },       
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },     
        { "data": "TT_ttc", "title": i18n.translate("credit"),render:function(TT_ttc,data){
            if(data.codeType == "BLFFR"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }     
        }},
        { "data": "TT_ttc", "title": i18n.translate("paye"),render:function(TT_ttc,data){
            if(data.codeType == "ESPF" || data.codeType == "VRMBNQFR" || data.codeType=="PRLFR" || data.codeType=="PYF" || data.codeType=="IPYF" || data.codeType == "BAVFR"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }    
        } }
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelSoldeCreditFournisseur=function(){
    let columns_title = [
        { "data": "codeFournisseur", "title": i18n.translate("codeFournisseur") },
        { "data": "nomFournisseur", "title": i18n.translate("nomFournisseur") },
        { "data": "debit", "title": i18n.translate("Debit"),render:function(Débit){
            return ittone.CurrencyFormat(Débit);
        }},
        { "data": "credit", "title": i18n.translate("Credit"),render:function(Crédit){
            return ittone.CurrencyFormat(Crédit);
        }},
        { "data": "credit", "title": i18n.translate("Solde"),
           render:function(credit,data){
            return ittone.CurrencyFormat((data.credit)-(data.debit));
        }}
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}