import { selectPays } from "../../../js/ModeleBase/component.js";
import { infoEntetById, listEntetLign } from "../../service.js";

$(document).ready(function () {
    selectPays($('#idPays'))
    load()
    $(window).on('beforeprint', this, function () {
        $('footer,header').show()
        $('#idPays').hide()
        console.log($('.orderNumber').text() );
        if ($('.orderNumber').text() == 'change here') $('.orderNumber').text('')
        if ($('.companyManager').text() == 'change here') $('.companyManager').text('')
        if ($('.adressDelivery').text() == 'change here') $('.adressDelivery').text('')
    });
    $(window).on('afterprint', this, function () {
        $('footer,header:first-of-type').hide()
        $('#idPays').show()
        console.log($('.orderNumber').text() );
        if ($('.orderNumber').text() == '') $('.orderNumber').text('change here')
        if ($('.companyManager').text() == '') $('.companyManager').text('change here')
        if ($('.adressDelivery').text() == '') $('.adressDelivery').text('change here')
    });
    $('footer,header:first-of-type').hide()
});
var idEntet, fact;
const info = (dt) => {
    $('.numFact').text(fact + ' ' + ittone.stringWithZero(dt.numFacture, 4))
    $('.dateEntet').text(moment(dt.dateEntet).format('DD-MM-YYYY'))
    $('.dateEcheache').text(moment(dt.dateEcheanche).format('DD-MM-YYYY'))
    $('.nom').text(dt.nom)
    $('.adressCLient').text(dt.adressCLient)
    $('.numeroTva').text(dt.numeroTva)
    $('.total').text(dt.TT_ht)
    $('.orderNumber').text(dt.orderNumber)
    $('.companyManager').text(dt.managerCompany)
    $('.adressDelivery').text(dt.deliveryAd)
}
const lines = (dt) => {
    let text = []
    dt.forEach(ele => {
        text.push(ele.hsCode ? ele.hsCode : '')
        $('#lines').append(`
        <tr>
            <td>${ele.descLign}</td>
            <td>${ele.prixHT.toFixed(2)}</td>
            <td>${ele.qteLign}</td>
            <td>${ele.lgnHT.toFixed(2)}</td>
        </tr>
        `)
    })
    $('.hsCode').text(text.filter(item => item !== '').join(', '))
}
const load = () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    idEntet = url.searchParams.get("id");
    fact = url.searchParams.get("name");
    let dt = infoEntetById({ id: idEntet })[0];
    info(dt)
    let line = listEntetLign({ id: idEntet });
    lines(line)
}