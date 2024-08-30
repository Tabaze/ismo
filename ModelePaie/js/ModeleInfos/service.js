/*********** Niveau **************/
export function listNiveau(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/listNiveau', '');
    return list;
}
export function insertUpdateNiveau(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/insertUpdateNiveau', JSON.stringify(data));
    return list;
}
export function NiveauById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/NiveauById', JSON.stringify(data));
    return list;
}
export function deleteNiveau(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/deleteNiveau', JSON.stringify(data));
    return list;
}
/*********** Département **************/
export function listDepartement(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/listDepartement', '');
    return list;
}
export function insertUpdateDepartement(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/insertUpdateDepartement', JSON.stringify(data));
    return list;
}
export function DepartementById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/DepartementById', JSON.stringify(data));
    return list;
}
export function deleteDepartement(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/deleteDepartement', JSON.stringify(data));
    return list;
}
/*********** Fonction **************/
export function listFonction(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/listFonction', '');
    return list;
}
export function insertUpdateFonction(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/insertUpdateFonction', JSON.stringify(data));
    return list;
}
export function FonctionById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/FonctionById', JSON.stringify(data));
    return list;
}
export function deleteFonction(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/deleteFonction', JSON.stringify(data));
    return list;
}
/*********** Catégorie **************/
export function listCategorie(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/listCategorie', '');
    return list;
}
export function insertUpdateCategorie(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/insertUpdateCategorie', JSON.stringify(data));
    return list;
}
export function CategorieById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/CategorieById', JSON.stringify(data));
    return list;
}
export function deleteCategorie(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleInfos.aspx/deleteCategorie', JSON.stringify(data));
    return list;
}
/*********** Taux Frais Professionnel **************/
export function listTaux(){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/listTaux', '');
    return list;
}
export function insertUpdateTaux(data){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/insertUpdateTaux', JSON.stringify(data));
    return list;
}
export function TauxById(data){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/TauxById', JSON.stringify(data));
    return list;
}
export function deleteTaux(data){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/deleteTaux', JSON.stringify(data));
    return list;
}
/*********** Profil Contrat **************/
export function listContrat(){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/listContrat', '');
    return list;
}
export function insertUpdateContrat(data){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/insertUpdateContrat', JSON.stringify(data));
    return list;
}
export function ContratById(data){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/ContratById', JSON.stringify(data));
    return list;
}
export function deleteContrat(data){
    let list = ittone.AjaxJson('/ModelePaie/ModeleInfos.aspx/deleteContrat', JSON.stringify(data));
    return list;
}
