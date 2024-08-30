var $archives = $('.archives');
var session_list = [];
var ticket_list = [];
var $btn_print = $('.btn-print button');
var $btn_back = $('.pos-branding .Return-button');
var $btn_history = $('.btn-history');
var check_session = true;
var observer = new MutationObserver(function (mutations) {

    if ($.archive_screen.is(":visible")) {
        $btn_back.removeClass('oe_hidden');
        $('.client-info').addClass('oe_hidden');
        load();
        check_session = true;
    } else {
        $btn_back.addClass('oe_hidden');
        $('.client-info').removeClass('oe_hidden');
        check_session = true;
    }

});
var target = document.querySelector('.archive-screen.screen');
observer.observe(target, {
    attributes: true
});
$btn_history.on('click', '.button.ticket', function () {
    if (check_session) {
        var Id_Session = $archives.find('li.archive.selected').attr("data-id");
        list_ticket(Id_Session);
        check_session = false;
        //$(this).text("Selection Fermetur");
    } else {
        load();
        check_session = true;
        ///$(this).text("Selection Ticket");
    }
    
});
$archives.on('click', 'li.archive', function () {
    selectorderline($(this));    
    if (check_session) {
        var session = find_session($(this).attr('data-id'));
        render_details_session(session);
    } else {
        var ticket = find_ticket($(this).attr('data-id'));
        render_details_ticket(ticket);
    }
    
});
$btn_print.on('click', this, function () {
    if (check_session) {
        $.P_Session = $archives.find('li.selected').attr('data-id');
        $.archive_screen.addClass('oe_hidden');
        $.receipt_screen.find('.pos-sale-ticket').addClass('Ferme');
        $.receipt_screen.removeClass('oe_hidden');
    } else {
        $.Id_Ecmd = $archives.find('li.selected').attr('data-id');
        $.archive_screen.addClass('oe_hidden');
        $.receipt_screen.find('.pos-sale-ticket').addClass('Paiement');
        $.receipt_screen.removeClass('oe_hidden');
    }

});
var codebar = '';
$(document).on("keypress", function (e) {
    if ($.archive_screen.is(":visible")) {
        if (e.keyCode == 13) {
            if (codebar != '') {
                find_codebar(codebar);
            }
            codebar = '';
            e.preventDefault();
            return false;
        } else {
            codebar += e.key;
        }
    } else {
        codebar = '';
    }
});
function load() {
    $btn_history.find('.button.ticket').text('Selection Ticket');
    $btn_print.html('<i class="fa fa-print" role="img" title="print"></i> Impreme Z');
    $archives.html('');
    session_list = $.AjaxJson('Default.aspx/p_list_session', '{"Id_dossier":"' + $.P_Pos.Id_dossier + '","Id_Caissier":"' + $.P_Caissier.Id_Caissier + '"}');
    for (i in session_list) {
        if (session_list[i].Caissier_Close == null && session_list[i].Date_Close == null) {
            $archives.prepend('<li class="archive" style="background-color: #2fb1d1;color: white;" data-id="' + session_list[i].Id_Session + '">' +
                '<span class="caissier-name">' + session_list[i].Caissier_Open + '</span>' +
                '<span class="colse-date">' + session_list[i].Date_Open + '</span>' +
                ' <ul class="info-archive">' +
                '<li><span class="solde-close" style="color:red">Encours</span></li></ul></li>');
        } else {
            $archives.append('<li class="archive" data-id="' + session_list[i].Id_Session + '">' +
                '<span class="caissier-name">' + session_list[i].Caissier_Close + '</span>' +
                '<span class="colse-date">' + session_list[i].Date_Close + '</span>' +
                ' <ul class="info-archive">' +
                '<li><span class="solde-close">Montant Clôture :' + session_list[i].Solde_Close + '</span></li></ul></li>');
        }

    }    
    if (session_list) {
        var $li = $archives.find('li').first();
        selectorderline($li);
        render_details_session(session_list[0])
    }  
}
function selectorderline($el) {
    $('.archive').removeClass('selected');    
    $el.addClass('selected');
}
function render_details_session(session) {
    $('#details').html('<table><tr><td></td><td class="titels-details">Date</td><td class="titels-details">Nom Caissier</td><td class="titels-details">Solde</td></tr>'
                              + '<tr><td class="titels-details">Ouverte : </td><td>' + session.Date_Open + '</td><td>' + session.Caissier_Open + '</td><td>' + session.Solde_Open + '</td></tr>'
                              + '<tr><td class="titels-details">Fermer : </td><td>' + session.Date_Close + '</td><td>' + session.Caissier_Close + '</td><td>' + session.Solde_Close + '</td></tr></table>');
    list_P_LECMD_details(session.Id_Session);
}
function list_P_LECMD_details(Id_Session) {
    var list = $.AjaxJson('Default.aspx/list_P_LECMD_details', '{"Id_Session":"' + Id_Session + '"}');
    $('#table-lgn').html('<tr class="header-lgn"><td>Ref</td><td>Libele</td><td>Qt</td><td>Prix</td><td>Remise</td><td>Total</td></tr>');
    for (i in list) {
        if (list[i].Code_typ == 'BRC') {
            $('#table-lgn').append('<tr class="red"><td>' + list[i].Ref_article + '</td><td>' + list[i].Libele_Art + '</td><td>' + list[i].Lgn_qtt + '</td><td class="money">' + list[i].Lgn_prix + ' DH</td><td>' + list[i].Lgn_remise + '%</td><td class="money">' + list[i].Lgn_mntttc * (-1) + ' DH</td></tr>');
        } else {
            $('#table-lgn').append('<tr><td>' + list[i].Ref_article + '</td><td>' + list[i].Libele_Art + '</td><td>' + list[i].Lgn_qtt + '</td><td class="money">' + list[i].Lgn_prix + ' DH</td><td>' + list[i].Lgn_remise + '%</td><td class="money">' + list[i].Lgn_mntttc + ' DH</td></tr>');
        }
    }
}
function find_session(Id_Session) {
    var sessionbyid = [];
    for (i in session_list) {
        if (session_list[i].Id_Session == Id_Session) {
            sessionbyid = session_list[i];
        }
    }
    return sessionbyid;
}
function list_ticket(Id_Session) {
    $btn_history.find('.button.ticket').text('Selection Z-Jur');
    $btn_print.html('<i class="fa fa-print" role="img" title="print"></i> Impreme Ticket');
    $archives.html('');
    ticket_list = $.AjaxJson('Default.aspx/p_list_ticket', '{"Id_Session":"' + Id_Session + '"}');
    for (i in ticket_list) {
        $archives.append('<li class="archive" data-id="' + ticket_list[i].Id_Ecmd + '">' +
            '<span class="caissier-name">#' + ticket_list[i].Id_Ecmd + '/ ' + ticket_list[i].mrgl_Default + '</span>' +
            '<span class="colse-date">' + ticket_list[i].Tt_ttc + 'DH</span>' +
            ' <ul class="info-archive">' +
            '<li><span class="solde-close">' + ticket_list[i].Nom_Client + '</span></li></ul></li>');
    }
    if (ticket_list) {
        var $li = $archives.find('li').first();
        selectorderline($li);
        render_details_ticket(ticket_list[0])
    }
}
function render_details_ticket(ticket) {
    var d = new Date(ticket.Date_Ecmd.match(/\d+/)[0] * 1);
    var time = d.getHours() + ':' + d.getMinutes();
    $('#details').html('<table><tr><td class="titels-details">Heure</td><td class="titels-details">Total TTC</td><td class="titels-details">Total TVA</td><td class="titels-details">Total Remis</td></tr>'
                              + '<tr><td class="titels-details">' + time + '</td><td>' + ticket.Tt_ttc + '</td><td>' + ticket.Tt_tva + '</td><td>' + ticket.Tt_remis + '</td></tr></table>');
    list_P_LECMD_details_byticket(ticket.Id_Ecmd);
}
function list_P_LECMD_details_byticket(Id_Ecmd) {
    var list = $.AjaxJson('Default.aspx/list_P_LECMDby_Id_ecmd', '{"Id_Ecmd":"' + Id_Ecmd + '"}');
    $('#table-lgn').html('<tr class="header-lgn"><td>Ref</td><td>Libele</td><td>Qt</td><td>Prix</td><td>Remise</td><td>Total</td></tr>');
    for (i in list) {
        if (list[i].Code_typ == 'BRC') {
            $('#table-lgn').append('<tr class="red"><td>' + list[i].Ref_article + '</td><td>' + list[i].Libele_Art + '</td><td>' + list[i].Lgn_qtt + '</td><td class="money">' + list[i].Lgn_prix + ' DH</td><td>' + list[i].Lgn_remise + '%</td><td class="money">' + list[i].Lgn_mntttc * (-1) + ' DH</td></tr>');
        } else {
            $('#table-lgn').append('<tr><td>' + list[i].Ref_article + '</td><td>' + list[i].Libele_Art + '</td><td>' + list[i].Lgn_qtt + '</td><td class="money">' + list[i].Lgn_prix + ' DH</td><td>' + list[i].Lgn_remise + '%</td><td class="money">' + list[i].Lgn_mntttc + ' DH</td></tr>');
        }
    }
}
function find_ticket(Id_Ecmd) {
    var ticketbyid = [];
    for (i in ticket_list) {
        if (ticket_list[i].Id_Ecmd == Id_Ecmd) {
            ticketbyid = ticket_list[i];
        }
    }
    return ticketbyid;
}
function find_codebar(codebars) {
    var Id_Ecmd = parseInt(codebars);
    codebar = '';
    Id_Ecmd = Id_Ecmd.toString().substr(0, Id_Ecmd.toString().length - 1);
    //list_P_LECMD_details_byticket(Id_Ecmd);
    var ticket = $.AjaxJson('Default.aspx/list_P_ECMD_Id_ecmd', '{"Id_Ecmd":"' + Id_Ecmd + '"}')[0];
    if (ticket) {
        $btn_history.find('.button.ticket').text('Selection Z-Jur');
        $btn_print.html('<i class="fa fa-print" role="img" title="print"></i> Impreme Ticket');
        $archives.html('');
        var $li = $('<li class="archive" data-id="' + ticket.Id_Ecmd + '">' +
            '<span class="caissier-name">#' + ticket.Id_Ecmd + '/ ' + ticket.mrgl_Default + '</span>' +
            '<span class="colse-date">' + ticket.Tt_ttc + 'DH</span>' +
            ' <ul class="info-archive">' +
            '<li><span class="solde-close">' + ticket.Nom_Client + '</span></li></ul></li>');
        $archives.append($li);
       
        //$archives.append('<li class="archive" data-id="' + ticket.Id_Ecmd + '">' +
        //    '<span class="caissier-name">#' + ticket.Id_Ecmd + '/ ' + ticket.mrgl_Default + '</span>' +
        //    '<span class="colse-date">' + ticket.Tt_ttc + 'DH</span>' +
        //    ' <ul class="info-archive">' +
        //    '<li><span class="solde-close">' + ticket.Nom_Client + '</span></li></ul></li>');
        render_details_ticket(ticket);
        check_session = false;
    }
}