
import { articleByFamille, favorisArticle } from './component.js';
$(document).ready(function () {
    var $numpad = $.product_screen.find('.numpad');
    $.famile_list.on('click', '.famile', function () {
        let idFamille = $(this).attr('idFamille');
        articleByFamille(idFamille);
    });
    $.btnfavorite.on('click', this, function () {
        favorisArticle();
    });
    $.product_screen.find('.product-list').on('click', '.product', function () {
        let $article = $(this);
        let articleData = $article.data('info');
        let umvente = $article.attr('ar-umvente');
        articleData.umvente = umvente;
        articleData.qte = 1;
        articleData.total = articleData.prixVente_TTC;
        articleData.rem = 0;
        if (!pos.lineorder.length) {
            $.order.html('');
            let $ul = $('<ul class="orderlines"></ul>');
            let $li = html_list_orderline(articleData);
            selectorderline($li);
            $.order.append($ul);
            $ul.append($li);
            $.order.append($ul);
            let $summary = $(`<div class="summary clearfix">
            <div class="line">
            <div class="entry total">
            <span class="badge">Total: </span><span class="value">` + articleData.prixVente_TTC + `</span></div></div></div>`);
            $.order.append($summary);
            addline(articleData);
        } else {
            let $orderlines = $('.orderlines');
            if (findorder(articleData.idArticle)) {
                selectorderline_idproduct(articleData.idArticle);
                udpateqte_line(articleData.idArticle);
            } else {
                numpadqte = 0;
                let $li = html_list_orderline(articleData);
                $orderlines.append($li);
                selectorderline($li);
                addline(articleData);
            }
        }
        f_totalprice();
        $('.searchbox input').val('');
        // let url = 'namear=' + name.substring(0, 9) + '&prix=' + price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
        // $.disply2(url);
        // $.setJsonScreen(pos.lineorder);
    });
    $.order.on('click', 'li.orderline', function () {
        numpadqte = 0;
        selectorderline($(this));
    });
    $.order.on('click', 'li.commandorder', function () {
        numpadqte = 0;
        selectcommandorderline($(this));
    });
    $numpad.on('click', '.mode-button', function () {
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
    $numpad.on('click', '.input-button.number-char', function () {
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
    $numpad.on('click', '.input-button.numpad-minus', function () {
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
    $numpad.on('click', '.input-button.numpad-backspace', function () {
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
});
var numpadqte;
var numpadprix;
var numpadrem;
var point;
var type = 'Qté';
const html_list_orderline = function (data) {
    let $li = $(`<li class="orderline" data-product-id=` + data.idArticle + `>
    <span class="product-name">` + data.nomArticle + `</span>
    <span class="price">` + parseFloat(data.prixVente_TTC).toFixed(2) + ` DH</span>
    <ul class="info-list">
    <li class="info">
    <em>` + parseFloat(data.qte).toFixed(2) + `</em>  <h5>` + data.umvente + `</h5>,
    <span>` + parseFloat(data.prixVente_TTC).toFixed(2) + ` DH</span>  </li></ul></li>`);
    $li.data('info', data);
    return $li;
}
const selectorderline = function ($el) {
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
const addline = function (data) {
    let newline;
    let lgnTTC = data.prixVente_TTC * data.qte;
    let lgnHT = data.prixAchat_HT * data.qte;
    newline = {
        'idArticle': data.idArticle,
        'refArticle': data.refArticle,
        'descLign': data.nomArticle,
        'prixTTC': data.prixVente_TTC,
        'prixHT': data.prixAchat_HT,
        'lgnTTC': lgnTTC,
        'lgnHT': lgnHT,
        'lgnRemise': 0,
        'lgnTva': data.cauxTaxeVente,
        'qteLing': data.qte,
    };
    pos.lineorder.push(newline);
    count_line();

}
const count_line = function () {
    let count = 0;
    for (let i in pos.lineorder) {
        count += parseFloat(pos.lineorder[i].qte);
    }
    $('#count-lient').text(count);
}
const findorder = function (idArticle) {
    let check = false;
    for (let i = 0; i < pos.lineorder.length; i++) {
        if (pos.lineorder[i].idArticle == idArticle) {
            check = true;
            break;
        }
    }
    return check;
}
const f_totalprice = function () {
    let totalprice = 0;
    pos.lineorder.map(function (e) {
        totalprice += parseFloat(e.lgnTTC);
    });
    $.order.find('.value').first().text(totalprice.toFixed(2) + ' DH');
}
const selectorderline_idproduct = function (idproduct) {
    console.log($('.orderline'))
    $('.orderline').each(function (i) {
        console.log($(this).attr('data-product-id'))
        if ($(this).attr('data-product-id') == idproduct) {
            console.log($(this))
            selectorderline($(this));
            false;
        }
    });
}
const udpateqte_line = function (idproduct) {
    let $getqte = getqte();
    let $prix = getprix();
    let qte = 0;
    qte = parseFloat(getqte_line(idproduct)) + 1;
    $getqte.text(qte);
    updateLineOrderQte(idproduct, qte);
    $prix.text(parseFloat(getlgnTTC(idproduct)).toFixed(2) + ' DH');
    count_line();
}
const getqte_line = function (idArticle) {
    return pos.lineorder.find(x => x.idArticle == idArticle).qteLing;
}
const updateLineOrderQte = function (idArticle, qte) {
    for (let i in pos.lineorder) {
        if (pos.lineorder[i].idArticle == idArticle) {
            let lgnTTC = (pos.lineorder[i].prixTTC * qte) * (1 - pos.lineorder[i].lgnRemise / 100);
            let lgnHT = (pos.lineorder[i].prixHT * qte) * (1 - pos.lineorder[i].lgnRemise / 100);
            pos.lineorder[i].qteLing = qte;
            pos.lineorder[i].lgnTTC = lgnTTC;
            pos.lineorder[i].lgnHT = lgnHT;

        }
    }
}
const getlgnTTC = function (idArticle) {
    return pos.lineorder.find(x => x.idArticle == idArticle).lgnTTC;
}
const getlineorderby_id = function (idArticle) {
    return pos.lineorder.find(x => x.idArticle == idArticle);
}
const getrem_line = function (idArticle) {
    return pos.lineorder.find(x => x.idArticle == idArticle).rem;
}
const getprice_line = function (idArticle) {
    return pos.lineorder.find(x => x.idArticle == idArticle).prixVente_TTC;
}
const getqte = function () {
    return getselected().find('.info em');
}
const getprix = function () {
    return getselected().find('.price');
}

const getselected = function () {
    if ($.order.find('.selected').hasClass('orderline')) {
        return $.order.find('li.orderline.selected');
    } else if ($.order.find('.selected').hasClass('nonecommander')) {
        return $.order.find('li.nonecommander.selected');
    } else {
        return $.order.find('li.orderline.selected');
    }
}
const selectcommandorderline = function ($el) {
    $('.commandorder').removeClass('selected');
    $('.orderline').removeClass('selected');
    $el.addClass('selected');
    numpadprix = 0;
    numpadrem = 0;
}
const Qte = function (number) {
    let $selected = getselected();
    if ($selected.length >= 0) {
        let $getqte = getqte();
        let $prix = getprix();
        let idproduct = $selected.attr('data-product-id');
        let lineorder = getlineorderby_id(idproduct);
        let qte;
        if (lineorder.qteLing.toString() == '0') {
            if (number == '.') {
                qte = '0.';
            } else {
                qte = number;
            }
        } else
            if (numpadqte) {
                qte = lineorder.qteLing.toString() + number.toString();
            } else {
                qte = number.toString();
                numpadqte = 1;
            }
        $getqte.text(qte);
        updateLineOrderQte(idproduct, qte);
        $prix.text(parseFloat(getlgnTTC(idproduct)).toFixed(2) + ' DH');
        f_totalprice();
        // var url = 'namear=' + lineorder.name.substring(0, 9) + '&prix=' + lineorder.price + 'DH&total=' + totalPayment().toFixed(2) + 'DH&state=a';
        // $.disply2(url);
        // $.setJsonScreen($.lineorder);

    }
}
const rem = function (number) {
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
