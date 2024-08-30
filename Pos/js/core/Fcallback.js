this.list_Insert_V_LCMD = [];
this.list_Insert_V_ECMD = [];

function fcallback() {

    this.sys_message = function(MSG_ID) {
        var msg;
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/sys_message',
            async: false,
            data: "{'MSG_ID':'" + MSG_ID + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                msg = data.d
                    //return msg;
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
        return msg;
    }
    this.update_V_ECMD_V_LCMD = function(TOTAL) {
        $.ajax({
            type: 'POST',
            url: 'Sys_Pos.aspx/update_V_ECMD_V_LCMD',
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
}

function fcallback_object(object) {


}
$(document).ready(function() {
    $.product_screen = $('.product-screen.screen');
    $.floor_screen = $('.floor-screen.screen');
    $.login_screen = $('.login-screen.screen');
    $.payment_screen = $('.payment-screen.screen');
    $.receipt_screen = $('.receipt-screen.screen');
    $.archive_screen = $('.archive-screen.screen');
    $.product_list = $('.product-screen.screen').find('.product-list');
    $.famile_list = $('.product-screen.screen').find('.famile-list');
    $.order_button_floor = $('.order-selector').find('.order-button.floor-button');
    $.order = $('.order');
    $.order_button = $('.order-button,.orders.touch-scrollable,.oe_status .searchbox');
    $.Favoris_Article;
    $.offer_Article;
    $.P_Pos;
    $.P_Caissier;
    $.P_Session;
    $.P_Serveur;
    $.Id_Table;
    $.Name_Table;
    $.Id_Ecmd;
    $.P_ECMD = [];
    $.lineorder = [];
    $.avoir = false;
    //$.Id_Ecmd = 0;
    $.get_orders = function(index) {
        var list = $.P_ECMD[index].lineorder;
        $.lineorder = list;
        if (list.length) {
            $.order.html('');
            var $ul = $('<ul class="orderlines"></ul>');
            for (i in list) {
                var $li = $('<li class="orderline" data-product-id="' + list[i].idproduct + '">' +
                    '<span class="product-name">' + list[i].name + '</span>' +
                    '<span class="price">' + parseFloat(list[i].total).toFixed(2) + ' DH</span><ul class="info-list">' +
                    '<li class="info"><em>' + parseFloat(list[i].qte).toFixed(2) + '</em>  <h5>unité</h5>, <span>' + parseFloat(list[i].price).toFixed(2) + ' DH</span>' +
                    '  </li></ul></li>');
                if (list[i].rem != 0) {
                    $li.find('.info-list').append("<li class='info rem'>With a <b>" + list[i].rem + "%</b> dicount</li>");
                }
                if (list[i].note != '') {
                    $li.find('.info-list').append('<li class="info orderline-note"><i aria-label="Note" class="fa fa-tag" role="img" title="Note"></i>' + list[i].Note_LECMD + '</li>');
                }
                $.order.append($ul);
                $ul.append($li);
            }
            var $summary = $('<div class="summary clearfix"><div class="line"><div class="entry total"><span class="badge">Total: </span><span class="value"></span></div></div></div>');
            $.order.append($summary);
            $.f_totalprice();
        } else {
            $.order.html('<div class="order-empty"><h1>Votre panier est vide</h1></div>');
        }

    }
    $.getindexP_ECMD_byId_Ecmd = function(Id_Ecmd) {
        var index = -1;
        for (var i = 0; i < $.P_ECMD.length; i++) {
            if ($.P_ECMD[i].Id_Ecmd === Id_Ecmd) {
                index = i;
                break;
            }
        }
        return index;
    }
    $.f_totalprice = function() {
        var totalprice = 0;
        $.order.find('.price').each(function() {
            totalprice += parseFloat($(this).text());
        });
        $.order.find('.value').first().text(totalprice.toFixed(2) + ' DH');
    }
    $.AjaxJson = function(url, data) {
            var list;
            $.ajax({
                type: 'POST',
                url: url,
                async: false,
                data: data,
                contentType: 'application/json; charset =utf-8',
                success: function(data) {
                    list = data.d;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    //alertify.error(err.Message);
                    console.log(err.Message);
                }
            });
            return list;
        }
        //com3
    $.disply2 = function(url) {
        var url = 'http://localhost:5000/article?' + url
        try {
            var request = new XMLHttpRequest()
            request.open('GET', url, true);
            request.send()
        } catch (err) {
            console.log(err.message);
        }
    }
    $.solde_encore = function() {
        var solde = $.AjaxJson('Default.aspx/solde_encore', "{'Id_Session':'" + $.P_Session + "'}");
        return solde;
    }
    $.setJsonScreen = function(data) {
        let d = {
            data: JSON.stringify(data),
            fileName: 'dataScreen' + $.P_Pos.Ip.replaceAll(".", "") + '.txt'
        };
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/setJsonScreen',
            async: false,
            data: JSON.stringify(d),
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                //console.log(JSON.parse(data.d));
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
    }
});