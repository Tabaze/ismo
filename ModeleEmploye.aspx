<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleEmploye.aspx.cs" Inherits="ModeleEmploye" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Modèle des Employées</title>
    <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico"/>  
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
                        <li class="nav-item px-5 d-flex align-items-center" title="Departement" data-model="Departement">
                            <span>Département</span>
                        </li>
                        <li class="nav-item px-5 d-flex align-items-center" title="Employee" data-model="Employee">
                            <span>Employées</span>
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
                    <button type="button" class="btn btn-light btn-rounded" role="insert" id="import">Importer</button>
                   <!--  <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                </div>
                <div class="col-6 text-end">
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow" role="delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel">
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
            <div class="modal-dialog modal-lg modal-dialog-centered Employees" style="max-width: 1156px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Employée</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formEmployee" novalidate autocomplete="off">
                        <div class="row justify-content-center">
                            <div class="col-md-4">      
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="nomEmployee" name="nomEmployee" class="form-control form-control-lg"/>
                                    <label class="form-label" for="nomEmployee">Nom Employée</label>
                                </div>
                                <div  class="mb-3">
                                    <label class="form-label">Informations Personnelles :</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="cinEmployee" name="cinEmployee" class="form-control form-control-lg"/>
                                    <label class="form-label" for="cinEmployee">CIN</label>
                                </div>
                                <div class="ui calendar inputDate mb-3" id="dateNaissance">
                                    <label class="form-label">Date Naissance</label>
                                    <div class="ui input left icon w-100">
                                      <i class="calendar icon"></i>
                                      <input type="text">
                                    </div>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="education" name="education" class="form-control form-control-lg"/>
                                    <label class="form-label" for="education">Education</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="passeport" name="passeport" class="form-control form-control-lg"/>
                                    <label class="form-label" for="passeport">Passeport</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="nbEnfants" name="nbEnfants" class="form-control form-control-lg"/>
                                    <label class="form-label" for="nbEnfants">Nombre d'enfants</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="numPermis" name="numPermis" class="form-control form-control-lg"/>
                                    <label class="form-label" for="numPermis">Numéro permis</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="etatCivil" name="etatCivil" class="form-control form-control-lg"/>
                                    <label class="form-label" for="etatCivil">Etat civil</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="contactPrive" name="contactPrive" class="form-control form-control-lg"/>
                                    <label class="form-label" for="contactPrive">Contact privé</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="telEmployee" name="telEmployee" class="form-control form-control-lg"/>
                                    <label class="form-label" for="telEmployee">Téléphone</label>
                                </div>      
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="emailEmployee" name="emailEmployee" class="form-control form-control-lg"/>
                                    <label class="form-label" for="emailEmployee">Email</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="adresseEmploye" name="adresseEmploye" class="form-control form-control-lg"/>
                                    <label class="form-label" for="adresseEmploye">Adresse</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3" style="margin-top: 78px;">
                                    <label class="form-label">Informations Professionnelles :</label>
                                </div>
                                <div class="mb-3">
                                    <label for="idDepartement" class="form-label">Département</label>
                                    <select class="form-select" name="idDepartement" id="idDepartement">
                                    </select>
                                </div> 
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="poste" name="poste" class="form-control form-control-lg"/>
                                    <label class="form-label" for="poste">Poste</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="pinPointage" name="pinPointage" class="form-control form-control-lg"/>
                                    <label class="form-label" for="pinPointage">Pin Pointage</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="numBadge" name="numBadge" class="form-control form-control-lg" />
                                    <label class="form-label" for="numBadge">Numéro Badge</label>
                                </div>
                                <div  class="mb-3">
                                    <label class="form-label">Contact Professionnel :</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="telProEmployee" name="telProEmployee" class="form-control form-control-lg"/>
                                    <label class="form-label" for="telProEmployee">Tel professionnel</label>
                                </div>      
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="emailProEmployee" name="emailProEmployee" class="form-control form-control-lg"/>
                                    <label class="form-label" for="emailProEmployee">Email</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="telFixe" name="telFixe" class="form-control form-control-lg"/>
                                    <label class="form-label" for="telFixe">Tel fixe</label>
                                </div>  
                                <div  class="mb-3">
                                    <label class="form-label">Banque :</label>
                                </div>
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="nomBanque" name="nomBanque" class="form-control form-control-lg"/>
                                    <label class="form-label" for="nomBanque">Nom de la banque</label>
                                </div>      
                                <div class="form-outline mb-3 mt-3">
                                    <input type="text" id="numCompte" name="numCompte" class="form-control form-control-lg"/>
                                    <label class="form-label" for="numCompte">Numéro du compte</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Departement">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Département</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formDepartement" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">    
                                <div class="tab-content">
                                    <div 
                                    class="tab-pane fade show active" 
                                    id="infoFournisseur-pane" role="tabpanel" 
                                    aria-labelledby="infoFournisseur-tab" tabindex="0">       
                                        <div class="form-outline mb-3">
                                            <input type="text" id="nomDepartement" name="nomDepartement" class="form-control"/>
                                            <label class="form-label" for="nomDepartement">Nom Département</label>          
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="descDepartement" name="descDepartement" class="form-control"/>
                                            <label class="form-label" for="descDepartement">Description Département</label>          
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
    <script src="../js/pdf.js"></script>
    <script src="../js/xlsx.js"></script>
    <script src="../js/menu.js"></script>
    <script src="../js/i18n.js"></script>
    <script src="../js/ittone.js"></script>
    <script src="../js/notification.js"></script>  
    <script src="../js/roles.js"></script>
    <script src="../js/ModeleEmploye/custom.js"></script>
    <script type="module" src="../js/ModeleEmploye/core.js"></script> 
</body>
</html>
