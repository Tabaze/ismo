import { listDepartement,listEmployee } from './service.js'
export function tableDepartement($input, columns_title) {
    let table = $input.randerTable(columns_title, listDepartement(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idDepartement);
        }
    });
    return table;
}
export function tableEmployee($input, columns_title) {
    let table = $input.randerTable(columns_title, listEmployee(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEmploye);
        }
    });
    return table;
}
export function selectDepartement($input) {
	let list = listDepartement();
	let xdata = $.map(list, function (obj) {
		return {
			id: obj.idDepartement,
			text: obj.nomDepartement,
		}
	});
	xdata.unshift({ id: '', text: '' });
	$input.select2({ data: xdata, placeholder: 'Département' });
}