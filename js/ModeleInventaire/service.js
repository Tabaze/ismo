export function listEtatInventaire(data){
    let list = ittone.AjaxJson('ModeleInventaire.aspx/etatInventaire',JSON.stringify(data));
    return list;
}
export function validerMouvementTransfert(data){
    let list = ittone.AjaxJson('ModeleInventaire.aspx/validerMouvementTransfert',JSON.stringify(data));
    return list;
}