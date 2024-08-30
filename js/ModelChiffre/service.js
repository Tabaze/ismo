export function listChiffre(data){
    let list = ittone.AjaxJson(url+'/ModelChiffre.aspx/listChiffre',JSON.stringify(data));
    return list;
}