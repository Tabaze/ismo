import { selectTier, selectTierEmail, tableEmails } from "./component.js";
import { listEmailsParTier, insertUpdateEmails, EmailsById } from "./service.js";
import { listEmailsSettings } from "../ModeleUsers/service.js"
import { sendEmail } from "../ModeleArticle/service.js";
const nonceValue = 'nonce_value';
// const url = 'http://192.168.100.10:4545/emails/mail.php';
// const urlAttachements = 'http://192.168.100.10:4545/emails/';
// const host = 'ajoun.ma';
// const username = 'admin@ajoun.ma';
// const password = 'mouad@admin';
// const port = '993';
// const portSmtp = 465;
// const fromName = 'ajoun';
var urlServer = '';
var urlAttach = '';
var hostSm = '';
var usernameSm = '';
var passwordSm = '';
var portSm = '';
var fromNameSm = '';
var checkSMTP = '';
var hostIm = '';
var usernameIm = '';
var passwordIm = '';
var portIm = '';
$(function () {
    loadApp();
    $('#deleteRow').on('click', this, function () {
        let rows = tableRander.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de la suppression', function () {
                let data = rows.data();
                switch (ittone.getSubMenu()) {
                    case 'Sent': data.map(function (dt) {
                        if (deleteSendEmails({ id: dt.idEmail })) {
                            ittone.deleteRowDataTable(tableRander, dt.idEmail);
                            ittone.success("successfully");
                        }
                    }); break;
                    case 'Inbox': data.map(function (dt) {
                        $.LoadingOverlay("show");
                        let uid = dt.uid;
                        let idEmail = dt.idEmail;
                        deletMsg(uid, idEmail, dt);
                    }); break;
                }
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });

    function loop(i, data, td, file) {
        setTimeout(function () {
            if (i < td.length) {
                data.idClient = td[i].data.id
                data.email = td[i].data.email
                data.typeTier = td[i].data.typeTier
                data.idArticle = 0
                data.fileName = Math.floor(Math.random() * 100000000) + '_' + Date.now() + '.' + (file ? file.split('.')[file.split('.').length - 1] : '')
                console.log(data)
                // return
                sendEmail(data);
                i++;
                loop(i, data, td, file)
            }
            else {
                ittone.hide($('#loading'))
                ittone.hide($.modalSent.parent());
                randerTableSent();
            }
        }, 100)
    }
    $('#formSent').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.dateEmail = $('#dateEmail').getDate();
            data.body = GetContents(CKEDITOR.instances.editor)
            delete data.editor
            let file
            data.files = ''
            if ($('#files').prop('files').length != 0) {
                file = $('#files').prop('files')[0].name;
                let fileName = Math.floor(Math.random() * 2000) + '_' + Date.now();
                const selectedFile = $('#files').prop('files')[0];
                const fileSlice = selectedFile.slice(0, selectedFile.size, selectedFile.type);
                const fileBlob = new Blob([fileSlice], { type: selectedFile.type });
                const files = new File([fileBlob], fileName, {
                    type: selectedFile.type,
                })
                data.files = files
            }
            let td = $('#to').select2('data')
            ittone.show($('#loading'))
            let i = 0
            loop(i, data, td, file)
        }
    });
    $('#idTier').on('change', this, function () {
        let selectedOptions = $('#idTier').select2('data');
        $('#to').html('').trigger('change');
        for (let i = 0; i < selectedOptions.length; i++) {
            let id = selectedOptions[i].id;
            let typeTier = selectedOptions[i].typeTier;
            let emails = listEmailsParTier({ param: [{ id: id, typeTier: typeTier }] });
            for (let j = 0; j < emails.length; j++) {
                let newOption = new Option(emails[j].email, emails[j].email, true, true);
                $('#to').append(newOption).trigger('change');
            }
        }
    });
    $.tableView.on('dblclick', 'tbody tr', function () {
        return
        var seen = tableRander.row(this).data().seen;
        switch (ittone.getSubMenu()) {
            case 'Sent': randerFormEmails(tableRander.row(this).data().idEmail); break;
            case 'Inbox':
                if (!seen) {
                    seenMsg(tableRander.row(this).data().uid);
                }
                else {
                    $.LoadingOverlay("hide");
                }
                break;
        }
    });
});
var tableRander;
const loadApp = function () {
    let name = ittone.getSubMenu();
    let dateDossier = ittone.dateExeDossier();
    const startOfMonth = moment().startOf('Month').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    const endOfMonth = moment().endOf('Month').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    $('#dateStart').setDate(startOfMonth);
    $('#dateEnd').setDate(endOfMonth);
    $('#to').select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });
    switch (name) {
        case 'Sent':
            selectTier($('#idTier'));
            selectTierEmail($('#to'));
            // $('#to').select2({
            //     tags: true,
            //     tokenSeparators: [',', ' ']
            // });
            randerTableSent();
            emailsSettingsInfos();
            const id = new URL(window.location.href).searchParams.get("id");
            if (id) {
                settingForma(false);
                $('#to').val([id]).trigger('change')
                ittone.show($.modalSent.parent())
            }
            break;
        case 'Inbox': listMail(); break;
        case 'Spam': listMail(); break;
        case 'Archives': listMail(); break;
    }
};
const emailsSettingsInfos = function () {
    let data = listEmailsSettings();
    $.each(data, function (i, a) {
        urlServer = a.urlServer;
        urlAttach = a.urlAttach;
        hostSm = a.hostSm;
        usernameSm = a.usernameSm;
        passwordSm = a.passwordSm;
        portSm = a.portSm;
        fromNameSm = a.fromNameSm;
        checkSMTP = a.checkSMTP;
        hostIm = a.hostIm;
        usernameIm = a.usernameIm;
        passwordIm = a.passwordIm;
        portIm = a.portIm;
    });
};
const randerTableSent = function () {
    let columns_title = [
        { "data": "to", "title": i18n.translate("to") },
        { "data": "subject", "title": i18n.translate("subject") },
        {
            "data": "dateEmail", "title": i18n.translate("dateEmail"),
            render: function (dateEmail) {
                return ittone.convertDate(dateEmail);
            }
        },
    ];
    let dt = {
        dateD: $('#dateStart').getDate(),
        dateE: $('#dateEnd').getDate(),
        folder: ittone.getSubMenu()
    }
    tableRander = tableEmails($.tableView, columns_title, dt);
};
const randerFormEmails = function (id) {
    let list = EmailsById({ id: id })[0];
    $.modalSent.attr('id', id);
    ittone.convertJsonToForm($('#formSent'), list);
    $('#dateEmail').setDate(list.dateEmail);
    ittone.show($.modalSent.parent());
    settingForma(true);
};
const sendEmailMoad = function (dataInsert) {
    // $.LoadingOverlay("show");
    let data = {
        host: hostSm,
        username: usernameSm,
        password: passwordSm,
        statment: 'sendEmail',
        SMTPAuth: checkSMTP,
        port: portSm,
        fromName: fromNameSm,
        to: dataInsert.to,
        subject: dataInsert.subject,
        msg: dataInsert.message,
        hostImap: '{' + hostIm + ':' + portIm + '/imap/ssl}',
    }
    let encryption = new Encryption();
    var encrypted = encryption.encrypt(JSON.stringify(data), nonceValue);
    var form_data = new FormData();
    jQuery.each(input, function (i, file) {
        form_data.append('file-' + i, file);
    });
    form_data.append("d", encrypted);
    $.ajax({
        type: "POST",
        url: url,
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json'
    }).done(function (d) {
        if (d.status === "success") {
            // $.LoadingOverlay("hide");
            insertemail(dataInsert);
        }
        // else {
        //     $.LoadingOverlay("hide");
        // }
    });
};
const insertemail = function (insert) {
    let dataInsert = {
        param: [{
            to: (insert.to).toString(),
            subject: insert.subject,
            dateEmail: insert.dateEmail,
            message: insert.message,
            folder: insert.folder,
            seen: insert.seen,
            attachements: insert.attachements,
            uid: insert.uid
        }]
    };
    let list = insertUpdateEmails(dataInsert)[0];
    if (list) {
        addInDataTable(tableRander, list);
        var columnData = tableRander.rows().data().pluck('uid');
        // Sort the column data using the sort() method of the Array object
        columnData.sort(function (a, b) {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        tableRander.rows().data(function (idx) {
            return columnData[idx];
        }).draw();
    }
};
const listMail = function () {
    checkDone = false;
    let folder = 'INBOX';
    switch (ittone.getSubMenu()) {
        case 'Inbox': folder = 'INBOX'; break;
        case 'Spam': folder = 'INBOX.spam'; break;
        case 'Archives': folder = 'INBOX.Archive'; break;
    }
    let data = {
        host: '{' + hostIm + ':' + portIm + '/imap/ssl}' + folder,
        username: usernameIm,
        password: passwordIm,
        statment: 'list'
    }
    let encryption = new Encryption();
    var encrypted = encryption.encrypt(JSON.stringify(data), nonceValue);
    $.ajax({
        type: "POST",
        url: url,
        data: {
            d: encrypted
        },
        dataType: 'json'
    }).done(function (d) {
        checkDone = true;
        if (d.status === "success") {
            var tbody = "";
            let json = d.data;
            $.each(json, function (i, a) {
                //return false;
                let datainsert = {
                    to: a.from.address,
                    subject: a.subject,
                    dateEmail: moment(a.date, 'YYYY-MM-DD'),
                    message: a.message,
                    folder: ittone.getSubMenu(),
                    uid: a.uid.toString(),
                    seen: a.seen,
                    fromName: a.from.name,
                    attachements: JSON.stringify(a.attachments)
                }
                insertemail(datainsert)
            });
            if (ittone.getSubMenu() == 'Inbox') {
                SecondesFunction();
                //$.LoadingOverlay("hide");
            }
        } else {
            alert(d.message);
        }
    });
};
var fileHTML = `<div class="col-lg-3 ùcol-md-3 col-sm-12 cartFile">
<div class="card" style="background: #fff;transition: .5s; border: 0; 
margin-bottom: 30px; margin-top: 10px ;border-radius: 0.55rem;position: relative;
width: 100%;box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);">
    <div class="divFile"
        style="position: relative;border-radius: 0.55rem;overflow: hidden;">
        <a href="javascript:void(0);" class="file">
            <div class="icon"
                style="padding: 20px 10px;display: table;width: 100%;">
                <i class="fa fa-lg fa-file"
                    style="display: table-cell;font-size: 30px;vertical-align: middle;color: #777;line-height: 100px;">
                </i>
            </div>
            <div class="file-name"
                style="padding: 10px;border-top: 1px solid #f7f7f7;">
                <p class="m-b-5 text-muted nameFile">
                </p>
            </div>
        </a>
    </div>
</div>
</div>`;
const getFile = function (x) {
    let folder = 'INBOX';
    let data = {
        host: '{' + hostIm + ':' + portIm + '/imap/ssl}' + folder,
        username: usernameIm,
        password: passwordIm,
        statment: 'getFile',
        id: x.uid,
        part: x.part,
        file: x.file,
        encoding: x.encoding
    }
    let encryption = new Encryption();
    var encrypted = encryption.encrypt(JSON.stringify(data), nonceValue);
    $.ajax({
        type: "POST",
        url: url,
        data: {
            d: encrypted
        },
        dataType: 'json'
    }).done(function (d) {
        if (d.status === "success") {
            // $.LoadingOverlay("hide");
            window.open(urlAttachements + d.path, '_blank');
        }
        // else {
        //     $.LoadingOverlay("hide");
        // }
    });
};
const seenMsg = function (id, $mail) {
    let folder = 'INBOX';
    let data = {
        host: '{' + hostIm + ':' + portIm + '/imap/ssl}' + folder,
        username: usernameIm,
        password: passwordIm,
        statment: 'seenMsg',
        id: id
    }
    let encryption = new Encryption();
    var encrypted = encryption.encrypt(JSON.stringify(data), nonceValue);
    $.ajax({
        type: "POST",
        url: url,
        data: {
            d: encrypted
        },
        dataType: 'json'
    }).done(function (d) {
        if (d.status === "success") {
            // $.LoadingOverlay("hide");
        }
    });
};
const listMailLast = function () {
    if (checkDone) {
        let folder = 'INBOX';
        let data = {
            host: '{' + hostIm + ':' + portIm + '/imap/ssl}' + folder,
            username: usernameIm,
            password: passwordIm,
            statment: 'listLast'
        }
        let encryption = new Encryption();
        var encrypted = encryption.encrypt(JSON.stringify(data), nonceValue);
        checkDone = false;
        $.ajax({
            type: "POST",
            url: url,
            data: {
                d: encrypted
            },
            dataType: 'json'
        }).done(function (d) {
            checkDone = true;
            if (d.status === "success") {
                var tbody = "";
                let json = d.data;
                $.each(json, function (i, a) {
                    let datainsert = {
                        to: a.from.address,
                        subject: a.subject,
                        dateEmail: moment(a.date, 'YYYY-MM-DD'),
                        message: a.message,
                        folder: ittone.getSubMenu(),
                        uid: a.uid.toString(),
                        seen: a.seen,
                        fromName: a.from.name,
                        attachements: JSON.stringify(a.attachments)
                    }
                    insertemail(datainsert)
                });
            } else {
                alert(d.message);
            }
        });
    }
};
const SecondesFunction = function () {
    var Timer;
    Timer = setInterval(function () {
        console.log("5 secondes is finished");
        listMailLast();
    }, 30000);
}
const deletMsg = function (id, idEmail, $tr) {
    let data = {
        host: '{' + hostIm + ':' + portIm + '/imap/ssl}INBOX',
        username: usernameIm,
        password: passwordIm,
        statment: 'deletMsg',
        id: id
    }
    let encryption = new Encryption();
    var encrypted = encryption.encrypt(JSON.stringify(data), nonceValue);
    $.ajax({
        type: "POST",
        url: url,
        data: {
            d: encrypted
        },
        dataType: 'json'
    }).done(function (d) {
        if (d.status === "success") {
            deleteSendEmails({
                idEmail: idEmail,
            })
            alertify.success("تمت العملية بنجاح");
            $tr.remove();
            // $.LoadingOverlay("hide");
        } else {
            // $.LoadingOverlay("hide");
            alertify.error("إلغاء");
        }
    });
};
