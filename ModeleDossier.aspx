<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleDossier.aspx.cs" Inherits="ModeleDossier" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dossier</title>
        <link type="image/x-icon" rel="shortcut icon" href="image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="css/global.css" />
    </head>

    <body class="bg">
        <div class="container-fluid min-vh-100">
            <div class="row">
                <div class="col-12 d-flex flex-row-reverse p-5">
                    <div class="dropdown btnDrobDownUser d-flex align-items-center" id="dropdownMenuButton2"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="px-3 pt-1 fs-3"><i class="fa-solid fa-circle-user"></i></span>
                        <div class="dropdown-toggle d-inline-block px-3 fs-6">
                            <span id="nomUser">...</span>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownMenuButton2">
                            <li><a class="dropdown-item" id="btnGestionUser">Gestion utilisateur</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" id="deconnecter">Déconnecter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="d-flex align-items-end justify-content-center" style="position: fixed;bottom: 30%;">
                    <div class="h-50 w-75 w-sm-75 w-md-75 w-lg-50 text-center">
                        <div class="d-flex justify-content-center text-center flex-row mb-3">
                            <div class="row" id="listDossier">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered dossier">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Dossier</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <ul class="nav nav-tabs" id="dossierTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="Generale-tab" data-bs-toggle="tab"
                                            data-bs-target="#Generale-tab-pane" type="button" role="tab"
                                            aria-controls="Generale-tab-pane" aria-selected="true">Générale
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="Exercice-tab" data-bs-toggle="tab"
                                            data-bs-target="#Exercice-tab-pane" type="button" role="tab"
                                            aria-controls="Exercice-tab-pane" aria-selected="false"
                                            disabled>Exercice</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="Mise-page-tab" data-bs-toggle="tab"
                                            data-bs-target="#Mise-page-tab-pane" type="button" role="tab"
                                            aria-controls="Mise-page-tab-pane" aria-selected="false" disabled>Mise en
                                            page
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="Woocommerce-tab" data-bs-toggle="tab"
                                            data-bs-target="#Woocommerce-tab-pane" type="button" role="tab"
                                            aria-controls="Woocommerce-tab-pane" aria-selected="false"
                                            disabled>Woocommerce</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="Generale-tab-pane" role="tabpanel"
                                        aria-labelledby="Generale-tab" tabindex="0">
                                        <form class="needs-validation" id="formGenerale" novalidate autocomplete="off">
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="Nom_dossier" name="Nom_dossier"
                                                            class="form-control" required />
                                                        <div class="invalid-feedback sty-feedback">
                                                            Raison Sociale est obligatoire
                                                        </div>
                                                        <label class="form-label" for="Nom_dossier">Raison
                                                            Sociale</label>
                                                    </div>

                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Activite" name="Activite"
                                                            class="form-control" />
                                                        <label class="form-label" for="Activite">Activité</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Adresse" name="Adresse"
                                                            class="form-control" />
                                                        <label class="form-label" for="Adresse">Adresse</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Complement" name="Complement"
                                                            class="form-control" />
                                                        <label class="form-label" for="Complement">Complément</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Cp" name="Cp" class="form-control" />
                                                        <label class="form-label" for="Cp">Code Postal</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Ville" name="Ville"
                                                            class="form-control" />
                                                        <label class="form-label" for="Ville">Ville</label>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="Region" name="Region"
                                                            class="form-control" />
                                                        <label class="form-label" for="Region">Région</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Pays" name="Pays" class="form-control" />
                                                        <label class="form-label" for="Pays">Pays</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Tele" name="Tele" class="form-control" />
                                                        <label class="form-label" for="Tele">Téléphone</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Fix" name="Fix" class="form-control" />
                                                        <label class="form-label" for="Fix">Fax</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Email" name="Email"
                                                            class="form-control" />
                                                        <label class="form-label" for="Email">Email</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Sitee" name="Sitee"
                                                            class="form-control" />
                                                        <label class="form-label" for="Sitee">Site</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- -->
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Cnss" name="Cnss" class="form-control" />
                                                        <label class="form-label" for="Cnss">N C.N.S.S</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Patente" name="Patente"
                                                            class="form-control" />
                                                        <label class="form-label" for="Patente">N Patente</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Iff" name="Iff" class="form-control" />
                                                        <label class="form-label" for="Iff">N L.F.</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Rc" name="Rc" class="form-control" />
                                                        <label class="form-label" for="Rc">N R.C</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Ice" name="Ice" class="form-control" />
                                                        <label class="form-label" for="Ice">ICE</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Objectif" name="Objectif" class="form-control" />
                                                        <label class="form-label" for="Objectif">Objectif</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" class="d-none" id="btnGenerale"></button>
                                        </form>
                                    </div>
                                    <div class="tab-pane fade" id="Exercice-tab-pane" role="tabpanel"
                                        aria-labelledby="Exercice-tab" tabindex="1">
                                        <form class="needs-validation" id="formExercice" novalidate autocomplete="off">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-outline mb-3 mt-4">
                                                        <div class="ui calendar date_range dateStart" id="dateExeStart">
                                                            <div class="ui input left icon">
                                                                <i class="calendar icon"></i>
                                                                <input type="text" placeholder="Start">
                                                            </div>
                                                        </div>
                                                        <div class="ui calendar date_range dateEnd" id="dateExeEnd">
                                                            <div class="ui input left icon">
                                                                <i class="calendar icon"></i>
                                                                <input type="text" placeholder="End">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="tab-pane fade" id="Mise-page-tab-pane" href="#" role="tabpanel"
                                        aria-labelledby="Mise-page-tab" tabindex="2">
                                        <form class="needs-validation" id="formMisePage" novalidate autocomplete="off">
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-3 mt-4">
                                                        <label for="Style_dossier" class="form-label">Modèle</label>
                                                        <select class="form-select" name="Style_dossier"
                                                            id="Style_dossier">
                                                            <option selected>Modèle</option>
                                                            <option value="One">One</option>
                                                            <option value="Two">Two</option>
                                                            <option value="Three">Three</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <textarea class="form-control" name="Entet_dossier"
                                                            id="Entet_dossier" rows="3"></textarea>
                                                        <label for="Entet_dossier" class="form-label">Slogan de la
                                                            société</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <textarea class="form-control" name="Pied_dossier"
                                                            id="Pied_dossier" rows="3"></textarea>
                                                        <label for="Pied_dossier" class="form-label">Bas de page</label>
                                                    </div>
                                                </div>
                                                <div class="col-6 d-flex justify-content-center align-items-center">
                                                    <div class="circular_image"
                                                        style="background-image: url('/image/app/FOLDER-ITTONE.png');">
                                                        <div
                                                            class="inBackround d-flex justify-content-center align-items-center">
                                                            <input type='file' id="Logo" class="inputCircular_image"
                                                                accept=".png, .jpg, .jpeg" />
                                                            <label for="Logo"
                                                                class="labelCircular_image fs-1 text-white"><i
                                                                    class="fa-solid fa-upload"></i></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" class="d-none" id="btnMisePage"></button>
                                        </form>
                                    </div>
                                    <div class="tab-pane fade" id="Woocommerce-tab-pane" role="tabpanel"
                                        aria-labelledby="Woocommerce-tab" tabindex="3">
                                        <form class="needs-validation" id="formWoocommerce" novalidate
                                            autocomplete="off">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="url" id="domainName" name="domainName"
                                                            class="form-control" pattern="https?://.+" required />
                                                        <label class="form-label" for="domainName">Domain Name</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="wooClientKey" name="wooClientKey"
                                                            class="form-control" />
                                                        <label class="form-label"
                                                            for="wooClientKey">wooClientKey</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="wooClientSecret" name="wooClientSecret"
                                                            class="form-control" />
                                                        <label class="form-label"
                                                            for="wooClientSecret">wooClientSecret</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" class="d-none" id="btnWoocommerce"></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="button" class="btn btn-success btn-sauvegarder btn-rounded mx-2"
                                id="test">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered gestionUser">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Gestion utilisateur</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <ul class="nav nav-tabs" id="gestionUserTab" role="tablist">
                                    <%-- <li class="nav-item" role="presentation">
                                        <button class="nav-link " id="addUser-tab" data-bs-toggle="tab"
                                            data-bs-target="#addUser-tab-pane" type="button" role="tab"
                                            aria-controls="addUser-tab-pane" aria-selected="true">Ajouter utilisateur
                                        </button>
                                        </li>--%>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="lieeDossier-tab" data-bs-toggle="tab"
                                                data-bs-target="#lieeDossier-tab-pane" type="button" role="tab"
                                                aria-controls="lieeDossier-tab-pane" aria-selected="false">
                                                Lier Dossier</button>
                                        </li>
                                        <%--<li class="nav-item" role="presentation">
                                            <button class="nav-link" id="controle-tab" data-bs-toggle="tab"
                                                data-bs-target="#controle-tab-pane" type="button" role="tab"
                                                aria-controls="controle-tab-pane" aria-selected="false">Controle
                                                utilisateur
                                            </button>
                                            </li>--%>
                                </ul>
                                <div class="tab-content" id="myTabGestionUser">
                                    <div class="tab-pane fade  " id="addUser-tab-pane" role="tabpanel"
                                        aria-labelledby="addUser-tab" tabindex="0">
                                        <form class="needs-validation" id="formAddUser" novalidate autocomplete="off">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="Nom_complet" name="Nom_complet"
                                                            class="form-control" required />
                                                        <div class="invalid-feedback sty-feedback">
                                                            Nom & Prénom sont obligatoires
                                                        </div>
                                                        <label class="form-label" for="Nom_complet">
                                                            Nom & Prénom</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Email" name="Email" class="form-control"
                                                            required />
                                                        <div class="invalid-feedback sty-feedback">
                                                            Utilisateur est obligatoire
                                                        </div>
                                                        <label class="form-label" for="Email">Utilisateur</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="Password_usr" name="Password_usr"
                                                            class="form-control" required />
                                                        <div class="invalid-feedback sty-feedback">
                                                            Mot de passe est obligatoire
                                                        </div>
                                                        <label class="form-label" for="Password_usr">Mot de passe</label>
                                                    </div>
                                                    <div class="form-check mb-3">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="Type_usr" />
                                                        <label class="form-check-label" for="Type_usr">Admin</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" class="d-none" id="btnAddUser"></button>
                                        </form>
                                    </div>
                                    <div class="tab-pane fade show active" id="lieeDossier-tab-pane" role="tabpanel"
                                        aria-labelledby="lieeDossier-tab" tabindex="1">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="mb-3 mt-4">
                                                    <label for="idDossier" class="form-label">Dossier</label>
                                                    <select class="form-select" id="idDossier">
                                                    </select>
                                                </div>
                                                <span id="listUsers">

                                                </span>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="controle-tab-pane" href="#" role="tabpanel"
                                            aria-labelledby="controle-tab" tabindex="2">
                                            contrôle
                                        </div>
                                    </div>
                                </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="button"
                                class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="tmpittone" data-id="test" data-class="mt-4" data-name="test" data-text="test">{{input}}</div> -->
        </div>
        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="vendors/calendar/semantic.min.js"></script>
        <script src="vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
        <script src="vendors/MDB5/js/mdb.min.js"></script>
        <script src="vendors/sweetalert2/sweetalert2.all.min.js"></script>
        <script src="vendors/select2/select2.min.js"></script>
        <script src="js/moment.js"></script>
        <script src="vendors/calendar/calendar.min.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/i18n.js"></script>
        <script src="js/ittone.js"></script>
        <script type="module" src="js/ModeleDossier/core.js"></script>
        <script src="js/ModeleDossier/custom.js"></script>
    </body>

    </html>