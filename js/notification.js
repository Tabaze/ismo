
$(document).ready(function () {
    cookiesNoti()
    htmlNotification();
    var $notification = $('#notification');
    var $countNotif = $notification.find('#countNotif');
    var $listAlert = $notification.find('#listAlert');
    randerNotification();
    // $listAlert.on('click', '.downGroubModele', function() {
    //     var $icon = $(this);
    //     $(this).closest('.GroubModele').find('.notificationGroubModele').toggle(function() {
    //         $icon.toggleClass('fa-caret-square-down fa-caret-square-up');
    //     });
    // });
    $listAlert.on('click', '.txtGroubModele', function () {
        var $icon = $(this).find('i');
        $(this).closest('.GroubModele').find('.notificationGroubModele').toggle(function () {
            $icon.toggleClass('fa-caret-square-down fa-caret-square-up');
        });
    });
    function randerNotification() {
        var obj = JSON.parse(sessionStorage.Notification);
        if (obj.count == 0) {
            $countNotif.html('');
        } else {
            console.log(obj)
            $countNotif.html(obj.count);
            $listAlert.html('');
            stockAlertFavori(obj.stockAlertFavotis);
            stockAlert(obj.stockAlert);
            soldClientAlert(obj.soldClientAlert);
            soldForAlert(obj.soldForAlert);
            blClient(obj.blClient);
            blFou(obj.blFou);
            chequeClient(obj.chequeClient);
            chequeFor(obj.chequeFor);
            dureDevie(obj.DureDevie);
            planning(obj.planning)
            //dateExpiration(obj.stockDateExpiration);            
        }

    }
    function planning(list) {
        if (list) {
            let $group = groubModele('Planning');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                ${list[i].column_1.toUpperCase()} ${list[i].column_2.toUpperCase()} ${list[i].column_3.toUpperCase()}
                </div>
                <div class="txt sub px-2">-Type Actions : ${list[i].column_4}</div>
                <div class="txt sub px-2">-Objet : ${list[i].column_5}</div>
                <div class="txt sub px-2">-Description : ${list[i].column_6}</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    // function stockAlertFavotis(list) {
    //     if (list) {
    //         let $group = groubModele('notiStockinsuffisant');
    //         $listAlert.append($group);
    //         let $html = $('<div class="notificationGroubModele text-start"></div>');
    //         for (i in list) {
    //             $html.append('<div class="sec"><div class="txt">' + list[i].column_1 + ' , ' + list[i].column_2 + ' , ' + list[i].column_4 + ' , ' + list[i].column_5 + '</div><div class="txt sub">En Depot : ' + list[i].column_3 + '</div></div>')
    //         }
    //         $group.append($html);
    //     }
    // }
    function stockAlert(list) {
        if (list) {
            let $group = groubModele('notiStockinsuffisant');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_2 + `( ` + list[i].column_1 + `)
                </div>
                <div class="txt sub px-2">Qte : ` + ittone.QteFormat(list[i].column_4) + `</div>
                <div class="txt sub px-2">En Depot : ` + list[i].column_3 + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }
    function stockAlertFavori(list) {
        if (list) {
            let $group = groubModele('notiStockinsuffisantFavori');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_2 + `( ` + list[i].column_1 + `)
                </div>
                <div class="txt sub px-2">Qte : ` + ittone.QteFormat(list[i].column_4) + `</div>
                <div class="txt sub px-2">En Depot : ` + list[i].column_3 + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }
    function soldClientAlert(list) {
        if (list) {
            let $group = groubModele('notiSoldClinetAlert');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_1 + `
                </div>
                <div class="txt sub px-2">Credit : ` + ittone.CurrencyFormat(list[i].column_3) + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    function soldForAlert(list) {
        if (list) {
            let $group = groubModele('notiSoldFournisseurAlert');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_1 + `
                </div>
                <div class="txt sub px-2">Credit : ` + ittone.CurrencyFormat(list[i].column_3) + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    function blClient(list) {
        if (list) {
            let $group = groubModele('notiBLClient');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_2 + ` ( Numéro ` + list[i].column_1 + ` )
                </div>
                <div class="txt sub px-2">Total TTC : ` + ittone.CurrencyFormat(list[i].column_4) + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    function blFou(list) {
        if (list) {
            let $group = groubModele('notiBlFou');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_2 + ` ( Numéro ` + list[i].column_1 + ` )
                </div>
                <div class="txt sub px-2">Total TTC : ` + ittone.CurrencyFormat(list[i].column_4) + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    function chequeClient(list) {
        if (list) {
            let $group = groubModele('notiChequeClient');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_4 + ` ( Numéro ` + list[i].column_5 + ` )
                </div>
                <div class="txt sub px-2">Montant : ` + ittone.CurrencyFormat(list[i].column_6) + `</div>
                <div class="txt sub px-2">Nom Tresorories : ` + list[i].column_3 + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    function chequeFor(list) {
        if (list) {
            let $group = groubModele('notiChequeFor');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_4 + ` ( Numéro ` + list[i].column_5 + ` )
                </div>
                <div class="txt sub px-2">Montant : ` + ittone.CurrencyFormat(list[i].column_6) + `</div>
                <div class="txt sub px-2">Nom Tresorories : ` + list[i].column_3 + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }

    function dateExpiration(list) {
        if (list) {
            let $group = groubModele('dateExpiration');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele"></div>');
            for (i in list) {
                $html.append('<div class="sec"><div class="txt">' + list[i].column_1 + ' , ' + list[i].column_2 + ' </div><div class="txt sub">' + list[i].column_3 + ' : ' + list[i].column_4 + ', Date = ' + ist[i].column_5 + '</div></div>')
            }
            $group.append($html);
        }
    }
    function dureDevie(list) {
        if (list) {
            let $group = groubModele('notiDureDevie');
            $listAlert.append($group);
            let $html = $('<div class="notificationGroubModele text-start" style="display: none;"></div>');
            for (let i in list) {
                $html.append(`<div class="sec mt-2">
                <div class="txt px-2">
                `   + list[i].column_2 + `( ` + list[i].column_1 + `)
                </div>
                <div class="txt sub px-2">Numéro Facture : ` + list[i].column_3 + `</div>
                <div class="txt sub px-2">Nom Client : ` + list[i].column_4 + `</div>
                </div>`);
            }
            $group.append($html);
        }
    }
});
const htmlNotification = function () {
    $('#notification').append(`<div class="number" id="countNotif"></div><div class="box">
                                <div class="display fs-6"><div class="cont" id="listAlert">
                                </div></div>
                                </div>`);
}
const groubModele = function (msg) {
    return $(`<div class="GroubModele">
    <div class="new txtGroubModele p-3">
    <span class="float-start">` + i18n.translate(msg) + `</span>
    <i class="downGroubModele fas fa-caret-square-up"></i>
    </div>
    </div>`);
}
const cookiesNoti = () => {
    // setInterval(() => {
    var cookies = document.cookie.split(';');
    let lt = ittone.AjaxJson(url + '/ModeleTier.aspx/listActionClient', JSON.stringify({ param: [{ idClient: 0 }] }));
    var now = moment();
    lt.filter(function (obj) {
        var heureAlarm = moment(obj.dateAlarm);
        var timeDifference = heureAlarm.diff(now, 'minutes');
        //return obj
        return (
            obj.fait !== true &&
            heureAlarm.isSame(now, 'day') &&
            timeDifference <= 30
        );
    }).forEach(element => {
        if ("Notification" in window) {
            Notification.requestPermission().then(function (permission) {
                //if (permission === "granted") {
                    var notification = new Notification(`${element.civilite.toUpperCase()} ${element.nomContact.toUpperCase()} ${element.nomComplet.toUpperCase()} From ${element.nomClient.toUpperCase()}`, {
                        body: `- Type Actions : ${element.nomType}
                        - Objet : ${element.objet}
                        - Description : ${element.descri}`,
                        icon: url + "/image/logo/ITTONEERP.ico",
                    });
                    notification.addEventListener("click", function () {
                        window.open(url + '/Calendar/index.html');
                    });
                    setTimeout(function () {
                        notification.close();
                    }, 5000);
                //}
            });
        }
    });
    // }, 60000)
}