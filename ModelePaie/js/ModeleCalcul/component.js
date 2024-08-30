import { listAvance, listGrpEntete, listCalculEntete, deleteEntete, listLigneRubrique,deleteLigneRubrique} from "./service.js";
export function tableAvance($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listAvance(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idAvance);
        }
    });
    return table;
}
export function tableGrpEntete($input, columns_title) {
    let table = $input.randerTable(columns_title, listGrpEntete(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idGrpEnt);
        }
    });
    return table;
}
export function tableCalculEntete($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listCalculEntete(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEntete);
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
            let idEntete = row.idEntete;
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                if (deleteEntete({ id: idEntete })) {
                    ittone.deleteRowDataTable(table, idEntete);
                    ittone.success("successfully");
                }
            }, function () {
                ittone.warning("Cancel");
            });
        }
    });
    return table;
}
export function tableLigneRubrique($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listLigneRubrique(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idLigne);
        }
    });
    $input.off('click', '.deleteLignR');
    $input.on('click', '.deleteLignR', function () {
        if (role.delete()) {
            let $tr = $(this).closest('tr');
            let row = table.row($tr).data();
            if (!row) {
                row = table.row($tr.prev()).data();
            }
            let idLigne = row.idLigne;
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                if (deleteLigneRubrique({ idLigne: idLigne })) {
                    ittone.deleteRowDataTable(table, idLigne);
                    ittone.success("successfully");
                }
            }, function () {
                ittone.warning("Cancel");
            });
        }
    });
    return table;
}