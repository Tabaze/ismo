/*********** Département **************/
export function listDepartement(){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/listDepartement', '');
    return list;
}
export function insertUpdateDepartement(data){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/insertUpdateDepartement', JSON.stringify(data));
    return list;
}
export function DepartementById(data){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/DepartementById', JSON.stringify(data));
    return list;
}
export function deleteDepartement(data){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/deleteDepartement', JSON.stringify(data));
    return list;
}
/*********** Employée **************/
export function listEmployee(){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/listEmployee', '');
    return list;
}
export function insertUpdateEmployee(data){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/insertUpdateEmployee', JSON.stringify(data));
    return list;
}
export function EmployeeById(data){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/EmployeeById', JSON.stringify(data));
    return list;
}
export function deleteEmployee(data){
    let list = ittone.AjaxJson('ModeleEmploye.aspx/deleteEmployee', JSON.stringify(data));
    return list;
}