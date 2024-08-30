import { listEntet, listArticleEntet, listEntetLign, deleteLignEntet, entetFixed, deleteEntet, entetByIdClient, entetByIdFournisseur } from './service.js'
export function tableEntet($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listEntet(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEntet);
            if (data.valider) {
                $(row).addClass('validerRow');
            }
            if (data.clotur) {
                $(row).addClass('cloturRow');
            }
        },
        drawCallback: function () {
            var api = this.api();
            if ($('.totalTable').length) {
                $('.totalTable .cTT_ht').html(
                    ittone.CurrencyFormat(api.column(6, { page: 'current' }).data().sum())
                );
                $('.totalTable .cTT_tva').html(
                    ittone.CurrencyFormat(api.column(7, { page: 'current' }).data().sum())
                );
                $('.totalTable .cTT_ttc').html(
                    ittone.CurrencyFormat(api.column(8, { page: 'current' }).data().sum())
                );
                $('.totalTable .TT_ht').html(
                    ittone.CurrencyFormat(api.column(6).data().sum())
                );
                $('.totalTable .TT_tva').html(
                    ittone.CurrencyFormat(api.column(7).data().sum())
                );
                $('.totalTable .TT_ttc').html(
                    ittone.CurrencyFormat(api.column(8).data().sum())
                );
            }
        },
        "columnDefs": [{ "targets": 1, "type": "date-eu" }],
    });

    $('#deleteRow').off('click', this);
    $('#deleteRow').on('click', this, function () {
        let rows = table.rows({ selected: true });
        if (rows.count() > 0) {
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                let data = rows.data();
                data.map(function (dt) {
                    if (deleteEntet({ id: dt.idEntet })) {
                        ittone.deleteRowDataTable(table, dt.idEntet);
                        ittone.success("successfully");
                    }
                });
            }, function () {
                ittone.warning("Cancel");
            });
        } else {
            ittone.warning("dont Selection");
        }
    });
    return table;
}
export function tableEntetArticle($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listArticleEntet(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idArticle);
        }
    });
    $('.inputSearchTable').off('keyup change', 'input,select');
    $('.inputSearchTable').on('keyup change', 'input,select', function () {
        if ($(this).hasClass('form-select')) {
            console.log($(this).select2('data')[0].text)
            table.column($(this).attr('data-col')).search($(this).select2('data')[0].text).draw(false);
        }
        else {
            table.column($(this).attr('data-col')).search($(this).val()).draw(false);
        }
    });
    return table;
}
export function tableLingEntet($input, columns_title, dt) {
    let tableLing = $input.randerTable(columns_title, listEntetLign(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idLign);
        }
    });
    $input.off('click', '.deleteLign');
    $input.on('click', '.deleteLign', function () {
        if (role.delete()) {
            let $tr = $(this).closest('tr');
            let row = tableLing.row($tr).data();
            if (!row) {
                row = tableLing.row($tr.prev()).data();
            }
            let idLign = row.idLign;
            let idEntet = row.idEntet;
            ittone.alert('Confirmer', 'Confirmer de supprimer', function () {
                if (deleteLignEntet({ id: idLign })) {
                    ittone.deleteRowDataTable(tableLing, idLign);
                    ittone.success("successfully");
                    let list = entetFixed({ idEntet: idEntet })[0];
                    templateControlTotal($('.controleTotal'), list);
                }
            }, function () {
                ittone.warning("Cancel");
            });
        }
    });
    return tableLing;
}
export function templateControl($html, data) {
    if (data) {
        $html.find('.qteDepot').text(ittone.QteFormat(data.qteDepot));
        $html.find('.cmup').text(ittone.CurrencyFormat(data.cmup));
    } else {
        $html.find('.qteDepot').text(ittone.QteFormat(0));
        $html.find('.cmup').text(ittone.CurrencyFormat(0));
    }

}
export function templateControlTotal($html, data) {
    if (data) {
        $html.find('.TT_ttc').text(ittone.CurrencyFormat(data.TT_ttc));
        $html.find('.TT_ht').text(ittone.CurrencyFormat(data.TT_ht));
        $html.find('.TT_tva').text(ittone.CurrencyFormat(data.TT_tva));
        $html.find('.TT_remis').text(ittone.CurrencyFormat(data.TT_remis));
        $html.find('.TT_net').text(ittone.CurrencyFormat(data.TT_net));
    } else {
        $html.find('.TT_ttc').text(ittone.CurrencyFormat(0));
        $html.find('.TT_ht').text(ittone.CurrencyFormat(0));
        $html.find('.TT_tva').text(ittone.CurrencyFormat(0));
        $html.find('.TT_remis').text(ittone.CurrencyFormat(0));
        $html.find('.TT_net').text(ittone.CurrencyFormat(0));
    }
}
export function templateLingEntet(columns_title, dt) {
    let $html = $(`<div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Les Articles</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
                <span class="radiosStyle">
                    <div class="modal-body">
                        <div class="row">
                            <div id="table"></div>
                        </div>          
                    </div>
                </span>
        </div>
    </div>    
    </div>`);
    let table = $html.find('#table').randerTable(columns_title, listEntetLign(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idLign);
        }
    });
    $('body').append($html);
    ittone.show($html);
    setTimeout(() => { table.draw(false); }, 200);
    $html.off('click', '.btn-close')
    $html.on('click', '.btn-close', function () {
        ittone.hide($html);
        setTimeout(() => { $html.remove() }, 500);
    });
}
export function selectEntetByIdClient($input, id) {
    $input.html('')
    let list = entetByIdClient(id);
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idEntet,
            text: obj.numFactur,
            data: obj
        }
    });
    xdata.unshift({ id: -1, text: 'Aucune facture' });
    $input.select2({ data: xdata, placeholder: "Facture" });
}
export function selectEntetByIdFournisseur($input, id) {
    $input.html('')
    let list = entetByIdFournisseur(id);
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idEntet,
            text: obj.numFactur + "( " + obj.refFactur + " )",
            data: obj
        }
    });
    console.log(list)
    xdata.unshift({ id: -1, text: 'Aucune facture' });
    $input.select2({ data: xdata, placeholder: "Facture" });
}
export var modeleForEntet = {
    vente: 'vente',
    achat: 'achat',
    inventaire: 'inventaire'
}