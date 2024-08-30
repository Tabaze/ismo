export function infoEntetById(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/infoEntetById', JSON.stringify(data));
    return list;
}
export function listEntetLign(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/listEntetLign', JSON.stringify(data));
    return list;
}
export function listTaux(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/listTaux', JSON.stringify(data));
    return list;
}
export function getFoldersNameEntet() {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/getFoldersNameEntet', '');
    return list;
}
export function updateMetaEntet(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/updateMetaEntet', JSON.stringify(data));
    return list;
}
/************* Impression Bulletin Paie ******************/
export function ListImageArticle(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/ListImageArticle', JSON.stringify(data));
    return list;
}
export function listImpressionBulletinPaie(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/listImpressionBulletinPaie', JSON.stringify(data));
    return list;
}
export function articleById(data) {
    let list = ittone.AjaxJson(url + '/ServiceImprimant.aspx/articleById', JSON.stringify(data));
    return list;
}