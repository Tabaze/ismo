import { listVariable, listCotisation, listRubrique } from "./service.js";
export function tableVariable($input, columns_title) {
    let table = $input.randerTable(columns_title, listVariable(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idVariable);
        }
    });
    return table;
}
export function tableCotisation($input, columns_title) {
    let table = $input.randerTable(columns_title, listCotisation(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idCotisation);
        }
    });
    return table;
}
export function selectCotisation($input) {
    let list = listCotisation();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idCotisation,
            text: obj.libelleCotis,
            data: obj
        }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata });
}
export function tableRubrique($input, columns_title) {
    let table = $input.randerTable(columns_title, listRubrique(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idRubrique);
        }
    });
    return table;
}
export function selectRubrique($input) {
    let list = listRubrique();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idRubrique,
            text: obj.libelleRubrique,
            data: obj
        }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata });
}
