import {listFabrication,listFabricationLign,deleteLignFabrication,listOrdre,listArticleStock,listOrderLine} from './service.js';
import {listArticleEntet} from '../ModeleEntet/service.js';
export function tableFabrication($input,columns_title){
    let table=$input.randerTable(columns_title,listFabrication(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idFabrication);
        }
    });
    return table;
}
export function tableOrderLine($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listOrderLine(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
        }
    });
    return table;
}
export function tableLingFabrication($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listFabricationLign(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idLignFab);
        }
    });
    $input.off('click','.deleteLign');
    $input.on('click','.deleteLign',function(){
        if(role.delete()){
            let $tr=$(this).closest('tr');
            let row=table.row($tr).data();
            let idLignFab=row.idLignFab;  
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
            if(deleteLignFabrication({id:idLignFab})){
                    ittone.deleteRowDataTable(table,idLignFab);
                    ittone.success("successfully");
                
            } 
            },function(){
                ittone.warning("Cancel");
            });
        }
    });
    return table;
}
export function tableFabricationArticle($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listArticleEntet(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idArticle);
        }
    });
    $('.inputSearchTable').off('keyup change','input');
    $('.inputSearchTable').on('keyup change','input',function(){
        table.column($(this).attr('data-col')).search($(this).val()).draw(false);
    });
    return table;
}
export function selectNomenclature($input,dt) {
    let list = listArticleEntet(dt);
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idArticle,
            text: obj.nomArticle +'( '+obj.refArticle+' )',
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata,placeholder:'Nomenclature' });
}
export function selectFabricationFiche($input){
    let list = listFabrication();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idFabrication,
            text: obj.nomArticle +'( '+obj.reference+' )',
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata,placeholder:'Fiche' });
}
export function selectFabricationLign($input,dt){
    let list = listFabricationLign(dt);
    $input.html('')
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idLignArticle,
            text: obj.nomArticle +'( '+obj.refArticle+' )',
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata,placeholder:'Article' });
}
export function tableOrdre($input,columns_title,dt){
    let list=listOrdre(dt)
    list=list.filter(function (d){
        return d.valider==false;
    });
    let table=$input.randerTable(columns_title,list,{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idOrdre);
            if(data.progressType=='ec'){
                $(row).addClass('ecOrdre'); 
            }
            if(data.progressType=='va'){
                $(row).addClass('vaOrdre'); 
            }
            if(data.progressType=='tr'){
                $(row).addClass('trOrdre'); 
            }
        }
    });
    return table;
}
export function tableArticleStock($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listArticleStock(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
        }
    });
    return table;
}
export function templateLingFabrication(columns_title,dt){
    let $html =$(`<div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Les Articles</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
                <span class="radiosStyle">
                    <div class="modal-body">
                        <div class="row">
                            <div id="table"></div>
                        </div>          
                    </div>
                </span>
        </div>
    </div>    
    </div>`);
   let table= $html.find('#table').randerTable(columns_title,listFabricationLign(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idLignFab);
        }
    });
    $('body').append($html);
    ittone.show($html);
    setTimeout(() => {   table.draw(false); }, 200);
    $html.off('click','.btn-close')
    $html.on('click','.btn-close',function(){
        ittone.hide($html);
        setTimeout(() => {   $html.remove() }, 500);
    });
}
export var modeleForFabrication={
    Nomenclature:'Nomenclature',
    Fabrication:'Fabrication'
    }