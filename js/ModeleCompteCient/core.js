import {selectClientAll,selectClient} from './../ModeleTier/component.js';
import {tableDocClient} from './component.js';
import {clientCredit} from './../ModeleRegClient/service.js';
$(function () {
    loadApp();
    $('#idClient').on('change',this,function(){
        let name=ittone.getSubMenu();
        switch(name){
            case 'DocClient':
                randerTable();
                break;
            case 'DocClientDetail':
                    randerTableDocClientDetail();
                break;    
            case 'GrandLiveClient':
                    randerTableGrandLiveClient();
                break; 
            case 'SoldeCreditClient':
                randerTableSoldeCreditClient(); 
            break;
        }
        let dt={
            id:$('#idClient').val() || -1,
            idDossier:ittone.idDossier()
        }
        let credit=clientCredit(dt);
        if(credit.length){
            $('#credit').text(ittone.CurrencyFormat(credit[0].credit));
        }else{
            $('#credit').text(ittone.CurrencyFormat(0));
        }
    });
    $('#filterDateEntet').on('click',this,function(){
        let name=ittone.getSubMenu();
        switch(name){
            case 'DocClient':
                randerTable();
                break;
            case 'DocClientDetail':
                randerTableDocClientDetail();
                break;
            case 'GrandLiveClient':
                randerTableGrandLiveClient();
            break;  
            case 'SoldeCreditClient':
                randerTableSoldeCreditClient();
                break;         
        }
    });
});
const loadApp=function(){
    let name=ittone.getSubMenu();
    const startOfMonth = moment().startOf('Month').toDate();
    const endOfMonth = moment().endOf('Month').toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    switch(name){
        case 'DocClient':
            ittone.show($('.filterParArticle'));
            selectClientAll($('#idClient'));
            randerTable();
            break;
        case 'DocClientDetail':
            ittone.show($('.filterParArticle'));
            selectClientAll($('#idClient'));
            randerTableDocClientDetail();
            break;
        case 'GrandLiveClient':
            ittone.show($('.filterParArticle'));
            selectClientAll($('#idClient'));
            randerTableGrandLiveClient();
            break;  
        case 'SoldeCreditClient':
            ittone.show($('.filterParArticle'));
            selectClientAll($('#idClient')); 
            randerTableSoldeCreditClient();    
            $('.classFilter').remove();    
    }
    //randerTable();
}
const randerTable=function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "refFactur", "title": i18n.translate("refFactur") }, 
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },      
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "TT_ht", "title": i18n.translate("TT_ht"),render:function(TT_ht,r,dt){
            return ittone.CurrencyFormat(TT_ht*dt.valCaisse);
        } },
        { "data": "TT_tva", "title": i18n.translate("TT_tva"),render:function(TT_tva){
            return ittone.CurrencyFormat(TT_tva);
        } },
        { "data": "TT_ttc", "title": i18n.translate("TT_ttc"),render:function(TT_ttc,r,dt){
            return ittone.CurrencyFormat(TT_ttc*dt.valCaisse);
        } },
    ];
    if($('#idClient').val()!=-1){
        columns_title.splice(1,1);
    }
    let dt={
        id:$('#idClient').val() || -1,
        idDossier:ittone.idDossier(),
        statment:name,
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
    }
    tableDocClient($.tableView,columns_title,dt);
}
const randerTableDocClientDetail =function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "refFactur", "title": i18n.translate("refFactur") },       
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "refArticle", "title": i18n.translate("refArticle") }, 
        { "data": "descLign", "title": i18n.translate("descLign") }, 
        { "data": "qteLign", "title": i18n.translate("qteLign"),render:function(qteLign){
            return ittone.QteFormat(qteLign);
        } },
        { "data": "lgnHT", "title": i18n.translate("lgnHT"),
        render:function(lgnHT,r,dt){
            return ittone.CurrencyFormat(lgnHT*dt.valCaisse);
        } },
        { "data": "lgnTTC", "title": i18n.translate("lgnTTC"),render:function(lgnTTC,r,dt){
            return ittone.CurrencyFormat(lgnTTC*dt.valCaisse);
        } },
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "nomDepot", "title": i18n.translate("nomDepot") },
    ];
    if($('#idClient').val()!=-1){
        columns_title.splice(1,1);
    }
    let dt={
        id:$('#idClient').val() || -1,
        idDossier:ittone.idDossier(),
        statment:name,
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
    }
    tableDocClient($.tableView,columns_title,dt);
}
const randerTableGrandLiveClient =function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "numFactur", "title": i18n.translate("numFactur") },        
        { "data": "dateEntet", "title": i18n.translate("dateEntet"),
            render: function(dateEntet){
            return ittone.convertDate(dateEntet);
        } 
        },
        { "data": "descType", "title": i18n.translate("descType") },
        { "data": "etatDoc", "title": i18n.translate("etatDoc") },     
        { "data": "TT_ttc", "title": i18n.translate("credit"),render:function(TT_ttc,r,dt){
            if(dt.codeType == "BLFC"  || dt.codeType == "BRC"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }     
        }},
        { "data": "TT_ttc", "title": i18n.translate("paye"),render:function(TT_ttc,r,dt){
            if(dt.codeType == "ESPC" || dt.codeType == "VRMBNQCL" || dt.codeType=="PRLCL" || dt.codeType=="PYC" || dt.codeType=="IPYC"){
                return ittone.CurrencyFormat(TT_ttc);
            }
            else{
                return ' - ';
            }    
        } }
    ];
    if($('#idClient').val()==-1){
        columns_title.unshift({ "data": "nom", "title": i18n.translate("nom") });
    }
    let dt={
        id:$('#idClient').val() || -1,
        idDossier:ittone.idDossier(),
        statment:name,
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
    }
    tableDocClient($.tableView,columns_title,dt);
}
const randerTableSoldeCreditClient =function(){
    let name=ittone.getSubMenu();
    let columns_title = [
        { "data": "codeClient", "title": i18n.translate("codeClient") },        
        { "data": "nomClient", "title": i18n.translate("nomClient")},
        { "data": "debit", "title": i18n.translate("Debit"),render:function(Débit){
            return ittone.CurrencyFormat(Débit);
        }},
        { "data": "credit", "title": i18n.translate("Credit"),render:function(Crédit){
            return ittone.CurrencyFormat(Crédit);
        }},
        { "data": "credit", "title": i18n.translate("Solde"),
           render:function(credit,r,dt){
            return ittone.CurrencyFormat((dt.credit)-(dt.debit));
        }}
    ];
    let dt={
        id:$('#idClient').val() || -1,
        idDossier:ittone.idDossier(),
        statment:name,
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
    }
    tableDocClient($.tableView,columns_title,dt);
}
