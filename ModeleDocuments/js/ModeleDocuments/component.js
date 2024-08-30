import { getFolders, getFiles } from "./service.js";
export function widgetFolder(data) {
    let datax = getFolders(data);
    let files = getFiles(data);
    $('#widgetFolder').html('');
    datax.forEach(element => {
        $('#widgetFolder').append('<li data-path="' + element + '"><a ><i class="fa fa-folder"></i>' + element + '</a></li>');
    });
}
export function listFile(data) {
    let folders = getFolders(data);
    let files = getFiles(data);
    $('#fileManager').html('');
    folders.forEach(element => {
        $('#fileManager').append(`<div class="col-lg-3 col-xl-2 folders" data-name="` + element + `" title="`+element+`">
        <div class="file-man-box"><a class="file-close"><i
                    class="fa fa-times-circle"></i></a>
            <div class="file-img-box"><img
                    src="https://img.icons8.com/color/512/mac-folder.png"
                    alt="icon"></div>
            <div class="file-man-title">
                <h5 class="mb-0 text-overflow" title="`+element+`">`+ element + `</h5>
            </div>
        </div>
    </div>`);
    });
    files.forEach(element => {
        $('#fileManager').append(`<div class="col-lg-3 col-xl-2 file" title="`+element.Name+`">
        <div class="file-man-box"><a class="file-close"><i
                    class="fa fa-times-circle"></i></a>
            <div class="file-img-box">
            `+ getIconHtmlByType(element.Name) + `
                    alt="icon"></div><a data-path="`+ element.Name + `" class="file-download"><i
                    class="fa fa-download"></i></a>
            <div class="file-man-title">
                <h5 class="mb-0 text-overflow" >`+ element.Name + `</h5>
                <p class="mb-0"><small>`+ doc.converSize(element.Length) + `</small></p>
            </div>
        </div>
    </div>`);
    });
}
export function widgetPath(path) {
    let name = ittone.getSubMenu();
    let idDossier = $("#idDossier").val();
    let id = $("#idTier").val();

}

const getIconHtmlByType = function (typeFile) {
    let extension = typeFile.split('.').pop()
    switch (extension) {
        case 'doc':
            return '<img src="picsFiles/doc.svg"';
        case 'xls':
            return '<img src="picsFiles/xls.svg"';
        case 'xlsx':
            return '<img src="picsFiles/xls.svg"';
        case 'png':
            return '<img src="picsFiles/png.svg"';
        case 'jpg':
            return '<img src="picsFiles/jpg.svg"';
        case 'jpeg':
            return '<img src="picsFiles/jpg.svg"';
        case 'gif':
            return '<img src="picsFiles/gif.svg"';
        case 'pdf':
            return '<img src="picsFiles/pdf.svg"';
        case 'ppt':
            return '<img src="picsFiles/ppt.svg"';
        case 'avi':
            return '<img src="picsFiles/avi.svg"';
        case 'bmp':
            return '<img src="picsFiles/bmp.svg"';
        case 'cad':
            return '<img src="picsFiles/cad.svg"';
        case 'psd':
            return '<img src="picsFiles/psd.svg"';
        case 'zip':
            return '<img src="picsFiles/zip.svg"';
        case 'rar':
            return '<img src="picsFiles/zip.svg"';
        case 'html':
            return '<img src="picsFiles/html.svg"';
        case 'css':
            return '<img src="picsFiles/css.svg"';
        case 'txt':
            return '<img src="picsFiles/txt.svg"';
        case 'svg':
            return '<img src="picsFiles/svg.svg"';
        default:
            return '<img src="picsFiles/txt.svg"';
    }
}