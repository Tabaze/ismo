
var i18n= (function() {
    var url='';
    var lang='';
    var dataJson;
    const urlorigin=new URL(window.location.href).origin;
    return {
        init: function(lang) {
            this.url =urlorigin+'/i18n/'+lang+'.json';
            this.lang = lang;
            this.dataJson=fetchData();
            // $.getJSON(this.url,function(jsonData){
            //     let keys=Object.keys(jsonData);
            //     for(let i=0;i<keys.length;i++){
            //         $('[i18n='+keys[i]+']').text(jsonData[keys[i]])
            //     }                 
            // });
        },
        url:this.url,
        lang:this.lang,
        translate:  function(key){
            return this.dataJson[key] || key;
        },
        
    }
})();
 function fetchData(){
    var fData;
    $.ajax({
        url: i18n.url,
        async: false,
        contentType: 'application/json; charset =utf-8',
        success: function(data) {
            fData = data;
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            console.error(err.Message);
        }
    });
    return fData;
}

