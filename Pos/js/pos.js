$('.product-screen.screen').ready(function() {
    var totalprice = 0;
    var numpadqte = 0;
    var numpadprix = 0;
    var numpadrem = 0;
    var CommandeOrdre = 0;
    var callback = new fcallback();
    var numberpassword = "";
    var charpassword = '';
    var $payment_screen = $('.payment-screen.screen');
    var $clientlist_screen = $('.clientlist-screen.screen');
    var $receipt_screen = $('.receipt-screen.screen');
    var type = 'Qté';
    var $order = $('.order');
    var $orderline = $('.orderline');
    var $numpad = $.product_screen.find('.numpad');
    var $btnpayment = $.product_screen.find('.button.pay');
    var $popup_note = $('.popups').find('.popup.popup-note');
    var $popup_depenses_recettes = $('.popups').find('.popup.popup-depenses-recettes');
    var $btnnote = $.product_screen.find('.input-button.Note');
    var $popup_confirm = $('.popups').find('.popup.popup-confirm');
    var $variant = $popup_note.find('.variant');
    var $btnprent_Cuisine = $.product_screen.find('.input-button.prent-Cuisine');
    var $order_selector = $('.order-selector');
    var $password_confirmer = $('.popups').find('.popup.popup-password-confirmer');
    var $numpad_confirmer = $password_confirmer.find('.popup-numpad');
    var $btnannulercommander = $.product_screen.find('.input-button.annuler-commande');
    var $btntransferer_commande = $.product_screen.find('.input-button.transferer-commande');
    var $btnannuler_tout_commander = $.product_screen.find('.input-button.annuler-tout-commande');
    var $btnfavorite = $.product_screen.find('.btnfavorite .favoritebtn');
    var $btnoffer = $.product_screen.find('.btnfavorite .offerbtn');
    var $popup_messager = $('.popups').find('.popup.popup-messager');
    var $btnclient = $.product_screen.find('.button.set-customer');
    var $button_Fermer = $('.pos-topheader .header-button.Fermer');
    var $order_button = $('.orders.touch-scrollable');
    var $neworder_button = $('.order-selector .order-button.square.neworder-button');
    var $deleteorder_button = $('.order-selector .order-button.square.deleteorder-button');
    var $btnAvoir = $.product_screen.find('.input-button.Avoir');
    var gIDV_ECMD_old;
    var key = new keyboard();
    var point = false;
    var $actionpad = $.product_screen.find('.actionpad');

    $.product_screen.find('.actionpad').on('click', '.button.avoir', function() {
        if ($.lineorder.length) {
            if ($.P_Pos.Type_Plan) {
                //var Id_Table = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
                var Id_Serv = $.P_Serveur;
            } else {
                var Id_Table = 0;
                var Id_Serv = 0;
            }
            var Id_Session = $.P_Session;
            var Id_client = $('.client-info').attr('data-cpt-fac');
            var Nom_Client = $('.client-info').text();
            var Id_Caissier = $('.username').attr('id_cai');
            var TOTAL = totalPayment();
            Save_P_ECMD();
            $.product_screen.addClass('oe_hidden');
            $payment_screen.removeClass('oe_hidden');
            $payment_screen.find('.paymentlines-empty .total').text(totalPayment().toFixed(2) + ' DH');
        }
    });
    var $btn_back = $('.pos-branding .Return-button');
    $btn_back.on('click', this, function() {
        if ($.archive_screen.is(":visible")) {
            $.archive_screen.addClass('oe_hidden');
            $.product_screen.removeClass('oe_hidden');
        }
        if ($('#myFrame').is(":visible")) {
            $.product_screen.removeClass('oe_hidden');
            $('#myFrame').addClass('oe_hidden');
            $('#myFrame').attr('src', '');
        }
    });
    var observer = new MutationObserver(function(mutations) {

        if ($.product_screen.is(":visible")) {
            $button_Fermer.removeClass('oe_hidden');
            $order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
            $('#count-lient').text(0);
            load_order();
            //$.touch_scrollable.removeClass('oe_hidden');
            $.order_button.removeClass('oe_hidden');
            $('.client-info').removeClass('oe_hidden');
            $btn_back.addClass('oe_hidden');
            var url = 'namear=a&prix=0DH&total=0DH&state=c';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
            if ($.P_Session) {
                $('#solde-encore').text($.solde_encore().toFixed(2) + ' DH');
            } else {
                $('#solde-encore').text('0.00 DH');
            }

        } else {
            $button_Fermer.addClass('oe_hidden');
            //$.touch_scrollable.addClass('oe_hidden');
            $.order_button.addClass('oe_hidden');
        }

    });
    var target = document.querySelector('.product-screen.screen');
    observer.observe(target, {
        attributes: true
    });
    $deleteorder_button.on('click', this, function() {
        if ($order_button.find('.order-button').length != 1) {
            var Id_Ecmd = parseInt($order_button.find('.order-button.selected').attr('data-Id_Ecmd'));
            if ($order_button.find('.order-button').length - 1 == $order_button.find('.order-button.selected').index()) {
                var $perv = $order_button.find('.order-button.selected').prev();
                $order_button.find('.order-button.selected').remove();
                $perv.addClass('selected');
                $perv.append('Active');
            } else {
                var $next = $order_button.find('.order-button.selected').next();
                $order_button.find('.order-button.selected').remove();
                $next.addClass('selected');
                $next.append('Active');
            }
            var indexremove = $.getindexP_ECMD_byId_Ecmd(Id_Ecmd);
            $.P_ECMD.splice(indexremove, 1);
            $.Id_Ecmd = parseInt($order_button.find('.order-button.selected').attr('data-Id_Ecmd'));
            var index = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            $.get_orders(index);
            $('.client-info').text($.P_ECMD[index].Nom_Client);
            localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
        } else {
            //$('.client-info').text('ClientDivers');
            newEcmd();
            var index = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            $.get_orders(index);
        }
        var Id_Ecmd = parseInt($order_button.find('.order-button.selected').attr('data-Id_Ecmd'));
    });
    $neworder_button.on('click', this, function() {
        updateP_ECMD_byId_Ecmd($.Id_Ecmd, $.lineorder);
        var last = $.P_ECMD[$.P_ECMD.length - 1].Id_Ecmd;
        $.Id_Ecmd = last + 1;
        removeselectorder_button();
        $order_button.append('<span class="order-button select-order selected" data-Id_Ecmd="' +
            $.Id_Ecmd + '"><span class="order-sequence">' + $.Id_Ecmd + '</span>Active</span>');
        $order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
        var newECMD;
        newECMD = {
            'Id_Ecmd': $.Id_Ecmd,
            'Id_client': $.P_Pos.ClientDivers,
            'Nom_Client': $.P_Pos.Nom_client,
            'Id_Caissier': $.P_Pos.Id_cai,
            'TOTAL': 0,
            'lineorder': [],
            'Id_Serv': 0,
            'Id_Table': 0
        };
        $.P_ECMD.push(newECMD);
        $.lineorder = [];
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
        //$('.client-info').text('ClientDivers');

    });
    $order_button.on('click', '.order-button', function() {
        var Id_Ecmd = parseInt($order_button.find('.order-button.selected').attr('data-Id_Ecmd'));
        updateP_ECMD_byId_Ecmd(Id_Ecmd, $.lineorder);
        removeselectorder_button();
        $(this).addClass('selected');
        $(this).append('Active');
        $.Id_Ecmd = parseInt($(this).attr('data-Id_Ecmd'));
        var index = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
        $.get_orders(index);
        $('.client-info').text($.P_ECMD[index].Nom_Client);
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
    });

    function updateP_ECMD_byId_Ecmd(Id_Ecmd, lineorder) {
        for (var i = 0; i < $.P_ECMD.length; i++) {
            if ($.P_ECMD[i].Id_Ecmd === Id_Ecmd) {
                $.P_ECMD[i].lineorder = lineorder;
                break;
            }
        }
    }

    function removeselectorder_button() {
        var $firstchildren = $order_button.find('.order-button.selected').children(":first");
        $order_button.find('.order-button.selected').html($firstchildren);
        $order_button.find('.order-button').removeClass('selected');
    }
    $btntransferer_commande.on('click', this, function() {
        if ($order.find('.order-empty').length == 0) {
            $.floor_screen.addClass('transferer');
            $.floor_screen.removeClass('oe_hidden');
            $.product_screen.addClass('oe_hidden');
            insertcomnd();
        }
    });
    $('#commandnpad').on('click', '.input-button.annuler-tout-commande', function() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            $order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
            $.lineorder = [];
            f_totalprice();
            var Id_Ecmd = parseInt($order_button.find('.order-button.selected').attr('data-Id_Ecmd'));
            updateP_ECMD_byId_Ecmd(Id_Ecmd, $.lineorder);
            localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
            var url = 'namear=a&prix=0DH&total=0DH&state=c';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
        }
    });
    $('#commandnpad').on('click', '.input-button.annuler-commande', function() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            if ($selected.index() == 0) {
                selectorderline($selected.next());
            } else {
                selectorderline($selected.prev());
            }
            var idproduct = $selected.attr('data-product-id');
            removeitem_line(idproduct);
            $selected.remove();
            if ($.lineorder.length == 0) {
                $order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
            }
            f_totalprice();
        }
    });
    $('#commandnpad').on('click', '.input-button.Note', function() {
        var $selected = getselected();
        var $info_list = $selected.find('.info-list');
        if (getselected().length) {
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var note = lineorder.note;
            if ($info_list.find('.orderline-note').length) {
                $popup_note.find('textarea').val(note);
            }
            //ArticleVariant($selected.attr('data-product-id'));
            $popup_note.parent().removeClass('oe_hidden');
        }
    });
    $('#commandnpad').on('click', '.input-button.Depenses', function() {
        $popup_depenses_recettes.parent().removeClass('oe_hidden');
    });
    $('#commandnpad').on('click', '.input-button.Avoir', function() {
        if (!$.avoir) {
            if ($.P_Caissier.avoir) {
                $(this).addClass('highAvoir');
                $actionpad.find('.button.pay').remove();
                $actionpad.append('<button class="button avoir" onclick="return false">' +
                    '<div class="avoir-circle"><i aria-label="avoir" class="fa fa-chevron-left" role="img" title="avoir"></i></div>' +
                    'Avoir</button>');
                $.avoir = !$.avoir;
            } else {
                $password_confirmer.parent().removeClass('oe_hidden');
                $password_confirmer.parent().addClass('Avoir');
            }
        } else {
            $(this).removeClass('highAvoir');
            $actionpad.find('.button.avoir').remove();
            $actionpad.append('<button class="button pay" onclick="return false">' +
                '<div class="pay-circle"><i aria-label="Pay" class="fa fa-chevron-right" role="img" title="Payer"></i></div>' +
                'Paiement</button>');
            $.avoir = !$.avoir;
        }
    });
    $('#commandnpad').on('click', '.input-button.Suivant', function() {
        $('#commandnpad').html('');
        var $btn_Article = $('<button class="input-button Article" onclick="return false" style="width: 134px;">Article</button>');
        $('#commandnpad').append($btn_Article);
        $btn_Article.on('click', this, function() {
            var src = '../Modele_de_Produit.aspx?name=Article';
            $('#myFrame').attr('src', src);
            $('#myFrame').removeClass('oe_hidden');
            $.product_screen.addClass('oe_hidden');
            $btn_back.removeClass('oe_hidden');
            $('.client-info').addClass('oe_hidden');
            $('#myFrame').load(function() {
                if ($('#myFrame').is(":visible")) {
                    $('#myFrame').contents().find("header").remove();
                }
            });
        });
        var $btn_Famille = $('<button class="input-button Famille" onclick="return false" style="width: 134px;">Famille</button>');
        $('#commandnpad').append($btn_Famille);
        $btn_Famille.on('click', this, function() {
            var src = '../Modele_de_Produit.aspx?name=Famille';
            $('#myFrame').attr('src', src);
            $('#myFrame').removeClass('oe_hidden');
            $.product_screen.addClass('oe_hidden');
            $btn_back.removeClass('oe_hidden');
            $('.client-info').addClass('oe_hidden');
            $('#myFrame').load(function() {
                if ($('#myFrame').is(":visible")) {
                    $('#myFrame').contents().find("header").remove();

                }
            });

        });
        var $btn_Archive = $('<button class="input-button Archive" onclick="return false" style="width: 134px;">Archive</button>');
        $('#commandnpad').append($btn_Archive);
        $btn_Archive.on('click', this, function() {
            if ($.P_Caissier.archive) {
                $.product_screen.addClass('oe_hidden');
                $.archive_screen.removeClass('oe_hidden');
            } else {
                $password_confirmer.parent().removeClass('oe_hidden');
                $password_confirmer.parent().addClass('archive');
            }
        });
        var $btn_Precedent = $('<button class="input-button Suivant" onclick="return false" style="width: 100%"><i class="fa fa-angle-double-left"></i> Precedent</button>');
        $('#commandnpad').append($btn_Precedent);
        $btn_Precedent.on('click', this, function() {
            var highAvoir = ''
            if ($.avoir) {
                highAvoir = 'highAvoir';
            }
            var $commandnpad = $('<button class="input-button annuler-commande" onclick="return false" style="width: 134px;">Annuler</button>' +
                '<button class="input-button annuler-tout-commande" onclick="return false" style="width: 134px;">Annuler Tout</button>' +
                '<button class="input-button Depenses" onclick="return false" style="width: 134px">Depenses</button>' +
                '<button class="input-button Avoir ' + highAvoir + '" onclick="return false" style="width: 50%">Select Avoir</button>' +
                '<button class="input-button Suivant" onclick="return false" style="width: 50%">Suivant <i class="fa fa-angle-double-right"></i></button>'
            );
            $('#commandnpad').html($commandnpad);
        });
    });
    // $btnfavorite.on('click', this, function() {
    //     $.product_list.html('');
    //     List_Favoris_Article();
    // });
    $btnoffer.on('click', this, function() {
        $.product_list.html('');
        List_offer_Article();
    });
    $popup_confirm.on('click', '.button.cancel', function() {
        $popup_confirm.parent().addClass('oe_hidden');
        $popup_confirm.parent().removeClass('annuler-tout-commander');
    });
    $numpad_confirmer.on('click', '.input-button.number-char', function() {
        numberpassword = numberpassword + $(this).text();
        charpassword = charpassword + '*';
        $password_confirmer.find('.popup-input.value.active').text(charpassword);
    });
    $numpad_confirmer.on('click', '.input-button.numpad-backspace', function() {
        numberpassword = numberpassword.substring(0, numberpassword.length - 1);
        charpassword = charpassword.substring(0, charpassword.length - 1);
        $password_confirmer.find('.popup-input.value.active').text(charpassword);
    });
    $numpad_confirmer.on('click', '.input-button.numpad-char', function() {
        numberpassword = '';
        charpassword = '';
        $password_confirmer.find('.popup-input.value.active').text('');
    });
    $password_confirmer.on('click', '.button.confirm', function() {
        var confirmer = password_confirmer();
        if ($password_confirmer.parent().hasClass('Avoir')) {
            if (confirmer) {
                if (confirmer.avoir) {
                    $('#commandnpad .input-button.Avoir').addClass('highAvoir');
                    $actionpad.find('.button.pay').remove();
                    $actionpad.append('<button class="button avoir" onclick="return false">' +
                        '<div class="avoir-circle"><i aria-label="avoir" class="fa fa-chevron-left" role="img" title="avoir"></i></div>' +
                        'Avoir</button>');
                    $.avoir = !$.avoir;
                    numberpassword = '';
                    charpassword = '';
                    $password_confirmer.find('.popup-input.value.active').text('');
                    $password_confirmer.parent().addClass('oe_hidden');
                    $password_confirmer.parent().removeClass('Avoir');
                } else {
                    alertify.error("Vous ne pouvez pas faire !!");
                }
            }

        }
        if ($password_confirmer.parent().hasClass('archive')) {
            if (confirmer) {
                if (confirmer.archive) {
                    $.product_screen.addClass('oe_hidden');
                    $.archive_screen.removeClass('oe_hidden');
                    numberpassword = '';
                    charpassword = '';
                    $password_confirmer.find('.popup-input.value.active').text('');
                    $password_confirmer.parent().addClass('oe_hidden');
                    $password_confirmer.parent().removeClass('archive');
                } else {
                    alertify.error("Vous ne pouvez pas faire !!");
                }
            }

        }

    });
    $password_confirmer.on('click', '.button.cancel', function() {
        $password_confirmer.find('.popup-input.value.active').text('');
        $password_confirmer.parent().addClass('oe_hidden');
        $password_confirmer.parent().removeClass('archive');
        $password_confirmer.parent().removeClass('Avoir');
    });
    $btnprent_Cuisine.on('click', this, function() {
        if ($order.find('.order-empty').length == 0) {
            var IDV_POSTables = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
            var TOTAL = totalPayment();
            insertcomnd();
            //list_V_LCMD_by_IDV_POSTables(IDV_POSTables);
            printDocument();
            update_V_ECMD_V_LCMD(TOTAL);
        }
    });
    $variant.on('click', 'li', function() {
        $popup_note.find('textarea').val($popup_note.find('textarea').val() + ' ' + $(this).text() + ',');
    });
    $popup_note.on('click', '.button.confirm', function() {
        var $selected = getselected();
        var $info_list = $selected.find('.info-list');
        if ($popup_note.find('textarea').val() != "") {
            var note = $popup_note.find('textarea').val();
            var idproduct = $selected.attr('data-product-id');
            if ($info_list.find('.orderline-note').length) {
                $info_list.find('.orderline-note').html('<i aria-label="Note" class="fa fa-tag" role="img" title="Note"></i>' + note);
            } else {
                $info_list.append('<li class="info orderline-note"><i aria-label="Note" class="fa fa-tag" role="img" title="Note"></i>' + note + '</li>');
            }
            updatenote_lineorder(idproduct, note);
        } else {
            var note = '';
            var idproduct = $selected.attr('data-product-id');
            $info_list.find('.orderline-note').remove();
            updatenote_lineorder(idproduct, note);
        }
        $popup_note.find('textarea').val('');
        $popup_note.parent().addClass('oe_hidden');
    });
    // $.famile_list.on('click', '.famile', function() {
    //     $.product_list.html('');
    //     var IDF_FamilleArticle = $(this).attr('id_famille');
    //     //var CODECLIENT = $('.client-info').attr('data-cpt-fac');
    //     List_Article_Famille(IDF_FamilleArticle);

    // });
    $.product_screen.find('.product-list').on('click', '.product', function() {
        var $article = $(this);
        var idproduct = $article.attr('data-product-id');
        var price = $article.find('.price-tag').text();
        var name = $article.find('.product-name').text();
        var umvente = $article.attr('ar-umvente');
        var remis = $article.find('.rem-tag').text();
        if (!$.lineorder.length) {
            $order.html('');
            var $ul = $('<ul class="orderlines"></ul>');
            var $li = html_list_orderline(idproduct, name, price, umvente, price, 1.00);
            selectorderline($li);
            $order.append($ul);
            $ul.append($li);
            $order.append($ul);
            var $summary = $('<div class="summary clearfix"><div class="line"><div class="entry total"><span class="badge">Total: </span><span class="value">' + price + '</span></div></div></div>');
            $order.append($summary);
            addline(idproduct, name, price, umvente, price, 1.00, '', 0);
        } else {
            var $orderlines = $('.orderlines');
            var check = findorder($.lineorder, idproduct);
            if (check) {
                selectorderline_idproduct(idproduct);
                udpateqte_line(idproduct);
            } else {
                numpadqte = 0;
                var $li = html_list_orderline(idproduct, name, price, umvente, price, 1.00);
                $orderlines.append($li);
                selectorderline($li);
                addline(idproduct, name, price, umvente, price, 1.00, '', 0);
            }
        }
        if (remis > 0) {
            numpadqte = 0;
            numpadprix = 0;
            numpadrem = 0;
            rem(remis);
            var qte_remis = $article.find('.rem-tag').attr('data-qte');
            Qte(qte_remis);
            numpadqte = 0;
        }

        f_totalprice();
        $('.searchbox input').val('');
        var url = 'namear=' + name.substring(0, 9) + '&prix=' + price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
        $.disply2(url);
        $.setJsonScreen($.lineorder);
    });

    function selectorderline_idproduct(idproduct) {
        $('.orderline').each(function(i) {
            if ($(this).attr('data-product-id') == idproduct) {
                selectorderline($(this));
                false;
            }
        });
    }

    function addline(idproduct, name, price, umvente, total, qte, note, rem) {
        var newline;
        newline = {
            'idproduct': idproduct,
            'name': name,
            'price': price,
            'umvente': umvente,
            'total': total,
            'qte': qte,
            'note': note,
            'rem': rem
        };
        $.lineorder.push(newline);
        count_line();
    }

    function count_line() {
        var count = 0;
        for (i in $.lineorder) {
            count += parseFloat($.lineorder[i].qte);
        }
        $('#count-lient').text(count);
    }

    function udpateqte_line(idproduct) {
        var $getqte = getqte();
        var $prix = getprix();
        var qte = 0;
        var total = 0;
        qte = parseFloat(getqte_line(idproduct)) + 1;
        $getqte.text(qte);
        if (getrem_line(idproduct) == 0) {
            total = qte * getprice_line(idproduct);
            $prix.text(total.toFixed(2) + ' DH');
        } else {
            var total = parseFloat(qte * parseFloat(getprice_line(idproduct)) * (1 - getrem_line(idproduct) / 100)).toFixed(2);
            $prix.text(parseFloat(total).toFixed(2) + ' DH');
        }
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                $.lineorder[i].total = total;
                $.lineorder[i].qte = qte;
                break;
            }
        }
        count_line();
    }

    function getprice_line(idproduct) {
        var price = 0;
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                price = $.lineorder[i].price;
                break;
            }
        }
        return price;
    }

    function getqte_line(idproduct) {
        var qte = 0;
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                qte = $.lineorder[i].qte;
                break;
            }
        }
        return qte;
    }

    function gettotal_line(idproduct) {
        var total = 0;
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                total = $.lineorder[i].total;
                break;
            }
        }
        return total;
    }

    function getrem_line(idproduct) {
        var rem = 0;
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                rem = $.lineorder[i].rem;
                break;
            }
        }
        return rem;
    }

    function findorder(line, idproduct) {
        var check = false;
        for (var i = 0; i < line.length; i++) {
            if (line[i].idproduct === idproduct) {
                check = true;
                break;
            }
        }
        return check;
    }
    $order.on('click', 'li.orderline', function() {
        numpadqte = 0;
        selectorderline($(this));
    });
    $order.on('click', 'li.commandorder', function() {
        numpadqte = 0;
        selectcommandorderline($(this));
    });
    $(".searchbox input").on("click", function() {
        key.show();
        key.getinput(".searchbox input");
    });
    $keyboard_frame.on('click', '.return.lastitem', function() {
        if ($.product_screen.is(":visible")) {
            var value = $(".searchbox input").val();
            List_seacrh_Article(value);
            $keyboard_frame.css({ 'display': 'none', 'height': '0' });
        }
        $keyboard_frame.clearQueue();
    });
    $numpad.on('click', '.mode-button', function() {
        $('.mode-button').removeClass('selected-mode');
        $(this).addClass('selected-mode');
        type = $(this).text();
        switch (type) {
            case 'Qté':
                $numpad.find(".input-button.numpad-minus").addClass('disabled');
                break;
            case 'Rem.':
                $numpad.find(".input-button.numpad-minus").addClass('disabled');
                break;
            case 'Prix':
                $numpad.find(".input-button.numpad-minus").addClass('disabled');
                break;
        }

    });
    $numpad.on('click', '.input-button.number-char', function() {
        if (getselected().length) {
            switch (type) {
                case 'Qté':
                    Qte($(this).text());
                    break;
                case 'Rem.':
                    rem($(this).text());
                    break;
                case 'Prix':
                    prix($(this).text());
                    break;
            }
        }
    });
    $numpad.on('click', '.input-button.numpad-minus', function() {
        if (getselected().length) {
            switch (type) {
                case 'Qté':
                    Qte_minus();
                    break;
                case 'Prix':
                    prix_minus();
                    break;
            }
        }
    });
    $numpad.on('click', '.input-button.numpad-backspace', function() {
        if (getselected().length) {
            switch (type) {
                case 'Qté':
                    Qte_backspace();
                    break;
                case 'Rem.':
                    Rem_backspace();
                    break;
                case 'Prix':
                    prix_backspace();
                    break;
            }
        }
    });
    $.product_screen.find('.actionpad').on('click', '.button.pay', function() {
        if ($.lineorder.length) {
            if ($.P_Pos.Type_Plan) {
                //var Id_Table = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
                var Id_Serv = $.P_Serveur;
            } else {
                var Id_Table = 0;
                var Id_Serv = 0;
            }
            var Id_Session = $.P_Session;
            var Id_client = $('.client-info').attr('data-cpt-fac');
            var Nom_Client = $('.client-info').text();
            var Id_Caissier = $('.username').attr('id_cai');
            var TOTAL = totalPayment();
            Save_P_ECMD();
            $.product_screen.addClass('oe_hidden');
            $payment_screen.removeClass('oe_hidden');
            $payment_screen.find('.paymentlines-empty .total').text(totalPayment().toFixed(2) + ' DH');
            var url = 'namear=a&prix=0DH&total=' + TOTAL.toFixed(2) + 'DH&state=b';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
        }

    });
    var codebar = '';
    $(document).on("keypress", function(e) {
        if ($.product_screen.is(":visible")) {
            if (e.keyCode == 13) {
                var cd = codebar;
                codebar = '';
                var index = cd.indexOf("'");
                if (cd != '' && index == -1) {
                    find_codebar(cd);
                }
                cd = '';
                e.preventDefault();
                return false;
            } else {
                codebar += e.key;
            }
        } else {
            codebar = '';
        }
    });

    function Save_P_ECMD() {
        updateP_ECMD_byId_Ecmd($.Id_Ecmd, $.lineorder);
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
    }

    function selectorderline($el) {
        $('.orderline').removeClass('selected');
        $('.commandorder').removeClass('selected');
        $el.addClass('selected');
        numpadqte = 0;
        numpadprix = 0;
        numpadrem = 0;
        point = false;
        var selectindex = $el.index();
        var scrollTome = selectindex * parseInt($el.height());
        $('ul.orderlines').animate({
            scrollTop: scrollTome
        }, 600);

    }

    function selectcommandorderline($el) {
        $('.commandorder').removeClass('selected');
        $('.orderline').removeClass('selected');
        $el.addClass('selected');
        numpadprix = 0;
        numpadrem = 0;
    }

    function Rem_backspace() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $prix = getprix();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var qte = lineorder.qte;
            var rem = lineorder.rem;
            var price = lineorder.price;
            var total;
            if (rem != 0) {
                if (rem.toString().length == 1) {
                    rem = 0;
                    getremise().remove();
                    total = (qte * parseFloat(price).toFixed(2)).toFixed(2);
                } else {
                    rem = rem.toString().substring(0, rem.toString().length - 1);
                    getremise().html("<li class='info rem'>With a <b>" + parseFloat(rem) + "%</b> dicount</li>");
                    total = parseFloat(qte * price * (1 - parseFloat(rem) / 100)).toFixed(2);
                }
                $prix.text(parseFloat(total).toFixed(2) + ' DH');
                updaterem_lineorder(idproduct, total, rem);
                f_totalprice();
                var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
                $.disply2(url);
                $.setJsonScreen($.lineorder);
            }
        }
    }

    function Qte_backspace() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $getqte = getqte();
            var $prix = getprix();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var qte = lineorder.qte;
            var total;
            if (qte === 0) {
                if ($selected.index() == 0) {
                    selectorderline($selected.next());
                } else {
                    selectorderline($selected.prev());
                }
                removeitem_line(idproduct);
                $selected.remove();
                if ($.lineorder.length == 0) {
                    $order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
                }
            } else {
                if (qte.toString().length == 1) {
                    qte = 0;
                } else {
                    qte = qte.toString().substring(0, qte.toString().length - 1);
                }
                if (qte.toString() == '-') {
                    qte = 0;
                }
                $getqte.text(qte);
                if (lineorder.rem == 0) {
                    total = lineorder.price * parseFloat(qte).toFixed(2);
                    $prix.text(total.toFixed(2) + ' DH');
                } else {
                    total = parseFloat(parseFloat(qte).toFixed(2) * parseFloat(lineorder.price) * (1 - lineorder.rem / 100)).toFixed(2);
                    $prix.text(parseFloat(total).toFixed(2) + ' DH');
                }
                updateqte_lineorder(idproduct, total, qte);

            }
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
        }
    }

    function prix_backspace() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $prix = getprix();
            var $prixunite = getprixunite();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var price = lineorder.price;
            var qte = lineorder.qte;
            var total;
            if (price == 0) {
                if ($selected.index() == 0) {
                    selectorderline($selected.next());
                } else {
                    selectorderline($selected.prev());
                }
                removeitem_line(idproduct);
                $selected.remove();
                if ($.lineorder.length == 0) {
                    $order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
                }
            } else {
                if (price.toString().length == 1) {
                    price = 0;
                } else {
                    price = price.toString().substring(0, price.toString().length - 1);
                }
                if (price.toString() == '-') {
                    price = 0;
                }
                $prixunite.text(parseFloat(price).toFixed(2) + ' DH');
                if (lineorder.rem == 0) {
                    total = (qte * parseFloat(price).toFixed(2)).toFixed(2);
                    $prix.text(total + ' DH');
                } else {
                    total = (qte * parseFloat(price).toFixed(2) * (1 - lineorder.rem / 100)).toFixed(2);
                    $prix.text(total + ' DH');
                }
                updateprice_lineorder(idproduct, total, price);
            }
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
        }
    }

    function Qte_minus() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $getqte = getqte();
            var $prix = getprix();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var total = lineorder.total * (-1);
            var qte = lineorder.qte * (-1);
            $getqte.text(parseFloat(qte).toFixed(2));
            $prix.text(parseFloat(total).toFixed(2) + ' DH');
            updateqte_lineorder(idproduct, total, qte);
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
        }
    }

    function prix_minus() {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $prix = getprix();
            var $prixunite = getprixunite();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var price = lineorder.price * (-1);
            var total = lineorder.total * (-1);
            $prixunite.text(parseFloat(price).toFixed(2) + ' DH');
            $prix.text(parseFloat(total).toFixed(2) + ' DH');
            updateprice_lineorder(idproduct, total, price);
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
        }
    }

    function getlineorderby_id(idproduct) {
        var lineorder = [];
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                lineorder = $.lineorder[i];
                break;
            }
        }
        return lineorder;
    }

    function updateqte_lineorder(idproduct, total, qte) {
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                $.lineorder[i].total = parseFloat(total);
                $.lineorder[i].qte = qte;
                break;
            }
        }
    }

    function updateprice_lineorder(idproduct, total, price) {
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                $.lineorder[i].total = parseFloat(total);
                $.lineorder[i].price = parseFloat(price);
                break;
            }
        }
    }

    function updaterem_lineorder(idproduct, total, rem) {
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                $.lineorder[i].total = parseFloat(total);
                $.lineorder[i].rem = parseFloat(rem);
                break;
            }
        }
    }

    function updatenote_lineorder(idproduct, note) {
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                $.lineorder[i].note = note;
                break;
            }
        }
    }

    function removeitem_line(idproduct) {
        for (var i = 0; i < $.lineorder.length; i++) {
            if ($.lineorder[i].idproduct === idproduct) {
                $.lineorder.splice(i, 1);
                break;
            }
        }
    }

    function Qte(number) {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $getqte = getqte();
            var $prix = getprix();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var qte;
            var total;
            if (lineorder.qte.toString() == '0') {
                if (number == '.') {
                    qte = '0.';
                } else {
                    qte = number;
                }
            } else
            if (numpadqte) {
                qte = lineorder.qte.toString() + number.toString();
            } else {
                qte = number.toString();
                numpadqte = 1;
            }

            //         if (point) {
            //             qte = lineorder.qte.toString() + '.' + number.toString();
            //             point = false;
            //         } else {
            //             if (numpadqte) {
            //                 qte = lineorder.qte.toString() + number.toString();
            //             }
            //             else {
            //                 qte = number.toString();
            //                 numpadqte = 1;
            //             }
            //         }
            //         if (qte == '.') {
            //             qte = 0.;
            //}
            //$getqte.text(parseFloat(qte).toFixed(2));
            $getqte.text(qte);
            if (lineorder.rem == 0) {
                total = lineorder.price * parseFloat(qte);
                $prix.text(total.toFixed(2) + ' DH');
            } else {
                total = parseFloat(parseFloat(qte) * parseFloat(lineorder.price) * (1 - lineorder.rem / 100)).toFixed(2);
                $prix.text(parseFloat(total).toFixed(2) + ' DH');
            }
            updateqte_lineorder(idproduct, total, qte);
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);

        }
    }

    function rem(number) {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $prix = getprix();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var $info_list = $selected.find('.info-list');
            var rem;
            if (point) {
                rem = lineorder.rem.toString() + '.' + number.toString();
                point = false;
            } else {
                if (numpadrem) {
                    rem = lineorder.rem.toString() + number.toString();
                } else {
                    rem = number.toString();
                    numpadrem = 1;
                }

            }
            if (rem == '.') {
                rem = 0.;
            }
            var qte = lineorder.qte;
            var price = lineorder.price;
            var total;
            total = parseFloat(qte * parseFloat(price) * (1 - parseFloat(rem) / 100)).toFixed(2);
            $prix.text(parseFloat(total).toFixed(2) + ' DH');
            if (lineorder.rem == 0) {
                if (number != 0 && number != '.') {
                    $info_list.append("<li class='info rem'>With a <b>" + parseFloat(rem).toFixed(2) + "%</b> dicount</li>");
                }

            } else {
                getremise().html("With a <b>" + parseFloat(rem).toFixed(2) + "%</b> dicount");
            }
            updaterem_lineorder(idproduct, total, rem);
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
            if (number == '.') {
                point = true;
            }
        }
    }

    function prix(number) {
        var $selected = getselected();
        if ($selected.length >= 0) {
            var $prix = getprix();
            var $prixunite = getprixunite();
            var idproduct = $selected.attr('data-product-id');
            var lineorder = getlineorderby_id(idproduct);
            var qte = lineorder.qte;
            var total;
            var price;
            if (point) {
                price = lineorder.price.toString() + '.' + number.toString();
                point = false;
            } else {
                if (numpadprix) {
                    price = lineorder.price.toString() + number.toString();

                } else {
                    price = number.toString();
                    numpadprix = 1;
                }

            }
            if (price == '.') {
                price = 0.;
            }
            $prixunite.text(parseFloat(price).toFixed(2) + ' DH');
            if (lineorder.rem == 0) {
                total = (qte * parseFloat(price).toFixed(2)).toFixed(2);
                $prix.text(total + ' DH');
            } else {
                total = (qte * parseFloat(price).toFixed(2) * (1 - lineorder.rem / 100)).toFixed(2);
                $prix.text(total + ' DH');
            }
            updateprice_lineorder(idproduct, total, price);
            f_totalprice();
            var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
            if (number == '.') {
                point = true;
            }
        }
    }

    function clean() {
        totalprice = 0;
        numpadqte = 0;
        numpadprix = 0;
        numpadrem = 0;
    }

    function f_totalprice() {
        var count = 0;
        totalprice = 0;
        $order.find('.price').each(function() {
            //count += 1;
            totalprice += parseFloat($(this).text());
        });
        //$('#count-lient').text(count);
        $order.find('.value').first().text(totalprice.toFixed(2) + ' DH');
    }

    function totalPayment() {
        return parseFloat($order.find('.value').first().text());
    }

    function getselected() {
        if ($order.find('.selected').hasClass('orderline')) {
            return $order.find('li.orderline.selected');
        } else if ($order.find('.selected').hasClass('nonecommander')) {
            return $order.find('li.nonecommander.selected');
        } else {
            return $order.find('li.orderline.selected');
        }
    }

    function getqteFloat() {
        return parseFloat(getselected().find('.info em').text());
    }

    function getqte() {
        return getselected().find('.info em');
    }

    function getprix() {
        return getselected().find('.price');
    }

    function getprixuniteFloat() {
        return parseFloat(getselected().find('.info span').text());
    }

    function getprixunite() {
        return getselected().find('.info span');
    }

    function getremiseFloat() {
        return parseFloat(getselected().find('.info-list').find('li.rem').find('b').text());
    }

    function getremise() {
        return getselected().find('.info-list').find('li.rem');
    }

    function html_list_orderline(idproduct, name, price, umvente, price, qte) {
        var $li = $('<li class="orderline" data-product-id=' + idproduct + '><span class="product-name">' + name + '</span><span class="price">' + parseFloat(price).toFixed(2) + ' DH</span><ul class="info-list"><li class="info"><em>' + parseFloat(qte).toFixed(2) + '</em>  <h5>' + umvente + '</h5>, <span>' + parseFloat(price).toFixed(2) + ' DH</span>  </li></ul></li>');
        return $li;
    }

    function insertcomnd() {
        var checkorder = $order.find(':first-child').attr('class');
        if (checkorder == 'commandorders') {
            $order.find('.orderline').each(function() {
                var Ref_article = $(this).attr('data-product-id');
                var Libele_Art = $(this).find('.product-name').text();
                var Lgn_qtt = parseFloat($(this).find('.info em').text()).toFixed(2);
                var Lgn_prix = parseFloat($(this).find('.info span').text()).toFixed(2);
                var Note_LECMD = $(this).find('.orderline-note').text() || "";
                var Lgn_mntttc = parseFloat($(this).find('.price').text()).toFixed(2);
                var Lgn_remise = parseFloat($(this).find('.info-list').find('li.rem').find('b').text()) || 0;
                var Lgn_tva = 0;
                var Order_LECMD = 0;
                Insert_V_LCMD(Ref_article, Libele_Art, Lgn_qtt, Lgn_prix, Note_LECMD, Lgn_mntttc, Lgn_remise, Lgn_tva, Order_LECMD);
            });
        } else if (checkorder == 'orderlines') {
            if ($.P_Pos.Type_Plan) {
                //var Id_Table = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
                var Id_Serv = $.P_Serveur;
            } else {
                var Id_Table = 0;
                var Id_Serv = 0;
            }
            var Id_Session = $.P_Session;
            var Id_client = $('.client-info').attr('data-cpt-fac');
            var Nom_Client = $('.client-info').text();
            var Id_Caissier = $('.username').attr('id_cai');
            var TOTAL = totalPayment();
            Insert_V_ECMD(Id_Table, Id_Session, Id_Serv, Id_Caissier);
            $order.find('.orderline').each(function() {
                var Ref_article = $(this).attr('data-product-id');
                var Libele_Art = $(this).find('.product-name').text();
                var Lgn_qtt = parseFloat($(this).find('.info em').text()).toFixed(2);
                var Lgn_prix = parseFloat($(this).find('.info span').text()).toFixed(2);
                var Note_LECMD = $(this).find('.orderline-note').text() || "";
                var Lgn_mntttc = parseFloat($(this).find('.price').text()).toFixed(2);
                var Lgn_remise = parseFloat($(this).find('.info-list').find('li.rem').find('b').text()) || 0;
                var Lgn_tva = 0;
                var Order_LECMD = 0;
                Insert_V_LCMD(Ref_article, Libele_Art, Lgn_qtt, Lgn_prix, Note_LECMD, Lgn_mntttc, Lgn_remise, Lgn_tva, Order_LECMD);

            });
        } else {

        }
    }

    function List_Article_Famille(Id_famille) {
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/List_Article_Famille',
            async: false,
            data: "{'Id_famille':'" + Id_famille + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                var list = data.d;
                for (i in list) {
                    var photo = '../image/data/article/Default.png';
                    if (list[i].Photo != '') {
                        photo = '../' + list[i].Photo
                    }
                    $.product_list.append('<article class="product" data-product-id="' +
                        list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="' +
                        photo + '" /><span class="price-tag">' +
                        list[i].Prix_vente + '</span></div><div class="product-name">' +
                        list[i].Nom_article + '</div></article>');
                }
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
    }

    function List_seacrh_Article(value) {
        $.product_list.html('');
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/List_seacrh_Article',
            async: false,
            data: "{'Id_dossier':'" + $.P_Pos.Id_dossier + "','value':'" + value + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                var list = data.d;
                for (i in list) {
                    var photo = '../image/data/article/Default.png';

                    if (list[i].Photo != '') {
                        photo = '../' + list[i].Photo
                    }
                    if (list[i].Photo == null) {
                        photo = '../image/data/article/Default.png';
                    }
                    $.product_list.append('<article class="product" data-product-id="' +
                        list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="' +
                        photo + '" /><span class="price-tag">' +
                        list[i].Prix_vente + '</span></div><div class="product-name">' +
                        list[i].Nom_article + '</div></article>');
                }
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
    }

    function ArticleVariant(AR_REF) {
        $popup_note.find('.variant').html('');
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/ArticleVariant',
            async: false,
            data: "{'AR_REF':'" + AR_REF + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                var ArticleVariant = data.d;
                for (i in ArticleVariant) {
                    $popup_note.find('.variant').append('<li datat-id="' + ArticleVariant[i].IDC_ArticleVariant + '">' + ArticleVariant[i].Variant + '</li>');
                }
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
    }

    function Insert_V_ECMD(Id_Table, Id_Session, Id_Serv, Id_Caissier) {
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/Insert_P_ECMD',
            async: false,
            data: "{'Id_Table':'" + Id_Table + "','Id_Session':'" + Id_Session + "','Id_Serv':'" + Id_Serv + "','Id_Caissier':'" + Id_Caissier + "','Type_Plan':'" + $.P_Pos.Type_Plan + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                $.Id_Ecmd = data.d;
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
            }
        });
    }

    function Insert_V_LCMD(Ref_article, Libele_Art, Lgn_qtt, Lgn_prix, Note_LECMD, Lgn_mntttc, Lgn_remise, Lgn_tva, Order_LECMD) {
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/insert_P_LECMD',
            async: false,
            data: "{'Id_Ecmd':'" + $.Id_Ecmd + "','Ref_article':'" + Ref_article + "','Libele_Art':'" +
                Libele_Art + "','Lgn_qtt':'" + Lgn_qtt + "','Lgn_prix':'" + Lgn_prix + "','Note_LECMD':'" +
                Note_LECMD + "','Lgn_mntttc':'" + Lgn_mntttc + "','Lgn_remise':'" +
                Lgn_remise + "','Lgn_tva':'" +
                Lgn_tva + "','Order_LECMD':'" +
                Order_LECMD + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function list_V_LCMD_by_IDV_POSTables(Id_Table) {
        CommandeOrdre = 0;
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/list_Lecmd_by_IdTable_Session',
            async: false,
            data: "{'Id_Table':'" + Id_Table + "','Id_Session':'" + $.P_Session + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                var list = data.d;
                if (list.length) {
                    $order.html('');
                    var $ul = $('<ul class="commandorders"></ul>');
                    $.Id_Ecmd = list[0].Id_Ecmd;
                    for (i in list) {
                        if (list[i].Order_LECMD != CommandeOrdre) {
                            CommandeOrdre = list[i].Order_LECMD;
                            $ul.append('<hr>');
                        }
                        var Commender = 'nonecommander';
                        if (list[i].Commender) {
                            Commender = 'commander';
                        }
                        $li = $('<li class="commandorder ' + Commender + '" data-product-id=' +
                            list[i].Ref_article + ' IDV_LCMD="' +
                            list[i].Id_LECMD + '"><span class="product-name">' +
                            list[i].Libele_Art + '</span><span class="price">' +
                            list[i].Lgn_mntttc.toFixed(2) + ' DH</span><ul class="info-list"><li class="info"><em>Unité, <span>' +
                            list[i].Lgn_prix.toFixed(2) + ' DH</span>  </li></ul></li>');
                        if (list[i].Lgn_remise != 0) {
                            $li.find('.info-list').append("<li class='info rem'>With a <b>" + list[i].Lgn_remise + "%</b> dicount</li>");
                        }
                        if (list[i].Note_LECMD != '') {
                            $li.find('.info-list').append('<li class="info orderline-note"><i aria-label="Note" class="fa fa-tag" role="img" title="Note"></i>' + list[i].Note_LECMD + '</li>');
                        }
                        $order.append($ul);
                        $ul.append($li);
                        var $summary = $('<div class="summary clearfix"><div class="line"><div class="entry total"><span class="badge">Total: </span><span class="value"></span></div></div></div>');
                        $order.append($summary);
                        f_totalprice();
                    }
                }

            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function update_V_ECMD_V_LCMD(TOTAL) {
        callback.update_V_ECMD_V_LCMD(TOTAL);
    }

    function update_V_LCMD_CANCELED(IDV_LCMD) {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/update_V_LCMD_CANCELED',
            async: false,
            data: "{'IDV_LCMD':'" + IDV_LCMD + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function return_gIDV_ECMD_old() {
        var gIDV_ECMD;
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/return_gIDV_ECMD_old',
            async: false,
            data: "",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                gIDV_ECMD = data.d;
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
        return gIDV_ECMD;
    }

    function update_V_LCMD_IDV_ECMD(IDV_ECMD, gIDV_ECMD_old, CommandeOrdre) {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/update_V_LCMD_IDV_ECMD',
            async: false,
            data: "{'IDV_ECMD':'" + IDV_ECMD + "','gIDV_ECMD_old':'" + gIDV_ECMD_old + "','CommandeOrdre':'" + CommandeOrdre + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function update_V_ECMD_CANCELED() {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/update_V_ECMD_CANCELED',
            async: false,
            data: "",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function Update_V_LCMD_By_IDV_LCMD(Qte_LCMD, PU_LCMD, Remise_LCMD, Total_LCMD, Note_LCMD, IDV_LCMD) {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/Update_V_LCMD_By_IDV_LCMD',
            async: false,
            data: "{'Qte_LCMD':'" + Qte_LCMD + "','PU_LCMD':'" + PU_LCMD + "','Remise_LCMD':'" + Remise_LCMD + "','Total_LCMD':'" + Total_LCMD + "','Note_LCMD':'" + Note_LCMD + "','IDV_LCMD':'" + IDV_LCMD + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
            }
        });
    }

    function printDocument() {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/printDocument',
            async: false,
            data: "{'IDV_LCMD':0}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
        $receipt_screen.find('.top-content .change-value').text((f_totalprice() * (-1)) + 'DH');
        $receipt_screen.find('.pos-sale-ticket').addClass('Cuisine');
        //
        $.product_screen.addClass('oe_hidden');
        $receipt_screen.find('.top-content h1').html('');
        $receipt_screen.removeClass('oe_hidden');


    }

    function sys_message(MSG_ID) {
        $popup_confirm.find('.message').text(callback.sys_message(MSG_ID));
    }

    function load_order() {
        if (localStorage.getItem('P_ECMD') != null) {
            $.P_ECMD = JSON.parse(localStorage.getItem('P_ECMD'));
            if ($.P_ECMD.length) {
                $.Id_Ecmd = $.P_ECMD[0].Id_Ecmd;
                $('.client-info').text($.P_ECMD[0].Nom_Client);
                if ($.P_ECMD[0].lineorder.length) {
                    $.get_orders(0);
                }
                $order_button.html('');
                for (i in $.P_ECMD) {
                    if (i == 0) {
                        $order_button.append('<span class="order-button select-order selected" data-Id_Ecmd="' + $.P_ECMD[i].Id_Ecmd + '"><span class="order-sequence">' + (parseInt(i) + 1) + '</span>Active</span>');
                    } else {
                        $order_button.append('<span class="order-button select-order" data-Id_Ecmd="' + $.P_ECMD[i].Id_Ecmd + '"><span class="order-sequence">' + (parseInt(i) + 1) + '</span></span>');
                    }
                }
            } else {
                newEcmd();
            }
        } else {
            newEcmd();
        }
    }

    function newEcmd() {
        var newECMD;
        $.Id_Ecmd = 1;
        newECMD = {
            'Id_Ecmd': $.Id_Ecmd,
            'Id_client': $.P_Pos.ClientDivers,
            'Nom_Client': $.P_Pos.Nom_client,
            'Id_Caissier': $.P_Pos.Id_cai,
            'TOTAL': 0,
            'lineorder': [],
            'Id_Serv': 0,
            'Id_Table': 0
        };
        $.P_ECMD = [];
        $.P_ECMD.push(newECMD);
        $order_button.html('');
        $order_button.append('<span class="order-button select-order selected" data-Id_Ecmd="' + $.P_ECMD[0].Id_Ecmd + '"><span class="order-sequence">' + 1 + '</span>Active</span>');
        $('.client-info').text($.P_Pos.Nom_client);
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
    }

    function find_codebar(codebar1) {
        var list = $.AjaxJson('Default.aspx/find_codebar', "{'codebar':'" + codebar1 + "','Id_dossier':'" + $.P_Pos.Id_dossier + "'}");
        if (list.length) {
            var idproduct = list[0].Ref_article;
            var price = list[0].Prix_vente;
            var name = list[0].Nom_article;
            var umvente = 'unité';
            var checkorder = $order.find(':first-child').attr('class');
            var index = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            if (!$.lineorder.length) {
                $order.html('');
                var $ul = $('<ul class="orderlines"></ul>');
                var $li = html_list_orderline(idproduct, name, price, umvente, price, 1.00);
                selectorderline($li);
                $order.append($ul);
                $ul.append($li);
                $order.append($ul);
                var $summary = $('<div class="summary clearfix"><div class="line"><div class="entry total"><span class="badge">Total: </span><span class="value">' + price + '</span></div></div></div>');
                $order.append($summary);
                addline(idproduct, name, price, umvente, price, 1.00, '', 0);
            } else {
                var $orderlines = $('.orderlines');
                var check = findorder($.lineorder, idproduct);
                if (check) {
                    if (numpadqte == 0) {
                        numpadqte = 1;
                    }
                    selectorderline_idproduct(idproduct);
                    udpateqte_line(idproduct);
                } else {
                    numpadqte = 0;
                    var $li = html_list_orderline(idproduct, name, price, umvente, price, 1.00);
                    $orderlines.append($li);
                    selectorderline($li);
                    addline(idproduct, name, price, umvente, price, 1.00, '', 0);
                }
            }

            f_totalprice();
            var url = 'namear=' + name.substring(0, 9) + '&prix=' + price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
            $.disply2(url);
            $.setJsonScreen($.lineorder);
            $('.searchbox input').val('');
        }
        //for (i in list) {
        //    //var idproduct = list[i].Ref_article;
        //    //var price = list[i].Prix_vente;
        //    //var name = list[i].Nom_article;
        //    //var umvente = 'unité';
        //    //var checkorder = $order.find(':first-child').attr('class');
        //    //var index = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
        //    //if (!$.lineorder.length) {
        //    //    $order.html('');
        //    //    var $ul = $('<ul class="orderlines"></ul>');
        //    //    var $li = html_list_orderline(idproduct, name, price, umvente, price, 1.00);
        //    //    selectorderline($li);
        //    //    $order.append($ul);
        //    //    $ul.append($li);
        //    //    $order.append($ul);
        //    //    var $summary = $('<div class="summary clearfix"><div class="line"><div class="entry total"><span class="badge">Total: </span><span class="value">' + price + '</span></div></div></div>');
        //    //    $order.append($summary);
        //    //    addline(idproduct, name, price, umvente, price, 1.00, '', 0);
        //    //} else {
        //    //    var $orderlines = $('.orderlines');
        //    //    var check = findorder($.lineorder, idproduct);
        //    //    if (check) {
        //    //        if (numpadqte == 0) {
        //    //            numpadqte = 1;
        //    //        }
        //    //        selectorderline_idproduct(idproduct);
        //    //        udpateqte_line(idproduct);
        //    //    } else {
        //    //        numpadqte = 0;
        //    //        var $li = html_list_orderline(idproduct, name, price, umvente, price, 1.00);
        //    //        $orderlines.append($li);
        //    //        selectorderline($li);
        //    //        addline(idproduct, name, price, umvente, price, 1.00, '', 0);
        //    //    }
        //    //}

        //    //f_totalprice();
        //    //var url = 'namear=' + name.substring(0, 9) + '&prix=' + price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
        //    //$.disply2(url);
        //}
    }

    function List_Favoris_Article() {
        $.product_list.html('');
        var list = $.Favoris_Article;
        for (i in list) {
            var photo = '../image/data/article/Default.png';
            if (list[i].Photo != null) {
                photo = '../' + list[i].Photo
            }
            if (list[i].Photo == '') {
                photo = '../image/data/article/Default.png';
            }
            if (list[i].Type_Remise) {
                $.product_list.append('<article class="product" data-product-id="' +
                    list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="' +
                    photo + '" /><span class="price-tag">' +
                    list[i].Prix_vente + '</span><span class="rem-tag" data-qte="' + list[i].Qt_Remise + '">' +
                    list[i].Remise + '</span></div><div class="product-name">' +
                    list[i].Nom_article + '</div></article>');
            } else {
                $.product_list.append('<article class="product" data-product-id="' +
                    list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="' +
                    photo + '" /><span class="price-tag">' +
                    list[i].Prix_vente + '</span></div><div class="product-name">' +
                    list[i].Nom_article + '</div></article>');
            }
        }

    }

    function List_offer_Article() {
        $.product_list.html('');
        var list = $.offer_Article;
        for (i in list) {
            var photo = '../image/data/article/Default.png';
            if (list[i].Photo != null) {
                photo = '../' + list[i].Photo
            }
            if (list[i].Photo == '') {
                photo = '../image/data/article/Default.png';
            }
            if (list[i].Type_Remise) {
                $.product_list.append('<article class="product" data-product-id="' +
                    list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="' +
                    photo + '" /><span class="price-tag">' +
                    list[i].Prix_vente + '</span><span class="rem-tag" data-qte="' + list[i].Qt_Remise + '">' +
                    list[i].Remise + '</span></div><div class="product-name">' +
                    list[i].Nom_article + '</div></article>');
            } else {
                $.product_list.append('<article class="product" data-product-id="' +
                    list[i].Ref_article + '" ar-umvente="unité"><div class="product-img"><img src="' +
                    photo + '" /><span class="price-tag">' +
                    list[i].Prix_vente + '</span></div><div class="product-name">' +
                    list[i].Nom_article + '</div></article>');
            }
        }

    }

    function password_confirmer() {
        var list = $.AjaxJson('Default.aspx/login', "{'Id_dossier':'" + $.P_Pos.Id_dossier + "','Caisser_Ps':'" + numberpassword + "'}");
        if (list.Item2) {
            return list.Item1[0];
        } else {

            alertify.error(list.Item3);
            return false;
        }

    }

    function clockTick() {
        currentTime = new Date();
        // alert("hi");
        $('#date-footer').text(currentTime.toLocaleString());
    }
    setInterval(function() { clockTick(); }, 1000);

});