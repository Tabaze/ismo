/*********** ModeleDashboard **************/
export function dashboardInfos(data) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/dashboardInfos', JSON.stringify(data));
    return list;
}
export function articleDash(data) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/articleDash', JSON.stringify(data));
    return list;
}
export function articleChart(data) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/articleChart', JSON.stringify(data));
    return list;
}
export function ClientByPays(data) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/ClientByPays', JSON.stringify(data));
    return list;
}
export function top5() {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/top5', '');
    return list;
}
export function ClientPot(dt) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/ClientPot', JSON.stringify(dt));
    return list;
}
export function ClientParPot(dt) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/ClientParPot', JSON.stringify(dt));
    return list;
}
export function total_by_pays(dt) {
    let list = ittone.AjaxJson('ModeleDashboard.aspx/total_by_pays', JSON.stringify(dt));
    return list;
}