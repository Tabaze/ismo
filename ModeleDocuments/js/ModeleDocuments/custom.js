$(document).ready(function () {
    $.modalDossier = $.modal.find('.Dossier');
    $.btnSauvegarderDossier = $.modalDossier.find('.btn-sauvegarder');
    $.btnNewDossier = $.modalDossier.find('.btn-new');
    $.btnAnnulerDossier = $.modalDossier.find('.btn-annuler');

    $('#newFolder').on('click', this, function () {
        ittone.show($.modalDossier.parent());
    });
    $.btnAnnulerDossier.on('click', this, function () {
        ittone.hide($.modalDossier.parent());
    });
    $('#search').on('keyup', this, function () {
        var value = $(this).val().toLowerCase();
        $("#fileManager>div").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
const settingForma = function (update) {
    if (update) {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe':
                $.modalEmploye.data('update', true);
                $.modalEmploye.find('.nav-link.Cotis').prop('disabled', false);
                ittone.show($.btnNewEmploye);
                $('#photo').closest('.circular_image').removeClass('.changed');
                break;
            case 'Paie_Contrat':
                $.modalContrat.data('update', true);
                ittone.show($.btnNewContrat);
                break;
            case 'Paie_Conges':
                $.modalConge.data('update', true);
                ittone.show($.btnNewConge);
                break;
            case 'Paie_Pret':
                $.modalPret.data('update', true);
                ittone.show($.btnNewPret);
                break;
        }
    } else {
        switch (ittone.getSubMenu()) {
            case 'Paie_Employe':
                $.modalEmploye.data('update', false);
                $.tapDossier.find('.nav-link.Cotis').prop('disabled', true);
                ittone.hide($.btnNewEmploye);
                $('#formEmploye')[0].reset();
                $('#photo').closest('.circular_image').removeClass('.changed');
                $('#photo').closest('.circular_image').css('background-image', "url('" + ittone.defaultImgEmploye + "')");
                break;
            case 'Paie_Contrat':
                $.modalContrat.data('update', false);
                ittone.hide($.btnNewContrat);
                $('#formContrat')[0].reset();
                break;
            case 'Paie_Conges':
                $.modalConge.data('update', false);
                ittone.hide($.btnNewConge);
                $('#formConge')[0].reset();
                break;
            case 'Paie_Pret':
                $.modalPret.data('update', false);
                ittone.hide($.btnNewPret);
                $('#formPret')[0].reset();
                break;
        }
        $('select').trigger('change');
    }
}
