export function login(data) {
    let list = ittone.AjaxJson('Default.aspx/loginUser', JSON.stringify(data));
    return list;
}
export function insertUser(data){
    let list = ittone.AjaxJson('Default.aspx/insertUser', JSON.stringify(data));
    return list;
}
export function insertNewUser(data){
    let list = ittone.AjaxJson('Default.aspx/insertNewUser', JSON.stringify(data));
    return list;
}
export function userLieeDossier(data){
    let list = ittone.AjaxJson('Default.aspx/UserLieeDossier', JSON.stringify(data));
    return list;
}
export function insertLieeDossier(data){
    let list = ittone.AjaxJson('Default.aspx/InsertLieeDossier', JSON.stringify(data));
    return list;
}
export function deconnexion(data) {
    let list = ittone.AjaxJson('Default.aspx/deconnexion', '');
    return list;
}
