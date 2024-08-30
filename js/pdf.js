var pdf = (function () {
    return {
        Defualt: function (data) {
            let title = data.titel;
            let table = generatorTable(data.table.columns_title, data.table.getData);
            let footer = generatorTable(data.foter.columns_title, data.foter.getData);
            let option = data.option;
            getIframe(title, table, footer, option);
        },
        FormatTableHtml: function (data) {
            let title = data.titel;
            let table = data.table;
            let footer = data.foter;
            let option = data.option;
            getIframe(title, table, footer, option);
        }
    }
})();
const generatorTable = function (columns_title, getData) {
    if (columns_title.length) {
        let $table = $('<table></table>');
        let th = '';
        for (let col in columns_title) {
            th += '<th>' + columns_title[col].title + '</th>';
        }
        let $thead = $('<thead><tr>' + th + '</tr></thead>');
        let $tbody = $('<tbody></tbody>');
        for (let i in getData) {
            let $tr = $('<tr></tr>');
            for (let col in columns_title) {
                let data = columns_title[col].data;
                let render = columns_title[col].render;
                if (render) {
                    $tr.append('<td>' + render(getData[i][data], getData[i]) + '</td>');
                } else {
                    $tr.append('<td>' + getData[i][data] + '</td>');
                }

            }
            $tbody.append($tr);
        }
        $table.append($thead);
        $table.append($tbody);
        return $table.html();
    } else {
        return getData;
    }
}
const getIframe = function (title, table, footer, option) {
    let url_string = window.location.href;
    let url = new URL(url_string);
    $('.iframeImprement').remove();
    var ifrm = $('<iframe>').css({
        position: 'absolute',
        left: 0,
        top: 0,
        'z-index': -1,
        width: 0,
        height: 0,
        border: 0
    });
    ifrm.attr('src', url.origin + '/vendors/tablePDF/index.html');
    ifrm.addClass('iframeImprement');
    ifrm.appendTo(document.body);
    ifrm.on('load', function () {
        var iframe = this;
        var iframeWindow = iframe.contentWindow || iframe;
        iframe.focus();
        $(iframe).contents().find('#title').html(title);
        $(iframe).contents().find('title').html(ittone.getSubMenu());
        $(iframe).contents().find('#table').html(table);
        $(iframe).contents().find('#footer').html(footer);
        if (sessionStorage.getItem('dataDossier')) {
            let data = JSON.parse(sessionStorage.getItem('dataDossier'));
            iframe.contentWindow.generate(option, data.Nom_dossier);
        }
    });
}
const generatorTableGroup = function (columns_title, getData) {
    if (columns_title.length) {
        let $table = $('<table></table>');
        let th = '';
        for (let col in columns_title) {
            th += '<th>' + columns_title[col].title + '</th>';
        }
        let $thead = $('<thead><tr>' + th + '</tr></thead>');
        let $tbody = $('<tbody></tbody>');
        for (let i in getData) {
            let $tr = $('<tr></tr>');
            for (let col in columns_title) {
                let data = columns_title[col].data;
                let render = columns_title[col].render;
                if (render) {
                    $tr.append('<td>' + render(getData[i][data], getData[i]) + '</td>');
                } else {
                    $tr.append('<td>' + getData[i][data] + '</td>');
                }

            }
            $tbody.append($tr);
        }
        $table.append($thead);
        $table.append($tbody);
        return $table.html();
    } else {
        return getData;
    }
}

const f = function () {
    let df = [
        {
            "doc": "A",
            "numFactur": 35,
            "dateEntet": "/Date(1678662000000)/",
            "TT_ttc": 140,
            "descType": "B.LIVRAISON-CL",
            "etatDoc": "Valider",
            "codeType": "BLFC",
            "nom": "DouaeEm",
            "idClient": 52
        },
        {
            "doc": "A",
            "numFactur": 4,
            "dateEntet": "/Date(1678662000000)/",
            "TT_ttc": -40,
            "descType": "B.AVOIR-CL",
            "etatDoc": "Valider",
            "codeType": "BRC",
            "nom": "DouaeEm",
            "idClient": 52
        },
        {
            "doc": "B",
            "numFactur": 29,
            "dateEntet": "/Date(1678662000000)/",
            "TT_ttc": 0,
            "descType": "ESPECE",
            "etatDoc": "saisir",
            "codeType": "ESPC",
            "nom": "Duae",
            "idClient": 50
        },
        {
            "doc": "B",
            "numFactur": 2,
            "dateEntet": "/Date(1678662000000)/",
            "TT_ttc": -905,
            "descType": "PAYES( 56656586989689 )",
            "etatDoc": "saisir",
            "codeType": "PYC",
            "nom": "mouad",
            "idClient": 4
        },
        {
            "doc": "B",
            "numFactur": 1,
            "dateEntet": "/Date(1678662000000)/",
            "TT_ttc": 800,
            "descType": "RENDU",
            "etatDoc": "saisir",
            "codeType": "RNDC",
            "nom": "HAMZA",
            "idClient": 7
        },
        {
            "doc": "B",
            "numFactur": 30,
            "dateEntet": "/Date(1678662000000)/",
            "TT_ttc": -100,
            "descType": "ESPECE",
            "etatDoc": "saisir",
            "codeType": "ESPC",
            "nom": "DouaeEm",
            "idClient": 52
        }
    ]

    let result = df.reduce((r, { idClient: name, nom: client, ...object }) => {
        var temp = r.find(o => o.name === name);
        if (!temp) r.push(temp = { name, children: [], client });
        temp.children.push(object);
        return r;
    }, []);
    let $table = $('<table></table>');
    
    result.forEach(element => {
        $table.append('<tr><td colspan="2">' + element.client + '</td></tr>')
        let array = element.children;
        array.forEach(e => {
            $table.append('<tr><td>' + e.codeType + '</td><td>' + e.TT_ttc + '</td></tr>');
        });
    });
}