
import { insertUpdateFabrication,fabricationById,deleteFabrication,insertUpdateFabricationLign } from './service.js';/* Fabrication */
import {modeleForFabrication,selectNomenclature,tableFabricationArticle,tableFabrication,tableLingFabrication} from './component.js'
import { templateArticleInsert } from '../ModeleArticle/component.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click',this,function(){
        let rows=tableRander.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
                let data=rows.data();
                switch(ittone.getSubMenu()){
                    case 'Fabrication':data.map(function(dt){
                        if(deleteFabrication({id:dt.idFabrication})){
                            ittone.deleteRowDataTable(tableRander,dt.idFabrication);
                            ittone.success("successfully");
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
    $('#formFabrication').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            
            if($.screenFabrication.data('update') && role.update()){
                data.idFabrication= $.screenFabrication.attr('id');
                data.statment='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateFabrication(param)[0];        
                if(list.idFabrication) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idFabrication);
                }       

            }else if(!$.screenFabrication.data('update') && role.insert()){
                data.statment='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateFabrication(param)[0];        
                if(list.idFabrication) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.screenFabrication.attr('id',list.idFabrication);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $.tableView.on('dblclick','tbody tr',function(){
        switch(ittone.getSubMenu()){
            case 'Fabrication': randerFormFabrication(tableRander.row(this).data().idFabrication);break;    
        }
    });
    $.tableArticleEntet.on('dblclick','tbody tr',function(){
        let dataArticle= tableRanderArticle.row(this).data();
        let formLine={
            idLignArticle:dataArticle.idArticle,
            refArticle:dataArticle.refArticle,
            nomArticle:dataArticle.nomArticle,
            qteFabrication:1,
            qteLignFabrication:0
        }
        randerFormLine(formLine)
    });
    $('#ajouterLign').on('click',this,function(){
        let formLine= $('#formLine').data('info');
        let data={};
        data.idFabrication=$.screenFabrication.attr('id');
        data.idLignArticle=formLine.idLignArticle;
        if(data.idFabrication==undefined || data.idLignArticle==undefined){
            ittone.warning('warning');
            return false;
        }
        data.qteFabrication=+$('#qteFabrication').val();
        data.qteLignFabrication=+$('#qteLignFabrication').val();     
        if($('#formLine').data('update') && role.update()){
            data.idLignFab= $('#formLine').data('info').idLignFab;
            data.statment='update';
            let param ={
                    param:[data]
                    }
            let list=insertUpdateFabricationLign(param)[0];        
            if(list.idLignFab) {
                ittone.success('successfully');
                ittone.updateInDataTable(tableRanderLign,list,list.idLignFab);
                settingFormLine();
            }       

        }else if(!$('#formLine').data('update') && role.insert()){
            data.statment='insert';
            let param ={
                    param:[data]
                    }
            let list= insertUpdateFabricationLign(param)[0];     
            if(list.idLignFab) {
                ittone.success('successfully');
                ittone.addInDataTable(tableRanderLign,list);
                settingFormLine();
            }                           
        }
        
    });
    $.tableFabricationLign.on('click','.updateLign',function(){
        let $tr=$(this).closest('tr');
        let row=tableRanderLign.row($tr).data();
        $('#formLine').data('update',true);
        $('#formLine').data('info',row);
        $('#refArticle').setVal(row.refArticle);
        $('#descLign').setVal(row.nomArticle);
        $('#qteFabrication').setVal(row.qteFabrication);
        $('#qteLignFabrication').setVal(row.qteLignFabrication);
    });
    $('#newArticle').on('click', this, function () {
        templateArticleInsert(tableRanderArticle);
    });
});
var tableRander;
var tableRanderArticle;
var tableRanderLign;
const loadApp=function(){
    let name=ittone.getSubMenu();
    switch(name){
        case 'Fabrication':randerTableArticle();  selectNomenclature($('#idArticle'),{
            param:[{
                modele:modeleForFabrication.Nomenclature
            }]
        })        
        randerTableFabrication();
        randerTableLingFabrication();
        break;
    }
}
const randerTableArticle=function(){
    let columns_title = [
        { "data": "nomFamille", "title": i18n.translate("nomFamille") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") }
    ];
    let dt ={
        param:[{
            modele:modeleForFabrication.Fabrication
        }]
    }
    tableRanderArticle=tableFabricationArticle($.tableArticleEntet,columns_title,dt);
}
const randerTableFabrication=function(){
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("refArticle") },
        { "data": "codeBareArticle", "title": i18n.translate("codeBareArticle") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "reference", "title": i18n.translate("referenceArticle") },
        { "data": "info", "title": i18n.translate("info") },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    tableRander=tableFabrication($.tableView,columns_title);
}
const randerFormFabrication=function(id){
    let list=fabricationById({id:id})[0];
    $.screenFabrication.attr('id',id);
    ittone.convertJsonToForm($('#formFabrication'),list);
    $('#reference_Fabrication').text(list.reference);
    settingForma(true);
    ittone.show($.screenFabrication);ittone.hide($.screenAfficher);
    randerTableLingFabrication();
}
const randerTableLingFabrication=function(){
    let columns_title = [
        { "data": "qteFabrication", "title": i18n.translate("qteFabrication") }, 
        { "data": "refArticle", "title": i18n.translate("refArticle") },     
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "qteLignFabrication", "title": i18n.translate("qteLignFabrication") },
        { "data": "idLignFab", "title": "",
            render: function(idLignFab){
            return `<button type="button" class="fs-6 btn btn-floating deleteLign">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" class="fs-6 btn btn-floating updateLign">
                    <i class="fa-solid fa-edit"></i>
                </button>
                `
            } 
        }
    ];
    let dt ={
        id:$.screenFabrication.attr('id') || -1
    }
    tableRanderLign=tableLingFabrication($.tableFabricationLign,columns_title,dt);
}
const randerFormLine=function(data){
    $('#formLine').data('info',data);
    $('#refArticle').setVal(data.refArticle);
    $('#descLign').setVal(data.nomArticle);
    $('#qteFabrication').setVal(data.qteFabrication);
    $('#qteLignFabrication').setVal(data.qteLignFabrication);
    $('#qteLignFabrication').focus().select();
}
