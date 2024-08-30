/*********** Pos **************/
export function listPos(){
    let list = ittone.AjaxJson('ModelePos.aspx/listPos', '');
    return list;
}
export function insertUpdatePos(data){
    let list = ittone.AjaxJson('ModelePos.aspx/insertUpdatePos', JSON.stringify(data));
    return list;
}
export function PosById(data){
    let list = ittone.AjaxJson('ModelePos.aspx/PosById', JSON.stringify(data));
    return list;
}
export function deletePos(data){
    let list = ittone.AjaxJson('ModelePos.aspx/deletePos', JSON.stringify(data));
    return list;
}
export function listFamille(data){
    let list = ittone.AjaxJson('ModelePos.aspx/listFamille', JSON.stringify(data));
    return list;
}
export function deleteAllFamillePos(data){
    let list = ittone.AjaxJson('ModelePos.aspx/deleteAllFamillePos', JSON.stringify(data));
    return list;
}
export function insertFamillePos(data){
    let list = ittone.AjaxJson('ModelePos.aspx/insertFamillePos', JSON.stringify(data));
    return list;
}
export function deleteAllRegelementPos(data){
    let list = ittone.AjaxJson('ModelePos.aspx/deleteAllRegelementPos', JSON.stringify(data));
    return list;
}
export function insertRegelementePos(data){
    let list = ittone.AjaxJson('ModelePos.aspx/insertRegelementePos', JSON.stringify(data));
    return list;
}
export function regelementePosById(data){
    let list = ittone.AjaxJson('ModelePos.aspx/regelementePosById', JSON.stringify(data));
    return list;
}
/*********** Caissier **************/
export function listCaissier(){
    let list = ittone.AjaxJson('ModelePos.aspx/listCaissier', '');
    return list;
}
export function insertUpdateCaissier(data){
    let list = ittone.AjaxJson('ModelePos.aspx/insertUpdateCaissier', JSON.stringify(data));
    return list;
}
export function caissierById(data){
    let list = ittone.AjaxJson('ModelePos.aspx/caissierById', JSON.stringify(data));
    return list;
}
export function deleteCaissier(data){
    let list = ittone.AjaxJson('ModelePos.aspx/deleteCaissier', JSON.stringify(data));
    return list;
}

