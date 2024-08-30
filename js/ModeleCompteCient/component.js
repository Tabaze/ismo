import {CompteCient} from './service.js'
export function tableDocClient($input,columns_title,dt){
    console.log(CompteCient(dt))
    let table=$input.randerTable(columns_title,CompteCient(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            //$(row).attr('data-id', data.idArticle);
        },
        "ordering": false
        ,
        drawCallback: function () {
            var api = this.api();
            if(dt.statment=='GrandLiveClient'){
                ittone.show($('.totalTable'));
                if($('.totalTable').length){
                    let totalCredit = 0;
                    let totalPaye = 0;
                    let dataX = api.rows({page:'current'}).data();
                    for(let i in dataX){
                        if(dataX[i].codeType=="BLFC" || dataX[i].codeType=="BRC"){
                            totalCredit+=dataX[i].TT_ttc;
                        }
                        if(dataX[i].codeType=="ESPC" || dataX[i].codeType=="VRMBNQCL" || dataX[i].codeType=="PRLCL" || dataX[i].codeType=="PYC" || dataX[i].codeType=="IPYC"){
                            totalPaye+=dataX[i].TT_ttc;
                        }
                    }
                    $('.totalTable .TT_Page').html(
                        ittone.CurrencyFormat(totalCredit)
                        //    ittone.CurrencyFormat(api.column( 4, {page:'current'} ).data().sum())
                    );
                    $('.totalTable .TT_All').html(
                        ittone.CurrencyFormat(totalPaye)
                        // ittone.CurrencyFormat(api.column( 4 ).data().sum())
                     );
                }  
            }
            if(dt.statment=='DocClient'){
                ittone.show($('.totalTableDocClient'));
                if($('.totalTableDocClient').length){
                    let index=0;
                    if(dt.id==-1){
                        index=7;
                    }else{
                        index=6;
                    }
                    $('.totalTableDocClient .HT_Page').html(
                       ittone.CurrencyFormat(api.column( index, {page:'current'} ).data().sum())
                    );
                    $('.totalTableDocClient .tHT_Page').html(
                        ittone.CurrencyFormat(api.column( index ).data().sum())
                     );
                     $('.totalTableDocClient .TTC_Page').html(
                        ittone.CurrencyFormat(api.column( index+2, {page:'current'} ).data().sum())
                     );
                     $('.totalTableDocClient .tTTC_Page').html(
                         ittone.CurrencyFormat(api.column( index+2 ).data().sum())
                    );
                    $('.totalTableDocClient .TVA_Page').html(
                        ittone.CurrencyFormat(api.column( index+1, {page:'current'} ).data().sum())
                     );
                     $('.totalTableDocClient .tTVA_Page').html(
                         ittone.CurrencyFormat(api.column( index+1 ).data().sum())
                    );
                }
            }
            if(dt.statment=='DocClientDetail'){
                ittone.show($('.totalTableDocClientDetail'));
                if($('.totalTableDocClientDetail').length){
                    let index=0;
                    if(dt.id==-1){
                        index=7;
                    }else{
                        index=6;
                    }
                    $('.totalTableDocClientDetail .HT_Page').html(
                        ittone.CurrencyFormat(api.column( index, {page:'current'} ).data().sum())
                     );
                     $('.totalTableDocClientDetail .tHT_Page').html(
                         ittone.CurrencyFormat(api.column( index ).data().sum())
                      );
                      $('.totalTableDocClientDetail .TTC_Page').html(
                         ittone.CurrencyFormat(api.column( index+1, {page:'current'} ).data().sum())
                      );
                      $('.totalTableDocClientDetail .tTTC_Page').html(
                          ittone.CurrencyFormat(api.column( index+1 ).data().sum())
                     );
                }
            }       
          }
    });
    return table;
}