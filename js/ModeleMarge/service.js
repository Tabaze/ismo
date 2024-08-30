/*********** ModeleMarge **************/
export function listMargeEntet(data){
    let list = ittone.AjaxJson('ModeleMarge.aspx/listMargeEntet',JSON.stringify(data));
    return list;
}