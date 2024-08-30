import { insertUpdateNiveau,NiveauById,deleteNiveau } from './service.js';/* Niveau */
import { insertUpdateDepartement,DepartementById,deleteDepartement } from './service.js';/* Département */
import { insertUpdateFonction,FonctionById,deleteFonction } from './service.js';/* Fonction */
import { insertUpdateCategorie,CategorieById,deleteCategorie } from './service.js';/* Catégorie */
import { insertUpdateTaux,TauxById,deleteTaux } from './service.js';/* Taux */
import { insertUpdateContrat,ContratById,deleteContrat } from './service.js';/* Contrat */
import { tableNiveau,tableDepartement,tableFonction,tableCategorie,tableTaux,tableContrat} from './component.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click',this,function(){
        let rows=tableRander.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
                let data=rows.data();
                switch(ittone.getSubMenu()){
                    case 'Paie_Niveau':data.map(function(dt){
                        if(deleteNiveau({id:dt.idNiveau})){
                            ittone.deleteRowDataTable(tableRander,dt.idNiveau);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Departement':data.map(function(dt){
                        if(deleteDepartement({id:dt.idDepartement})){
                            ittone.deleteRowDataTable(tableRander,dt.idDepartement);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Fonction':data.map(function(dt){
                        if(deleteFonction({id:dt.idFonction})){
                            ittone.deleteRowDataTable(tableRander,dt.idFonction);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Categorie':data.map(function(dt){
                        if(deleteCategorie({id:dt.idCategorie})){
                            ittone.deleteRowDataTable(tableRander,dt.idCategorie);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Taux':data.map(function(dt){
                        if(deleteTaux({id:dt.idTaux})){
                            ittone.deleteRowDataTable(tableRander,dt.idTaux);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Contrat':data.map(function(dt){
                        if(deleteContrat({id:dt.idContrat})){
                            ittone.deleteRowDataTable(tableRander,dt.idContrat);
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
    $('#formNiveau').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            console.log($.modalNiveau.data('update'))
            if($.modalNiveau.data('update') && role.update()){
                data.idNiveau= $.modalNiveau.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateNiveau(param)[0];        
                if(list.idNiveau) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idNiveau);
                }       

            }else if(!$.modalNiveau.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateNiveau(param)[0];        
                if(list.idNiveau) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalNiveau.attr('id',list.idNiveau);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formDepartement').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            if($.modalDepartement.data('update') && role.update()){
                data.idDepartement= $.modalDepartement.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateDepartement(param)[0];        
                if(list.idDepartement) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idDepartement);
                }       

            }else if(!$.modalDepartement.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateDepartement(param)[0];     
                if(list.idDepartement) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalDepartement.attr('id',list.idDepartement);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formFonction').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            if($.modalFonction.data('update') && role.update()){
                data.idFonction= $.modalFonction.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateFonction(param)[0];        
                if(list.idFonction) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idFonction);
                }       

            }else if(!$.modalFonction.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateFonction(param)[0];        
                if(list.idFonction) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalFonction.attr('id',list.idFonction);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formCategorie').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            if($.modalCategorie.data('update') && role.update()){
                data.idCategorie= $.modalCategorie.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateCategorie(param)[0];        
                if(list.idCategorie) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idCategorie);
                }       

            }else if(!$.modalCategorie.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateCategorie(param)[0];        
                if(list.idCategorie) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalCategorie.attr('id',list.idCategorie);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formTaux').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            if($.modalTaux.data('update') && role.update()){
                data.idTaux= $.modalTaux.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateTaux(param)[0];        
                if(list.idTaux) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idTaux);
                }       

            }else if(!$.modalTaux.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateTaux(param)[0];        
                if(list.idTaux) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalTaux.attr('id',list.idTaux);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formContrat').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));         
            data.partSalariel=$('#partSalariel').is(':checked');
            data.allFamiliel=$('#allFamiliel').is(':checked');
            data.formationProf=$('#formationProf').is(':checked');
            data.cotisationPatr=$('#cotisationPatr').is(':checked');
            data.iR=$('#iR').is(':checked');
            if($.modalContrat.data('update') && role.update()){
                data.idProfil= $.modalContrat.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateContrat(param)[0];        
                if(list.idProfil) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idProfil);
                }       

            }else if(!$.modalContrat.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateContrat(param)[0];        
                if(list.idProfil) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalContrat.attr('id',list.idProfil);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $.tableView.on('dblclick','tbody tr',function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Niveau': randerFormNiveau(tableRander.row(this).data().idNiveau);break;
            case 'Paie_Departement': randerFormDepartement(tableRander.row(this).data().idDepartement);break;
            case 'Paie_Fonction': randerFormFonction(tableRander.row(this).data().idFonction);break;
            case 'Paie_Categorie': randerFormCategorie(tableRander.row(this).data().idCategorie);break;
            case 'Paie_Taux': randerFormTaux(tableRander.row(this).data().idTaux);break;
            case 'Paie_Contrat': randerFormContrat(tableRander.row(this).data().idProfil);break;
        }
        $('select').trigger('change');
    });
});
var tableRander;
const loadApp=function(){
    let name=ittone.getSubMenu();
    switch(name){
        case 'Paie_Niveau':randerTableNiveau();break;
        case 'Paie_Departement':randerTableDepartement();break;
        case 'Paie_Fonction':randerTableFonction();break;
        case 'Paie_Categorie':randerTableCategorie();break;
        case 'Paie_Taux':randerTableTaux();break;
        case 'Paie_Contrat':randerTableContrat();break;
    }
}
const randerTableNiveau=function(){
    let columns_title = [
        { "data": "nomNiveau", "title": i18n.translate("nomNiveau") },
    ];
    tableRander=tableNiveau($.tableView,columns_title);
}
const randerFormNiveau=function(id){
    let list=NiveauById({id:id})[0];
    $.modalNiveau.attr('id',id);
    ittone.convertJsonToForm($('#formNiveau'),list);
    ittone.show($.modalNiveau.parent());
    settingForma(true);
}
const randerTableDepartement=function(){
    let columns_title = [
        { "data": "nomDepartement", "title": i18n.translate("nomDepartement") },
    ];
    tableRander=tableDepartement($.tableView,columns_title);
}
const randerFormDepartement=function(id){
    let list=DepartementById({id:id})[0];
    $.modalDepartement.attr('id',id);
    ittone.convertJsonToForm($('#formDepartement'),list);
    ittone.show($.modalDepartement.parent());
    settingForma(true);
}
const randerTableFonction=function(){
    let columns_title = [
        { "data": "nomFonction", "title": i18n.translate("nomFonction") },
    ];
    tableRander=tableFonction($.tableView,columns_title);
}
const randerFormFonction=function(id){
    let list=FonctionById({id:id})[0];
    $.modalFonction.attr('id',id);
    ittone.convertJsonToForm($('#formFonction'),list);
    ittone.show($.modalFonction.parent());
    settingForma(true);
}
const randerTableCategorie=function(){
    let columns_title = [
        { "data": "nomCategorie", "title": i18n.translate("nomCategorie") },
    ];
    tableRander=tableCategorie($.tableView,columns_title);
}
const randerFormCategorie=function(id){
    let list=CategorieById({id:id})[0];
    $.modalCategorie.attr('id',id);
    ittone.convertJsonToForm($('#formCategorie'),list);
    ittone.show($.modalCategorie.parent());
    settingForma(true);
}
const randerTableTaux=function(){
    let columns_title = [
        { "data": "codeTaux", "title": i18n.translate("codeTaux") },
        { "data": "libelleTaux", "title": i18n.translate("libelleTaux") },
        { "data": "taux", "title": i18n.translate("taux") },
    ];
    tableRander=tableTaux($.tableView,columns_title);
}
const randerFormTaux=function(id){
    let list=TauxById({id:id})[0];
    $.modalTaux.attr('id',id);
    ittone.convertJsonToForm($('#formTaux'),list);
    ittone.show($.modalTaux.parent());
    settingForma(true);
}
const randerTableContrat=function(){
    let columns_title = [
        { "data": "nomProfil", "title": i18n.translate("nomProfil") },
        { "data": "typeProfil", "title": i18n.translate("typeProfil") },
    ];
    tableRander=tableContrat($.tableView,columns_title);
}
const randerFormContrat=function(id){
    let list=ContratById({id:id})[0];
    $.modalContrat.attr('id',id);   
    ittone.convertJsonToForm($('#formContrat'),list);
    $('#partSalariel').setChecked(list.partSalariel);
    $('#allFamiliel').setChecked(list.allFamiliel);
    $('#formationProf').setChecked(list.formationProf);
    $('#cotisationPatr').setChecked(list.cotisationPatr);
    $('#iR').setChecked(list.iR);
    ittone.show($.modalContrat.parent());
    settingForma(true);
}
