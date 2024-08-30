<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleCotisation.aspx.cs" Inherits="ModelePaie_ModeleCotisation"
    %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modèle Cotisation / Rubrique</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
    </head>

    <body class="bgModel modeleCotisation">
        <div id="menuLocal">
            <div class="menuBodyClose d-none"></div>
            <span class="btn btnMenu text-white" style="background-color: #3b5998;" href="#" role="button">
                <i class="fa-solid fa-caret-right"></i>
            </span>
            <div id="lgMenu">
                <a class="ripple d-flex justify-content-center py-4" href="/" data-mdb-ripple-color="primary">
                    <img src="http://localhost:50242/image/app/logo.png" style="width: 140px;">
                </a>
                <div id="dpl-sidenav-top" class="w-100 text-center"></div>
                <ul class="sidenav-menu" style="padding-bottom: 300px;">
                    <li class="sidenav-item">
                        <a class="sidenav-link collapsed ripple-surface-primary" data-mdb-toggle="collapse"
                            href="#sidenav-collapse-1-0-0" role="button" aria-expanded="false" tabindex="1">
                            <div style="width: 33.5px;"><i class="fas fa-download fa-fw me-3"></i></div>
                            <span>
                                INFOS DE PAIE
                            </span>
                            <i class="fas fa-angle-down rotate-icon" style="transition-property: transform;"></i>
                        </a>
                        <ul class="sidenav-collapse collapse" id="sidenav-collapse-1-0-0"
                            style="transition-property: height;">
                            <li class="sidenav-item">
                                <a class="sidenav-link ripple-surface" href="/docs/standard/" tabindex="1">Niveau</a>

                            </li>
                            <li class="sidenav-item">
                                <a class="sidenav-link ripple-surface"
                                    href="/docs/standard/getting-started/material-minimal/" tabindex="1">Département
                                </a>
                            </li>
                            <li class="sidenav-item">
                                <a class="sidenav-link ripple-surface"
                                    href="/docs/standard/getting-started/material-minimal/" tabindex="1">Fonction</a>
                            </li>
                            <li class="sidenav-item">
                                <a class="sidenav-link ripple-surface"
                                    href="/docs/standard/getting-started/material-minimal/" tabindex="1">Catégorie</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidenav-item">
                        <a class="sidenav-link collapsed ripple-surface" data-mdb-toggle="collapse"
                            href="#sidenav-collapse-1-0-1" role="button" aria-expanded="false" tabindex="1">
                            <div style="width: 33.5px;  "><i class="fas fa-gem fa-fw me-3"></i></div>
                            <span>
                                MDB Pro
                            </span>
                            <i class="fas fa-angle-down rotate-icon" style="transition-property: transform;"></i>
                        </a>
                        <ul class="sidenav-collapse collapse" id="sidenav-collapse-1-0-1"
                            style="transition-property: height;">

                        </ul>
                    </li>
                    <li class="sidenav-item">
                        <a class="sidenav-link collapsed ripple-surface" data-mdb-toggle="collapse"
                            href="#sidenav-collapse-1-0-2" role="button" aria-expanded="false" tabindex="1">
                            <div style="width: 33.5px;  "><i class="fas fa-database fa-fw me-3"></i></div>
                            <span>
                                CLI &amp; free hosting
                            </span>
                            <i class="fas fa-angle-down rotate-icon" style="transition-property: transform;"></i>
                        </a>
                        <ul class="sidenav-collapse collapse" id="sidenav-collapse-1-0-2"
                            style="transition-property: height;">

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container-fluid h-100 content">
            <header>
                <div class="row top-header text-white">
                    <div class="col-2 col-md-2">
                        <span class="p-2 ms-1 fs-5 lin-h" id="homeMenu"><i class="fa-solid fa-house"></i></span>
                        <span class="text-white-opacity fs-6 hide-on-mobile" id="nomUser">...</span>
                    </div>
                    <div class="col-6 col-md-7 menu-selector">
                        <ul class="nav h-100 user-select-none" id="menu-header" role="menu">
                            <!-- <li class="nav-item px-2 d-flex d-none align-items-center" title="Variables"
                                data-model="Paie_Variable">
                                <span>Variables</span>
                            </li> -->
                            <li class="nav-item px-2 d-flex d-none align-items-center" title="Cotisations"
                                data-model="Paie_Cotisation">
                                <span>Cotisations</span>
                            </li>
                            <!-- <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Tranches"
                                data-model="Paie_Tranche">
                                <span>Tranches</span>
                            </li> -->
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Rubriques"
                                data-model="Paie_Rubrique">
                                <span>Rubriques</span>
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
                    <div class="col-4">
                        <h2 id="breadcrumb">...</h2>
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
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow"
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
                <div class="modal-dialog modal-lg modal-dialog-centered Variable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Variable</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formVariable" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="codeVar" name="codeVar" class="form-control"
                                                    required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Code Variable est obligatoire
                                                </div>
                                                <label class="form-label" for="codeVar">Code</label>
                                            </div>
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="libelleVar" name="libelleVar"
                                                    class="form-control" />
                                                <label class="form-label" for="libelleVar">Libellé</label>
                                            </div>
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="valeurVar" name="valeurVar"
                                                    class="form-control" />
                                                <label class="form-label" for="valeurVar">Valeur</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <label class="form-check-label" for="propreSal">Propre Salaire</label>
                                                <input class="form-check-input" type="checkbox" id="propreSal"
                                                    required />
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
                <div class="modal-dialog modal-lg modal-dialog-centered Cotisation">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Cotisation</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formCotisation" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="border-bottom border-dark p-1">
                                                <h6>Partie 1</h6>
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="codeCotis" name="codeCotis"
                                                        class="form-control" required />
                                                    <div class="invalid-feedback sty-feedback">
                                                        Code Cotisation est obligatoire
                                                    </div>
                                                    <label class="form-label" for="codeCotis">Code</label>
                                                </div>
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="libelleCotis" name="libelleCotis"
                                                        class="form-control" />
                                                    <label class="form-label" for="libelleCotis">Libellé</label>
                                                </div>
                                            </div>
                                            <div class="border-bottom border-dark p-1">
                                                <div class="row">
                                                    <h6>Partie 2</h6>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="partSalariel" name="partSalariel"
                                                                class="form-control" />
                                                            <label class="form-label" for="partSalariel">Part Salariale
                                                                %</label>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="prestationSoc" name="prestationSoc"
                                                                class="form-control" />
                                                            <label class="form-label" for="prestationSoc">Prestation
                                                                Sociale
                                                                %</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="allFamilial" name="allFamilial"
                                                                class="form-control" />
                                                            <label class="form-label" for="allFamilial">All
                                                                Familiale %</label>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="formationProf" name="formationProf"
                                                                class="form-control" />
                                                            <label class="form-label" for="formationProf">Formation
                                                                Professionnelle %</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="plafond" name="plafond"
                                                                class="form-control" />
                                                            <label class="form-label" for="plafond">Plafond %</label>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="cotisationPatr" name="cotisationPatr"
                                                                class="form-control" />
                                                            <label class="form-label" for="cotisationPatr">Cotisation
                                                                Patronale
                                                                %</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 class="mt-1">Partie 3</h6>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="tauxPenalite" name="tauxPenalite"
                                                    class="form-control" />
                                                <label class="form-label" for="tauxPenalite">Taux Pénalité %</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="tauxMajoration1" name="tauxMajoration1"
                                                    class="form-control" />
                                                <label class="form-label" for="tauxMajoration1">Taux Majoration 1 Mois
                                                    %</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="tauxMajorationAutres" name="tauxMajorationAutres"
                                                    class="form-control" />
                                                <label class="form-label" for="tauxMajorationAutres">Taux Majoration
                                                    Autres Mois %</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Tranche">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Tranches</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formTranches" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomFonction" name="nomFonction"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Fonction est obligatoire
                                                </div>
                                                <label class="form-label" for="nomFonction">Nom</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Rubrique">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Rubrique</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formRubriques" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="border-bottom border-dark p-1">
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="codeRubrique" name="codeRubrique"
                                                        class="form-control" required />
                                                    <div class="invalid-feedback sty-feedback">
                                                        Code Rubrique est obligatoire
                                                    </div>
                                                    <label class="form-label" for="codeRubrique">Code</label>
                                                </div>
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="libelleRubrique" name="libelleRubrique"
                                                        class="form-control" />
                                                    <label class="form-label" for="libelleRubrique">Libellé</label>
                                                </div>
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="codeExo" name="codeExo"
                                                        class="form-control" />
                                                    <label class="form-label" for="codeExo">Code Exo</label>
                                                </div>
                                            </div>
                                            <div class="p-1">
                                                <h6>Rubrique 1</h6>
                                                <div class="col-6">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="form-check col-2 mb-3">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="imposable" />
                                                                <label class="form-check-label"
                                                                    for="imposable">Imposable</label>
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="form-check col-2 mb-3">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="positive" />
                                                                <label class="form-check-label"
                                                                    for="positive">Positive</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="form-outline mb-3 mt-4">
                                                                <input type="text" id="valeur" name="valeur"
                                                                    class="form-control" />
                                                                <label class="form-label" for="valeur">Valeur</label>
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="form-outline mb-3 mt-4">
                                                                <input type="text" id="taux" name="taux"
                                                                    class="form-control" />
                                                                <label class="form-label" for="taux">Taux</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="tauxPenalite" name="tauxPenalite"
                                                            class="form-control" />
                                                        <label class="form-label" for="tauxPenalite">Taux
                                                            Pénalité</label>
                                                    </div>
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="tauxMajoration1" name="tauxMajoration1"
                                                            class="form-control" />
                                                        <label class="form-label" for="tauxMajoration1">Taux Majoration
                                                            1
                                                            Mois</label>
                                                    </div>
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="tauxMajorationAutres"
                                                            name="tauxMajorationAutres" class="form-control" />
                                                        <label class="form-label" for="tauxMajorationAutres">Taux
                                                            Majoration
                                                            Autres Mois</label>
                                                    </div>
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
        </div>

        <style>
            #menuLocal .sidenav-collapse,
            #menuLocal .sidenav-menu {
                list-style: none;
                position: relative;
                padding: 0 var(--mdb-sidenav-menu-padding);
                margin: 0;
            }

            #menuLocal .sidenav-link:hover {
                color: inherit;
                background-color: rgba(59, 113, 202, .05);
                outline: none;
            }

            #menuLocal .sidenav-item {
                margin-left: 5px;
                margin-right: 5px;
                margin-top: 4px;
            }

            #menuLocal .sidenav-link {
                color: #ffffff;
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            #menuLocal .sidenav-link .rotate-icon {
                position: absolute;
                right: 0;
                margin-left: auto;
                margin-right: 10px;

            }

            #menuLocal .sidenav-collapse .sidenav-link {
                padding-left: 2.4rem;
            }

            #menuLocal .menuBodyClose {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                left: 240px;
            }

            #menuLocal {
                position: fixed;
                top: 50%;
                left: 0;
                z-index: 900000;
                -moz-transition: all 300ms;
                -webkit-transition: all 300ms;
                transition: all 300ms;
            }

            #menuLocal .btnMenu {
                background-color: rgb(59, 89, 152);
                padding: 1.075rem 0.2rem;
            }

            .content.menu-active {
                width: calc(100% - 200px);
                position: absolute;
                left: 200px;
                transition: transform 1s;
            }

            #lgMenu {
                background-image: url('http://localhost:50242/image/app/TEST%20BACKGROUND.png');
                background-color: rgba(0, 0, 0, 60%);
                position: fixed;
                top: 0;
                left: -200px;
                bottom: 0;
                width: 200px;
                height: 100%;
                -moz-transition: all 300ms;
                -webkit-transition: all 300ms;
                transition: all 300ms;
                box-sizing: border-box;
                -moz-box-shadow: -3px 0 6px #4a5562;
                -webkit-box-shadow: -3px 0 6px #4a5562;
                box-shadow: -3px 0 6px #4a5562;
                -moz-transition: all 300ms;
                -webkit-transition: all 300ms;
                border-bottom-right-radius: 40px;
            }

            #lgMenu.enter {
                left: 0;
            }
        </style>

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
        <script src="js/ModeleCotisation/custom.js"></script>
        <script type="module" src="js/ModeleCotisation/core.js"></script>
        <script>
            $(document).ready(function () {
                $("#menuLocal .btnMenu,.menuBodyClose").on("click", function () {
                    if ($('#menuLocal .btnMenu').hasClass('show')) {
                        $("#lgMenu").removeClass("enter");
                        $("#menuLocal").css("left", "0");
                        $("div.content").removeClass("menu-active");
                        $('.menuBodyClose').addClass('d-none');

                    } else {
                        $('.menuBodyClose').removeClass('d-none');
                        $("#menuLocal").css("left", "200px");
                        $("#lgMenu").addClass("enter");
                        $("div.content").addClass("menu-active");
                    }
                    $('#menuLocal .btnMenu').toggleClass('show');
                    $('#menuLocal .btnMenu i').toggleClass('fa-caret-right');
                    $('#menuLocal .btnMenu i').toggleClass('fa-caret-left');
                });
            });
        </script>
    </body>

    </html>