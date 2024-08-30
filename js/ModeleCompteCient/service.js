/*********** ModeleCompteCient **************/
export function CompteCient(data){
    let list = ittone.AjaxJson(url+'/ModeleCompteCient.aspx/CompteCient',JSON.stringify(data));
    return list;
}