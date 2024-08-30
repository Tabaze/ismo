/*********** ModeleCompteFournisseur **************/
export function CompteFournisseur(data){
    let list = ittone.AjaxJson('ModeleCompteFournisseur.aspx/CompteFournisseur',JSON.stringify(data));
    return list;
}