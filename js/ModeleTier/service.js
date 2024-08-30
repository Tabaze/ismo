/*********** Client **************/
export function listClient() {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listClient', '');
    return list;
}
export function insertUpdateClient(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/insertUpdateClient', JSON.stringify(data));
    return list;
}
export function clientById(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/clientById', JSON.stringify(data));
    return list;
}
export function deleteClient(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/deleteClient', JSON.stringify(data));
    return list;
}
export function updatePropriete(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/updatePropriete', JSON.stringify(data));
    return list;
}
/*********** Fournisseur **************/
export function listFournisseur() {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listFournisseur', '');
    return list;
}
export function insertUpdateFournisseur(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/insertUpdateFournisseur', JSON.stringify(data));
    return list;
}
export function fournisseurById(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/fournisseurById', JSON.stringify(data));
    return list;
}
export function deleteFournisseur(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/deleteFournisseur', JSON.stringify(data));
    return list;
}
export function GenerateurCode(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/GenerateurCode', JSON.stringify(data));
    return list;
}


/*********** Contact **************/
export function listContact(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listContact', JSON.stringify(data));
    return list;
}
export function contactAddUp(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/contactAddUp', JSON.stringify(data));
    return list;
}
export function contactById(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/contactById', JSON.stringify(data));
    return list;
}
export function deleteContact(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/deleteContact', JSON.stringify(data));
    return list;
}

/*********** Actions **************/
export function listActionClient(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listActionClient', JSON.stringify(data));
    return list;
}
export function ActionClientAddUp(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/ActionClientAddUp', JSON.stringify(data));
    return list;
}
export function ActionById(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/ActionById', JSON.stringify(data));
    return list;
}
export function deleteAction(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/deleteAction', JSON.stringify(data));
    return list;
}

/*********** Offres **************/
export function listOfferClient(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listOfferClient', JSON.stringify(data));
    return list;
}
export function offerAddUp(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/offerAddUp', JSON.stringify(data));
    return list;
}
export function offerById(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/offerById', JSON.stringify(data));
    return list;
}
export function deleteOffers(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/deleteOffers', JSON.stringify(data));
    return list;
}
/*********** Parc **************/
export function listParcClient(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listParcClient', JSON.stringify(data));
    return list;
}
export function parcAddUp(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/parcAddUp', JSON.stringify(data));
    return list;
}
export function parcById(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/parcById', JSON.stringify(data));
    return list;
}
export function deleteParc(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/deleteParc', JSON.stringify(data));
    return list;
}
export function listEmailClient(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/listEmailClient', JSON.stringify(data));
    return list;
}
export function ExcelEmail(data) {
    let list = ittone.AjaxJson(url + '/ModeleTier.aspx/ExcelEmail', JSON.stringify(data));
    return list;
}