var doc = (function () {
    return {
        init: function () {
            this.contextmenu();
        },
        uploadDoc: function (url, data) {
            var list;
            $.ajax({
                type: 'POST',
                timeout: 100000,
                url: url,
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function (evt) {
                            var percent = (evt.loaded / evt.total) * 100;
                            $("#filesUpload").find(".progress-bar").width(percent + "%");
                        }, false);
                    }
                    return xhr;
                },
                data: data,
                success: function (data) {
                    list = data.d;
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    //alertify.error(err.Message);
                    ittone.error(err.Message);
                    console.error(err.Message);
                },
                cache: false,
                contentType: false,
                processData: false,

            });
            return list;
        },
        converSize: function (data) {
            var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
                i = 0;
            while (data > 900) {
                data /= 1024;
                i++;
            }
            var exactSize = (Math.round(data * 100) / 100) + ' ' + fSExt[i];
            return exactSize;
        },
        contextmenu: function () {
           
        }
    }
})();
$(function () {
    doc.init();
});