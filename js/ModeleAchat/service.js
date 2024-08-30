/*********** Achat **************/
export function validerEntetAchat(data){
    let list = ittone.AjaxJson(url+'/ModeleAchat.aspx/validerEntet',JSON.stringify(data));
    return list;
}