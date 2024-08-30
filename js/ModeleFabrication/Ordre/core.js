
import {tableOrdre,selectFabricationFiche,templateLingFabrication,tableArticleStock,tableOrderLine,selectFabricationLign} from '../component.js';
import {selectDepot} from '../../ModeleBase/component.js';
import {ordreLastNum,insertUpdateOrdre,ordreById,listOrdre,
    uapdateOrdreProgressValider,uapdateOrdreProgressType,deleteOrdre,getQteCommand,orderLineInsert} from '../service.js';
import {sortable} from './sortable.js';
$(function () {
    loadApp();
    $.btnCreateOrdre.on('click',this,function(){
        settingFormaOrdre(false);
        switch(ittone.getSubMenu()){
            case 'Ordre': 
            ittone.show($.modalOrdre.parent());
            let numOrdre= ordreLastNum({idDossier:ittone.idDossier()});
            if(numOrdre.length){
                $('#numOrdre').setVal(numOrdre[0].numOrdre+1);
            }else{
                $('#numOrdre').setVal(1);
            }
            break;
                 
        }
    });
    $('#formOrdre').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));   
            data.datePlanification=$('#datePlanification').getDate();
            data.dateEndPlanification=$('#dateEndPlanification').getDate();   
            data.idDossier=ittone.idDossier();
            data.idArticle=$('#idFabrication').select2('data')[0].data.idArticle
            if($.modalOrdre.data('update') && role.update()){
                data.idOrdre= $.modalOrdre.attr('id');
                data.statment='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateOrdre(param)[0];        
                if(list.idOrdre) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRanderOrdre,list,list.idOrdre);
                }       

            }else if(!$.modalOrdre.data('update') && role.insert()){
                data.statment='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateOrdre(param)[0];        
                if(list.idOrdre) {
                    ittone.success('successfully');
                    settingFormaOrdre(true);
                    $.modalOrdre.attr('id',list.idOrdre);
                    ittone.addInDataTable(tableRanderOrdre,list)
                }                           
            }
            randerKaibanOrdre();
        }
    });
    $.tableViewOrdre.on('dblclick','tbody tr',function(){
       let ordre=tableRanderOrdre.row(this).data();
       if(!ordre.valider && ordre.progressType=='nv'){
        randerFormOrdre(tableRanderOrdre.row(this).data().idOrdre);
       }      
    });
    $.kaibanViewOrdre.on('dblclick','[data-type="nv"] .list-group-item',function(){
        randerFormOrdre($(this).attr('data-id'));
    });
    $.btnSauvegardervaliderOrdre.on('click',this,function(){
        let data=$.validerOrdre.data('info');
        let qteOrdreValider=+$('#qteOrdreValider').val();
        let qteOrdreTrash=+$('#qteOrdreTrash').val();
        let qteOrdreEnCours=+$('#qteOrdreEnCours').val();
        uapdateOrdreProgressValider(
            {qteOrdreValider:qteOrdreValider,
                qteOrdreTrash:qteOrdreTrash,
                qteOrdreEnCours:qteOrdreEnCours,
                progressType:'va',
                idOrdre:data.idOrdre
            })
            //randerKaibanOrdre();  
            randerTableOrdre(); 
            $.btnAnnulervaliderOrdre.click();
    });
    $.btnAnnulervaliderOrdre.on('click',this,function(){
        ittone.hide($.validerOrdre.parent());
        randerKaibanOrdre();  
    });
    $('#qteOrdreValider,#qteOrdreTrash').on('keyup change',this,function(){
        let data=$.validerOrdre.data('info');
        let qteOrdre=data.qteOrdre;
        let qteOrdreValider=+$('#qteOrdreValider').val();
        let qteOrdreTrash=+$('#qteOrdreTrash').val();
        let qteOrdreEnCours=+$('#qteOrdreEnCours').val();
        qteOrdreEnCours=parseFloat(qteOrdre)-parseFloat(qteOrdreValider)-parseFloat(qteOrdreTrash);
        $('#qteOrdreEnCours').setVal(qteOrdreEnCours);
    });
    $.kaibanViewOrdre.on('click','.showLineEntet',function(){
        let idFabrication=$(this).closest('.list-group-item').attr('data-idf');
        let columns_title = [
            { "data": "qteFabrication", "title": i18n.translate("qteFabrication") }, 
            { "data": "refArticle", "title": i18n.translate("refArticle") },     
            { "data": "nomArticle", "title": i18n.translate("nomArticle") },
            { "data": "qteLignFabrication", "title": i18n.translate("qteLignFabrication") }
        ];
        let dt ={
            id:idFabrication
        }
        templateLingFabrication(columns_title,dt);
    });
    $('#checkStock').on('click',this,function(){
        let idDepot=$('#idDepot').val();
        let idFabrication=$('#idFabrication').val();
        let qteOrdre=+$('#qteOrdre').val();
        let idDossier=ittone.idDossier();
        let dt={idFabrication:idFabrication,idDepot:idDepot,QtOrdre:qteOrdre,idDossier:idDossier};
        let columns_title = [
            { "data": "refArticle", "title": i18n.translate("refArticle") },
            { "data": "nomArticle", "title": i18n.translate("nomArticle") },
            { "data": "qteDepot", "title": i18n.translate("Qt dispo") },
            { "data": "qte", "title": i18n.translate("Qtdemond") },
            { "data": "qteInstock", "title": i18n.translate("qtereste") },
        ];
        tableArticleStock($.tablelistArticleStock,columns_title,dt);
    });
    $('#deleteOrdre').on('click',this,function(){
        let rows=tableRanderOrdre.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
                let data=rows.data();
                switch(ittone.getSubMenu()){
                    case 'Ordre':data.map(function(dt){
                        if(!dt.valider && dt.progressType=='nv'){ 
                            if(deleteOrdre({id:dt.idOrdre})){
                                ittone.deleteRowDataTable(tableRanderOrdre,dt.idOrdre);
                                ittone.success("successfully");
                            }
                        }else{
                            ittone.warning("Cancel"); 
                        }
                    }); break; 
                }
            },function(){
                ittone.warning("Cancel");
            });
        }else{
            ittone.warning("dont Selection");
        }
    });
    $('#getQteCommand').on('click',this,function(){
        let id=$('#idFabrication').select2('data')[0].data.idArticle
        let qte=getQteCommand({id:id,idDossier:ittone.idDossier()})[0]
        $('#qteOrdre').setVal(qte.qteLign);
    });
    $('#filterDateEntet').on('click',this,function(){
        randerTableOrdre();
        randerKaibanOrdre();
    });
    $.kaibanViewOrdre.on('click','.showLineSetting',function(){
        let idOrdre=$(this).closest('.list-group-item').attr('data-id');
        let idFabrication=$(this).closest('.list-group-item').attr('data-idf');
        $.modalOrdreLine.attr('id',idOrdre);
        ittone.show($.modalOrdreLine.parent());
        selectFabricationLign($('#idLignArticle'),{id:idFabrication});
        randerTableOrderLine(idOrdre);
    });
    $('#sorteOrdreLine').on('click',this,function(){
        let idOrdre=$.modalOrdreLine.attr('id');
        let typeOrdre="sorte";
        let qteOrdreLine=+$('#qteOrdreLine').val();
        let valStock=-1;
        let idLignArticle=$('#idLignArticle').val();
        let dt={
            idOrdre:idOrdre,
            typeOrdre:typeOrdre,
            qteOrdreLine:qteOrdreLine,
            valStock:valStock,
            idLignArticle:idLignArticle
        }
        if(orderLineInsert(dt)){
            ittone.success("successfully");
            randerTableOrderLine(idOrdre);
        }
    });
    $('#entreOrdreLine').on('click',this,function(){
        let idOrdre=$.modalOrdreLine.attr('id');
        let typeOrdre="entre";
        let qteOrdreLine=+$('#qteOrdreLine').val();
        let valStock=1;
        let idLignArticle=$('#idLignArticle').val();
        let dt={
            idOrdre:idOrdre,
            typeOrdre:typeOrdre,
            qteOrdreLine:qteOrdreLine,
            valStock:valStock,
            idLignArticle:idLignArticle
        }
        if(orderLineInsert(dt)){
            ittone.success("successfully");
            randerTableOrderLine(idOrdre);
        }
    });
    $('#btnCalculQte').on('click',this,function(){        
        let idFabrication=$('#idFabrication').val();
        if(idFabrication){
            selectFabricationLign($('#idLignArticleQte'),{id:idFabrication});
            ittone.show($.modalCalculQte.parent());
        }else{
            $('#idFabrication').focus();
        }
        
    }); 
});
var tableRanderOrdre;
var ordreList;
const loadApp=function(){
    let name=ittone.getSubMenu();
    let dateDossier =ittone.dateExeDossier();
    const startOfMonth = moment().startOf('Month').set('year',moment(dateDossier.dateExeStart).year()).toDate();
    const endOfMonth = moment().endOf('Month').set('year',moment(dateDossier.dateExeStart).year()).toDate();   
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);   
    $('#datePlanification').inputDate({
        minDate:dateDossier.dateExeStart,
        maxDate:dateDossier.dateExeEnd
    });
    $('#dateEndPlanification').inputDate({
        minDate:dateDossier.dateExeStart,
        maxDate:dateDossier.dateExeEnd
    });
    switch(name){
        case 'Ordre':
            $.screenAfficher.addClass('d-none');
            $.screenAfficherOrdre.removeClass('d-none');
            randerTableOrdre();
            selectDepot($('#idDepot'));
            selectFabricationFiche($('#idFabrication'));
            randerKaibanOrdre();
        break;
    }
}
const randerTableOrdre=function(){
    let columns_title = [
        { "data": "numOrdre", "title": i18n.translate("numOrdre") },
        { "data": "qteOrdre", "title": i18n.translate("qteOrdre") },
        { "data": "datePlanification", "title": i18n.translate("datePlanification"),
                render: function(datePlanification){
                return ittone.convertDate(datePlanification);
            } },
        { "data": "dateEndPlanification", "title": i18n.translate("dateEndPlanification"),
            render: function(dateEndPlanification){
            return ittone.convertDate(dateEndPlanification);
        } },
        { "data": "reference", "title": i18n.translate("reference") },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    let dt={
        idDossier:ittone.idDossier(),
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
        Filter:$('#filterStatment').val()
    }
    let param ={
        param:[dt]
    }
    tableRanderOrdre=tableOrdre($.tableViewOrdre,columns_title,param);
}
const randerTableOrderLine=function(id){
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },     
        { "data": "qteOrderLine", "title": i18n.translate("qteOrderLine") },
        { "data": "cmup", "title": i18n.translate("cmup") },       
    ];
    tableOrderLine($.tableViewOrdreLine,columns_title,{id:id});
}
const randerFormOrdre=function(id){
    let list=ordreById({id:id})[0];
    $.modalOrdre.attr('id',id);
    ittone.convertJsonToForm($('#formOrdre'),list);
    settingFormaOrdre(true);
    ittone.show($.modalOrdre.parent());
    $('#datePlanification').setDate(list.datePlanification);
    $('#dateEndPlanification').setDate(list.dateEndPlanification); 
}
export const randerKaibanOrdre=function(){
    let dt={
        idDossier:ittone.idDossier(),
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
        Filter:$('#filterStatment').val()
    }
    let param ={
        param:[dt]
    }
    let list = listOrdre(param);
    ordreList = list = $.map(list, function(obj) {
        if(!obj.valider){
            obj.datePlanification=moment(obj.datePlanification).format("l");
            obj.dateEndPlanification=moment(obj.dateEndPlanification).format("l");
            return obj;
        }     
    });
    list=groupBy(list,"progressType");
    let templateOrdre = $("#templateOrdre").html();
    var html = Mustache.render(templateOrdre, list);
    $.kaibanViewOrdre.html(html);
    sortable();
}
const groupBy = function (list, key) {
    return list.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
export const changeProgressType=function(type,oldType,idOrdre){
    if(type!=oldType){
        if(type=='va' && oldType!='nv'){
          ittone.show($.validerOrdre.parent());
          let data=tableRanderOrdre.row('[data-id="' + idOrdre + '"]').data();
          $.validerOrdre.data('info',data);
          $('#qteOrdre1').setVal(data.qteOrdre);
          $('#qteOrdreValider').setVal(data.qteOrdre);
          $('#qteOrdreTrash').setVal(0);
          $('#qteOrdreEnCours').setVal(0);
          
        }else if(type!='va'){
          if(type!='tr'){
            uapdateOrdreProgressType({progressType:type,idOrdre:idOrdre});
          }    
        }
        randerKaibanOrdre();
        randerTableOrdre();
        oldType='';
      }
}