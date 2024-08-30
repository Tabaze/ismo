export function listReglement(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/listReglement', JSON.stringify(data));
    return list;
}
export function reglementById(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/reglementById', JSON.stringify(data));
    return list;
}
export function deleteReglement(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/deleteReglement', JSON.stringify(data));
    return list;
}
export function reglementInsertUpdate(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/reglementInsertUpdate', JSON.stringify(data));
    return list;
}
export function reglementLastNum(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/reglementLastNum', JSON.stringify({idDossier:ittone.idDossier(),codeType:ittone.getSubMenu()}));
    return list;
}
export function reglementCopier(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/reglementCopier', JSON.stringify(data));
    return list;
}
export function listFilleInReglement(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/listFilleInReglement', JSON.stringify(data));
    return list;
}
export function insertFilleInReglement(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/insertFilleInReglement', JSON.stringify(data));
    return list;
}
export function deleteFilleInReglement(data){
    let list = ittone.AjaxJson('ServiceReglement.aspx/deleteFilleInReglement', JSON.stringify(data));
    return list;
}
export function reglementLastNumWithData(data) {
    let list = ittone.AjaxJson('ServiceReglement.aspx/reglementLastNum', JSON.stringify(data));
    return list;
}