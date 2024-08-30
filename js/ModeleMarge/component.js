import {listMargeEntet} from './service.js'
export function tableParArticle($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listMargeEntet(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            //$(row).attr('data-id', data.idArticle);
        }
        ,
        drawCallback: function () {
            // var api = this.api();
            // if(dt.statment=='GrandLiveClient'){
            //     ittone.show($('.totalTable'));
            //     if($('.totalTable').length){
            //         $('.totalTable .TT_Page').html(
            //            ittone.CurrencyFormat(api.column( 4, {page:'current'} ).data().sum())
            //         );
            //         $('.totalTable .TT_All').html(
            //             ittone.CurrencyFormat(api.column( 4 ).data().sum())
            //          );
            //     }
               
            // }
            // if(dt.statment=='DocClient'){
            //     ittone.show($('.totalTableDocClient'));
            //     if($('.totalTableDocClient').length){
            //         let index=0;
            //         if(dt.id==-1){
            //             index=7;
            //         }else{
            //             index=6;
            //         }
            //         $('.totalTableDocClient .HT_Page').html(
            //            ittone.CurrencyFormat(api.column( index, {page:'current'} ).data().sum())
            //         );
            //         $('.totalTableDocClient .tHT_Page').html(
            //             ittone.CurrencyFormat(api.column( index ).data().sum())
            //          );
            //          $('.totalTableDocClient .TTC_Page').html(
            //             ittone.CurrencyFormat(api.column( index+2, {page:'current'} ).data().sum())
            //          );
            //          $('.totalTableDocClient .tTTC_Page').html(
            //              ittone.CurrencyFormat(api.column( index+2 ).data().sum())
            //         );
            //         $('.totalTableDocClient .TVA_Page').html(
            //             ittone.CurrencyFormat(api.column( index+1, {page:'current'} ).data().sum())
            //          );
            //          $('.totalTableDocClient .tTVA_Page').html(
            //              ittone.CurrencyFormat(api.column( index+1 ).data().sum())
            //         );
            //     }
            // }
            // if(dt.statment=='DocClientDetail'){
            //     ittone.show($('.totalTableDocClientDetail'));
            //     if($('.totalTableDocClientDetail').length){
            //         let index=0;
            //         if(dt.id==-1){
            //             index=7;
            //         }else{
            //             index=6;
            //         }
            //         $('.totalTableDocClientDetail .HT_Page').html(
            //             ittone.CurrencyFormat(api.column( index, {page:'current'} ).data().sum())
            //          );
            //          $('.totalTableDocClientDetail .tHT_Page').html(
            //              ittone.CurrencyFormat(api.column( index ).data().sum())
            //           );
            //           $('.totalTableDocClientDetail .TTC_Page').html(
            //              ittone.CurrencyFormat(api.column( index+1, {page:'current'} ).data().sum())
            //           );
            //           $('.totalTableDocClientDetail .tTTC_Page').html(
            //               ittone.CurrencyFormat(api.column( index+1 ).data().sum())
            //          );
            //     }
            // }
            
            
          }
    });
    return table;
}