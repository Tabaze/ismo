$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $.tableView.html('<table class="display responsive nowrap" style="width:100%"></table>');
    $('#sqlImport').on('click','.btn-annuler',function(){
        ittone.show($('#excelImport'));
        ittone.hide($('#sqlImport'));
        $.tableView.html('<table class="display responsive nowrap" style="width:100%"></table>');
    });
    $('#excelImport').on('click','.btn-annuler',function(){
        window.history.back();
    })
});
