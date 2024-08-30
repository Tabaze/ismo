<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleBase.aspx.cs" Inherits="ModeleBase" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Modele de Base</title>
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
                        <!-- <li class="nav-item px-2 d-flex d-none align-items-center" title="Dépôts" data-model="Depot">
                            <span>Entrepôts</span>
                        </li>
                        <li class="nav-item px-2 d-flex d-none align-items-center" title="Emplacement" data-model="DepotSup">
                            <span>Emplacement</span>
                        </li> -->
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Tresoreries" data-model="Tresororie">
                            <span>
                                Trésoreries
                            </span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Villes" data-model="Ville">
                            <span>
                                Villes
                            </span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Pays" data-model="Pays">
                            <span>
                                Pays
                            </span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Mode Règlement" data-model="ModRglm">
                            <span>Mode Règlement</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Modele TVA" data-model="Taxe">
                            <span>TVA</span>
                        </li>
                        <!-- <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Service" data-model="Service">
                            <span>Service</span>
                        </li> -->
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Unité de Mesure" data-model="uniteMesure">
                            <span>UM</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Origine du contact" data-model="OriContact">
                            <span>Origine du contact </span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Industrie" data-model="Industrie">
                            <span>Industrie</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Catégorie" data-model="Categorie">
                            <span>Catégorie</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Type" data-model="Type">
                            <span>Type</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Potentiel du Société" data-model="PotClient">
                            <span>Potentiel du Société</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Propriété" data-model="Propriete">
                            <span>Propriété</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Relation Client" data-model="Relation">
                            <span>Relation Client</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Rubrique" data-model="Rebrique">
                            <span>Rubrique</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Categorie Woo" data-model="CategorieWoo">
                            <span>Categorie Woo</span>
                        </li>
                        <li class="nav-item px-2 mx-1 d-flex d-none align-items-center" title="Type Action" data-model="TypeAction">
                            <span>Type Action</span>
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
                     <button type="button" class="btn btn-light btn-rounded d-none" id="importer">Importer</button>
                    <!--<button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                </div>
                <div class="col-6 text-end">
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow" role="delete" title="Supprimmer">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdf" title="Telecharger PDF">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excel" title="Telecharger Excel">
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
            <div class="modal-dialog modal-lg modal-dialog-centered Depot">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Dépôt</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formDepot" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomDepot" name="nomDepot" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Dépôt est obligatoire
                                                </div>
                                                <label class="form-label" for="nomDepot">Nom Dépôt</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="adressDepot" name="adressDepot" class="form-control"/>
                                                <label class="form-label" for="nomDepot">Adresse Dépôt</label>          
                                            </div> 
                                            <div class="mb-3">
                                                <label for="idPays"  class="form-label">Pays</label>
                                                <select class="form-select" name="idPays" id="idPays">
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idVille" class="form-label">Ville</label>
                                                <select class="form-select" name="idVille" id="idVille">
                                                </select>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="prcpDepot" />
                                                <label class="form-check-label" for="prcpDepot">Dépôt Principal</label>
                                            </div>
                                        </div>
                                </div> 
                                <!-- <button type="submit" class="d-none" id="btnDepot"></button>   -->
                                
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered DepotSup">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Emplacement</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formDepotSup" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomSupDepot" name="nomSupDepot" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom d'emplacement est obligatoire
                                                </div>
                                                <label class="form-label" for="nomSupDepot">Nom d'emplacement</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="typeSupDepot" name="typeSupDepot" class="form-control"/>
                                                <label class="form-label" for="typeSupDepot">Type Dépôt</label>          
                                            </div> 
                                            <div class="mb-3">
                                                <label for="idDepot" class="form-label">Dépôt</label>
                                                <select class="form-select" name="idDepot" id="idDepot">
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="couloirX" name="couloirX" class="form-control"/>
                                                <label class="form-label" for="couloirX">Couloir X</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="rayonY" name="rayonY" class="form-control"/>
                                                <label class="form-label" for="rayonY">Rayon Y</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="hauteur" name="hauteur" class="form-control"/>
                                                <label class="form-label" for="hauteur">Hauteur Z</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="codeBare" name="codeBare" class="form-control"/>
                                                <label class="form-label" for="codeBare">Code Barre</label>          
                                            </div> 
                                        </div>
                                </div> 
                                <!-- <button type="submit" class="d-none" id="btnDepot"></button>   -->
                                
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Tresor">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Trésoreries</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formTresor" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nameTreso" name="nameTreso" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Trésorerie est obligatoire
                                                </div>
                                                <label class="form-label" for="nameTreso">Nom Trésorerie</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="adresseTreso" name="adresseTreso" class="form-control"/>
                                                <label class="form-label" for="adresseTreso">Adresse Trésorerie</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="ribTreso" name="ribTreso" class="form-control"/>
                                                <label class="form-label" for="ribTreso">RIB</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="soldAutoriseTreso" name="soldAutoriseTreso" class="form-control"/>
                                                <label class="form-label" for="soldAutoriseTreso">Solde Autorisé Caisse</label>          
                                            </div> 
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="defaultTreso" />
                                                <label class="form-check-label" for="defaultTreso">Trésorerie Principale</label>
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Ville">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ville</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formVille" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">      
                                <div class="row">
                                        <label class="form-label" for="idPays">Pays</label>   
                                        <select class="form-select" name="idPays" id="idPays">
                                        </select>   
                                </div>
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomVille" name="nomVille" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Ville est obligatoire
                                                </div>
                                                <label class="form-label" for="nomVille">Nom Ville</label>          
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Pays">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Pays</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formPays" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                          
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="idPays" name="idPays" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Code Pays est obligatoire
                                                </div>
                                                <label class="form-label" for="idPays">Code Pays</label>          
                                            </div> 
                                        </div>
                                </div>                          
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomPays" name="nomPays" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Pays est obligatoire
                                                </div>
                                                <label class="form-label" for="nomPays">Nom Pays</label>          
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered ModRglm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Fiche Reg</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formModRglm" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomModRglm" name="nomModRglm" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Mode Règlement est obligatoire
                                                </div>
                                                <label class="form-label" for="nomModRglm">Mode Règlement</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="timbre" name="timbre" class="form-control"/>
                                                <label class="form-label" for="timbre">Timbre</label>          
                                            </div> 
                                            <div class="mb-3">
                                                <label for="categModRglm" class="form-label">Catégories</label>
                                                <select class="form-select" name="categModRglm" id="categModRglm">
                                                    <option value="espece">Espéce</option>
                                                    <option value="credit">Crédit</option>
                                                    <option value="cheque">Chèque</option>
                                                    <option value="cartebancaire">Carte bancaire</option>
                                                </select>
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Taxe">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Fiche de Taxe</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formTaxe" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomTaxe" name="nomTaxe" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Description de la taxe est obligatoire
                                                </div>
                                                <label class="form-label" for="nomTaxe">Description de la Taxe</label>          
                                            </div> 
                                            <div class="mb-3">
                                                <label for="typeTaxe" class="form-label">Type de Taxe</label>
                                                <select class="form-select" name="typeTaxe" id="typeTaxe">
                                                    <option value="collectee">Collectée</option>
                                                    <option value="deductible">Déductible</option>
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="cauxTaxe" name="cauxTaxe" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                   Le Taux est obligatoire
                                                </div>
                                                <label class="form-label" for="cauxTaxe">Taux</label>          
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Service">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Service</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formService" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomService" name="nomService" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Service est obligatoire
                                                </div>
                                                <label class="form-label" for="nomService">Nom Service</label>          
                                            </div> 
                                            <div class="form-outline mb-3">
                                                <input type="text" id="descService" name="descService" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Description service est obligatoire
                                                </div>
                                                <label class="form-label" for="descService">Description Service</label>          
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered uniteMesure">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Unité de Mesure</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formUniteMesure" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="descUnite" name="descUnite" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Description est obligatoire
                                                </div>
                                                <label class="form-label" for="descUnite">Decsription</label>          
                                            </div> 
                                        </div>
                                </div> 
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" id="prcpUnite" />
                                    <label class="form-check-label" for="prcpUnite">Unité Principale</label>
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
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Propriete">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Propriété</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formPropriete" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomPropriete" name="nomPropriete" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Propriété est obligatoire
                                                </div>
                                                <label class="form-label" for="nomPropriete">Nom Propriété</label>          
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
    <script src="../js/ModeleBase/custom.js"></script>
    <script type="module" src="../js/ModeleBase/core.js"></script> 
    <script>
        // $(document).ready(function() {
        //     $('#example1').DataTable({
        //         language: {
        //             searchBuilder: {
        //                     add: '+',
        //                     condition: 'Comparator',
        //                     clearAll: '<i class="fa-solid fa-rotate-right"></i>',
        //                     delete: '<i class="fa-solid fa-trash"></i>',
        //                     deleteTitle: 'Delete Title',
        //                     data: 'Column',
        //                     left: 'Left',
        //                     leftTitle: 'Left Title',
        //                     logicAnd: '&&',
        //                     logicOr: '||',
        //                     right: 'Right',
        //                     rightTitle: 'Right Title',
        //                     title: {
        //                         0: 'Filters',
        //                         _: 'Filters (%d)'
        //                     },
        //                     value: 'Option',
        //                     valueJoiner: 'et',
        //                     button: '<i class="fa-solid fa-filter"></i>',
        //             },
        //             url: "vendors/DataTables/i18n/French.json",
        //         },
                
        //         buttons:[
        //             'searchBuilder'
        //         ],
        //         dom: 'Bfrtip',
        //         select: {
        //             toggleable: false
        //         },
        //         deferRender:    true,
        //         scrollY:        500,
        //         scrollCollapse: true,
        //         scroller:       true
        //     });
        // });
        //$.fn.dataTable.moment( 'dd/mm/YYYY' );
    </script>
</body>
</html>
