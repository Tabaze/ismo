
const url = new URL(window.location.href).origin;
const pathname = new URL(window.location.href).pathname;
const name = new URL(window.location.href).searchParams.get("name");
var menu = (function () {
    return {
        init: function (admin) {
            var menus = [];
            parentMenu();
            ClickNouveauModeles();
            if (!admin) menus = ittone.AjaxJson('ModeleUsers.aspx/Menu', '');
            switch (pathname) {
                case '/HomeMenu.aspx': this.home(menus, admin); break;
                case '/ModeleUsers.aspx': if (!admin) window.location.href = url + "/HomeMenu.aspx"; break;
                case '/ModeleDossier.aspx': if (!admin) {
                    $('#btnGestionUser').remove();
                    $('#listDossier').find('.add-folder').remove();
                } break;
                default: this.pages(admin); break;
            }
        },
        home: function (menus, admin) {
            if (!admin) {
                for (let i in menus) {
                    if (menus[i].install == 0)
                        $('.m_appModeles').find('a[data-modele="' + menus[i].codeMenu + '"]').remove();
                    else {
                        let menuSub = ittone.AjaxJson('ModeleUsers.aspx/MenuSub', JSON.stringify({ codeMenu: menus[i].codeMenu }));
                        if (menuSub.length) {
                            let menuSubInstall = menuSub.filter(e => e.install == 1);
                            if (menuSubInstall.length) {
                                let href = $('.m_appModeles').find('a[data-modele="' + menus[i].codeMenu + '"]').attr('href');
                                let name = menuSubInstall[0].nomSubMenu;
                                let indexof = href.indexOf('=');
                                href = href.slice(0, indexof + 1) + name;
                                $('.m_appModeles').find('a[data-modele="' + menus[i].codeMenu + '"]').attr('href', href);
                                $('.m_appModeles').find('a[data-modele="' + menus[i].codeMenu + '"]').removeClass('d-none');
                            } else {
                                $('.m_appModeles').find('a[data-modele="' + menus[i].codeMenu + '"]').remove();
                            }
                        } else {
                            $('.m_appModeles').find('a[data-modele="' + menus[i].codeMenu + '"]').remove();
                        }
                    }

                }
            } else {
                $('.m_appModeles').find('a').removeClass('d-none');
            }
            selectAllNotification();
        },
        pages: function (admin) {
            if (!admin) {
                let codeMenu = pathname.slice(1, pathname.length - 5);
                let menuSub = ittone.AjaxJson('ModeleUsers.aspx/MenuSub', JSON.stringify({ codeMenu: codeMenu }));
                for (let i in menuSub) {
                    if (menuSub[i].install == 0) {
                        if (menuSub[i].nomSubMenu == name) {
                            $('section,[role="dialog"]').remove();
                            ittone.warning('access');
                        }
                        $('#menu-header').find('li[data-model="' + menuSub[i].nomSubMenu + '"]').remove();
                    }
                    else
                        $('#menu-header').find('li[data-model="' + menuSub[i].nomSubMenu + '"]').removeClass('d-none');
                }
            } else {
                $('#menu-header').find('li').removeClass('d-none');
            }

        }
    }
})();
const selectAllNotification = function () {
    let data = {
        idDossier: ittone.idDossier()
    }
    let list = ittone.AjaxJson('HomeMenu.aspx/selectAllNotification', JSON.stringify(data));
    console.log(list)
    var groupBy = function (list, key) {
        return list.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    var groubedByName_Alert = groupBy(list, 'name_Alert');
    groubedByName_Alert.count = list.length;
    sessionStorage.setItem('Notification', JSON.stringify(groubedByName_Alert));
}
const parentMenu = function () {
    let sessionParentMenu = localStorage.getItem("parentMenu");
    if (sessionParentMenu) {
        $('[href="' + sessionParentMenu + '"]').tab('show');
        $('[href="' + sessionParentMenu + '"]').addClass('active')
    }
    $('#parentMenu').on('click', 'a', function () {
        localStorage.setItem("parentMenu", $(this).attr('href'));
    });

}
const ClickNouveauModeles = function () {
    $('.NvModels').on('click', this, function () {
        ittone.warning("En Cours d'éxecution")
        $(this).removeClass('active')
        $(this).closest('ul').find('li:first-of-type button').click()
    })
    // const overlay = document.querySelector('.nav-list .overlay');
    // const nav_list = document.querySelectorAll('.nav-list ul li');
    // nav_list.forEach((list) => {
    //     list.addEventListener('click', () => {
    //         let position = list.getBoundingClientRect();
    //         overlay.classList.add('active');
    //         overlay.style.left = position.x + 'px';
    //         overlay.style.top = position.height * 2 + 'px';
    //         overlay.style.width = position.width + 'px';
    //     });
    // });
    // $(nav_list[1]).click()
}
