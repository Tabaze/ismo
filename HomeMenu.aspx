<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HomeMenu.aspx.cs" Inherits="HomeMenu" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Menu</title>
        <link type="image/x-icon" rel="shortcut icon" href="image/logo/ITTONEERP.ico" />
        <link rel="stylesheet" href="css/global.css" />
    </head>

    <body class="bg HomeMenu">
        <div class="container-fluid min-vh-100">
            <div class="row top-header d-flex align-items-center text-white">
                <div class="col-6">
                    <div class="logo d-inline-block">
                        <img src="image/app/logo.png" alt="" />
                    </div>
                    <div class="userName d-inline-block mx-4 ">
                        <span class="text-white-opacity fs-6 hide-on-mobile" id="nomUser">...</span>
                    </div>
                </div>
                <div class="col-6 text-end fs-6 ">
                    <span class="fs-6 mx-2 text-white-opacity hide-on-mobile nomDossier">...</span>
                    <span class="p-2" id="notification">
                        <i class="fa-solid fa-bell"></i>
                    </span>
                    <span class="p-2" id="calcul"><i class="fa-solid fa-rotate-right"></i></span>
                    <span class="p-2 me-1" title="Fermer Dossier" id="ferme"><i
                            class="fa-solid fa-right-to-bracket"></i></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-flex justify-content-center nav-list">
                    <!-- <div class="overlay active" style="left: 642.156px; top: 92px; width: 98.2969px;"></div> -->
                    <ul class="nav nav-tabs nav-fill mb-3" id="parentMenu" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="tab-param" data-mdb-toggle="tab" href="#menu-param" role="tab"
                                aria-controls="menu-param" aria-selected="false"
                                title="Modèle d'informations générales">Général</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="tab-commercial" data-mdb-toggle="tab" href="#menu-commercial"
                                role="tab" aria-controls="menu-commercial" aria-selected="true"
                                title="Modèle de Gestion Commercial">Commercial</a>
                        </li>
                        <%--<li class="nav-item" role="presentation">
                            <a class="nav-link" id="tab-paie" data-mdb-toggle="tab" href="#menu-paie" role="tab"
                                aria-controls="menu-paie" aria-selected="false" title="Modèle de Paie">Paie</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link NvModels disabled" id="tab-compta" data-mdb-toggle="tab"
                                    href="#menu-compta" role="tab" aria-controls="menu-commercial" aria-selected="false"
                                    title="En Cours D'éxecution">Comptabilité</a>
                            </li>--%>
                            <!-- <li class="nav-item" role="presentation">
                            <a class="nav-link" id="tab-compta" href="ModeleDocuments/ModeleDocuments.aspx?name=Clients" 
                            title="Mes Documents">Mes Documents</a>
                        </li> -->
                    </ul>
                </div>
            </div>
            <div class="row tab-content">
                <div class="tab-pane fade" id="menu-param" role="tabpanel" aria-labelledby="tab-param">
                    <div class="col-12 d-flex justify-content-center mt-4">
                        <div
                            class="m_appModeles d-flex align-content-start justify-content-lg-start justify-content-center flex-wrap overflow-auto w-100 text-center text-white">
                            <a class="w-25 d-none m_menuitem p-2" href="ModeleUsers.aspx?name=Users"
                                data-modele="ModeleUsers">
                                <div class="m_app_icon" style="background-image: url('image/menu/parametrage.png')">
                                </div>
                                <div class="m_caption">PARAMÉTRAGE</div>
                            </a>
                            <a class="w-25 d-none m_menuitem p-2" href="ModeleBase.aspx?name=Depot"
                                data-modele="ModeleBase">
                                <div class="m_app_icon" style="background-image: url('image/menu/info.png')"></div>
                                <div class="m_caption">INFOS COMMERCIAL</div>
                            </a>
                            <%--<a class="w-25 d-none m_menuitem p-2"
                                href="ModelePaie/ModeleInfos.aspx?name=Paie_Niveau" title="Infos De Paie"
                                data-modele="Paie_Infos">
                                <div class="m_app_icon" style="background-image: url('image/menu/MENU\ ICONES.png')">
                                </div>
                                <div class="m_caption">INFOS DE PAIE</div>
                                </a>--%>
                                <a class="w-25 d-none m_menuitem p-2"
                                    href="ModeleDocuments/ModeleDocuments.aspx?name=Clients" title="Mes Documents"
                                    data-modele="ModeleDocuments">
                                    <div class="m_app_icon"
                                        style="background-image: url('image/menu/documentation.jpg')">
                                    </div>
                                    <div class="m_caption">MES DOCUMENTS</div>
                                </a>
                                <a class="w-25 d-none m_menuitem p-2" href="ModeleEmails.aspx?name=Sent"
                                    title="Boite des e-mails" data-modele="ModeleEmails">
                                    <div class="m_app_icon" style="background-image: url('image/menu/emails.png')">
                                    </div>
                                    <div class="m_caption">BOITE E-MAILS</div>
                                </a>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show active" id="menu-commercial" role="tabpanel"
                    aria-labelledby="tab-commercial">
                    <div class="col-12 d-flex justify-content-center mt-4">
                        <div
                            class="m_appModeles d-flex align-content-start justify-content-lg-start justify-content-center flex-wrap overflow-auto w-100 text-center text-white">
                            <a class="w-25 d-none m_menuitem p-2" href="ModeleTier.aspx?name=Client"
                                data-modele="ModeleTier">
                                <div class="m_app_icon" style="background-image: url('image/menu/tier.png')"></div>
                                <div class="m_caption">SOCIÉTÉ</div>
                            </a>
                            <a class="w-25 d-none m_menuitem p-2" href="ModeleArticle.aspx?name=Article"
                                data-modele="ModeleArticle">
                                <div class="m_app_icon" style="background-image: url('image/menu/equipement.png')"></div>
                                <div class="m_caption">ARTICLE</div>
                            </a>
                            <%--<a class="w-25 d-none m_menuitem p-2" href="ModeleInventaire.aspx?name=INVT"
                                data-modele="ModeleInventaire">
                                <div class="m_app_icon" style="background-image: url('image/menu/invt.png')"></div>
                                <div class="m_caption">INVENTAIRE</div>
                                </a>
                                <a class="w-25 d-none m_menuitem p-2" href="ModeleGestionQT.aspx?name=parArticle"
                                    data-modele="ModeleGestionQT">
                                    <div class="m_app_icon" style="background-image: url('image/menu/qt.png')"></div>
                                    <div class="m_caption">GESTION QUANTITÉ</div>
                                </a>
                                <a class="w-25 d-none m_menuitem p-2" href="ModeleFabrication.aspx?name=Fabrication"
                                    data-modele="ModeleFabrication">
                                    <div class="m_app_icon" style="background-image: url('image/menu/fabrication.png')">
                                    </div>
                                    <div class="m_caption">FABRICATION</div>
                                </a>
                                <a class="w-25 d-none m_menuitem p-2 NvModels" href="#" title="En cours d'éxecution">
                                    <div class="m_app_icon" style="background-image: url('image/menu/qualité.png')">
                                    </div>
                                    <div class="m_caption">PLM / QUALITÉ</div>
                                </a>
                                <a class="w-25 d-none m_menuitem p-2" href="ModeleAchat.aspx?name=BLFFR"
                                    data-modele="ModeleAchat">
                                    <div class="m_app_icon" style="background-image: url('image/menu/achat.png')"></div>
                                    <div class="m_caption">ACHATS</div>
                                </a>--%>
                                <a class="w-25 d-none m_menuitem p-2" href="ModeleVente.aspx?name=FPRV"
                                    data-modele="ModeleVente">
                                    <div class="m_app_icon" style="background-image: url('image/menu/vente.png')"></div>
                                    <div class="m_caption">VENTES</div>
                                </a>
                                <a class="w-25 m_menuitem p-2" href="Calendar/index.html" title="PLANNING"
                                    data-modele="ModelePlanning">
                                    <div class="m_app_icon"
                                        style="background-image: url('image/menu/PLANING.png')">
                                    </div>
                                    <div class="m_caption">PLANNING</div>
                                </a>
                                <%--<a class="w-25 d-none m_menuitem p-2"
                                    href="ModeleReglementFournisseur.aspx?name=ESPF"
                                    data-modele="ModeleReglementFournisseur">
                                    <div class="m_app_icon" style="background-image: url('image/menu/regfr.png')"></div>
                                    <div class="m_caption">RÉGLEMENT FOURNISSEUR</div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2" href="ModeleReglementClient.aspx?name=ESPC"
                                        data-modele="ModeleReglementClient">
                                        <div class="m_app_icon" style="background-image: url('image/menu/regcl.png')">
                                        </div>
                                        <div class="m_caption">RÉGLEMENT CLIENT</div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2" href="ModeleMarge.aspx?name=parArticle"
                                        data-modele="ModeleMarge">
                                        <div class="m_app_icon" style="background-image: url('image/menu/marge.png')">
                                        </div>
                                        <div class="m_caption">MODÈLE MARGE</div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2" href="ModeleTresorerie.aspx?name=SoldTresor"
                                        data-modele="ModeleTresorerie">
                                        <div class="m_app_icon" style="background-image: url('image/menu/treso.png')">
                                        </div>
                                        <div class="m_caption">TRÉSORERIES</div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2"
                                        href="ModeleCompteFournisseur.aspx?name=DocFournisseur"
                                        data-modele="ModeleCompteFournisseur">
                                        <div class="m_app_icon"
                                            style="background-image: url('image/menu/compteFournisseures.png')">
                                        </div>
                                        <div class="m_caption">COMPTE FOURNISSEUR</div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2" href="ModeleCompteCient.aspx?name=DocClient"
                                        data-modele="ModeleCompteCient">
                                        <div class="m_app_icon"
                                            style="background-image: url('image/menu/compteClients.png')">
                                        </div>
                                        <div class="m_caption">COMPTE CLIENT</div>
                                    </a>--%>
                                    <a class="w-25 d-none m_menuitem p-2" href="ModeleDashboard.aspx?name=Dashboard"
                                        data-modele="ModeleDashboard">
                                        <div class="m_app_icon"
                                            style="background-image: url('image/menu/DASHBOARD.png')"></div>
                                        <div class="m_caption">TABLEAU DE BORD</div>
                                    </a>
                                    <%--<a class="w-25 d-none m_menuitem p-2" href="ModelChiffre.aspx?name=cacl"
                                        data-modele="ModeleDashboard">
                                        <div class="m_app_icon"
                                            style="background-image: url('image/menu/chiffres d\'affaires.png')"></div>
                                        <div class="m_caption">CHIFFRE AFFAIRE </div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2 NvModels" href="#" title="En cours d'éxecution"
                                        data-modele="ModeleMaintenance">
                                        <div class="m_app_icon"
                                            style="background-image: url('image/menu/MAINTENANCE.png')">
                                        </div>
                                        <div class="m_caption">MAINTENANCE</div>
                                    </a>
                                    <a class="w-25 d-none m_menuitem p-2 NvModels" href="#" title="En cours d'éxecution"
                                        data-modele="ModeleProjet">
                                        <div class="m_app_icon"
                                            style="background-image: url('image/menu/PROJET\ 2.png')">
                                        </div>
                                        <div class="m_caption">PROJET</div>
                                    </a>--%>
                        </div>
                    </div>
                </div>
                <div class="tab-pane face" id="menu-paie" role="tabpanel" aria-labelledby="tab-paie">
                    <div class="col-12 d-flex justify-content-center mt-4">
                        <div
                            class="m_appModeles d-flex align-content-start justify-content-lg-start justify-content-center flex-wrap overflow-auto w-100 text-center text-white">
                            <!-- <a class="w-25 d-none m_menuitem p-2" href="ModelePaie/ModeleInfos.aspx?name=Paie_Niveau"
                                title="Infos De Paie" data-modele="Paie_Infos">
                                <div class="m_app_icon" style="background-image: url('image/menu/MENU\ ICONES.png')">
                                </div>
                                <div class="m_caption">INFOS DE PAIE</div>
                            </a> -->
                            <a class="w-25 d-none m_menuitem p-2"
                                href="ModelePaie/ModeleCotisation.aspx?name=Paie_Cotisation"
                                title="Cotisations / Rubriques" data-modele="Paie_Cotisations">
                                <div class="m_app_icon"
                                    style="background-image: url('image/menu/cotisation\ rubrique.png')">
                                </div>
                                <div class="m_caption">COTISATIONS / RUBRIQUES</div>
                            </a>
                            <a class="w-25 d-none m_menuitem p-2" href="ModelePaie/ModeleEmploye.aspx?name=Paie_Employe"
                                title="Employés" data-modele="Paie_Employe">
                                <div class="m_app_icon" style="background-image: url('image/menu/employé.png')">
                                </div>
                                <div class="m_caption">EMPLOYÉS</div>
                            </a>
                            <a class="w-25 d-none m_menuitem p-2" href="ModelePaie/ModeleCalcul.aspx?name=Paie_Avance"
                                title="Calcul" data-modele="Paie_Calcul">
                                <div class="m_app_icon" style="background-image: url('image/menu/calcul\ employé.png')">
                                </div>
                                <div class="m_caption">CALCUL</div>
                            </a>
                            <a class="w-25 d-none m_menuitem p-2" href="ModelePaie/ModelePointage.aspx?name=Paie_Device"
                                title="POINTAGE" data-modele="Paie_Pointage">
                                <div class="m_app_icon" style="background-image: url('image/menu/pointage.png')">
                                </div>
                                <div class="m_caption">POINTAGE</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/moment.js"></script>
        <script src="js/currency.min.js"></script>
        <script src="vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
        <script src="vendors/MDB5/js/mdb.min.js"></script>
        <script src="vendors/sweetalert2/sweetalert2.all.min.js"></script>
        <script src="vendors/select2/select2.min.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/i18n.js"></script>
        <script src="js/ittone.js"></script>
        <script src="js/notification.js"></script>
        <script>

        </script>
    </body>
    <style>
        .nav-tabs .nav-link:hover {
            background-color: #f5f5f500 !important;
        }

        .nav .nav-item.active,
        .nav .nav-item:hover {
            background-color: #f5f5f500 !important;
        }
    </style>

    </html>