$(document).ready(function() {
    var $list = $('.list');
    var P_Pos = info_pos();
    load();


    function load() {
        loopGetJsonScreen();
        setInterval(function() {
            loopGetJsonScreen();
        }, 2000);
    }

    function loopGetJsonScreen() {
        $list.html('');
        let d = {
            fileName: '../js/core/dataScreen' + P_Pos.Ip.replaceAll(".", "") + '.txt'
        };

        fetch(d.fileName,{
  cache: 'no-cache',
})
            .then(x => x.text())
            .then(function (y) {
                let json = JSON.parse(y);
                let sumTotal = 0;
                for (var i in json) {
                    $list.append('<li> ' + json[i].qte + ' <span id="nameMenu">' + json[i].name.toUpperCase() + '</span> <span>' + lesPointText(json[i].name) + '</span><b>' + parseFloat(json[i].total).toFixed(2) + ' DH</b></li>');
                    sumTotal += parseFloat(json[i].total);
                }
                if (sumTotal > 0) {
                    $('#total').text(sumTotal.toFixed(2) + ' DH');
                } else {
                    $('#total').text("Welcome");
                }
            }                
        );
        //$.ajax({
        //    type: 'POST',
        //    url: '../Default.aspx/getJsonScreen',
        //    async: true,
        //    data: JSON.stringify(d),
        //    contentType: 'application/json; charset =utf-8',
        //    success: function(data) {
        //        let json = JSON.parse(data.d);
        //        let sumTotal = 0;
        //        for (var i in json) {
        //            $list.append('<li> ' + json[i].qte + ' <span id="nameMenu">' + json[i].name.toUpperCase() + '</span> <span>' + lesPointText(json[i].name) + '</span><b>' + parseFloat(json[i].total).toFixed(2) + ' DH</b></li>');
        //            sumTotal += parseFloat(json[i].total);
        //        }
        //        if (sumTotal > 0) {
        //            $('#total').text(sumTotal.toFixed(2) + ' DH');
        //        } else {
        //            $('#total').text("Welcome");
        //        }


        //    },
        //    error: function(result) {
        //        alert("Error Occured, Try Again");
        //    }
        //});
    }

    function info_pos() {
        var p;
        $.ajax({
            type: 'POST',
            url: '../Default.aspx/info_pos',
            async: false,
            data: "",
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                p = data.d;
            },
            error: function(result) {
                alert("Error Occured, Try Again");
            }
        });
        return p;
    }

    function lesPointText(text) {
        let sizeText = text.length;
        let maxSize = 40;
        let minsize = maxSize - sizeText;
        let point = '';
        for (var i = 0; i < minsize; i++) {
            point += '.';
        }
        return point;
    }

});