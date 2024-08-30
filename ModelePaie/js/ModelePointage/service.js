/*********** Device ZKT **************/
export function listDevices(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/listDevices', '');
    return list;
}
export function insertUpdateDevice(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/insertUpdateDevice', JSON.stringify(data));
    return list;
}
export function DeviceById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/DeviceById', JSON.stringify(data));
    return list;
}
export function deleteDevice(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/deleteDevice', JSON.stringify(data));
    return list;
}
export function testConnect(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/testConnect', JSON.stringify(data),);
    return list;
}
export function getUsers(data,beforeSend,complete){
    let list = ittone.AjaxJsonAsync(url+'/ModelePaie/ModelePointage.aspx/getUsers', JSON.stringify(data),beforeSend,complete);
    return list;
}
export function logDataImport(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/logDataImport', JSON.stringify(data));
    return list;
}
/*********** Pointage **************/
export function listPointagePlanning(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/listPointagePlanning', JSON.stringify(data));
    return list;
}
export function listPointageMachine(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/listPointageMachine', JSON.stringify(data));
    return list;
}
export function listPointageMachineAbsents(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/listPointageMachineAbsents', JSON.stringify(data));
    return list;
}
export function insertPointage(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/insertPointage', JSON.stringify(data));
    return list;
}
export function PointageById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/PointageById', JSON.stringify(data));
    return list;
}
export function deletePointage(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/deletePointage', JSON.stringify(data));
    return list;
}
/*********** Planning **************/
export function listPlanning(){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/listPlanning', '');
    return list;
}
export function insertUpdatePlanning(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/insertUpdatePlanning', JSON.stringify(data));
    return list;
}
export function PlanningById(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/PlanningById', JSON.stringify(data));
    return list;
}
export function deletePlanning(data){
    let list = ittone.AjaxJson(url+'/ModelePaie/ModelePointage.aspx/deletePlanning', JSON.stringify(data));
    return list;
}