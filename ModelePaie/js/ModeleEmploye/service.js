/*********** Employés **************/
export function listEmploye(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listEmploye', '');
    return list;
}
export function EmployeById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/EmployeById', JSON.stringify(data));
    return list;
}
export function insertUpdateEmploye(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/insertUpdateEmploye', JSON.stringify(data));
    return list;
}
export function deleteEmploye(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/deleteEmploye', JSON.stringify(data));
    return list;
}
export function insertCotisationEmploye(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/insertCotisationEmploye', JSON.stringify(data));
    return list;
}
export function listEmployeCotis(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listEmployeCotis', JSON.stringify(data));
    return list;
}
export function listUsersDevices(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listUsersDevices', JSON.stringify(data));
    return list;
}
/*********** Contrats **************/
export function listContrat(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listContrat', '');
    return list;
}
export function ContratById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/ContratById', JSON.stringify(data));
    return list;
}
export function insertUpdateContrat(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/insertUpdateContrat', JSON.stringify(data));
    return list;
}
export function deleteContrat(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/deleteContrat', JSON.stringify(data));
    return list;
}
export function listFilleInContrat(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listFilleInContrat', JSON.stringify(data));
    return list;
}
export function insertFilleInContrat(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/insertFilleInContrat', JSON.stringify(data));
    return list;
}
export function deleteFilleInContrat(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/deleteFilleInContrat', JSON.stringify(data));
    return list;
}
/*********** Congés **************/
export function listConge(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listConge', '');
    return list;
}
export function CongeById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/CongeById', JSON.stringify(data));
    return list;
}
export function insertUpdateConge(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/insertUpdateConge', JSON.stringify(data));
    return list;
}
export function deleteConge(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/deleteConge', JSON.stringify(data));
    return list;
}
/*********** Prets **************/
export function listPret(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/listPret', '');
    return list;
}
export function PretById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/PretById', JSON.stringify(data));
    return list;
}
export function insertUpdatePret(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/insertUpdatePret', JSON.stringify(data));
    return list;
}
export function deletePret(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleEmploye.aspx/deletePret', JSON.stringify(data));
    return list;
}