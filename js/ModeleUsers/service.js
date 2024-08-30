/*********** Users **************/
export function listUsers(){
    let list = ittone.AjaxJson('ModeleUsers.aspx/listUsers', '');
    return list;
}
export function insertUpdateUsers(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/insertUpdateUsers', JSON.stringify(data));
    return list;
}
export function usersById(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/usersById', JSON.stringify(data));
    return list;
}
export function deleteUsers(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/deleteUsers', JSON.stringify(data));
    return list;
}
export function insertUpdateLiaisonUsers(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/insertUpdateLiaisonUsers', JSON.stringify(data));
    return list;
}
export function liaisonUsersById(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/liaisonUsersById', JSON.stringify(data));
    return list;
}
/*********** Roles **************/
export function listRoles(){
    let list = ittone.AjaxJson('ModeleUsers.aspx/listRoles', '');
    return list;
}
export function insertUpdateRoles(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/insertUpdateRoles', JSON.stringify(data));
    return list;
}
export function rolesById(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/rolesById', JSON.stringify(data));
    return list;
}
export function deleteRoles(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/deleteRoles', JSON.stringify(data));
    return list;
}
export function UpdateAppSettings(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/UpdateAppSettings', JSON.stringify(data));
    return list;
}
export function AppSettingsById(){
    let list = ittone.AjaxJson('ModeleUsers.aspx/AppSettingsById', '');
    return list;
}
export function UserRolesUpdate(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/UserRolesUpdate', JSON.stringify(data));
    return list;
}
export function MenuByID(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/MenuByID', JSON.stringify(data));
    return list;
}
export function InstalUninstallerMenu(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/InstalUninstallerMenu', JSON.stringify(data));
    return list;
}
export function SubMenuByID(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/SubMenuByID', JSON.stringify(data));
    return list;
}
export function InstalUninstallerSubMenu(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/InstalUninstallerSubMenu', JSON.stringify(data));
    return list;
}
/*********** Emails Settings **************/
export function insertUpdateEmailsSettings(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/insertUpdateEmailsSettings', JSON.stringify(data));
    return list;
}
export function EmailsSettingsByID(){
    let list = ittone.AjaxJson('ModeleUsers.aspx/EmailsSettingsByID', '');
    return list;
}
export function listEmailsSettings(){
    let list = ittone.AjaxJson('ModeleUsers.aspx/listEmailsSettings', '');
    return list;
}
/***********************EMAIL PARAM************************/
export function emailParamList(){
    let list = ittone.AjaxJson('ModeleUsers.aspx/emailParamList', '');
    return list;
}
export function emailParamById(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/emailParamById', JSON.stringify(data));
    return list;
}
export function insertUpdateEmailParam(data){
    let list = ittone.AjaxJson('ModeleUsers.aspx/insertUpdateEmailParam', JSON.stringify(data));
    return list;
}