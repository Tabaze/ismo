import { selectPays } from "../ModeleBase/component.js";
import { listPays } from "../ModeleBase/service.js";
import { ClientByPays, ClientParPot, articleDash, dashboardInfos, top5, total_by_pays } from "./service.js";
export function tabletopFactures($input, columns_title, dt) {
    let table = $input.randerTable(
        columns_title,
        dashboardInfos(dt),
        {
            createdRow: function (row, data, index) {
                $(row).data('info', data);
                $(row).attr('data-id', data.id);
            },
            "order": [],
            "bPaginate": false,
            "searching": false,
            "paging": false,
            "info": false,
            "bFilter": false,
            "scroller": false,
            "scrollY": 280
        });
    return table;
}
export function randomColors(i) {
    let color = [
        "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
        "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
        "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
        "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
        "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
        "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
        "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
        "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
        "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
        "#5be4f0", "#57c4d8", "#a4d17a", "#be608b", "#96b00c", "#088baf", "#f158bf",
        "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8",
        "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3",
        "#51aed9", "#5bb32d", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8",
        "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250",
        "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f",
        "#64820f", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a",
        "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2",
        "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f",
        "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e",
        "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9",
        "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#dd93fd",
        "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a",
        "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7",
        "#cb2582", "#ce00be", "#32d5d6", "#608572", "#c79bc2", "#00f87c", "#77772a",
        "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
        "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
        "#e08c56", "#28fcfd", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
        "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
        "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
        "#615af0", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236",
        "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a",
        "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d",
        "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#71b1f4", "#a2f8a5",
        "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c",
        "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4",
        "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#88e9b8", "#c2b0e2", "#86e98f",
        "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f",
        "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4",
        "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
    ];
    return color[i];
}
export function tableArticleDispo($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, articleDash(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idArticle);
        }
    });
    return table;
}
export function tableClientByPays($input, dt) {
    let columns_title = [
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "codeClient", "title": i18n.translate("codeClient") },
        { "data": "nomPotClient", "title": i18n.translate("nomPotClient") },
        { "data": "nomRelation", "title": i18n.translate("nomRelation") },
        { "data": "nomVille", "title": i18n.translate("nomVille") },
        { "data": "adresseClient", "title": i18n.translate("adresseClient") },
        { "data": "ca", "title": i18n.translate("Chiffre Affaire") },
    ]
    if ($input.attr('id') == "tableDetails") {
        columns_title.pop()
    }
    let table = $input.randerTable(columns_title, ClientByPays(dt), {
        createdRow: function (row, data, index) {

        }
    });

    setTimeout(() => {
        table.draw(false);
    }, 200);
    return table;
}
export function tableClientParPot($input, dt) {
    $input.html('')
    let columns_title = [
        { "data": "nomClient", "title": i18n.translate("nomClient") },
        { "data": "nomRelation", "title": i18n.translate("nomRelation") },
        { "data": "dateMAj", "title": i18n.translate("dateMAj"), render: (dt) => dt ? moment(dt).format('L') : '' },
        { "data": "dateEnd", "title": i18n.translate("dateEnd"), render: (dt) => dt ? moment(dt).format('L') : '' },
    ]
    let table = $input.randerTable(columns_title, ClientParPot(dt), {
        createdRow: function (row, data, index) {
            console.log(data)
        }
    });
    return table;
}
export function tabletotal_by_pays($input, dt) {
    $input.html('')
    let total = 0
    let columns_title = [
        { "data": "name", "title": i18n.translate("nomPays") },
        { "data": "nb", "title": i18n.translate("Nombre Societe") },
        {
            "data": "id", "title": i18n.translate(""), render: (dt) => `<label type="label" class="fs-6 btn btn-outline-ittone btn-floating details" id="${dt}" title="Suprimmer" role="" style="">
        <i class="fa-solid fa-eye"></i>
    </label>` },
    ]
    let table = $input.randerTable(columns_title, total_by_pays(dt), {
        createdRow: function (row, data, index) {
            total += data.nb
        }
    });
    $('.paysTotal').text(total)
    $input.on('click', 'label.details', function () {
        ittone.show($('#paysDetails').parent())
        tableClientByPays($('#tableDetails'), {
            param: [{
                idPays: $(this).attr('id')
            }]
        })
    })
    return table;
}
export const top5CA = () => {
    $('#top5').html('')
    top5().forEach(ele => {
        $('#top5').append(`<div class="c-dashboardInfo col-ms-12 col-md">
                                <div class="wrap">
                                <div class="after" style="background: linear-gradient(82.59deg, ${ele.codeColor} 45%, ${ele.codeColor} 100%);;"></div>
                                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">${ele.codeClient + ' - ' + ele.nomClient}</h4>
                                <span class="hind-font caption-12 c-dashboardInfo__count">€${ele.ca}</span>
                                </div>
                            </div>`)
    })
}
export const loadMap = () => {
    var chart;
    $.ajax({
        type: 'GET',
        url: 'world_source.svg',
        success: function (data) {
            chart = anychart.map();
            chart.geoData(data);
            var dt = listPays()
            var dataset = anychart.data.set(dt)
            var series = chart.choropleth(dataset);
            series.labels(false);
            chart.padding(10)
            series.listen('click', function (e) {
                tableClientByPays($('#tableClient'), {
                    param: [{
                        idPays: dt[e.pointIndex].id
                    }]
                })
                $('#idPays').val(dt[e.pointIndex].id).trigger('change')
            });
            series
                .hovered()
                .fill('#0d3583')
                .stroke(anychart.color.darken('#0d3583'));

            series
                .selected()
                .fill('#0d3583')
                .stroke(anychart.color.darken('#0d3583'));
            series
                .tooltip()//.titleFormat()
                .useHtml(true)
                .format(function () {
                    return (
                        // '<span style="color: #d9d9d9">Density</span>: ' +
                        // parseFloat(this.value) +
                        // ' pop./km&#178 <br/>' +
                        '<span style="color: #d9d9d9;">Nombre de societe</span>: ' +
                        parseInt(this.getData('nbSociete'))
                        // +'<br/>' +
                        // '<span style="color: #d9d9d9">Area</span>: ' +
                        // parseInt(this.getData('area')) +
                        // ' km&#178'
                    );
                });
            selectPays($('#idPays'))
            // // set the container
            var zoomController = anychart.ui.zoom();
            zoomController.render(chart);
            chart.container('container').draw();
            $('#idPays').on('change', this, function () {
                if (!$(this).val()) return
                var countryCode = $(this).val()
                $('#container').find('path#' + $(this).val()).click()
                $('#container').find('path').each((index, ele) => {
                    if ($(ele).attr('id') == countryCode) {
                        $(ele).attr('fill', '#09255c')
                        $(ele).attr('stroke', '#09255c')
                        tableClientByPays($('#tableClient'), {
                            param: [{
                                idPays: countryCode
                            }]
                        })
                        return
                    } else if ($(ele).attr('id').length == 2) {
                        $(ele).attr('fill', '#64b5f6')
                        $(ele).attr('stroke', '#467fac')
                    }
                })
            })
        }
    });
    setTimeout(() => {
        $('.anychart-credits').remove()
    }, 500)
}