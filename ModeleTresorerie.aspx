<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleTresorerie.aspx.cs" Inherits="ModeleTresorerie" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Modèle de Trésorerie</title>
    <link type="image/x-icon" rel="shortcut icon" href="../image/logo/leaderCRM.ico"/>  
    <link rel="stylesheet" href="../css/global.css"/> 
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
                        <li class="nav-item px-2 d-flex align-items-center" title="Compte à Compte" data-model="CPTCPT">
                            <span>Compte à Compte</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Les Recettes" data-model="RCT">
                            <span>Les Recettes</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Les Dépenses" data-model="DPS">
                            <span>Les Dépenses</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Solde Caisse" data-model="SoldTresor">
                            <span>Solde Caisse</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="Mouvement Caisse" data-model="MvmCaisse">
                            <span>Mouvement Caisse</span>
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
                        <div class="d-inline-block w-25 bg-white">
                            <select class="form-select d-inline-block" id="idTresoFiltrage">  
                            </select>
                        </div>
                        <div class="ui calendar date_range dateStart" id="dateStart">
                            <div class="ui input left icon">
                              <i class="calendar icon"></i>
                              <input type="text" placeholder="Start" />
                            </div>
                        </div>
                        <div class="ui calendar date_range dateEnd" id="dateEnd">
                            <div class="ui input left icon">
                              <i class="calendar icon"></i>
                              <input type="text" placeholder="End" />
                            </div>
                        </div>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" title="Date" id="filterDateEntet">
                            <i class="fa-solid fa-filter"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <button type="button" class="btn btn-success btn-rounded btn-create" role="insert">Créer</button> 
                </div>
                <div class="col-6 text-end">
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow" role="delete" title="Suprimmer">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf"title="Telecharger PDF">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel"title="Telecharger Excel">
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
            <div class="row">
                <div class="col-6 card m-auto">
                    <table class="w-100 totalTable d-none">
                        <tbody>
                            <tr>
                                <td>Solde Caisse :</td>
                                <td class="SoldCaisse" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                            <tr>
                                <td>Total Débit :</td>
                                <td class="TT_Debit" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                            <tr>
                                <td>Total Crédit :</td>
                                <td class="TT_Credit" style="border-right: 1px solid #dfdfdf;">...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="screen-create d-none screen mt-3 TresorerieEntet">
            <div class="row">
                <div class="col-4">
                    <h2 id="breadcrumb">Trésorerie</h2>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <button type="submit" form="formTresorerieEntet"  class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>                   
                </div>
            </div>
            <div class="card m-4 p-2">
                <form class="needs-validation" id="formTresorerieEntet" novalidate autocomplete="off">
                    <div class="row justify-content-center">
                        <div class="col-md-4">      
                            <div class="form-outline mb-3 mt-3">
                                <input type="text" id="numTresoEntet" name="numTresoEntet" class="form-control form-control-lg" readonly/>
                                <label class="form-label" for="numTresoEntet">Numéro</label>
                            </div>
                            <div class="ui calendar inputDate mb-3" id="dateTresoEntet">
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
                                    <option>Validé</option>
                                </select>
                            </div>  
                            <div class="mb-3">
                                <label for="idTreso" class="form-label">Trésororie</label>
                                <select class="form-select" name="idTreso" id="idTreso">
                                </select>
                            </div>   
                                
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3 mt-3">
                                <label for="idTreso_2" class="form-label">Compte à Transférer</label>
                                <select class="form-select" name="idTreso_2" id="idTreso_2">
                                </select>
                            </div>
                            
                            <div class="form-outline mb-3 mt-3">
                                <input type="text" id="banque" name="banque" class="form-control form-control-lg" />
                                <label class="form-label" for="banque">Banque</label>
                            </div>
                            <div class="form-outline mb-3">
                                <input type="text" id="numCheque" name="numCheque" class="form-control form-control-lg" />
                                <label class="form-label" for="numCheque">Numéro du chèque</label>
                            </div>   
                            <div class="mb-3">
                                <label for="idModRglm" class="form-label">Mode de Réglement</label>
                                <select class="form-select" name="idModRglm" id="idModRglm">
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="idService" class="form-label">Services</label>
                                <select class="form-select" name="idService" id="idService">
                                </select>
                            </div>  
                            <div class="form-outline mb-3">
                                <input type="text" id="montant" name="montant" class="form-control form-control-lg" />
                                <label class="form-label" for="montant">Montant</label>
                            </div> 
                            <div class="form-outline mb-3">
                                <input type="text" id="descTresoEntet" name="descTresoEntet" class="form-control form-control-lg" />
                                <label class="form-label" for="descTresoEntet">Description</label>
                            </div>  
                        </div>
                    </div>
                </form>
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
    <script src="../vendors/DataTables/date-eu.js"></script>
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
    <script src="../js/ModeleTresorerie/custom.js"></script>
    <script type="module" src="../js/ModeleTresorerie/core.js"></script>
</body>
</html>
