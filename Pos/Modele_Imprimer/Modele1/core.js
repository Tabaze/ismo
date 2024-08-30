$(document).ready(function() {
var $pos_sale_ticket = $('.pos-sale-ticket');
const load=function(){
    let url_string = window.location.href;
    let url = new URL(url_string);
    let name = url.searchParams.get("name");
    switch(name){
        case 'Paiement': break;
        case 'Ferme': break;
        case 'avoir': break;
    }
}
const headerticket=function(name) {
    if (name=='avoir') {
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
});