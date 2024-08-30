$(document).ready(function () {
    var $popup_depenses_recettes = $('.popups').find('.popup.popup-depenses-recettes');
    var $numpad_depenses_recettes = $popup_depenses_recettes.find('.popup-numpad');
    var point = false;
    list_f_service_cai();
    var observer = new MutationObserver(function (mutations) {

        if ($popup_depenses_recettes.is(":visible")) {
            
        } else {
           
        }

    });
    var target = document.querySelector('.popup.popup-depenses-recettes');
    observer.observe(target, {
        attributes: true
    });
    $numpad_depenses_recettes.on('click', '.input-button.number-char', function () {
      
        if (point) {
            var prix = $popup_depenses_recettes.find("#txt-m").val()+ '.' + $(this).text();
            $popup_depenses_recettes.find("#txt-m").val(parseFloat(prix));
            point = false;
        } else {
            var prix = $popup_depenses_recettes.find("#txt-m").val() + $(this).text();
            $popup_depenses_recettes.find("#txt-m").val(parseFloat(prix));
        }
        if ($(this).text() == '.') {
            point = true;
        }
        
    });//done
    $numpad_depenses_recettes.on('click', '.input-button.numpad-backspace', function () {
        var prix = $popup_depenses_recettes.find("#txt-m").val();
        prix = prix.substring(0, prix.length - 1);
        $popup_depenses_recettes.find("#txt-m").val(parseFloat(prix));
    });//done
    $numpad_depenses_recettes.on('click', '.input-button.numpad-char', function () {
        $popup_depenses_recettes.find("#txt-m").val('');
    });//done
    $popup_depenses_recettes.on('click', '.button.confirm', function () {
        var Code_typ = $popup_depenses_recettes.find("input[name='selector']:checked").val();
        var Montant = $popup_depenses_recettes.find('#txt-m').val();
        var Id_service_cai = $popup_depenses_recettes.find('#select-input').val();
        var Descriptions = $popup_depenses_recettes.find('#txt-Descri').val();
        if (Code_typ == undefined) {
            console.log(Code_typ);
            false;
        }
        if (Montant) {
            false;
        }
        insert_p_service(Code_typ, Montant, Id_service_cai, Descriptions);
    });
    $popup_depenses_recettes.on('click', '.button.cancel', function () {
        $popup_depenses_recettes.parent().addClass('oe_hidden');
    });//done
    function list_f_service_cai() {
        console.log("aaa");
        $('#select-input').html('');
        var list = $.AjaxJson('Default.aspx/list_f_service_cai', "{'Id_dossier':'" + $.P_Pos.Id_dossier + "'}");
        for (i in list) {
            $('#select-input').append('<option value="' + list[i].Id_service_cai + '">' + list[i].Nom_service_cai + '</option>');
        }
    }
    function insert_p_service(Code_typ, Montant, Id_service_cai, Descriptions) {
        var list = $.AjaxJson('Default.aspx/insert_p_service', "{'Id_dossier':'" + $.P_Pos.Id_dossier + "','Id_Session':'" + $.P_Session + "','Id_cai':'" + $.P_Pos.Id_cai + "','Code_typ':'" + Code_typ + "','Montant':'" + Montant + "','Id_service_cai':'" + Id_service_cai + "','Descriptions':'" + Descriptions+"'}");
        if (list) {
            $popup_depenses_recettes.find('#txt-m').val('');
            $popup_depenses_recettes.find('#txt-Descri').val('');
            alertify.success('Succès');
        } 
    }
});