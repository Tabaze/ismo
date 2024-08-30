<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleDocuments.aspx.cs"
    Inherits="ModeleDocuments_ModeleDocuments" %>

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modèle des Documents</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="stylesheet" href="../css/global.css" />
        <link rel="stylesheet" href="../css/gestionFoldersStyle.css" />

        <style>
            .folders:hover,
            .file:hover {
                cursor: pointer;
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
                            <li class="nav-item px-5 d-flex align-items-center" title="Société" data-model="Clients">
                                <span>Société</span>
                            </li>
                            <!-- <li class="nav-item px-5 d-flex align-items-center" title="Fournisseurs"
                                data-model="Fournisseurs">
                                <span>Fournisseurs</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Employés" data-model="Employes">
                                <span>Employés</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Autres" data-model="Autres">
                                <span>Autres</span>
                            </li> -->
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
            <section class="screen-afficher screen">
                <div class="row">
                    <div class="col-3">
                    </div>
                    <div class="col-8">
                        <div class="form-outline mb-3 mt-4">
                            <div class="d-inline-block bg-white w-25">
                                <select class="form-select d-inline-block" id="idDossier">
                                </select>
                            </div>
                            <!-- <div class="ui calendar date_range dateStart" id="dateStart">
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
                                id="filterDate">
                                <i class="fa-solid fa-filter"></i>
                            </button> -->
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create" role="insert"
                            id="newFolder">New Folder</button>
                        <button type="button" class="btn btn-light btn-rounded" id="uploadFile">Upload</button>
                        <!-- <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                    </div>
                    <div class="col-4">

                    </div>

                </div>
                <div class="row mt-3 m-1 p-2 card">
                    <div class="col-12">
                        <div class="container">
                            <div class="row">
                                <div class="col-2 float-start mt-5">
                                    <div class="mb-3">
                                        <label for="idTier" class="form-label me-1" id="nameTier">...</label>
                                        <select class="form-select" name="idTier" id="idTier">
                                        </select>
                                    </div>
                                    <div class="ibox float-e-margins">
                                        <div class="ibox-content">
                                            <div class="file-manager">
                                                <label class="form-label me-1">Folders</label>
                                                <ul class="folder-list" id="widgetFolder" style="padding: 0">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-10">
                                    <div class="card-box">
                                        <div class="row">
                                            <div class="col-lg-10 col-xl-10">
                                                <h4 class="header-title m-b-30">Mes documents</h4>
                                                <!-- <small id="paths">ittone/2023>Tous</small> -->
                                                <nav aria-label="breadcrumb">
                                                    <ol class="breadcrumb">

                                                    </ol>
                                                </nav>
                                            </div>
                                            <div class="col-2 m-b-30">
                                                <input type="search" class="form-control form-control-sm"
                                                    placeholder="Rechercher" id="search">
                                            </div>
                                        </div>
                                        <div class="row" id="fileManager">

                                        </div>
                                        <div class="text-center mt-3">
                                            <!-- <button type="button"
                                                class="btn btn-outline-danger w-md waves-effect waves-light"
                                                id="loadFiles">
                                                <i class="mdi mdi-refresh"></i>
                                                Load More Files
                                            </button> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Dossier">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Dossier</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formDossier" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomDossier" name="nomDossier"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Dossier
                                                </div>
                                                <label class="form-label" for="nomDossier">Nom Dossier</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="button"
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered uploadFiles">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Upload Files</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="wrapper">
                                    <header>File Uploader</header>
                                    <label class="formFile" for="fileUpload">
                                        <input class="file-input" type="file" id="fileUpload" hidden>
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Browse File to Upload</p>
                                    </label>
                                </div>
                            </div>
                            <div class="col-6">
                                <section class="progress-area"></section>
                                <section class="uploaded-area"></section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        <script src="js/doc.js"></script>
        <script src="js/ModeleDocuments/custom.js"></script>
        <script type="module" src="js/ModeleDocuments/core.js"></script>
    </body>

    </html>