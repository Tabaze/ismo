<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleGestionQT.aspx.cs" Inherits="ModeleGestionQT" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modele de Gestion Qte</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
    </head>

    <body class="bgModel">
        <div class="container-fluid h-100">
            <header>
                <div class="row top-header text-white">
                    <div class="col-2 col-md-2">
                        <span class="p-2 ms-1 fs-5 lin-h" id="homeMenu"><i class="fa-solid fa-house"></i></span>
                        <span class="text-white-opacity fs-6 hide-on-mobile" id="nomUser">...</span>
                    </div>
                    <div class="col-6 col-md-7 menu-selector">
                        <ul class="nav h-100 user-select-none" id="menu-header" role="menu">
                            <li class="nav-item px-2 d-flex align-items-center" title="Stock simple"
                                data-model="parDepotSample">
                                <span>Stock simple</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Stock Valorisé Par Article"
                                data-model="parArticle">
                                <span>Stock Valorisé A</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Stock Valorisé Par Famille"
                                data-model="parFamille">
                                <span>Stock Valorisé F</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Stock Valorisé Par Dépôt"
                                data-model="parDepot">
                                <span>Stock Valorisé D</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Stock Valorisé Par Emplacement"
                                data-model="parEmplacement">
                                <span>Stock Valorisé E</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Article Par Document"
                                data-model="articleParDoc">
                                <span>Article Par Document</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Mouvement D'article"
                                data-model="mvmArticle">
                                <span>Mvm D'article</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="Mouvement Famille"
                                data-model="mvmFamille">
                                <span>Mvm Famille</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-4 col-md-3 text-end fs-5 justify-content-end">
                        <span class="fs-6 mx-2 text-white-opacity hide-on-mobile nomDossier">...</span>
                        <span class="p-2" id="notification"><i class="fa-solid fa-bell"></i></span>
                        <span class="p-2 me-2 lin-h" title="Fermer Dossier" id="ferme"><i
                                class="fa-solid fa-right-to-bracket"></i></span>
                    </div>
                </div>
            </header>
            <section class="screen-afficher screen mt-1">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">...</h2>
                    </div>
                    <div class="col-2 GestionParArticle">
                        <div class="mb-3 card p-2 w-75">
                            <div class="filterParArticle d-none">
                                <label for="idArticle" class="form-label me-1">Article</label>
                                <select class="form-select" name="idArticle" id="idArticle">
                                </select>
                            </div>
                            <div class="filterParFamille d-none">
                                <label for="idFamille" class="form-label me-1">Famille</label>
                                <select class="form-select" name="idFamille" id="idFamille">
                                </select>
                            </div>
                            <div class="filterParDepot d-none">
                                <label for="idDepot" class="form-label me-1">Dépôt</label>
                                <select class="form-select" name="idDepot" id="idDepot">
                                </select>
                            </div>
                            <div class="filterParEmplacement d-none">
                                <label for="idEmplacement" class="form-label me-1">Emplacement</label>
                                <select class="form-select" name="idEmplacement" id="idEmplacement">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-outline mb-3 mt-4 divCalendar">
                            <div class="ui calendar date_range dateStart" id="dateStart">
                                <div class="ui input left icon">
                                    <i class="calendar icon"></i>
                                    <input type="text" placeholder="Start">
                                </div>
                            </div>
                            <div class="ui calendar date_range dateEnd" id="dateEnd">
                                <div class="ui input left icon">
                                    <i class="calendar icon"></i>
                                    <input type="text" placeholder="End">
                                </div>
                            </div>
                            <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" title="Filtre"
                                id="filterDateEntet">
                                <i class="fa-solid fa-filter"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row QteDiv">
                    <h3>Total Quantité : <span id="totalQte"></span></h3>
                </div>
                <div class="row">
                    <div class="col-6">

                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf"
                            title="Telecharger PDF">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel"
                            title="Telecharger Excel">
                            <i class="fa-solid fa-file-excel"></i>
                        </button>
                    </div>
                </div>
                <div class="row m-1  p-1 card">
                    <div class="col-12">
                        <div class="tableView">

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 card m-auto">
                        <table class="w-100 totalTable d-none">
                            <tbody>
                                <tr>
                                    <td>Valeur selon CMUP:</td>
                                    <td class="TT_pageCMUP" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <td>Valeur selon dernier prix:</td>
                                    <td class="TT_pageValeur" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <!-- <td>Total T.T.C Page:</td>
                                <td class="cTT_ttc">...</td> -->
                                </tr>
                                <tr>
                                    <td>Valeur globale selon CMUP :</td>
                                    <td class="TT_CMUP" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <td> Valeur globale selon dernier prix :</td>
                                    <td class="TT_Valeur" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <!-- <td>Total T.T.C :</td>
                                <td class="TT_ttc">...</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/jquery-ui.js"></script>
        <script src="../js/moment.js"></script>
        <script src="../js/currency.min.js"></script>
        <script src="../vendors/calendar/semantic.min.js"></script>
        <script src="../vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
        <script src="../vendors/MDB5/js/mdb.min.js"></script>
        <script src="../vendors/DataTables/datatables.min.js"></script>
        <script src="../vendors/DataTables/DataTables-1.12.1/js/dataTables.bootstrap5.min.js"></script>
        <script src="../vendors/DataTables/Responsive-2.3.0/js/responsive.bootstrap5.min.js"></script>
        <script src="../vendors/DataTables/Select-1.4.0/js/select.bootstrap5.min.js"></script>
        <script src="../vendors/DataTables/Scroller-2.0.7/js/scroller.bootstrap5.min.js"></script>
        <script src="../vendors/DataTables/SearchBuilder-1.3.4/js/searchBuilder.bootstrap5.min.js"></script>
        <script src="../vendors/DataTables/Buttons-2.2.3/js/buttons.bootstrap5.min.js"></script>
        <script src="../vendors/DataTables/DateTime-1.1.2/js/dataTables.dateTime.min.js"></script>
        <script src="../vendors/DataTables/datetime-moment.js"></script>
        <script src="../vendors/sweetalert2/sweetalert2.all.min.js"></script>
        <script src="../vendors/select2/select2.min.js"></script>
        <script src="../vendors/calendar/calendar.min.js"></script>
        <script src="../vendors/xlsx/xlsx.full.min.js"></script>
        <script src="../js/pdf.js"></script>
        <script src="../js/xlsx.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/i18n.js"></script>
        <script src="../js/ittone.js"></script>
        <script src="../js/notification.js"></script>
        <script src="../js/roles.js"></script>
        <script src="../js/ModeleGestionQT/custom.js"></script>
        <script type="module" src="../js/ModeleGestionQT/core.js"></script>
    </body>

    </html>