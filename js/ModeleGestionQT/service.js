/*********** ModeleGestionQT **************/
export function listParArticle(data){
    let list = ittone.AjaxJson('ModeleGestionQT.aspx/gestionQte',JSON.stringify(data));
    return list;
}
