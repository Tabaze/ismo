$(document).ready(function() {
    
    $.modalDossier = $.modal.find('.dossier');
    $.tapDossier = $.modalDossier.find('#dossierTab');
    $.btnSauvegarderDossier = $.modalDossier.find('.btn-sauvegarder');
    $.btnNewDossier = $.modalDossier.find('.btn-new');
    $.btnAnnulerDossier = $.modalDossier.find('.btn-annuler');
    
    $.modalGestionUser = $.modal.find('.gestionUser');
    $.tapGestionUser = $.modalGestionUser.find('#gestionUserTab');
    $.btnSauvegarderGestionUser = $.modalGestionUser.find('.btn-sauvegarder');
    $.btnNewGestionUser = $.modalGestionUser.find('.btn-new');
    $.btnAnnulerGestionUser = $.modalGestionUser.find('.btn-annuler');

    $.listDossier = $('#listDossier');
    
    $.btnAnnulerDossier.on('click',this,function(){
        ittone.hide($.modalDossier.parent());
    });
    $.listDossier.on('click','.folder.add-folder',function(){
        ittone.show($.modalDossier.parent());
        settingForma(false);
    });
    $(document).on('click',this,function(e){
        if($(e.target).hasClass('fa-ellipsis-vertical')){
            if($.listDossier.find('.dropdown-menu').length>1){
                $.listDossier.find('.dropdown-menu').remove();
            }
        }else{
            if($.listDossier.find('.dropdown-menu').length){
                $.listDossier.find('.dropdown-menu').remove();
            }
        }
        
    });
    $.listDossier.on('click','.folder .update',function(){
        let $temp=$(templateDropdownDossier()).css({
            'position':'absolute',
            'top':'0',
            'margin':'-15px',
            'transform':'translate(-3px, 54px)'
        });
        $(this).closest('.folder').append($temp);
    });
    $.btnNewDossier.on('click',this,function(){
        settingForma(false);
    });
    $('#btnGestionUser').on('click',this,function(){
        ittone.show($.modalGestionUser.parent());
    });
});
const templateDropdownDossier =function(){
    return `<ul class="dropdown-menu show">
            <li><a class="dropdown-item" data-name='updateDossier'>`+i18n.translate('updateDossier')+`</a></li>
    </ul>`
}
const settingForma=function(update){
    if(update){
        $.tapDossier.data('update',true);
        $.tapDossier.find('.nav-link').prop('disabled', false);
        ittone.show($.btnNewDossier);
    }else{
        $('#myTabContent').find('.tab-pane').removeClass('active show');
        $('#myTabContent').find('.tab-pane[id="Generale-tab-pane"]').addClass('active show');
        $.tapDossier.find('.nav-link').removeClass('active')
        $.tapDossier.find('.nav-link[id="Generale-tab"]').addClass('active');
        $.tapDossier.find('.nav-link:not(.active)').prop('disabled', true);
        $.tapDossier.data('update',false);
        ittone.hide($.btnNewDossier);
        $('#formGenerale')[0].reset();
        $('#formMisePage')[0].reset();
        $('#formWoocommerce')[0].reset();
    }
}