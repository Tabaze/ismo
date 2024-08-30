<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleEmails.aspx.cs" Inherits="ModeleEmails" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Boite des e-mails</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
    </head>

    <body class="bgModel">
    <section class="section d-none" id="loading"><span class="loader-20"> </span></section>
        <div class="container-fluid h-100">
            <header>
                <div class="row top-header text-white">
                    <div class="col-2 col-md-2">
                        <span class="p-2 ms-1 fs-5 lin-h" id="homeMenu"><i class="fa-solid fa-house"></i></span>
                        <span class="text-white-opacity fs-6 hide-on-mobile" id="nomUser">...</span>
                    </div>
                    <div class="col-6 col-md-7 menu-selector">
                        <ul class="nav h-100 user-select-none" id="menu-header" role="menu">
                            <li class="nav-item px-2 d-flex d-none align-items-center" title="E-mails Envoyés"
                                data-model="Sent">
                                <span>E-mails Envoyés</span>
                            </li>
                            <!-- <li class="nav-item px-2 d-flex d-none align-items-center" title="E-mails Reçus"
                                data-model="Inbox">
                                <span>E-mails Reçus</span>
                            </li>
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="E-mails Spam"
                                data-model="Spam">
                                <span>E-mails Spam</span>
                            </li>
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="E-mails Archivés"
                                data-model="Archives">
                                <span>E-mails Archivés</span>
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
            <section class="screen-afficher screen mt-3">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">...</h2>
                    </div>
                    <div class="col-8">
                        <div class="form-outline mb-3 mt-4">
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
                                id="filterDate">
                                <i class="fa-solid fa-filter"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create"
                            role="insert">Créer</button>
                        <!-- <button type="button" class="btn btn-light btn-rounded">Imprimer</button>
                    <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                    </div>
                    <div class="col-6 text-end">
                        <!-- <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow"
                            role="delete" title="Supprimmer">
                            <i class="fa-solid fa-trash-can"></i>
                        </button> 
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf"
                            title="Telecharger PDF">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel"
                            title="Telecharger Excel">
                            <i class="fa-solid fa-file-excel"></i>
                        </button>-->
                    </div>
                </div>
                <div class="row m-2  p-1 card">
                    <div class="col-12">
                        <div class="tableView">

                        </div>
                    </div>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Sent">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Envoyer un e-mail</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formSent" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <!-- <div class="mb-3">
                                                <label for="idTier" class="form-label">Tier</label>
                                                <select class="form-select" name="idTier" id="idTier" multiple>
                                                </select>
                                            </div> -->
                                            <div class="mb-3">
                                                <label for="to" class="form-label">E-mails</label>
                                                <select class="form-select" name="to" id="to" multiple>
                                                </select>
                                            </div>
                                            <!-- <div class="form-outline mb-3">
                                                <input type="text" id="numEmail" name="numEmail" class="form-control"/>
                                                <label class="form-label" for="numEmail">N° E-mail</label>          
                                            </div>  -->
                                            <div class="mb-3">
                                                <div class="ui calendar inputDate mb-3" id="dateEmail">
                                                    <label class="form-label">Date E-mail</label>
                                                    <div class="ui input left icon w-100">
                                                        <i class="calendar icon"></i>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="subject" name="subject" class="form-control" />
                                                <label class="form-label" for="subject">Objet</label>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label ms-2 btn btn-light btn-rounded bg-primary-grey" for="files">Joindre des
                                                    fichiers</label>
                                                    <input type="file" name="" id="files" class="d-none">
                                            </div>
                                            <!-- <div class="form-outline mb-3">
                                                <textarea class="form-control" name="message" id="message"
                                                    rows="3"></textarea>
                                                <label for="message" class="form-label">Contenu</label>
                                            </div>  -->
                                            <div class="o_td_label">
                                                <textarea cols="70" name="editor" rows="50"
                                                    placeholder="Contenu"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                    role="insert">Nouveau</button>
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="submit"
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="./js/jquery-3.6.0.min.js"></script>
        <script src="./vendors/ckeditor/ckeditor.js"></script>
        <script src="./js/editeur2.js"></script>
        <script src="./js/jquery-ui.js"></script>
        <script src="./js/moment.js"></script>
        <script src="./js/currency.min.js"></script>
        <script src="./vendors/calendar/semantic.min.js"></script>
        <script src="./vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
        <script src="./vendors/MDB5/js/mdb.min.js"></script>
        <script src="./vendors/DataTables/datatables.min.js"></script>
        <script src="./vendors/DataTables/DataTables-1.12.1/js/dataTables.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Responsive-2.3.0/js/responsive.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Select-1.4.0/js/select.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Scroller-2.0.7/js/scroller.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/SearchBuilder-1.3.4/js/searchBuilder.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Buttons-2.2.3/js/buttons.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/DateTime-1.1.2/js/dataTables.dateTime.min.js"></script>
        <script src="./vendors/DataTables/datetime-moment.js"></script>
        <script src="./vendors/sweetalert2/sweetalert2.all.min.js"></script>
        <script src="./vendors/select2/select2.min.js"></script>
        <script src="./vendors/calendar/calendar.min.js"></script>
        <script src="./vendors/xlsx/xlsx.full.min.js"></script>
        <script src="./js/pdf.js"></script>
        <script src="./js/xlsx.js"></script>
        <script src="./js/menu.js"></script>
        <script src="./js/i18n.js"></script>
        <script src="./js/ittone.js"></script>
        <script src="./js/notification.js"></script>
        <script src="./js/roles.js"></script>
        <script src="./js/ModeleEmails/custom.js"></script>
        <script type="module" src="./js/ModeleEmails/core.js"></script>
    </body>

    </html>