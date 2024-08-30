export function dossierInsertUapdate(data) {
    let list = ittone.AjaxJson(url + '/ModeleDossier.aspx/DossierInsertUapdate', JSON.stringify(data));
    return list;
}
export function dossierList(data) {
    let list = ittone.AjaxJson(url + '/ModeleDossier.aspx/DossierList', '');
    return list;
}
export function dossierById(data) {
    let list = ittone.AjaxJson(url + '/ModeleDossier.aspx/DossierById', JSON.stringify(data));
    return list;
}
export function getFoldersNameEntet() {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/getFoldersNameEntet', '');
    return list;
}