$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalSent = $.modal.find('.Sent');
    $.btnSauvegarderSent = $.modalSent.find('.btn-sauvegarder');
    $.btnNewSent = $.modalSent.find('.btn-new');
    $.btnAnnulerSent = $.modalSent.find('.btn-annuler');

    $.btnCreate.on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'Sent': ittone.show($.modalSent.parent());break;
        }
    });
    $.btnAnnulerSent.on('click',this,function(){
        ittone.hide($.modalSent.parent());
    });
    $.btnNewSent.on('click',this,function(){
        settingForma(false);
    });
});
const settingForma=function(update){
    if(update){
        switch(ittone.getSubMenu()){
            case 'Sent': 
            $.modalSent.data('update',true);
            ittone.show($.btnNewSent);
            break;
        }   
    }else{ 
        switch(ittone.getSubMenu()){
            case 'Sent': 
            $.modalSent.data('update',false);
            ittone.hide($.btnNewSent);
            $('#formSent')[0].reset();
            break;
        }
        $('select').trigger('change');
    }
}