export function clientCredit(data){
    let list = ittone.AjaxJson('ModeleReglementClient.aspx/clientCredit', JSON.stringify(data));
    return list;
}