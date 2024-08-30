import { insertUpdateVariable,VariableById,deleteVariable } from './service.js';/* Variables */
import { insertUpdateCotisation,CotisationById,deleteCotisation } from './service.js';/* Cotisations */
import { insertUpdateRubrique,RubriqueById,deleteRubrique } from './service.js';/* Rubriques */
import { tableVariable,tableCotisation,tableRubrique } from './component.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click',this,function(){
        let rows=tableRander.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
                let data=rows.data();
                switch(ittone.getSubMenu()){
                    case 'Paie_Variable':data.map(function(dt){
                        if(deleteVariable({id:dt.idVariable})){
                            ittone.deleteRowDataTable(tableRander,dt.idVariable);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Cotisation':data.map(function(dt){
                        if(deleteCotisation({id:dt.idCotisation})){
                            ittone.deleteRowDataTable(tableRander,dt.idCotisation);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Paie_Rubrique':data.map(function(dt){
                        if(deleteRubrique({id:dt.idRubrique})){
                            ittone.deleteRowDataTable(tableRander,dt.idRubrique);
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
    $('#formVariable').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));          
            data.propreSal=$('#propreSal').is(':checked');
            if($.modalVariable.data('update') && role.update()){
                data.idVariable= $.modalVariable.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateVariable(param)[0];        
                if(list.idVariable) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idVariable);
                }       

            }else if(!$.modalVariable.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateVariable(param)[0];        
                if(list.idVariable) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalVariable.attr('id',list.idVariable);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formCotisation').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            if($.modalCotisation.data('update') && role.update()){
                data.idCotisation= $.modalCotisation.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateCotisation(param)[0];        
                if(list.idCotisation) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idCotisation);
                }       

            }else if(!$.modalCotisation.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateCotisation(param)[0];     
                if(list.idCotisation) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalCotisation.attr('id',list.idCotisation);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formRubriques').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));    
            data.imposable=$('#imposable').is(':checked');    
            data.positive=$('#positive').is(':checked');
            if($.modalRubrique.data('update') && role.update()){
                data.idRubrique= $.modalRubrique.attr('id');
                data.statement='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdateRubrique(param)[0];        
                if(list.idRubrique) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idRubrique);
                }       

            }else if(!$.modalRubrique.data('update') && role.insert()){
                data.statement='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdateRubrique(param)[0];   
                if(list.idRubrique) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalRubrique.attr('id',list.idRubrique);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $.tableView.on('dblclick','tbody tr',function(){
        switch(ittone.getSubMenu()){
            case 'Paie_Variable': randerFormVariable(tableRander.row(this).data().idVariable);break;
            case 'Paie_Cotisation': randerFormCotisation(tableRander.row(this).data().idCotisation);break;
            case 'Paie_Rubrique': randerFormRubrique(tableRander.row(this).data().idRubrique);break;
        }
        $('select').trigger('change');
    });
});
var tableRander;
const loadApp=function(){
    let name=ittone.getSubMenu();
    switch(name){
        // case 'Paie_Variable':randerTableVariable();break;
        case 'Paie_Cotisation':randerTableCotisation();break;
        // case 'Paie_Tranche':break;
        case 'Paie_Rubrique':randerTableRubrique();break;
    }
}
const randerTableVariable=function(){
    let columns_title = [
        { "data": "codeVar", "title": i18n.translate("codeVar") },
        { "data": "libelleVar", "title": i18n.translate("libelleVar") },
        { "data": "valeurVar", "title": i18n.translate("valeurVar") },
    ];
    tableRander=tableVariable($.tableView,columns_title);
}
const randerFormVariable=function(id){
    let list=VariableById({id:id})[0];
    $.modalVariable.attr('id',id);
    ittone.convertJsonToForm($('#formVariable'),list);
    $('#propreSal').setChecked(list.propreSal);
    ittone.show($.modalVariable.parent());
    settingForma(true);
}
const randerTableCotisation=function(){
    let columns_title = [
        { "data": "codeCotis", "title": i18n.translate("codeCotis") },
        { "data": "libelleCotis", "title": i18n.translate("libelleCotis") },
    ];
    tableRander=tableCotisation($.tableView,columns_title);
}
const randerFormCotisation=function(id){
    let list=CotisationById({id:id})[0];
    $.modalCotisation.attr('id',id);
    ittone.convertJsonToForm($('#formCotisation'),list);
    ittone.show($.modalCotisation.parent());
    settingForma(true);
}
const randerTableRubrique=function(){
    let columns_title = [
        { "data": "codeRubrique", "title": i18n.translate("codeRubrique") },
        { "data": "codeExo", "title": i18n.translate("codeExo") },
        { "data": "libelleRubrique", "title": i18n.translate("libelleRubrique") },
    ];
    tableRander=tableRubrique($.tableView,columns_title);
}
const randerFormRubrique=function(id){
    let list=RubriqueById({id:id})[0];
    $.modalRubrique.attr('id',id);
    ittone.convertJsonToForm($('#formRubriques'),list);   
    $('#imposable').setChecked(list.imposable); 
    $('#positive').setChecked(list.positive);     
    ittone.show($.modalRubrique.parent());
    settingForma(true);
}
