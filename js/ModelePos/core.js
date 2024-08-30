import { insertUpdatePos,PosById,deletePos,deleteAllFamillePos,insertFamillePos,deleteAllRegelementPos,insertRegelementePos,regelementePosById} from './service.js';/* Pos */
import { insertUpdateCaissier,caissierById } from './service.js';/* Caissier */

import {selectClient} from './../ModeleTier/component.js';
import {selectDepot,selectModRglm,selectTresor} from './../ModeleBase/component.js';
import {selectAllDossier} from './../ModeleDossier/component.js';
import {tablePos,tableCaissier,transferFamille} from './component.js';
import {insertUpdateUsers} from './../ModeleUsers/service.js';
$(function () {
    loadApp();
    $('#deleteRow').on('click',this,function(){
        let rows=tableRander.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
                let data=rows.data();
                switch(ittone.getSubMenu()){
                    case 'Pos':data.map(function(dt){
                        if(deletePos({id:dt.idPos})){
                            ittone.deleteRowDataTable(tableRander,dt.idPos);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Caissier':data.map(function(dt){
                        if(deleteCaissier({id:dt.idCaissier})){
                            ittone.deleteRowDataTable(tableRander,dt.idCaissier);
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
    $.btnSauvegarderPos.on('click',this,function(){
        let nav=$.tapPos.find('.nav-link.active').attr('id');
        switch(nav){
            case 'Create-tab':$('#btnPos').click();break;
            case 'Menu-tab':saveTransFamille();break;
            case 'Regelement-tab':saveRegelement();break;
        }
    });
    $('#formPos').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            data.checkOpenSession=$('#checkOpenSession').is(':checked');
            data.checkEmail=$('#checkEmail').is(':checked');
            if($.modalPos.data('update') && role.update()){
                data.idPos= $.modalPos.attr('id');
                data.statment='update';
                let param ={
                        param:[data]
                        }
                let list=insertUpdatePos(param)[0];        
                if(list.idPos) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idPos);
                }       

            }else if(!$.modalPos.data('update') && role.insert()){
                data.statment='insert';
                let param ={
                        param:[data]
                        }
                let list= insertUpdatePos(param)[0];        
                if(list.idPos) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalPos.attr('id',list.idPos);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $('#formCaissier').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            data.adminCaissier=$('#adminCaissier').is(':checked');
            data.avoirCheck=$('#avoirCheck').is(':checked');
            data.prixCheck=$('#prixCheck').is(':checked');
            data.remCheck=$('#remCheck').is(':checked');
            data.fermerCheck=$('#fermerCheck').is(':checked');
            data.archiveChecke=$('#archiveChecke').is(':checked');
            let dataUser={
                nomUser:data.nameCaissier,
                userName:data.userName,
                passwordUser:data.passCaissier,
                typeAdmin:data.adminCaissier
            }
            if($.modalCaissier.data('update') && role.update()){
                data.idCaissier= $.modalCaissier.attr('id');
                data.statment='update';
                data.idUser=$.modalCaissier.attr('idUser');
                dataUser.statment='update';
                dataUser.idUser=$.modalCaissier.attr('idUser');
                let paramUser ={
                    param:[dataUser]
                    }
                let listUser=insertUpdateUsers(paramUser)[0];
                let param ={
                        param:[data]
                        }
                let list=insertUpdateCaissier(param)[0];        
                if(list.idCaissier) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idCaissier);
                }       

            }else if(!$.modalCaissier.data('update') && role.insert()){
                data.statment='insert';
                dataUser.statment='insert';
                let paramUser ={
                    param:[dataUser]
                    }
                    console.log(paramUser)
                let listUser=insertUpdateUsers(paramUser)[0];
                data.idUser=listUser.idUser;
                $.modalCaissier.attr('idUser',listUser.idUser);
                let param ={
                        param:[data]
                        }
                        console.log(param)
                let list= insertUpdateCaissier(param)[0];        
                if(list.idCaissier) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.modalCaissier.attr('id',list.idCaissier);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $.tableView.on('dblclick','tbody tr',function(){
        switch(ittone.getSubMenu()){
            case 'POS': rabderFormPos(tableRander.row(this).data().idPos);break;
            case 'Caissier': randerFormCaissier(tableRander.row(this).data().idCaissier);break;
            
        }
    });
});
var tableRander;
var transFamille;
const loadApp=function(){
    let name=ittone.getSubMenu();
    selectClient($('#clientDivers'));
    selectDepot($('#idDepot'));
    selectAllDossier($('#idDossier'));
    selectTresor($('#idTreso'));
    selectModRglm($('#idModRglm'));
    switch(name){
        case 'POS':randerTablePos();break;
        case 'Caissier':randerTableCaissier();break;
    }
}
const randerTablePos=function(){
    let columns_title = [
        { "data": "namePos", "title": i18n.translate("namePos") },
        { "data": "titrePos", "title": i18n.translate("titrePos")},
        { "data": "souTitrePos", "title": i18n.translate("souTitrePos")},
    ];
    tableRander=tablePos($.tableView,columns_title);
    
}
const rabderFormPos=function(id){
    let list=PosById({id:id})[0];
    $.modalPos.attr('id',id);
    transFamille= transferFamille($("#transferFamille"),{id:id},{});
    randerRegelement();
    //console.log(transFamille.getSelectedItems());
    ittone.convertJsonToForm($('#formPos'),list);
    $('#checkOpenSession').setChecked(list.checkOpenSession);
    $('#checkEmail').setChecked(list.checkEmail);
    ittone.show($.modalPos.parent());
    settingForma(true);
}
const randerTableCaissier=function(){
    let columns_title = [
        { "data": "nameCaissier", "title": i18n.translate("nameCaissier") },
        { "data": "adminCaissier", "title": i18n.translate("adminCaissier") },
    ];
    tableRander=tableCaissier($.tableView,columns_title);
}
const randerFormCaissier=function(id){
    let list=caissierById({id:id})[0];
    console.log(list)
    $.modalCaissier.attr('id',id);
    ittone.convertJsonToForm($('#formCaissier'),list);   
    $('#adminCaissier').setChecked(list.adminCaissier);
    $('#avoirCheck').setChecked(list.avoirCheck);
    $('#prixCheck').setChecked(list.prixCheck);
    $('#remCheck').setChecked(list.remCheck);
    $('#fermerCheck').setChecked(list.fermerCheck);
    $('#archiveChecke').setChecked(list.archiveChecke);
    $.modalCaissier.attr('idUser',list.idUser);
    ittone.show($.modalCaissier.parent());
    settingForma(true);
}
const saveTransFamille =function(){
   let id = $.modalPos.attr('id');
   deleteAllFamillePos({id:id});
   transFamille.getSelectedItems().map(function(dt){
    insertFamillePos({id:id,idFamille:dt.idFamille});
   });
   ittone.success('successfully');
}
const saveRegelement=function(){
    let id = $.modalPos.attr('id');
    deleteAllRegelementPos({id:id});
    $('.tasks-list label').each(function(){
        let defaults= $(this).attr('default');
        insertRegelementePos({id:id,idModRglm:$(this).attr('data_id'),defaults:defaults})
    })
    ittone.success('successfully');
}
const randerRegelement =function(){
    let id = $.modalPos.attr('id');
    let list= regelementePosById({id:id});
    $('.tasks-list').html('');
    for(let i of list){ 
        let newTr = `<label class="tasks-list-item" default='`+ i.defaults +`' data_id=` + i.idModRglm + `>
                     <input type="checkbox" name="task_1" class="tasks-list-cb" >
                     <span class="tasks-list-mark"></span>
                     <span class="tasks-list-desc">` + i.nomModRglm + `</span>
                     <button type="button" class="btn btn-danger btn-sm ajouterModrglm">delete</button>
                     </label>`

        $('.tasks-list').append(newTr);
    }
}