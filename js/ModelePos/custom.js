$(document).ready(function() {
    $.tableView=$('.screen-afficher.screen .tableView');
    $.btnCreate = $('.screen-afficher.screen .btn-create');
    $.modalPos = $.modal.find('.Pos');
    $.btnSauvegarderPos = $.modalPos.find('.btn-sauvegarder');
    $.btnNewPos = $.modalPos.find('.btn-new');
    $.btnAnnulerPos = $.modalPos.find('.btn-annuler');
    $.tapPos = $.modalPos.find('#TabPOS');
    $.idSection = $('#idSection');
    $.modalCaissier = $.modal.find('.Caissier');
    $.btnSauvegarderCaissier = $.modalCaissier.find('.btn-sauvegarder');
    $.btnNewCaissier = $.modalCaissier.find('.btn-new');
    $.btnAnnulerCaissier = $.modalCaissier.find('.btn-annuler');
    
    $.btnCreate.on('click',this,function(){
        settingForma(false);
        switch(ittone.getSubMenu()){
            case 'POS': ittone.show($.modalPos.parent());break;
            case 'Caissier': ittone.show($.modalCaissier.parent());break;
            
        }
    });
    $.btnAnnulerPos.on('click',this,function(){
        ittone.hide($.modalPos.parent());
    });
    $.btnNewPos.on('click',this,function(){
        settingForma(false);
    });
    $.btnAnnulerCaissier.on('click',this,function(){
        ittone.hide($.modalCaissier.parent());
    });
    $.btnNewCaissier.on('click',this,function(){
        settingForma(false);
    });

    $('#pdf').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Pos':pdfPos();break; 
            case 'Caissier': pdfCaissier();break;
        }
    });
    $('#excel').on('click',this,function(){
        switch(ittone.getSubMenu()){
            case 'Pos':excelPos();break; 
            case 'Caissier': excelCaissier();break;
        }
    });
    $('#import').on('click',this,function(){
        window.location.href = 'Import.aspx?name=' + ittone.getSubMenu();
    });

    $.idSection.on('click', '.btn-primary', function() {
        var dataSelect = $('#idModRglm').select2('data')
        var ModRglm = dataSelect[0].text
        var idModRglm = $('#idModRglm').val()
        var newTr = `<label class="tasks-list-item" data_id=` + idModRglm + `>
                     <input type="checkbox" name="task_1" class="tasks-list-cb" >
                     <span class="tasks-list-mark"></span>
                     <span class="tasks-list-desc">` + ModRglm + `</span>
                     <button type="button" class="btn btn-danger btn-sm ajouterModrglm">delete</button>
                     </label>`

        $('.tasks-list').append(newTr);
    });
    $.idSection.on('click', 'input:checkbox', function() {
        $('input:checkbox').not(this).prop('checked', false);
        $.idSection.find('.defaut').css('display', 'none')
        $.idSection.find('label').attr('default',false);
        if ($(this).is(':checked')) {
            inputMrglm = true
            var span = `<span class="tasks-list-desc defaut" style="font_weight:100;">(par defaut)</span>`
            $(this).parent('label').append(span);
            $(this).parent('label').attr('default',true);
        } else {
            inputMrglm = false
        }
    });
    $.idSection.on('click', '.btn-danger', function() {
            $(this).parent('label').detach()
            $(this).parent('span').find('data_id').val()
        })
});
const settingForma=function(update){
    if(update){
        $.modalPos.data('update',true);
        $.tapPos.find('.nav-link').prop('disabled', false);
        ittone.show($.btnNewPos);
        if(ittone.getSubMenu()=='Caissier'){
            $.modalCaissier.data('update',true);
            ittone.show($.btnNewCaissier);
        }
    }else{
        $('#tbContentPos').find('.tab-pane').removeClass('active show');
        $('#tbContentPos').find('.tab-pane[id="Create-pane"]').addClass('active show');
        $.tapPos.find('.nav-link').removeClass('active')
        $.tapPos.find('.nav-link[id="Create-tab"]').addClass('active');
        $.tapPos.find('.nav-link:not(.active)').prop('disabled', true);
        $.modalPos.data('update',false);
        ittone.hide($.btnNewPos);
        $('#formPos')[0].reset();
        if(ittone.getSubMenu()=='Caissier'){
            $('#formCaissier')[0].reset();
            $.modalCaissier.data('update',false);
            ittone.hide($.btnNewCaissier);
        }
        //$('#formMisePage')[0].reset();
        //$('#formWoocommerce')[0].reset();
    }
}
const pdfPos=function(){
    let titel = '';
    titel = '<tr><td>Pos</td></tr>';
    let columns_title = [
        { "data": "codePos", "title": i18n.translate("codePos") },
        { "data": "nomPos", "title": i18n.translate("nomPos") },
        { "data": "adressePos", "title": i18n.translate("adressePos")},
        { "data": "nomVille", "title": i18n.translate("nomVille")},
        { "data": "nomPays", "title": i18n.translate("nomPays")},
        { "data": "icePos", "title": i18n.translate("icePos")},
        { "data": "telePos", "title": i18n.translate("telePos")},
        { "data": "nomUser", "title": i18n.translate("nomUser")},
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    };
    let data = {
        titel: titel,
        table: {
            columns_title: columns_title,
            getData: getData_Table
        },
        foter: {
            columns_title: columns_foter,
            getData_foter: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}
const pdfCaissier=function(){
    let titel = '';
    titel = '<tr><td>Caissier</td></tr>';
    let columns_title = [
        { "data": "codeCaissier", "title": i18n.translate("codeCaissier") },
        { "data": "nomCaissier", "title": i18n.translate("nomCaissier") },
        { "data": "adresseCaissier", "title": i18n.translate("adresseCaissier")},
        { "data": "nomVille", "title": i18n.translate("nomVille")},
        { "data": "nomPays", "title": i18n.translate("nomPays")},
        { "data": "iceCaissier", "title": i18n.translate("iceCaissier")},
        { "data": "teleCaissier", "title": i18n.translate("teleCaissier")},
        { "data": "nomUser", "title": i18n.translate("nomUser")},
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
    let columns_foter = [];
    let getData_foter = '<tr><td></td></tr>';

    let option = {
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    };
    let data = {
        titel: titel,
        table: {
            columns_title: columns_title,
            getData: getData_Table
        },
        foter: {
            columns_title: columns_foter,
            getData_foter: getData_foter
        },
        option: option
    }
    pdf.Defualt(data);
}

const excelPos=function(){
    let columns_title = [
        { "data": "codePos", "title": i18n.translate("codePos") },
        { "data": "nomPos", "title": i18n.translate("nomPos") },
        { "data": "adressePos", "title": i18n.translate("adressePos")},
        { "data": "nomVille", "title": i18n.translate("nomVille")},
        { "data": "nomPays", "title": i18n.translate("nomPays")},
        { "data": "icePos", "title": i18n.translate("icePos")},
        { "data": "telePos", "title": i18n.translate("telePos")},
        { "data": "nomUser", "title": i18n.translate("nomUser")},
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}
const excelCaissier=function(){
    let columns_title = [
        { "data": "codeCaissier", "title": i18n.translate("codeCaissier") },
        { "data": "nomCaissier", "title": i18n.translate("nomCaissier") },
        { "data": "adresseCaissier", "title": i18n.translate("adresseCaissier")},
        { "data": "nomVille", "title": i18n.translate("nomVille")},
        { "data": "nomPays", "title": i18n.translate("nomPays")},
        { "data": "iceCaissier", "title": i18n.translate("iceCaissier")},
        { "data": "teleCaissier", "title": i18n.translate("teleCaissier")},
        { "data": "nomUser", "title": i18n.translate("nomUser")},
    ];
    let getData_Table = $.tableView.find('table').DataTable().rows({ page: 'current' }).data().toArray();
        let data = {
            columns_title: columns_title,
            getData: getData_Table
        };
    excel.Defualt(data);
}