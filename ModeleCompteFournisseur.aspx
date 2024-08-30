<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleCompteFournisseur.aspx.cs" Inherits="ModeleCompteFournisseur" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Modèle de Compte Fournisseur</title>
    <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico"/>  
    <link rel="stylesheet" href="../css/global.css"/> 
    <style>
        #credit{
            text-align: center;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #0288d1;
            height: 50px;
            line-height: 50px;
            color: #fffffe;
            font-weight: bold;
            font-size: 1.6rem;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            -webkit-box-shadow: 2px 2px 5px 0px rgb(0 0 0 / 75%);
            -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 2px 2px 5px 0px rgb(0 0 0 / 75%);
        }
    </style>
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
                        <li class="nav-item px-2 d-flex align-items-center" title="Document Fournisseur" data-model="DocFournisseur">
                            <span>Document Fournisseur</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Document Fournisseur Detaillé" data-model="DocFournisseurDetail">
                            <span>Document Fournisseur Detaillé</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Grand Livre Fournisseur" data-model="GrandLiveFournisseur">
                            <span>Grand Livre Fournisseur</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Balance Fournisseur" data-model="SoldeCreditFournisseur">
                            <span>Balance Fournisseur</span>
                        </li>
                    </ul>
                </div>
                <div class="col-4 col-md-3 text-end fs-5 justify-content-end">
                    <span class="fs-6 mx-2 text-white-opacity hide-on-mobile nomDossier">...</span>
                    <span class="p-2" id="notification"><i class="fa-solid fa-bell"></i></span>
                    <span class="p-2 me-2 lin-h"title="Fermer Dossier" id="ferme"><i class="fa-solid fa-right-to-bracket"></i></span>
                </div>
            </div>
        </header>
        <section class="screen-afficher screen mt-1">
            <div class="row">
                <div class="col-4">
                    <h2 id="breadcrumb">...</h2>
                </div>
                <div class="col-6 classFilter">
                    <div class="form-outline mb-3 mt-4">
                        <div class="d-inline-block bg-white w-25">
                            <select class="form-select d-inline-block" id="idFournisseur">  
                            </select>
                        </div>
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
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" title="Date" id="filterDateEntet">
                            <i class="fa-solid fa-filter"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="d-none"><span>Solde Crédit : </span><span id="credit">0 Dh</span></div>
                </div>
                <div class="col-6 text-end">
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf"title="Telecharger PDF">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel"title="Telecharger PDF">
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
                                <td>Total Crédit :</td>
                                <td class="TT_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                            <tr>
                                <td>Total Payé :</td>
                                <td class="TT_All" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="w-100 totalTableDocFournisseur d-none">
                        <tbody>
                            <tr>
                                <td>Total HT page :</td>
                                <td class="HT_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                                <td>Total TVA page :</td>
                                <td class="TVA_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                                <td>Total TTC page :</td>
                                <td class="TTC_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                            <tr>
                                <td>Total HT :</td>
                                <td class="tHT_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                                <td>Total TVA :</td>
                                <td class="tTVA_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                                <td>Total TTC :</td>
                                <td class="tTTC_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="w-100 totalTableDocFournisseurDetail d-none">
                        <tbody>
                            <tr>
                                <td>Total HT page :</td>
                                <td class="HT_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                                <td>Total TTC page :</td>
                                <td class="TTC_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                            <tr>
                                <td>Total HT :</td>
                                <td class="tHT_Page" style="border-right: 1px solid #dfdfdf;">...</td>
                                <td>Total TTC :</td>
                                <td class="tTTC_Page" style="border-right: 1px solid #dfdfdf;">...</td>
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
    <script src="../js/ModeleCompteFournisseur/custom.js"></script>
    <script type="module" src="../js/ModeleCompteFournisseur/core.js"></script> 
</body>
</html>
