<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleArticle.aspx.cs" Inherits="ModeleArticle" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modele de Article</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
    </head>
    <style>
        #favorisSpan {
            cursor: pointer;
            color: #f6b90f;
            animation: fade1 1s linear;
            background-color: unset;
            border: 0;
            box-shadow: unset;
            font-size: 1.6rem;
            padding-left: 0.625rem;
            margin: 0;
        }

        .conts {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50vh;
        }

        .conts .btn-upload {
            width: 200px;
            margin-bottom: 20px;
            padding: 12px;
            border-radius: 5px;
            background: #3988c8;
            font-family: sans-serif;
            color: #fff;
            text-align: center;
        }

        .conts .preview-box {
            display: flex;
            justify-content: center;
            width: 100%;
            max-width: 600px;
        }

        .conts .preview-content {
            width: auto;
            height: inherit;
        }

        .slider img {
            height: auto;
            margin: auto;
            height: 250px;
            width: 100%;
        }

        .slider {
            background-color: rgba(0, 0, 0, 0.3);
            position: relative;
            display: inline-block;
            overflow: hidden;
            height: 250px;
            width: 100%;
            max-width: 440px;
            border-radius: 20px;
        }

        .slider figure {
            position: absolute;
            opacity: 0;
            height: 150px;
            padding: 0;
            display: none;
        }


        .slider figure.show {
            opacity: 1;
            position: static;
            transition: 0.5s opacity;
            display: block;
            margin: 0;
        }

        .slider .next,
        .slider .prev {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            background: rgba(0, 0, 0, 0.6);
            height: 50px;
            width: 50px;
            top: 50%;
            z-index: 1;
            margin-top: -35px;
            opacity: 0.3;
            user-select: none;
            transition: 0.3s;
        }

        .slider .next:hover,
        .slider .prev:hover {
            cursor: pointer;
            opacity: 1;
        }

        .slider .next {
            right: 0;
            padding: 10px 5px 15px 10px;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }

        .slider .prev {
            left: 0;
            padding: 10px 10px 15px 5px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }

        @media screen and (max-width: 750px) {

            .nextphoto,
            .prevphoto {
                z-index: -1;
            }
        }

        .selected {
            box-shadow: inset 0 0 0 9999px var(--color-ittone-3);
            color: #fff;
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
                            <!-- <li class="nav-item px-5 d-flex align-items-center" title="Famille" data-model="Famille">
                                <span>Famille d'article</span>
                            </li> -->
                            <li class="nav-item px-5 d-flex align-items-center" title="Article" data-model="Article">
                                <span>Article</span>
                            </li>
                            <!-- <li class="nav-item px-5 d-flex align-items-center" title="Bateau" data-model="Bateau">
                                <span>Bateau</span>
                            </li> -->
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
                        <button type="button" class="btn btn-light btn-rounded" id="imprement">Fiche Article</button>
                    </div>
                    <div class="col-6 text-end">
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="linkWoo"
                            title="Suprimmer" role="delete">
                            <i class="fa-solid fa-link"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="displayEmail"
                            title="Suprimmer" role="delete">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" id="deleteRow"
                            title="Suprimmer" role="delete">
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
                    </div>
                </div>
                <div class="row m-2  p-1 card">
                    <div class="col-12">
                        <div class="tableView">

                        </div>
                    </div>
                </div>
            </section>
            <section class="screen-create d-none screen mt-3 Article">
                <div class="row">
                    <div class="col-4">
                        <h2 id="breadcrumb">Article</h2>
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
                <div class="card m-4 p-2">
                    <form class="needs-validation" id="formArticle" novalidate autocomplete="off">
                        <div class="row justify-content-center">
                            <div class="col-md-4">
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
                                            <label class="form-label"> Date de
                                                modification</label>
                                            <div class="ui input left icon w-100">
                                                <i class="calendar icon"></i>
                                                <input type="text">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-0 mb-3 mt-4 align-items-center">
                                    <div class="form-outline col-8 col-md-10">
                                        <input type="text" id="nomArticle" name="nomArticle" class="form-control"
                                            required />
                                        <div class="invalid-feedback sty-feedback">
                                            Titre est obligatoire
                                        </div>
                                        <label class="form-label" for="nomArticle">Titre</label>
                                    </div>
                                    <div class="col-2">
                                        <input class="d-none" type="checkbox" id="favorisArticle" />
                                        <label class="btn btn-secondary btn-input" for="favorisArticle"
                                            id="favorisSpan"><i class="fa fa-lg far fa-star"></i></label>
                                    </div>
                                </div>
                                <div class="row m-0 mb-3 align-items-center">
                                    <div class="form-outline col-8 col-md-10">
                                        <input type="text" id="refArticle" name="refArticle" class="form-control"
                                            required />
                                        <div class="invalid-feedback sty-feedback">
                                            Référence d'article est obligatoire
                                        </div>
                                        <label class="form-label" for="refArticle">Référence</label>
                                    </div>
                                    <div class="col-2">
                                        <span class="btn btn-secondary btn-input" id="generRefArticle"><i
                                                class="fa fa-lg fas fa-arrow-left"></i></span>
                                    </div>
                                </div>
                                <div class="row m-0 mb-3 align-items-center d-none">
                                    <div class="form-outline col-8 col-md-10">
                                        <input type="text" id="codeBareArticle" name="codeBareArticle"
                                            class="form-control" />
                                        <label class="form-label" for="codeBareArticle">Code Barre</label>
                                    </div>
                                    <div class="col-2">
                                        <span class="btn btn-secondary btn-input" id="generCodeBare"><i
                                                class="fa fa-lg fas fa-arrow-left"></i></span>
                                    </div>
                                </div>
                                <div class="form-outline mb-3">
                                    <label class="form-label" for="descArticle">Description</label>
                                    <div class="col-12">
                                        <div class="o_td_label">
                                            <textarea cols="70" name="tableAddons" rows="50" placeholder="Contenu"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-outline mb-3 d-none">
                                    <input type="text" id="classmentArticle" name="classmentArticle"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="classmentArticle">Classement</label>
                                </div>
                                <div class="form-outline mb-3 d-none">
                                    <input type="text" id="stkMinArticle" name="stkMinArticle"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="stkMinArticle">Qt Min en Stock</label>
                                </div>
                                <div class="form-outline mb-3 d-none">
                                    <input type="text" id="qteBox" name="qteBox" class="form-control form-control-lg" />
                                    <label class="form-label" for="qteBox">Qt Box</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="codeFamille" name="codeFamille" class="form-control form-control-lg" />
                                    <label class="form-label" for="codeFamille">Code Famille</label>
                                </div>
                                <div class="mb-3 d-none">
                                    <label for="idFamille" class="form-label">Famille d'Article</label>
                                    <span class="btn btn-secondary btn-input mb-1 p-2 float-end" id="newFamille"><i
                                            class="fa-solid fa-plus"></i></span>
                                    <select class="form-select" name="idFamille" id="idFamille">
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="etatMater" class="form-label">Etat du matériel</label>
                                    <select class="form-select" id="etatMater" name="etatMater">
                                        <option value="neuf">neuf</option>
                                        <option value="bon état">bon état</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-none">
                                    <label for="typeArticle" class="form-label">Type d'Article</label>
                                    <select class="form-select" name="typeArticle" id="typeArticle">
                                        <option>Standard</option>
                                        <option>Fabrication</option>
                                        <option>Nomenclature</option>
                                        <option>Consommable</option>
                                        <option>Service</option>
                                        <option>Livraison</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-none">
                                    <label for="idUnite" class="form-label">Mesure d'Article</label>
                                    <select class="form-select" name="idUnite" id="idUnite">
                                    </select>
                                </div>
                                <div class="form-check mb-3 mt-4 d-none">
                                    <input class="form-check-input" type="checkbox" id="checkDureDevie" />
                                    <label class="form-check-label" for="checkDureDevie">Durée de vie</label>
                                </div>
                                <div class="mb-3 d-none checkDure">
                                    <select class="form-select d-inline-block w-25" name="stateDureDevie"
                                        id="stateDureDevie">
                                        <option value="jour">Jour</option>
                                        <option value="mois">Mois</option>
                                        <option value="annee">Année</option>
                                    </select>
                                    <div class="form-outline d-inline-block w-50">
                                        <input type="text" id="dureDevie" name="dureDevie"
                                            class="form-control form-control-lg" />
                                        <label class="form-label" for="dureDevie">Durée de vie</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-check w-25 d-inline-block mb-3 mt-4 d-none">
                                    <input class="form-check-input" type="checkbox" id="achatArticle" />
                                    <label class="form-check-label" for="achatArticle">Peut être acheté</label>
                                </div>
                                <div class="form-check w-25 d-inline-block mb-3 d-none">
                                    <input class="form-check-input" type="checkbox" id="venteArticle" />
                                    <label class="form-check-label" for="venteArticle">Peut être vendu</label>
                                </div>
                                <div class="form-check w-25 d-inline-block mb-3 d-none">
                                    <input class="form-check-input" type="checkbox" id="locationArticle" />
                                    <label class="form-check-label" for="locationArticle">Peut être Loué</label>
                                </div>
                                <div class="mb-3 w-25 d-inline-block  d-none">
                                    <label>Afficher :</label>
                                </div>
                                <div class="form-check w-25 d-inline-block mb-3 d-none">
                                    <input class="form-check-input" type="checkbox" id="checkVente2" />
                                    <label class="form-check-label" for="checkVente2">Prix Vente 2</label>
                                </div>
                                <div class="form-check w-25 d-inline-block mb-3 d-none">
                                    <input class="form-check-input" type="checkbox" id="checkVente3" />
                                    <label class="form-check-label" for="checkVente3">Prix Vente 3</label>
                                </div>
                                
                                <div class=" mb-3">
                                    <label for="idIndustrie" class="form-label">Industrie</label>
                                    <span class="btn btn-secondary btn-input mb-1 p-2 float-end" id="newIndustrie"><i
                                        class="fa-solid fa-plus"></i></span>
                                    <select class="form-select" name="idIndustrie" id="idIndustrie" required>
                                    </select>
                                </div>
                                <div class=" mb-3">
                                    <label for="idCategorie" class="form-label">Catégorie</label>
                                    <span class="btn btn-secondary btn-input mb-1 p-2 float-end" id="newCategorie"><i
                                        class="fa-solid fa-plus"></i></span>
                                    <select class="form-select" name="idCategorie" id="idCategorie" required>
                                    </select>
                                </div>
                                <div class=" mb-3">
                                    <label for="idRebrique" class="form-label">Rubrique</label>
                                    <span class="btn btn-secondary btn-input mb-1 p-2 float-end" id="newRebrique"><i
                                        class="fa-solid fa-plus"></i></span>
                                    <select class="form-select" name="idRebrique" id="idRebrique" required>
                                    </select>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="hsCode" name="hsCode" class="form-control form-control-lg" />
                                    <label class="form-label" for="hsCode">HS Code</label>
                                </div>
                                <div class="mb-3">
                                    <label for="Disponibilite" class="form-label">Disponibilité</label>
                                    <select class="form-select d-inline-block" name="Disponibilite"
                                        id="Disponibilite">
                                        <option value="1" selected>Produit disponible</option>
                                        <option value="2">Produit désiré</option>
                                        <option value="3" disabled>Produit vendu</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="idClient" class="form-label">Societe :</label>
                                    <select class="form-select" name="idClient" id="idClient"x>
                                    </select>
                                </div>
                                <div class="row m-0 mb-3 align-items-center disabled">
                                    <div class="form-outline col-4 col-ms-12">
                                        <input type="text" id="departement" class="form-control" />
                                        <label class="form-label" for="departement">Departement</label>
                                    </div>
                                    <div class="form-outline col-4 col-ms-12">
                                        <input type="text" id="ville" class="form-control" />
                                        <label class="form-label" for="ville">Ville</label>
                                    </div>
                                    <div class="form-outline col-4 col-ms-12">
                                        <input type="text" id="commune" class="form-control" />
                                        <label class="form-label" for="commune">Adresse</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="idTaxeAchat" class="form-label">Taxe d'Achat</label>
                                    <select class="form-select" name="idTaxeAchat" id="idTaxeAchat">
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="idTaxeVente" class="form-label">Taxe de Vente</label>
                                    <select class="form-select" name="idTaxeVente" id="idTaxeVente">
                                    </select>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="prixAchat_HT" name="prixAchat_HT"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixAchat_HT">Prix d'Achat HT</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="prixVente_HT" name="prixVente_HT"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_HT">Prix de Vente HT</label>
                                </div>
                                <div class="form-outline d-none mb-3">
                                    <input type="text" id="prixVente_HT_1" name="prixVente_HT_1"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_HT_1">Prix de Vente 2 HT</label>
                                </div>
                                <div class="form-outline d-none mb-3">
                                    <input type="text" id="prixVente_HT_2" name="prixVente_HT_2"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_HT_2">Prix de Vente 3 HT</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="pourCentArticle" name="pourCentArticle"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="pourCentArticle">Taux de marge</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="prixAchat_TTC" name="prixAchat_TTC"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixAchat_TTC">Prix d'Achat TTC</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="prixVente_TTC" name="prixVente_TTC"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_TTC">Prix de Vente TTC</label>
                                </div>
                                <div class="form-outline d-none mb-3">
                                    <input type="text" id="prixVente_TTC_1" name="prixVente_TTC_1"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_TTC_1">Prix de Vente 2 TTC</label>
                                </div>
                                <div class="form-outline d-none mb-3">
                                    <input type="text" id="prixVente_TTC_2" name="prixVente_TTC_2"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_TTC_2">Prix de Vente 3 TTC</label>
                                </div>
                                
                                <!-- <div class="row m-0 mb-3 align-items-center">
                                    <div class="form-outline col-6 col-md-6">
                                        <input type="text" id="code" class="form-control" />
                                        <label class="form-label" for="code">Code</label>
                                    </div>
                                    <div class="form-outline col-6 col-md-6">
                                        <input type="text" id="Desc" class="form-control" />
                                        <label class="form-label" for="Desc">Desc</label>
                                    </div>
                                </div> -->
                               <!--  <div class="mb-3" style="text-align: right;">
                                    <span class="btn btn-secondary btn-input" id="addon" title="Ajouter Emp"><i
                                            class="fa fa-lg fas fa-solid fa-plus"></i></span>
                                    <span class="btn btn-secondary btn-input" id="modAddons" title="Modifier Emp"><i
                                            class="fa fa-lg fas fa-solid fa-pen-to-square"></i></span>
                                    <span class="btn btn-secondary btn-input" id="delAddons" title="Suprimmer Emp"><i
                                            class="fa fa-lg fas fa-solid fa-trash-can"></i></span>
                                </div>
                                <div class="mb-3 tableAdd" style="max-height: 2500px;overflow-y: auto;">
                                    <table style="width: 100%;">
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Desc</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div> -->
                            </div>
                            <div class="col-md-4 d-flex flex-column">
                                <div class="row" style="margin: auto;">
                                    <div class="circular_image align-items-center"
                                        style="background-image: url('/image/app/modelProduits.png');">
                                        <div class="inBackround d-flex justify-content-center align-items-center">
                                            <input type='file' id="photoArticle" class="inputCircular_image"
                                                accept=".png, .jpg, .jpeg" />
                                            <label for="photoArticle" class="labelCircular_image fs-1 text-white"><i
                                                    class="fa-solid fa-upload"></i></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pictures d-none">
                                    <div class="conts">
                                        <input type="file" id="ArticleImage" accept="image/*" hidden multiple />
                                        <label class="btn-upload btn btn-secondary btn-input" for="ArticleImage"
                                            role="button">
                                            Upload Photo
                                        </label>
                                        <div class="preview-box">
                                            <div class="slider">
                                                <div class="prev"><i class="fa fa-arrow-left" aria-hidden="true"></i>
                                                </div>
                                                <div class="imgs">
                                                </div>
                                                <div class="next"><i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Famille">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Famille</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formFamille" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-7">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomFamille" name="nomFamille"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Le Nom de Famille est obligatoire
                                                </div>
                                                <label class="form-label" for="nomFamille">Nom Famille</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="desFamille" name="desFamille"
                                                    class="form-control" />
                                                <label class="form-label" for="desFamille">Description Famille</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="parentId" class="form-label">Nature de Famille</label>
                                                <select class="form-select" name="parentId" id="parentId">
                                                </select>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="wooFamille" />
                                                <label class="form-check-label" for="wooFamille">Famille
                                                    Woocommerce</label>
                                            </div>
                                        </div>
                                        <div class="col-5 d-flex justify-content-center align-items-center">
                                            <div class="circular_image"
                                                style="background-image: url('/image/app/FOLDER-ITTONE.png');">
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
                <div class="modal-dialog modal-lg modal-dialog-centered Bateau">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Bateau</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formBateau" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-7">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="refArticle1" name="refArticle"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Le Référence est obligatoire
                                                </div>
                                                <label class="form-label" for="refArticle1">Référence</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="nomArticle1" name="nomArticle"
                                                    class="form-control" />
                                                <label class="form-label" for="nomArticle1">Nom Bateau</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="idClient" class="form-label">Client</label>
                                                <select class="form-select" name="idClient" id="idClient">
                                                </select>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox"
                                                    id="checkCollaboration" />
                                                <label class="form-check-label"
                                                    for="checkCollaboration">Collaboration</label>
                                            </div>
                                            <div class="row checkCollaboration">
                                                <div class="col">
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="dimensionX" name="dimensionX"
                                                            class="form-control" />
                                                        <label class="form-label" for="dimensionX">dimensionX</label>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="dimensionY" name="dimensionY"
                                                            class="form-control" />
                                                        <label class="form-label" for="dimensionY">dimensionY</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-outline checkCollaboration mb-3">
                                                <input type="text" id="prixM" name="prixM" class="form-control" />
                                                <label class="form-label" for="prixM">prixM</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="prixVente_TTC1" name="prixVente_TTC"
                                                    class="form-control" />
                                                <label class="form-label" for="prixVente_TTC1">Prix Vente</label>
                                            </div>
                                            <div class="mb-3 row">
                                                <div class="col-3">
                                                    <select class="form-select" name="stateDureDevie"
                                                        id="stateDureDevie1">
                                                        <option value="jour">Jour</option>
                                                        <option value="mois">Mois</option>
                                                        <option value="annee">Année</option>
                                                    </select>
                                                </div>
                                                <div class="col-9">
                                                    <div class="form-outline d-flex">
                                                        <div class="ui calendar date_range dateStart w-50"
                                                            id="dateStart">
                                                            <div class="ui input left icon w-100">
                                                                <i class="calendar icon"></i>
                                                                <input type="text" placeholder="Start">
                                                            </div>
                                                        </div>
                                                        <div class="ui calendar date_range dateEnd w-50" id="dateEnd">
                                                            <div class="ui input left icon w-100">
                                                                <i class="calendar icon"></i>
                                                                <input type="text" placeholder="End">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-5 d-flex justify-content-center align-items-center">
                                            <div class="circular_image"
                                                style="background-image: url('/image/app/FOLDER-ITTONE.png');">
                                                <div
                                                    class="inBackround d-flex justify-content-center align-items-center">
                                                    <input type='file' id="photoArticle1" class="inputCircular_image"
                                                        accept=".png, .jpg, .jpeg" />
                                                    <label for="photoArticle1"
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
        </div>

        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered" id="emailDetails" style="max-width: 80%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Email</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <div id="tableEmail">

                                </div>
                            </div>
                        </span>
                        
                        <div class="modal-footer" style="border-top: none;">
                            <!-- <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2"
                                id="ajouterPropr">Send <i class="fa-regular fa-paper-plane"></i></button> -->
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
                        <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2" id="sendMail"><i
                                class="fa-solid fa-at"></i></button>
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
                                <div class="col mb-3">
                                    <label for="parentId" class="form-label">Destinataire</label>
                                    <select name="idClient" id="to"></select>
                                </div>
                                <div class="col mb-3">
                                    <div class="form-outline">
                                        <input type="text" class="form-control" name="subject">
                                        <label class="form-label">Objet</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="text">Text de message</label>
                                    <textarea cols="70" name="editor" class="editor" rows="50"
                                        placeholder="Contenu"></textarea>
                                </div>
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Send <i class="fa-regular fa-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered linkWoo">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Woo Link</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formWooLink" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">
                                <div class="col mb-3">
                                    <label for="parentId" class="form-label">Categorie Woo</label>
                                    <select name="idWoo" id="idWoo"></select>
                                </div>
                                <div class="form-outline col-8 col-md-10">
                                    <input type="text" id="titleWoo" name="titleWoo" class="form-control"
                                         />
                                    <div class="invalid-feedback sty-feedback">
                                        Titre est obligatoire
                                    </div>
                                    <label class="form-label" for="nomArticle">Titre</label>
                                </div>
                                <div class="form-outline mt-2 col-8 col-md-10">
                                    <input type="text"  name="refArticle" class="form-control"
                                         />
                                    <div class="invalid-feedback sty-feedback">
                                        Reference est obligatoire
                                    </div>
                                    <label class="form-label" for="refArticle">Reference</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <label class="form-label" for="descArticle">Description</label>
                                    <div class="col-12">
                                        <div class="o_td_label">
                                            <textarea cols="70" name="descAticleWoo" rows="50" placeholder="Contenu"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                role="insert">Nouveau</button>
                            <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                            <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <script src="./js/jquery-3.6.0.min.js"></script>
        <script src="./vendors/ckeditor/ckeditor.js"></script>
        <script src="./js/editeur2.js"></script>
        <script src="./js/jquery-ui.js"></script>
        <script src="./js/moment.js"></script>
        <script src="./js/currency.min.js"></script>
        <script src="./vendors/calendar/semantic.min.js"></script>
        <script src="./vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
        <script src="./vendors/MDB5/js/mdb.min.js"></script>
        <script src="./vendors/DataTables/datatables.min.js"></script>
        <script src="./vendors/DataTables/DataTables-1.12.1/js/dataTables.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Responsive-2.3.0/js/responsive.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Select-1.4.0/js/select.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Scroller-2.0.7/js/scroller.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/SearchBuilder-1.3.4/js/searchBuilder.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/Buttons-2.2.3/js/buttons.bootstrap5.min.js"></script>
        <script src="./vendors/DataTables/DateTime-1.1.2/js/dataTables.dateTime.min.js"></script>
        <script src="./vendors/DataTables/datetime-moment.js"></script>
        <script src="./vendors/sweetalert2/sweetalert2.all.min.js"></script>
        <script src="./vendors/select2/select2.min.js"></script>
        <script src="./vendors/calendar/calendar.min.js"></script>
        <script src="./vendors/xlsx/xlsx.full.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script src="./vendors/html2canvas/jspdf.min.js"></script>
        <script src="./js/pdf.js"></script>
        <script src="./js/xlsx.js"></script>
        <script src="./js/menu.js"></script>
        <script src="./js/i18n.js"></script>
        <script src="./js/ittone.js"></script>
        <script src="./js/notification.js"></script>
        <script src="./js/roles.js"></script>
        <script src="./ModeleDocuments/js/doc.js"></script>

        <script src="./js/ModeleArticle/custom.js"></script>
        <script type="module" src="./js/ModeleArticle/core.js"></script>
    </body>

    </html>