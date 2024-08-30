<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModelePointage.aspx.cs" Inherits="ModelePaie_ModelePointage" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modèle Pointage</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
    </head>

    <body class="bgModel modelePaie">
        <div class="container-fluid h-100">
            <header>
                <div class="row top-header text-white">
                    <div class="col-2 col-md-2">
                        <span class="p-2 ms-1 fs-5 lin-h" id="homeMenu"><i class="fa-solid fa-house"></i></span>
                        <span class="text-white-opacity fs-6 hide-on-mobile" id="nomUser">...</span>
                    </div>
                    <div class="col-6 col-md-7 menu-selector">
                        <ul class="nav h-100 user-select-none" id="menu-header" role="menu">
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Devices"
                                data-model="Paie_Device">
                                <span>Devices</span>
                            </li>
                            <li class="nav-item px-2 d-flex d-none align-items-center" title="Planification"
                                data-model="Paie_Planification">
                                <span>Planification</span>
                            </li>
                            <li class="nav-item px-2 d-flex d-none align-items-center"
                                title="Pointage par Planification" data-model="Paie_Pointage_Planification">
                                <span>Pointage par planification</span>
                            </li>
                            <li class="nav-item px-2 d-flex d-none align-items-center" title="Pointage par Machine"
                                data-model="Paie_Pointage_Machine">
                                <span>Pointage par machine</span>
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
            <section class="screen-afficher screen mt-3">
                <div class="row">
                    <div class="col-3">
                        <h2 id="breadcrumb">...</h2>
                    </div>
                    <div class="col-5 CalendarDiv" style="width: 30% !important;">
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
                    <div class="col-2 filtrageEmpDiv">
                        <select class="form-select" name="filtrageEmp" id="filtrageEmp">
                            <option value="presences">Les présences</option>
                            <option value="absents">Les absents</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create"
                            role="insert">Créer</button>
                        <button type="button" class="btn btn-light btn-rounded" id="import" role="insert">
                            Import</button>
                        <!-- <button type="button" class="btn btn-light btn-rounded">Imprimer</button>
                <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow"
                            role="delete" title="Supprimmer">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deletePointage"
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
                        </button>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Devices">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Device</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formDevice" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nameDevice" name="nameDevice"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Device est obligatoire
                                                </div>
                                                <label class="form-label" for="nameDevice">Name Device</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="ipDevice" name="ipDevice" class="form-control" />
                                                <label class="form-label" for="ipDevice">IP Device</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="portDevice" name="portDevice"
                                                    class="form-control" value="4370" />
                                                <label class="form-label" for="portDevice">Port Device</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="machingNumber" name="machingNumber"
                                                    class="form-control" value="1" />
                                                <label class="form-label" for="machingNumber">Maching Number</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3 mt-3">
                                        <div class="col-4 d-flex flex-column">
                                            <button type="button" class="btn btn-light btn-rounded bg-primary-grey"
                                                role="insert" id="testConnect" title="Test Connect">Test
                                                Connect</button>
                                        </div>
                                        <div class="col-4 d-flex flex-column">
                                            <button type="button" class="btn btn-light btn-rounded bg-primary-grey"
                                                role="insert" id="getUsers" title="Get Users Device">Get Users
                                                Device</button>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                    role="insert">Nouveau</button>
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="submit"
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered importLogData">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Log Data</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formLogData" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="idDevice" class="form-label">Device</label>
                                        <select class="form-select" name="idDevice" id="idDevice">
                                        </select>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="submit"
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Import</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Planning">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Plannification</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formPlanning" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomPlanning" name="nomPlanning"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Planification est obligatoire
                                                </div>
                                                <label class="form-label" for="nomPlanning">Nom Planification</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="ui calendar inputTime mb-3" id="heureDepartDe">
                                                <label class="form-label">Heure de départ de</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="time icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="ui calendar inputTime mb-3" id="heureDepartA">
                                                <label class="form-label">Heure de départ à</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="time icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-4">
                                            <div class="form-check mb-3">
                                                <label class="form-check-label" for="checkPause">Pause</label>
                                                <input class="form-check-input" type="checkbox" id="checkPause" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row pauseDiv d-none">
                                        <div class="col-6">
                                            <div class="ui calendar inputTime mb-3" id="heurePauseDe">
                                                <label class="form-label">Heure de pause de</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="time icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="ui calendar inputTime mb-3" id="heurePauseA">
                                                <label class="form-label">Heure de pause à</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="time icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="ui calendar inputTime mb-3" id="heureSortie">
                                                <label class="form-label">Heure de sortie</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="time icon"></i>
                                                    <input type="text">
                                                </div>
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
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered pointage">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Pointage</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formPointage" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="mb-3">
                                            <label for="checkEmploye" class="form-label me-3">Tout les employés</label>
                                            <input class="form-check-input" type="checkbox" id="checkEmploye" />
                                        </div>
                                        <div>
                                            <select class="form-select" name="enrolNumber" id="idEmploye" multiple>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="ui calendar inputDate mb-3" id="dateTimeRecord">
                                                <label class="form-label">Date Record</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="ui calendar inputTime mb-3" id="timeRecord">
                                                <label class="form-label">Time Record</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
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
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered supressionPointage">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Supprimer Pointage</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formSupression" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row d-flex align-items-center">
                                        <div class="col-6 mb-3">
                                            <label for="idPointage" class="form-label">Heure</label>
                                            <select class="form-select" name="idPointage" id="idPointage">
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <button class="btn r btn-rounded mx-2" id="supressionHeure">Supprimer</button>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/jquery-ui.js"></script>
        <script src="../js/loadingoverlay.min.js"></script>
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
        <script src="js/ModelePointage/custom.js"></script>
        <script type="module" src="js/ModelePointage/core.js"></script>
    </body>

    </html>