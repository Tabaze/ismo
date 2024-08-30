$(document).ready(function () {
    var $popup_imprimante = $('.popups').find('.popup.popup-imprimante');
    var $pos_sys = $('.pos_sys.screen');
    var iddevice;
    $popup_imprimante.find('input').on('click', this, function () {
        var type = $(this).attr('id');
        if (type == 'btnCuisine') {
            var PrinterName = $popup_imprimante.find('#listimprimante1').children("option:selected").val();
            //var element = $("#html-content-imprimante");
            //var getCanvas;
            //html2canvas(element, {
            //    onrendered: function (canvas) {
            //        getCanvas = canvas;
            //        var imgageData = getCanvas.toDataURL("image/png");
            //        var newData = imgageData.replace(/^data:image\/png;base64,/, "");
            //        printDocument(escapeRegExp(PrinterName), newData);
            //    }

            //});
            printDocument(escapeRegExp(PrinterName), "aa");
        } else {
            var PrinterName = $popup_imprimante.find('#listimprimante2').children("option:selected").val();
            //var element = $("#html-content-imprimante");
            //var getCanvas;
            //html2canvas(element, {
            //    onrendered: function (canvas) {
            //        getCanvas = canvas;
            //        var imgageData = getCanvas.toDataURL("image/png");
            //        var newData = imgageData.replace(/^data:image\/png;base64,/, "");
            //        printDocument(escapeRegExp(PrinterName), newData);
            //    }
            //});
            printDocument(escapeRegExp(PrinterName), "aa");
        }
    });
    $popup_imprimante.on('click', '.button.confirm', function () {
        var listimprimante1 = $popup_imprimante.find('#listimprimante1').children("option:selected").val();
        var listimprimante2 = $popup_imprimante.find('#listimprimante2').children("option:selected").val();
        savepos_print(iddevice, escapeRegExp(listimprimante1.toString()), escapeRegExp(listimprimante2.toString()));      
    });
    $pos_sys.find('.device').on('click', this, function () {
        $popup_imprimante.parent().removeClass('oe_hidden');
        var $device = $(this);
        iddevice = $device.attr('data-device-id');
        //var name = $device.find('.device-name').text();
        //document.cookie = "UserInfo=" + iddevice + "";
        //window.location.replace("Sys_Pos.aspx");
    });

    function printDocument(PrinterName, src) {
        $.ajax
        ({
            type: 'POST',
            url: 'Default.aspx/printDocument',
            async: false,
            data: "{'PrinterName':'" + PrinterName + "','src':'" + src + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function (data) {
            },
            error: function (result) {
                alert("Error Occured, Try Again");
            }
        });
    }
    function savepos_print(IDF_POS, listimprimante1, listimprimante2) {
        
        $.ajax
        ({
            type: 'POST',
            url: 'Default.aspx/savepos_print',
            async: false,
            data: "{'IDF_POS':'" + IDF_POS + "','listimprimante1':'" + listimprimante1 + "','listimprimante2':'" + listimprimante2 + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function (data) {
                document.cookie = "UserInfo=" + iddevice + "";
                window.location.replace("Sys_Pos.aspx");
            },
            error: function (result) {
                alert("Error Occured, Try Again");
            }
        });
    }
    function escapeRegExp(str) {
        return str.replace(/[*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
});
