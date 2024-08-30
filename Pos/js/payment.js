$('.payment-screen.screen').ready(function() {
    var callback = new fcallback();
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];
    var $product_screen = $('.product-screen.screen');
    var $payment_screen = $('.payment-screen.screen');
    var $receipt_screen = $('.receipt-screen.screen');
    var $btnRetour = $payment_screen.find('.top-content .button.back');
    var $btnValider = $payment_screen.find('.top-content .button.next');
    var $paymentlines_container = $payment_screen.find('.paymentlines-container');
    var $btnPaymentmethod = $payment_screen.find('#paymentmethods');
    var $numpad = $payment_screen.find('.numpad');
    var total_payment;
    var extra;
    var numpadoffert = '';
    var IDROOMING_LIST = 0;
    var $username = $('.username');
    var $popup_hotel_Chambre = $('.popups').find('.popup.popup-hotel-Chambre');

    var codeB = '';
    var $popup_messager = $('.popups').find('.popup.popup-messager');

    var $btnhotel = $payment_screen.find('.button.js_set_hotel');
    var $btnclient_fid = $.payment_screen.find('.button.js_set_client_fid');
    var $popup_client_fid = $('.popups').find('.popup.popup-client-fid');
    var $popup_list_offers = $('.popups').find('.popup.popup-list-offers');
    var $numpad_client_fid = $popup_client_fid.find('.popup-numpad');
    $popup_messager.on('click', '.button.confirm', function() {
        if ($popup_messager.hasClass('Veuillez-confermer-le-transfert')) {
            if ($payment_screen.find('.paymentlines-empty .total').length) {
                total_payment = parseFloat($payment_screen.find('.paymentlines-empty .total').text()).toFixed(2);
            }
            Insert_F_JNLV_by_NumChambre(Chambre, IDROOMING_LIST, total_payment, $username.text());
            $popup_messager.parent().addClass('oe_hidden');
            $popup_messager.removeClass('Veuillez-confermer-le-transfert');
            $receipt_screen.find('.pos-sale-ticket').addClass('Hotel');
            $receipt_screen.find('.top-content h1').html('');
            $receipt_screen.removeClass('oe_hidden');
            $payment_screen.addClass('oe_hidden');
            $paymentlines_container.html('<div class="paymentlines-empty"><div class="total">' + total_payment + '</div><div class="message">Veuillez sélectionner une méthode de paiement.</div></div>');
            numpadoffert = '';
        }
        if ($popup_messager.hasClass('Client-introuvable')) {
            $popup_messager.parent().addClass('oe_hidden');
            $popup_messager.removeClass('Client-introuvable');
        }
        if ($popup_messager.hasClass('nest-pas-autorisé')) {
            $popup_messager.parent().addClass('oe_hidden');
            $popup_messager.removeClass('nest-pas-autorisé');
        }
    });
    $popup_messager.on('click', '.button.cancel', function() {
        $popup_messager.parent().addClass('oe_hidden');
    });
    $numpad_client_fid.on('click', '.input-button.number-char', function() {
        codeB = codeB + $(this).text();
        $popup_client_fid.find('input').val(codeB);
    });
    $numpad_client_fid.on('click', '.input-button.numpad-backspace', function() {
        codeB = codeB.substring(0, codeB.length - 1);
        $popup_client_fid.find('input').val(codeB);
    });
    $numpad_client_fid.on('click', '.input-button.numpad-char', function() {
        codeB = '';
        $popup_client_fid.find('input').val('');
    });
    $popup_client_fid.on('click', '.button.confirm', function() {
        var CodeBare = $popup_client_fid.find('input').val();
        fid_client(CodeBare);
    });
    $popup_client_fid.on('click', '.button.cancel', function() {
        Chambre = '';
        $popup_client_fid.parent().addClass('oe_hidden');
    });
    $btnRetour.on('click', this, function() {
        $product_screen.removeClass('oe_hidden');
        $payment_screen.addClass('oe_hidden');
        $paymentlines_container.html('<div class="paymentlines-empty"><div class="total">' + total_payment + '</div><div class="message">Veuillez sélectionner une méthode de paiement.</div></div>');
        numpadoffert = '';

    });
    $btnValider.on('click', this, function() {
        var length = $paymentlines_container.find('.paymentline').length;
        if (total_change() <= 0 && length >= 2) {
            var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            if ($.P_Pos.Type_Plan) {
                var Id_Table = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
                var Id_Serv = $.P_Serveur;
            } else {
                var Id_Table = 0;
                var Id_Serv = 0;
            }
            var Id_Session = $.P_Session;
            var Id_Caissier = $.P_Caissier.Id_Caissier;
            Insert_P_ECMD(Id_Table, Id_Session, Id_Serv, Id_Caissier);
            var listline = $.P_ECMD[indexP_ECMD].lineorder;
            total_payment = 0;
            for (i in listline) {
                var Ref_article = listline[i].idproduct;
                var Libele_Art = listline[i].name;
                var Lgn_qtt = parseFloat(listline[i].qte);
                var Lgn_prix = listline[i].price;
                var Note_LECMD = listline[i].note;
                var Lgn_mntttc = listline[i].total;
                var Lgn_remise = listline[i].rem;
                var Lgn_tva = 0;
                var Order_LECMD = 0;
                total_payment = parseFloat(total_payment) + parseFloat(listline[i].total);
                insert_P_LECMD(Ref_article, Libele_Art, Lgn_qtt, Lgn_prix, Note_LECMD, Lgn_mntttc, Lgn_remise, Lgn_tva, Order_LECMD);
            }
            console.log(total_payment);
            var Tt_ttc = total_payment;
            var Id_client = parseInt($.P_ECMD[indexP_ECMD].Id_client) || $.P_Pos.ClientDivers;
            var Nom_Client = $.P_ECMD[indexP_ECMD].Nom_Client || $.P_Pos.Nom_client;

            $paymentlines_container.find('.paymentline').each(function(index) {
                if ((length - 1) != index) {
                    var Mod_rglm = $(this).find('.col-name').attr('data-id') || 'Espece';
                    var MontantPresenter = parseFloat($(this).find('.col-tendered.edit').text()) || 0;
                    var MontAntRendu = parseFloat($(this).find('.col-change').text()) || 0;
                    insert_P_Reglement(Mod_rglm, MontantPresenter.toFixed(2), MontAntRendu.toFixed(2));
                }
            });
            if ($.avoir) {
                P_update_avoir(Tt_ttc, Id_client, Nom_Client, Id_Session);
                $receipt_screen.find('.pos-sale-ticket').addClass('avoir');
            } else {
                update_P_Ecmd(Tt_ttc, Id_client, Nom_Client, Id_Session);
                $receipt_screen.find('.pos-sale-ticket').addClass('Paiement');
            }
            $payment_screen.addClass('oe_hidden');
            $receipt_screen.find('.top-content h1').html('Rendu : <span class="change-value">' + (total_change() * (-1)) + 'DH</span>');

            $receipt_screen.removeClass('oe_hidden');
            $paymentlines_container.html('<div class="paymentlines-empty"><div class="total">' + total_payment + '</div><div class="message">Veuillez sélectionner une méthode de paiement.</div></div>');
            numpadoffert = '';
            $.P_ECMD.splice(indexP_ECMD, 1);
            localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
            $.lineorder = [];
            if (ckeckFid) {
                var Type_Fid = history.Type_Fid;
                var Point_Cons = history.Point_Cons;
                var Meta = JSON.stringify(history.meta);
                console.log(Type_Fid, Point_Cons, Meta);
                P_fidInsertHistory(Id_client, Type_Fid, Point_Cons, Meta);
                ckeckFid = false;
            }
        }
    });
    $btnPaymentmethod.on('click', '.button.paymentmethod', function() {
        if ($(this).attr('data-id') == 'Crédit') {
            let indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            console.log($.P_ECMD[indexP_ECMD].Id_client)
            console.log($.P_Pos.ClientDivers)
            if ($.P_ECMD[indexP_ECMD].Id_client == $.P_Pos.ClientDivers) {
                alertify.alert('Attention', 'Vous ñ\'avez pas choisi de client ');
                return false;
            }

        }
        if ($(this).attr('data-id') == 'Espece-Falst') {
            var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            total_payment = parseFloat($payment_screen.find('.paymentlines-empty .total').text()).toFixed(2);
            if ($.P_Pos.Type_Plan) {
                var Id_Table = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
                var Id_Serv = $.P_Serveur;
            } else {
                var Id_Table = 0;
                var Id_Serv = 0;
            }
            var Id_Session = $.P_Session;
            var Id_Caissier = $.P_Caissier.Id_Caissier;
            Insert_P_ECMD(Id_Table, Id_Session, Id_Serv, Id_Caissier);
            var listline = $.P_ECMD[indexP_ECMD].lineorder;
            total_payment = 0;
            for (i in listline) {
                var Ref_article = listline[i].idproduct;
                var Libele_Art = listline[i].name;
                var Lgn_qtt = parseFloat(listline[i].qte);
                var Lgn_prix = listline[i].price;
                var Note_LECMD = listline[i].note;
                var Lgn_mntttc = listline[i].total;
                var Lgn_remise = listline[i].rem;
                var Lgn_tva = 0;
                var Order_LECMD = 0;
                total_payment = parseFloat(total_payment) + parseFloat(listline[i].total);
                insert_P_LECMD(Ref_article, Libele_Art, Lgn_qtt, Lgn_prix, Note_LECMD, Lgn_mntttc, Lgn_remise, Lgn_tva, Order_LECMD);
            }
            var Tt_ttc = total_payment;
            var Id_client = $.P_ECMD[indexP_ECMD].Id_client || $.P_Pos.ClientDivers;
            var Nom_Client = $.P_ECMD[indexP_ECMD].Nom_Client || $.P_Pos.Nom_client;
            var Mod_rglm = 'Espece';
            var MontantPresenter = Tt_ttc;
            var MontAntRendu = 0;
            insert_P_Reglement(Mod_rglm, MontantPresenter, MontAntRendu);
            if ($.avoir) {
                P_update_avoir(Tt_ttc, Id_client, Nom_Client, Id_Session);
                $receipt_screen.find('.pos-sale-ticket').addClass('avoir');
            } else {
                update_P_Ecmd(Tt_ttc, Id_client, Nom_Client, Id_Session);
                $receipt_screen.find('.pos-sale-ticket').addClass('Paiement');
            }
            $payment_screen.addClass('oe_hidden');
            $receipt_screen.find('.top-content h1').html('Rendu : <span class="change-value">' + (total_change() * (-1)) + 'DH</span>');

            $receipt_screen.removeClass('oe_hidden');
            $paymentlines_container.html('<div class="paymentlines-empty"><div class="total">' + total_payment + '</div><div class="message">Veuillez sélectionner une méthode de paiement.</div></div>');
            numpadoffert = '';
            $.P_ECMD.splice(indexP_ECMD, 1);
            localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
            $.lineorder = [];
            if (ckeckFid) {
                var Type_Fid = history.Type_Fid;
                var Point_Cons = history.Point_Cons;
                var Meta = JSON.stringify(history.meta);
                console.log(Type_Fid, Point_Cons, Meta);
                P_fidInsertHistory(Id_client, Type_Fid, Point_Cons, Meta);
                ckeckFid = false;
            }
        } else
        if ($paymentlines_container.find('.paymentlines').length == 0) {
            total_payment = parseFloat($payment_screen.find('.paymentlines-empty .total').text()).toFixed(2);
            $paymentlines_container.html("<table class='paymentlines'><colgroup><col class='due'><col class='tendered'><col class='change'><col class='method'><col class='controls'></colgroup><thead><tr class='label'><th>Dûe</th><th>Offert</th><th>Change</th><th>Méthode</th></tr></thead><tbody></tbody></table>");
            paymentlines_tbody().append('<tr class="paymentline"><td class="col-due">' + total_payment + '</td><td class="col-tendered edit">0.00</td><td class="col-change"></td><td class="col-name" data-id="' + $(this).attr('data-id') + '">	' + $(this).text() + '</td><td aria-label="Delete" class="delete-button" data-cid="c21" title="Supprimer"> <i class="fa fa-times-circle"></i> </td></tr>');
            selectpaymentline($paymentlines_container.find('tr.paymentline').last());
        }

        numpadoffert = '';
    });
    $numpad.on('click', '.input-button.number-char', function() {
        if (paymentlineselected().length) {
            numpadoffert = numpadoffert + $(this).text();
            col_tendered_edit().text(parseFloat(numpadoffert).toFixed(2));
            total_tendered_edit();
            if (paymentline_extra().length == 0) {
                paymentlines_tbody().append('<tr class="paymentline extra"><td class="col-due">' + total_change() + '</td></tr>');
            } else {
                paymentline_extra().html('<td class="col-due">' + total_change() + '</td>');
            }
        }
    });
    $numpad.on('click', '.input-button.numpad-char', function() {
        if (paymentlineselected().length) {
            numpadoffert = 0;
            col_tendered_edit().text(parseFloat(numpadoffert).toFixed(2));
            total_tendered_edit();
            if (paymentline_extra().length == 0) {
                paymentlines_tbody().append('<tr class="paymentline extra"><td class="col-due">' + total_change() + '</td></tr>');
            } else {
                paymentline_extra().html('<td class="col-due">' + total_change() + '</td>');
            }
        }

    });
    $numpad.on('click', '.mode-button', function() {
        if (paymentlineselected().length) {
            col_tendered_edit().text(parseFloat(col_tendered_editFloat() + parseFloat($(this).text())).toFixed(2));
            total_tendered_edit();
            if (paymentline_extra().length == 0) {
                paymentlines_tbody().append('<tr class="paymentline extra"><td class="col-due">' + total_change() + '</td></tr>');
            } else {
                paymentline_extra().html('<td class="col-due">' + total_change() + '</td>');
            }
        }

    });
    $numpad.on('click', '.input-button.numpad-backspace', function() {
        if (paymentlineselected().length) {
            numpadoffert = numpadoffert.toString().substring(0, numpadoffert.toString().length - 1);
            if (numpadoffert == "") {
                col_tendered_edit().text(parseFloat(0).toFixed(2));
            } else {
                col_tendered_edit().text(parseFloat(numpadoffert).toFixed(2));
            }
            total_tendered_edit();
            if (paymentline_extra().length == 0) {
                paymentlines_tbody().append('<tr class="paymentline extra"><td class="col-due">' + total_change() + '</td></tr>');
            } else {
                paymentline_extra().html('<td class="col-due">' + total_change() + '</td>');
            }
        }

    });
    $paymentlines_container.on('click', 'tr .col-due', function() {
        numpadoffert = $(this).text();
        col_tendered_edit().text(parseFloat(numpadoffert).toFixed(2));
        total_tendered_edit();
        if (paymentline_extra().length == 0) {
            paymentlines_tbody().append('<tr class="paymentline extra"><td class="col-due">' + total_change() + '</td></tr>');
        } else {
            paymentline_extra().html('<td class="col-due">' + total_change() + '</td>');
        }
    });
    $paymentlines_container.on('click', 'tr.paymentline', function() {
        selectpaymentline($(this));
        numpadoffert = 0;
    });
    $paymentlines_container.on('click', 'tr .delete-button', function() {
        var $tr = $(this).closest('tr');
        $tr.remove();
        if ($paymentlines_container.find('.delete-button').length == 0) {
            $paymentlines_container.html('<div class="paymentlines-empty"><div class="total">' + total_payment + '</div><div class="message">Veuillez sélectionner une méthode de paiement.</div></div>');
        } else {
            total_tendered_edit();
            paymentline_extra().html('<td class="col-due">' + total_change() + '</td>');
        }

    });
    $btnclient_fid.on('click', this, function() {
        //var length = $paymentlines_container.find('.paymentline').length;
        //if (total_change() <= 0 && length >= 2) {
        $popup_client_fid.parent().removeClass('oe_hidden');
        //}
    });
    var codebar = '';
    $(document).on("keypress", function(e) {
        if ($.payment_screen.is(":visible")) {
            if (e.keyCode == 13) {
                var cd = codebar;
                codebar = '';
                var index = cd.indexOf("'");
                if (cd != '' && index == -1) {
                    //find_codebar(cd);
                    fid_client(codebar);
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
    /*selected list offers*/
    $('#list-offers').on('click', 'offers', function() {
        selectoffers($(this));
    });

    function selectoffers($el) {
        var lastpoint = $('offers.selected .offer-name').text();
        $('offers').removeClass('selected');
        $el.addClass('selected');
        if (parseInt(lastpoint)) {
            pointFid = pointFid + parseInt(lastpoint);
        }
        pointFid = pointFid - parseInt($el.find(".offer-name").text());
        $('#pointFid').text(pointFid);
    }

    function selectpaymentline($el) {
        $('tr.paymentline').removeClass('selected');
        $el.addClass('selected');
    }

    function paymentlineselected() {
        return $paymentlines_container.find('.paymentline.selected');
    }

    function col_change() {
        return paymentlineselected().find('.col-change');
    }

    function col_duefFloat() {
        return parseFloat(paymentlineselected().find('.col-due').text()).toFixed(2);
    }

    function col_due() {
        return paymentlineselected().find('.col-due');
    }

    function col_tendered_edit() {
        return paymentlineselected().find('.col-tendered.edit');
    }

    function col_tendered_editFloat() {
        return parseFloat(paymentlineselected().find('.col-tendered.edit').text());
    }

    function paymentline_extra() {
        return $paymentlines_container.find('.paymentline.extra');
    }

    function paymentlines_tbody() {
        return $paymentlines_container.find('.paymentlines tbody');
    }

    function total_change() {
        var total = 0;
        $paymentlines_container.find('.paymentline .col-tendered.edit').each(function() {
            total += parseFloat($(this).text());
        });
        if (parseFloat(total_payment - total).toFixed(2) <= 0) {
            $btnValider.addClass('highlight');
        } else {
            $btnValider.removeClass('highlight');
        }
        return parseFloat(total_payment - total).toFixed(2);
    }

    function total_tendered_edit() {
        var total = total_payment;
        $paymentlines_container.find('.paymentline .col-tendered.edit').each(function() {
            var $tr = $(this).closest('tr');
            var indextr = $tr.index();
            $tr.find('.col-due').text(parseFloat(total).toFixed(2));
            total = total - parseFloat($(this).text());
        });
        total_col_change();
    }

    function total_col_change() {
        $paymentlines_container.find('.paymentline .col-change').each(function() {
            var $col_due = $(this).closest('tr').find('.col-due');
            var $col_change = $(this).closest('tr').find('.col-change');
            var $col_tendered_edit = $(this).closest('tr').find('.col-tendered.edit');
            var col_due = parseFloat($col_due.text());
            var col_tendered_edit = parseFloat($col_tendered_edit.text());
            if (col_due < col_tendered_edit) {
                $col_change.text(parseFloat(col_tendered_edit - col_due).toFixed(2));
                $col_change.addClass('highlight');
            } else {
                $col_change.removeClass('highlight');
                $col_change.text('');
            }
        });

    }

    function rml(NUM_CHAMBRE) {
        $popup_messager.find('.button.cancel').removeClass('oe_hidden');
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/rml',
            async: false,
            data: "{'NUM_CHAMBRE':'" + NUM_CHAMBRE + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                var rml = data.d;
                if (rml.length) {
                    if (rml[0].AutoriseConsoResto) {
                        $popup_hotel_Chambre.parent().addClass('oe_hidden');
                        $popup_messager.parent().removeClass('oe_hidden');
                        sys_message('803');
                        IDROOMING_LIST = rml[0].IDROOMING_LIST;
                        $popup_messager.addClass('Veuillez-confermer-le-transfert');
                        $receipt_screen.data("data", { NUMCHAMBRE: NUM_CHAMBRE, Occupant: rml[0].Occupant });
                        $popup_messager.find('.message').append('<br> <span> MESSAGE_RL : </span> ' + rml[0].MESSAGE_RL + '</br> <span> Occupant  :</span>' + rml[0].Occupant + ' </br><span> Nationalités : </span>' + rml[0].IDNationalités);
                    } else {
                        $popup_hotel_Chambre.parent().addClass('oe_hidden');
                        $popup_messager.find('.button.cancel').addClass('oe_hidden');
                        $popup_messager.parent().removeClass('oe_hidden');
                        $popup_messager.addClass('nest-pas-autorisé');
                        sys_message('802');
                    }
                } else {
                    $popup_messager.addClass('Client-introuvable');
                    $popup_hotel_Chambre.parent().addClass('oe_hidden');
                    $popup_messager.find('.button.cancel').addClass('oe_hidden');
                    $popup_messager.parent().removeClass('oe_hidden');
                    sys_message('801');
                }
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
    }

    function sys_message(MSG_ID) {
        $popup_messager.find('.message').text(callback.sys_message(MSG_ID));
    }

    function get_gList_V_LCMD() {
        var list_get_V_LCMD;
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/get_gList_V_LCMD',
            async: false,
            data: "",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                list_get_V_LCMD = data.d;
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
        return list_get_V_LCMD;
    }

    function Insert_F_JNLV_by_NumChambre(NUM_CHAMBRE, IDROOMING_LIST, Total, BENEFICIER_JV) {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/Insert_F_JNLV_by_NumChambre',
            async: false,
            data: "{'NUM_CHAMBRE':'" + NUM_CHAMBRE + "','IDROOMING_LIST':'" + IDROOMING_LIST + "','Total':'" + Total + "','BENEFICIER_JV':'" + BENEFICIER_JV + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function update_V_ECMD_V_LCMD(TOTAL) {
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/update_V_ECMD_V_LCMD',
            async: false,
            data: "{'TOTAL':'" + TOTAL + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {},
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

    function Insert_P_ECMD(Id_Table, Id_Session, Id_Serv, Id_Caissier) {
        $.Id_Ecmd = $.AjaxJson('Default.aspx/Insert_P_ECMD', "{'Id_Table':'" + Id_Table + "','Id_Session':'" + Id_Session + "','Id_Serv':'" + Id_Serv + "','Id_Caissier':'" + Id_Caissier + "','Type_Plan':'" + $.P_Pos.Type_Plan + "'}");
    }

    function insert_P_LECMD(Ref_article, Libele_Art, Lgn_qtt, Lgn_prix, Note_LECMD, Lgn_mntttc, Lgn_remise, Lgn_tva, Order_LECMD) {
        $.AjaxJson('Default.aspx/insert_P_LECMD', "{'Id_Ecmd':'" + $.Id_Ecmd + "','Ref_article':'" + Ref_article + "','Libele_Art':'" +
            Libele_Art + "','Lgn_qtt':'" + Lgn_qtt + "','Lgn_prix':'" + Lgn_prix + "','Note_LECMD':'" +
            Note_LECMD + "','Lgn_mntttc':'" + Lgn_mntttc + "','Lgn_remise':'" +
            Lgn_remise + "','Lgn_tva':'" +
            Lgn_tva + "','Order_LECMD':'" +
            Order_LECMD + "'}");

    }

    function update_P_Ecmd(Tt_ttc, Id_client, Nom_Client, Id_Session) {
        $.AjaxJson('Default.aspx/update_P_Ecmd', "{'Tt_ttc':'" + Tt_ttc + "','Id_client':'" + Id_client + "','Nom_Client':'" + Nom_Client + "','Id_Ecmd':'" + $.Id_Ecmd + "','Id_Session':'" + Id_Session + "'}");
    }

    function insert_P_Reglement(Mod_rglm, MontantPresenter, MontAntRendu) {
        $.AjaxJson('Default.aspx/insert_P_Reglement', "{'Mod_rglm':'" + Mod_rglm + "','Id_Ecmd':'" + $.Id_Ecmd + "','MontantPresenter':'" + MontantPresenter + "','MontAntRendu':'" + MontAntRendu + "'}");
    }

    function P_update_avoir(Tt_ttc, Id_client, Nom_Client, Id_Session) {
        $.AjaxJson('Default.aspx/P_update_avoir', "{'Tt_ttc':'" + Tt_ttc + "','Id_client':'" + Id_client + "','Nom_Client':'" + Nom_Client + "','Id_Ecmd':'" + $.Id_Ecmd + "','Id_Session':'" + Id_Session + "'}");
    }
    $popup_list_offers.on('click', '.button.confirm', function() {
        Type_Fid = $popup_list_offers.data('Type_Fid');
        switch (Type_Fid) {
            case 'remG':
                addFid_client_remG();
                break;
            case 'remArticle':
                addFidClinetRemArticle();
                break;
            case 'cdx':
                addFidClientCDX();
                break;
        }
    });
    $popup_list_offers.on('click', '.button.cancel', function() {
        $popup_list_offers.parent().addClass('oe_hidden');
    });

    function fid_client(CodeBare) {
        var list = $.AjaxJson('Default.aspx/fid_client', "{'CodeBare':'" + CodeBare + "'}");
        if (list.length) {
            var Type_Fid = list[0].Type_Fid;
            $popup_list_offers.parent().removeClass('oe_hidden');
            $popup_client_fid.parent().addClass('oe_hidden');
            $popup_list_offers.data('Type_Fid', Type_Fid);
            switch (Type_Fid) {
                case 'remG':
                    fid_client_remG(list[0]);
                    break;
                case 'remArticle':
                    fidClinetRemArticle(list[0]);
                    break;
                case 'cdx':
                    fidClientCDX(list[0]);
                    break;
            }
        } else {

        }
    }

    function fid_client_remG(data) {
        $('#list-offers').html('');
        var meta = JSON.parse(data.Meta);
        $popup_list_offers.parent().removeClass('oe_hidden');
        getNumClientFid(data.Id_client, data.Nom_client, data.Code_client, data.Point);
        pointFid = data.Point;
        for (i in meta) {
            if (meta[i].point > data.Point) {
                $('#list-offers').append("<offers class='offer disabled' >" +
                    "<div class='offer-img'><div class='backround-rem' style='background: #ff6767;color:#a79c9c'>" +
                    "<span>" + meta[i].rem + "</span></div></div><div class='offer-name'>" + meta[i].point + "</div></offers>");
            } else {
                $('#list-offers').append("<offers class='offer' >" +
                    "<div class='offer-img'><div class='backround-rem' style='background: " + colorArray[i] + "'>" +
                    "<span>" + meta[i].rem + "</span></div></div><div class='offer-name'>" + meta[i].point + "</div></offers>");
            }
        }
        if ($('#list-offers').find("offers").not(".disabled").length == 0) {
            $popup_list_offers.parent().addClass('oe_hidden');
        }
    }

    function getNumClientFid(Id_client, Nom_client, Code_client, Point) {
        $('#codeFid').text(Code_client);
        $('#nameFid').text(Nom_client);
        $('#pointFid').text(Point);
        $('.client-info').text(Nom_client);
        for (var i = 0; i < $.P_ECMD.length; i++) {
            if ($.P_ECMD[i].Id_Ecmd === $.Id_Ecmd) {
                $.P_ECMD[i].Id_client = Id_client;
                $.P_ECMD[i].Nom_Client = Nom_client;
                break;
            }
        }
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
    }

    function fidClientCDX(data) {
        $('#list-offers').html('');
        var meta = JSON.parse(data.Meta);
        getNumClientFid(data.Id_client, data.Nom_client, data.Code_client, data.Point);
        pointFid = data.Point;
        for (i in meta) {
            if (meta[i].point > data.Point) {
                $('#list-offers').append("<offers class='offer disabled' data-id='" + meta[i].ref + "'><div class='offer-img'>" +
                    "<img src='../" + meta[i].img + "'></div><div class='offer-name'>" + meta[i].point + "</div></offers>");
            } else {
                $('#list-offers').append("<offers class='offer' data-id='" + meta[i].ref + "'><div class='offer-img'>" +
                    "<img src='../" + meta[i].img + "'></div><div class='offer-name'>" + meta[i].point + "</div></offers>");
            }
        }
        if ($('#list-offers').find("offers").not(".disabled").length == 0) {
            $popup_list_offers.parent().addClass('oe_hidden');
        }

    }
    $('#list-offers').on('click', '.table-remArticle input', function() {
        if ($(this).prop("checked")) {
            //var $thistr = $(this);
            pointFid = pointFid - $(this).data().point;
            $('#list-offers .table-remArticle input').each(function() {
                if (!$(this).prop("checked")) {
                    if (pointFid < $(this).data().point) {
                        $(this).addClass('disabled');
                    } else {
                        $(this).removeClass('disabled');
                    }

                }
            });
        } else {
            pointFid = pointFid + $(this).data().point;
            $('#list-offers .table-remArticle input').each(function() {
                if (!$(this).prop("checked")) {
                    if (pointFid >= $(this).data().point) {
                        $(this).removeClass('disabled');
                    } else {
                        $(this).addClass('disabled');
                    }
                }
            });
        }
        $('#pointFid').text(pointFid);
    });
    var pointFid = 0;
    var ckeckFid = false;
    var history;

    function fidClinetRemArticle(data) {
        $('#list-offers').html('');
        var meta = JSON.parse(data.Meta);
        $popup_list_offers.css('width', '650px');
        getNumClientFid(data.Id_client, data.Nom_client, data.Code_client, data.Point);
        var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
        var listline = $.P_ECMD[indexP_ECMD].lineorder;
        listline.sort(function(a, b) { return b.price - a.price });
        meta.sort(function(a, b) { return b.point - a.point });
        pointFid = data.Point;
        var meta = meta.filter(function(data) {
            return data.point <= pointFid;
        });
        var $table = $("<table class='table-remArticle'><tr><th></th><th>Ref</th><th>prix</th><th>rem</th><th>point</th></tr></table>");
        //$table.append("");
        for (i in listline) {
            for (j in meta) {
                if (meta[j].ref == listline[i].idproduct) {
                    if (listline[i].rem > 0) {
                        var $tr = $('<tr><td style="width: 10%;"><input type="checkbox" checked data-ref="' +
                            meta[j].ref + '" data-point="' +
                            meta[j].point + '"></td><td>' +
                            meta[j].ref + '</td><td>' +
                            listline[i].price + '</td><td>' +
                            meta[j].rem + '</td><td>' +
                            meta[j].point + '</td></tr>');
                        $tr.data(meta[j]);
                        $table.append($tr);
                    } else {
                        var $tr = $('<tr><td style="width: 10%;"><input type="checkbox" data-ref="' +
                            meta[j].ref + '" data-point="' +
                            meta[j].point + '"></td><td>' +
                            meta[j].ref + '</td><td>' +
                            listline[i].price + '</td><td>' +
                            meta[j].rem + '</td><td>' +
                            meta[j].point + '</td></tr>');
                        $tr.data(meta[j]);
                        $table.append($tr);
                    }
                }
            }
        }
        if ($table.find('tr').length <= 1) {
            $popup_list_offers.parent().addClass('oe_hidden');
        } else {
            $('#list-offers').append($table);
        }

        //var sorted = listline.sort(function (a, b) { return a.price - b.price });
    }

    function addFidClinetRemArticle() {
        var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
        var listline = $.P_ECMD[indexP_ECMD].lineorder;
        var totalpoint = 0;
        var meta = [];
        $('#list-offers .table-remArticle tr').each(function() {
            if ($(this).find('input').prop("checked")) {
                var tr = $(this).data();
                var rem = tr.rem;
                var ref = tr.ref;

                for (i in listline) {
                    if (listline[i].idproduct == ref) {
                        totalpoint += tr.point;
                        meta.push({ "ref": ref, "rem": rem });
                        var total;
                        var qte = parseFloat(listline[i].price) * (parseFloat(listline[i].qte) - 1);
                        total = parseFloat(parseFloat(listline[i].price) * (1 - parseFloat(rem) / 100));
                        total = total + qte;
                        $.P_ECMD[indexP_ECMD].lineorder[i].total = total.toFixed(2);
                        $.P_ECMD[indexP_ECMD].lineorder[i].rem = parseFloat(rem);
                    }
                }
            } else {
                var tr = $(this).data();
                var rem = tr.rem;
                var ref = tr.ref;
                for (i in listline) {
                    if (listline[i].idproduct == ref) {
                        if (listline[i].rem > 0) {
                            var total;
                            //var qte = parseFloat(listline[i].price) * (parseFloat(listline[i].qte) );
                            total = parseFloat(listline[i].price) * parseFloat(listline[i].qte);
                            //total = total + qte;
                            $.P_ECMD[indexP_ECMD].lineorder[i].total = total.toFixed(2);
                            $.P_ECMD[indexP_ECMD].lineorder[i].rem = 0;
                        }
                    }
                }
            }
        });
        updateTotal();
        localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
        $popup_list_offers.parent().addClass('oe_hidden');
        updatePointClient(pointFid, $.P_ECMD[indexP_ECMD].Id_client);
        history = { "Type_Fid": $popup_list_offers.data().Type_Fid, "Point_Cons": totalpoint, "meta": meta };
        console.log(history);
        ckeckFid = true;
        pointFid = 0;
    }

    function addFidClientCDX() {
        if ($('offers.selected').length) {
            var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            var listline = $.P_ECMD[indexP_ECMD].lineorder;
            var data = $('offers.selected').data();
            var newline;
            newline = {
                'idproduct': data.id,
                'name': "Cadeau",
                'price': 0,
                'umvente': "unité",
                'total': 0,
                'qte': 1,
                'note': "Cadeau",
                'rem': 0
            };
            listline.push(newline);
            $.P_ECMD[indexP_ECMD].lineorder = listline;
            localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
            $popup_list_offers.parent().addClass('oe_hidden');
            updatePointClient(pointFid, $.P_ECMD[indexP_ECMD].Id_client);
            history = { "Type_Fid": $popup_list_offers.data().Type_Fid, "Point_Cons": $('offers.selected .offer-name').text(), "meta": data.id };
            console.log(history);
            pointFid = 0;
            ckeckFid = true;
        } else {
            $popup_list_offers.parent().addClass('oe_hidden');
        }
    }

    function addFid_client_remG() {
        if ($('offers.selected').length) {
            var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
            var listline = $.P_ECMD[indexP_ECMD].lineorder;
            var rem = $('offers.selected span').text();
            for (i in listline) {
                var total;
                total = parseFloat(parseFloat(listline[i].qte) * parseFloat(listline[i].price) * (1 - parseFloat(rem) / 100)).toFixed(2);
                $.P_ECMD[indexP_ECMD].lineorder[i].total = total;
                $.P_ECMD[indexP_ECMD].lineorder[i].rem = parseFloat(rem);
                $.P_ECMD[indexP_ECMD].lineorder[i].note = "Rem Golbal " + rem;
                console.log($.P_ECMD[indexP_ECMD].lineorder[i].note);
            }
            updateTotal();
            localStorage.setItem('P_ECMD', JSON.stringify($.P_ECMD));
            $popup_list_offers.parent().addClass('oe_hidden');
            updatePointClient(pointFid, $.P_ECMD[indexP_ECMD].Id_client);
            history = { "Type_Fid": $popup_list_offers.data().Type_Fid, "Point_Cons": $('offers.selected .offer-name').text(), "meta": rem };
            console.log(history);
            ckeckFid = true;
            pointFid = 0;
        } else {
            $popup_list_offers.parent().addClass('oe_hidden');
        }

    }

    function updateTotal() {
        var indexP_ECMD = $.getindexP_ECMD_byId_Ecmd($.Id_Ecmd);
        var listline = $.P_ECMD[indexP_ECMD].lineorder;
        total_payment = 0;
        for (i in listline) {
            total_payment += parseFloat(listline[i].total);
        }
        $paymentlines_container.html('<div class="paymentlines-empty"><div class="total">' + total_payment.toFixed(2) + ' DH</div><div class="message">Veuillez sélectionner une méthode de paiement.</div></div>');
    }

    function updatePointClient(Point, Id_client) {
        $.AjaxJson('Default.aspx/updatePointClient', "{'Point':'" + Point + "','Id_client':'" + Id_client + "'}");
    }

    function P_fidInsertHistory(Id_client, Type_Fid, Point_Cons, Meta) {
        $.AjaxJson('Default.aspx/P_fidInsertHistory', "{'Id_client':'" + Id_client + "','Type_Fid':'" + Type_Fid + "','Point_Cons':'" + Point_Cons + "','Meta':'" + Meta + "'}");
    }
});