export function listEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/listEntet', JSON.stringify(data));
    return list;
}
export function deleteEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/deleteEntet', JSON.stringify(data));
    return list;
}
export function listArticleEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/listArticleEntet', JSON.stringify(data));
    return list;
}
export function cmupQteByArticle(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/CmupQteByArticle', JSON.stringify(data));
    return list;
}
export function listEntetLign(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/listEntetLign', JSON.stringify(data));
    return list;
}
export function entetLastNum(){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetLastNum', JSON.stringify({idDossier:ittone.idDossier(),codeType:ittone.getSubMenu()}));
    return list;
}
export function entetInsertUpdate(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetInsertUpdate', JSON.stringify(data));
    return list;
}
export function getValCmupStock(){
    let list = ittone.AjaxJson('ModeleEntet.aspx/getValCmupStock', JSON.stringify({idDossier:ittone.idDossier(),codeType:ittone.getSubMenu()}));
    return list;
}
export function lignEntetInsertUpdate(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/lignEntetInsertUpdate', JSON.stringify(data));
    return list;
}
export function deleteLignEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/deleteLignEntet', JSON.stringify(data));
    return list;
}
export function entetFixed(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetFixed', JSON.stringify(data));
    return list;
}
export function entetById(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetById', JSON.stringify(data));
    return list;
}
export function listFilleInEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/listFilleInEntet', JSON.stringify(data));
    return list;
}
export function insertFilleInEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/insertFilleInEntet', JSON.stringify(data));
    return list;
}
export function deleteFilleInEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/deleteFilleInEntet', JSON.stringify(data));
    return list;
}
export function clotureEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/clotureEntet', JSON.stringify(data));
    return list;
}
export function entetCopier(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetCopier', JSON.stringify(data));
    return list;
}
export function entetCopierAll(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetCopierAll', JSON.stringify(data));
    return list;
}
export function entetByIdClient(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetByIdClient', JSON.stringify(data));
    return list;
}
export function entetByIdFournisseur(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/entetByIdFournisseur', JSON.stringify(data));
    return list;
}
export function checkNumEntet(data){
    let list = ittone.AjaxJson('ModeleEntet.aspx/checkNumEntet', JSON.stringify(data));
    return list;
}