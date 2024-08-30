<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleCalcul.aspx.cs" Inherits="ModelePaie_ModeleCalcul" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modèle Calcul</title>
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
                            <li class="nav-item px-5 d-flex align-items-center" title="Avance" data-model="Paie_Avance">
                                <span>Avance</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Bulletin de paie"
                                data-model="Paie_Bulletin">
                                <span>Bulletin de paie</span>
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
                    <div class="col-4 d-flex flex-row justify-content-between align-items-stretch">
                        <h2 id="breadcrumb">...</h2>
                    </div>
                    <div class="col-8">
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
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create"
                            role="insert">Créer</button>
                        <button type="button" class="btn btn-light btn-rounded" role="insert"
                            id="import">Importer</button>
                        <!--  <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow"
                            role="delete" title="Suprimmer">
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
            <section class="screen-create d-none screen mt-3 bulletinPaie">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">Bulletin de paie</h2>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <button type="submit" form="formBulletin"
                            class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                        <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                            role="insert">Nouveau</button>
                        <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-5">
                        <div class="card px-2">
                            <div class="card-header">
                                <h4 class="card-title d-inline-block">Bulettin De Paie # <span
                                        id="numeroPaie">...</span></h4>
                                <div class="heading-elements float-end">
                                    <ul class="list-inline mb-0">
                                        <li>
                                            <a data-action="collapse" class="rotate">
                                                <i class="fas fa-chevron-up"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-content collapse show">
                                <form class="needs-validation" id="formBulletin" novalidate autocomplete="off">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="numPaie" name="numPaie"
                                                    class="form-control form-control-lg" required />
                                                <label class="form-label" for="numPaie">Numéro</label>
                                            </div>
                                            <div class="ui calendar inputDate mb-3" id="datePaie">
                                                <label class="form-label">Date</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <textarea class="form-control" name="descPaie" id="descPaie"
                                                    rows="3"></textarea>
                                                <label for="descPaie" class="form-label">Description</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label for="mois" class="form-label">Mois</label>
                                                <select class="form-select" name="mois" id="mois">
                                                    <option value=""></option>
                                                    <option value="1">Janvier</option>
                                                    <option value="2">Février</option>
                                                    <option value="3">Mars</option>
                                                    <option value="4">Avril</option>
                                                    <option value="5">Mai</option>
                                                    <option value="6">Juin</option>
                                                    <option value="7">Juillet</option>
                                                    <option value="8">Août</option>
                                                    <option value="9">Septembre</option>
                                                    <option value="10">Octobre</option>
                                                    <option value="11">Novembre</option>
                                                    <option value="12">Décembre</option>
                                                </select>
                                            </div>
                                            <div class="ui calendar inputDate mb-3" id="periodeD">
                                                <label class="form-label">Période de</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                            <div class="ui calendar inputDate mb-3" id="periodeF">
                                                <label class="form-label">Période à</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card card-infos px-2 mt-2 h-75">
                            <div class="row">
                                <div class="col-12">
                                    <div class="row d-flex align-items-start mt-4">
                                        <div class="col-6 mb-3">
                                            <label for="checkEmploye" class="form-label">Tout les employés</label>
                                            <input class="form-check-input" type="checkbox" id="checkEmploye" />
                                        </div>
                                        <div class="col d-flex align-items-center justify-content-end">
                                            <span class="btn btn-secondary btn-input" style="padding: 6px 12px;"
                                                id="ajouterEmploye"><i
                                                    class="fa-sharp fa-solid fa-arrow-right"></i></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="tableEmployes">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="card px-2 h-100">
                            <div class="row" id="formLine" style="z-index: 1000;">
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="trav" class="form-control form-control-lg" />
                                        <label class="form-label" for="trav">Jours Travail</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="hs0" class="form-control form-control-lg" />
                                        <label class="form-label" for="hs0">Hs0</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="hs25" class="form-control form-control-lg" />
                                        <label class="form-label" for="hs25">Hs25</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="hs50" class="form-control form-control-lg" />
                                        <label class="form-label" for="hs50">Hs50</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="hs100" class="form-control form-control-lg" />
                                        <label class="form-label" for="hs100">Hs100</label>
                                    </div>
                                </div>
                                <div class="col d-flex align-items-center justify-content-around">
                                    <span class="btn btn-secondary btn-input" style="padding: 6px 12px;"
                                        id="ajouterLign"><i class="fa fa-lg fas fa-level-down-alt"></i></span>
                                    <span class="btn btn-secondary btn-input" style="padding: 6px 12px;"
                                        id="annulerLign"><i class="fa fa-lg fas fa-times"></i></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="tableBulletinEmployes">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Avance">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Avance</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formAvance" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-10 mb-3">
                                            <label for="idEmploye" class="form-label">Employé</label>
                                            <select class="form-select idEmploye" name="idEmploye">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3 m-1">
                                        <div class="col-10 form-outline">
                                            <input type="text" id="matricule" name="matricule" class="form-control"
                                                disabled />
                                            <label class="form-label" for="matricule">matricule</label>
                                        </div>
                                    </div>
                                    <div class="row mb-3 m-1">
                                        <div class="col-10 form-outline">
                                            <input type="text" id="montant" name="montant" class="form-control" />
                                            <label class="form-label" for="montant">Montant</label>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-10 ui calendar inputDate mb-3" id="dateAvance">
                                            <label class="form-label">Date d'avance</label>
                                            <div class="ui input left icon w-100">
                                                <i class="calendar icon"></i>
                                                <input type="text">
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
                <div class="modal-dialog modal-lg modal-dialog-centered LierRubrique">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Lier Rubrique</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formRubrique" novalidate autocomplete="off">
                            <div class="row d-flex align-items-center p-3">
                                <div class="col-9">
                                    <div class="mb-3">
                                        <label for="idRubrique" class="form-label">Rubriques</label>
                                        <select class="form-select idRubrique">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3 mt-2">
                                    <button type="button"
                                        class="fs-6 btn btn-outline-ittone btn-floating" id="addRubrique"
                                        title="Ajouter Rubrique">
                                        <i class="fa-solid fa-circle-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="row m-2  p-1 card">
                                <div class="col-12">
                                    <div class="tableViewRubriques">

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                            </div>
                        </form>
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
        <script src="js/ModeleCalcul/custom.js"></script>
        <script type="module" src="js/ModeleCalcul/core.js"></script>
    </body>

    </html>