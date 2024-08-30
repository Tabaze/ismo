/*********** Achat **************/
export function validerEntetVente(data){
    let list = ittone.AjaxJson('ModeleVente.aspx/validerEntet',JSON.stringify(data));
    return list;
}
export function listPropByidClient(data){
    let list = ittone.AjaxJson('ModeleVente.aspx/listPropByidClient',JSON.stringify(data));
    return list;
}