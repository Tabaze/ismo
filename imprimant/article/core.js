import { ListImageArticle, articleById } from "../service.js";

$(document).ready(function () {
    var idEntet;
    load();
    function load() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        idEntet = url.searchParams.get("id");
        let list = articleById({ id: idEntet })[0]
        let ltImgs = ListImageArticle({
            param: [{
                idArticle: idEntet
            }]
        })
        console.log(list, ltImgs)
        remDesc(list)
        imgTable(ltImgs)
        // $.ajax({
        //     url: window.location.href,
        //     dataType: 'html',
        //     success: function (htmlContent) {
        //         // Create a new jsPDF instance
        //         // var pdf = new jsPDF();
        //         var pdf = new jsPDF({
        //             orientation: 'p',
        //             unit: 'px',
        //             format: 'a4',
        //             putOnlyUsedFonts: true
        //         });
        //         // Load the PDF template
        //         var templateURL = 'path_to_pdf_template.pdf';
        //         //   pdf.loadFile(templateURL);
        //         // Set the HTML content into the PDF
        //         pdf.fromHTML(htmlContent, 50, 50, {
        //                 'width': 400,
        //                 'height': 450
        //             });
        //         pdf.save(list.nomArticle + new Date().getMilliseconds() + '.pdf');
        //     }
        // });
    }
});
const remDesc = (list) => {
    $('#nomArticle').text(list.nomArticle)
    $('#descr').append('<p>' + list.descArticle + '</p>')
    $('#etat').text(list.etatMater)
    if (list.tableAddons && list.tableAddons != '')
        JSON.parse(list.tableAddons).forEach(element => {
            $('.TableGrid').append(`<tr style='height:14.9pt'>
                                        <td width=331 valign=top style='width:3.45in;border:solid black 1.0pt;
                                padding:2.4pt 5.75pt 0in .05in;height:14.9pt'>
                                            <p class=MsoNormal style='margin-left:0in;text-indent:0in;line-height:107%'><span
                                                    style='font-size:11.0pt;line-height:107%'>${element.code} </span></p>
                                        </td>
                                        <td width=247 valign=top style='width:185.3pt;border:solid black 1.0pt;
                                padding:2.4pt 5.75pt 0in .05in;height:14.9pt'>
                                            <p class=MsoNormal style='margin-left:0in;text-indent:0in;line-height:107%'><span
                                                    style='font-size:11.0pt;line-height:107%'>${element.desc}</span></p>
                                        </td>
                                    </tr>`)
        });
}
const imgTable = (list) => {
    list.forEach(element => {
        $('.allPage').append(`
        <div class='imgs'>
                <img width=604 height=805 id="Picture 185"
                    src="../../${element.pathFile}"></div>
        `)
    })
}