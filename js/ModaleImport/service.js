export function listColName(data){
    let list = ittone.AjaxJson('Import.aspx/listColName', JSON.stringify(data));
    return list;
}