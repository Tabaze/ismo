import { listTier, listEmails, listTierEmail } from './service.js';

export function tableEmails($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listEmails(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEmail);
        }
    });
    return table;
}
export function selectTier($input) {
    let list = listTier();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.id,
            text: obj.nom,
            typeTier: obj.typeTier
        }
    });
    $input.select2({ data: xdata });
}
export function selectTierEmail($input) {
    let list = listTier();
    let xdata = $.map(list, function (obj) {
        if (obj.email)
            return {
                id: obj.id,
                text: obj.nom + ' ( ' + obj.email + ' )',
                typeTier: obj.typeTier,
                data: obj
            }
    });
    $input.select2({ data: xdata });
}
export function selectSocConEmail($input) {
    let list = listTierEmail();
    let xdata = $.map(list, function (obj) {
        if (obj.email)
            return {
                id: obj.id,
                text: obj.nom + ' ( ' + obj.email + ' )',
                typeTier: obj.typeTier,
                data: obj
            }
    });
    $input.select2({ data: xdata });
}