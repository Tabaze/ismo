import { listNiveau,listDepartement,listFonction,listCategorie,listTaux,listContrat} from "./service.js";

export function tableNiveau($input,columns_title){
    let table=$input.randerTable(columns_title,listNiveau(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idNiveau);
        }
    });
    return table;
}
export function selectNiveau($input) {
    let list = listNiveau();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idNiveau,
            text: obj.nomNiveau,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}
export function tableDepartement($input,columns_title){
    let table=$input.randerTable(columns_title,listDepartement(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idDepartement);
        }
    });
    return table;
}
export function selectDepartement($input) {
    let list = listDepartement();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idDepartement,
            text: obj.nomDepartement,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}
export function tableFonction($input,columns_title){
    let table=$input.randerTable(columns_title,listFonction(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idFonction);
        }
    });
    return table;
}
export function selectFonction($input) {
    let list = listFonction();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idFonction,
            text: obj.nomFonction,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}
export function tableCategorie($input,columns_title){
    let table=$input.randerTable(columns_title,listCategorie(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idCategorie);
        }
    });
    return table;
}
export function selectCategorie($input) {
    let list = listCategorie();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idCategorie,
            text: obj.nomCategorie,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}
export function tableTaux($input,columns_title){
    let table=$input.randerTable(columns_title,listTaux(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idTaux);
        }
    });
    return table;
}
export function tableContrat($input,columns_title){
    let table=$input.randerTable(columns_title,listContrat(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idProfil);
        }
    });
    return table;
}
export function selectContrat($input) {
    let list = listContrat();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idProfil,
            text: obj.nomProfil,
            data:obj
        }
    });
    xdata.unshift({id:'', text:'' });
    $input.select2({ data: xdata });
}
