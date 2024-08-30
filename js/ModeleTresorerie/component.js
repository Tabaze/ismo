import {listTresoEntet,soldCaisse,MouvementCaisse} from './service.js'
export function tableTresorerieEntet($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listTresoEntet(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idTresoEntet);
        }
    });
    return table;
}
export function tableSoldCaisse($input,columns_title){
    let table=$input.randerTable(columns_title,soldCaisse(),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
        }
    });
    return table;
}
export function tableMouvementCaisse($input,columns_title,dt){
    let table=$input.randerTable(columns_title,MouvementCaisse(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
        },
        "columnDefs": [{ "targets": 0, "type": "date-eu" }],
        drawCallback: function () {
            var api = this.api();
                ittone.show($('.totalTable'));
                if($('.totalTable').length){
                    let dataX = api.rows({page:'current'}).data();
                    let totalDebit=0;
                    let totalCredit=0;
                    for(let i in dataX){    
                        if(dataX[i].montantDepenses!=null && dataX[i].montantDepenses!=0){
                            totalCredit+=parseFloat(dataX[i].montantDepenses);
                        }
                        if(dataX[i].montantRecettes!=null && dataX[i].montantRecettes!=0){
                            totalDebit+=parseFloat(dataX[i].montantRecettes);
                        }          
                    }
                    $('.totalTable .TT_Debit').html(
                        ittone.CurrencyFormat(totalDebit)
                    );
                    $('.totalTable .TT_Credit').html(
                        ittone.CurrencyFormat(totalCredit)
                    );
                    $('.totalTable').data('totalDebit',ittone.CurrencyFormat(totalDebit))
                    $('.totalTable').data('totalCredit',ittone.CurrencyFormat(totalCredit))
                } 
        }
    });
    return table;
}