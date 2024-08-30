import {CompteFournisseur} from './service.js'
export function tableDocFournisseur($input,columns_title,dt){
    let table=$input.randerTable(columns_title,CompteFournisseur(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            //$(row).attr('data-id', data.idArticle);
        },
        "ordering": false
        ,
        drawCallback: function () {
            // console.log(dt.rows())
            // console.log(h)
            var api = this.api();
            if(dt.statment=='GrandLiveFournisseur'){
                ittone.show($('.totalTable'));
                if($('.totalTable').length){
                    // console.log(api.column(4).data().sum())
                    // console.log(api.column(5).data().sum())
                    let totalCredit = 0;
                    let totalPaye = 0;
                    let dataX = api.rows({page:'current'}).data();
                    for(let i in dataX){
                        if(dataX[i].codeType=="BLFFR" || dataX[i].codeType=="BAVFR"){
                            totalCredit+=dataX[i].TT_ttc;
                        }
                        if(dataX[i].codeType=="ESPF" || dataX[i].codeType=="VRMBNQFR" || dataX[i].codeType=="PRLFR" || dataX[i].codeType=="PYF" || dataX[i].codeType=="IPYF"){
                            totalPaye+=dataX[i].TT_ttc;
                        }
                    }
                    $('.totalTable .TT_Page').html(
                    //    ittone.CurrencyFormat(api.column( 4, {page:'current'} ).data().sum())
                        ittone.CurrencyFormat(totalCredit)
                    );
                    $('.totalTable .TT_All').html(
                        ittone.CurrencyFormat(totalPaye)
                        // ittone.CurrencyFormat(api.column( 5, {page:'current'} ).data().sum())
                    );
                }
            }
            if(dt.statment=='DocFournisseur'){
                ittone.show($('.totalTableDocFournisseur'));
                if($('.totalTableDocFournisseur').length){
                    let index=0;
                    if(dt.id==-1){
                        index=7;
                    }else{
                        index=6;
                    }
                    $('.totalTableDocFournisseur .HT_Page').html(
                       ittone.CurrencyFormat(api.column( index, {page:'current'} ).data().sum())
                    );
                    $('.totalTableDocFournisseur .tHT_Page').html(
                        ittone.CurrencyFormat(api.column( index ).data().sum())
                     );
                     $('.totalTableDocFournisseur .TTC_Page').html(
                        ittone.CurrencyFormat(api.column( index+2, {page:'current'} ).data().sum())
                     );
                     $('.totalTableDocFournisseur .tTTC_Page').html(
                         ittone.CurrencyFormat(api.column( index+2 ).data().sum())
                    );
                    $('.totalTableDocFournisseur .TVA_Page').html(
                        ittone.CurrencyFormat(api.column( index+1, {page:'current'} ).data().sum())
                     );
                     $('.totalTableDocFournisseur .tTVA_Page').html(
                         ittone.CurrencyFormat(api.column( index+1 ).data().sum())
                    );
                }
            }
            if(dt.statment=='DocFournisseurDetail'){
                ittone.show($('.totalTableDocFournisseurDetail'));
                if($('.totalTableDocFournisseurDetail').length){
                    let index=0;
                    if(dt.id==-1){
                        index=7;
                    }else{
                        index=6;
                    }
                    $('.totalTableDocFournisseurDetail .HT_Page').html(
                        ittone.CurrencyFormat(api.column( index, {page:'current'} ).data().sum())
                     );
                     $('.totalTableDocFournisseurDetail .tHT_Page').html(
                         ittone.CurrencyFormat(api.column( index ).data().sum())
                      );
                      $('.totalTableDocFournisseurDetail .TTC_Page').html(
                         ittone.CurrencyFormat(api.column( index+1, {page:'current'} ).data().sum())
                      );
                      $('.totalTableDocFournisseurDetail .tTTC_Page').html(
                          ittone.CurrencyFormat(api.column( index+1 ).data().sum())
                     );
                }
            }
            
          }
    });
    return table;
}