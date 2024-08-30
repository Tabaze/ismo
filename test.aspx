<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>Model de RGC</title>
        <link type="image/x-icon" rel="shortcut icon" href="image/logo/logo.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="vendors/fontawesome/css/all.css" />
        <link rel="stylesheet" href="vendors/alertifyjs/css/alertify.min.css" />
        <link rel="stylesheet" href="vendors/sweetalert2/sweetalert2.min.css" />
        <link rel="stylesheet" href="vendors/alertifyjs/css/themes/default.css" />
        <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="vendors/DataTables/datatables.min.css" />
        <link href="css/style.css" rel="stylesheet" />
        <link href="css/tier.css" rel="stylesheet" />
        <link href="vendors/DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <!-- VueJS -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <style>
            .pagination {
                height: 44px;
                padding: 0 15px;
                float: right;
                display: flex;
            }

            .pagination li a.active {
                background-color: #4caf50;
                color: #fff;
            }

            .pagination a {
                text-decoration: none;
                border-radius: 4px;
                padding: 5px 10px;
                color: #000;
            }

            .pagination li a.active {
                background-color: #4caf50;
                color: #fff
            }

            .pagination li a:hover:not(.active) {
                background-color: #ddd;
            }

            .pagination__mid {
                display: flex;
                justify-content: center;
            }

            .pagination__mid ul {
                text-decoration: none;
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .pagination__mid li {
                display: inline-block;
            }
        </style>
    </head>

    <body>
        <form id="form1" runat="server">
            <%--<div id="app">
                <input type="text" v-model="text_search">
                <select v-model="page_seize">
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                </select>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Ref_article</th>
                            <th>Nom_article</th>
                            <th>Codebare_article</th>
                            <th>Prix_achat</th>
                            <th>Prix_vente</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="article, index in articles">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ article.Ref_article }}</td>
                            <td>{{ article.Nom_article }}</td>
                            <td>{{ article.Codebare_article }}</td>
                            <td>{{ article.Prix_achat }}</td>
                            <td>{{ article.Prix_vente }}</td>

                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    <ul class="pagination" id="pagination"></ul>
                </nav>
                <div class="pagination">
                    <div class="pagination__left">
                        <a href="#" v-if="hasPrev()" @click="changePage(curentpage-1)">Précedent</a>
                    </div>
                    <div class="pagination__mid">
                        <ul>
                            <li v-if="hasFirst()"><a href="#" @click="changePage(1)">1</a></li>
                            <li v-if="hasFirst()">...</li>
                            <li v-for="i in pages(curentpage)">
                                <a href="#" @click="changePage(i)" :class="{ active: curentpage == i }">
                                    {{ i }}
                                </a>
                            </li>
                            <li v-if="hasLast()">...</li>
                            <li v-if="hasLast()"><a href="#" @click="changePage(totalPages)">{{ totalPages }}</a></li>
                        </ul>
                    </div>

                    <div class="pagination__right">
                        <a href="#" v-if="hasNext()" @click="changePage(curentpage+1)">Suivant</a>
                    </div>
                </div>
                curentpage: {{curentpage}}
                totalPages: {{totalPages}}
                </div>

                </div>--%>
                <div id="bb">qskdgsdh</div>
                <table cellpadding="10" cellspacing="10" style="border: solid 10px red; background-color: Skyblue;"
                    width="90%" align="center">
                    <tr>
                        <td style="height: 35px; background-color: Yellow; font-weight: bold; font-size: 16pt;  
                    font-family: Times New Roman; color: Red" align="center">
                            Backup SQL Server DataBase
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <asp:Label ID="lblError" runat="server" ForeColor="Red"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <asp:Button ID="btnBackup" runat="server" Text="Backup DataBase"
                                OnClick="btnBackup_Click" />
                        </td>

                    </tr>
                </table>
                <div>
                    <div>
                        <div class="shapes-3"></div>
                    </div>
                </div>
                <style>
                    .shapes-3 {
                        width: 50px;
                        height: 50px;
                        display: flex;
                        transform: rotate(45deg);
                        animation: sh3-0 1.5s infinite linear;
                    }

                    .shapes-3:before,
                    .shapes-3:after {
                        content: "";
                        width: 50%;
                        background: #514b82;
                        clip-path: polygon(0 50%, 100% 0, 100% 100%);
                        animation: inherit;
                        animation-name: sh3-1;
                    }

                    .shapes-3:after {
                        clip-path: polygon(0 0, 100% 50%, 0% 100%);
                        animation-name: sh3-2;
                    }

                    @keyframes sh3-0 {
                        25% {
                            width: 50px;
                            height: 50px;
                            transform: rotate(0)
                        }

                        50% {
                            width: 50px;
                            height: 50px
                        }

                        75% {
                            width: 70.70px;
                            height: 35.35px
                        }

                        100% {
                            width: 70.70px;
                            height: 35.35px;
                            transform: rotate(0)
                        }
                    }

                    @keyframes sh3-1 {

                        0%,
                        25% {
                            clip-path: polygon(0 50%, 100% 0, 100% 100%);
                            transform: translate(0.3px)
                        }

                        50% {
                            clip-path: polygon(0 50%, 100% 0, 100% 100%);
                            transform: translate(-5px)
                        }

                        75% {
                            clip-path: polygon(0 100%, 0 0, 100% 100%);
                            transform: translate(-5px)
                        }

                        100% {
                            clip-path: polygon(0 100%, 0 0, 100% 100%);
                            transform: translate(17.7px)
                        }
                    }

                    @keyframes sh3-2 {

                        0%,
                        25% {
                            clip-path: polygon(0 0, 100% 50%, 0 100%);
                            transform: translate(-0.3px)
                        }

                        50% {
                            clip-path: polygon(0 0, 100% 50%, 0 100%);
                            transform: translate(5px)
                        }

                        75% {
                            clip-path: polygon(0 0, 100% 0, 100% 100%);
                            transform: translate(5px)
                        }

                        100% {
                            clip-path: polygon(0 0, 100% 0, 100% 100%);
                            transform: translate(-17.7px)
                        }
                    }
                </style>
                <script src="js/jquery-2.1.1.min.js"></script>
                <%--<script>
                    var app = new Vue({
                    el: '#app',
                    data: {
                    articles: [],
                    text_search: "",
                    page_seize: 10,
                    curentpage: 1,
                    totalPages: 0,
                    totalsize: 0,
                    },
                    created() {


                    },
                    computed: {
                    list: function () {
                    var self = this
                    $.ajax
                    ({
                    type: 'POST',
                    url: 'test.aspx/article',
                    async: false,
                    data: "{'Id_dossier':'1','PageSize':'" + self.page_seize + "','Page':'" + self.curentpage +
                    "','text_search':'" + self.text_search + "','statment':'list'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                    console.log(data.d)
                    self.articles = data.d;
                    },
                    error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                    }
                    });

                    },
                    count: function () {
                    var self = this
                    $.ajax
                    ({
                    type: 'POST',
                    url: 'test.aspx/article',
                    async: false,
                    data: "{'Id_dossier':'1','PageSize':'" + self.page_seize + "','Page':'" + self.curentpage +
                    "','text_search':'" + self.text_search + "','statment':'count'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                    console.log(data.d[0].totalsize)
                    self.totalsize = data.d[0].totalsize;
                    },
                    error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                    }
                    });
                    }

                    },
                    methods: {
                    hasFirst: function () {
                    return this.curentpage !== 1
                    },
                    hasLast: function () {
                    return this.curentpage < this.totalPages - 1 }, hasPrev: function () { return this.curentpage> 1
                        },
                        hasNext: function () {
                        return this.curentpage <= this.totalPages }, changePage: function (val) { this.curentpage=val;
                            this.list; }, pages: function (val) { var list=[]; switch (true) { case (this.totalPages <
                            val) && (this.totalPages !=0): this.changePage(this.totalPages); return
                            this.list_pagination(this.totalPages, this.totalPages - 1); break; case
                            val==this.totalPages: return this.list_pagination(val, val + 1); break; case this.totalPages
                            < 1: return this.list_pagination(val, val + 1); break; case val> 2: return
                            this.list_pagination(val - 1, val + 2); break;
                            default: return this.list_pagination(val, val + 2); break;
                            }


                            // if(val==this.totalPages || this.totalPages<1){ // var list=[]; // for(var
                                i=val;i<=val;i++){ // list.push(i); // } // return list; // } // if(val>2){
                                // var list=[];
                                // for(var i=val-1;i<val+2;i++){ // list.push(i); // } // return list; // }else{ // var
                                    list=[]; // for(var i=val;i<val+2;i++){ // list.push(i); // } // return list; // }
                                    }, list_pagination: function (star, end) { var list=[]; for (var i=star; i < end;
                                    i++) { list.push(i); } return list; } }, mounted() { this.count; this.list; },
                                    watch: { page_seize: function (val) { var value=Math.ceil(this.totalsize / val);
                                    this.totalPages=value; }, totalsize: function (val) { var value=Math.ceil(val /
                                    this.page_seize); this.totalPages=value; } } }); </script>--%>
                                    <script src="vendors/alertifyjs/alertify.min.js"></script>
                                    <script src="vendors/sweetalert2/sweetalert2.all.min.js"></script>
                                    <script>


                                    </script>
                                    <script type="text/javascript" src="vendors/daterangepicker/moment.min.js"></script>
                                    <script type="text/javascript"
                                        src="vendors/daterangepicker/daterangepicker.js"></script>
                                    <script charset="utf-8" async="async" src="js/custom.js"></script>
                                    <script src="js/jquery.table2excel.min.js"></script>
                                    <script type="text/javascript" src="vendors/DataTables/datatables.min.js"></script>

                                    <script>
                                        $(document).ready(function () {
                                            //      var $table_view = $('.table_view');
                                            //      $table_view.html('<table class="table table-hover table-article " style="width:100%">'
                                            //      + '<thead><tr>'
                                            //      + '<th>Référence</th>'
                                            //      + '<th>Code-Barre</th>'
                                            //      + '<th>Nom Article</th>'
                                            //      + '<th>Description</th>'
                                            //      + '<th>Prix Achat</th>'
                                            //      + '<th>Prix Vente</th>'
                                            //      + '<th>Classement</th>'
                                            //      + '<th>Famille</th>'
                                            //      + '<th>Peut être acheté</th>'
                                            //      + '<th>Peut être vendu</th>'
                                            //      + '</tr></thead><tbody></tbody></table>');
                                            //      $.ajax
                                            //({
                                            //    type: 'POST',
                                            //    url: 'test.aspx/article',
                                            //    async: true,
                                            //    data: "",
                                            //    contentType: 'application/json; charset =utf-8',
                                            //    success: function (data) {
                                            //        $table_view.find('.table tbody').append(data.d);
                                            //        $table_view.find('table').DataTable();
                                            //    },
                                            //    error: function (xhr, status, error) {
                                            //        var err = eval("(" + xhr.responseText + ")");
                                            //        console.log(err.Message);
                                            //    }
                                            //});

                                        });

                                    </script>
                                    <script src="js/jquery-3.6.0.min.js"></script>
                                    <script src="js/jquery-ui.js"></script>
                                    <script src="js/moment.js"></script>
                                    <script src="js/currency.min.js"></script>
                                    <script src="vendors/calendar/semantic.min.js"></script>
                                    <script src="vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
                                    <script src="vendors/MDB5/js/mdb.min.js"></script>
                                    <script src="vendors/DataTables/datatables.min.js"></script>
                                    <script
                                        src="vendors/DataTables/DataTables-1.12.1/js/dataTables.bootstrap5.min.js"></script>
                                    <script
                                        src="vendors/DataTables/Responsive-2.3.0/js/responsive.bootstrap5.min.js"></script>
                                    <script src="vendors/DataTables/Select-1.4.0/js/select.bootstrap5.min.js"></script>
                                    <script
                                        src="vendors/DataTables/Scroller-2.0.7/js/scroller.bootstrap5.min.js"></script>
                                    <script
                                        src="vendors/DataTables/SearchBuilder-1.3.4/js/searchBuilder.bootstrap5.min.js"></script>
                                    <script
                                        src="vendors/DataTables/Buttons-2.2.3/js/buttons.bootstrap5.min.js"></script>
                                    <script
                                        src="vendors/DataTables/DateTime-1.1.2/js/dataTables.dateTime.min.js"></script>
                                    <script src="vendors/DataTables/datetime-moment.js"></script>
                                    <script src="vendors/sweetalert2/sweetalert2.all.min.js"></script>
                                    <script src="vendors/select2/select2.min.js"></script>
                                    <script src="vendors/calendar/calendar.min.js"></script>
                                    <script src="vendors/xlsx/xlsx.full.min.js"></script>
                                    <script src="js/pdf.js"></script>
                                    <script src="js/xlsx.js"></script>
                                    <script src="js/menu.js"></script>
                                    <script src="js/i18n.js"></script>
                                    <script src="js/ittone.js"></script>
                                    <script src="js/notification.js"></script>
                                    <script src="js/roles.js"></script>
                                    <script src="test.js">

                                    </script>
        </form>
    </body>

    </html>