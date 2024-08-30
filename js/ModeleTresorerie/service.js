export function listTresoEntet(data){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/listTresoEntet', JSON.stringify(data));
    return list;
}
export function tresoEntetById(data){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/tresoEntetById', JSON.stringify(data));
    return list;
}
export function deleteTresoEntet(data){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/deleteTresoEntet', JSON.stringify(data));
    return list;
}
export function insertUpdateTresoEntet(data){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/insertUpdateTresoEntet', JSON.stringify(data));
    return list;
}
export function tresoEntetLastNum(data){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/tresoEntetLastNum', JSON.stringify({idDossier:ittone.idDossier(),codeType:ittone.getSubMenu()}));
    return list;
}
export function soldCaisse(){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/soldCaisse', JSON.stringify({idDossier:ittone.idDossier()}));
    return list;
}
export function MouvementCaisse(data){
    let list = ittone.AjaxJson('ModeleTresorerie.aspx/MouvementCaisse', JSON.stringify(data));
    return list;
}