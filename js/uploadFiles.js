import { listFilleInEntet, insertFilleInEntet, deleteFilleInEntet } from './ModeleEntet/service.js';
import { listFilleInReglement, insertFilleInReglement, deleteFilleInReglement } from './ServiceReglement/service.js';
import { listFilleInArticle, insertFilleInArticle, deleteFilleInArticle } from './ModeleArticle/service.js';
import { listFilleInContrat, insertFilleInContrat, deleteFilleInContrat } from '../ModelePaie/js/ModeleEmploye/service.js';
const $html = `<div role="dialog" class="modal">
<div class="modal-dialog modal-lg modal-dialog-centered UploadFiles">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Upload Files</h5>
            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
        </div>
            <span class="radiosStyle">
                <div class="modal-body">
                    <div class="row">
                        <span class="fileUpload btn btn-default" for="uploadFile">
                            <span class="glyphicon glyphicon-upload" for="uploadFile"></span> upload
                        <input type="file" id="uploadFile" />
                        </span>
                        <p id="fileUploadError" class="text-danger hide"></p>
                        <div class="list-group" id="filesUpload"></div>         
                    </div>                           
                    <div class="row file_manager">
                        
                    </div>          
                </div>
            </span>
    </div>
</div>    
</div>`;
const $fils = `<div class="col-lg-3 col-md-3 col-sm-12 cartFile">
<div class="card">
    <div class="file">
        <a href="javascript:void(0);">
            <div class="hover">
                <button type="button" class="btn btn-icon btn-danger deleteFile">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
            <div class="icon">
                <img width="184" height="100" src="image/img/dossier.png">
            </div>
            <div class="file-name">
                <p class="m-b-5 text-muted">image7_1666047522545.png</p>
                <small>153.02 KB <span class="date text-muted">17 oct. 2022</span></small>
            </div>
        </a>
    </div>
</div>
</div>
`;
var $uploadFile;
export const initFile = function (model, id) {
    $('.UploadFiles').parent().remove();
    $uploadFile = $($html);
    $('body').append($uploadFile);
    $uploadFile.data('info', { model: model, id: id });
    listFiles();
    event();
}
const listFiles = function () {
    let modele = $uploadFile.data('info').model;
    let idModal = $uploadFile.data('info').id;
    let list;
    switch (modele) {
        case 'entet':
            list = listFilleInEntet({ id: idModal });
            break;
        case 'reglement':
            list = listFilleInReglement({ id: idModal });
            break;
        case 'Article':
            list = listFilleInArticle({ id: idModal });
            break;
        case 'Paie_Contrat':
            list = listFilleInContrat({ id: idModal });
            break;
    }
    $uploadFile.find('.file_manager').html('')

    const url = new URL(window.location.href).origin;
    for (let i in list) {
        let typeFile = list[i].typeFile;
        let nameFile = list[i].nameFile;
        let pathFile = url + '/' + list[i].pathFile;
        let dateC = list[i].createDate;
        let sizeFile = list[i].sizeFile;
        let img = '';
        if (typeFile == 'jpg' || typeFile == 'jpeg' || typeFile == 'png') {
            img = '<img src="' + pathFile + '"/>';
        } else {
            img = getIconHtmlByType(typeFile);
        }
        let $txt = $('<div class="col-lg-3 col-md-3 col-sm-12 cartFile"><div class="card"><div class="file"><a href="javascript:void(0);"><div class="hover">' +
            '<button type="button" class="btn btn-icon btn-danger deleteFile"><i class="fa fa-trash"></i></button>' +
            '</div><div class="icon">' + img + '</div><div class="file-name"><p class="m-b-5 text-muted">' + nameFile + '.' + typeFile + '</p>' +
            '<small>' + sizeFile + ' <span class="date text-muted">' + moment(dateC).format("ll") + '</span></small></div></a></div></div></div>');
        $txt.data('info', list[i]);
        $uploadFile.find('.file_manager').append($txt);

    }
}
const getIconHtmlByType = function (typeFile) {
    switch (typeFile) {
        case 'doc':
            return '<i class="fa fa-lg fa-file-word"></i>';
        case 'xls':
            return '<i class="fa fa-lg fa-file-excel"></i>';
        case 'xlsx':
            return '<i class="fa fa-lg fa-file-excel"></i>';
        case 'pdf':
            return '<i class="fa fa-lg fa-file-pdf"></i>';
        case 'csv':
            return '<i class="fa fa-lg fa-file-csv"></i>';
        default:
            return '<i class="fa fa-lg fa-file"></i>';
    }
}
const event = function () {
    const url = new URL(window.location.href).origin;
    $uploadFile.on('change', '#uploadFile', function () {
        let formData = new FormData();
        let file = this.files[0].name;
        let sizeFile = converSize(this.files[0].size);
        let pathFile = "upload\\" + $uploadFile.data('info').model + "\\";
        let fileName = file;
        let typeFile = file.substring(file.indexOf(".") + 1);
        fileName = fileName.substring(0, fileName.indexOf("."));
        fileName = fileName + "_" + Date.now();
        formData.append('file', this.files[0]);
        formData.append("path", pathFile);
        formData.append("fileName", fileName);
        let $fileUploadProgressTemplate = $('<div class="list-group-item"><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" style="width: 0%;"></div></div></div>');
        let $fileUploadItemTemplate = $('<div class="list-group-item"><span class="glyphicon glyphicon-file "></span><span class="fileName"> File name (type, date, etc)</span></div>');
        $uploadFile.find("#filesUpload").append($fileUploadProgressTemplate);
        $uploadFile.find("#fileUploadError").addClass("hide");
        $.ajax({
            url: url + '/AjaxFileUploader.ashx',
            type: 'POST',
            timeout: 100000,
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function (evt) {
                        var percent = (evt.loaded / evt.total) * 100;
                        $uploadFile.find("#filesUpload .progress-bar").width(percent + "%");
                    }, false);
                }
                return xhr;
            },
            success: function (data) {
                pathFile = pathFile + fileName + '.' + typeFile;
                insertFille({ nameFile: fileName, pathFile: pathFile, typeFile: typeFile, sizeFile: sizeFile });
                $uploadFile.find("#filesUpload").children().last().remove();
                $fileUploadItemTemplate.find('.fileName').html(file);
                $uploadFile.find("#filesUpload").append($fileUploadItemTemplate);
                $uploadFile.find("#uploadFile").closest("form").trigger("reset");
            },
            error: function (e) {
                $("#fileUploadError").removeClass("hide").text("An error occured!");
                $("#filesUpload").children().last().remove();
                $("#uploadFile").closest("form").trigger("reset");
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
    });
    $uploadFile.on('click', '.deleteFile', function () {
        let data = $(this).closest('.cartFile').data("info");
        let pathFile = data.pathFile;
        let id = data.idFille;
        let modele = $uploadFile.data('info').model;
        let idModal = $uploadFile.data('info').id;
        switch (modele) {
            case 'reglement':
                if (deleteFilleInReglement({ id: idModal, idFille: id })) {
                    ittone.success("successfully");
                    deleteFile({ pathFile: pathFile });
                    listFiles();
                }
                break;
            case 'Article':
                if (deleteFilleInArticle({ id: idModal, idFille: id })) {
                    ittone.success("successfully");
                    deleteFile({ pathFile: pathFile });
                    listFiles();
                }
                break;
            case 'entet':
                if (deleteFilleInEntet({ id: idModal, idFille: id })) {
                    ittone.success("successfully");
                    deleteFile({ pathFile: pathFile });
                    listFiles();
                }
                break;
            case 'Paie_Contrat':
                if (deleteFilleInContrat({ id: idModal, idFille: id })) {
                    ittone.success("successfully");
                    deleteFile({ pathFile: pathFile });
                    listFiles();
                }
                break;
        }
    });
    $uploadFile.on('click', '.btn-close', function () {
        ittone.hide($uploadFile)
    });
    $uploadFile.on('dblclick', '.cartFile', function () {
        let data = $(this).closest('.cartFile').data("info");
        let modele = $uploadFile.data('info').model;
        var url = data.pathFile;
        var win = window.open(url, '_blank');
        win.focus();
    });
}
const converSize = function (data) {
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
        i = 0;
    while (data > 900) {
        data /= 1024;
        i++;
    }
    var exactSize = (Math.round(data * 100) / 100) + ' ' + fSExt[i];
    return exactSize;
}
const insertFille = function (data) {
    const url = new URL(window.location.href).origin;
    let list = ittone.AjaxJson(url + '/Import.aspx/insertFille', JSON.stringify(data));
    insertFileInModele(list);
}
const insertFileInModele = function (data) {
    let modele = $uploadFile.data('info').model;
    let idModal = $uploadFile.data('info').id;
    switch (modele) {
        case 'reglement':
            if (insertFilleInReglement({ id: idModal, idFille: data })) {
                ittone.success("successfully");
                listFiles();
            }
            break;
        case 'Article':
            if (insertFilleInArticle({ id: idModal, idFille: data })) {
                ittone.success("successfully");
                listFiles();
            }
            break;
        case 'entet':
            if (insertFilleInEntet({ id: idModal, idFille: data })) {
                ittone.success("successfully");
                listFiles();
            }
            break;
        case 'Paie_Contrat':
            if (insertFilleInContrat({ id: idModal, idFille: data })) {
                ittone.success("successfully");
                listFiles();
            }
            break;
    }
}
const deleteFile = function (data) {
    const url = new URL(window.location.href).origin;
    ittone.AjaxJson(url + '/Import.aspx/deleteFile', JSON.stringify(data));
}