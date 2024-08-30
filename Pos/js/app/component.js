import {listModRglm,listFavorisArticle,listFamille,listArticleByFamille} from './service.js';
export function paymentMethods(){
    $.paymentMethods.html('');
    let list = listModRglm();
    console.log(list);
    $.paymentMethods.append("<div class='paymentmethods'><div class='button paymentmethod' data-id='Espece-Falst' style='background-color: #5c9e00;color: #fff;'>Espece Rapide</div></div>");
    for (let i in list) {
        $.paymentMethods.append("<div class='paymentmethods'><div class='button paymentmethod' data-id='" + list[i].idModRglm + "'>" + list[i].nomModRglm
        + "</div></div>");
    }
}
export function favorisArticle(){
    let list = listFavorisArticle();
    console.log(list);
    pos.favorisArticle=list;
    templateListArticel(list);
}
export function famille(){
    let list = listFamille();
    console.log(list);
    templateListFamille(list);
}
export function articleByFamille(idFamille){
    console.log({idFamille:idFamille})
    let list = listArticleByFamille({idFamille:idFamille});
    console.log(list);
    templateListArticel(list);
}
const templateListArticel=function(list){
    $.product_list.html('');
    for (let i in list) {
        let photo = '../image/data/article/Default.png';
        if (list[i].photoArticle != null ) {
            photo = '../' + list[i].photoArticle
        }
        if (list[i].photoArticle == '') {
            photo = '../image/data/article/Default.png';
        }
        let $article=$('<article class="product" data-product-id="'
        + list[i].idArticle + '" ar-umvente="unité"><div class="product-img"><img src="'
        + photo + '" /><span class="price-tag">'
        + list[i].prixVente_TTC + '</span></div><div class="product-name">'
        + list[i].nomArticle + '</div></article>');
        $article.data('info',list[i]);
        $.product_list.append($article);
        
    }
}
const templateListFamille=function(list){
    for (let i in list) {
        $.famile_list.append('<article class="famile" idFamille='
            + list[i].idFamille + '><div class="famile-name">'
            + list[i].nomFamille + '</div></article>');
    }
}