<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleFabrication.aspx.cs" Inherits="ModeleFabrication" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Modele de Fabrication</title>
    <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico"/>  
    <link rel="stylesheet" href="../css/global.css"/> 
    <link rel="stylesheet" href="../vendors/jqueryTransfer/icon_font/css/icon_font.css"/>
    <style>
        .ui-sortable-placeholder {
            outline: 2px solid rgb(94, 94, 94);
            background-color: rgba(94, 94, 94, 0.459);
            visibility: visible !important;
        }
        .sticky {
            color: #ec4642;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: not-allowed;
        }
        .ui-sortable-helper{
            transform: rotate(10deg);
        }
        .showLineSetting{
            float: right;
            cursor: pointer;
            color: var(--color-ittone-3);
            margin-right: 10px;
        }
        @keyframes rotation {
            50% {
                -webkit-transform: rotateZ(90deg);
                        transform: rotateZ(90deg);
            }
           
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
                        <li class="nav-item px-2 d-flex align-items-center" title="FICHE DE NOMENCLATURE" data-model="Fabrication">
                            <span>FICHE DE NOMENCLATURE</span>
                        </li>
                        <li class="nav-item px-2 d-flex align-items-center" title="ORDRE DE FABRICATION" data-model="Ordre">
                            <span>ORDRE DE FABRICATION</span>
                        </li>
                    </ul>
                </div>
                <div class="col-4 col-md-3 text-end fs-5 justify-content-end">
                    <span class="fs-6 mx-2 text-white-opacity hide-on-mobile nomDossier">...</span>
                    <span class="p-2" id="notification"><i class="fa-solid fa-bell"></i>
                        <div class="box">
                            <div class="display"></div>
                        </div>
                    </span>
                    <span class="p-2 me-2 lin-h"title="Fermer Dossier" id="ferme"><i class="fa-solid fa-right-to-bracket"></i></span>
                </div>
            </div>
        </header>
        <section class="screen-afficher  screen mt-3">
            <div class="row">
                <div class="col-4">
                    <h2 id="breadcrumb">...</h2>
                </div>
                <div class="col-8">
                    <!-- <div class="form-outline mb-3 mt-4">
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
                    </div> -->
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
        <section class="screen-create d-none screen mt-3 Fabrication">
            <div class="row">
                <div class="col-4">
                    <h2 id="breadcrumb">Fabrication</h2>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <button type="submit" form="formFabrication"  class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>                   
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-5">
                    <div class="card px-2">
                        <div class="card-header">
                            <h4 class="card-title d-inline-block"><span id="reference_Fabrication">...</span></h4>
                            <div class="heading-elements float-end">
                                <ul class="list-inline mb-0">
                                    <li><a data-action="collapse" class="rotate"><i class="fas fa-chevron-up"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-content collapse show">
                            <form class="needs-validation" id="formFabrication" novalidate autocomplete="off">
                                <div class="row">
                                    <div class="col-8">
                                        <div class="form-outline mb-3 mt-4">
                                            <input type="text" id="reference" name="reference" class="form-control form-control-lg" required/>
                                            <label class="form-label" for="reference">Référence</label>
                                        </div> 
                                        <div class="mb-3 mt-2">
                                            <label for="idArticle" class="form-label me-1">Article</label>
                                            <select class="form-select" name="idArticle" id="idArticle">                                
                                            </select>
                                        </div>                                      
                                    </div>
                                    <div class="col-4">
                                        <div class="form-outline mb-3 mt-4">
                                            <textarea class="form-control" name="info" id="info" rows="5"></textarea>
                                            <label for="info" class="form-label">Info</label>
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
                                    <div class="col-6">
                                        <div class="form-outline  mb-3 mt-3">
                                            <input type="text" data-col="0" class="form-control form-control-lg"/>
                                            <label class="form-label" for="Codebare">Famille</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-outline mb-3 mt-3">
                                            <input type="text" data-col="1" class="form-control form-control-lg"/>
                                            <label class="form-label" for="Ref">Nom d'article</label>
                                        </div>
                                    </div>
                                   <%-- <div class="col-4">
                                        <div class="form-outline mb-3 mt-3">
                                            <input type="text" data-col="2" class="form-control form-control-lg"/>
                                            <label class="form-label" for="Désignation">Désignation</label>
                                        </div>
                                    </div>--%>
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
                            <div class="col">
                                <div class="form-outline mb-3 mt-4">
                                    <input type="text" id="qteFabrication" class="form-control form-control-lg"/>
                                    <label class="form-label" for="qteFabrication">Qte NomenClature</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-outline mb-3 mt-4">
                                    <input type="text" id="refArticle" class="form-control form-control-lg" readonly/>
                                    <label class="form-label" for="refArticle">Référence d'article</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-outline mb-3 mt-4">
                                    <input type="text" id="descLign"class="form-control form-control-lg"/>
                                    <label class="form-label" for="descLign">Désignation</label>
                                </div>
                            </div>                            
                            <div class="col">
                                <div class="form-outline mb-3 mt-4">
                                    <input type="text" id="qteLignFabrication" class="form-control form-control-lg" />
                                    <label class="form-label" for="qteLignFabrication">Qte de Fabrication</label>
                                </div>
                            </div>
                            <div class="col d-flex align-items-center justify-content-around">
                                <span class="btn btn-secondary btn-input" style="padding: 6px 12px;" id="ajouterLign"><i class="fa fa-lg fas fa-level-down-alt"></i></span>
                                <span class="btn btn-secondary btn-input" style="padding: 6px 12px;" id="annulerLign"><i class="fa fa-lg fas fa-times"></i></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="tableFabricationLign" >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="screen-afficher-Ordre d-none screen mt-3">
            <div class="row">
                <div class="col-4">
                    <h2 id="breadcrumb">Ordre</h2>
                </div>
                <div class="col-8">
                    <div class="form-outline mb-3 mt-4">
                        <select class="form-select w-25 d-inline-block" id="filterStatment">
                            <option value="createDate">DC</option>
                            <option value="datePlanification">DD</option>
                            <option value="dateEndPlanification">DF</option>
                        </select>
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
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteOrdre" role="delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="pdfOrdre">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="excelOrdre">
                        <i class="fa-solid fa-file-excel"></i>
                    </button>
                    <div class="vl">
                    </div>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating active" id="tableView">
                        <i class="fa-solid fa-list-ul"></i>
                    </button>
                    <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="kaibanView">
                        <i class="fa-solid fa-th-large"></i>
                    </button>
                </div>
            </div>
            <div class="row m-2  p-1 card">
                <div class="col-12">
                    <div class="tableView">
                        
                    </div> 
                    <div class="kaibanView d-none">

                    </div>                   
                </div>
            </div>
          
        </section>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Ordre">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Ordre</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formOrdre" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-outline mb-3 mt-4">
                                            <input type="text" id="numOrdre" name="numOrdre" class="form-control" required readonly/>
                                            <div class="invalid-feedback sty-feedback">
                                                Numéro d'ordre est obligatoire
                                            </div>
                                            <label class="form-label" for="numOrdre">Numéro d'ordre</label>          
                                        </div> 
                                        <div class="ui calendar inputDate mb-3" id="datePlanification">
                                            <label class="form-label">Date de la Planification</label>
                                            <div class="ui input left icon w-100">
                                              <i class="calendar icon"></i>
                                              <input type="text">
                                            </div>
                                        </div>
                                        <div class="ui calendar inputDate mb-3" id="dateEndPlanification">
                                            <label class="form-label">Date Fin de la Planification</label>
                                            <div class="ui input left icon w-100">
                                              <i class="calendar icon"></i>
                                              <input type="text">
                                            </div>
                                        </div>
                                        <div class="form-outline mb-3 mt-4">
                                            <input type="text" id="numberPerson" name="numberPerson" class="form-control" />
                                            <label class="form-label" for="numberPerson">Personne</label>          
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3 mt-4">
                                            <label for="idDepot" class="form-label me-1">Dépôt de stockage</label>
                                            <select class="form-select" name="idDepot" id="idDepot">                                
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="idFabrication" class="form-label me-1">Fiche</label>
                                            <select class="form-select" name="idFabrication" id="idFabrication">                                
                                            </select>
                                        </div>
                                        <!-- <div class="form-outline mb-3">
                                            <input type="text" id="qteOrdre" name="qteOrdre" class="form-control form-control-lg" required/>
                                            <label class="form-label" for="qteOrdre">Quantité à Produire</label>
                                        </div> -->
                                        <div class="row m-0 mb-3 mt-4 align-items-center">
                                            <div class="form-outline col-8 col-md-10">
                                                <input type="text" id="qteOrdre" name="qteOrdre" class="form-control"/>
                                                <label class="form-label" for="qteOrdre">Quantité à Produire</label>
                                            </div>
                                            <div class="col-2">
                                                <span class="btn btn-secondary btn-input" id="getQteCommand"><i class="fa fa-lg fas fa-arrow-left"></i></span>
                                            </div>            
                                        </div>  
                                        <div class="col-6 d-inline-block">
                                            <span class="btn btn-secondary btn-input" id="checkStock"><i class="fa fa-lg fas fa-sync"></i> VERIFICATION DE STOCK</span>
                                        </div>
                                        <div class="col-4 d-inline-block">
                                            <span class="btn btn-secondary btn-input" id="btnCalculQte"><i class="fa fa-lg fas fa-arrow-up"></i> Calcul Qte</span>
                                        </div>
                                    </div>
                                </div> 
                                <div class="row">
                                    <div class="col" id="tablelistArticleStock">

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
            <div class="modal-dialog modal-l modal-dialog-centered validerOrdre">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Valider Ordre</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formValiderOrdre" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                    <div class="col">
                                        <div class="form-outline mb-3">
                                            <input type="text" id="qteOrdre1" name="qteOrdre1" class="form-control form-control-lg" readonly />
                                            <label class="form-label" for="qteOrdre1">Quantité à fabriquer</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="qteOrdreValider" name="qteOrdreValider" class="form-control form-control-lg" required/>
                                            <label class="form-label" for="qteOrdreValider">Quantité fabriquée</label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="qteOrdreTrash" name="qteOrdreTrash" class="form-control form-control-lg" required/>
                                            <label class="form-label" for="qteOrdreTrash">Quantité Perdue </label>
                                        </div>
                                        <div class="form-outline mb-3">
                                            <input type="text" id="qteOrdreEnCours" name="qteOrdreEnCours" class="form-control form-control-lg" required readonly/>
                                            <label class="form-label" for="qteOrdreEnCours">Quantité en cours de fabrication </label>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </span>
                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button> -->
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered OrdreLine">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Valider Ordre</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <span class="radiosStyle">
                        <div class="modal-body">                           
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3 mt-2">
                                        <select class="form-select" name="idLignArticle" id="idLignArticle">                                
                                        </select>
                                    </div>   
                                </div>
                                <div class="col-4">
                                    <div class="form-outline mb-3 mt-2">
                                        <input type="text" name="qteOrdreLine" class="form-control form-control-lg"  id="qteOrdreLine"/>
                                        <label class="form-label" for="qteOrdreLine">Quantité</label>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-light btn-annuler btn-rounded mt-2" id="sorteOrdreLine">Sorté</button>
                                </div>
                                <div class="col-2"><button type="button" class="btn btn-light btn-annuler btn-rounded mt-2" id="entreOrdreLine" >Entré</button></div>
                            </div> 
                            <div class="row">
                                <div class="col">
                                    <div class="tableOrdreLine" >

                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>    
        </div>
        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered CalculQte">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Calcul Qte</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <span class="radiosStyle">
                        <div class="modal-body">                           
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3 mt-2">
                                        <select class="form-select" id="idLignArticleQte">                                
                                        </select>
                                    </div>   
                                </div>
                                <div class="col-4">
                                    <div class="form-outline mb-3 mt-2">
                                        <input type="text" id="qteCalculQte" class="form-control form-control-lg" />
                                        <label class="form-label" for="qteCalculQte">Quantité</label>
                                    </div>
                                </div>
                                
                            </div> 
                            
                        </div>
                    </span>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                        <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                    </div>
                </div>
            </div>    
        </div> 
    </div>
    <script id="templateOrdre" type="text/template">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-header p-3">
                        Nouveau
                    </div>
                    <ul class="list-group list-group-flush sortable-group js-sortable-group js-drop-target" data-type="nv">
                        <li class="list-group-item ui-state-default sticky"></li>
                        {{#nv}}
                        <li class="list-group-item ui-state-default" data-id='{{idOrdre}}' data-idF='{{idFabrication}}'>
                            <div class="card m-0 border shadow user-select-none ui-icon-arrowthick-2-n-s" style="background-color:{{color}}">
                                <div class="card-body">
                                <h5 class="card-title">{{nomArticle}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{{reference}}<div class="showLineEntet"><i class="fas fa-eye"></i><div></h6>
                                <ul>
                                    <li>Date début :  {{datePlanification}}</li>
                                    <li>Date fin :  {{dateEndPlanification}}</li>
                                    <li>Quantité à Produire :  {{qteOrdre}}</li>
                                </ul>
                                </div>
                            </div>
                        </li>
                        {{/nv}}
                    </ul>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header p-3">
                        En Cours
                    </div>
                    <ul class="list-group list-group-flush sortable-group js-sortable-group js-drop-target" data-type="ec">
                        <li class="list-group-item ui-state-default sticky"></li>
                        {{#ec}}
                        <li class="list-group-item ui-state-default" data-id='{{idOrdre}}' data-idF='{{idFabrication}}'>
                            <div class="card m-0 border shadow user-select-none ui-icon-arrowthick-2-n-s" style="background-color:{{colorEnd}}">
                                <div class="card-body">
                                    <h5 class="card-title">{{nomArticle}}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{{reference}}<div class="showLineEntet"><i class="fas fa-eye"></i><div></h6>
                                        <ul>
                                            <li>Date début :  {{datePlanification}}</li>
                                            <li>Date fin :  {{dateEndPlanification}}</li>
                                            <li>Quantité à Produire :  {{qteOrdre}}</li>
                                        </ul>
                                </div>
                            </div>
                        </li>
                        {{/ec}}
                    </ul>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header p-3">
                        Valider
                    </div>
                    <ul class="list-group list-group-flush sortable-group js-sortable-group js-drop-target" data-type="va">
                        <li class="list-group-item ui-state-default sticky"></li>
                        {{#va}}
                        <li class="list-group-item ui-state-default sticky" data-id='{{idOrdre}}' data-idF='{{idFabrication}}'>
                            <div class="card m-0 border shadow user-select-none ui-icon-arrowthick-2-n-s">
                                <div class="card-body">
                                    <h5 class="card-title">{{nomArticle}}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{{reference}} <div class="showLineEntet"><i class="fas fa-eye"></i><div></h6>
                                        <ul>
                                            <li>Date début :  {{datePlanification}}</li>
                                            <li>Date fin :  {{dateEndPlanification}}</li>
                                            <li>Quantité à Produire :  {{qteOrdre}}</li>
                                        </ul>
                                </div>
                            </div>
                        </li>
                        {{/va}}
                    </ul>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header p-3" style="background-color: #e10404;color: white;">
                        Corbeille
                    </div>
                    <ul class="list-group list-group-flush sortable-group js-sortable-group js-drop-target"  data-type="tr">
                        <li class="list-group-item ui-state-default sticky"></li>
                        {{#tr}}
                        <li class="list-group-item ui-state-default sticky" data-id='{{idOrdre}}' data-idF='{{idFabrication}}'>
                            <div class="card m-0 border shadow user-select-none ui-icon-arrowthick-2-n-s">
                                <div class="card-body">
                                    <h5 class="card-title" >{{nomArticle}}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{{reference}} <div class="showLineEntet"><i class="fas fa-eye"></i></div><div class="showLineSetting"><i class="fa-solid fa-wrench"></i></div></h6>
                                        <ul>
                                            <li>Date début :  {{datePlanification}}</li>
                                            <li>Date fin :  {{dateEndPlanification}}</li>
                                            <li>Quantité à Produire :  {{qteOrdre}}</li>
                                        </ul>
                                </div>
                            </div>
                        </li>
                        {{/tr}}
                    </ul>
                </div>
            </div>
        </div>                   
    </script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <script src="../js/mustache.js"></script>
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
    <script src="../js/ModeleFabrication/custom.js"></script>
    <script type="module" src="../js/ModeleFabrication/core.js"></script> 
    <script src="../js/ModeleFabrication/Ordre/custom.js"></script>
    <script type="module" src="../js/ModeleFabrication/Ordre/core.js"></script> 
    <!-- <script type="module" src="../js/ModeleFabrication/Ordre/sortable.js"></script>  -->
</body>
</html>
