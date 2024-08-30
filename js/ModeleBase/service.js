/*********** Depot **************/
export function listDepot(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listDepot', '');
    return list;
}
export function insertUpdateDepot(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateDepot', JSON.stringify(data));
    return list;
}
export function depotById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/depotById', JSON.stringify(data));
    return list;
}
export function deleteDepot(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteDepot', JSON.stringify(data));
    return list;
}
/*********** DepotSup **************/
export function listDepotSup(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listDepotSup', '');
    return list;
}
export function insertUpdateDepotSup(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateDepotSup', JSON.stringify(data));
    return list;
}
export function depotSupById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/depotSupById', JSON.stringify(data));
    return list;
}
export function deleteDepotSup(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteDepotSup', JSON.stringify(data));
    return list;
}
export function SubDepotbyIdDepot(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/SubDepotbyIdDepot', JSON.stringify(data));
    return list;
}
/*********** Tresorerie **************/
export function listTresor(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listTresor', '');
    return list;
}
export function insertUpdateTresor(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateTresor', JSON.stringify(data));
    return list;
}
export function tresorById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/tresorById', JSON.stringify(data));
    return list;
}
export function deleteTresor(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteTresor', JSON.stringify(data));
    return list;
}
/*********** Ville **************/
export function listVille(dt){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listVille', JSON.stringify(dt));
    return list;
}
export function insertUpdateVille(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateVille', JSON.stringify(data));
    return list;
}
export function villeById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/villeById', JSON.stringify(data));
    return list;
}
export function deleteVille(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteVille', JSON.stringify(data));
    return list;
}
/*********** Pays **************/
export function listPays(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listPays', '');
    return list;
}
export function insertUpdatePays(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdatePays', JSON.stringify(data));
    return list;
}
export function paysById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/paysById', JSON.stringify(data));
    return list;
}
export function deletePays(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deletePays', JSON.stringify(data));
    return list;
}
/*********** ModRglm **************/
export function listModRglm(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listModRglm', '');
    return list;
}
export function insertUpdateModRglm(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateModRglm', JSON.stringify(data));
    return list;
}
export function modRglmById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/modRglmById', JSON.stringify(data));
    return list;
}
export function deleteModRglm(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteModRglm', JSON.stringify(data));
    return list;
}

/*********** Taxe **************/
export function listTaxe(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listTaxe', '');
    return list;
}
export function insertUpdateTaxe(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateTaxe', JSON.stringify(data));
    return list;
}
export function taxeById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/taxeById', JSON.stringify(data));
    return list;
}
export function deleteTaxe(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteTaxe', JSON.stringify(data));
    return list;
}
/*********** Service **************/
export function listService(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listService', '');
    return list;
}
export function insertUpdateService(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdateService', JSON.stringify(data));
    return list;
}
export function serviceById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/serviceById', JSON.stringify(data));
    return list;
}
export function deleteService(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteService', JSON.stringify(data));
    return list;
}
/*********** Unité de Mesure **************/
export function listUniteMesure(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listUniteMesure', '');
    return list;
}
export function InsertUpdateUniteMesure(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateUniteMesure', JSON.stringify(data));
    return list;
}
export function uniteById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/uniteById', JSON.stringify(data));
    return list;
}
export function deleteUnite(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteUnite', JSON.stringify(data));
    return list;
}
/*********** Propriété **************/
export function listPropriete(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listPropriete', '');
    return list;
}
export function insertUpdatePropriete(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/insertUpdatePropriete', JSON.stringify(data));
    return list;
}
export function ProprieteById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/ProprieteById', JSON.stringify(data));
    return list;
}
export function deletePropriete(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deletePropriete', JSON.stringify(data));
    return list;
}
/*********** OriContact **************/
export function listOriContact(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listOriContact', '');
    return list;
}
export function InsertUpdateOriContact(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateOriContact', JSON.stringify(data));
    return list;
}
export function OriContactById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/OriContactById', JSON.stringify(data));
    return list;
}
export function deleteOriContact(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteOriContact', JSON.stringify(data));
    return list;
}
/*********** Industrie **************/
export function listIndustrie(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listIndustrie', '');
    return list;
}
export function InsertUpdateIndustrie(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateIndustrie', JSON.stringify(data));
    return list;
}
export function IndustrieById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/IndustrieById', JSON.stringify(data));
    return list;
}
export function deleteIndustrie(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteIndustrie', JSON.stringify(data));
    return list;
}
/*********** Categorie **************/
export function listCategorie(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listCategorie', '');
    return list;
}
export function InsertUpdateCategorie(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateCategorie', JSON.stringify(data));
    return list;
}
export function CategorieById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/CategorieById', JSON.stringify(data));
    return list;
}
export function deleteCategorie(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteCategorie', JSON.stringify(data));
    return list;
}
/*********** Type **************/
export function listType(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listType', '');
    return list;
}
export function InsertUpdateType(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateType', JSON.stringify(data));
    return list;
}
export function TypeById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/TypeById', JSON.stringify(data));
    return list;
}
export function deleteType(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteType', JSON.stringify(data));
    return list;
}
/*********** PotClient **************/
export function listPotClient(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listPotClient', '');
    return list;
}
export function InsertUpdatePotClient(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdatePotClient', JSON.stringify(data));
    return list;
}
export function PotClientById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/PotClientById', JSON.stringify(data));
    return list;
}
export function deletePotClient(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deletePotClient', JSON.stringify(data));
    return list;
}
/*********** Relation Client **************/
export function listRelation(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listRelation', '');
    return list;
}
export function InsertUpdateRelation(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateRelation', JSON.stringify(data));
    return list;
}
export function RelationById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/RelationById', JSON.stringify(data));
    return list;
}
export function deleteRelation(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteRelation', JSON.stringify(data));
    return list;
}
/*********** b_CategorieActionAddUp **************/
export function listCateAction(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listCateAction', '');
    return list;
}
export function InsertUpdateCateAction(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateCateAction', JSON.stringify(data));
    return list;
}
export function cateActionById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/cateActionById', JSON.stringify(data));
    return list;
}
export function deleteCateAction(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteCateAction', JSON.stringify(data));
    return list;
}
/*********** Rebrique **************/
export function listWoo(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listWoo', '');
    return list;
}
export function InsertUpdateRebrique(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateRebrique', JSON.stringify(data));
    return list;
}
export function rebriqueById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/rebriqueById', JSON.stringify(data));
    return list;
}
export function deleteRebrique(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteRebrique', JSON.stringify(data));
    return list;
}
/*********** CategorieWoo **************/
export function listRebrique(){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/listRebrique', '');
    return list;
}
export function InsertUpdateWoo(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/InsertUpdateWoo', JSON.stringify(data));
    return list;
}
export function wooById(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/wooById', JSON.stringify(data));
    return list;
}
export function deleteWoo(data){
    let list = ittone.AjaxJson(url+'/ModeleBase.aspx/deleteWoo', JSON.stringify(data));
    return list;
}
export function deleteActionType(data){
    let list = ittone.AjaxJson(url + '/Calendar/Default.aspx/deletecalendar', JSON.stringify(data));
    return list;
}