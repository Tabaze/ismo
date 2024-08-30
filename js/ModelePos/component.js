import {listPos,listCaissier,listFamille} from './service.js';

export function tablePos($input,columns_title){
    let table=$input.randerTable(columns_title,listPos(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idPos);
        }
    });
    return table;
}
export function tableCaissier($input,columns_title){
    let table=$input.randerTable(columns_title,listCaissier(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idCaissier);
        }
    });
    return table;
}
export function selectCaissier($input) {
    let list = listCaissier();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idCaissier,
            text: obj.nomCaissier +'( '+obj.codeCaissier+' )',
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata,placeholder:'Caissier' });
}
export function selectPos($input) {    
    let list = listPos();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idPos,
            text: obj.nomPos +'( '+obj.codePos+' )',
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata,placeholder:'Pos' });
}
export function selectVendeur($input) {
    let list = listPos();
    let xdata = $.map(list, function(obj) {
        if(obj.vendeurPos)
        return {
            id: obj.idPos,
            text: obj.nomPos +'( '+obj.codePos+' )',
            data:obj
        }
    });
    xdata.unshift({id:-1, text:'' });
    $input.select2({ data: xdata,placeholder:'Vendeur' });
}
export function selectCaissierAll($input) {
    let list = listCaissier();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idCaissier,
            text: obj.nomCaissier +'( '+obj.codeCaissier+' )',
            data:obj
        }
    });
    xdata.unshift({id:-1, text:'Tous' });
    $input.select2({ data: xdata,placeholder:'Caissier' });
}
export function selectPosAll($input) {
    let list = listPos();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idPos,
            text: obj.nomPos +'( '+obj.codePos+' )',
            data:obj
        }
    });
    xdata.unshift({id:-1, text:'Tous' });
    $input.select2({ data: xdata,placeholder:'Pos' });
}
export function transferFamille($input,dt,setting){
     // var settings1 = {
    //     "dataArray": dataArray1,
    //     "itemName": "city",
    //     "valueName": "value",
    //     "callable": function (items) {
    //         console.dir(items)
    //     }
    // };
    $input.html('')
    let list=listFamille(dt);
    let settings1 = {
        "dataArray": list,
        "itemName": "nomFamille",
        "valueName": "idFamille",
        ...setting
    };
   let trans= $input.transfer(settings1);
   return trans;
}