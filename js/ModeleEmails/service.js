export function listTier(){
    let list = ittone.AjaxJson(url+'/ModeleEmails.aspx/listTier', '');
    return list;
}
export function listTierEmail(){
    let list = ittone.AjaxJson(url+'/ModeleEmails.aspx/listTierEmail', '');
    return list;
}
export function listEmailsParTier(data){
    let list = ittone.AjaxJson(url+'/ModeleEmails.aspx/listEmailsParTier', JSON.stringify(data));
    return list;
}
export function listEmails(data){
    let list = ittone.AjaxJson(url+'/ModeleEmails.aspx/listEmails', JSON.stringify(data));
    return list;
}
export function insertUpdateEmails(data){
    let list = ittone.AjaxJson(url+'/ModeleEmails.aspx/insertUpdateEmails', JSON.stringify(data));
    return list;
}
export function EmailsById(data){
    let list = ittone.AjaxJson(url+'/ModeleEmails.aspx/EmailsById', JSON.stringify(data));
    return list;
}