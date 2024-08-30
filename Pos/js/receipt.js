$(document).ready(function() {
    var $receipt_screen = $('.receipt-screen.screen');
    var $product_screen = $('.product-screen.screen');
    var $commande = $receipt_screen.find(".button.next.highlight");
    var $htmlTicket;
    var $pos_sale_ticket = $receipt_screen.find('.pos-sale-ticket');
    var $btnprint = $receipt_screen.find('.button.print');
    var $username = $('.username');
    var observer = new MutationObserver(function(mutations) {
        if ($receipt_screen.is(":visible")) {
            $pos_sale_ticket.html('');
            if ($pos_sale_ticket.hasClass('Paiement')) {
                headerticket();
                list_P_LECMDby_Id_Ecmd();
                getTotalTicket();
                groupby_P_Reglementby_P_ECMD()
                $pos_sale_ticket.removeClass('Paiement');
                foterticket();
                //A4Imprement();


            }
            if ($pos_sale_ticket.hasClass('Ferme')) {
                var $btngroup = $('<div class="button print-group" style="background: #2fb1d1;color: white;"><i class="fa fa-print"></i> Imprimer Z</div>');
                $btnprint.html('<i class="fa fa-print"></i> Imprimer Detail');
                $btnprint.after($btngroup);
                $btngroup.on('click', this, function() {
                    $('body').css('visibility', 'hidden');
                    $pos_sale_ticket.css('visibility', 'visible');
                    $pos_sale_ticket.find('.receipt-orderlines').css('display', 'none');
                    $pos_sale_ticket.css({
                        'border': '0'
                    });
                    window.print();
                    $('body').css('visibility', 'visible');
                    $pos_sale_ticket.find('.receipt-orderlines').css('display', 'table');
                    $pos_sale_ticket.css({
                        'border': 'solid 1px rgb(220,220,220)'
                    });
                });
                headerticket_Z();
                list_P_LECMDby_Id_Session();
                groupby_P_Reglement();
                p_service();
                total_session();
                if ($.P_Pos.CheckEmail) {
                    let d = new Date,
                        dformat = [d.getMonth() + 1,
                            d.getDate(),
                            d.getFullYear()
                        ].join('/') + ' ' + [d.getHours(),
                            d.getMinutes(),
                            d.getSeconds()
                        ].join(':');
                    let $html = $pos_sale_ticket;
                    $html.find('table').css('margin', 'auto');

                    let data = {
                        html: $html.html(),
                        email: $.P_Pos.EmailSend,
                        subject: 'Z Lecture Jour ' + dformat,
                        from: $.P_Pos.Name_pos
                    }
                    sendEmail(data);
                }

            }
            if ($pos_sale_ticket.hasClass('avoir')) {
                $pos_sale_ticket.removeClass('avoir');
                headerticket();
                list_P_LECMDby_Id_Ecmd();
                getTotalTicket();
                foterticket();
            }


        } else {}
    });
    var target = document.querySelector('.receipt-screen.screen');
    observer.observe(target, {
        attributes: true
    });

    function A4Imprement() {
        var $btngroup = $('<div class="button print-group" style="background: #2fb1d1;color: white;"><i class="fa fa-print"></i> Imprimer A4</div>');
        $btnprint.html('<i class="fa fa-print"></i> Imprimer Detail');
        $btnprint.after($btngroup);
        $btngroup.on('click', this, function() {
            $('body').css('visibility', 'hidden');
            //$pos_sale_ticket.css('visibility', 'visible');
            $pos_sale_ticket.find('.receipt-orderlines').css('display', 'none');
            $pos_sale_ticket.css({
                'border': '0'
            });
            $('.pos .pos-content').css('top', 0);
            $('#print4A').attr('src', 'Modele_Imprimer/index.html?Id_entet=261');
            $('#print4A').css('visibility', 'visible');
            $('#print4A').removeClass('oe_hidden');
            $('#print4A').load(function() {
                if ($('#print4A').attr('src') != '') {
                    window.print();
                    $('body').css('visibility', 'visible');
                    $pos_sale_ticket.find('.receipt-orderlines').css('display', 'table');
                    $pos_sale_ticket.css({
                        'border': 'solid 1px rgb(220,220,220)'
                    });
                    $('.pos .pos-content').css('top', 48);
                    $('#print4A').attr('src', '');
                    $('#print4A').css('visibility', 'hidden');
                    $('#print4A').addClass('oe_hidden');
                }

            });

        });
    }
    $commande.on('click', this, function() {
        if ($pos_sale_ticket.hasClass('Ferme')) {
            location.reload();
            localStorage.removeItem('P_ECMD');
        } else {
            $product_screen.removeClass('oe_hidden');
            $receipt_screen.addClass('oe_hidden');
        }

        //$('.client-info').text(NomClient_CPT_FAC[1]);
        //$('.client-info').attr('data-cpt-fac', NomClient_CPT_FAC[0]);
    });
    $btnprint.on('click', this, function() {
        $('body').css('visibility', 'hidden');
        $pos_sale_ticket.css('visibility', 'visible');
        $pos_sale_ticket.css({
            'border': '0'
        });
        window.print();
        $('body').css('visibility', 'visible');
        $pos_sale_ticket.css({
           'border': 'solid 1px rgb(220,220,220)'
        });
        //PrintElem();
        //return true;
    });

    function list_P_LECMDby_Id_Ecmd() {
        var list = $.AjaxJson('Default.aspx/list_P_LECMDby_Id_Ecmd', '{"Id_Ecmd":"' + $.Id_Ecmd + '"}');
        var $htmlbodyarticle = '<table class="receipt-orderlines"><colgroup><col width="30%"><col width="20%"><col width="20%"><col width="30%"></colgroup><tbody></tbody></table>';
        $pos_sale_ticket.append($htmlbodyarticle);
        $pos_sale_ticket.find('.receipt-orderlines').append('<tr><td>Article</td><td class="pos-right-align">Qte</td><td class="pos-right-align">Prix</td><td class="pos-right-align">Total</td></tr>');
        for (i in list) {
            if (list[i].Lgn_remise > 0) {
                $pos_sale_ticket.find('.receipt-orderlines').append('<tr><td>' + list[i].Libele_Art +
                    '<div class="pos-disc-font">Avec un(e) ' + list[i].Lgn_remise +
                    '% de remise</div></td><td class="pos-right-align">' + list[i].Lgn_qtt +
                    '</td><td class="pos-right-align">' + list[i].Lgn_prix.toFixed(2) +
                    '</td><td class="pos-right-align">' + list[i].Lgn_mntttc.toFixed(2) + ' DH</td></tr>');
            } else {
                $pos_sale_ticket.find('.receipt-orderlines').append('<tr><td>' + list[i].Libele_Art +
                    '</td><td class="pos-right-align">' + list[i].Lgn_qtt +
                    '</td><td class="pos-right-align">' + list[i].Lgn_prix.toFixed(2) +
                    '</td><td class="pos-right-align">' + list[i].Lgn_mntttc.toFixed(2) + ' DH</td></tr>');
            }
        }

    }

    function getTotalTicket() {
        var TotalTicket = $.AjaxJson('Default.aspx/TotalTicket', '{"Id_Ecmd":"' + $.Id_Ecmd + '"}');
        var $htmlbodytotal = '<table class="receipt-total"><tbody><tr class="emph"><td>Total:</td><td class="pos-right-align">' + TotalTicket + ' DH</td></tr></tbody></table>';
        $pos_sale_ticket.append($htmlbodytotal);
    }

    function groupby_P_Reglementby_P_ECMD() {
        var list = $.AjaxJson('Default.aspx/groupby_P_Reglementby_P_ECMD', '{"Id_Ecmd":"' + $.Id_Ecmd + '"}');
        var $htmlbodyarticle = '<hr><table class="receipt-groupReglement"><colgroup><col width="33%"><col width="33%"><col width="33%"></colgroup><tbody><th>Règlement</th><th class="pos-right-align">Presenter</th><th class="pos-right-align">Rendu</th></tbody></table>';
        $pos_sale_ticket.append($htmlbodyarticle);
        for (i in list) {
            $pos_sale_ticket.find('.receipt-groupReglement').append('<tr><td>' + list[i].Mod_rglm +
                '</td><td class="pos-right-align">' + list[i].MontantPresenter.toFixed(2) +
                ' DH</td><td class="pos-right-align">' + list[i].MontAntRendu.toFixed(2) + ' DH</td>' +
                '</tr>');
        }
    }

    function PrintElem() {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write($pos_sale_ticket.html());
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    }

    function headerticket() {
        if ($.avoir) {
            var $htmlheaderticket = '<div class="pos-center-align titel">' + $.P_Pos.Pos_Titre +
                '</div><div class="pos-center-align">' + $.P_Pos.Pos_sousTitre + '</div><div class="pos-center-align">AVOIR</div><br>';
        } else {
            var $htmlheaderticket = '<div class="pos-center-align titel">' + $.P_Pos.Pos_Titre +
                '</div><div class="pos-center-align">' + $.P_Pos.Pos_sousTitre + '</div><br>';
        }
        $pos_sale_ticket.append($htmlheaderticket);
        let list = getHeaderTicket();
        let fullDate = list.date;
        let heure = list.time;
        let op = list.Name_Caissier;
        let client = list.Nom_Client;
        var $htmlheureticket = '<hr><table style="margin: auto;"><tbody style=""><tr><td>N.Ticket : ' + $.Id_Ecmd + '</td><td>' + fullDate + ' - ' + heure + '</td></tr></tbody></table>';
        $pos_sale_ticket.append($htmlheureticket);
        if ($.P_Pos.Type_Plan) {
            var $htmlinfoticket = '<table style="margin: auto;"><tbody><tr style=""><td style="">OP:' + op + '</td><td>  /SR:' + return_numservuer() + '</td><td>  /TB:' + $('.order-button.floor-button').attr('data-id') + '</td></tr></tbody></table><div>CL:' + $('.client-info').attr('data-cpt-fac') + '-' + $('.client-info').text() + '</div><hr>'
        } else {
            var $htmlinfoticket = '<table style="margin: auto;"><tbody><tr style=""><td>OP : ' + op +
                '</td><td>Cl : ' + client + '</td></tr></tbody></table><hr>';
        }
        $pos_sale_ticket.append($htmlinfoticket);


    }

    function getHeaderTicket() {
        let list = $.AjaxJson('Default.aspx/getHeaderTicket', '{"Id_Ecmd":"' + $.Id_Ecmd + '"}')[0];
        return list;
    }

    function getHeaderTicket_z() {
        let list = $.AjaxJson('Default.aspx/getHeaderTicket_z', '{"Id_Session":"' + $.P_Session + '"}')[0];
        return list;
    }

    function headerticket_Z() {
        //$receipt_screen.find('.top-content h1').html('');
        var $htmlheaderticket = '<div class="pos-center-align titel">' + $.P_Pos.Pos_Titre +
            '</div><div class="pos-center-align">' + $.P_Pos.Pos_sousTitre + '</div><br>';
        $pos_sale_ticket.append($htmlheaderticket);
        var $htmlTitel = '<div class="pos-center-align titel">Z LECTURE JOUR</div>';
        $pos_sale_ticket.append($htmlTitel);
        let list = getHeaderTicket_z();
        let fullDate = list.date;
        let heure = list.time;
        let op = list.Name_Caissier;
        var $htmlheureticket = '<hr><table style="margin: auto;"><tbody style=""><tr><td>OP :</td><td>' + op + '</td><td>Service</td><td>' + fullDate + ' - ' + heure + '</td></tr></tbody></table><hr>';
        $pos_sale_ticket.append($htmlheureticket);

    }

    function list_P_LECMDby_Id_Session() {
        var list = $.AjaxJson('Default.aspx/list_P_LECMDby_Id_Session', '{"Id_Session":"' + $.P_Session + '"}');
        var $htmlbodyarticle = '<table class="receipt-orderlines"><colgroup><col width="50%"><col width="25%"><col width="25%"></colgroup><tbody></tbody></table>';
        $pos_sale_ticket.append($htmlbodyarticle);
        for (i in list) {
            if (list[i].Lgn_remise > 0) {
                $pos_sale_ticket.find('.receipt-orderlines').append('<tr><td>' + list[i].Libele_Art +
                    '<div class="pos-disc-font">Avec un(e) ' + list[i].Lgn_remise +
                    '% de remise</div></td><td class="pos-right-align">' + list[i].Lgn_qtt +
                    '</td><td class="pos-right-align">' + list[i].Lgn_mntttc.toFixed(2) + ' DH</td></tr>');
            } else {
                $pos_sale_ticket.find('.receipt-orderlines').append('<tr><td>' + list[i].Libele_Art +
                    '</td><td class="pos-right-align">' + list[i].Lgn_qtt +
                    '</td><td class="pos-right-align">' + list[i].Lgn_mntttc.toFixed(2) + ' DH</td></tr>');
            }
        }

    }

    function groupby_P_Reglement() {
        console.log($.P_Pos.Code_typ)
        var list = $.AjaxJson('Default.aspx/groupby_P_Reglement', '{"Id_Session":"' + $.P_Session + '"}');
        var $htmlbodyarticle = '<hr><table class="receipt-groupReglement"><colgroup><col width="25%"><col width="25%"><col width="25%"><col width="25%"></colgroup><tbody><th>Règlement</th><th class="pos-right-align">Presenter</th><th class="pos-right-align">Rendu</th><th class="pos-right-align">Total</th></tbody></table>';
        $pos_sale_ticket.append($htmlbodyarticle);
        for (i in list) {
            $pos_sale_ticket.find('.receipt-groupReglement').append('<tr><td>' + list[i].Mod_rglm +
                '</td><td class="pos-right-align">' + list[i].MontantPresenter.toFixed(2) +
                ' DH</td><td class="pos-right-align">' + list[i].MontAntRendu.toFixed(2) + ' DH</td>' +
                '</td><td class="pos-right-align">' + list[i].Total.toFixed(2) + ' DH</td>' +
                '</tr>');
        }
    }

    function total_session() {
        var list = $.AjaxJson('Default.aspx/total_session', '{"Id_Session":"' + $.P_Session + '","Id_dossier":"' + $.P_Pos.Id_dossier + '"}')[0];
        var $htmlbodyarticle = '<hr><table class="receipt-total_session"><colgroup><col width="50%"><col width="50%"></colgroup><tbody></tbody></table>';
        $pos_sale_ticket.append($htmlbodyarticle);
        if (list) {
            var Total_Espece = parseFloat(list.Total_Espece + list.Solde_Open + service).toFixed(2);
            $pos_sale_ticket.find('.receipt-total_session').append('<tr><td>SOLDE OUVER : </td><td class="pos-right-align">' + list.Solde_Open.toFixed(2) +
                ' DH</td></tr><tr><td>TOTAL ES : ' +
                '</td><td class="pos-right-align">' + Total_Espece + ' DH</td></tr>' +
                '<tr><td>SOlDE FERME : </td><td class="pos-right-align">' + parseFloat(list.Solde_Close).toFixed(2) + ' DH</td></tr>');
            var $htmlbodytotal = '<table class="receipt-total"><tbody><tr class="emph"><td>Total:</td><td class="pos-right-align">' + parseFloat(list.Total).toFixed(2) + ' DH</td></tr></tbody></table>';
            $pos_sale_ticket.append($htmlbodytotal);
        }
    }

    function foterticket() {
        var $htmlheaderticket = '<br><br><br><div class="pos-center-align">' + $.P_Pos.P_msg + '</div><div style="display: flex;justify-content: center;"><img id="barcode" /></div>';
        $pos_sale_ticket.append($htmlheaderticket);
        JsBarcode("#barcode", pad_with_zeroes($.Id_Ecmd, 12), {
            format: "EAN13",
            displayValue: false,
            fontSize: 20,
            height: 25
        });
    }

    function return_numservuer() {
        var numfservuer = "";
        return numfservuer;
    }
    var service = 0;

    function p_service() {
        var list = $.AjaxJson('Default.aspx/p_service', '{"Id_Session":"' + $.P_Session + '"}');
        if (list.length) {
            console.log(list.length)
            var $htmlbodyarticle = $('<hr><table class="receipt-service"><colgroup><col width="10%"><col width="50%"></colgroup><tbody></tbody></table>');
            $pos_sale_ticket.append($htmlbodyarticle);
            for (i in list) {
                $pos_sale_ticket.find('.receipt-service').append('<tr><td>' + list[i].Desc_typ + '</td><td>' + list[i].total.toFixed(2) + ' DH</td></tr>');
                service = parseFloat(parseFloat(service) + parseFloat(list[i].total));
            }
            //$pos_sale_ticket.append($htmlbodyarticle);
            console.log(service);
        }
    }

    function pad_with_zeroes(number, length) {

        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }

        return my_string;

    }

    function sendEmail(data) {
        console.log(data)
        var list = $.AjaxJson('Default.aspx/sendEmail', JSON.stringify(data));
    }

});