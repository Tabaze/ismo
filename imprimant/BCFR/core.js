import {infoEntetById,listEntetLign} from '../service.js'
$(document).ready(function () {
    var idEntet;
    load();
    function load() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let info= infoEntetById({id:idEntet})[0];
        infoEntet(info);
        let line=listEntetLign({id:idEntet});
        listLignEntet(line);
        //totalEntet(info);
    }
    $('#chnage_model').on('change', this, function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        Id_entet = url.searchParams.get("Id_entet");
        console.log(Id_entet, $(this).val());
        var url1 = "Model Imprimer/" + $(this).val() + "/index.html?Id_entet=" + Id_entet;
        window.location.href = url.origin + "/" + url1;
    });
});
    const infoEntet=function(list) {
       $('#codetype').text(list.nomFacture);
       $('#numFactur').text(ittone.stringWithZero(list.numFactur,5)+" / "+ittone.getYear(list.dateEntet));
       $('#dateEntet').text(ittone.convertDate(list.dateEntet));
       $('#nomDepot').text(list.nomDepot);
       //$('#nomModRglm').text(list.nomModRglm);
       $('#nom').text(list.nom);
       $('#info').text(list.info);
       if(list.idClient){
            $('#code').text(list.codeClient);
            $('#ice').text(list.iceClient);
       }else{
            $('#code').text(list.codeFournisseur);
            $('#ice').text(list.iceFournisseur);
       }
    }
    const listLignEntet =function(list){
        var row = 0;
        var rowbreak = 23;
        var mntttc = 0;
        var mntht = 0;
        var rows = list.length;
        var page = 0;
        for (i in list) {
            if (row == rowbreak) {
                page = 0;
                $('#table_line').append('<!-- tfoot--><tr class="tfoot">'      
                                         +'<td class="short_cell"></td>'
                                         +'<td class="short_cell"></td>'
                                         + '<td class="short_cell text">Total</td>'
                                         + '<td class="short_cell number">' + ittone.CurrencyFormat(mntht) + '</td>'
                                         + '<td class="short_cell number">' + ittone.CurrencyFormat(mntttc) + '</td>'
                                         + '</tr><tr class="page-break"></tr>'
                                         +'<tr class="thead_break thead2">'
                                         + '<th class="short_cell">R\xE9ference</th>'
                                         + '<th class="short_cell">D\xE9signation</th>'
                                         + '<th class="short_cell">Quantit\xE9</th>'
                                         +'<th class="short_cell">P.U HT</th>'
                                         +'<th class="short_cell">TOTAL</th>'
                                         + '</tr>');
                row = 0;
                mntttc = 0;
                mntht = 0;
            }
            $('#table_line').append('<tr class="short_row">'
                                             + '<td class="short_cell text">' + list[i].refArticle + '</td>'
                                             + '<td class="short_cell text desc">' + list[i].descLign + '</td>'
                                             + '<td class="short_cell number">' + ittone.QteFormat(list[i].qteLign) + '</td>'
                                             + '</tr>');
            row++;
            mntttc = mntttc + list[i].lgnTTC;
            mntht = mntht + list[i].lgnHT;
            page++;
        }
        var y = rowbreak - page;
            for (var i = 1; i < Math.abs(y); i++) {
                $('#table_line').append(tr_break());
            }
    }
    const totalEntet =function(list){
        $('#tfoot_table').append(Tt_ht(list.TT_ht));
        $('#tfoot_table').append(Tt_tva(list.TT_tva));
        $('#tfoot_table').append(Tt_ttc(list.TT_ttc));
    }
    function Tt_ht(HT) {
        var $tr = '<tr>'
                + '<td></td>'
                + '<td class="cell">Total HT</td>'
                + '<td class="cell number">' + ittone.CurrencyFormat(HT) + '</td>'
                + '</tr>';
        return $tr;
    }
    function Tt_tva(tva) {
        var $tr = '<tr>'
               + '<td></td>'
               + '<td class="cell">Total TVA</td>'
               + '<td class="cell number">' + ittone.CurrencyFormat(tva) + '</td>'
               + '</tr>';
        return $tr;
    }
    function Tt_ttc(ttc) {
        //$('#montantWord').html('<span>Arrêtée la présente facture à la somme de:</span><br>' + trans(String(ttc)));
        var $tr = '<tr>'
               + '<td></td>'
               + '<td class="cell">Total TTC</td>'
               + '<td class="cell number">' + ittone.CurrencyFormat(ttc) + '</td>'
               + '</tr>';
        return $tr;
    }
    function tr_break() {
        var $tr = '<tr>'
                + '<td class="short_cell_breack" style="padding: 11px;"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '</tr>';
        return $tr;
    }
    function getfolders_name() {
        $('#chnage_model').append('<option> </option>');
        $.ajax
               ({
                   type: 'POST',
                   url: '../../Impretion.aspx/getfolders_name',
                   async: false,
                   data: "",
                   contentType: 'application/json; charset =utf-8',
                   success: function (data) {
                       var list = data.d;
                       for (i in list) {
                           if (list[i] != 'Modele_barcode' && list[i] != 'Modele_Virement') {
                               $('#chnage_model').append('<option>' + list[i] + '</option>');
                           }
                       }
                   },
                   error: function (xhr, status, error) {
                       var err = eval("(" + xhr.responseText + ")");
                       alert(err.Message);
                   }
               });
    }
