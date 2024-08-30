import { listDevices,listPointagePlanning,listPointageMachine,listPlanning,listPointageMachineAbsents } from "./service.js";
export function tableDevice($input,columns_title){
    let table=$input.randerTable(columns_title,listDevices(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idDevice);
        }
    });
    return table;
}
export function selectDevice($input) {
    let list = listDevices();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idDevice,
            text: obj.nameDevice,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}
export function tablePointagePlanning($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listPointagePlanning(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.id);
        }
    });
    return table;
}
export function tablePointageMachine($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listPointageMachine(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('id-Entree', data.idEntree);
            $(row).attr('id-Sortie', data.idSortie);
        }
    });
    return table;
}
export function tablePointageMachineAbsents($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listPointageMachineAbsents(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.id);
        }
    });
    return table;
}
export function tablePlanning($input,columns_title){
    let table=$input.randerTable(columns_title,listPlanning(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.id);
        }
    });
    return table;
}
export function selectPlanning($input) {
    let list = listPlanning();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idPlanning,
            text: obj.nomPlanning,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}