import { listImpressionBulletinPaie } from '../../service.js'
$(document).ready(function () {
    var idEntet;
    load();
    function load() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let info = listImpressionBulletinPaie({ idEntete : idEntet });
        console.log(info)
        infoEntet(info);
    }
    $('#chnage_model').on('change', this, function () {
        let url_string = window.location.href;
        let url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let url1 = "../imprimant/entet/BulletinDePaie/index.html?id=" + idEntet;
        window.location.href = url1;
    });
});
const infoEntet=function(list) {

}