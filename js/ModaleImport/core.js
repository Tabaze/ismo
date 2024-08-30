import { listColName } from './service.js';
import{insertUpdateClient,insertUpdateFournisseur} from './../ModeleTier/service.js';
import {insertUpdateFamille,insertUpdateArticle} from './../ModeleArticle/service.js'
import {divProgress} from './component.js';
$(function () {
    
    loadApp();
    $('#excelFile').on('change', this, function () {
        ittone.hide($('#excelImport'));
        ittone.show($('#sqlImport'));
        excel.ExportToTable($(this),$.tableView.find('table'),colName);
    });
    $('#sqlImport').on('click','.btn-success',function(){
        let count=$.tableView.find('table tbody tr').length;
        let index=0;
        colNameErors=[];
        dataErors=[];
        dataInsert=0;
        divProgress();
        $.tableView.find('table').find('thead tr:nth-child(2) th').each(function(){
          let col= { "data": $(this).find('select').val(), "title": $(this).find('option:selected').text() };
          colNameErors.push(col);
        });
        $.tableView.find('table tbody tr').forEach(function () {
            index++;
            let data={};
            $(this).find('td').each(function () {
                let key = $(this).closest('table').find('thead tr:nth-child(2) th').eq($(this).index()).find('select').val();
                let text=$(this).text();
                data[key]=text;
            });
            insertMod($(this),data);
            $('#spanImport').text(dataInsert);
            $('#spanError').text(dataErors.length);
            let _percent = Math.round((index * 100) / count);
            $('#percent').text(_percent);
            $('#percent').parent().css('width',_percent+'%');
        });
        if(dataErors.length){
            let erors = {
                columns_title: colNameErors,
                getData: dataErors
            };
            excel.Defualt(erors);
        }
    });
});
var colName;
var colNameErors=[];
var dataErors=[];
var dataInsert=0;
const loadApp=function(){
    let name=ittone.getSubMenu();
    switch(name){
        case 'Client':colName=listColName({tableName:"t_Client"});break;
        case 'Fournisseur':colName=listColName({tableName:"t_Fournisseur"});break;
        case 'Article':colName=listColName({tableName:"a_Article"});break;
        case 'Famille':colName=listColName({tableName:"a_Famille"});break;
    }
}
const insertMod=function($tr,data){
    data.statment="insert";
    let param ={
        param:[data]
        }
    let name=ittone.getSubMenu();
    var list={};
    switch(name){
        case 'Client':list=insertUpdateClient(param);break;
        case 'Fournisseur':list=insertUpdateFournisseur(param);break;
        case 'Article':list=insertUpdateArticle(param);break;
        case 'Famille':list=insertUpdateFamille(param);break;
    } 
    if(list==undefined) {
        $tr.css({'background-color':"#e10404","color":"white"});
        dataErors.push(data);    
    }else if(list.length){
        dataInsert++;
        $tr.css({'background-color':"#00b74a","color":"white"});
    }
}