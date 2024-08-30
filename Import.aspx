<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Import.aspx.cs" Inherits="Import" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Import</title>
    <link type="image/x-icon" rel="shortcut icon" href="image/logo/ITTONEERP.ico"/>  
    <link rel="stylesheet" href="css/global.css"/> 
    <style>
        .divProgress{
            width: 300px;
            height: 90px;
            background-color: white;
            position: absolute;
            top: 60px;
            right: 35px;
            text-align: center;
            border: 0;
            box-shadow: 0 2px 15px -3px rgb(0 0 0 / 7%), 0 10px 20px -2px rgb(0 0 0 / 4%);
            border-radius: 0.5rem;
        }
        .divProgress .progr{
            border-bottom: 2px solid var(--color-ittone);;
            width: 0%;
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
                        <li class="nav-item px-5 d-flex align-items-center" title="Client" data-model="Client">
                            <span>Societe</span>
                        </li>
                        <%--<li class="nav-item px-5 d-flex align-items-center" title="Fournisseur" data-model="Fournisseur">
                            <span>Fournisseur</span>
                        </li>--%>
                        <li class="nav-item px-5 d-flex align-items-center" title="Article" data-model="Article">
                            <span>Article</span>
                        </li>
                        <li class="nav-item px-5 d-flex align-items-center" title="Famille" data-model="Famille">
                            <span>Famille d'article</span>
                        </li>
                    </ul>
                </div>
                <div class="col-4 col-md-3 text-end fs-5 justify-content-end">
                    <span class="fs-6 mx-2 text-white-opacity hide-on-mobile nomDossier">...</span>
                    <span class="p-2" id="notification"><i class="fa-solid fa-bell"></i></span>
                    <span class="p-2 me-2 lin-h" title="Fermer Dossier" id="ferme"><i class="fa-solid fa-right-to-bracket"></i></span>
                </div>
            </div>
        </header>
        <section class="screen-afficher screen mt-3">
            <div class="row">
                <div class="col-4">
                    <h2 id="breadcrumb">...</h2>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6" id="excelImport">
                    <input id="excelFile" class="input-file d-none"  type="file" accept=".xlsx,.xls"/>
                    <label class="btn btn-success btn-rounded" for="excelFile" role="insert">Select a file...</label>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                </div>
                <div class="col-6 d-none" id="sqlImport">
                    <button type="button" class="btn btn-success btn-rounded" role="insert">Importer</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                </div>
            </div>
            <div class="row m-2  p-1 card">
                <div class="col-12">
                    <div class="tableView">
                        
                    </div>                    
                </div>
            </div>
        </section>
    </div>
    
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/moment.js"></script>
    <script src="vendors/calendar/semantic.min.js"></script>
    <script src="vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
    <script src="vendors/MDB5/js/mdb.min.js"></script>    
    <script src="vendors/DataTables/datatables.min.js"></script>
    <script src="vendors/DataTables/DataTables-1.12.1/js/dataTables.bootstrap5.min.js"></script>
    <script src="vendors/DataTables/Responsive-2.3.0/js/responsive.bootstrap5.min.js"></script>
    <script src="vendors/DataTables/Select-1.4.0/js/select.bootstrap5.min.js"></script>
    <script src="vendors/DataTables/Scroller-2.0.7/js/scroller.bootstrap5.min.js"></script>
    <script src="vendors/DataTables/SearchBuilder-1.3.4/js/searchBuilder.bootstrap5.min.js"></script>
    <script src="vendors/DataTables/Buttons-2.2.3/js/buttons.bootstrap5.min.js"></script>
    <script src="vendors/DataTables/DateTime-1.1.2/js/dataTables.dateTime.min.js"></script>
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
    <script src="js/roles.js"></script>
    <script src="js/ModaleImport/custom.js"></script>
    <script type="module" src="js/ModaleImport/core.js"></script> 
    <script src="vendors/xlsx/xlsx.core.min.js"></script>
</body>
</html>
