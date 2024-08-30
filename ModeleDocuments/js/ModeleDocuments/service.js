export function getFolders(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/getFolders', JSON.stringify(data));
    return list;
}
export function getFiles(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/getFiles', JSON.stringify(data));
    return list;
}
export function createFolder(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/createFolder', JSON.stringify(data));
    return list;
}
export function updateFolder(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/updateFolder', JSON.stringify(data));
    return list;
}
export function deleteFolder(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/deleteFolder', JSON.stringify(data));
    return list;
}
export function deleteFile(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/deleteFile', JSON.stringify(data));
    return list;
}
export function DownloadFile(data){
    let list = ittone.AjaxJson(url +'/ModeleDocuments/ModeleDocuments.aspx/Download', JSON.stringify(data));
    return list;
}