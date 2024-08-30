$('.login-screen.screen').ready(function () {
    info_pos();
    var $popup_password = $('.popups').find('.popup.popup-password');
    var $numpad = $popup_password.find('.popup-numpad');
    var $floor_screen = $('.floor-screen.screen');
    var $product_screen = $('.product-screen.screen');
    var $floor_selector = $floor_screen.find('.floor-selector');
    var $login_screen = $('.login-screen.screen');
    var numberpassword = "";
    var charpassword = '';
    var $menu = $('.o_menu_toggle');
    var $popup_Session = $('.popups').find('.popup.popup-Session');
    var $numpad_Session = $popup_Session.find('.popup-numpad');
    var numberSession = "";
  
    var $button_Fermer = $('.pos-topheader .header-button.Fermer');
    var $username = $('.username');
    var $popup_messager = $('.popups').find('.popup.popup-messager');
    $popup_messager.on('click', '.button.confirm', function () {
        if ($popup_messager.hasClass('Count_commender_session')) {
            $popup_messager.parent().addClass('oe_hidden');
            $popup_messager.removeClass('Count_commender_session');
        }
    
    });//done
    $username.on('click', this, function () {
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
        location.reload();
    });//done
    $button_Fermer.on('click', this, function () {
        f_Ferme();
    });//done
    $numpad.on('click', '.input-button.number-char', function () {
        numberpassword = numberpassword + $(this).text();
        charpassword = charpassword + '*';
        $popup_password.find('.popup-input.value.active').text(charpassword);

    });//done
    $(document).on("keypress", function (e) {
        if ($popup_password.is(":visible")) {
            if (e.keyCode == 13) {
                login($.P_Pos.Id_pos, numberpassword);
            }
            else {
                numberpassword = numberpassword + e.key;
                charpassword = charpassword + '*';
                $popup_password.find('.popup-input.value.active').text(charpassword);
            }                 
        }
        if ($numpad_Session.is(":visible")) {
            if (e.keyCode == 13) {
                var Sold = parseFloat($popup_Session.find('.popup-input.value.active').text()).toFixed(2);
                if ($popup_Session.find('.title').hasClass('Fermer')) {
                    update_Session($.P_Caissier.Id_Caissier, Sold, $.P_Pos.Id_pos, $.P_Session);
                    //location.reload();
                    $.product_screen.addClass('oe_hidden');
                    $.floor_screen.addClass('oe_hidden');
                    $.login_screen.addClass('oe_hidden');
                    $.payment_screen.addClass('oe_hidden');
                    $.receipt_screen.find('.top-content h1').html('');
                    $.receipt_screen.find('.pos-sale-ticket').addClass('Ferme');
                    $.receipt_screen.removeClass('oe_hidden');
                } else {
                    insert_Session($.P_Caissier.Id_Caissier, Sold, $.P_Pos.Id_pos);
                }

            } else {
                numberSession = numberSession + e.key;
                $popup_Session.find('.popup-input.value.active').text(parseFloat(numberSession).toFixed(2));
            }
        }
    });
    $numpad.on('click', '.input-button.numpad-backspace', function () {
        numberpassword = numberpassword.substring(0, numberpassword.length - 1);
        charpassword = charpassword.substring(0, charpassword.length - 1);
        $popup_password.find('.popup-input.value.active').text(charpassword);
    });//done
    $numpad.on('click', '.input-button.numpad-char', function () {
        numberpassword = '';
        charpassword = '';
        $popup_password.find('.popup-input.value.active').text('');
    });//done
    $numpad_Session.on('click', '.input-button.number-char', function () {
        numberSession = numberSession + $(this).text();
        $popup_Session.find('.popup-input.value.active').text(parseFloat(numberSession).toFixed(2));
    });//done
    $numpad_Session.on('click', '.input-button.numpad-backspace', function () {
        numberSession = numberSession.substring(0, numberSession.length - 1);
        $popup_Session.find('.popup-input.value.active').text(numberSession);
    });//done
    $numpad_Session.on('click', '.input-button.numpad-char', function () {
        numberSession = '';
        $popup_Session.find('.popup-input.value.active').text('');
    });//done
    $popup_Session.on('click', '.button.confirm', function () {
        var Sold = parseFloat($popup_Session.find('.popup-input.value.active').text()).toFixed(2);
        if ($popup_Session.find('.title').hasClass('Fermer')) {
            update_Session($.P_Caissier.Id_Caissier, Sold, $.P_Pos.Id_pos, $.P_Session);
            //location.reload();
            $.product_screen.addClass('oe_hidden');
            $.floor_screen.addClass('oe_hidden');
            $.login_screen.addClass('oe_hidden');
            $.payment_screen.addClass('oe_hidden');
            $.receipt_screen.find('.top-content h1').html('');
            $.receipt_screen.find('.pos-sale-ticket').addClass('Ferme');
            $.receipt_screen.removeClass('oe_hidden');
        } else {
            insert_Session($.P_Caissier.Id_Caissier, Sold, $.P_Pos.Id_pos);
        }

    });//done
    $popup_Session.on('click', '.button.cancel', function () {
        //$popup_Session.parent().addClass('oe_hidden');
        location.reload();
    });//done
    $popup_password.on('click', '.button.confirm', function () {
        login($.P_Pos.Id_pos, numberpassword);
    });//done
    $popup_password.on('click', '.button.cancel', function () {
        //numberpassword = '';
        //$popup_password.parent().addClass('oe_hidden');
        //$('.username').html("Nom d'utilisateur");
        //location.reload();
        window.close();
        console.log('test')
    });//done   
    $menu.on('click', this, function () {
        window.location.href = "/../home-menu.aspx";
    });
    function f_Ferme() {
        if (!$.P_ECMD[0].lineorder.length) {
            localStorage.removeItem('P_ECMD');
            alertify.confirm('Confirmer', 'Ferme Session',
                                       function () {
                                       $popup_Session.find('.title').text('Fermer Session ' + $('.username').text());
                                       $popup_Session.parent().removeClass('oe_hidden');
                                       $popup_Session.find('.title').addClass('Fermer');
                                       }
                                       , function () {
                                           
                                       });
        } else {
            alertify.alert('Attention', 'impossible de clôturer la journée, Ticket en  attente !');
            console.log("Attontion la lest i plan");
        }

    }//not done
    //update
    function info_pos() {
        $.ajax
               ({
                   type: 'POST',
                   url: 'Default.aspx/info_pos',
                   async: false,
                   data: "",
                   contentType: 'application/json; charset =utf-8',
                   success: function (data) {
                       var list = data.d;
                       $.P_Pos = list;
                       P_Modregl($.P_Pos.Id_pos);                      
                       check_Plan($.P_Pos.Type_Plan);
                       List_Favoris_Article();
                       List_offer_Article();
                       List_Famille_Article();                       
                       session_order();
                       sessionStorage.setItem('id_dossier', $.P_Pos.Id_dossier);
                   },
                   error: function (xhr, status, error) {
                       var err = eval("(" + xhr.responseText + ")");
                       alertify.error(err.Message);
                       console.log(err.Message);
                   }
               });
    }//done
    function login(Id_pos, Caisser_Ps) {
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/login',
                    async: false,
                    data: "{'Id_dossier':'" + $.P_Pos.Id_dossier + "','Caisser_Ps':'" + Caisser_Ps + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        var login = data.d;
                        if (login.Item2) {
                            numberpassword = '';
                            var Caissier = login.Item1[0];
                            $('.username').html(Caissier.Name_Caissier);
                            $('.username').attr('id_CAI', Caissier.Id_Caissier);
                            $.P_Caissier = Caissier;
                            $popup_password.parent().addClass('oe_hidden');
                            $.login_screen.addClass('oe_hidden');
                            controlesP_Caissier();
                            POS_Session();
                            try{
                                var el = document.documentElement,
                                 rfs = el.requestFullscreen
                                     || el.webkitRequestFullScreen
                                     || el.mozRequestFullScreen
                                     || el.msRequestFullscreen
                                ;
                                rfs.call(el);
                            }catch(ex){
                                console.log(ex);
                            }
                        }
                        else {
                            
                            alertify.error(login.Item3);
                            //alert("Mot Passe Incorrect");
                        }

                    },

                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });

    }//done
    function POS_Session(Id_pos) {
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/POS_Session',
                    async: false,
                    data: "{'Id_Caissier':'" + $.P_Caissier.Id_Caissier + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        var POS_Session = data.d;
                        console.log(POS_Session);
                        if (POS_Session) {
                           $.P_Session = POS_Session.Id_Session;
                           $popup_Session.parent().addClass('oe_hidden');
                           $button_Fermer.removeClass('oe_hidden');
                           $('#solde-encore').text($.solde_encore().toFixed(2) + ' DH');
                        } else {
                            $popup_Session.find('.title').text('Ouvrir Session ' + $.P_Caissier.Name_Caissier);
                            $popup_Session.parent().removeClass('oe_hidden');
                            $popup_Session.find('.title').addClass('Ouvrir');
                            $button_Fermer.removeClass('oe_hidden');
                        }
                    },

                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });
    }//done
    function PlanRestaurnt(Id_pos) {
        $.floor_screen.find('.floor-selector').html('');
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/PlanRestaurnt',
                    async: false,
                    data: "{'Id_pos':'" + Id_pos + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        //console.log(data.d);
                        var PlanRestaurnt = data.d;
                        if (PlanRestaurnt.length) {
                            for (i in PlanRestaurnt) {
                                $.floor_screen.find('.floor-selector').append("<span class='button button-floor' data-id='" + PlanRestaurnt[i].Id_Plan + "'>" + PlanRestaurnt[i].Plan_Name + "</span>");
                            }
                        }
                        else {
                            alert("PlanRestaurnt vide");
                        }
                    },

                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });
    }//done
    function insert_Session(UserOpened, SoldOpened, Id_pos) {
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/insert_Session',
                    async: false,
                    data: "{'Caissier':'" + UserOpened + "','Solde':'" + SoldOpened + "','Id_pos':'" + Id_pos + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        $.P_Session = data.d;
                        $popup_Session.parent().addClass('oe_hidden');
                    },

                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });
    }//done
    function update_Session(UserClosed, SoldClosed, Id_pos, Id_Session) {
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/update_Session',
                    async: false,
                    data: "{'Caissier':'" + UserClosed + "','Solde':'" + SoldClosed + "','Id_pos':'" + Id_pos + "','Id_Session':'" + Id_Session + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        $popup_Session.parent().addClass('oe_hidden');
                    },

                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.Message);
                    }
                });
    }//done
    function P_Modregl(Id_pos) {
        $('#paymentmethods').html('');
        $.ajax
               ({
                   type: 'POST',
                   url: 'Default.aspx/P_Modregl',
                   async: false,
                   data: "{'Id_pos':'" + Id_pos + "'}",
                   contentType: 'application/json; charset =utf-8',
                   success: function (data) {
                       var list = data.d;
                       $('#paymentmethods').append("<div class='paymentmethods'><div class='button paymentmethod' data-id='Espece-Falst' style='background-color: #5c9e00;color: #fff;'>Espece Rapide</div></div>");
                       for (i in list) {
                           $('#paymentmethods').append("<div class='paymentmethods'><div class='button paymentmethod' data-id='" + list[i] + "'>" + list[i] + "</div></div>");
                       }
                       
                   },
                   error: function (result) {
                       alert("Error Occured, Try Again");
                   }
               });
    }
    function check_Plan(Type_Plan) {
        var $commandnpad = '';
        if (Type_Plan) {
            $commandnpad = $('<button class="input-button annuler-commande" onclick="return false">Annuler</button>'
                          +'<button class="input-button annuler-tout-commande" onclick="return false">Annuler Tout</button>'
                          +'<button class="input-button Note" onclick="return false">Note</button>'
                          +'<button class="input-button prent-Cuisine" onclick="return false">'
                          +'<i aria-label="Cuisine" class="fa fa-bread-slice" role="img" title="Cuisine"></i>Cuisine</button>'
                          +'<br/><button class="input-button number-serveur" onclick="return false">Separer</button>'
                          +'<button class="input-button transferer-commande" onclick="return false" >Transferer</button>'
                          + '<button class="input-button number-char" onclick="return false">Grouper</button>');
            $.order_button_floor.removeClass('oe_hidden');
            list_serveur();
            PlanRestaurnt($.P_Pos.Id_pos);
        } else {
            $commandnpad = $('<button class="input-button annuler-commande" onclick="return false" style="width: 134px;">Annuler</button>'
                         + '<button class="input-button annuler-tout-commande" onclick="return false" style="width: 134px;">Annuler Tout</button>'
                         + '<button class="input-button Depenses" onclick="return false" style="width: 134px">Dépenses</button>'
                         + '<button class="input-button Avoir" onclick="return false" style="width: 50%">Select Avoir</button>'
                         + '<button class="input-button Suivant" onclick="return false" style="width: 50%">Suivant <i class="fa fa-angle-double-right"></i></button>'
                            );
            $.product_screen.removeClass('oe_hidden');
            $.order_button_floor.remove();
        }
        $('#commandnpad').html($commandnpad);
    }
    function List_Favoris_Article() {
        // var Id_pos = $.P_Pos.Id_pos;
        var Id_dossier = $.P_Pos.Id_dossier;
        console.log(Id_dossier)
        $.product_list.html('');
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/List_Favoris_Article',
                    async: false,
                    data: "{'Id_pos':'" + $.P_Pos.Id_pos + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        var list = data.d;
                        $.Favoris_Article = list;
                        for (i in list) {
                            var photo = '../image/data/article/Default.png';
                            if (list[i].Photo != null ) {
                                photo = '../' + list[i].Photo
                            }
                            if (list[i].Photo == '') {
                                var photo = '../image/data/article/Default.png';
                            }
                            if (list[i].Type_Remise) {
                                $.product_list.append('<article class="product" data-product-id="'
                                + list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="'
                                + photo + '" /><span class="price-tag">'
                                + list[i].Prix_vente + '</span><span class="rem-tag" data-qte="' + list[i].Qt_Remise + '">'
                                + list[i].Remise + '</span></div><div class="product-name">'
                                + list[i].Nom_article + '</div></article>');
                            } else {
                                $.product_list.append('<article class="product" data-product-id="'
                                + list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="'
                                + photo + '" /><span class="price-tag">'
                                + list[i].Prix_vente + '</span></div><div class="product-name">'
                                + list[i].Nom_article + '</div></article>');
                            }
                            
                        }
                    },
                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });

    }//not done
    function List_offer_Article() {      
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/List_offer_Article',
                    async: false,
                    data: "{'Id_pos':'" + $.P_Pos.Id_pos + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        var list = data.d;
                        $.offer_Article = list;

                    },
                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });

    }//not done
    function List_Famille_Article() {
        var Id_pos = $.P_Pos.Id_pos;
        $.famile_list.html('');
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/List_Famille_Article',
                    async: false,
                    data: "{'Id_pos':'" + Id_pos + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        var list = data.d;
                        for (i in list) {
                            $.famile_list.append('<article class="famile" Id_famille='
                                + list[i].Id_famille + '><div class="famile-name">'
                                + list[i].Nom_famille + '</div></article>');
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    }
                });
    }//not done
    function list_serveur() {
        var Id_pos = $.P_Pos.Id_pos;
        $('#list_serveur').html('');
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/list_Serveur',
                    async: false,
                    data: "{'Id_pos':'" + Id_pos + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        var list = data.d;
                        for (i in list) {
                            $('#list_serveur').append("<serveur class='serveur' data-id='" + list[i].Id_Serv + "'><div class='serveur-img'><img src='img/device.png'></div><div class='serveur-name'>" + list[i].Nom_Serv + "</div></serveur>");
                        }
                    },

                    error: function (result) {
                        
                        alert("Error Occured, Try Again");
                    }
                });
    }
    function session_order() {
        //localStorage.removeItem('P_ECMD');
        if (localStorage.getItem('P_ECMD') != null ) {
            //console.log('P_ECMD');
            $.P_ECMD = JSON.parse(localStorage.getItem('P_ECMD'));
            if ($.P_ECMD.length) {
                $.Id_Ecmd = $.P_ECMD[0].Id_Ecmd;
            }
            else {
                var newECMD;
                $.Id_Ecmd = 1;
                newECMD = {
                    'Id_Ecmd': $.Id_Ecmd,
                    'Id_client': $.P_Pos.ClientDivers,
                    'Nom_Client': 'ClientDivers',
                    'Id_Caissier': $.P_Pos.Id_cai,
                    'TOTAL': 0,
                    'lineorder': [],
                    'Id_Serv': 0,
                    'Id_Table': 0
                };
                $.P_ECMD = [];
                $.P_ECMD.push(newECMD);
            }
        } else {
            var newECMD;
            $.Id_Ecmd = 1;
            newECMD = {
                'Id_Ecmd': $.Id_Ecmd,
                'Id_client': $.P_Pos.ClientDivers,
                'Nom_Client': 'ClientDivers',
                'Id_Caissier': $.P_Pos.Id_cai,
                'TOTAL': 0,
                'lineorder': [],
                'Id_Serv': 0,
                'Id_Table': 0
            };
            $.P_ECMD = [];
            $.P_ECMD.push(newECMD);
        }
        
    }
    function controlesP_Caissier() {
        if (!$.P_Caissier.prix_rem) {
            $('#prix').addClass('disabled');
            $('#rem').addClass('disabled');
        }

    }
});