import { ClientPot, articleChart, dashboardInfos } from './service.js';
import { loadMap, randomColors, tableArticleDispo, tableClientByPays, tableClientParPot, tabletopFactures, tabletotal_by_pays, top5CA } from './component.js';
import { selectAllDossier } from '../ModeleDossier/component.js'
import { selectCategorie, selectPotClient, selectRebrique } from '../ModeleBase/component.js';
import { listPays } from '../ModeleBase/service.js';
import { selectClient } from '../ModeleTier/component.js';
$(function () {
    loadApp();
    $('#filterDate').on('click', this, function () {
        ArticleChart();
        randerTableArticle()
    });
    $('#idDossier').on('change', this, function () {
        let data = $('#idDossier').select2('data')[0].datax;
        const startOfYear = moment().startOf('Year').set('year', moment(data.dateExeStart).year()).toDate();
        const endOfYear = moment().endOf('Year').set('year', moment(data.dateExeStart).year()).toDate();
        $('#dateStart').setDate(startOfYear);
        $('#dateEnd').setDate(endOfYear);
        $('#filterDate').click();
    });
    $('#idClient').on('change', this, () => {
        LineChart()
    })
    $('#idPotentiel').on('change', this, function () {
        let dt = {
            param: [{
                idPot: $(this).val()
            }]
        }
        tableClientParPot($('#tableClientPot'), dt)
    })
    $('#idRebriq,#idCateg').on('change', this, function () {
        tabletotal_by_pays($('#paysTotal'),{
            param: [{
                idRebri: $('#idRebriq').val(),
                idCate: $('#idCateg').val(),
            }]
        })
    })
});
var tableRander,
    myBarChart2 = null,
    myLineChart = null;
const loadApp = function () {
    let name = ittone.getSubMenu();
    let dateDossier = ittone.dateExeDossier();
    const startOfYear = moment().startOf('Year').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    const endOfYear = moment().endOf('Year').set('year', moment(dateDossier.dateExeStart).year()).toDate();
    $('#dateStart').setDate(startOfYear);
    $('#dateEnd').setDate(endOfYear);
    switch (name) {
        case 'Dashboard':
            ittone.hide($('#map'))
            selectCategorie($('#idCate'))
            selectRebrique($('#idRebri'))
            selectClient($('#idClient'))
            selectPotClient($('#idPotentiel'))
            let data = JSON.parse(sessionStorage.getItem('dataDossier'));
            $('#idDossier').val(data.idDossier);
            $('#idDossier').trigger('change');
            ArticleChart();
            randerTableArticle('')
            top5CA()
            LineChart()
            tableClientParPot($('#tableClientPot'), {
                param: [{
                    idPot: $('#idPotentiel').val()
                }]
            })
            break;
        case 'Map':
            ittone.hide($('#dashboard'))
            selectCategorie($('#idCateg'))
            selectRebrique($('#idRebriq'))
            loadMap()
            tableClientByPays($('#tableClient'), {
                param: [{
                    idPays: ''
                }]
            })
            tabletotal_by_pays($('#paysTotal'),{
                param: [{
                    idRebri: $('#idRebriq').val(),
                    idCate: $('#idCateg').val(),
                }]
            })
            break;
        default:
    }
}
const randerTableArticle = function (type) {
    let columns_title = [
        { "data": "refArticle", "title": i18n.translate("Référence") },
        { "data": "nomArticle", "title": i18n.translate("nomArticle") },
        { "data": "nomCategorie", "title": i18n.translate("Categorie") },
        { "data": "nomRebrique", "title": i18n.translate("Rebrique") },
        { "data": "nomSociete", "title": i18n.translate("nomClient"), render: (dt) => dt ? dt : '' },
    ];
    let dt = {
        param: [{
            idCate: $('#idCate').val(),
            idRebri: $('#idRebri').val(),
            type: type
        }]
    }
    tableRander = tableArticleDispo($("#tableArticle"), columns_title, dt);
    $('.dispoCount').text('Quantité ' + (type ? type + ' : ' : 'Disponible : ') + tableRander.rows().count())
}
const ArticleChart = function () {
    let dt = {
        param: [{
            idCate: $('#idCate').val(),
            idRebri: $('#idRebri').val()
        }]
    }
    let data = articleChart(dt)[0];
    const ctx2 = document.getElementById('chartDepensesRecettes');
    let res = [];
    if (data) {
        res.push(data.dispo)
        res.push(data.diseri)
        res.push(data.vendu)
    }
    if (myBarChart2 != null) {
        myBarChart2.destroy();
    }
    myBarChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: [
                'Disponible',
                'Désirés',
                'Vendues',
            ],
            datasets: [{
                label: ' Quantité ',
                data: res,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 7
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 18
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Article',
                    font: {
                        size: 28
                    }
                }
            },
            onClick: (e, activeEls) => {
                let dataIndex = activeEls[0].index;
                let datasetLabel = e.chart.data.datasets[0].data[dataIndex];
                let value = e.chart.data.datasets[0].label;
                let type = e.chart.tooltip.title[0]
                randerTableArticle(type)
                //link to url with:[chartIds]
            }

        },
    });
    myBarChart2.canvas.style.height = '450px';
}
const LineChart = function () {
    const line = document.getElementById('chartCaissier');
    let dt = {
        param: [{
            idClient: $('#idClient').val(),
        }]
    }
    let ds = ClientPot(dt);
    if (myLineChart != null) {
        myLineChart.destroy();
    }
    let data = []
    ds.forEach((ele, index) => {
        data.push({
            y: [
                moment(ele.dateMaj).valueOf(),
                ele.dateEnd ? moment(ele.dateEnd).valueOf() : moment().valueOf()
            ],
            x: ele.nomPotClient,
            fillColor: ele.codeColor
        })

    })
    var options = {
        series: [
            {
                name: $('#idClient').select2('data')[0].data.nomClient || '',
                data: data
            }
        ],
        chart: {
            height: 500,
            type: 'rangeBar',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
            },
        },
        title: {
            text: $('#idClient').select2('data')[0].data.nomClient,
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontFamily: 'Poppins',
                color: '#263238',
                marginTop: 10
            },
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        }, tooltip: {
            custom: function (val, opts) {
                var label = val.w.globals.labels[val.dataPointIndex]
                var name = val.w.globals.seriesNames[0]
                var a = moment(val.y1)
                var b = moment(val.y2)
                var diff = b.diff(a, 'days') + 1
                return `<div> 
                            <span class="series-name" style="color: #008FFB">${name} </span>
                        </div>
                        <div class="arrow_box">
                            <span>${label} </span>
                        </div>
                        <div class="arrow_box">
                            <span>${diff + (diff > 1 ? ' jours' : ' jour')} </span>
                        </div>
                        <div class="arrow_box">
                            <span>${a.format('L') + ' - ' + b.format('L')} </span>
                        </div>`
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                var label = opts.w.globals.labels[opts.dataPointIndex]
                var a = moment(val[0])
                var b = moment(val[1])
                var diff = b.diff(a, 'days') + 1
                return label + ': ' + diff + (diff > 1 ? ' jours' : ' jour')
            },
        },
        xaxis: {
            type: 'datetime'
        }
    };

    myLineChart = new ApexCharts(line, options);
    myLineChart.render();
}