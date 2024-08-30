var $keyboard_frame = $('.keyboard_frame');

function keyboard() {
    var $input;
    this.getinput = function(object) {
        $input = $(object);
    }
    this.show = function() {
        $keyboard_frame.css({ 'display': 'block', 'height': '235px' });
    }
    this.clear = function() {
        $keyboard_frame.clearQueue();
        this.getinput = null;
        $input.val("");
        $input.focus();
    }
    $keyboard_frame.on('click', '.symbol', function() {
        if ($keyboard_frame.find('.off').is(":visible")) {
            $input.val($input.val() + $(this).find('.off').text());
        } else {
            $input.val($input.val() + $(this).find('.on').text());
        }
        $input.focus();
    });
    $keyboard_frame.on('click', '.delete', function() {
        var val = $input.val();
        $input.val(val.substring(0, val.length - 1));
        $input.focus();
    });
    $keyboard_frame.on('click', '.space', function() {
        $input.val($input.val() + $(this).text());
        $input.focus();
    });
    $keyboard_frame.on('click', '.numlock', function() {
        if ($keyboard_frame.find('.off').is(":visible")) {
            $keyboard_frame.find('.off').css({ 'display': 'none' });
            $keyboard_frame.find('.on').css({ 'display': 'inline' });
        } else {
            $keyboard_frame.find('.off').css({ 'display': 'inline' });
            $keyboard_frame.find('.on').css({ 'display': 'none' });
        }
        $input.focus();
    });
    $keyboard_frame.on('click', '.close_button', function() {
        $keyboard_frame.clearQueue();
        $keyboard_frame.css({ 'display': 'none', 'height': '0' });
        this.getinput = null;
        $input.val("");
        $input.focus();
        //keyboard = null;
    });

}