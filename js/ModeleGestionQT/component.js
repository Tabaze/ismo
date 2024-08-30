import { listParArticle } from './service.js'
export function tableGestionParArticle($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listParArticle(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            //$(row).attr('data-id', data.idArticle);
        },
        drawCallback: function () {
            var api = this.api();
            if (dt.statment != 'parDepotSample' && dt.statment != 'parArticle' && dt.statment != 'mvmArticle' && dt.statment != 'articleParDoc' && dt.statment != 'mvmFamille') {
                ittone.show($('.totalTable'));
                if ($('.totalTable').length) {
                    $('.totalTable .TT_pageCMUP').html(
                        ittone.CurrencyFormat(api.column(8, { page: 'current' }).data().sum())
                    );
                    $('.totalTable .TT_pageValeur').html(
                        ittone.CurrencyFormat(api.column(9, { page: 'current' }).data().sum())
                    );
                    // $('.totalTable .cTT_ttc').html(
                    //     ittone.CurrencyFormat(api.column( 8, {page:'current'} ).data().sum())
                    // );
                    $('.totalTable .TT_CMUP').html(
                        ittone.CurrencyFormat(api.column(8).data().sum())
                    );
                    $('.totalTable .TT_Valeur').html(
                        ittone.CurrencyFormat(api.column(9).data().sum())
                    );
                    //  $('.totalTable .TT_ttc').html(
                    //      ittone.CurrencyFormat(api.column( 8 ).data().sum())
                    //  );
                }
            }
            
        }
    });
    return table;
}