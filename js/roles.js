class Roles {
    IdRole;
    InsertRole;
    NameRole;
    DeleteRole;
    SelectALL;
    SelectByUser;
    SelectDoc;
    UpdateRole;
    ImprimerRole;
    Valider;
    constructor(data) {
      Object.assign(this, data);
    }
}
//const url = new URL(window.location.href).origin;
var roles=new Roles(ittone.AjaxJson(url+'/Default.aspx/roles', ''));
var role = (function() {   
    return {
        init: function() {
            randerRoles();
             
        },
        delete:function(){
            if(!roles.DeleteRole){
                ittone.warning('access');
            }
            return roles.DeleteRole;
        },
        insert:function(){
            if(!roles.InsertRole){
                ittone.warning('access');
            }
            return roles.InsertRole;
        },
        update:function(){
            if(!roles.UpdateRole){
                ittone.warning('access');
            }
            return roles.UpdateRole;
        },
        imprimer:function(){
            if(!roles.ImprimerRole){
                ittone.warning('access');
            }
            return roles.ImprimerRole;
        },
        valider: function () {
            if (!roles.Valider) {
                ittone.warning('access');
            }
            return roles.Valider;
        },
        checkRole:function(){

        }
    }
})();
$(function() {
    role.init();
});
const randerRoles =function(){
    if(!roles.DeleteRole){
       $('[role="delete"]').remove();
    }else{
        $('[role="delete"]').attr('role','');
    }
    if(!roles.InsertRole){
        $('[role="insert"]').remove();
    }else{
        $('[role="insert"]').attr('role','');
    }
    if(!roles.UpdateRole){

    }
    if(!roles.ImprimerRole){
        $('[role="imprimer"]').remove();
    }else{
        $('[role="imprimer"]').attr('role','');
    }
    if (!roles.Valider) {
        $('[role="valider"]').remove();
    } else {
        $('[role="valider"]').attr('role', '');
    }
}