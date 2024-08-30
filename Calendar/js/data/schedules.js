'use strict';

/*eslint-disable*/

var ScheduleList = [];

var SCHEDULE_CATEGORY = [
    'milestone',
    'task'
];

function ScheduleInfo() {
    this.id = null;
    this.calendarId = null;

    this.title = null;
    this.body = null;
    this.isAllday = false;
    this.start = null;
    this.end = null;
    this.heureDebut = ''
    this.heureFin = ''
    this.category = '';
    this.dueDateClass = '';

    this.color = null;
    this.bgColor = null;
    this.dragBgColor = null;
    this.borderColor = null;
    this.customStyle = '';
    this.codetier = '';
    this.nomtier = '';
    this.isFocused = false;
    this.isPending = false;
    this.isVisible = true;
    this.isReadOnly = false;
    this.goingDuration = 0;
    this.comingDuration = 0;
    this.recurrenceRule = '';
    this.state = '';

    this.raw = {
        memo: '',
        hasToOrCc: false,
        hasRecurrenceRule: false,
        location: null,
        class: 'public', // or 'private'
        creator: {
            name: '',
            avatar: '',
            company: '',
            email: '',
            phone: ''
        }
    };
}

function generateTime(schedule, renderStart, renderEnd) {

    var startDate = moment(renderStart.getTime())
    var endDate = moment(renderEnd.getTime());
    var diffDate = endDate.diff(startDate, 'days');

    schedule.isAllday = chance.bool({ likelihood: 30 });
    if (schedule.isAllday) {
        schedule.category = 'allday';
    } else if (chance.bool({ likelihood: 30 })) {
        schedule.category = SCHEDULE_CATEGORY[chance.integer({ min: 0, max: 1 })];
        if (schedule.category === SCHEDULE_CATEGORY[1]) {
            schedule.dueDateClass = 'morning';
        }
    } else {
        schedule.category = 'time';
    }

    startDate.add(chance.integer({ min: 0, max: diffDate }), 'days');
    startDate.hours(chance.integer({ min: 0, max: 23 }))
    startDate.minutes(chance.bool() ? 0 : 30);
    schedule.start = startDate.toDate();

    endDate = moment(startDate);
    if (schedule.isAllday) {
        endDate.add(chance.integer({ min: 0, max: 3 }), 'days');
    }

    schedule.end = endDate
        .add(chance.integer({ min: 1, max: 4 }), 'hour')
        .toDate();

    if (!schedule.isAllday && chance.bool({ likelihood: 20 })) {
        schedule.goingDuration = chance.integer({ min: 30, max: 120 });
        schedule.comingDuration = chance.integer({ min: 30, max: 120 });;

        if (chance.bool({ likelihood: 50 })) {
            schedule.end = schedule.start;
        }
    }
}
function findSchedule(id) {
    var found;

    ScheduleList.forEach(function (Schedule) {
        if (Schedule.id === id) {
            found = Schedule;
        }
    });

    return found || ScheduleList[0];
}
function generateNames() {
    var names = [];
    var i = 0;
    var length = chance.integer({ min: 1, max: 10 });

    for (; i < length; i += 1) {
        names.push(chance.name());
    }

    return names;
}

function generateRandomSchedule(calendar, renderStart, renderEnd) {
    var schedule = new ScheduleInfo();
    schedule.id = chance.guid();
    schedule.calendarId = calendar.id;

    schedule.title = chance.sentence({ words: 3 });
    schedule.body = chance.bool({ likelihood: 20 }) ? chance.sentence({ words: 10 }) : '';
    schedule.isReadOnly = chance.bool({ likelihood: 20 });
    generateTime(schedule, renderStart, renderEnd);

    schedule.isPrivate = chance.bool({ likelihood: 10 });
    schedule.location = chance.address();
    schedule.attendees = chance.bool({ likelihood: 70 }) ? generateNames() : [];
    schedule.recurrenceRule = false ? 'repeated events' : '';
    schedule.state = chance.bool({ likelihood: 20 }) ? 'Free' : 'Busy';
    schedule.color = calendar.color;
    schedule.bgColor = calendar.bgColor;
    schedule.dragBgColor = calendar.dragBgColor;
    schedule.borderColor = calendar.borderColor;

    if (schedule.category === 'milestone') {
        schedule.color = schedule.bgColor;
        schedule.bgColor = 'transparent';
        schedule.dragBgColor = 'transparent';
        schedule.borderColor = 'transparent';
    }

    schedule.raw.memo = chance.sentence();
    schedule.raw.creator.name = chance.name();
    schedule.raw.creator.avatar = chance.avatar();
    schedule.raw.creator.company = chance.company();
    schedule.raw.creator.email = chance.email();
    schedule.raw.creator.phone = chance.phone();

    if (chance.bool({ likelihood: 20 })) {
        var travelTime = chance.minute();
        schedule.goingDuration = travelTime;
        schedule.comingDuration = travelTime;
    }

    ScheduleList.push(schedule);
}

function generateSchedule(viewName, renderStart, renderEnd) {
    ScheduleList = [];
    CalendarList.forEach(function (calendar) {
        var i = 0, length = 10;
        if (viewName === 'month') {
            length = 3;
        } else if (viewName === 'day') {
            length = 4;
        }
        listSchedule(calendar.idTypeAction, renderStart, renderEnd);
    });
}
function listSchedule(calendarId, renderStart, renderEnd) {
    var renderStart = new Date(renderStart);
    var renderEnd = new Date(renderEnd);
    let data = {
        idTypeAction: calendarId,
        renderStart: moment(renderStart),
        renderEnd: moment(renderEnd)
    }
    var list = ittone.AjaxJson('Default.aspx/listSchedule', JSON.stringify(data))
    for (var i in list) {
        var schedule = new ScheduleInfo();
        schedule.id = String(list[i].idAction);
        schedule.calendarId = calendarId;
        schedule.title = list[i].objet;
        schedule.body = list[i].descri || '';
        schedule.isReadOnly = list[i].fait;
        schedule.category = 'time';

        schedule.start = moment(list[i].dateDebut).set({ hour: list[i].heureDebut.split(':')[0], minute: list[i].heureDebut.split(':')[1] }).toDate();
        schedule.end = moment(list[i].dateFin).set({ hour: list[i].heureFin.split(':')[0], minute: list[i].heureFin.split(':')[1] }).toDate();
        schedule.heureDebut = list[i].heureDebut
        schedule.heureFin = list[i].heureFin
        schedule.codetier = list[i].codeClient;
        schedule.nomtier = list[i].nomClient;
        // schedule.isPrivate = list[i].fait;
        schedule.location = list[i].location;
        schedule.recurrenceRule = false ? 'repeated events' : '';
        schedule.color = list[i].codeColor;
        schedule.bgColor = list[i].colorRelation;
        // schedule.dragBgColor = list[i].codeColor;
        schedule.borderColor = list[i].codeColor;
        ScheduleList.push(schedule);
    }
}
