'use strict';

import { templateActions } from "../../../js/ModeleTier/component.js";


var popup_cal = $('#calendar-popup');
var isPrivate = false;
var isAllDay = false;
var DatePicker = tui.DatePicker;
var selectedCalendar, rangePicker;
var Schedules = [];
function refreshScheduleVisibility() {
    var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

    CalendarList.forEach(function (calendar) {
        cal.toggleSchedules(calendar.id, !calendar.checked, false);
    });

    cal.render(true);

    calendarElements.forEach(function (input) {
        var span = input.nextElementSibling;
        span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
    });
}
export function call_popupDetails(Schedule) {
    Schedules = Schedule;
    html_popupDetails(Schedule.schedule);
    popup_cal.show();
}
function call_popup(Schedule, state) {
    html_popup_update(Schedule.schedule);
}
function html_popup_update(schedule) {

    templateActions(null, schedule.id, null, $('#referesh'))
    // document.getElementById('calendar-popup').innerHTML = element;
    // isPrivate = schedule.isPrivate;
    // isAllDay = schedule.isAllDay;
    //edite_option(schedule.calendarId, schedule.id);
}
function edite_option(calendarid, id) {
    selectedCalendar = findCalendar(calendarid);
    popup_cal.find('#tui-full-calendar-schedule-calendar').text(selectedCalendar.name);
    popup_cal.find('button .tui-full-calendar-icon.tui-full-calendar-calendar-dot').css('background-color', selectedCalendar.bgColor);
    if (selectedCalendar.name == 'Client') {
        $('#select-tier').show();
        $('#select-tier').find('.js-example-basic-multiple').select2({
            data: listclient,
            width: '75%',
            'z-index': '1000'
        });
    } else {
        $('#select-tier').hide();
    }
    if (isPrivate) {
        popup_cal.find('#tui-full-calendar-schedule-private').removeClass('tui-full-calendar-public');
    }
    if (isAllDay) {
        popup_cal.find('.tui-full-calendar-popup-section-item.tui-full-calendar-section-allday input').prop("checked", isAllDay);
    }
    if (selectedCalendar.name == 'Client' || selectedCalendar.name == 'Fournisseur') {
        var sh = findSchedule(id);
        $('#select-tier').find('.js-example-basic-multiple').val(sh.codetier);
        $('#select-tier').find('.js-example-basic-multiple').trigger('change');
    }
}
function html_popupDetails(schedule) {
    var el = '';
    if (schedule.isAllDay) {
        var start = moment(schedule.start._date).format('YYYY-MM-DD hh:mm');
        var end = moment(schedule.end._date).format('YYYY-MM-DD hh:mm');
        el = String(start) + ' - ' + String(end);
    } else {
        var start = moment(schedule.start._date).format('YYYY-MM-DD hh:mm');
        var end = moment(schedule.end._date).format('YYYY-MM-DD hh:mm');
        el = String(start) + ' - ' + String(end);
    }
    var cal = findCalendar(schedule.calendarId);
    var tier = '';
    var sh = findSchedule(schedule.id);
    tier = '<div class="tui-full-calendar-popup-detail-item"><span class="tui-full-calendar-icon tui-full-calendar-ic-user-b"></span><span class="tui-full-calendar-content">' + sh.codetier + ' ~ ' + sh.nomtier + '</span></div>';
    var element = `<div class="tui-full-calendar-popup tui-full-calendar-popup-detail">
                        <div class="tui-full-calendar-popup-container">
                            <div class="tui-full-calendar-popup-section tui-full-calendar-section-header"><div>
                                <span class="tui-full-calendar-schedule-private tui-full-calendar-icon tui-full-calendar-ic-private"></span>
                                <span class="tui-full-calendar-schedule-title">${schedule.title}</span>
                            </div>
                            <div class="tui-full-calendar-popup-detail-date tui-full-calendar-content" style="font-size:12px !important">${el}</div>
                        </div>
                        <div class="tui-full-calendar-section-detail">
                            <!--<div class="tui-full-calendar-popup-detail-item">
                                 <span class="tui-full-calendar-icon tui-full-calendar-ic-location-b"></span>
                                 <span class="tui-full-calendar-content">${schedule.location}</span>
                            </div>-->
                            ${tier}
                            <div class="tui-full-calendar-popup-detail-item">
                                <span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color: ${cal.codeColor}"></span>
                                <span class="tui-full-calendar-content">${cal.nomType}</span>
                            </div>
                            <div class="tui-full-calendar-popup-detail-item tui-full-calendar-popup-detail-item-separate">
                                <span class="tui-full-calendar-content">${schedule.body}</span></div>
                            </div>
                            <div class="tui-full-calendar-section-button">
                                <button class="tui-full-calendar-popup-edit">
                                    <span class="tui-full-calendar-icon tui-full-calendar-ic-edit"></span>
                                    <span class="tui-full-calendar-content">Edit</span>
                                </button>
                                <div class="tui-full-calendar-popup-vertical-line" style='height: 40px;'></div>
                                <button class="tui-full-calendar-popup-delete">
                                    <span class="tui-full-calendar-icon tui-full-calendar-ic-delete"></span>
                                    <span class="tui-full-calendar-content">Delete</span>
                                </button>
                            </div>
                        </div>
                        <div class="tui-full-calendar-popup-top-line" style="background-color: ${cal.bgColor}"></div>
                        <div id="tui-full-calendar-popup-arrow" class="tui-full-calendar-popup-arrow tui-full-calendar-arrow-left">
                            <div class="tui-full-calendar-popup-arrow-border">
                                <div class="tui-full-calendar-popup-arrow-fill"></div>
                            </div>
                        </div>
                    </div>`;
    document.getElementById('calendar-popup').innerHTML = element;
}
function popuphide() {
    popup_cal.hide();
    popup_cal.html('');
    Schedules = null;
    selectedCalendar = null;
    isPrivate = false;
    isAllDay = false;
}
function html_popup() {
    // var element='<div class="tui-full-calendar-popup">'+
    //         '<div class="tui-full-calendar-popup-container">'+
    //         '<div class="tui-full-calendar-popup-section tui-full-calendar-dropdown tui-full-calendar-close tui-full-calendar-section-calendar" style="display: inline-block;">'+
    //         '<button class="tui-full-calendar-button tui-full-calendar-dropdown-button tui-full-calendar-popup-section-item">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color:'+CalendarList[0].bgColor+'"></span>'+
    //         '<span id="tui-full-calendar-schedule-calendar" class="tui-full-calendar-content">'+CalendarList[0].name+'</span>'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-dropdown-arrow"></span></button>'+
    //             '<ul class="tui-full-calendar-dropdown-menu" style="z-index: 1004">'+
    //             CalendarList.map(function(calendar){
    //                 return '<li class="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item" data-calendar-id="'+calendar.id+'">'+
    //                     '<span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color: '+calendar.bgColor+'"></span>'+
    //                     '<span class="tui-full-calendar-content">'+calendar.name+'</span></li>'
    //             }).join('')+
    //         '</ul></div>'+
    //         '<div id="select-tier"><select class="js-example-basic-multiple"></select></div>'+
    //         '<div class="tui-full-calendar-popup-section">'+
    //         '<div class="tui-full-calendar-popup-section-item tui-full-calendar-section-title">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-ic-title"></span>'+
    //         '<input id="tui-full-calendar-schedule-title" class="tui-full-calendar-content" placeholder="Subject" value="">'+
    //         '</div>'+
    //         '<button id="tui-full-calendar-schedule-private" class="tui-full-calendar-button tui-full-calendar-section-private tui-full-calendar-public">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-ic-private"></span>'+
    //         '</button>'+
    //         '</div>'+
    //         '<div class="tui-full-calendar-popup-section">'+
    //         '<textarea id="tui-full-calendar-schedule-Body"  class="tui-full-calendar-content" placeholder="Body" ></textarea>'+
    //         '</div>'+
    //         '<div class="tui-full-calendar-popup-section">'+
    //         '<div class="tui-full-calendar-popup-section-item tui-full-calendar-section-location">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-ic-location"></span>'+
    //         '<input id="tui-full-calendar-schedule-location" class="tui-full-calendar-content" placeholder="Location" value=""></div></div>'+
    //         '<div class="tui-full-calendar-popup-section">'+
    //         '<div class="tui-full-calendar-popup-section-item tui-full-calendar-section-start-date">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-ic-date"></span>'+
    //         '<input id="tui-full-calendar-schedule-start-date" class="tui-full-calendar-content" placeholder="Start date">'+
    //         '<div id="tui-full-calendar-startpicker-container" style="margin-left: -1px; position: relative"></div></div>'+
    //         '<span class="tui-full-calendar-section-date-dash">-</span>'+
    //         '<div class="tui-full-calendar-popup-section-item tui-full-calendar-section-end-date">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-ic-date"></span>'+
    //         '<input id="tui-full-calendar-schedule-end-date" class="tui-full-calendar-content" placeholder="Start date">'+
    //         '<div id="tui-full-calendar-endpicker-container" style="margin-left: -1px; position: relative"></div></div>'+
    //         '<div class="tui-full-calendar-popup-section-item tui-full-calendar-section-allday">'+
    //         '<input id="tui-full-calendar-schedule-allday" type="checkbox" class="tui-full-calendar-checkbox-square">'+
    //         '<span class="tui-full-calendar-icon tui-full-calendar-ic-checkbox"></span>'+
    //         '<span class="tui-full-calendar-content">Toute la journe</span></div>'+
    //         '<button class="tui-full-calendar-button tui-full-calendar-popup-close"><span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span></button>'+
    //         '<div class="tui-full-calendar-section-button-save"><button class="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"><span>Save</span></button></div>'+
    //         '</div>';
    // document.getElementById('calendar-popup').innerHTML=element;
}
function createDatepicker(start, end, isAllDay) {
    rangePicker = DatePicker.createRangePicker({
        startpicker: {
            date: moment(start._date).toDate(),
            input: '#tui-full-calendar-schedule-start-date',
            container: '#tui-full-calendar-startpicker-container'
        },
        endpicker: {
            date: moment(end._date).toDate(),
            input: '#tui-full-calendar-schedule-end-date',
            container: '#tui-full-calendar-endpicker-container'
        },
        format: isAllDay ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm',
        timepicker: isAllDay ? null : {
            showMeridiem: false,
            usageStatistics: true
        },
        usageStatistics: true
    });
}
function onNewSchedule() {
    var title = $('#tui-full-calendar-schedule-title').val();
    var body = $('#tui-full-calendar-schedule-Body').val();
    var location = $('#tui-full-calendar-schedule-location').val();
    var isAllDay = document.getElementById('tui-full-calendar-schedule-allday').checked;
    var start = rangePicker.getStartDate();
    var end = rangePicker.getEndDate();
    var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];
    if (!title) {
        return;
    }
    var codetier = '';
    var nomtier = '';
    if (calendar.name == 'Client' || calendar.name == 'Fournisseur') {
        var data = $('#select-tier').find('.js-example-basic-multiple').select2('data');
        if (data) {
            codetier = data[0].id;
            nomtier = data[0].text;
        }
    }
    var id = insertSchedules(calendar.id, title, body, isAllDay, start, end, location, codetier, nomtier);
    cal.createSchedules([{
        id: String(id),
        calendarId: calendar.id,
        title: title,
        body: body,
        location: location,
        isAllDay: isAllDay,
        start: start,
        end: end,
        isPrivate: isPrivate,
        category: isAllDay ? 'allday' : 'time',
        dueDateClass: '',
        color: calendar.color,
        bgColor: calendar.bgColor,
        dragBgColor: calendar.bgColor,
        borderColor: calendar.borderColor,
        codetier: codetier,
        nomtier: nomtier
    }]);
    refreshScheduleVisibility();
    popuphide();
    //console.log(scheduleData);
    //$('#modal-new-schedule').modal('hide');
}
function onUpdateSchedule() {
    var title = $('#tui-full-calendar-schedule-title').val();
    var body = $('#tui-full-calendar-schedule-Body').val();
    var location = $('#tui-full-calendar-schedule-location').val();
    var isAllDay = document.getElementById('tui-full-calendar-schedule-allday').checked;
    var start = rangePicker.getStartDate();
    var end = rangePicker.getEndDate();
    var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];
    if (!title) {
        return;
    }
    var codetier = '';
    var nomtier = '';

    if (calendar.name == 'Client' || calendar.name == 'Fournisseur') {
        var data = $('#select-tier').find('.js-example-basic-multiple').select2('data');
        if (data) {
            codetier = data[0].id;
            nomtier = data[0].text;
        }
    }
    updateSchedule(calendar.id, title, body, isAllDay, start, end, location, codetier, nomtier, Schedules.schedule.id);
    var changes = {
        calendarId: calendar.id,
        title: title,
        body: body,
        location: location,
        isAllDay: isAllDay,
        start: start,
        end: end,
        isPrivate: isPrivate,
        category: isAllDay ? 'allday' : 'time',
        dueDateClass: '',
        color: calendar.color,
        bgColor: calendar.bgColor,
        dragBgColor: calendar.bgColor,
        borderColor: calendar.borderColor
    };

    cal.updateSchedule(Schedules.schedule.id, Schedules.schedule.calendarId, changes);
    refreshScheduleVisibility();
    popuphide();
}
function insertSchedules(calendarId, title, body, isAllDay, start, end, location, codetier, nomtier) {
    var start = new Date(start);
    var end = new Date(end);
    var id = 0;
    $.ajax
        ({
            type: 'POST',
            url: 'Default.aspx/insertSchedules',
            async: false,
            data: "{'calendarId':'" + calendarId +
                "','title':'" + title +
                "','body':'" + body +
                "','isAllDay':'" + isAllDay +
                "','start':'" + start.toJSON() +
                "','end':'" + end.toJSON() +
                "','isPrivate':'" + isPrivate +
                "','codetier':'" + codetier +
                "','nomtier':'" + nomtier +
                "','location':'" + location + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function (data) {
                id = data.d;
                console.log(data.d);
                //CalendarList = data.d;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //alertify.error(err.Message);
                console.log(err.Message);
            }
        });
    return id;
}
export function updateSchedule(data) {
    $.ajax
        ({
            type: 'POST',
            url: 'Default.aspx/updateSchedule',
            async: false,
            data: data,
            contentType: 'application/json; charset =utf-8',
            success: function (data) {
                //CalendarList = data.d;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                ittone.error(err.Message)
                console.log(err.Message);
            }
        });
}
function deleteSchedule(id) {
    $.ajax
        ({
            type: 'POST',
            url: 'Default.aspx/deleteSchedule',
            async: false,
            data: "{'id':'" + id + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function (data) {
                ittone.success('Success')
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //alertify.error(err.Message);
                console.log(err.Message);
            }
        });
}
popup_cal.on('click', 'button.tui-full-calendar-dropdown-button', function () {
    popup_cal.find('ul.tui-full-calendar-dropdown-menu').toggle();
});
popup_cal.on('click', 'ul.tui-full-calendar-dropdown-menu li', function () {
    selectedCalendar = findCalendar($(this).attr('data-calendar-id'));
    popup_cal.find('#tui-full-calendar-schedule-calendar').text(selectedCalendar.name);
    popup_cal.find('button .tui-full-calendar-icon.tui-full-calendar-calendar-dot').css('background-color', selectedCalendar.bgColor);
    popup_cal.find('ul.tui-full-calendar-dropdown-menu').hide();
    $('#select-tier').find('.js-example-basic-multiple').html('');
    if (selectedCalendar.name == 'Client') {
        $('#select-tier').show();
        $('#select-tier').find('.js-example-basic-multiple').select2({
            data: listclient,
            width: '75%',
            'z-index': '1000'
        });
    } else {
        if (selectedCalendar.name == 'Fournisseur') {
            $('#select-tier').show();
            $('#select-tier').find('.js-example-basic-multiple').select2({
                data: listfournisseur,
                width: '75%',
                'z-index': '1000'
            });
        } else {
            $('#select-tier').hide();
        }
    }

});
popup_cal.on('click', '#tui-full-calendar-schedule-private', function () {
    $(this).toggleClass('tui-full-calendar-public');
    isPrivate = !isPrivate;
});
popup_cal.on('click', '.tui-full-calendar-popup-section-item.tui-full-calendar-section-allday', function () {
    var check = $(this).find('input').prop("checked");
    $(this).find('input').prop("checked", !check);
    isAllDay = check;
});
popup_cal.on('click', 'button.tui-full-calendar-popup-edit', function () {
    call_popup(Schedules, 'edit');
});
popup_cal.on('click', 'button.tui-full-calendar-popup-delete', function () {
    cal.deleteSchedule(Schedules.schedule.id, Schedules.schedule.calendarId);
    deleteSchedule(Schedules.schedule.id);
    popuphide();
});
popup_cal.on('click', '.tui-full-calendar-section-button-save button', function () {
    onNewSchedule();
});
popup_cal.on('click', '.tui-full-calendar-section-button-update button', function () {
    onUpdateSchedule();
});
popup_cal.on('click', '.tui-full-calendar-button.tui-full-calendar-popup-close', function () {
    refreshScheduleVisibility();
    popuphide();
});
$(document).mouseup(function (e) {
    if (!popup_cal.is(e.target) && popup_cal.has(e.target).length === 0 && "select2-results__option select2-results__option--highlighted" != e.target.className && "select2-search__field" != e.target.className) {

        refreshScheduleVisibility();
        popuphide();
    }

});
