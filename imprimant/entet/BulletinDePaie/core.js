import { listImpressionBulletinPaie } from '../../service.js'
$(document).ready(function () {
    var idEntet;
    load();
    function load() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let info = listImpressionBulletinPaie({ idEntete: idEntet });
        console.log(info)
        infoEntet(info);
        listLignEntet(info);
    }
    $('#chnage_model').on('change', this, function () {
        let url_string = window.location.href;
        let url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        console.log(window.location.href);
        let url1 = "imprimant/entet/BulletinDePaie/index.html?id=" + idEntet;
        window.location.href = url1;
    });
});
const infoEntet=function(list) {
    $('#periodeD').text(ittone.convertDate(list[0].periodeD));
    $('#periodeF').text(ittone.convertDate(list[0].periodeF));
    $('#matricule').text(list[0].matricule);
    $('#nomEmploye').text(list[0].nomEmploye);
    $('#nomFonction').text(list[0].nomFonction);
    $('#numPaie').text(list[0].numPaie);
    $('#nomDepartement').text(list[0].nomDepartement);
    $('#nomCategorie').text(list[0].nomCategorie);
    $('#adresse').text(list[0].adresse);
    $('#dateNaissance').text(ittone.convertDate(list[0].dateNaissance));
    $('#dateEntree').text(ittone.convertDate(list[0].dateEntree));
    $('#datePaie').text(ittone.convertDate(list[0].datePaie));
    $('#sitFamiliale').text(list[0].sitFamiliale);
    $('#cinEmployee').text(list[0].cinEmployee);
    $('.nomModRglm').text(list[0].nomModRglm);
}
const listLignEntet =function(list){
    var sumGains = 0;
    var sumRetenues = 0;
    var netAPayer =0;
    for (let i=0; i<list.length; i++) {
        $('#table_line').append('<tr>'
        + '<td class="col_Infos text">' + list[i].codeRubrique + '</td>'
        + '<td class="col_Infos text desc">' + list[i].libelleRubrique + '</td>'
        + '<td class="col_Infos number">' + list[i].base + '</td>'
        + '<td class="col_Infos number">' + list[i].taux + '</td>'
        + '<td class="col_Infos number">' + list[i].gains + '</td>'
        + '<td class="col_Infos number">' + list[i].retenues + '</td>'
        + '</tr>');
        sumGains += list[i].gains;
        sumRetenues += list[i].retenues;
        if(list[i].codeRubrique=='15'){
            $('.netApayer').text(ittone.CurrencyFormat(list[i].gains));
        }
    }
    $('.sumGains').text((sumGains).toFixed(2));
    $('.sumRetenues').text((sumRetenues).toFixed(2));
};