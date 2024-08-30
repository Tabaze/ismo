<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleTier.aspx.cs" Inherits="ModeleTier" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modele de Tier</title>
        <link type="image/x-icon" rel="shortcut icon" href="image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="css/global.css" />
        <style>
            .tableAdd tr.selected {
                background-color: #3988c8;
            }

            .tableAdd tr.selected td {
                color: white;
            }

            emailDetails
            /* .form-outline input[required] {
                background: rgb(255, 255, 97) !important;
            } */

            form label {
                font-weight: bold;
                z-index: 11;
            }

            #formClient .nav-tabs .nav-link.active {
                color: var(--color-ittone);
                background: transparent;
                border-color: var(--color-ittone);
            }

            .img-logo {
                width: 15%;
                padding: 10px;
            }

            .dropdown-menu {
                background-color: white;
            }

            .dropdown-menu>li>button {
                height: 48px;
                padding: 0 10px;
                width: 100%;
                color: white;
                line-height: 46px;
                cursor: pointer;
                text-align: center;
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
                            <li class="nav-item px-5 d-flex align-items-center" title="Société" data-model="Client">
                                <span>Société</span>
                            </li>
                            <%--<li class="nav-item px-5 d-flex align-items-center" title="Fournisseur"
                                data-model="Fournisseur">
                                <span>Fournisseur</span>
                                </li>--%>
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
                        <button type="button" class="btn btn-light btn-rounded" role="insert"
                            id="import">Importer</button>
                        <div class="btn-group" style="box-shadow: none;">
                            <button type="button" class="btn btn-light btn-rounded dropdown-toggle" id="imprementEntet"
                                data-mdb-toggle="dropdown" aria-expanded="false"
                                style="box-shadow:0 4px 10px 0 rgba(0,0,0,.2), 0 4px 20px 0 rgba(0,0,0,.1);">
                                Fiche Societe
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="imprementEntet"
                                id="listImprement">
                                <li><button class="dropdown-item" data-model="xls">Excel</button></li>
                                <li><button class="dropdown-item" data-model="pdf">PDF</button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-6 text-end">
                        <button type="submit" class="fs-6 btn btn-outline-ittone btn-floating mx-2" id="excelEmail"><i
                                class="fa-solid fa-at"></i></button>
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
                        <div id="table" class="tableView">

                        </div>
                    </div>
                </div>
            </section>
            <section class="screen-create d-none screen mt-3">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">Fiche Société</h2>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <button type="submit" form="formClient"
                            class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                        <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                            role="insert">Nouveau</button>
                        <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    </div>
                </div>
                <form class="needs-validation" id="formClient" novalidate autocomplete="off">
                    <div class="row mt-3">
                        <div class="col-md-6 col-ms-12">
                            <div class="card px-2">
                                <div class="card-content collapse show">
                                    <span class="radiosStyle">
                                        <div class="modal-body">
                                            <div class="tab-content">
                                                <!-- <div class="row mb-2 mt-3 align-items-center">
                                                    <h1>Information</h1>
                                                </div> -->
                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class="col-md-6 col-ms-12 ">
                                                        <div class="form-outline">
                                                            <input type="text" id="nomClient" name="nomClient"
                                                                class="form-control" required />
                                                            <div class="invalid-feedback sty-feedback">
                                                                Nom Société est obligatoire
                                                            </div>
                                                            <label class="form-label" for="nomClient">Nom
                                                                Société</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline input-group">
                                                            <input type="text" id="teleClient" name="teleClient"
                                                                class="form-control" />
                                                            <label class="form-label" for="teleClient">Téléphone</label>
                                                            <img class="img-logo" for="teleClient"
                                                                src="./image\app/appel-telephonique.png" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline">
                                                            <input type="text" id="nomClientCom" name="nomClientCom"
                                                                class="form-control" />
                                                            <label class="form-label" for="nomClient">
                                                                Compl</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline input-group">
                                                            <input type="text" id="fixClient" name="fixClient"
                                                                class="form-control" />
                                                            <label class="form-label" for="fixClient">Fix</label>
                                                            <img class="img-logo" for="fixClient"
                                                                src="./image\app/telephone (1).png" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline input-group">
                                                            <input type="text" id="adresseClient" name="adresseClient"
                                                                class="form-control" />
                                                            <div class="invalid-feedback sty-feedback">
                                                                Adresse est obligatoire
                                                            </div>
                                                            <label class="form-label" for="adresseClient">Adresse
                                                                Société</label>
                                                            <img class="img-logo" for="teleClient"
                                                                src="./image\app/adresse.png" alt="">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline input-group">
                                                            <input type="text" id="emailClient" name="emailClient"
                                                                class="form-control" autocomplete="off" />
                                                            <label class="form-label" for="emailClient">E-mail</label>
                                                            <img class="img-logo" for="teleClient"
                                                                src="./image\app/e-mail.png" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="col-6">
                                                        <div class="form-outline ">
                                                            <input type="text" id="cinClient" name="cinClient"
                                                                class="form-control" />
                                                            <label class="form-label" for="cinClient">CIN</label>
                                                        </div>
                                                    </div> -->
                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline input-group">
                                                            <input type="text" id="adresseClient1" name="adresseClient1"
                                                                class="form-control" />
                                                            <label class="form-label" for="adresseClient1">Compl</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline ">
                                                            <input type="text" id="postalClient" name="postalClient"
                                                                class="form-control" />
                                                            <label class="form-label" for="postalClient">Code
                                                                Postale</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline input-group">
                                                            <input type="text" id="siteweb" name="siteweb"
                                                                class="form-control" />
                                                            <label class="form-label" for="siteweb">Site Web</label>
                                                            <img class="img-logo" for="teleClient"
                                                                src="./image\app/linternet.png" alt="">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <label for="idPaysClient" class="form-label">Pays</label>
                                                        <select class="form-select" name="idPays" id="idPaysClient">
                                                        </select>
                                                    </div>
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <label for="idVilleClient" class="form-label">Ville</label>
                                                        <select class="form-select" name="idVille" id="idVilleClient">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row m-0 mb-1 mt-3 align-items-center">
                                                    <div class=" col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline">
                                                            <input type="text" id="iceClient" name="iceClient"
                                                                class="form-control" />
                                                            <label class="form-label" for="iceClient">Numéro
                                                                Siret</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-ms-12 mt-1">
                                                        <div class="form-outline">
                                                            <input type="text" id="numeroTva" name="numeroTva"
                                                                class="form-control" />
                                                            <label class="form-label" for="numeroTva">Numéro
                                                                TVA</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- <div class="tab-pane fade" id="propriete-pane" href="#" role="tabpanel"
                                                    aria-labelledby="propriete-tab" tabindex="2">
                                                    <div class="mb-3" style="text-align: right;">
                                                        <button type="button"
                                                            class="fs-6 btn btn-outline-ittone btn-floating addProp"
                                                            title="Ajouter Propriété">
                                                            <i class="fa-solid fa-plus"></i>
                                                        </button>
                                                    </div>
                                                    <div class="mb-3 tableAddProp"
                                                        style="max-height: 300px;overflow-y: scroll;">
                                                        <table style="width: 100%;">
                                                            <thead>
                                                                <tr>
                                                                    <th>Propriété</th>
                                                                    <th>Valeur</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div> -->
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-ms-12">
                            <div class="card px-2">
                                <div class="card-content collapse show">
                                    <!-- <div class="row mb-3 mt-4 align-items-center">
                                        <h1></h1>
                                    </div> -->
                                    <div class="row mb-3 mt-4 align-items-center">
                                        <!-- <div class="form-check col-4 ml-1">
                                            <input class="form-check-input" type="checkbox" id="contratClient" />
                                            <label class="form-check-label" for="contratClient">Contrat</label>
                                        </div>
                                        <div class="form-check col-4">
                                            <input class="form-check-input" type="checkbox" id="vendeurClient" />
                                            <label class="form-check-label" for="vendeurClient">Vendeur</label>
                                        </div>
                                        <div class="form-check col-4">
                                            <input class="form-check-input" type="checkbox" id="distributeur" />
                                            <label class="form-check-label" for="distributeur">Distributeur</label>
                                        </div> -->
                                    </div>
                                    <!-- <div class="row mb-3 mt-4 align-items-center">
                                        <div class="col-6">
                                            <label for="frmJuridiqueClient" class="form-label">Forme
                                                Juridique</label>
                                            <select class="form-select" name="frmJuridiqueClient"
                                                id="frmJuridiqueClient">
                                                <option value="Sarl">Sarl</option>
                                                <option value="Sarl Au">Sarl Au</option>
                                                <option value="Sa">Sa</option>
                                                <option value="Cooperative">Cooperative</option>
                                                <option value="PF">PF</option>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                    </div> -->
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <div class="ui calendar inputDate mb-1 disabled" id="createdateCl">
                                                <label class="form-label">Date Création</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <div class="ui calendar inputDate mb-1 disabled" id="dateMAJ">
                                                <label class="form-label"> Date de dernière
                                                    modification</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <label for="idRelation" class="form-label" style="width: 100%;">
                                                TYPE FICHE
                                                <span class="btn btn-secondary btn-input btn-modal"
                                                    data-model="Relation" style="float: right;"><i
                                                        class="fa fa-lg fas fa-plus"></i></span></label>
                                            <select class="form-select" name="idRelation" id="idRelation" required>
                                            </select>
                                        </div>
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <label for="idUser" class="form-label" style="width: 100%;">Suivi
                                                par</label>
                                            <select class="form-select" name="suivi" id="idUser" required>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row m-0 mb-3 mt-4 align-items-center">
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <div class="form-outline">
                                                <input type="text" id="codeClient" name="codeClient"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Code est obligatoire
                                                </div>
                                                <label class="form-label" for="codeClient">Code </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <label for="idPaysClient" class="form-label">Produit
                                                désiré</label>
                                            <select class="form-select article" id="" name="produit_desire" multiple>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row m-0 mb-3 mt-4 align-items-center">
                                        <div class="col-md-6 col-ms-12 mt-1">
                                            <div class="form-outline">
                                                <input type="text" id="produitUtilise" name="produitUtilise"
                                                    class="form-control" />
                                                <label class="form-label" for="produitUtilise">Produit Utilise </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row mt-3 card px-2">
                        <div class="card">
                            <!-- <div class="row mb-2 mt-3 align-items-center">
                                <h1></h1>
                            </div> -->
                            <div class="row">
                                <div class="col-md col-ms-12 mt-1">
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-10">
                                            <label for="idPotentiel" class="form-label">Potentiel de la
                                                Société</label>
                                            <select class="form-select" name="idPotClient" id="idPotentiel" required>
                                            </select>

                                        </div>
                                        <div class="col-2">
                                            <div>
                                                <span class="btn btn-secondary btn-input mt-4 btn-modal"
                                                    data-model="Potentiel"><i class="fa fa-lg fas fa-plus"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md col-ms-12 mt-1">
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-10">
                                            <label for="idOrigine" class="form-label">Origine du
                                                contact</label>
                                            <select class="form-select" name="idOrigine" id="idOrigine" required>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <div>
                                                <span class="btn btn-secondary btn-input mt-4 btn-modal"
                                                    data-model="Origine"><i class="fa fa-lg fas fa-plus"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md col-ms-12 mt-1">
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-10">
                                            <label for="idPotentiel" class="form-label">
                                                Industrie
                                            </label>
                                            <select class="form-select" name="idIndustrie" id="idIndustrie" required>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <div>
                                                <span class="btn btn-secondary btn-input mt-4 btn-modal"
                                                    data-model="Industrie"><i class="fa fa-lg fas fa-plus"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md col-ms-12 mt-1">
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-10">
                                            <label for="idCategorie" class="form-label">Catégorie</label>
                                            <select class="form-select" name="idCategorie" id="idCategorie" multiple
                                                required>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <div>
                                                <span class="btn btn-secondary btn-input mt-4 btn-modal"
                                                    data-model="Cate"><i class="fa fa-lg fas fa-plus"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md col-ms-12 mt-1">
                                    <div class="row m-0 mb-1 mt-3 align-items-center">
                                        <div class="col-10">
                                            <label for="idRebrique" class="form-label">Rubrique</label>
                                            <select class="form-select" name="idRebrique" id="idRebrique" multiple
                                                required>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <div>
                                                <span class="btn btn-secondary btn-input mt-4 btn-modal"
                                                    data-model="Rebrique"><i class="fa fa-lg fas fa-plus"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="col">
                                    <div class="row m-0 mb-3 mt-4 align-items-center">
                                         <div class="col-6 d-none">
                                            <div class="form-outline">
                                                <input type="text" id="soldAutoriseClient" name="soldAutoriseClient"
                                                    class="form-control" />
                                                <label class="form-label" for="soldAutoriseClient">Cout
                                                    Maximum
                                                    Autorisé</label>
                                            </div>
                                        </div> 
                                        <div class="col mt-4">
                                            <div class="form-outline">
                                                <input type="text" id="codeFamCli" name="codeFamille"
                                                    class="form-control" />
                                                <label class="form-label" for="codeFamCli">Code
                                                    Famille</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                            <!-- <div class="row m-0 mb-1 mt-3 align-items-center">
                                <div class="col-12">
                                    <label for="idIndustrie" class="form-label">Industrie</label>
                                    <select class="form-select" name="idIndustrie" id="idIndustrie">
                                    </select>
                                </div>
                            </div> -->
                            <!-- <div class="col-6">
                                    <label for="idType" class="form-label">Type</label>
                                    <select class="form-select" name="idType" id="idType">
                                    </select>
                                </div> -->
                            <!-- <div class="row mb-3 mt-4 align-items-center">
                                <div class="col-6">
                                    <div class="form-outline">
                                        <input type="text" id="siegeClient" name="siegeClient"
                                            class="form-control" />
                                        <label class="form-label" for="siegeClient">SIEGE</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-outline">
                                        <input type="text" id="banqueClient" name="banqueClient"
                                            class="form-control" />
                                        <label class="form-label" for="banqueClient">BANQUE</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3 mt-4 align-items-center">
                                <div class="col-6">
                                    <div class="form-outline">
                                        <input type="text" id="ribClient" name="ribClient"
                                            class="form-control" />
                                        <label class="form-label" for="ribClient">RIB</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-outline">
                                        <input type="text" id="nifClient" name="nifClient"
                                            class="form-control" />
                                        <label class="form-label" for="nifClient">N.IF</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3 mt-4 align-items-center">
                                <div class="col-6">
                                    <div class="form-outline">
                                        <input type="text" id="patenteClient" name="patenteClient"
                                            class="form-control" />
                                        <label class="form-label" for="patenteClient">N.PATENTE</label>
                                    </div>
                                </div>
                            </div> 
                            <div class="row mb-2 mt-3 align-items-center">
                                <h1></h1>
                            </div>-->
                        </div>
                    </div>
                    <div class="row mt-3 card px-2 updates d-none">
                        <ul class="nav nav-tabs align-items-center mt-3" style="justify-content: center;" id="TabClient"
                            role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="infoClient-tab" data-bs-toggle="tab"
                                    data-bs-target="#contactClient-pane" type="button" role="tab"
                                    aria-controls="infoClient-pane" aria-selected="true">Contact
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="juridClient-tab" data-bs-toggle="tab"
                                    data-bs-target="#actionClien-pane" type="button" role="tab"
                                    aria-controls="juridClient-pane" aria-selected="false">Actions
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="offre-tab" data-bs-toggle="tab"
                                    data-bs-target="#offre-pane" type="button" role="tab" aria-controls="offre-pane"
                                    aria-selected="false">Offres
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="memo-tab" data-bs-toggle="tab" data-bs-target="#memo-pane"
                                    type="button" role="tab" aria-controls="memo-pane" aria-selected="false">Mémo
                                </button>
                            </li>
                            <li class="nav-item" role="presentation" title="En cours d'éxecution">
                                <button class="nav-link" id="envMail-tab" data-bs-toggle="tab"
                                    data-bs-target="#envMail-pane" type="button" role="tab" aria-controls="envMail-pane"
                                    aria-selected="false">Envoie Mail</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="parc-tab" data-bs-toggle="tab" data-bs-target="#parc-pane"
                                    type="button" role="tab" aria-controls="parc-pane" aria-selected="false">Parc
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="contactClient-pane" role="tabpanel"
                                aria-labelledby="infoClient-tab" tabindex="0">
                                <div class="col-12">
                                    <div class="mb-1 mt-3" style="text-align: right;">
                                        <span class="btn btn-secondary btn-input addEmp"><i
                                                class="fa fa-lg fas fa-plus"></i></span>
                                        <span class="btn btn-secondary btn-input modEmp"><i
                                                class="fa fa-lg fas fa-pen-to-square"></i></span>
                                        <span class="btn btn-secondary btn-input delEmp"><i
                                                class="fa fa-lg fas fa-trash-can"></i></span>
                                    </div>
                                    <div class="mb-3" style="max-height: 300px !important" id="tableContact">

                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="actionClien-pane" role="tabpanel"
                                aria-labelledby="actionClien-tab" tabindex="1">
                                <div class="col-12">
                                    <div class="mb-1 mt-3" style="text-align: right;">
                                        <span class="btn btn-secondary btn-input addAction"><i
                                                class="fa fa-lg fas fa-plus"></i></span>
                                        <span class="btn btn-secondary btn-input modAction"><i
                                                class="fa fa-lg fas fa-pen-to-square"></i></span>
                                        <span class="btn btn-secondary btn-input delAction"><i
                                                class="fa fa-lg fas fa-trash-can"></i></span>
                                    </div>
                                    <div class="mb-3" id="tableAction" style="max-height: 300px !important;">
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="offre-pane" role="tabpanel"
                                aria-labelledby="actionClien-tab" tabindex="2">
                                <div class="col-12">
                                    <div class="mb-1 mt-3" style="text-align: right;">
                                        <span class="btn btn-secondary btn-input" id="Offre"><i
                                                class="fa fa-lg fas fa-plus"></i></span>
                                    </div>
                                    <div class="mt-3" id="tableOffre" style="max-height: 300px!important">
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="envMail-pane" role="tabpanel"
                                aria-labelledby="actionClien-tab" tabindex="2">
                                <div class="col-12">
                                    <div class="mb-1 mt-3" style="text-align: right;">
                                        <span class="btn btn-secondary btn-input" id="sendEmail"><i
                                                class="fa-regular fa-paper-plane"></i></span>
                                    </div>
                                    <div class="mt-3" id="tableEmail" style="max-height: 300px!important">
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="memo-pane" role="tabpanel"
                                aria-labelledby="actionClien-tab" tabindex="2">
                                <div class="col-12">
                                    <div class="o_td_label">
                                        <textarea cols="70" name="editor" rows="50" placeholder="Contenu"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="parc-pane" role="tabpanel"
                                aria-labelledby="actionClien-tab" tabindex="2">
                                <div class="row m-0 mb-3 mt-4 align-items-center">

                                    <div class="mb-1 mt-3" style="text-align: right;">
                                        <span class="btn btn-secondary btn-input addParc"><i
                                                class="fa fa-lg fas fa-plus"></i></span>
                                        <span class="btn btn-secondary btn-input modParc"><i
                                                class="fa fa-lg fas fa-pen-to-square"></i></span>
                                        <span class="btn btn-secondary btn-input delParc"><i
                                                class="fa fa-lg fas fa-trash-can"></i></span>
                                    </div>
                                    <div class="mb-3" id="tableParc" style="max-height: 300px !important;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2 d-none">Sauvegarder</button>
        </form>
        </section>

        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Fournisseur">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Fournisseur</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formFournisseur" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <ul class="nav nav-tabs" id="TabFournisseur" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="infoFournisseur-tab" data-bs-toggle="tab"
                                            data-bs-target="#infoFournisseur-pane" type="button" role="tab"
                                            aria-controls="infoFournisseur-pane" aria-selected="true">Information
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="juridFournisseur-tab" data-bs-toggle="tab"
                                            data-bs-target="#juridFournisseur-pane" type="button" role="tab"
                                            aria-controls="juridFournisseur-pane" aria-selected="false">
                                            Forme Juridique</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="controleFournisseur-tab" data-bs-toggle="tab"
                                            data-bs-target="#controleFournisseur-pane" type="button" role="tab"
                                            aria-controls="controleFournisseur-pane" aria-selected="false">Contact
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="infoFournisseur-pane" role="tabpanel"
                                        aria-labelledby="infoFournisseur-tab" tabindex="0">
                                        <div class="row m-0 mb-3 mt-4 align-items-center">
                                            <div class="form-outline col-8 col-md-10">
                                                <input type="text" id="codeFournisseur" name="codeFournisseur"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Code Fournisseur est obligatoire
                                                </div>
                                                <label class="form-label" for="codeFournisseur">Code
                                                    Fournisseur</label>
                                            </div>
                                            <div class="col-2">
                                                <span class="btn btn-secondary btn-input generateurCode"><i
                                                        class="fa fa-lg fas fa-arrow-left"></i></span>
                                            </div>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="fournisseur" checked />
                                            <label class="form-check-label" for="fournisseur">Fournisseur</label>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="sous_traitance" />
                                            <label class="form-check-label" for="sous_traitance">Sous-Traitance</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="nomFournisseur" name="nomFournisseur"
                                                class="form-control" required />
                                            <div class="invalid-feedback sty-feedback">
                                                Nom Fournisseur est obligatoire
                                            </div>
                                            <label class="form-label" for="nomFournisseur">Nom Fournisseur</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="adresseFournisseur" name="adresseFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="adresseFournisseur">Adresse
                                                Fournisseur</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="postalFournisseur" name="postalFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="postalFournisseur">Code Postale</label>
                                        </div>
                                        <div class="mb-3">
                                            <label for="idVilleFournisseur" class="form-label">Ville</label>
                                            <select class="form-select" name="idVille" id="idVilleFournisseur">
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="idPaysFournisseur" class="form-label">Pays</label>
                                            <select class="form-select" name="idPays" id="idPaysFournisseur">
                                            </select>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="cinFournisseur" name="cinFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="cinFournisseur">CIN</label>
                                        </div>
                                        <div class="row m-0 mb-3 mt-4 align-items-center">
                                            <div class="col-6">
                                                <label for="origineFr" class="form-label">Origine du
                                                    contact</label>
                                                <select class="form-select" name="origineContactFR" id="origineFr">
                                                    <option value="Site web">Site web</option>
                                                    <option value="Telephone">Téléphone</option>
                                                    <option value="Site d’annonce">Site d’annonce</option>
                                                </select>
                                            </div>
                                            <div class="col-6 ">
                                                <label for="categorieFr" class="form-label">Catégorie</label>
                                                <select class="form-select" name="categorieFR" id="categorieFr">
                                                    <option value="Préfa béton">Préfa béton</option>
                                                    <option value="Concassage">Concassage</option>
                                                    <option value="Tuyaux en béton">Tuyaux en béton</option>
                                                    <option value="Lavage de sable">Lavage de sable</option>
                                                    <option value="Manutention">Manutention</option>
                                                </select>
                                            </div>
                                            <!-- <div class="col-6">
                                                    <label for="idPaysClient" class="form-label">INDUSTRIE</label>
                                                    <select class="form-select" name="">
                                                        <option value="L'agroalimentaire">L'agroalimentaire</option>
                                                        <option value="L'automobile">L'automobile</option>
                                                        <option value="L'aéronautique">L'aéronautique</option>
                                                        <option value="L'électronique">L'électronique</option>
                                                        <option value="Construction">Construction</option>
                                                    </select>
                                                </div> -->
                                        </div>
                                        <div class="row m-0 mb-3 mt-4 align-items-center">
                                            <div class="col-6 ">
                                                <label for="potentielFr" class="form-label">Potentiel du
                                                    client</label>
                                                <select class="form-select" name="potentielFR" id="potentielFr">
                                                    <option value="Demande du matériel">Demande du matériel</option>
                                                    <option value="Etude du projet">Etude du projet</option>
                                                    <option value="Négociation">Négociation</option>
                                                    <option value="Conclusion">Conclusion</option>
                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <label for="" class="form-label"></label>
                                                <div class="form-outline mb-3 mt-4">
                                                    <input type="text" id="soldAutoriseFournisseur"
                                                        name="soldAutoriseFournisseur" class="form-control" value="0" />
                                                    <label class="form-label" for="soldAutoriseFournisseur">Coût
                                                        Maximum
                                                        Autorisé</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="ui calendar inputDate mb-3 disabled" id="createdateFR">
                                                    <label class="form-label">Date Création</label>
                                                    <div class="ui input left icon w-100">
                                                        <i class="calendar icon"></i>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="col">
                                                    <div class="ui calendar inputDate mb-3 disabled" id="dateMAJ">
                                                        <label class="form-label"> Date de dernière modification</label>
                                                        <div class="ui input left icon w-100">
                                                            <i class="calendar icon"></i>
                                                            <input type="text">
                                                        </div>
                                                    </div>
                                                </div> -->
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="juridFournisseur-pane" role="tabpanel"
                                        aria-labelledby="juridFournisseur-tab" tabindex="1">
                                        <div class="mb-3 mt-4">
                                            <label for="frmJuridiqueFournisseur" class="form-label">Forme
                                                Juridique</label>
                                            <select class="form-select" name="frmJuridiqueFournisseur"
                                                id="frmJuridiqueFournisseur">
                                                <option value="Sarl">Sarl</option>
                                                <option value="Sarl Au">Sarl Au</option>
                                                <option value="Sa">Sa</option>
                                                <option value="Cooperative">Cooperative</option>
                                                <option value="PF">PF</option>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="iceFournisseur" name="iceFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="iceFournisseur">ICE</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="cnssFournisseur" name="cnssFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="cnssFournisseur">N.CNSS</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="siegeFournisseur" name="siegeFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="siegeFournisseur">SIEGE</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="banqueFournisseur" name="banqueFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="banqueFournisseur">BANQUE</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="ribFournisseur" name="ribFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="ribFournisseur">RIB</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="nifFournisseur" name="nifFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="nifFournisseur">N.IF</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="patenteFournisseur" name="patenteFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="patenteFournisseur">N.PATENTE</label>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="controleFournisseur-pane" href="#" role="tabpanel"
                                        aria-labelledby="controleFournisseur-tab" tabindex="2">

                                        <div class="form-outline mb-3 mt-4">
                                            <input type="text" id="emailFournisseur" name="emailFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="emailFournisseur">E-mail</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="teleFournisseur" name="teleFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="teleFournisseur">Téléphone</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="fixFournisseur" name="fixFournisseur"
                                                class="form-control" />
                                            <label class="form-label" for="fixFournisseur">Fix</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="sitewebFr" name="sitewebFr" class="form-control" />
                                            <label class="form-label" for="sitewebFr">Site Web</label>
                                        </div>
                                        <div class="mb-3" style="text-align: right;">
                                            <button type="button"
                                                class="fs-6 btn btn-outline-ittone btn-floating addEmp"
                                                title="Ajouter Emp">
                                                <i class="fa-solid fa-plus"></i>
                                            </button>
                                            <button type="button"
                                                class="fs-6 btn btn-outline-ittone btn-floating modEmp"
                                                title="Modifier Emp">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button type="button"
                                                class="fs-6 btn btn-outline-ittone btn-floating delEmp"
                                                title="Suprimmer Emp">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                        <div class="mb-3 tableAdd" style="max-height: 300px;overflow-y: scroll;">
                                            <table style="width: 100%;">
                                                <thead>
                                                    <tr>
                                                        <th>Civilité</th>
                                                        <th>Nom Complet</th>
                                                        <th>Fonctionnalité</th>
                                                        <th>GSM</th>
                                                        <th>Email</th>
                                                        <th>Note</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
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
            <div class="modal-dialog modal-lg modal-dialog-centered addPropr">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Propriété</h5>
                        <!-- <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button> -->
                    </div>
                    <form class="needs-validation" id="formPropr" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3 col-md-6">
                                            <label for="propriete" class="form-label">Propriété
                                            </label>
                                            <select class="form-select" name="propriete" id="idPropriete">
                                            </select>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="valeur" name="valeur" class="form-control" />
                                            <label class="form-label" for="valeur">Valeur</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2"
                                id="ajouterPropr">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered sendEmail">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Email</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formEmail" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <div class="col">

                                </div>
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2"
                                id="ajouterPropr">Send <i class="fa-regular fa-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div role="dialog" class="modal d-none" style="z-index: 100000;">
            <div class="modal-dialog  modal-dialog-centered pdfViewer h-100 m-0"
                style="width: 100%;max-width: inherit;">
                <div class="modal-content h-100">
                    <div class="modal-header">
                        <h5 class="modal-title">PDF</h5>
                        <!-- <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2" id="sendMail"><i
                                class="fa-solid fa-at"></i></button> -->
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"
                                style="font-size: 19px !important;"></i></button>
                    </div>
                    <div class="row h-100">
                        <div class="col-12">
                            <iframe type="application/pdf" src="#" style="width: 100%; height: 100%;"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="./vendors/ckeditor/ckeditor.js"></script>
        <script src="././js/editeur2.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/moment.js"></script>
        <script src="js/currency.min.js"></script>
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
        <script src="vendors/xlsx/xlsx.bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script src="./vendors/html2canvas/jspdf.min.js"></script>
        <script src="./js/pdf.js"></script>
        <script src="js/xlsx.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/i18n.js"></script>
        <script src="js/ittone.js"></script>
        <script src="js/notification.js"></script>
        <script src="js/taglist.jquery.js"></script>
        <script src="js/roles.js"></script>
        <script src="js/ModeleTier/custom.js"></script>
        <script type="module" src="js/ModeleTier/core.js"></script>
    </body>

    </html>