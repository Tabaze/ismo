<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleUsers.aspx.cs" Inherits="ModeleUsers" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modele Paramètres</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
        <style>
            .btn.install {
                background-color: var(--color-ittone);
            }

            .btn.uninstaller {
                background-color: var(--color-ittone-1);
            }

            .scroll-container {
                display: block;
                margin: 0 auto;
                text-align: center;
            }

            .scroll-container {
                overflow-y: scroll;
                scroll-behavior: smooth;
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
                            <li class="nav-item px-5 d-flex align-items-center" title="Opérateurs " data-model="Users">
                                <span>Opérateurs </span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Accès" data-model="Roles">
                                <span>Accès</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Configuration"
                                data-model="Settings">
                                <span>Configuration</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Email Paramètres"
                                data-model="email_param">
                                <span>Email Paramètres</span>
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
                        <!-- <button type="button" class="btn btn-light btn-rounded" role="insert" id="import">Importer</button> -->
                        <!--  <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="linkRow" role="link"
                            title="link">
                            <i class="fa-solid fa-link"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow"
                            role="delete" title="Supprimer">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <!-- <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf"
                            title="Telecherger PDF">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel"
                            title="Telecharger Excel">
                            <i class="fa-solid fa-file-excel"></i>
                        </button> -->
                    </div>
                </div>
                <div class="row m-2  p-1 card">
                    <div class="col-12">
                        <div class="tableView">

                        </div>
                    </div>
                </div>
            </section>
            <section class="screen-create d-none Settings screen mt-3">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">Configuration</h2>
                    </div>
                </div>
                <div class="card m-4 p-2" style="background-color: var(--color-ittone-1);">
                    <div class="m_appModeles d-flex flex-wrap justify-content-center align-items-center text-dark text-center"
                        style="max-width: none;">
                        <a class="w-25 m_menuitem p-2" id="appSettings">
                            <div class="m_app_icon" style="background-image: url('../image/menu/parametrage.png')">
                            </div>
                            <div class="m_caption">Paramètres</div>
                        </a>
                        <a class="w-25 m_menuitem p-2" id="emailsSettings">
                            <div class="m_app_icon" style="background-image: url('../image/menu/PARAMETRE\ EMAIL.png')">
                            </div>
                            <div class="m_caption">Paramètres E-mails</div>
                        </a>
                        <a class="w-25 m_menuitem p-2" id="rolesUsers">
                            <div class="m_app_icon" style="background-image: url('../image/menu/accesutilisateur.png')">
                            </div>
                            <div class="m_caption">Accès d'utilisateurs</div>
                        </a>
                        <a class="w-25 m_menuitem p-2" id="MenuUsers">
                            <div class="m_app_icon" style="background-image: url('../image/menu/modelEmploye.png')">
                            </div>
                            <div class="m_caption">Menu d'utilisateur</div>
                        </a>
                    </div>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Users">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Users</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formUsers" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-7">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomUser" name="nomUser" class="form-control"
                                                    required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom & Prénom est obligatoire
                                                </div>
                                                <label class="form-label" for="nomUser">Nom & Prénom</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="userName" name="userName" class="form-control"
                                                    required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Utilisateur est obligatoire
                                                </div>
                                                <label class="form-label" for="userName">Utilisateur</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="passwordUser" name="passwordUser"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Mot de passe est obligatoire.
                                                </div>
                                                <label class="form-label" for="passwordUser">Mot de passe</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="typeAdmin" />
                                                <label class="form-check-label" for="typeAdmin">Admin</label>
                                            </div>
                                        </div>
                                        <div class="col-5 d-flex justify-content-center align-items-center">
                                            <div class="circular_image"
                                                style="background-image: url('../image/app/FOLDER-ITTONE.png');">
                                                <div
                                                    class="inBackround d-flex justify-content-center align-items-center">
                                                    <input type='file' id="photoFamille" class="inputCircular_image"
                                                        accept=".png, .jpg, .jpeg" />
                                                    <label for="photoFamille"
                                                        class="labelCircular_image fs-1 text-white"><i
                                                            class="fa-solid fa-upload"></i></label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Links">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Liaison</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formLinks" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="mb-3">
                                            <label for="idDepot" class="form-label">Dépôt</label>
                                            <select class="form-select" name="idDepot" id="idDepot">

                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="idTreso" class="form-label">Trésorerie</label>
                                            <select class="form-select" name="idTreso" id="idTreso">

                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="idPays" class="form-label">Pays</label>
                                            <select class="form-select" name="idPays" id="idPays">

                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="idVille" class="form-label">Ville</label>
                                            <select class="form-select" name="idVille" id="idVille">

                                            </select>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Roles">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Rôles</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formRoles" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nameRole" name="nameRole" class="form-control"
                                                    required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Le nom est obligatoire
                                                </div>
                                                <label class="form-label" for="nameRole">Nom Rôle</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="insertRole"
                                                    checked />
                                                <label class="form-check-label" for="insertRole">Enregistrement
                                                    Rôle</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" value="" id="updateRole"
                                                    checked />
                                                <label class="form-check-label" for="updateRole">Modification
                                                    Rôle</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" value="" id="deleteRole"
                                                    checked />
                                                <label class="form-check-label" for="deleteRole">Suppression
                                                    Rôle</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="imprimerRole" checked />
                                                <label class="form-check-label" for="imprimerRole">Impression
                                                    Rôle</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" value="" id="valider"
                                                    checked />
                                                <label class="form-check-label" for="valider">Validation Rôle</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="selectByUser" />
                                                <label class="form-check-label" for="selectByUser">Séléctionner par
                                                    utilisateur</label>
                                            </div>
                                            <div class="form-check mb-3 mx-2 d-none">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="selectDoc" />
                                                <label class="form-check-label" for="selectDoc">Séléctionner Doc</label>
                                            </div>
                                            <div class="form-check mb-3 mx-2 d-none">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="selectALL" />
                                                <label class="form-check-label" for="selectALL">Séléctionner
                                                    Tous</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered AppSettings">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Paramètres</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formAppSettings" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <h3>Argent</h3>
                                            <div class="mb-3">
                                                <label for="patternMoney" class="form-label">Motif Argent</label>
                                                <select class="form-select" name="patternMoney" id="patternMoney">
                                                    <option value="# !" selected>
                                                        # !
                                                    </option>
                                                    <option value="#!">
                                                        #!
                                                    </option>
                                                    <option value="! #">
                                                        ! #
                                                    </option>
                                                    <option value="!#">
                                                        !#
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="precisionMoney" class="form-label">Précision Argent</label>
                                                <select class="form-select" name="precisionMoney" id="precisionMoney">
                                                    <option value="0">
                                                        0
                                                    </option>
                                                    <option value="1">
                                                        1
                                                    </option>
                                                    <option value="2" selected>
                                                        2
                                                    </option>
                                                    <option value="3">
                                                        3
                                                    </option>
                                                    <option value="4">
                                                        4
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="symbolMoney" class="form-label">Symbole Argent</label>
                                                <select class="form-select" name="symbolMoney" id="symbolMoney">
                                                    <option value=" ">

                                                    </option>
                                                    <option value="DH" selected>
                                                        DH
                                                    </option>
                                                    <option value="MAD">
                                                        MAD
                                                    </option>
                                                    <option value="درهم">
                                                        درهم
                                                    </option>
                                                    <option value="$">
                                                        $
                                                    </option>
                                                    <option value="£">
                                                        £
                                                    </option>
                                                    <option value="€">
                                                        €
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="decimalMoney" class="form-label">Décimale Argent</label>
                                                <select class="form-select" name="decimalMoney" id="decimalMoney">
                                                    <option value="," selected>
                                                        ,
                                                    </option>
                                                    <option value=".">
                                                        .
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="separatorMoney" class="form-label">Séparateur Argent</label>
                                                <select class="form-select" name="separatorMoney" id="separatorMoney">
                                                    <option value=" " selected>

                                                    </option>
                                                    <option value=".">
                                                        .
                                                    </option>
                                                    <option value=",">
                                                        ,
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="exampleMoney" name="exampleMoney"
                                                    class="form-control form-control-lg" disabled />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <h3>QTE</h3>
                                            <div class="mb-3">
                                                <label for="patternQTE" class="form-label">Motif QTE</label>
                                                <select class="form-select" name="patternQTE" id="patternQTE">
                                                    <option value="# !" selected>
                                                        # !
                                                    </option>
                                                    <option value="#!">
                                                        #!
                                                    </option>
                                                    <option value="! #">
                                                        ! #
                                                    </option>
                                                    <option value="!#">
                                                        !#
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="precisionQTE" class="form-label">Précision QTE</label>
                                                <select class="form-select" name="precisionQTE" id="precisionQTE">
                                                    <option value="0" selected>
                                                        0
                                                    </option>
                                                    <option value="1">
                                                        1
                                                    </option>
                                                    <option value="2">
                                                        2
                                                    </option>
                                                    <option value="3">
                                                        3
                                                    </option>
                                                    <option value="4">
                                                        4
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="symbolQTE" class="form-label">Symbole QTE</label>
                                                <select class="form-select" name="symbolQTE" id="symbolQTE">
                                                    <option value=" " selected>

                                                    </option>
                                                    <option value="QTE">
                                                        QTE
                                                    </option>
                                                    <option value="Unite">
                                                        Unite
                                                    </option>
                                                    <option value="L">
                                                        L
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="decimalQTE" class="form-label">Décimale QTE</label>
                                                <select class="form-select" name="decimalQTE" id="decimalQTE">
                                                    <option value="," selected>
                                                        ,
                                                    </option>
                                                    <option value=".">
                                                        .
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="separatorQTE" class="form-label">Séparateur QTE</label>
                                                <select class="form-select" name="separatorQTE" id="separatorQTE">
                                                    <option value=" " selected>

                                                    </option>
                                                    <option value=".">
                                                        .
                                                    </option>
                                                    <option value=",">
                                                        ,
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="exampleQTE" name="exampleQTE"
                                                    class="form-control form-control-lg" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <div class="form-check mb-3 mt-4">
                                                <input class="form-check-input" type="checkbox" id="ttcCheck" />
                                                <label class="form-check-label" for="ttcCheck">TTC</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-check mb-3 mt-4">
                                                <input class="form-check-input" type="checkbox" id="tvaCheck" />
                                                <label class="form-check-label" for="tvaCheck">TVA</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-check mb-3 mt-4">
                                                <input class="form-check-input" type="checkbox" id="subDepot" />
                                                <label class="form-check-label" for="subDepot">Sub Dépôt</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered RolesUsers">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Accès d'utilisateurs </h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formRolesUsers" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="idRole" class="form-label">Rôle</label>
                                                <select class="form-select" name="idRole" id="idRole">
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idUser" class="form-label">User</label>
                                                <select class="form-select" name="idUser" id="idUser">
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
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Menu">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Menu</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formMenu" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="idUserMenu" class="form-label">User</label>
                                                <select class="form-select" name="idUser" id="idUserMenu">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="idParentMenu" class="form-label">Parent Menu</label>
                                                <select class="form-select" name="idParent" id="idParentMenu">
                                                    <option value="menuParam">Paramètrage</option>
                                                    <option value="menuCommercial">Gestion commercial</option>
                                                    <option value="menuPaie">Gestion de paie</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <ul class="nav nav-tabs" id="MenuTab" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link active" id="Menu-tab" data-bs-toggle="tab"
                                                        data-bs-target="#Menu-tab-pane" type="button" role="tab"
                                                        aria-controls="Menu-tab-pane" aria-selected="true">Menu
                                                    </button>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" id="MenuSub-tab" data-bs-toggle="tab"
                                                        data-bs-target="#MenuSub-tab-pane" type="button" role="tab"
                                                        aria-controls="MenuSub-tab-pane"
                                                        aria-selected="false">MenuSub</button>
                                                </li>
                                            </ul>
                                            <div class="tab-content  scroll-container" id="myTabContent">
                                                <div class="tab-pane fade show active" id="Menu-tab-pane"
                                                    role="tabpanel" aria-labelledby="Menu-tab" tabindex="0">
                                                    <div class="m_appModeles d-flex flex-wrap justify-content-center align-items-center text-center"
                                                        id="AppModels" style="max-width: none;">
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade" id="MenuSub-tab-pane" role="tabpanel"
                                                    aria-labelledby="MenuSub-tab" tabindex="1">
                                                    <div id="listSubMenu"
                                                        class="d-flex justify-content-center flex-wrap mt-4">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered emailsSettings">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Paramètres E-mails</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formEmailsSettings" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <ul class="nav nav-tabs" id="TabEmlsSett" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="infoServer-tab" data-bs-toggle="tab"
                                                data-bs-target="#infoServer-pane" type="button" role="tab"
                                                aria-controls="infoServer-pane" aria-selected="true">Server
                                            </button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="infoSMTP-tab" data-bs-toggle="tab"
                                                data-bs-target="#infoSMTP-pane" type="button" role="tab"
                                                aria-controls="infoSMTP-pane" aria-selected="false">
                                                SMTP</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="infoIMAP-tab" data-bs-toggle="tab"
                                                data-bs-target="#infoIMAP-pane" type="button" role="tab"
                                                aria-controls="infoIMAP-pane" aria-selected="false">IMAP
                                            </button>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="infoServer-pane" role="tabpanel"
                                            aria-labelledby="infoServer-tab" tabindex="0">
                                            <div class="border-bottom dark-border p-1 mt-2">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="urlServer" name="urlServer"
                                                                class="form-control" required />
                                                            <label class="form-label" for="urlServer">URL Server</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="urlAttach" name="urlAttach"
                                                                class="form-control" required />
                                                            <label class="form-label" for="urlAttach">URL
                                                                Attachements</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="infoSMTP-pane" role="tabpanel"
                                            aria-labelledby="infoSMTP-tab" tabindex="1">
                                            <div class="border-bottom dark-border p-1 mt-2">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="hostSm" name="hostSm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="hostSm">HOST</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="usernameSm" name="usernameSm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="usernameSm">Username</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="passwordSm" name="passwordSm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="passwordSm">Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="portSm" name="portSm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="portSm">Port</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="fromNameSm" name="fromNameSm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="fromNameSm">From Name</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="form-check mb-3">
                                                            <label class="form-check-label" for="checkSMTP">SMTP
                                                                Authentification</label>
                                                            <input class="form-check-input" type="checkbox"
                                                                id="checkSMTP" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="infoIMAP-pane" role="tabpanel"
                                            aria-labelledby="infoIMAP-tab" tabindex="1">
                                            <div class="border-bottom dark-border p-1 mt-2">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="hostIm" name="hostIm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="hostIm">HOST</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="usernameIm" name="usernameIm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="usernameIm">Username</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="passwordIm" name="passwordIm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="passwordIm">Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="portIm" name="portIm"
                                                                class="form-control" required />
                                                            <label class="form-label" for="portIm">Port</label>
                                                        </div>
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered email_param">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Email</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formEmailParam" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-outline">
                                            <input type="text" class="form-control" name="host">
                                            <label class="form-label" for="host">Host Name</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-outline">
                                            <input type="text" class="form-control" name="port">
                                            <label class="form-label" for="port">Port</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6">
                                        <div class="form-outline">
                                            <input type="text" class="form-control" name="username">
                                            <label class="form-label" for="username">Email</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-outline">
                                            <input type="password" class="form-control" name="password">
                                            <label class="form-label" for="password">Password</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6">
                                        <input type="checkbox" name="enableSsl" id="enableSsl" class="form-check-input">
                                        <label for="enableSsl" class="form-check-label">Enable SSL</label>
                                    </div>
                                </div>
                            </div>
                        </span>
                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                role="insert">Nouveau</button> -->
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2"
                                id="ajouterPropr">Ajouter</button>
                        </div>
                    </form>
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
        <script src="../js/ModeleUsers/custom.js"></script>
        <script type="module" src="../js/ModeleUsers/core.js"></script>
    </body>

    </html>