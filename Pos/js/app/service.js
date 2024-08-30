export function login(data){
    let list = pos.AjaxJson('Default.aspx/login', JSON.stringify(data));
    return list;
}
export function POS_Session(data){
    let list = pos.AjaxJson('Default.aspx/POS_Session', JSON.stringify(data));
    return list;
}
export function SessionInserUpdate(data){
    let list = pos.AjaxJson('Default.aspx/SessionInserUpdate', JSON.stringify(data));
    return list;
}
export function listModRglm(){
    let list = pos.AjaxJson('Default.aspx/listModRglm', JSON.stringify({idPos:pos.idPos}));
    return list;
}
export function listFavorisArticle(){
    let list = pos.AjaxJson('Default.aspx/listFavorisArticle', JSON.stringify({idGroup:pos.idGroup}));
    return list;
}
export function listFamille(){
    let list = pos.AjaxJson('Default.aspx/listFamille', JSON.stringify({idPos:pos.idPos}));
    return list;
}
export function listArticleByFamille(data){
    let list = pos.AjaxJson('Default.aspx/listArticleByFamille', JSON.stringify(data));
    return list;
}
