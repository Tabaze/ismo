import {login,POS_Session,SessionInserUpdate} from './service.js';
import {paymentMethods,favorisArticle,famille} from './component.js';
$(document).ready(function() {
    paymentMethods();
    favorisArticle();
    famille();
    $.popup_password.on('click', '.button.cancel', function () {
        location.reload();
    });//done
    $.popup_password.on('click', '.button.confirm', function () {
        tapLogin();
    });//done
    $.popup_Session.on('click', '.button.confirm', function () {
        session();
    });//done
    $.popup_Session.on('click', '.button.cancel', function () {
        location.reload();
    });//done
});

const tapLogin=function(){
    console.log(pos.idDossier);
   let list= login({passCaissier:$('#passWordLogin').val(),idGroup:pos.idGroup});
   console.log(list)
   if(list){
        $('.username').html(list[0].nameCaissier);
        pos.idCaissier=list[0].idCaissier
        sessionStorage.setItem('caissier',JSON.stringify(list[0]));
        pos.hide($.popup_password.parent())
        controlesCaissier(list[0]);
        PosSession();
   }else{

   }
}
const controlesCaissier =function(list){
    if (!list.prixCheck) {
        $('#prix').addClass('disabled');       
    }
    if(!list.remCheck){
        $('#rem').addClass('disabled');
    }
}
const PosSession =function () {
   let caissier=JSON.parse(sessionStorage.getItem('caissier'));
   console.log(caissier)
    let list= POS_Session({idPos:pos.idPos,idCaissier:pos.idCaissier});
    console.log({idPos:pos.idPos,idCaissier:pos.idCaissier})
    console.log(list);
    if (list) {
       pos.idSession =list[0].idSession;
       pos.hide($.popup_Session.parent());
       $.button_Fermer.removeClass('oe_hidden');
       //$('#solde-encore').text($.solde_encore().toFixed(2) + ' DH');
    } else {
       $.popup_Session.find('.title').text('Ouvrir Session ' + caissier.Name_Caissier);
       pos.show($.popup_Session.parent());
       $.popup_Session.find('.title').addClass('Ouvrir'); 
       $.button_Fermer.removeClass('oe_hidden');
    }
}//done
const session=function(){
    var Sold = +$('#sessionWord').val();
    if ($.popup_Session.find('.title').hasClass('Fermer')) {
        update_Session($.P_Caissier.Id_Caissier, Sold, $.P_Pos.Id_pos, $.P_Session);
        $.product_screen.addClass('oe_hidden');
        $.floor_screen.addClass('oe_hidden');
        $.login_screen.addClass('oe_hidden');
        $.payment_screen.addClass('oe_hidden');
        $.receipt_screen.find('.top-content h1').html('');
        $.receipt_screen.find('.pos-sale-ticket').addClass('Ferme');
        $.receipt_screen.removeClass('oe_hidden');
    } else {
        let dataInsert={
            param:[{
                idPos:pos.idPos,
                caissierOpen:pos.idCaissier,
                soldeOpen:0,
                statment:'insert'
                }]
            }
            
       let ses= SessionInserUpdate(dataInsert)[0];
       console.log(ses)
       pos.idSession = ses.idSession;
       pos.hide($.popup_Session.parent());
    }
}