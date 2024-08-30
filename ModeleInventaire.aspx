<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleInventaire.aspx.cs" Inherits="ModeleInventaire" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modele de Inventaire</title>
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
                            <li class="nav-item px-5 d-flex align-items-center" title="INVENTAIRE" data-model="INVT">
                                <span>INVENTAIRE</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="MOUVEMENT TRANSFERT"
                                data-model="MVTR">
                                <span>MOUVEMENT TRANSFERT</span>
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
                            <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="filterDateEntet"
                                title="Filtre">
                                <i class="fa-solid fa-filter"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create"
                            role="insert">Créer</button>
                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="validerRow"
                            title="Valider" role="valider">
                            <i class="fa-solid fa-check-double"></i>
                        </button>
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
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="file"
                            title="Importer Des Fichier">
                            <i class="fa-solid fa-file"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdfEtat"
                            title="Télécharger Etat Inventaire PDF">
                            <i class="fa-solid fa-file-arrow-down"></i>
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
            <section class="screen-create d-none screen mt-3 INVT">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">INVENTAIRE</h2>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <button type="submit" form="formArticle"
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
                                <h4 class="card-title d-inline-block">Document #<span id="Numero_entet">...</span></h4>
                                <div class="heading-elements float-end">
                                    <ul class="list-inline mb-0">
                                        <li><a data-action="collapse" class="rotate"><i
                                                    class="fas fa-chevron-up"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-content collapse show">
                                <form class="needs-validation" id="formEntet" novalidate autocomplete="off">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="numFactur" name="numFactur"
                                                    class="form-control form-control-lg" readonly required />
                                                <label class="form-label" for="numFactur">Numéro</label>
                                            </div>
                                            <div class="ui calendar inputDate mb-3" id="dateEntet">
                                                <label class="form-label">Date</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idDepot" class="form-label me-1">Dépôt de stockage</label>
                                                <select class="form-select" name="idDepot" id="idDepot" required>
                                                </select>
                                            </div>
                                            <div class="mb-3 d-none">
                                                <label for="idDepot_2" class="form-label me-1">Dépôt de stockage
                                                    Arrive</label>
                                                <select class="form-select" name="idDepot_2" id="idDepot_2">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="refFactur" name="refFactur"
                                                    class="form-control form-control-lg" />
                                                <label class="form-label" for="refFactur">Référence</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="etatDoc" class="form-label">Etat</label>
                                                <select class="form-select" name="etatDoc" id="etatDoc">
                                                    <option>A préparer</option>
                                                    <option>Validé</option>
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <textarea class="form-control" name="info" id="info"
                                                    rows="3"></textarea>
                                                <label for="info" class="form-label">Info</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="checkExpiration" />
                                                <label class="form-check-label" for="checkExpiration">DLC</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card card-article px-2 mt-2">
                            <div class="row">
                                <div class="col-12">
                                    <div class="row inputSearchTable">
                                        <div class="col-4">
                                            <div class="form-outline  mb-3 mt-3">
                                                <input type="text" data-col="0" class="form-control form-control-lg" />
                                                <label class="form-label" for="Codebare">Code barre</label>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="form-outline mb-3 mt-3">
                                                <input type="text" data-col="1" class="form-control form-control-lg" />
                                                <label class="form-label" for="Ref">Nom d'article</label>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="mb-3 mt-3">
                                                <select class="form-select" data-col="2" id="idFamille">
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="btn btn-secondary btn-input mb-1 p-2 float-end"
                                                id="newArticle"><i class="fa-solid fa-plus"></i></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="tableArticleEntet">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="card px-2">
                            <div class="row" id="formLine" style="z-index: 1000;">                           
                                <div class="col" data-Depot="false">
                                    <div class="mb-3 mt-4">
                                        <select class="form-select" name="idSupDepot" id="idSupDepot">
                                        </select>
                                    </div>
                                </div>
                                <div class="col" data-Depot="false">
                                    <div class="mb-3 mt-4">
                                        <select class="form-select" name="idSupDepot_2" id="idSupDepot_2">
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="refArticle" class="form-control form-control-lg"
                                            readonly />
                                        <label class="form-label" for="refArticle">Référence</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="descLign" class="form-control form-control-lg" />
                                        <label class="form-label" for="descLign">Désignation</label>
                                    </div>
                                </div>
                                <div class="col d-none">
                                    <div class="ui calendar inputDate mb-3 mt-4" id="dateExpiration">
                                        <div class="ui input left icon">
                                            <i class="calendar icon"></i>
                                            <input type="text" placeholder="Date péremption">
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="qteLign" class="form-control form-control-lg" />
                                        <label class="form-label" for="qteLign">Qte</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="prixLign" class="form-control form-control-lg" />
                                        <label class="form-label" for="prixLign">Prix</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="totalLign" class="form-control form-control-lg"
                                            readonly />
                                        <label class="form-label" for="totalLign">Total</label>
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
                                <div class="tableEntetLign">

                                </div>
                            </div>
                        </div>
                        <div class="card px-2 mt-2">
                            <div class="row">
                                <div class="col-6 controleTotal">
                                    <table>
                                        <tr>
                                            <td>Total HT</td>
                                            <td class="TT_ht">0</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-6 controleInventer">
                                    <table>
                                        <tr>
                                            <td>Qte en Stock</td>
                                            <td class="qteDepot">0</td>
                                        </tr>
                                        <tr>
                                            <td>C.U.M.P</td>
                                            <td class="cmup">0</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
        <script src="../js/ModeleInventaire/custom.js"></script>
        <script type="module" src="../js/ModeleInventaire/core.js"></script>
    </body>

    </html>