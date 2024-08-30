import { listEmploye , listContrat , listConge , listPret, listEmployeCotis,listUsersDevices} from "./service.js";
import { deleteCotisation } from '../ModeleCotisation/service.js';

export function tableEmploye($input,columns_title){
    let table=$input.randerTable(columns_title,listEmploye(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEmploye);
        }
    });
    return table;
}
export function selectEmploye($input,text='') {
    let list = listEmploye();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idEmploye,
            text: obj.nomEmployee + ' ' + obj.prenomEmployee,
            data:obj
        }
    });
    xdata.unshift({id:-1, text:text });
    $input.select2({ data: xdata });
}
export function tableEmployeCotis($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listEmployeCotis(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idCotisation);
        }
    });
    $input.off('click', '.deleteLign');
    $input.on('click', '.deleteLign', function () {
        if (role.delete()) {
            let $tr = $(this).closest('tr');
            let row = table.row($tr).data();
            if (!row) {
                row = table.row($tr.prev()).data();
            }
            let idCotisation = row.idCotisation;
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                if (deleteCotisation({ id: idCotisation })) {
                    ittone.deleteRowDataTable(table, idCotisation);
                    ittone.success("successfully");
                }
            }, function () {
                ittone.warning("Cancel");
            });
        }
    });
    return table;
}
export function tableContrat($input,columns_title){
    let table=$input.randerTable(columns_title,listContrat(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idContrat);
        }
    });
    return table;
}
export function tableConge($input,columns_title){
    let table=$input.randerTable(columns_title,listConge(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idConge);
        }
    });
    return table;
}
export function tablePret($input,columns_title){
    let table=$input.randerTable(columns_title,listPret(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idPret);
        }
    });
    return table;
}
export function selectUsersDevice($input) {
    let list = listUsersDevices();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idUserDevice,
            text: obj.enrolNumber + ' - ' + obj.name + '( ' + obj.nameDevice + ' )',
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}