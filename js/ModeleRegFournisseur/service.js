export function fournisseurCredit(data){
    let list = ittone.AjaxJson('ModeleReglementFournisseur.aspx/fournisseurCredit', JSON.stringify(data));
    return list;
}