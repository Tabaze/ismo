/*********** Famille **************/
export function listFamille() {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/listFamille', '');
    return list;
}
export function insertUpdateFamille(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/insertUpdateFamille', JSON.stringify(data));
    return list;
}
export function familleById(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/familleById', JSON.stringify(data));
    return list;
}
export function deleteFamille(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/deleteFamille', JSON.stringify(data));
    return list;
}

/*********** Article **************/
export function listArticle() {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/listArticle', '');
    return list;
}
export function listArticleDesire() {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/listArticleDesire', '');
    return list;
}
export function ArticleDispoSelect() {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/ArticleDispoSelect', '');
    return list;
}
export function insertUpdateArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/insertUpdateArticle', JSON.stringify(data));
    return list;
}
export function AddUpWooArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/AddUpWooArticle', JSON.stringify(data));
    return list;
}
export function articleById(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/articleById', JSON.stringify(data));
    return list;
}
export function deleteArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/deleteArticle', JSON.stringify(data));
    return list;
}
export function GenerateurCode() {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/GenerateurCode', '');
    return list;
}
export function checkRefCodeBarr(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/CheckRefCodeBarr', JSON.stringify(data));
    return list;
}
export function listFilleInArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/listFilleInArticle', JSON.stringify(data));
    return list;
}
export function insertFilleInArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/insertFilleInArticle', JSON.stringify(data));
    return list;
}
export function deleteFilleInArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/deleteFilleInArticle', JSON.stringify(data));
    return list;
}
export function listBateau() {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/listBateau', '');
    return list;
}
export function insertUpdateBateau(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/insertUpdateBateau', JSON.stringify(data));
    return list;
}
export function bateauById(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/bateauById', JSON.stringify(data));
    return list;
}
export function ListImageArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/ListImageArticle', JSON.stringify(data));
    return list;
}
export function listEmailArticle(data) {
    let list = ittone.AjaxJson(url + '/ModeleArticle.aspx/listEmailArticle', JSON.stringify(data));
    return list;
}
const insertFille = function (data, id) {
    const url = new URL(window.location.href).origin;
    let list = ittone.AjaxJson(url + '/Import.aspx/insertFille', JSON.stringify(data));
    insertFilleInArticle({ id: id, idFille: list })
    return true
}
export const file = (f, id) => {
    let list
    let formData = new FormData();
    let file = f.name;
    let sizeFile = converSize(f.size);
    let pathFile = "upload\\Article\\";
    let fileName = file;
    let typeFile = file.substring(file.indexOf(".") + 1);
    fileName = fileName.substring(0, fileName.indexOf("."));
    fileName = fileName + "_" + Date.now();
    formData.append('file', f);
    formData.append("path", pathFile);
    formData.append("fileName", fileName);
    $.ajax({
        url: url + '/AjaxFileUploader.ashx',
        type: 'POST',
        timeout: 1000,
        success: function (data) {
            pathFile = pathFile + fileName + '.' + typeFile;
            console.log(pathFile)
            insertFille({ nameFile: fileName, pathFile: pathFile, typeFile: typeFile, sizeFile: sizeFile }, id);
            $(".slider .imgs").find('figure').removeClass('show')
            $(".slider .imgs").append(`
               <figure class="show"><img src="${pathFile}" alt="Random Photo"></figure>`)

            $.items = $(".slider .imgs figure")
            $.thumbs = $('.thumbnails img');
            $.numItems = $.items.length;

        },
        error: function (e) {
            ittone.error('error')
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
    return true
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

export function sendEmail(dt) {
    let formData = new FormData();
    let pathFile = "upload\\Article\\pdf\\";
    formData.append('file', dt.files);
    formData.append("path", pathFile);
    formData.append("fileName", dt.fileName);
    formData.append("subject", dt.subject)
    formData.append('body', dt.body.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
    formData.append('email', dt.email)
    formData.append('idClient', dt.idClient)
    formData.append('typeClient', dt.typeTier)
    formData.append('idArticle', dt.idArticle)
    $.ajax({
        url: url + '/AjaxSendEmail.ashx',
        type: 'POST',
        timeout: 1000,
        async: false,
        success: function (data) {
            console.log(data)
            ittone.success("Message Envoyer avec success")
        },
        error: function (e, d) {
            console.log(d)
            if (d == 'timeout' && d == 'error')
                ittone.success("Message Envoyer avec success")
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
}