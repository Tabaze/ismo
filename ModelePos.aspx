<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModelePos.aspx.cs" Inherits="ModelePos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Point de Vente</title>
    <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico"/>  
    <link rel="stylesheet" href="../css/global.css"/>
    <link rel="stylesheet" href="../vendors/jqueryTransfer/icon_font/css/icon_font.css"/>
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
                        <li class="nav-item px-5 d-flex align-items-center" title="Point de vente" data-model="POS">
                            <span>Point de vente</span>
                        </li>
                        <li class="nav-item px-5 d-flex align-items-center" title="Caissier" data-model="Caissier">
                            <span>Caissier</span>
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
        </section>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Pos">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" >POS</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <ul class="nav nav-tabs" id="TabPOS" role="tablist">
                                    <li class="nav-item" role="presentation">
                                    <button 
                                    class="nav-link active" 
                                    id="Create-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#Create-pane" 
                                    type="button" role="tab" 
                                    aria-controls="Create-pane" 
                                    aria-selected="true">Create
                                    </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                    <button 
                                    class="nav-link"
                                    id="Menu-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#Menu-pane" 
                                    type="button" role="tab" 
                                    aria-controls="Menu-pane" 
                                    aria-selected="false" disabled>
                                    Menu</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                    <button 
                                    class="nav-link" 
                                    id="Regelement-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#Regelement-pane" 
                                    type="button" role="tab" 
                                    aria-controls="Regelement-pane" 
                                    aria-selected="false" disabled>Mode Regelement
                                    </button>
                                    </li>
                                </ul> 
                                <div class="tab-content" id="tbContentPos">
                                    <div 
                                    class="tab-pane fade show active" 
                                    id="Create-pane" role="tabpanel" 
                                    aria-labelledby="Create-tab" tabindex="0">
                                        <form class="needs-validation" id="formPos" novalidate autocomplete="off">
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-outline mb-3 mt-4">
                                                        <input type="text" id="tokenPos" name="tokenPos" class="form-control"/>
                                                        <label class="form-label" for="tokenPos">Code Pos</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="namePos" name="namePos" class="form-control" required/>
                                                        <div class="invalid-feedback sty-feedback">
                                                            Nom Pos is required
                                                        </div>
                                                        <label class="form-label" for="namePos">Nom Pos</label>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="idTreso" class="form-label">Tresororie</label>
                                                        <select class="form-select" name="idTreso" id="idTreso">
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="idDepot" class="form-label">Depot</label>
                                                        <select class="form-select" name="idDepot" id="idDepot"></select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="clientDivers" class="form-label">Client Divers</label>
                                                        <select class="form-select" name="clientDivers" id="clientDivers">
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="idDossier" class="form-label">Dossier</label>
                                                        <select class="form-select" name="idDossier" id="idDossier">
                                                        </select>
                                                    </div>
                                                    <div class="form-check mb-3">
                                                        <input class="form-check-input" type="checkbox" id="checkOpenSession" />
                                                        <label class="form-check-label" for="checkOpenSession">checkOpenSession</label>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-outline mb-3">
                                                        <textarea class="form-control" name="titrePos" id="titrePos" rows="5"></textarea>
                                                        <label for="titrePos" class="form-label">Pos Titre</label>
                                                    </div>
                                                    <div class="form-outline mb-3">
                                                        <textarea class="form-control" name="souTitrePos" id="souTitrePos" rows="5"></textarea>
                                                        <label for="souTitrePos" class="form-label">Pos sous Titre</label>
                                                    </div>
                                                    <div class="form-check mb-3">
                                                        <input class="form-check-input" type="checkbox" id="checkEmail" />
                                                        <label class="form-check-label" for="checkEmail">Envoyer un e-mail en Clouter</label>
                                                    </div>
                                                    <div class="form-outline mb-3 d-none">
                                                        <input type="text" id="emailSend" name="emailSend" class="form-control"/>
                                                        <label class="form-label" for="emailSend">e-mail</label>
                                                    </div>
                                                </div>
                                            </div> 
                                            <button type="submit" class="d-none" id="btnPos"></button>  
                                        </form>                                            
                                    </div>
                                    <div 
                                    class="tab-pane fade" 
                                    id="Menu-pane" role="tabpanel" 
                                    aria-labelledby="Menu-tab" tabindex="1">
                                    <div id="transferFamille" class="transfer-demo d-flex justify-content-center mt-4"></div>
                                    </div>
                                    <div 
                                    class="tab-pane fade" 
                                    id="Regelement-pane" 
                                    href="#"
                                    role="tabpanel" 
                                    aria-labelledby="Regelement-tab" tabindex="2">
                                        <section class="tasks" id="idSection">
                                            <header class="tasks-header">
                                                <select class="js-example-basic-multiple js-states form-control" id="idModRglm"></select>
                                                <button class="btn btn-primary btn-sm " onclick="return false">Ajouter</button>
                                            </header>
                                            <fieldset class="tasks-list">
                                            </fieldset>
                                        </section>
                                    </div>
                                </div>                            
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="button" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                        </div>
                </div>
            </div>    
        </div>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Caissier">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Caissier</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formCaissier" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="form-outline mb-3 mt-4">
                                    <input type="text" id="nameCaissier" name="nameCaissier" class="form-control" required/>
                                    <div class="invalid-feedback sty-feedback">
                                        Nom Caissier is required
                                    </div>
                                    <label class="form-label" for="nameCaissier">Nom Caissier</label>          
                                </div> 
                                <div class="form-outline mb-3">
                                    <input type="text" id="userName" name="userName" class="form-control"/>
                                    <label class="form-label" for="userName">User Name Caissier</label>          
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="passCaissier" name="passCaissier"  class="form-control"/>
                                    <label class="form-label" for="passCaissier">Mot de passe</label>          
                                </div> 
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="adminCaissier" />
                                            <label class="form-check-label" for="adminCaissier">Admin</label>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="avoirCheck" />
                                            <label class="form-check-label" for="avoirCheck">avoirCheck</label>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="prixCheck" />
                                            <label class="form-check-label" for="prixCheck">prixCheck</label>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="remCheck" />
                                            <label class="form-check-label" for="remCheck">remCheck</label>
                                        </div>  
                                    </div>
                                    <div class="col-4">
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="fermerCheck" />
                                            <label class="form-check-label" for="fermerCheck">fermerCheck</label>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="archiveChecke" />
                                            <label class="form-check-label" for="archiveChecke">archiveChecke</label>
                                        </div>  
                                    </div>
                                </div>                                                       
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
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
    <script src="../vendors/jqueryTransfer/js/jquery.transfer.js"></script>
    <script src="../js/pdf.js"></script>
    <script src="../js/xlsx.js"></script>
    <script src="../js/menu.js"></script>
    <script src="../js/i18n.js"></script>
    <script src="../js/ittone.js"></script>
    <script src="../js/notification.js"></script>  
    <script src="../js/roles.js"></script>
    <script src="../js/ModelePos/custom.js"></script>
    <script type="module" src="../js/ModelePos/core.js"></script> 
</body>
</html>
