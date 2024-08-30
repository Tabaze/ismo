$(document).ready(function () {
    var Id_entet;
    var avance = 0;
    load();
    function eFrance(x) {
        return x.toLocaleString("es-ES", { minimumFractionDigits: 2 })
    }
    function load() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        Id_entet = url.searchParams.get("Id_entet");
    }
    $('#chnage_model').on('change', this, function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        Id_entet = url.searchParams.get("Id_entet");
        console.log(Id_entet, $(this).val());
        var url1 = "Model Imprimer/" + $(this).val() + "/index.html?Id_entet=" + Id_entet;
        window.location.href = url.origin + "/" + url1;
    });
    info_entet();
    list_lign_entet();
    list_taux();
    getfolders_name();
    function info_entet() {
        $.ajax
               ({
                   type: 'POST',
                   url: '../../Impretion.aspx/info_entet',
                   async: false,
                   data: "{'Id_entet':'" + Id_entet + "'}",
                   contentType: 'application/json; charset = utf-8',
                   success: function (data) {
                       var list = data.d;
                       console.log(list)
                       var str = list[10];
                       $('#company').append(brtoh3(str));
                       $('.footer').html(list[11]);
                       //$('.header_logo').find('img').attr('src', '../../' + list[12]);
                       $('#invoice').find('.codetype').text(list[13]);
                       $('#invoice').find('.Num').text('2021/'+pad(list[0], 5));
                       var date = new Date(list[1]);
                       var Echeanche = new Date(list[16]);
                       console.log(Echeanche)
                       $('#invoice').find('.Date').text(("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear());
                       $('#invoice').find('.Echeanche').text(("0" + Echeanche.getDate()).slice(-2) + '/' + ("0" + (Echeanche.getMonth() + 1)).slice(-2) + '/' + Echeanche.getFullYear());
                       $('#invoice').find('.Rglm').html(list[2]);
                       if (list[3] == '' || list[3] == ' ' || list[3] == undefined || list[3] == null || list[3].trim()=='')
                       {
                           $('#client').find('.code').text(list[4]);
                           $('#client').find('.Ice').text(list[8]);
                       } else {
                           $('#client').find('.code').text(list[3]);
                           $('#client').find('.Ice').text(list[7]);
                       }
                       $('#client').find('.Nom').text(list[5]);
                       $('#client').find('.info').text(list[6]);
                       $('#invoice').find('.Depot').text(list[14]);
                       $('#invoice').find('.numRGL').text(list[15]);
                       avance = list[17];
                   },
                   error: function (xhr, status, error) {
                       var err = eval("(" + xhr.responseText + ")");
                       alert(err.Message);
                   }
               });
    }
    function list_lign_entet() {
        //$('#table_line').html('');
        $.ajax
               ({
                   type: 'POST',
                   url: '../../Impretion.aspx/list_lign_entet',
                   async: false,
                   data: "{'Id_entet':'" + Id_entet + "'}",
                   contentType: 'application/json; charset =utf-8',
                   success: function (data) {
                       var lign_entet = data.d;
                       var row = 0;
                       var rowbreak = 23;
                       var mntttc = 0;
                       var mntht = 0;
                       var rows = lign_entet.length;
                       var page = 0;
                       for (i in lign_entet) {
                           if (row == rowbreak) {
                               page = 0;
                               $('#table_line').append('<!-- tfoot--><tr class="tfoot">'      
                                                        +'<td class="short_cell"></td>'
                                                        +'<td class="short_cell"></td>'
                                                        +'<td class="short_cell"></td>'
                                                        +'<td class="short_cell"></td>'
                                                        +'<td class="short_cell"></td>'
                                                        + '<td class="short_cell text">Total</td>'
                                                        + '<td class="short_cell number">' + eFrance(mntht) + '</td>'
                                                        + '<td class="short_cell number">' + eFrance(mntttc) + '</td>'
                                                        + '</tr><tr class="page-break"></tr>'
                                                        +'<tr class="thead_break thead2">'
                                                        + '<th class="short_cell">R\xE9ference</th>'
                                                        + '<th class="short_cell">D\xE9signation</th>'
                                                        + '<th class="short_cell">Quantit\xE9</th>'
                                                        +'<th class="short_cell">P.U TTC</th>'
                                                        +'<th class="short_cell">%Remise</th>'
                                                        +'<th class="short_cell">%TVA</th>'
                                                        +'<th class="short_cell">Montant HT</th>'
                                                        +'<th class="short_cell">TOTAL</th>'
                                                        + '</tr>');
                               row = 0;
                               mntttc = 0;
                               mntht = 0;
                           }
                           $('#table_line').append('<tr class="short_row">'
                                                            + '<td class="short_cell text">' + lign_entet[i].Ref_article + '</td>'
                                                            + '<td class="short_cell text desc">' + lign_entet[i].Lgn_desc + '</td>'
                                                            + '<td class="short_cell number">' + eFrance(lign_entet[i].Lgn_qtt) + '</td>'
                                                            + '<td class="short_cell number">' + eFrance(lign_entet[i].Lgn_prix) + '</td>'
                                                            + '<td class="short_cell number">' + eFrance(lign_entet[i].Lgn_remise) + '</td>'
                                                            + '<td class="short_cell number">' + lign_entet[i].Lgn_tva + '</td>'
                                                            + '<td class="short_cell number">' + eFrance(lign_entet[i].Lgn_mntht) + '</td>'
                                                            + '<td class="short_cell number">' + eFrance(lign_entet[i].Lgn_mntttc) + '</td>'
                                                            + '</tr>');
                           row++;
                           mntttc = mntttc + lign_entet[i].Lgn_mntttc;
                           mntht = mntht + lign_entet[i].Lgn_mntht;
                           page++;
                       }

                       var y = rowbreak - page;
                           for (var i = 1; i < Math.abs(y); i++) {
                               $('#table_line').append(tr_break());
                           }
                       
                       
                   },
                   error: function (xhr, status, error) {
                       var err = eval("(" + xhr.responseText + ")");
                       alert(err.Message);
                   }
               });
        list_total_entet();
    }
    function list_total_entet() {
        $.ajax
               ({
                   type: 'POST',
                   url: '../../Modele_de_Vente.aspx/list_total_entet',
                   async: false,
                   data: "{'Id_entet':'" + Id_entet + "'}",
                   contentType: 'application/json; charset =utf-8',
                   success: function (data) {
                       var lign_entet = data.d;
                       $('#tfoot_table').append(Tt_remis(lign_entet.Tt_remis));
                       $('#tfoot_table').append(Tt_ht(lign_entet.Tt_ht));
                       $('#tfoot_table').append(Tt_tva(lign_entet.Tt_tva));
                       $('#tfoot_table').append(Tt_ttc(lign_entet.Tt_ttc));
                           if (lign_entet.Timbre) {
                               $('#tfoot_table').append(Timbre(lign_entet.Tt_net, lign_entet.Tt_ttc));
                           }
                           $('#tfoot_table').append(Tt_net(lign_entet.Tt_net));
                           let reste = parseFloat(lign_entet.Tt_net) - parseFloat(avance);
                           $('#tfoot_avance').append('<tr><td class="cell">' + eFrance(avance) + ' </td><td class="cell">' + eFrance(reste) + '</td></tr>')
                   },
                   error: function (xhr, status, error) {
                       var err = eval("(" + xhr.responseText + ")");
                       alert(err.Message);
                   }
               });
    }
    function list_taux() {
        $.ajax
               ({
                   type: 'POST',
                   url: '../../Impretion.aspx/list_taux',
                   async: false,
                   data: "{'Id_entet':'" + Id_entet + "'}",
                   contentType: 'application/json; charset =utf-8',
                   success: function (data) {
                       var list = data.d;
                       for (i in list) {
                           $('#tfoot_taux').append('<tr><td class="cell">' + eFrance(list[i].Lgn_tva) + ' %</td><td class="cell">' + eFrance(list[i].Lgn_mntttc) + '</td><td class="cell">' + eFrance(list[i].Lgn_mntht) + '</td></tr>')
                       }
                   },
                   error: function (xhr, status, error) {
                       var err = eval("(" + xhr.responseText + ")");
                       alert(err.Message);
                   }
               });
    }
    function Tt_remis(remis) {
        var $tr = '<tr>'
                + '<td></td>'
                + '<td class="cell">Total Remis</td>'
                + '<td class="cell number">' + eFrance(remis) + '</td>'
                + '</tr>';
        return $tr;
    }
    function Tt_ht(HT) {
        var $tr = '<tr>'
                + '<td></td>'
                + '<td class="cell">Total HT</td>'
                + '<td class="cell number">' + eFrance(HT) + '</td>'
                + '</tr>';
        return $tr;
    }
    function Tt_tva(tva) {
        var $tr = '<tr>'
               + '<td></td>'
               + '<td class="cell">Total TVA</td>'
               + '<td class="cell number">' + eFrance(tva) + '</td>'
               + '</tr>';
        return $tr;
    }
    function Tt_ttc(ttc) {
        var $tr = '<tr>'
               + '<td></td>'
               + '<td class="cell">Total TTC</td>'
               + '<td class="cell number">' + eFrance(ttc) + '</td>'
               + '</tr>';
        return $tr;
    }
    function Timbre(Tt_net, ttc) {
        var $tr = '<tr>'
              + '<td></td>'
              + '<td class="cell">Total Timbre</td>'
              + '<td class="cell number">' + eFrance((Tt_net - ttc)) + '</td>'
              + '</tr>';
        return $tr;
    }
    function Tt_net(net) {
        
        $('#montantWord').html('<span>Arrêtée la présente facture à la somme de:</span><br>'+trans(String(net)));
        var $tr = '<tr>'
              + '<td></td>'
              + '<td class="cell">Total net</td>'
              + '<td class="cell number">' + eFrance(net) + '</td>'
              + '</tr>';
        return $tr;
    }
    function tr_break() {
        var $tr = '<tr>'
                + '<td class="short_cell_breack" style="padding: 11px;"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '<td class="short_cell_breack"></td>'
                + '</tr>';
        return $tr;
    }
    function brtoh3(str) {
        var strh3 = str.split('<br />');
        var rt='';
        for(var i in strh3 ){
            rt += '<h1>' + strh3[i] + '</h1>';
        }
        return rt;
    }
    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
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
});