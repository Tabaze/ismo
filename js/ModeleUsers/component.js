import { listUsers, listRoles, MenuByID, SubMenuByID, emailParamList } from './service.js';
export function tableUsers($input, columns_title) {
    let table = $input.randerTable(columns_title, listUsers(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idUser);
        }
    });
    return table;
}
export function tableRoles($input, columns_title) {
    let table = $input.randerTable(columns_title, listRoles(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idRole);
        }
    });
    return table;
}
export function tableEmailParam($input, columns_title) {
    let table = $input.randerTable(columns_title, emailParamList(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idParam);
        }
    });
    return table;
}
export function selectUsersNotAdmin($input) {
    $input.html('');
    let list = listUsers();
    let xdata = $.map(list, function (obj) {
        if (!obj.typeAdmin)
            return {
                id: obj.idUser,
                text: obj.nomUser
            }
    });
    $input.select2({ data: xdata });
}
export function selectUsers($input) {
    $input.html('');
    let list = listUsers();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idUser,
            text: obj.nomUser
        }
    });
    $input.select2({ data: xdata });
}
export function selectRoles($input) {
    $input.html('');
    let list = listRoles();
    let xdata = $.map(list, function (obj) {
        if (!obj.typeAdmin)
            return {
                id: obj.idRole,
                text: obj.nameRole
            }
    });
    $input.select2({ data: xdata });
}
export function templateMenu($html, id) {
    $html.html('');
    let list = MenuByID({ id: id });
    for (let i in list) {
        let classInstall = 'install';
        let dataIn = false;
        if (list[i].install > 0) { classInstall = 'uninstaller'; dataIn = true; }
        $html.append(`<a data-Model='` + list[i].dataModel + `' class="w-25 m_menuitem p-2">
		<div class="m_app_icon" style="background-image: url('`+ ittone.pathImgMenu + list[i].photoMenu + `')"></div>
		<div class="m_caption text-dark">`+ list[i].nomMenu + `</div>
		<div class="oe_module_action">
			<button type="button" class="btn btn-primary `+ classInstall + `" data-in="` + dataIn + `" data-id="` + list[i].idMenu + `"><span>` + classInstall + `</span></button>
		</div>
	</a>`)
    }
    $('#idParentMenu').change();
}
export function templateSubMenu($html, id) {
    $html.html('');
    let list = SubMenuByID({ id: id });
    for (let i in list) {
        let $chechBox = $(`<div data-Model='` + list[i].dataModel + `' class="form-check mb-3 ms-2">
        <input class="form-check-input" type="checkbox" data-id="`+ list[i].idSubMenu + `" id="` + list[i].namePrincipale + `"/>
        <label class="form-check-label" for="`+ list[i].namePrincipale + `">` + list[i].namePrincipale + `</label>
        </div>`)
        if (list[i].install > 0) { $chechBox.find('input').setChecked(true) }
        $html.append($chechBox)
    }
    $('#idParentMenu').change();
}
