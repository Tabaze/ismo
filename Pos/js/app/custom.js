$(document).ready(function() {
    $.product_screen = $('.product-screen.screen');
    $.floor_screen = $('.floor-screen.screen');
    $.login_screen = $('.login-screen.screen');
    $.payment_screen = $('.payment-screen.screen');
    $.receipt_screen = $('.receipt-screen.screen');
    $.archive_screen = $('.archive-screen.screen');
    $.popup_password = $('.popups').find('.popup.popup-password');
    $.numpad = $.popup_password.find('.popup-numpad');
    $.popup_Session = $('.popups').find('.popup.popup-Session');
    $.numpad_Session = $.popup_Session.find('.popup-numpad');
    $.button_Fermer = $('.pos-topheader .header-button.Fermer');
    $.paymentMethods=$('#paymentmethods');
    $.product_list = $('.product-screen.screen').find('.product-list');
    $.famile_list = $('.product-screen.screen').find('.famile-list');
    $.btnfavorite = $.product_screen.find('.btnfavorite .favoritebtn');
    $.order = $('.order');
    PopupPassword();
    PopupSession();
});
const PopupPassword=function(){
    var charpassword='';
    $.numpad.off('click','.input-button.number-char');
    $.numpad.on('click', '.input-button.number-char', function () {
        $('#passWordLogin').val($('#passWordLogin').val()+$(this).text());
        charpassword = charpassword + '*';
        $.popup_password.find('.popup-input.value.active').text(charpassword);
    });
    $.numpad.on('click', '.input-button.numpad-backspace', function () {
        let numberpassword=$('#passWordLogin').val();
        numberpassword = numberpassword.substring(0, numberpassword.length - 1);
        $('#passWordLogin').val(numberpassword);
        charpassword = charpassword.substring(0, charpassword.length - 1);
        $.popup_password.find('.popup-input.value.active').text(charpassword);
    });//done
    $.numpad.on('click', '.input-button.numpad-char', function () {
        $('#passWordLogin').val('');
        charpassword = '';
        $.popup_password.find('.popup-input.value.active').text('');
    });//done
}
const PopupSession=function(){
    $.numpad_Session.on('click', '.input-button.number-char', function () {
        let numberSession = $('#sessionWord').val() + $(this).text();
        $('#sessionWord').val(numberSession)
        $.popup_Session.find('.popup-input.value.active').text(parseFloat(numberSession).toFixed(2));
    });//done
    $.numpad_Session.on('click', '.input-button.numpad-backspace', function () {
        let numberSession = $('#sessionWord').val();
        numberSession = numberSession.substring(0, numberSession.length - 1);    
        $('#sessionWord').val(numberSession)
        $.popup_Session.find('.popup-input.value.active').text(numberSession);
    });//done
    $.numpad_Session.on('click', '.input-button.numpad-char', function () {
        $('#sessionWord').val('')
        $.popup_Session.find('.popup-input.value.active').text('');
    });//done
}
