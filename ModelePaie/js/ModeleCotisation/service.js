/*********** Variables **************/
export function listVariable(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/listVariable', '');
    return list;
}
export function insertUpdateVariable(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/insertUpdateVariable', JSON.stringify(data));
    return list;
}
export function VariableById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/VariableById', JSON.stringify(data));
    return list;
}
export function deleteVariable(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/deleteVariable', JSON.stringify(data));
    return list;
}
/*********** Cotisations **************/
export function listCotisation(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/listCotisation', '');
    return list;
}
export function insertUpdateCotisation(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/insertUpdateCotisation', JSON.stringify(data));
    return list;
}
export function CotisationById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/CotisationById', JSON.stringify(data));
    return list;
}
export function deleteCotisation(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/deleteCotisation', JSON.stringify(data));
    return list;
}
/*********** Rubriques **************/
export function listRubrique(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/listRubrique', '');
    return list;
}
export function insertUpdateRubrique(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/insertUpdateRubrique', JSON.stringify(data));
    return list;
}
export function RubriqueById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/RubriqueById', JSON.stringify(data));
    return list;
}
export function deleteRubrique(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCotisation.aspx/deleteRubrique', JSON.stringify(data));
    return list;
}