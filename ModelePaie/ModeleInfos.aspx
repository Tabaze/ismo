<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleInfos.aspx.cs" Inherits="ModelePaie_ModeleInfos" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modèle Infos</title>
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
                            <li class="nav-item px-2 d-flex d-none align-items-center" title="Niveau"
                                data-model="Paie_Niveau">
                                <span>Niveau</span>
                            </li>
                            <li class="nav-item px-2 d-flex d-none align-items-center" title="Département"
                                data-model="Paie_Departement">
                                <span>Département</span>
                            </li>
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Fonction"
                                data-model="Paie_Fonction">
                                <span>
                                    Fonction
                                </span>
                            </li>
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Catégorie"
                                data-model="Paie_Categorie">
                                <span>
                                    Catégorie
                                </span>
                            </li>
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center"
                                title="Taux Frais Professionnel" data-model="Paie_Taux">
                                <span>
                                    Taux Frais Professionnel
                                </span>
                            </li>
                            <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Profil Contrat"
                                data-model="Paie_Contrat">
                                <span>Profil Contrat</span>
                            </li>
                            <!-- <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Devices"
                                data-model="Paie_Device">
                                <span>Devices</span>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Niveau">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Niveau</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formNiveau" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomNiveau" name="nomNiveau" class="form-control"
                                                    required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Niveau est obligatoire
                                                </div>
                                                <label class="form-label" for="nomNiveau">Nom</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Departement">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Département</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formDepartement" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomDepartement" name="nomDepartement"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Département est obligatoire
                                                </div>
                                                <label class="form-label" for="nomDepartement">Nom</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Fonction">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Fonction</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formFonction" novalidate autocomplete="off">
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
                <div class="modal-dialog modal-lg modal-dialog-centered Categorie">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Catégorie</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formCategorie" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomCategorie" name="nomCategorie"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Catégorie est obligatoire
                                                </div>
                                                <label class="form-label" for="nomCategorie">Nom</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Taux">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Taux Frais Professionnel</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formTaux" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="codeTaux" name="codeTaux" class="form-control"
                                                    required />
                                                <label class="form-label" for="codeTaux">Code</label>
                                            </div>
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="libelleTaux" name="libelleTaux"
                                                    class="form-control" />
                                                <label class="form-label" for="libelleTaux">Libellé</label>
                                            </div>
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="taux" name="taux" class="form-control"
                                                    required />
                                                <label class="form-label" for="taux">Taux</label>
                                            </div>
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="plafond" name="plafond" class="form-control" />
                                                <label class="form-label" for="plafond">Plafond</label>
                                            </div>
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="refTaux" name="refTaux" class="form-control" />
                                                <label class="form-label" for="refTaux">Référence</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Contrat">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Profil Contrat</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formContrat" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomProfil" name="nomProfil" class="form-control"
                                                    required />
                                                <label class="form-label" for="nomProfil">Nom</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <label class="form-check-label" for="partSalariel">Part Salariel</label>
                                                <input class="form-check-input" type="checkbox" id="partSalariel" />
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="allFamiliel" />
                                                <label class="form-check-label" for="allFamiliel">All Familiale</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <label class="form-check-label" for="formationProf">Formation
                                                    Professionnelle</label>
                                                <input class="form-check-input" type="checkbox" id="formationProf" />
                                            </div>
                                            <div class="form-check mb-3">
                                                <label class="form-check-label" for="cotisationPatr">Cotisation
                                                    Patronale</label>
                                                <input class="form-check-input" type="checkbox" id="cotisationPatr" />
                                            </div>
                                            <div class="col-12">
                                                <div class="form-check d-inline-block col-1 mb-3">
                                                    <label class="form-check-label" for="iR">IR</label>
                                                    <input class="form-check-input" type="checkbox" id="iR" />
                                                </div>
                                                <div class="form-outline d-inline-block col-5 mb-3 d-none">
                                                    <input type="text" id="plafondIR" name="plafondIR"
                                                        class="form-control" />
                                                    <label class="form-label" for="plafondIR">Plafond IR</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="typeProfil" class="form-label">Type Profil</label>
                                                <select class="form-select" name="typeProfil" id="typeProfil">
                                                    <option value="stagiaire">Stagiaire</option>
                                                    <option value="temporaire">Temporaire</option>
                                                    <option value="permanent">Permanent</option>
                                                    <option value="exonéré">Exonéré</option>
                                                </select>
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
        <script src="js/ModeleInfos/custom.js"></script>
        <script type="module" src="js/ModeleInfos/core.js"></script>
    </body>

    </html>