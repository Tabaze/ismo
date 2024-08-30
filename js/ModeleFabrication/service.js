
/*********** Fabrication **************/
export function listFabrication(){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/listFabrication', '');
    return list;
}
export function insertUpdateFabrication(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/insertUpdateFabrication', JSON.stringify(data));
    return list;
}
export function fabricationById(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/fabricationById', JSON.stringify(data));
    return list;
}
export function deleteFabrication(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/deleteFabrication', JSON.stringify(data));
    return list;
}

export function listFabricationLign(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/listFabricationLign', JSON.stringify(data));
    return list;
}
export function insertUpdateFabricationLign(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/insertUpdateFabricationLign', JSON.stringify(data));
    return list;
}
export function deleteLignFabrication(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/deleteLignFabrication', JSON.stringify(data));
    return list;
}
export function listOrdre(data){   
    let list = ittone.AjaxJson('ModeleFabrication.aspx/listOrdre', JSON.stringify(data));
    return list;
}
export function ordreLastNum(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/ordreLastNum', JSON.stringify(data));
    return list;
}
export function insertUpdateOrdre(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/insertUpdateOrdre', JSON.stringify(data));
    return list;
}
export function ordreById(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/ordreById', JSON.stringify(data));
    return list;
}
export function uapdateOrdreProgressType(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/uapdateOrdreProgressType', JSON.stringify(data));
    return list;
}
export function uapdateOrdreProgressValider(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/uapdateOrdreProgressValider', JSON.stringify(data));
    return list;
}
export function listArticleStock(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/listArticleStock', JSON.stringify(data));
    return list;
}
export function deleteOrdre(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/deleteOrdre', JSON.stringify(data));
    return list;
}
export function getQteCommand(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/getQteCommand', JSON.stringify(data));
    return list;
}
export function listOrderLine(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/listOrderLine', JSON.stringify(data));
    return list;
}
export function orderLineInsert(data){
    let list = ittone.AjaxJson('ModeleFabrication.aspx/orderLineInsert', JSON.stringify(data));
    return list;
}