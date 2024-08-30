$('.clientlist-screen.screen').ready(function() {
    var $product_screen = $('.product-screen.screen');
    var $payment_screen = $('.payment-screen.screen');
    var $receipt_screen = $('.receipt-screen.screen');
    var $clientlist_screen = $('.clientlist-screen.screen');

    var $client_details = $clientlist_screen.find(".client-details.edit");
    var $clinetlist = $clientlist_screen.find(".client-list-contents");

    var $btnRetour = $clientlist_screen.find('.top-content .button.back');
    var $btnNext = $clientlist_screen.find('.top-content .button.next');
    var $btnajouterclient = $clientlist_screen.find(".button.new-customer");
    var $btnannulerclient = $clientlist_screen.find(".button.undo");
    var $btnSauvegarderclient = $clientlist_screen.find(".button.save");
    var checkScreen;
    var $btnclient = $.product_screen.find('.button.set-customer');
    var $btnclient_P = $.payment_screen.find('.button.js_set_customer');
    var $popup_Ajouter_Client = $('.popups').find('.popup.popup_Ajouter_Client');
    $btnNext.on('click', this, function() {
        if ($clinetlist.find(".client-line.lowlight").length) {
            var Nom_Client = $clinetlist.find(".client-line.lowlight .name").text();
            var Id_client = $clinetlist.find(".client-line.lowlight").attr('data-id');
            $('.client-info').text(Nom_Client);
            update_client_byidEcmd(Id_client, Nom_Client);
            if (checkScreen == 'product') {
                $.product_screen.removeClass('oe_hidden');
            } else {
                $.payment_screen.removeClass('oe_hidden');
            }
            $clientlist_screen.addClass('oe_hidden');
        }
    });
    $btnRetour.on('click', this, function() {
        if (checkScreen == 'product') {
            $.product_screen.removeClass('oe_hidden');
        } else {
            $.payment_screen.removeClass('oe_hidden');
        }
        $clientlist_screen.addClass('oe_hidden');
    });
    $clientlist_screen.find(".searchbox input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $clinetlist.find('tr').filter(function() {
            console.log($(this).text());
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $keyboard_frame.on('click', '.return.lastitem', function() {
        if ($clientlist_screen.is(":visible")) {
            var value = $(".searchbox input").val().toLowerCase();
            $clinetlist.find('tr').filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
            $keyboard_frame.css({ 'display': 'none', 'height': '0' });
        }
        $keyboard_frame.clearQueue();
        $('.searchbox input').val('');

    });
    $btnajouterclient.on('click', this, function() {
        $client_details.removeClass("oe_hidden");
    });
    $btnannulerclient.on('click', this, function() {
        $client_details.addClass("oe_hidden");
    });
    $btnSauvegarderclient.on('click', this, function() {
        var nom = $client_details.find(".detail.client-name").val();
        var adresse = $client_details.find(".detail.client-address-Rue").val();
        var tele = $client_details.find(".detail.client-Téléphone").val();
        $clinetlist.append('<tr class="client-line"><td>' + nom + '</td><td>' + adresse + '</td><td>' + tele + '</td></tr>');
    });
    $clinetlist.on('click', 'tr.client-line', function() {
        selectclient($(this));
        $btnNext.addClass('highlight');
    });
    $btnclient.on('click', this, function(e) {
        $product_screen.addClass('oe_hidden');
        $clientlist_screen.removeClass('oe_hidden');
        list_client();
        checkScreen = 'product';
    });
    $btnclient_P.on('click', this, function() {
        $.payment_screen.addClass('oe_hidden');
        $clientlist_screen.removeClass('oe_hidden');
        list_client();
        checkScreen = 'payment';
    });
    $('#ajouterClient').on('click',this,function(){
        $popup_Ajouter_Client.parent().removeClass('oe_hidden');
        $('#codeClient').val('');
        $('#nomClient').val('');
        $('#teleClient').val('');        
    });
    $popup_Ajouter_Client.on('click','.button.confirm',function(){
       let codeClient= $('#codeClient').val();
       let nomClient = $('#nomClient').val();
       let teleClient= $('#teleClient').val();    
       let dataInsert={
        codeClient:codeClient,
        nomClient:nomClient,
        teleClient:teleClient,
        Id_dossier:$.P_Pos.Id_dossier,
        Id_usr_login:$.P_Caissier.Id_usr_login
       }
       var list = $.AjaxJson('Default.aspx/Ajouter_Client', JSON.stringify(dataInsert));
       if(list){
        list_client();
        $popup_Ajouter_Client.parent().addClass('oe_hidden');
       }
    });
    $popup_Ajouter_Client.on('click','.button.cancel',function(){
        $popup_Ajouter_Client.parent().addClass('oe_hidden');
    });
    function selectclient($el) {
        $clinetlist.find(".client-line").removeClass('lowlight');
        $el.addClass('lowlight');
    }

    function list_client() {
        $clinetlist.html('');
        var list = $.AjaxJson('Default.aspx/list_client', "{'Id_pos':'" + $.P_Pos.Id_pos + "'}");
        for (i in list) {
            $clinetlist.append('<tr class="client-line" data-id="' + list[i].Id_client +
                '"><td>' + list[i].Code_client +
                '</td><td class="name">' + list[i].Nom_client +
                '</td><td>' + list[i].Adresse_client +
                '</td><td>' + list[i].Tele +
                '</td></tr>');
        }
    }

    function update_client_byidEcmd(Id_client, Nom_Client) {
        console.log("update_client_byidEcmd")
        for (var i = 0; i < $.P_ECMD.length; i++) {
            if ($.P_ECMD[i].Id_Ecmd === $.Id_Ecmd) {
                $.P_ECMD[i].Id_client = Id_client;
                $.P_ECMD[i].Nom_Client = Nom_Client;
                $.P_ECMD[i].lineorder = $.lineorder;
                break;
            }
        }
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
    }
});