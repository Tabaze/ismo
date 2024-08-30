import { selectAllDossier } from '../../../js/ModeleDossier/component.js';
import { selectClientAll, selectFournisseurAll } from '../../../js/ModeleTier/component.js';
import { selectEmploye } from '../../../ModelePaie/js/ModeleEmploye/component.js';
import { createFolder, deleteFolder, deleteFile, DownloadFile, updateFolder } from './service.js';
import { widgetFolder, listFile } from './component.js';
$(function () {
    loadApp();
    $('#filterDate').on('click', this, function () {

    });
    $('#idDossier').on('change', this, function () {
        let data = $('#idDossier').select2('data')[0].datax;
        const startOfYear = moment().startOf('Year').set('year', moment(data.dateExeStart).year()).toDate();
        const endOfYear = moment().endOf('Year').set('year', moment(data.dateExeStart).year()).toDate();
        $('#dateStart').setDate(startOfYear);
        $('#dateEnd').setDate(endOfYear);
    });
    $('.breadcrumb').on('click', 'li:not(.active)', function () {
        extPath = $(this).attr('data-path');
        folders();
        breadCrumb();
    })
    $.btnSauvegarderDossier.on('click', this, function () {
        let name = ittone.getSubMenu();
        let idDossier = $("#idDossier").val();
        let id = $("#idTier").val();
        let nomDossier = $("#nomDossier").val();
        let pathCreate = idDossier + "/" + name + "/" + id + extPath + "/" + nomDossier;
        if ($.modalDossier.data('update')) {
            let pathOld = idDossier + "/" + name + "/" + id + extPath + "/" + $.modalDossier.data('nameFolder');
            updateFolder({ pathOld: pathOld, pathCreate: pathCreate })
            ittone.success('successfully');
            folders();
            breadCrumb();
            ittone.hide($.modalDossier.parent());
            $.modalDossier.data('update', false);
            console.log($.modalDossier.data('nameFolder'));
        } else {
            if (createFolder({ pathCreate: pathCreate })) {
                ittone.success('successfully');
                folders();
                breadCrumb();
                ittone.hide($.modalDossier.parent());
            }
        }

    });
    $('#widgetFolder').on('dblclick', 'li', function () {
        extPath += '/' + $(this).attr('data-path');
        folders();
        breadCrumb();
    });
    $('#fileManager').on('dblclick', '.folders', function () {
        extPath += '/' + $(this).attr('data-name');
        folders();
        breadCrumb();
    });
    $('#fileManager').on('click', '.file .file-close', function () {
        let $file = $(this).closest('.file');
        let pathFile = $file.find('.file-download').attr('href');
        //dossier = extPath + '/' + dossier;
        ittone.alert("Confirmer", 'Confirmer de supprimer', function () {
            let data = {
                pathFile: pathFile
            }
            if (deleteFile(data)) {
                ittone.success('successfully');
                $file.remove();
            }
        }, function () {
            ittone.warning("Cancel");
        })
    });
    $('#fileManager').on('click', '.folders .file-close', function () {
        let $file = $(this).closest('.folders');
        let dossier = $file.attr('data-name');
        dossier = extPath + '/' + dossier;
        ittone.alert("Confirmer", 'Confirmer de supprimer', function () {
            let name = ittone.getSubMenu();
            let idDossier = $("#idDossier").val();
            let id = $("#idTier").val();
            let data = {
                idDossier: idDossier,
                name: name,
                id: id,
                extPath: dossier
            }
            if (deleteFolder(data)) {
                ittone.success('successfully');
                $file.remove();
            }
        }, function () {
            ittone.warning("Cancel");
        })
    });
    $('#fileManager').on('click', '.file .file-download', function () {

        let $file = $(this).closest('.file');
        let path = $(this).attr('data-path');
        let ext = path.split('.')[1];
        let name = ittone.getSubMenu();
        let idDossier = $("#idDossier").val();
        let id = $("#idTier").val();
        let pathFile = idDossier + '/' + name + '/' + id + extPath + '/' + path;
        OpenWindowWithPost('downloadDoc.ashx', "NewFile", pathFile)


    });
    $('#idTier').on('change', this, function () {
        extPath = "";
        folders();
        breadCrumb();
    });
    $('#uploadFile').on('click', this, function () {
        ittone.show($('.uploadFiles').parent());
    });
    $('.file-input').on('change', this, function (d) {
        ittone.lodingShow();
        let files = d.target.files;
        for (let file of files) {
            let fileName = file.name;
            let fileNamePoint = fileName;
            if (fileName.length >= 12) {
                let splitName = fileName.split('.');
                fileNamePoint = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            let formData = new FormData();
            let name = ittone.getSubMenu();
            let idDossier = $("#idDossier").val();
            let id = $("#idTier").val();
            let pathFile = idDossier + '/' + name + '/' + id + extPath;
            formData.append('file', file);
            formData.append("path", pathFile);
            formData.append("fileName", fileName);
            console.log(fileNamePoint);
            uploadFile(fileNamePoint, formData);
        }
        //
        ittone.lodingHide();
    });
    $('body').on('contextmenu', '#fileManager .folders', function (e) {
        e.preventDefault();
        let nameFolder = $(this).attr('data-name');
        $('.contextmenu').remove();
        let contextMenu = $(`<div class="contextmenu">
        <div class="contextmenuContent">
          <ul class="menu">
            <li class="item renommer">
            <i class="fa-solid fa-pen"></i>
              <span>Renommer</span>
            </li>
          </ul>
        </div>
      </div>`);
        contextMenu.on('click', '.renommer', function () {
            ittone.show($.modalDossier.parent());
            $.modalDossier.data('update', true);
            $.modalDossier.data('nameFolder', nameFolder);
            $("#nomDossier").setVal(nameFolder);
        })
        $('body').append(contextMenu);
        let x = e.clientX, y = e.clientY,
            winWidth = window.innerWidth,
            winHeight = window.innerHeight,
            cmWidth = contextMenu.offsetWidth,
            cmHeight = contextMenu.offsetHeight;
        x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
        y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;

        contextMenu.css({ left: `${x}px`, top: `${y}px` });
        document.addEventListener("click", () => { contextMenu.remove() });
    })
});
const loadApp = function () {
    let name = ittone.getSubMenu();
    let data = JSON.parse(sessionStorage.getItem('dataDossier'));
    selectAllDossier($('#idDossier'));
    $('#idDossier').val(data.idDossier);
    $('#idDossier').trigger('change');
    switch (name) {
        case 'Clients':
            selectClientAll($("#idTier"));
            $('#nameTier').text('Sociétés');
            breadCrumb();
            break;
        case 'Fournisseurs':
            selectFournisseurAll($('#idTier'));
            $('#nameTier').text('Fournisseurs');
            breadCrumb();
            break;
        case 'Employes':
            selectEmploye($('#idTier'), 'Tous');
            $('#nameTier').text('Employes');
            breadCrumb();
            break;
        case 'Autres':
            $('#nameTier').text('Autres');
            $('#idTier').remove();
            breadCrumb();
            break;
        default:
    }
    folders();
}
var extPath = "";
const folders = function () {
    let name = ittone.getSubMenu();
    let idDossier = $("#idDossier").val();
    let id = $("#idTier").val();
    let data = {
        idDossier: idDossier,
        name: name,
        id: id,
        extPath: extPath
    }
    widgetFolder(data);
    listFile(data)
}
const breadCrumb = function () {
    $('.breadcrumb').html('');
    let nomDossier = $('#idDossier').select2('data')[0].text;
    let nomClient = $('#idTier').select2('data')[0].text;
    let crumb = [nomDossier, nomClient]
    crumb = crumb.concat(extPath.split('/'));
    crumb = crumb.filter((str) => str !== '');
    let paths = '';
    crumb.forEach((el, i) => {
        if (i == 0) {
            $('.breadcrumb').append(`
                <li class="breadcrumb-item disabled"><a>`+ el + `</a></li>`)
        } else {
            if (i == crumb.length - 1) {
                $('.breadcrumb').append(`
                    <li class="breadcrumb-item active" aria-current="page">`+ el + `</li>`)
            } else if (i == 1) {
                //paths += '/' + el
                $('.breadcrumb').append(`
                    <li class="breadcrumb-item" data-path=""><a href="#">` + el + `</a></li>`)
            } else {
                paths += '/' + el
                $('.breadcrumb').append(`
                    <li class="breadcrumb-item" data-path="`+ paths + `"><a href="#">` + el + `</a></li>`)
            }
        }
    });
}
var extToMimes = {
    'img': 'image/jpeg',
    'png': 'image/png',
    'txt': 'text/plain',
    'zip': 'application/zip'
}
const getMimeByExt = function (ext) {
    if (extToMimes.hasOwnProperty(ext)) {
        return extToMimes[ext];
    }
    return false;
}
const progressArea = $(".progress-area"),
    uploadedArea = $(".uploaded-area");
    const uploadFile=function(name, formData) {
    var uploadedHTML = '';
    $.ajax({
        url: 'UploaderDoc.ashx',
        type: 'POST',
        timeout: 100000,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function (evt) {
                    let loaded = evt.loaded;
                    let total = evt.total;
                    let fileLoaded = Math.floor((loaded / total) * 100);
                    let fileTotal = Math.floor(total / 1000);
                    let fileSize;
                    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
                    let progressHTML = `<li class="fileUpload">
                            <i class="fas fa-file-alt"></i>
                            <div class="content">
                              <div class="details">
                                <span class="name">${name} • Uploading</span>
                                <span class="percent">${fileLoaded}%</span>
                              </div>
                              <div class="progress-bar">
                                <div class="progress" style="width: ${fileLoaded}%"></div>
                              </div>
                            </div>
                          </li>`;
                    uploadedArea.addClass("onprogress");
                    progressArea.html(progressHTML);
                    if (loaded == total) {
                        progressArea.html('');
                        uploadedHTML = $(`<li class="fileUpload">
                              <div class="content upload">
                                <i class="fas fa-file-alt"></i>
                                <div class="details">
                                  <span class="name">${name} </span>
                                  <span class="size">${fileSize}</span>
                                </div>
                              </div>
                              <i class="fas fa-check"></i>
                            </li>`);
                        uploadedArea.removeClass("onprogress");
                        uploadedArea.prepend(uploadedHTML);
                    }
                }, false);
            }
            return xhr;
        },
        success: function (data) {
            console.log('good')
            folders();
        },
        error: function (e) {
            $(uploadedHTML).find('.fa-check').removeClass('fa-check').addClass('fa-x').css({ 'color': 'red', 'font-size': '16px' })
            $(uploadedHTML).find('.fa-file-alt').css({ 'color': 'red' });
            $(uploadedHTML).find('.name').html($(uploadedHTML).find('name').text() + '<span>' + e.statusText + '</span>');
            console.log(e.statusText)
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
}
const OpenWindowWithPost=function(url, name, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = "path";
    input.value = params;
    form.appendChild(input);
    document.body.appendChild(form);
    //window.open("post.htm", name, "width=1000, height=600, left=100, top=100, resizable=yes, scrollbars=yes");
    form.submit();
    document.body.removeChild(form);
}