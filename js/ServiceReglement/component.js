import {listReglement,deleteReglement} from './service.js'
export function tableReglement($input,columns_title,dt){
    let table=$input.randerTable(columns_title,listReglement(dt),{
        createdRow:function(row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idReglement);
        },
    });
    $('#deleteRow').off('click',this);
    $('#deleteRow').on('click',this,function(){
        let rows=table.rows({ selected: true });
        if(rows.count()>0){
            ittone.alert('Confirmer','Confirmer de supprimer',function(){
                let data=rows.data();
                data.map(function(dt){
                    if(deleteReglement({id:dt.idReglement})){
                        ittone.deleteRowDataTable(table,dt.idReglement);
                        ittone.success("successfully");
                    }});
            },function(){
                ittone.warning("Cancel");
            });
        }else{
            ittone.warning("dont Selection");
        }
    });
    return table;
}
