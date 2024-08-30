
import {tableReglement} from '../ServiceReglement/component.js';
import {reglementLastNum,reglementInsertUpdate,reglementById,reglementCopier} from '../ServiceReglement/service.js';
import {selectTresor} from '../ModeleBase/component.js';
import {selectFournisseur,templateFournisseurInsert} from '../ModeleTier/component.js';
import {selectEntetByIdFournisseur} from '../ModeleEntet/component.js';
import {fournisseurCredit} from './service.js';
import {initFile} from './../uploadFiles.js';
$(function () {
    loadApp();
    $.btnCreate.on('click',this,function(){    
        settingForma(false);
        ittone.hide($.screenAfficher);
        ittone.show($.screenReglement);
        let numReglement= reglementLastNum()[0].numFacture;
        $('#numReglement').setVal(numReglement);
        //randerTableLingEntet();
        //templateControlTotal($('.controleTotal'));   
        
    });
    $('#formReglement').on('submit',this,function(){       
        if(this.checkValidity()){
            let data=ittone.convertFormToJSON($(this));
            data.dateReglement=$('#dateReglement').getDate();
            data.dateEcheanche=$('#dateEcheanche').getDate();
            data.codeType=ittone.getSubMenu();
            data.idDossier=ittone.idDossier();
            if($('#idEntet').val()==-1){
                data.idEntet=null;
            }
            if($.screenReglement.data('update') && role.update()){
                data.idReglement= $.screenReglement.attr('id');
                data.statment='update';
                let param ={
                        param:[data]
                        }
                let list=reglementInsertUpdate(param)[0];        
                if(list.idReglement) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander,list,list.idReglement);
                }       

            }else if(!$.screenReglement.data('update') && role.insert()){
                data.statment='insert';
                let param ={
                        param:[data]
                        }
                let list= reglementInsertUpdate(param)[0];        
                if(list.idReglement) {
                    ittone.success('successfully');
                    settingForma(true);
                    $.screenReglement.attr('id',list.idReglement);
                    ittone.addInDataTable(tableRander,list)
                }                           
            }
        }
    });
    $.tableView.on('dblclick','tbody tr',function(){
        randerFormReglement(tableRander.row(this).data().idReglement)
    });
    $('#idFournisseur').on('change',this,function(){
        let data=$('#idFournisseur').select2('data')[0].data;
        if(data){
            $('#nom').setVal(data.nomFournisseur);
            selectEntetByIdFournisseur($('#idEntet'),{id:data.idFournisseur});
            let credit =  fournisseurCredit({id:data.idFournisseur,idDossier:ittone.idDossier()});
            if(credit.length){
                    $('#soldeCridet').setVal(credit[0].credit)
            }else{
                    $('#soldeCridet').setVal(0);
            }
        }        
    });
    
    $('#idEntet').on('change',this,function(){
        if($('#idEntet').val()!=-1){
            let data=$('#idEntet').select2('data')[0].data;
            $('#montant').setVal(data.TT_ttc);
        }
        
        //$('#nom').setVal(data.nomFournisseur);
        //selectEntetByIdFournisseur($('#idEntet'),{id:data.idFournisseur});
    });
    $('#listCopier').on('click','.dropdown-item',function(){
        let codeTypeCopier=$(this).attr('data-model');
        let text =$(this).text();
        let rows=tableRander.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Est ce que tu veux le '+text,function(){
                let data=rows.data();             
                data.map(function(dt){
                    let idReglement=dt.idReglement;
                    let idDossier=dt.idDossier;
                    reglementCopier({idReglement:idReglement,idDossier:idDossier,codeTypeCopier:codeTypeCopier});
                    ittone.success('successfully');
                });
            },function(){
                ittone.warning("Cancel");
            });
        }else{
            ittone.warning("dont Selection");
        }
    });
    $('#file').on('click',this,function(){
        let rows=tableRander.rows({ selected: true });
        if(rows.count()==1){
            let data=rows.data();
            initFile('reglement',data[0].idReglement);
        }else{
            ittone.warning("dont Selection");
        }
    });
    $('#filterDateEntet').on('click',this,function(){
        let name=ittone.getSubMenu();
        randerTableReglement(name,'dateReglement');
    });
    $('#filterDateEcheanche').on('click',this,function(){
        let name=ittone.getSubMenu();
        randerTableReglement(name,'dateEcheanche');
    });
    $('#newCompte').on('click', this, function () {
        templateFournisseurInsert($('#idFournisseur'));
    });
});
var tableRander;
const loadApp=function(){
    let name=ittone.getSubMenu();
    let dateDossier =ittone.dateExeDossier();
    const startOfMonth = moment().startOf('Month').set('year',moment(dateDossier.dateExeStart).year()).toDate();
    const endOfMonth = moment().endOf('Month').set('year',moment(dateDossier.dateExeStart).year()).toDate();   
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    $('#dateReglement').inputDate({
        minDate:dateDossier.dateExeStart,
        maxDate:dateDossier.dateExeEnd
    });
    randerTableReglement(name,'dateReglement');
    selectTresor($('#idTreso'));
    selectFournisseur($('#idFournisseur'));
    selectEntetByIdFournisseur($('#idEntet'),{id:-1});
    if(name=='ESPF' || name=='RNDF'){
        $('#numCheque').closest('.form-outline').remove();
    }
    if(name=='EFFETFR' ||name=='CHFFF' ){
        ittone.show($('#copierVers'))
    }
}
const randerTableReglement=function(name,filter){
    let columns_title = [
        { "data": "numReglement", "title": i18n.translate("numReglement") },
        { "data": "dateReglement", "title": i18n.translate("dateReglement"),   
        render: function(dateReglement){
            return ittone.convertDate(dateReglement);
        } },
        { "data": "dateEcheanche", "title": i18n.translate("dateEcheanche"),   
        render: function(dateEcheanche){
            return ittone.convertDate(dateEcheanche);
        } },
        { "data": "numCheque", "title": i18n.translate("numCheque") },
        { "data": "nom", "title": i18n.translate("nom") },
        { "data": "info", "title": i18n.translate("info") },
        { "data": "nameTreso", "title": i18n.translate("nameTreso") },
        { "data": "montant", "title": i18n.translate("montant"),
            render: function(montant){
            return ittone.CurrencyFormat(montant);
            } 
        },
        { "data": "nomUser", "title": i18n.translate("nomUser") }
    ];
    if(name=='ESPC' || name=='RNDC'){
       columns_title.splice(3, 1);
    }
   
    let dt={
        idDossier:ittone.idDossier(),
        codeType:name,
        dateStart:$('#dateStart').getDate(),
        dateEnd:$('#dateEnd').getDate(),
        Filter:filter
    }
    let param ={
        param:[dt]
    }
    tableRander=tableReglement($.tableView,columns_title,param);
}
const randerFormReglement=function(id){
    let list=reglementById({id:id})[0];
    $.screenReglement.attr('id',id);
    ittone.convertJsonToForm($('#formReglement'),list);
    $('#dateReglement').setDate(list.dateReglement);
    $('#dateEcheanche').setDate(list.dateEcheanche);   
    setTimeout(function(){$('#idEntet').val(list.idEntet).trigger('change')}, 2000)
    settingForma(true);
    ittone.show($.screenReglement);ittone.hide($.screenAfficher);
}