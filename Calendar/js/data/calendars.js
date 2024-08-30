'use strict';

/* eslint-disable require-jsdoc, no-unused-vars */

var CalendarList = [];
var Id_dossier = sessionStorage.getItem('id_dossier');
var listclient = [];
var listfournisseur = [];
function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
}

function findCalendar(id) {
    var found;

    CalendarList.forEach(function(calendar) {
        if (calendar.id === id) {
            found = calendar;
        }
    });

    return found || CalendarList[0];
}

function hexToRGBA(hex) {
    var radix = 16;
    var r = parseInt(hex.slice(1, 3), radix),
        g = parseInt(hex.slice(3, 5), radix),
        b = parseInt(hex.slice(5, 7), radix),
        a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
    var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    return rgba;
}
function listcalendar() {
    CalendarList = ittone.AjaxJson('Default.aspx/listcalendar','')
}
(function() {
    listcalendar();
    // return
    // listclient_f();
    // listfournisseur_f();
    
    function listclient_f() {
        $.ajax
                 ({
                     type: 'POST',
                     url: 'Default.aspx/listclient',
                     async: false,
                     data: "{'Id_dossier':'" + Id_dossier + "'}",
                     contentType: 'application/json; charset =utf-8',
                     success: function (data) {
                         listclient = data.d;
                     },
                     error: function (xhr, status, error) {
                         var err = eval("(" + xhr.responseText + ")");
                         //alertify.error(err.Message);
                         console.log(err.Message);
                     }
                 });
    }
    function listfournisseur_f() {
        $.ajax
                 ({
                     type: 'POST',
                     url: 'Default.aspx/listfournisseur',
                     async: false,
                     data: "{'Id_dossier':'" + Id_dossier + "'}",
                     contentType: 'application/json; charset =utf-8',
                     success: function (data) {
                         listfournisseur = data.d;
                     },
                     error: function (xhr, status, error) {
                         var err = eval("(" + xhr.responseText + ")");
                         //alertify.error(err.Message);
                         console.log(err.Message);
                     }
                 });
    }
})();
name_dossier();
function name_dossier() {
    var Id_dossier = sessionStorage.getItem('id_dossier');
    if (Id_dossier != null) {
        $.ajax
          ({
              type: 'POST',
              url: '../dossier.aspx/get_name_exercice_dossier',
              async: false,
              data: "{'id_dossier':'" + Id_dossier + "'}",
              contentType: 'application/json; charset =utf-8',
              success: function (data) {
                  var list = data.d;
                  $('.dossier-topheader .dossier-rightheader .nom-dossier').text(list[0]);
                  $('body').css('background-color', list[1]);
                  $('.dossier-topheader').css('background-color', list[2]);
                  console.log(list[0], list[1], list[2])
              },
              error: function (xhr, status, error) {
                  var err = eval("(" + xhr.responseText + ")");
              }
          });
    }
}
var $o_home_menu = $('.o_home_menu.o_tooltip_parent');
var $btn_menu_toggle = $('.o_menu_toggle');
$btn_menu_toggle.on('click', function () {
    window.location.href = "../home-menu.aspx";
});
$('.header-button').on('click', this, function () {
    sessionStorage.removeItem('id_dossier');
    sessionStorage.clear();
    window.location.href = "../dossier.aspx";
});
