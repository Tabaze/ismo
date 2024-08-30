var pos = (function() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    
   return{
    init: function() {
        i18n.init("fr");
        
        //PopupPassword();
    },
    AjaxJson:function(url, data){
        var list;
        $.ajax({
            type: 'POST',
            url: url,
            async: false,
            data: data,
            contentType: 'application/json; charset =utf-8',
            success: function(data) {
                list = data.d;
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                pos.error(err.Message);
                console.error(err.Message);
            }
        });
        return list;
    },
    success:function(msg){
            Toast.fire({
				icon: 'success',
				title: i18n.translate(msg)
			  })
        },
    error:function(msg){
        Toast.fire({
            icon: 'error',
            title: i18n.translate(msg)
            })
    },
    warning:function(msg){
        Toast.fire({
            icon: 'warning',
            title: i18n.translate(msg)
            })
    },
    hide:function($el){
        $el.addClass('oe_hidden')
    },
    show:function($el){
        $el.removeClass('oe_hidden');
    },
    idPos:-1,
    idDossier:-1,
    idGroup:-1,
    idCaissier:-1,
    idSession:-1,
    favorisArticle:[],
    IdEcmd:-1,
    P_ECMD : [],
    lineorder : [],
    avoir : false
   } 
})();
$(function() {
    infoPos();
    pos.init();
    
});

const infoPos =function(){
    let list = pos.AjaxJson('Default.aspx/infoPos','');
    console.log(list);
    sessionStorage.setItem('pos',JSON.stringify(list[0]));
    pos.idPos=list[0].idPos;
    pos.idDossier=list[0].idDossier;
    pos.idGroup=list[0].idGroup;
    //listModRglm();
}
