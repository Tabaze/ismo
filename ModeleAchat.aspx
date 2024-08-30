<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleAchat.aspx.cs" Inherits="ModeleAchat" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modele de Achat</title>
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
                            <!-- <li class="nav-item px-2 d-flex align-items-center" title="D-D'ACHAT" data-model="DMNDA">
                            <span>D-D'ACHAT</span>
                        </li> -->
                            <li class="nav-item px-2 d-flex align-items-center" title="B.COMMANDE-FR" data-model="BCFR">
                                <span>B.COMMANDE-FR</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="B.LIVRAISON-FR"
                                data-model="BLFFR">
                                <span>B.LIVRAISON-FR</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="FACTURE-FR" data-model="FFR">
                                <span>FACTURE-FR</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="FACTURE-PROFORMA" data-model="FPRA">
                                <span>FACTURE-PROFORMA</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="B.RETOUR-FR" data-model="BRFR">
                                <span>B.RETOUR-FR</span>
                            </li>
                            <li class="nav-item px-2 d-flex align-items-center" title="B.AVOIR-FR" data-model="BAVFR">
                                <span>B.AVOIR-FR</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-4 col-md-3 text-end fs-5 justify-content-end">
                        <span class="fs-6 mx-2 text-white-opacity hide-on-mobile nomDossier">...</span>
                        <span class="p-2" id="notification"><i class="fa-solid fa-bell"></i></span>
                        <span class="p-2 me-2 lin-h"title="Fermer Dossier" id="ferme"><i class="fa-solid fa-right-to-bracket"></i></span>
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
                                id="filterDateEntet">
                                <i class="fa-solid fa-filter"></i>
                            </button>
                            <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" title="Echeance"
                                id="filterDateEcheanche">
                                <i class="fa-solid fa-filter-circle-dollar"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create"
                            role="insert">Créer</button>
                        <button type="button" class="btn btn-light btn-rounded" role="insert" id="copierVers"
                            data-bs-toggle="dropdown" aria-expanded="false">Copier Vers</button>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="copierVers" id="listCopier">
                            <li><button class="dropdown-item" data-model="BLFFR">B.LIVRAISON-FR</button></li>
                            <li><button class="dropdown-item" data-model="FFR">FACTURE-FR</button></li>
                            <li><button class="dropdown-item" data-model="FPRA">FACTURE-PROFORMA</button></li>
                            <li><button class="dropdown-item" data-model="BRFR">B.RETOUR-FR</button></li>
                            <li><a class="dropdown-item" data-model="BAVFR">B.AVOIR-FR</a></li>
                        </ul>
                        <button type="button" class="btn btn-light btn-rounded" id="imprementEntet"
                            role="imprimer">Imprimer</button>
                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="rgc" role="insert" title="Reglement Fournisseur">
                            <i class="fa-solid fa-hand-holding-dollar"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="validerRow" title="Valider"
                            role="valider">
                            <i class="fa-solid fa-check-double"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="cloturRow" title="Cloture"
                            role="clotur">
                            <i class="fa-solid fa-lock"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow" title="Supprimer"
                            role="delete">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf" title="Telecherger PDF">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel" title="Telecherger Excel">
                            <i class="fa-solid fa-file-excel"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="file" title="Importer Des Fichier">
                            <i class="fa-solid fa-file"></i>
                        </button>
                    </div>
                </div>
                <div class="row m-2  p-1 card">
                    <div class="col-12">
                        <div class="tableView">

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 card m-auto">
                        <table class="w-100 totalTable">
                            <tbody>
                                <tr>
                                    <td>Total HT Page:</td>
                                    <td class="cTT_ht" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <td>Total T.V.A Page:</td>
                                    <td class="cTT_tva" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <td>Total T.T.C Page:</td>
                                    <td class="cTT_ttc">...</td>
                                </tr>
                                <tr>
                                    <td>Total HT :</td>
                                    <td class="TT_ht" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <td>Total T.V.A :</td>
                                    <td class="TT_tva" style="border-right: 1px solid #dfdfdf;">...</td>
                                    <td>Total T.T.C :</td>
                                    <td class="TT_ttc">...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section class="screen-create d-none screen mt-3 INVT">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">Achat</h2>
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
                                            <div class="ui calendar inputDate mb-3" id="dateEcheanche">
                                                <label class="form-label">Echéance</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="etatDoc" class="form-label">Etat</label>
                                                <select class="form-select" name="etatDoc" id="etatDoc">
                                                    <option>saisir</option>
                                                    <option>A préparer</option>
                                                    <option>Annuler</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idDepot" class="form-label me-1">Dépôt de stockage</label>
                                                <select class="form-select" name="idDepot" id="idDepot" required>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idModRglm" class="form-label me-1">Mode de réglement</label>
                                                <select class="form-select" name="idModRglm" id="idModRglm">
                                                </select>
                                            </div>
                                            <div class="form-outline d-none mb-3">
                                                <input type="text" id="numCheq" name="numCheq"
                                                    class="form-control form-control-lg" />
                                                <label class="form-label" for="numCheq">Numéro du Chèque</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="refFactur" name="refFactur"
                                                    class="form-control form-control-lg" />
                                                <label class="form-label" for="refFactur">Référence</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="obs" class="form-label">Etat</label>
                                                <select class="form-select" name="obs" id="obs">
                                                    <option>Copie</option>
                                                    <option>Origine</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idFournisseur" class="form-label me-1">Compte</label>
                                                <span class="btn btn-secondary btn-input mb-1 p-2 float-end"
                                                    id="newCompte"><i class="fa-solid fa-plus"></i></span>
                                                <select class="form-select" name="idFournisseur" id="idFournisseur">
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="nom" name="nom"
                                                    class="form-control form-control-lg" />
                                                <label class="form-label" for="nom">Nom Fournisseur</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <textarea class="form-control" name="info" id="info"
                                                    rows="3"></textarea>
                                                <label for="info" class="form-label">Info</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <textarea class="form-control" name="terms" id="terms"
                                                    rows="3"></textarea>
                                                <label for="terms" class="form-label">Observation</label>
                                            </div>
                                            <!-- <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="tva" />
                                                <label class="form-check-label" for="tva">TVA</label>
                                                <div></div>
                                                <input class="form-check-input" type="checkbox" id="ttc" />
                                                <label class="form-check-label" for="ttc">TTC</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="checkExpiration" />
                                                <label class="form-check-label" for="checkExpiration">DLC</label>
                                            </div> -->
                                            <div>
                                                <div class="form-check w-25 d-inline-block mb-3 mt-4">
                                                    <input class="form-check-input" type="checkbox" id="tva" />
                                                    <label class="form-check-label" for="tva">TVA</label>
                                                </div>
                                                <div class="form-check w-25 d-inline-block mb-3">
                                                    <input class="form-check-input" type="checkbox" id="ttc" />
                                                    <label class="form-check-label" for="ttc">TTC</label>
                                                </div>
                                                <div class="form-check w-25 d-inline-block mb-3">
                                                    <input class="form-check-input" type="checkbox" id="checkExpiration" />
                                                    <label class="form-check-label" for="checkExpiration">DLC</label>
                                                </div>
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
                                                <label class="form-label" for="Ref">Réf</label>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="form-outline mb-3 mt-3">
                                                <input type="text" data-col="2" class="form-control form-control-lg" />
                                                <label class="form-label" for="Désignation">Désignation</label>
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
                                        <input type="text" id="lgnRemise" class="form-control form-control-lg" />
                                        <label class="form-label" for="lgnRemise">Remise</label>
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
                            <div class="row p-3">
                                <div class="col-4 m-auto controleTotal">
                                    <table class="w-100">
                                        <tr>
                                            <td>Total Remise</td>
                                            <td class="TT_remis">0</td>
                                        </tr>
                                        <tr>
                                            <td>Total HT</td>
                                            <td class="TT_ht">0</td>
                                        </tr>
                                        <tr>
                                            <td>Total T.V.A</td>
                                            <td class="TT_tva">0</td>
                                        </tr>
                                        <tr>
                                            <td>Total T.T.C</td>
                                            <td class="TT_ttc">0</td>
                                        </tr>
                                        <tr>
                                            <td>Net à Payer</td>
                                            <td class="TT_net">0</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-4 m-auto controleInventer">
                                    <table class="w-100">
                                        <tr>
                                            <td>Qte en Stock</td>
                                            <td class="qteDepot">0</td>
                                        </tr>
                                        <tr>
                                            <td>C.M.U.P</td>
                                            <td class="cmup">0</td>
                                        </tr>
                                        <tr>
                                            <td>Solde Fournisseur</td>
                                            <td class="sold">0</td>
                                        </tr>
                                        <tr>
                                            <td>En cours Max</td>
                                            <td class="EncoursMax">0</td>
                                        </tr>
                                        <tr>
                                            <td>Solvabilité</td>
                                            <td class="Solvabilité">0</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Reglement">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Mode Réglement</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formReglement" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col">
                                            <div class="ui calendar inputDate mb-3" id="dateReglement">
                                                <label class="form-label">Date</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text" required>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idTreso" class="form-label">Trésororie</label>
                                                <select class="form-select" name="idTreso" id="idTreso" required>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idReg" class="form-label me-1">Mode de réglement</label>
                                                <select class="form-select" name="codeType" id="idReg" required>
                                                    <option value="ESPF">Espèce</option>
                                                    <option value="CHFFF">Chèque</option>
                                                    <option value="EFFETFR">Effet de commerce</option>
                                                    <option value="VRMBNQFR">Virement bancaire</option>
                                                    <option value="PRLFR">Prélèvement</option>
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="numReg" name="numReglement"
                                                    class="form-control form-control-lg" readonly />
                                                <label class="form-label" for="numReg">Numéro de réglement</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="banque" name="banque"
                                                    class="form-control form-control-lg" />
                                                <label class="form-label" for="banque">Banque</label>
                                            </div>
                                            <div class="form-outline mb-3 d-none">
                                                <input type="text" id="numCh" name="numCheque"
                                                    class="form-control form-control-lg" />
                                                <label class="form-label" for="numCh">Numéro du Chèque</label>
                                            </div>
                                            <div class="ui calendar inputDate mb-3" id="dateEcheancheRG">
                                                <label class="form-label">Echéance</label>
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
        <script src="../vendors/DataTables/date-eu.js"></script>
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
        <script src="../js/ModeleAchat/custom.js"></script>
        <script type="module" src="../js/ModeleAchat/core.js"></script>
    </body>

    </html>