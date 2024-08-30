<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleEmploye.aspx.cs" Inherits="ModelePaie_ModeleEmploye" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modèle Employé</title>
        <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="../css/global.css" />
    </head>

    <body class="bgModel modeleEmploye">
        <div class="container-fluid h-100">
            <header>
                <div class="row top-header text-white">
                    <div class="col-2 col-md-2">
                        <span class="p-2 ms-1 fs-5 lin-h" id="homeMenu"><i class="fa-solid fa-house"></i></span>
                        <span class="text-white-opacity fs-6 hide-on-mobile" id="nomUser">...</span>
                    </div>
                    <div class="col-6 col-md-7 menu-selector">
                        <ul class="nav h-100 user-select-none" id="menu-header" role="menu">
                            <li class="nav-item px-5 d-flex align-items-center" title="Employés"
                                data-model="Paie_Employe">
                                <span>Employé</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Congés" data-model="Paie_Conges">
                                <span>Congés</span>
                            </li>
                            <li class="nav-item px-5 d-flex align-items-center" title="Contrats"
                                data-model="Paie_Contrat">
                                <span>Contrat</span>
                            </li>
                            <!-- <li class="nav-item px-5 d-flex align-items-center" title="Cotisation"
                                data-model="Paie_Cotisation">
                                <span>Cotisation</span>
                            </li> -->
                            <li class="nav-item px-5 d-flex align-items-center" title="Prêts" data-model="Paie_Pret">
                                <span>Prêt</span>
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
                    <div class="col-4 d-flex flex-row justify-content-between align-items-stretch">
                        <h2 id="breadcrumb">...</h2>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-rounded btn-create"
                            role="insert">Créer</button>
                        <button type="button" class="btn btn-light btn-rounded" role="insert"
                            id="import">Importer</button>
                        <!--  <button type="button" class="btn btn-light btn-rounded">Annuler</button> -->
                    </div>
                    <div class="col-6 text-end">
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
                        <div class="tableView">

                        </div>
                    </div>
                </div>
            </section>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Employe" style="max-width: 1000px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Employé</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formEmploye" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <ul class="nav nav-tabs" id="TabEmploye" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="infoEmploye-tab" data-bs-toggle="tab"
                                                data-bs-target="#infoEmploye-pane" type="button" role="tab"
                                                aria-controls="infoEmploye-pane" aria-selected="true">Information
                                            </button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="banqueEmploye-tab" data-bs-toggle="tab"
                                                data-bs-target="#banqueEmploye-pane" type="button" role="tab"
                                                aria-controls="banqueEmploye-pane" aria-selected="false">
                                                Banques</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="affectationEmploye-tab" data-bs-toggle="tab"
                                                data-bs-target="#affectationEmploye-pane" type="button" role="tab"
                                                aria-controls="affectationEmploye-pane"
                                                aria-selected="false">Affectations
                                            </button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pointageEmploye-tab" data-bs-toggle="tab"
                                                data-bs-target="#pointageEmploye-pane" type="button" role="tab"
                                                aria-controls="pointageEmploye-pane" aria-selected="false">Pointage
                                            </button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link Cotis" id="cotisationEmploye-tab"
                                                data-bs-toggle="tab" data-bs-target="#cotisationEmploye-pane"
                                                type="button" role="tab" aria-controls="cotisationEmploye-pane"
                                                aria-selected="false">Cotisations
                                            </button>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="infoEmploye-pane" role="tabpanel"
                                            aria-labelledby="infoEmploye-tab" tabindex="0">
                                            <div class="border-bottom dark-border p-1 mt-2">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="matricule" name="matricule"
                                                                class="form-control" />
                                                            <label class="form-label" for="matricule">Matricule CNSS</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="nomEmployee" name="nomEmployee"
                                                                class="form-control" />
                                                            <label class="form-label" for="nomEmployee">Nom
                                                                Employé</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="prenomEmployee" name="prenomEmployee"
                                                                class="form-control" />
                                                            <label class="form-label" for="prenomEmployee">Prénom
                                                                Employé</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-end">
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="numDeclareEmp" name="numDeclareEmp"
                                                                class="form-control" />
                                                            <label class="form-label"
                                                                for="numDeclareEmp">Numéro Déclaré Employé</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="titre" class="form-label">Titre</label>
                                                            <select class="form-select" name="titre" id="titre">
                                                                <option value=""></option>
                                                                <option value="Mademoiselle">Mademoiselle</option>
                                                                <option value="Madame">Madame</option>
                                                                <option value="Monsieur">Monsieur</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="cinEmployee" name="cinEmployee"
                                                                class="form-control" />
                                                            <label class="form-label" for="cinEmployee">CIN</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-bottom dark-border p-1">
                                                <div class="row align-items-end">
                                                    <div class="col-4">
                                                        <div class="ui calendar inputDate mb-3" id="dateNaissance">
                                                            <label class="form-label">Date Naissance</label>
                                                            <div class="ui input left icon w-100">
                                                                <i class="calendar icon"></i>
                                                                <input type="text">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mb-3">
                                                            <label for="sitFamiliale" class="form-label">Situation
                                                                Familiale</label>
                                                            <select class="form-select" name="sitFamiliale"
                                                                id="sitFamiliale">
                                                                <option value="Célibataire">Célibataire</option>
                                                                <option value="Marié(e)">Marié(e)</option>
                                                                <option value="Divorcé(e)">Divorcé(e)</option>
                                                                <option value="Veuf(ve)">Veuf(ve)</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="nbEnfants" name="nbEnfants"
                                                                class="form-control" />
                                                            <label class="form-label" for="nbEnfants">Nombre
                                                                D'enfants</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="lieuNaissance" name="lieuNaissance"
                                                                class="form-control" />
                                                            <label class="form-label" for="lieuNaissance">Lieu de
                                                                Naissance</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="abattement" name="abattement"
                                                                class="form-control" />
                                                            <label class="form-label"
                                                                for="abattement">Abattement</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="telephone" name="telephone"
                                                                class="form-control" />
                                                            <label class="form-label" for="telephone">Téléphone</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <h6>Genre</h6>
                                                    <div class="col-4">
                                                        <div class="form-check mb-3 form-check-inline">
                                                            <input class="form-check-input" type="radio" name="genre"
                                                                id="genreM" value="Masculin" checked />
                                                            <label class="form-check-label"
                                                                for="genreM">Masculin</label>
                                                        </div>
                                                        <div class="form-check mb-3 form-check-inline">
                                                            <input class="form-check-input" type="radio" name="genre"
                                                                id="genreF" value="Féminin" />
                                                            <label class="form-check-label" for="genreF">Féminin</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-bottom dark-border p-1 mt-2">
                                                <div class="row align-items-end">
                                                    <div class="col-6">
                                                        <div>
                                                            <div class="col-12">
                                                                <div class="form-outline">
                                                                    <input type="text" id="busStation" name="busStation"
                                                                        class="form-control" />
                                                                    <label class="form-label"
                                                                        for="busStation">Bus Station</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mt-3">
                                                            <div class="col-12">
                                                                <div class="form-outline">
                                                                    <input type="text" id="adresse" name="adresse"
                                                                        class="form-control" />
                                                                    <label class="form-label"
                                                                        for="adresse">Adresse</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="col-12 mt-2">
                                                                <div class="form-outline mb-3">
                                                                    <input type="text" id="email" name="email"
                                                                        class="form-control" />
                                                                    <label class="form-label" for="email">Email</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="col-12 mt-2">
                                                                <div class="form-outline mb-3">
                                                                    <input type="text" id="nationalite" name="nationalite"
                                                                        class="form-control" />
                                                                    <label class="form-label"
                                                                        for="nationalite">Nationalité</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="col-12 mt-2">
                                                                <div class="mb-3">
                                                                    <label for="idVille"
                                                                        class="form-label">Ville</label>
                                                                    <select class="form-select" name="idVille"
                                                                        id="idVille">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 mb-2">
                                                        <div
                                                            class="col-5 d-flex justify-content-center align-items-center float-end">
                                                            <div class="circular_image"
                                                                style="background-image: url('/image/app/FOLDER-ITTONE.png');">
                                                                <div
                                                                    class="inBackround d-flex justify-content-center align-items-center">
                                                                    <input type='file' id="photo"
                                                                        class="inputCircular_image"
                                                                        accept=".png, .jpg, .jpeg" />
                                                                    <label for="photo"
                                                                        class="labelCircular_image fs-1 text-white"><i
                                                                            class="fa-solid fa-upload"></i></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12">
                                                    <div class="form-outline">
                                                        <input type="text" id="observation" name="observation"
                                                            class="form-control" />
                                                        <label class="form-label" for="observation">Observation</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="banqueEmploye-pane" role="tabpanel"
                                            aria-labelledby="banqueEmploye-tab" tabindex="1">
                                            <div class="d-flex align-items-stretch justify-content-between">
                                                <div
                                                    class="card-group align-items-stretch justify-content-between mt-4">
                                                    <div class="card me-3 shadow">
                                                        <div class="card-body">
                                                            <h5 class="card-title">Coordonnées Compte bancaire</h5>
                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    <div class="mb-3">
                                                                        <label for="banque"
                                                                            class="form-label">Banque</label>
                                                                        <select class="form-select" name="banque"
                                                                            id="banque">
                                                                            <option value="BMCI BANK">BMCI BANK</option>
                                                                            <option value="BMCE BANK">BMCE BANK</option>
                                                                            <option value="CIH BANK">CIH BANK</option>
                                                                            <option value="Société Générale">Société
                                                                                Générale
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="numCompte"
                                                                            name="numCompte" class="form-control" />
                                                                        <label class="form-label" for="numCompte">N°
                                                                            Compte</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="recharge" name="recharge"
                                                                            class="form-control" />
                                                                        <label class="form-label"
                                                                            for="recharge">Recharge</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card me-3 shadow">
                                                        <div class="card-body">
                                                            <h5 class="card-title">Assurance Vie</h5>
                                                            <div class="row mt-5">
                                                                <div class="col">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="traiteAssurVie"
                                                                            name="traiteAssurVie"
                                                                            class="form-control" />
                                                                        <label class="form-label"
                                                                            for="traiteAssurVie">Traite</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    <div class="ui calendar inputDate mb-3"
                                                                        id="dateAssurVie">
                                                                        <label class="form-label">Date</label>
                                                                        <div class="ui input left icon w-100">
                                                                            <i class="calendar icon"></i>
                                                                            <input type="text">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="plafondAssurVie"
                                                                            name="plafondAssurVie"
                                                                            class="form-control" />
                                                                        <label class="form-label"
                                                                            for="plafondAssurVie">Plafond</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card shadow">
                                                        <div class="card-body">
                                                            <h5 class="card-title">Assurance Retraite</h5>
                                                            <div class="row mt-5">
                                                                <div class="col">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="traiteAssurRetraite"
                                                                            name="traiteAssurRetraite"
                                                                            class="form-control" />
                                                                        <label class="form-label"
                                                                            for="traiteAssurRetraite">Traite</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    <div class="ui calendar inputDate mb-3"
                                                                        id="dateAssurRetraite">
                                                                        <label class="form-label">Date</label>
                                                                        <div class="ui input left icon w-100">
                                                                            <i class="calendar icon"></i>
                                                                            <input type="text">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="plafondAssurRetraite"
                                                                            name="plafondAssurRetraite"
                                                                            class="form-control" />
                                                                        <label class="form-label"
                                                                            for="plafondAssurRetraite">Plafond</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="affectationEmploye-pane" role="tabpanel"
                                            aria-labelledby="affectationEmploye-tab" tabindex="1">
                                            <div>
                                                <div class="card-group d-block">
                                                    <div class="card mt-2">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Affectation</h5>
                                                            <div class="row align-items-end">
                                                                <div class="col-2">
                                                                    <div class="mb-3">
                                                                        <label for="idNiveau"
                                                                            class="form-label">Niveau</label>
                                                                        <select class="form-select" name="idNiveau"
                                                                            id="idNiveau">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-2">
                                                                    <div class="mb-3">
                                                                        <label for="idCategorie"
                                                                            class="form-label">Catégorie</label>
                                                                        <select class="form-select" name="idCategorie"
                                                                            id="idCategorie">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-2">
                                                                    <div class="mb-3">
                                                                        <label for="idDepartement"
                                                                            class="form-label">Département</label>
                                                                        <select class="form-select" name="idDepartement"
                                                                            id="idDepartement">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-2">
                                                                    <div class="mb-3">
                                                                        <label for="idFonction"
                                                                            class="form-label">Fonction</label>
                                                                        <select class="form-select" name="idFonction"
                                                                            id="idFonction">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-check mb-3 form-check-inline">
                                                                        <input class="form-check-input" type="radio"
                                                                            name="empCadre" id="employe" value="Employé"
                                                                            checked />
                                                                        <label class="form-check-label"
                                                                            for="employe">Employé</label>
                                                                    </div>
                                                                    <div class="form-check mb-3 form-check-inline">
                                                                        <input class="form-check-input" type="radio"
                                                                            name="empCadre" id="cadre" value="Cadre" />
                                                                        <label class="form-check-label"
                                                                            for="cadre">Cadre</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card mt-2">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Entrée / Sortie</h5>
                                                            <div class="row  align-items-end">
                                                                <div class="col-4">
                                                                    <div class="ui calendar inputDate mb-3"
                                                                        id="dateEntree">
                                                                        <label class="form-label">Date Entrée</label>
                                                                        <div class="ui input left icon w-100">
                                                                            <i class="calendar icon"></i>
                                                                            <input type="text">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="ui calendar inputDate mb-3"
                                                                        id="dateSortie">
                                                                        <label class="form-label">Date Sortie</label>
                                                                        <div class="ui input left icon w-100">
                                                                            <i class="calendar icon"></i>
                                                                            <input type="text">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="form-check mb-3">
                                                                        <label class="form-check-label"
                                                                            for="checkSortie">Sortie Définitive</label>
                                                                        <input class="form-check-input" type="checkbox"
                                                                            id="checkSortie" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card mt-2">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Salaire</h5>
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <div class="mb-3">
                                                                        <label for="typePaie" class="form-label">Type
                                                                            Paie</label>
                                                                        <select class="form-select" name="typePaie"
                                                                            id="typePaie">
                                                                            <option value="Mensuel">Mensuel</option>
                                                                            <option value="Quanzaine">Quanzaine</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="mb-3">
                                                                        <label for="typeSalarie" class="form-label">Type
                                                                            Salarié</label>
                                                                        <select class="form-select" name="typeSalarie"
                                                                            id="typeSalarie">
                                                                            <option value="Fixe">Fixe</option>
                                                                            <option value="Horaire">Horaire</option>
                                                                            <option value="Journalier">Journalier
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="mb-3">
                                                                        <label for="idModRglm" class="form-label">Mode
                                                                            de paiement</label>
                                                                        <select class="form-select" name="idModRglm"
                                                                            id="idModRglm">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="salaireBase"
                                                                            name="salaireBase" class="form-control" />
                                                                        <label class="form-label"
                                                                            for="salaireBase">Salaire de Base</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="form-outline">
                                                                        <input type="text" id="numCarte" name="numCarte"
                                                                            class="form-control" />
                                                                        <label class="form-label" for="numCarte">N°
                                                                            Carte</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="form-check mb-3">
                                                                        <label class="form-check-label"
                                                                            for="checkPointage">Activer Pointage</label>
                                                                        <input class="form-check-input" type="checkbox"
                                                                            id="checkPointage" />
                                                                    </div>
                                                                    <div class="form-check mb-3">
                                                                        <label class="form-check-label"
                                                                            for="salaireFix">Salaire fix</label>
                                                                        <input class="form-check-input" type="checkbox"
                                                                            id="salaireFix" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pointageEmploye-pane" role="tabpanel"
                                            aria-labelledby="pointageEmploye-tab" tabindex="1">
                                            <div>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="mb-3">
                                                            <label for="idUserDevice" class="form-label">User
                                                                Devices</label>
                                                            <select class="form-select" name="idUserDevice"
                                                                id="idUserDevice">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="mb-3">
                                                            <label for="idPlanning"
                                                                class="form-label">Planification</label>
                                                            <select class="form-select" name="idPlanning"
                                                                id="idPlanning">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="cotisationEmploye-pane" role="tabpanel"
                                            aria-labelledby="cotisationEmploye-tab" tabindex="1">
                                            <div class="row d-flex align-items-center">
                                                <div class="col-6">
                                                    <div class="mb-3">
                                                        <label for="idCotisation" class="form-label">Cotisations</label>
                                                        <select class="form-select idCotisation">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-3 mt-2">
                                                    <button type="button"
                                                        class="fs-6 btn btn-outline-ittone btn-floating" id="addCotis"
                                                        title="Ajouter Cotisation">
                                                        <i class="fa-solid fa-circle-arrow-down"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="row m-2  p-1 card">
                                                <div class="col-12">
                                                    <div class="tableView Cotis">

                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="row mt-3">
                                                <div class="col-4">
                                                    <div>
                                                        <select class="form-select" id="tauxFraisProf">
                                                            <option value="">Taux Frais Prof</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="form-outline mb-3">
                                                        <input type="text" id="nCIMR" name="nCIMR"
                                                            class="form-control"/>
                                                        <label class="form-label" for="nCIMR">N Catégorie CMIR</label>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="form-check mb-3">
                                                        <label class="form-check-label"
                                                            for="checkCotis">Cotiser sur la tranche de salaire supérieur au plafond de la CNSS</label>
                                                        <input class="form-check-input" type="checkbox"
                                                            id="checkCotis" />
                                                    </div>
                                                </div>
                                            </div> -->
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
                <div class="modal-dialog modal-lg modal-dialog-centered Cotisation">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Création Cotisation</h5>
                            <!-- <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button> -->
                        </div>
                        <form class="needs-validation" id="formCotisation" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="border-bottom border-dark p-1">
                                                <h6>Partie 1</h6>
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="codeCotis" name="codeCotis"
                                                        class="form-control" readonly />
                                                    <div class="invalid-feedback sty-feedback">
                                                        Code Cotisation est obligatoire
                                                    </div>
                                                    <label class="form-label" for="codeCotis">Code</label>
                                                </div>
                                                <div class="form-outline mb-3">
                                                    <input type="text" id="libelleCotis" name="libelleCotis"
                                                        class="form-control" readonly />
                                                    <label class="form-label" for="libelleCotis">Libellé</label>
                                                </div>
                                            </div>
                                            <div class="border-bottom border-dark p-1">
                                                <div class="row">
                                                    <h6>Partie 2</h6>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="partSalariel" name="partSalariel"
                                                                class="form-control" />
                                                            <label class="form-label" for="partSalariel">Part Salariale
                                                                %</label>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="prestationSoc" name="prestationSoc"
                                                                class="form-control" readonly />
                                                            <label class="form-label" for="prestationSoc">Prestation
                                                                Sociale
                                                                %</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="allFamilial" name="allFamilial"
                                                                class="form-control" readonly />
                                                            <label class="form-label" for="allFamilial">All
                                                                Familiale %</label>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="formationProf" name="formationProf"
                                                                class="form-control" readonly />
                                                            <label class="form-label" for="formationProf">Formation
                                                                Professionnelle %</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="plafond" name="plafond"
                                                                class="form-control" />
                                                            <label class="form-label" for="plafond">Plafond %</label>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline mb-3">
                                                            <input type="text" id="cotisationPatr" name="cotisationPatr"
                                                                class="form-control" />
                                                            <label class="form-label" for="cotisationPatr">Cotisation
                                                                Patronale
                                                                %</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 class="mt-1">Partie 3</h6>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="tauxPenalite" name="tauxPenalite"
                                                    class="form-control" readonly />
                                                <label class="form-label" for="tauxPenalite">Taux Pénalité %</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="tauxMajoration1" name="tauxMajoration1"
                                                    class="form-control" readonly />
                                                <label class="form-label" for="tauxMajoration1">Taux Majoration 1 Mois
                                                    %</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="tauxMajorationAutres" name="tauxMajorationAutres"
                                                    class="form-control" readonly />
                                                <label class="form-label" for="tauxMajorationAutres">Taux Majoration
                                                    Autres Mois %</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <!-- <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                    role="insert">Nouveau</button> -->
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="submit"
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered Contrat">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Contrat</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formContrat" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="idEmploye" class="form-label">Employé</label>
                                                <select class="form-select idEmploye" name="idEmploye">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <div class="form-outline">
                                                <input type="text" id="numContrat" name="numContrat"
                                                    class="form-control" />
                                                <label class="form-label" for="numContrat">Numéro de Contrat</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="ui calendar inputDate mb-3" id="dateContrat">
                                                <label class="form-label">Date Contrat</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <label for="idProfil" class="form-label">Type de Contrat</label>
                                                <select class="form-select" name="idProfil" id="idProfil">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="ui calendar inputDate mb-3" id="periodeD">
                                                <label class="form-label">Période du</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="ui calendar inputDate mb-3" id="periodeF">
                                                <label class="form-label">Période à</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3 d-none fileDiv">
                                        <div class="col-6 d-flex flex-column">
                                            <label class="form-label ms-2">Contract File</label>
                                            <button type="button" class="btn btn-light btn-rounded bg-primary-grey"
                                                role="insert" id="file" title="Importer des Fichiers">Upload
                                                File</button>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12">
                                            <div class="form-outline">
                                                <input type="text" id="observationC" name="observationC"
                                                    class="form-control" />
                                                <label class="form-label" for="observationC">Observation</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Conge">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Congé</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formConge" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="idEmploye" class="form-label">Employé</label>
                                                <select class="form-select idEmploye" name="idEmploye">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <div class="form-outline">
                                                <input type="text" id="annee" name="annee" class="form-control" />
                                                <label class="form-label" for="annee">Année</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <div class="form-outline">
                                                <input type="text" id="jCongeN_1" name="jCongeN_1"
                                                    class="form-control" />
                                                <label class="form-label" for="jCongeN_1">J.Congé(N-1)</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-outline">
                                                <input type="text" id="jCongeN" name="jCongeN" class="form-control" />
                                                <label class="form-label" for="jCongeN">J.Congé(N)</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-outline">
                                                <input type="text" id="jConsommes" name="jConsommes"
                                                    class="form-control" />
                                                <label class="form-label" for="jConsommes">J.Consommés</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-outline">
                                                <input type="text" id="jRestes" name="jRestes" class="form-control" />
                                                <label class="form-label" for="jRestes">J.Restés</label>
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
                <div class="modal-dialog modal-lg modal-dialog-centered Pret">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Création Prêt</h5>
                            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <form class="needs-validation" id="formPret" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="idEmploye" class="form-label">Employé</label>
                                                <select class="form-select idEmploye" name="idEmploye">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <div class="form-outline">
                                                <input type="text" id="reliquant" name="reliquant"
                                                    class="form-control" />
                                                <label class="form-label" for="reliquant">Reliquant</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="form-outline">
                                                <input type="text" id="montantTotal" name="montantTotal"
                                                    class="form-control" />
                                                <label class="form-label" for="montantTotal">Montant Total</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-outline">
                                                <input type="text" id="nbEcheance" name="nbEcheance"
                                                    class="form-control" disabled/>
                                                <label class="form-label" for="nbEcheance">Nbre D'échéances</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="form-outline">
                                                <input type="text" id="montantEcheance" name="montantEcheance"
                                                    class="form-control" />
                                                <label class="form-label" for="montantEcheance">Montant D'une
                                                    échéance</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-outline">
                                                <input type="text" id="montantDernierEcheance"
                                                    name="montantDernierEcheance" class="form-control" disabled />
                                                <label class="form-label" for="montantDernierEcheance">Montant De la
                                                    dernière échéance</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="ui calendar inputDate mb-3" id="dateEcheanceD">
                                                <label class="form-label">Date de la 1ère échéance</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="ui calendar inputDate mb-3" id="dateEcheanceF">
                                                <label class="form-label">Date de la dernière échéance</label>
                                                <div class="ui input left icon w-100">
                                                    <i class="calendar icon"></i>
                                                    <input type="text">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="form-outline">
                                                <input type="text" id="codeRubrique" name="codeRubrique"
                                                    class="form-control" />
                                                <label class="form-label" for="codeRubrique">Code Rubrique</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="form-outline">
                                                <input type="text" id="observation" name="observation"
                                                    class="form-control" />
                                                <label class="form-label" for="observation">Observation</label>
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
        <script src="js/ModeleEmploye/custom.js"></script>
        <script type="module" src="js/ModeleEmploye/core.js"></script>
    </body>

    </html>