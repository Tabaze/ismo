/************************* Avances ************************/
export function listAvance(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/listAvance', JSON.stringify(data));
    return list;
}
export function insertUpdateAvance(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/insertUpdateAvance', JSON.stringify(data));
    return list;
}
export function AvanceById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/AvanceById', JSON.stringify(data));
    return list;
}
export function deleteAvance(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/deleteAvance', JSON.stringify(data));
    return list;
}
/*********** Bulletin de paie : Groupe Entete **************/
export function listGrpEntete(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/listGrpEntete', '');
    return list;
}
export function insertUpdateGrpEntete(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/insertUpdateGrpEntete', JSON.stringify(data));
    return list;
}
export function GrpEnteteById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/GrpEnteteById', JSON.stringify(data));
    return list;
}
export function deleteGrpEntete(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/deleteGrpEntete', JSON.stringify(data));
    return list;
}
export function GrpEnteteLastNum(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/GrpEnteteLastNum', JSON.stringify({idDossier:ittone.idDossier()}));
    return list;
}
/*********** Bulletin de paie : Calcul Entete **************/
export function listCalculEntete(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/listCalculEntete', JSON.stringify(data));
    return list;
}
export function insertUpdateCalculEntete(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/insertUpdateCalculEntete', JSON.stringify(data));
    return list;
}
export function deleteEntete(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/deleteEntete', JSON.stringify(data));
    return list;
}
export function calculBulletinPaie(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/calculBulletinPaie', JSON.stringify(data));
    return list;
}
/*********** Bulletin de paie: Ligne Entete ****************/
export function insertUpdateLigneRubrique(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/insertUpdateLigneRubrique', JSON.stringify(data));
    return list;
}
export function listLigneRubrique(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/listLigneRubrique', JSON.stringify(data));
    return list;
}
export function deleteLigneRubrique(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModeleCalcul.aspx/deleteLigneRubrique', JSON.stringify(data));
    return list;
}

