var excel = (function() {
    return {
        Defualt:function(data){
            let $table = generatorTables(data.columns_title, data.getData);
            var wb = XLSX.utils.table_to_book($table[0], { sheet: "sheet1" });
            let dt = new Date();
            return XLSX.writeFile(wb, 'Document_' + dt.getTime() + '.xlsx');
        },
        ExportToTable:function($inputFile,$table,sql_COLUMN_NAME={}){
            $table.html('');
            excelTotable($inputFile,$table,sql_COLUMN_NAME);
        }
    }
})();
const generatorTables=function(columns_title, getData){
    if (columns_title.length) {
        let $table = $('<table></table>');
        let th = '';
        for (let col in columns_title) {
            th += '<th>' + columns_title[col].title + '</th>';
        }
        let $thead = $('<thead><tr>' + th + '</tr></thead>');
        let $tbody = $('<tbody></tbody>');
        for (let i in getData) {
            let $tr = $('<tr></tr>');
            for (let col in columns_title) {
                let data = columns_title[col].data;
                let render = columns_title[col].render;
                if (render) {
                    $tr.append('<td>' + render(getData[i][data]) + '</td>');
                } else {
                    $tr.append('<td>' + getData[i][data] + '</td>');
                }

            }
            $tbody.append($tr);
        }
        $table.append($thead);
        $table.append($tbody);
        return $table;
    } else {
        return getData;
    }
}
const excelTotable=function($inputFile,$table,sql_COLUMN_NAME){
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
    if (regex.test($inputFile.val().toLowerCase())) {
        var xlsxflag = false; 
        if ($inputFile.val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                if (xlsxflag) {
                    var workbook = XLSX.read(data, { type: 'binary' });
                }
                else {
                    var workbook = XLS.read(data, { type: 'binary' });
                }
                var sheet_name_list = workbook.SheetNames;

                var cnt = 0; 
                sheet_name_list.forEach(function (y) {
                    if (xlsxflag) {
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    }
                    else {
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                    }
                    if (exceljson.length > 0 && cnt == 0) {
                        BindTable(exceljson, $table,sql_COLUMN_NAME);
                        cnt++;
                    }
                });
                $('#exceltable').show();
            }
            if (xlsxflag) {
                reader.readAsArrayBuffer($inputFile[0].files[0]);
            }
            else {
                reader.readAsBinaryString($inputFile[0].files[0]);
            }
        }
        else {
            alert("Sorry! Your browser does not support HTML5!");
        }
    }
    else {
        alert("Please upload a valid Excel file!");
    }
}

const BindTable =function (jsondata, $table,sql_COLUMN_NAME) {
    var columns = BindTableHeader(jsondata, $table,sql_COLUMN_NAME); 
    $table.append('<tbody/>');
    for (var i = 0; i < jsondata.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = jsondata[i][columns[colIndex]];
            if (cellValue == null)
                cellValue = "";
            row$.append($('<td/>').html(cellValue));

        }
        let _percent = (i * 100) / (jsondata.length-1);
        console.log(_percent);
        $table.find('tbody').append(row$);
    }
}
const BindTableHeader= function (jsondata, $table,sql_COLUMN_NAME) {
    var columnSet = [];
    var $thead = $('<thead></thead>');
    $thead.append('<tr></tr>');
    var tr$ = $('<tr/>');
    var colum = 0;
    for (var i = 0; i < jsondata.length; i++) {
        var rowHash = jsondata[i];

        for (var key in rowHash) {
            if (rowHash.hasOwnProperty(key)) {
                if ($.inArray(key, columnSet) == -1) {
                    columnSet.push(key);
                    colum++;
                    $thead.find('tr').append($('<th/>').html(key));
                }
            }
        }
    }
    if(sql_COLUMN_NAME.length){
        for (var i = 0; i < colum; i++) {
            var option = '';
            for (var j = 0; j < sql_COLUMN_NAME.length; j++)
                option += "<option value='"+sql_COLUMN_NAME[j].COLUMN_NAME+"' data-type='"+sql_COLUMN_NAME[j].DATA_TYPE+"'>" + i18n.translate(sql_COLUMN_NAME[j].COLUMN_NAME) + "</option>";
            
            tr$.append($('<th/>').html('<select>' + option + '</select>'));
    
        }
        $thead.append(tr$);
    }    
    $table.append($thead);
    return columnSet;
}