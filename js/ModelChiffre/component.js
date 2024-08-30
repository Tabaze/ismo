import { listChiffre } from './service.js'
export function tableListChiffre($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listChiffre(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            //$(row).attr('data-id', data.idArticle);
        }
    });
    return table;
}