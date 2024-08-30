<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Pos_Default" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <title>Pos</title>
        <link type="image/x-icon" rel="shortcut icon" href="img/icon.ico" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta http-equiv="content-type" content="text/html, charset=utf-8" />
        <meta name="viewport" content=" width=1024, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="../../vendors/fontawesome-free-6.1.2/css/all.min.css">
        <link rel="stylesheet" href="../../vendors/sweetalert2/sweetalert2.min.css">
        <link rel="stylesheet" href="../../vendors/select2/select2.min.css">
        <link rel="stylesheet" href="css/style.css">

    </head>

    <body>
        <form id="form1" runat="server">
            <div class="pos">
                <div class="pos-topheader" id="pos_topheader" runat="server">
                    <div class="pos-branding">
                        <%-- <img alt="Logo" class="pos-logo" src="img/9_148x148.png" />--%>
                            <div class="fa o_menu_toggle fa-th"></div>
                            <img alt="Logo" class="pos-logo" src="img/logo.png" />
                            <span class="Return-button oe_hidden">
                        <i aria-label="Back to floor" class="fa fa-angle-double-left" role="img" title="Back"></i>
                        <span class="table-name">Return
                        </span>
                            </span>
                            <span class="client-info"></span>
                    </div>
                    <div class="pos-rightheader">
                        <div class="order-selector">
                            <span class="orders touch-scrollable"></span>
                            <span class="order-button square neworder-button">
                            <i class="fa fa-plus" role="img" aria-label="New order" title="New order"></i>
                        </span>
                            <span class="order-button square deleteorder-button">
                            <i class="fa fa-minus" role="img" aria-label="Delete order" title="Delete order"></i>
                        </span>
                            <span class="order-button floor-button oe_hidden">
                            <i aria-label="Back to floor" class="fa fa-angle-double-left" role="img" title="Back to floor"></i>
                            <span class="table-name">( T1 )
                            </span>
                            </span>
                        </div>
                        <div class="oe_status">
                            <span class="username"></span>
                            <div class="searchbox">
                                <input placeholder="Recherche d'articles" />
                            </div>
                        </div>
                        <div class="header-button Fermer oe_hidden">Fermer</div>
                    </div>
                </div>
                <div class="pos-content">
                    <div class="window">
                        <div class="subwindow">
                            <div class="subwindow-container">
                                <div class="subwindow-container-fix screens">
                                    <div class="login-screen screen"></div>
                                    <div class="product-screen screen ">
                                        <div class="leftpane">
                                            <div class="window">
                                                <div class="subwindow">
                                                    <div class="subwindow-container">
                                                        <div class="subwindow-container-fix">
                                                            <div class="order-container">
                                                                <div class="order-scroller touch-scrollable">
                                                                    <div class="order">
                                                                        <div class="order-empty">
                                                                            <h1>Votre panier est vide</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="subwindow collapsed">
                                                    <div class="subwindow-container">
                                                        <div class="subwindow-container-fix pads">
                                                            <div class="actionpad">
                                                                <button class="button set-customer" onclick="return false">
                                                                <i aria-label="Customer" class="fa fa-user" role="img" title="Client"></i>Client
                                                            </button>
                                                                <button class="button pay" onclick="return false">
                                                                <div class="pay-circle"><i aria-label="Pay" class="fa fa-chevron-right" role="img" title="Payer"></i></div>
                                                                Paiement
                                                            </button>
                                                            </div>
                                                            <div class="numpad">
                                                                <button class="input-button number-char" onclick="return false">1</button>
                                                                <button class="input-button number-char" onclick="return false">2</button>
                                                                <button class="input-button number-char" onclick="return false">3</button>
                                                                <button class="mode-button selected-mode" onclick="return false">Qté</button>
                                                                <br />
                                                                <button class="input-button number-char" onclick="return false">4</button>
                                                                <button class="input-button number-char" onclick="return false">5</button>
                                                                <button class="input-button number-char" onclick="return false">6</button>
                                                                <button class="mode-button" id="rem" onclick="return false">Rem.</button>
                                                                <br />
                                                                <button class="input-button number-char" onclick="return false">7</button>
                                                                <button class="input-button number-char" onclick="return false">8</button>
                                                                <button class="input-button number-char" onclick="return false">9</button>
                                                                <button class="mode-button" id="prix" onclick="return false">Prix</button>
                                                                <br />
                                                                <button class="input-button numpad-minus" onclick="return false">+/-</button>
                                                                <button class="input-button number-char" onclick="return false">0</button>
                                                                <button class="input-button number-char" onclick="return false">.</button>
                                                                <button class="input-button numpad-backspace" onclick="return false">
                                                                <img alt="Retour arrière" height="21" src="img/backspace.png" style="pointer-events: none;" width="24" /></button>
                                                            </div>
                                                            <div class="commandnpad" id="commandnpad">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="rightpane">
                                            <table class="layout-table">
                                                <tr class="header-row">
                                                    <td>
                                                        <div class="btnfavorite">
                                                            <article class="favorite favoritebtn" style="background-color: orange;">
                                                                <i class="fas fa-star"></i>Favoris
                                                            </article>
                                                            <article class="favorite offerbtn" style="background-color: #82C91E;">
                                                                <i class="fas fa-gift"></i>Offre
                                                            </article>
                                                        </div>
                                                    </td>
                                                    <td class="header-cell">
                                                        <div>
                                                            <header class="rightpane-header">
                                                                <div class="content-container">
                                                                    <div class="famile-list-container">
                                                                        <div class="famile-list-scroller touch-scrollable">
                                                                            <div class="famile-list">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </header>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="content-row">
                                                    <td class="content-cell">
                                                        <div class="content-container">
                                                            <div class="product-list-container">
                                                                <div class="product-list-scroller touch-scrollable">
                                                                    <div class="product-list">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="footer-pos">
                                                            <div class=" flex flex-reght">
                                                                <i class="fas fa-shopping-basket text-footer" style="padding-right: 10px;"></i>
                                                                <span class="text-footer" id="count-lient">0</span>
                                                            </div>
                                                            <div class="flex flex-reght">
                                                                <span class="text-footer">Solde : </span>
                                                                <span class="text-footer" id="solde-encore">0.0DH</span>
                                                            </div>
                                                            <div class=" flex flex-left">
                                                                <span class="text-footer" id="date-footer">Wed Jun 17 2020 22:48:33</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="payment-screen screen oe_hidden">
                                        <div class="screen-content">
                                            <div class="top-content">
                                                <span class="button back">
                                                <i class="fa fa-angle-double-left">Retour</i>
                                            </span>
                                                <h1>Paiement</h1>
                                                <span class="button next">Valider
                                    <i class="fa fa-angle-double-right"></i>
                                            </span>
                                            </div>
                                            <div class="left-content pc40 touch-scrollable scrollable-y">
                                                <div class="paymentmethods-container" id="paymentmethods">
                                                </div>
                                            </div>
                                            <div class="right-content pc60 touch-scrollable scrollable-y">
                                                <section class="paymentlines-container">
                                                    <div class="paymentlines-empty">
                                                        <div class="total">
                                                            18.00 DH
                                                        </div>
                                                        <div class="message">
                                                            Veuillez sélectionner une méthode de paiement.
                                                        </div>
                                                    </div>
                                                </section>
                                                <section class="payment-numpad">
                                                    <div class="numpad">
                                                        <button class="input-button number-char" onclick="return false">1</button>
                                                        <button class="input-button number-char" onclick="return false">2</button>
                                                        <button class="input-button number-char" onclick="return false">3</button>
                                                        <button class="mode-button" onclick="return false">+10</button>
                                                        <br />
                                                        <button class="input-button number-char" onclick="return false">4</button>
                                                        <button class="input-button number-char" onclick="return false">5</button>
                                                        <button class="input-button number-char" onclick="return false">6</button>
                                                        <button class="mode-button" onclick="return false">+20</button>
                                                        <br />
                                                        <button class="input-button number-char" onclick="return false">7</button>
                                                        <button class="input-button number-char" onclick="return false">8</button>
                                                        <button class="input-button number-char" onclick="return false">9</button>
                                                        <button class="mode-button" onclick="return false">+50</button>
                                                        <br />
                                                        <button class="input-button numpad-char" onclick="return false">C</button>
                                                        <button class="input-button number-char" onclick="return false">0</button>
                                                        <button class="input-button number-char" onclick="return false">.</button>
                                                        <button class="input-button numpad-backspace" onclick="return false">
                                                        <img alt="Retour arrière" height="21" src="img/backspace.png" style="pointer-events: none;" width="24" /></button>
                                                    </div>
                                                </section>
                                                <div class="payment-buttons">
                                                    <div class="button js_set_customer">
                                                        <i aria-label="Customer" class="fa fa-user" role="img" title="Client"></i>
                                                        <span class="js_customer_name">Client
                                                    </span>
                                                    </div>
                                                    <div class="button js_set_client_fid">
                                                        <i aria-label="Customer" class="fa fa-user-friends" role="img" title="Client"></i>
                                                        <span class="js_customer_name">Client Fidilite
                                                    </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="receipt-screen screen oe_hidden">
                                        <div class="screen-content">
                                            <div class="top-content">
                                                <h1>Rendu : <span class="change-value">400.00 DH</span></h1>
                                                <span class="button next highlight">Commande suivante
                                            </span>
                                            </div>
                                            <div class="centered-content touch-scrollable">
                                                <div class="button print">
                                                    <i class="fa fa-print"></i> Imprimer le ticket
                                                </div>
                                                <div class="pos-receipt-container">
                                                    <div class="pos-sale-ticket">
                                                    </div>
                                                    <%-- <img id="barcode1"/>--%>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clientlist-screen screen oe_hidden">
                                        <div class="screen-content">
                                            <section class="top-content">
                                                <span class="button back">
                                                    <i class="fa fa-angle-double-left"></i>
                                                        Annuler
                                                </span>
                                                <span class="button" id="ajouterClient" style="left: 140px;padding: 3px 20px;">
                                                    <i class="fa fa-plus-circle"></i>
                                                </span>
                                                <span class="searchbox">
                                                <input placeholder="Rechercher un client" />
                                                <span class="search-clear"></span>
                                                </span>
                                                <span class="searchbox"></span>
                                                
                                                <span class="button next">Sélectionnez un client
                                                    <i class="fa fa-angle-double-right"></i>
                                                </span>
                                            </section>
                                            <section class="full-content">
                                                <div class="window">

                                                    <section class="subwindow">
                                                        <div class="subwindow-container">
                                                            <div class="subwindow-container-fix touch-scrollable scrollable-y" style="height: 100%;">
                                                                <table class="client-list">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Code</th>
                                                                            <th>Nom</th>
                                                                            <th>Adresse</th>
                                                                            <th>Tele</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody class="client-list-contents">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="floor-screen screen oe_hidden">
                                        <div class="screen-content-flexbox">
                                            <div class="floor-selector">
                                            </div>
                                            <div class="floor-map">
                                                <div class="tables"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="archive-screen screen oe_hidden">
                                        <div class="leftpane">
                                            <div class="window">
                                                <div class="subwindow">
                                                    <div class="subwindow-container">
                                                        <div class="subwindow-container-fix">
                                                            <div class="history-container">
                                                                <div class="btn-history">
                                                                    <button class="button ticket" onclick="return false">
                                                                    Selection Ticket
                                                                </button>
                                                                </div>
                                                                <div class="history-scroller touch-scrollable">
                                                                    <div class="history">

                                                                        <div class="d-filtre oe_hidden">
                                                                            <h1>Filter search</h1>
                                                                            <div class="Filter-history">
                                                                                <span>Day : </span>
                                                                                <select class="select-date">
                                                                                <option>1</option>
                                                                                <option>2</option>
                                                                            </select>
                                                                                <span>Month : </span>
                                                                                <select class="select-date">
                                                                                <option>1</option>
                                                                                <option>2</option>
                                                                            </select>
                                                                            </div>
                                                                        </div>
                                                                        <ul class="archives">
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="rightpane">
                                            <div class="content-container">
                                                <div class="header-details">
                                                    <div class="layout-details" id="details">
                                                        <table>
                                                        </table>

                                                    </div>
                                                    <div class="btn-print">
                                                        <button class="button print" onclick="return false">
                                                        <i class="fa fa-print" role="img" title="print"></i>
                                                        Impreme Z
                                                    </button>
                                                    </div>
                                                </div>
                                                <div class="list-lgn">
                                                    <div class="content-lgn">
                                                        <table id="table-lgn">
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <iframe id="myFrame" class="screen oe_hidden" src="" style="height: 100%"></iframe>
                                    <iframe id="print4A" class="screen oe_hidden" src="" style="height: 100%"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="keyboard_frame" style="display: none; height: 0px;">
                        <ul class="keyboard simple_keyboard">
                            <li class="symbol firstitem row_qwerty"><span class="off" style="display: inline;">q</span><span class="on" style="display: none;">1</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">w</span><span class="on" style="display: none;">2</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">e</span><span class="on" style="display: none;">3</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">r</span><span class="on" style="display: none;">4</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">t</span><span class="on" style="display: none;">5</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">y</span><span class="on" style="display: none;">6</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">u</span><span class="on" style="display: none;">7</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">i</span><span class="on" style="display: none;">8</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">o</span><span class="on" style="display: none;">9</span></li>
                            <li class="symbol lastitem"><span class="off" style="display: inline;">p</span><span class="on" style="display: none;">0</span></li>

                            <li class="symbol firstitem row_asdf"><span class="off" style="display: inline;">a</span><span class="on" style="display: none;">@</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">s</span><span class="on" style="display: none;">#</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">d</span><span class="on" style="display: none;">%</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">f</span><span class="on" style="display: none;">*</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">g</span><span class="on" style="display: none;">/</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">h</span><span class="on" style="display: none;">-</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">j</span><span class="on" style="display: none;">+</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">k</span><span class="on" style="display: none;">(</span></li>
                            <li class="symbol lastitem"><span class="off" style="display: inline;">l</span><span class="on" style="display: none;">)</span></li>

                            <li class="symbol firstitem row_zxcv"><span class="off" style="display: inline;">z</span><span class="on" style="display: none;">?</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">x</span><span class="on" style="display: none;">!</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">c</span><span class="on" style="display: none;">"</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">v</span><span class="on" style="display: none;">'</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">b</span><span class="on" style="display: none;">:</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">n</span><span class="on" style="display: none;">;</span></li>
                            <li class="symbol"><span class="off" style="display: inline;">m</span><span class="on" style="display: none;">,</span></li>
                            <li class="delete lastitem">supprimer</li>

                            <li class="numlock firstitem row_space"><span class="off" style="display: inline;">123</span><span class="on" style="display: none;">ABC</span></li>
                            <li class="space"> </li>
                            <li class="symbol"><span class="off" style="display: inline;">.</span><span class="on" style="display: none;">.</span></li>
                            <li class="return lastitem"><i class="fas fa-search"></i></li>
                        </ul>
                        <p class="close_button">fermer</p>
                    </div>
                </div>
                <div class="popups">
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-textinput">
                            <header class="title">
                                Nom de la table?
                            </header>
                            <input type="text" value="" />
                            <div class="footer">
                                <div class="button confirm">OK</div>
                                <div class="button cancel">Annuler</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-number">
                            <header class="title">
                                Nombre de sièges?
                            </header>
                            <div class="popup-input value active">
                                3
                            </div>
                            <div class="popup-numpad">
                                <button class="input-button number-char" data-action="1" onclick="return false">1</button>
                                <button class="input-button number-char" data-action="2" onclick="return false">2</button>
                                <button class="input-button number-char" data-action="3" onclick="return false">3</button>
                                <br />
                                <button class="input-button number-char" data-action="4" onclick="return false">4</button>
                                <button class="input-button number-char" data-action="5" onclick="return false">5</button>
                                <button class="input-button number-char" data-action="6" onclick="return false">6</button>
                                <br />
                                <button class="input-button number-char" data-action="7" onclick="return false">7</button>
                                <button class="input-button number-char" data-action="8" onclick="return false">8</button>
                                <button class="input-button number-char" data-action="9" onclick="return false">9</button>
                                <br />
                                <button class="input-button numpad-char" data-action="CLEAR" onclick="return false">C</button>
                                <button class="input-button number-char" data-action="0" onclick="return false">0</button>
                                <button class="input-button numpad-backspace" data-action="BACKSPACE" onclick="return false">
                                <img alt="Retour arrière" height="21" src="img/backspace.png" style="pointer-events: none;" width="24" />
                            </button>
                                <br />
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Annuler</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog " role="dialog">
                        <div class="popup popup-password">
                            <header class="title">
                                Password
                            </header>
                            <input type="hidden" id="passWordLogin">
                            <div class="popup-input value active">
                                0
                            </div>
                            <div class="popup-numpad">
                                <button class="input-button number-char" data-action="1" onclick="return false">1</button>
                                <button class="input-button number-char" data-action="2" onclick="return false">2</button>
                                <button class="input-button number-char" data-action="3" onclick="return false">3</button>
                                <br />
                                <button class="input-button number-char" data-action="4" onclick="return false">4</button>
                                <button class="input-button number-char" data-action="5" onclick="return false">5</button>
                                <button class="input-button number-char" data-action="6" onclick="return false">6</button>
                                <br />
                                <button class="input-button number-char" data-action="7" onclick="return false">7</button>
                                <button class="input-button number-char" data-action="8" onclick="return false">8</button>
                                <button class="input-button number-char" data-action="9" onclick="return false">9</button>
                                <br />
                                <button class="input-button numpad-char" data-action="CLEAR" onclick="return false">C</button>
                                <button class="input-button number-char" data-action="0" onclick="return false">0</button>
                                <button class="input-button numpad-backspace" data-action="BACKSPACE" onclick="return false">
                                <img alt="Retour arrière" height="21" src="img/backspace.png" style="pointer-events: none;" width="24" />
                            </button>
                                <br />
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Quitter</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-Session">
                            <header class="title">
                                Open Session
                            </header>
                            <input type="hidden" id="sessionWord">
                            <div class="popup-input value active">
                                0
                            </div>
                            <div class="popup-numpad">
                                <button class="input-button number-char" data-action="1" onclick="return false">1</button>
                                <button class="input-button number-char" data-action="2" onclick="return false">2</button>
                                <button class="input-button number-char" data-action="3" onclick="return false">3</button>
                                <br />
                                <button class="input-button number-char" data-action="4" onclick="return false">4</button>
                                <button class="input-button number-char" data-action="5" onclick="return false">5</button>
                                <button class="input-button number-char" data-action="6" onclick="return false">6</button>
                                <br />
                                <button class="input-button number-char" data-action="7" onclick="return false">7</button>
                                <button class="input-button number-char" data-action="8" onclick="return false">8</button>
                                <button class="input-button number-char" data-action="9" onclick="return false">9</button>
                                <br />
                                <button class="input-button numpad-char" data-action="CLEAR" onclick="return false">C</button>
                                <button class="input-button number-char" data-action="0" onclick="return false">0</button>
                                <button class="input-button number-char" data-action="." onclick="return false">.</button>
                                <br />
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Annuler</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-note">
                            <header class="title">
                                Ajoutez une note
                            </header>
                            <textarea></textarea>
                            <ul class="variant"></ul>
                            <div class="footer">
                                <div class="button confirm">OK</div>
                                <div class="button cancel">Annuler</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-messager">
                            <header class="title">
                                Messager
                            </header>
                            <div class="message"></div>
                            <div class="footer">
                                <div class="button confirm">OK</div>
                                <div class="button cancel">Annuler</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-password-confirmer">
                            <header class="title">
                                Password
                            </header>
                            <div class="popup-input value active">
                                0
                            </div>
                            <div class="popup-numpad">
                                <button class="input-button number-char" data-action="1" onclick="return false">1</button>
                                <button class="input-button number-char" data-action="2" onclick="return false">2</button>
                                <button class="input-button number-char" data-action="3" onclick="return false">3</button>
                                <br />
                                <button class="input-button number-char" data-action="4" onclick="return false">4</button>
                                <button class="input-button number-char" data-action="5" onclick="return false">5</button>
                                <button class="input-button number-char" data-action="6" onclick="return false">6</button>
                                <br />
                                <button class="input-button number-char" data-action="7" onclick="return false">7</button>
                                <button class="input-button number-char" data-action="8" onclick="return false">8</button>
                                <button class="input-button number-char" data-action="9" onclick="return false">9</button>
                                <br />
                                <button class="input-button numpad-char" data-action="CLEAR" onclick="return false">C</button>
                                <button class="input-button number-char" data-action="0" onclick="return false">0</button>
                                <button class="input-button numpad-backspace" data-action="BACKSPACE" onclick="return false">
                                <img alt="Retour arrière" height="21" src="img/backspace.png" style="pointer-events: none;" width="24" />
                            </button>
                                <br />
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Annuler</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-confirm">
                            <header class="title">
                                Confirm
                            </header>
                            <div class="message"></div>
                            <div class="footer">
                                <div class="button confirm">OK</div>
                                <div class="button cancel">Annuler</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-serveur">
                            <header class="title">
                                selection une serveur
                            </header>
                            <div class="serveurs" id="list_serveur">
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Ferme</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-depenses-recettes">
                            <header class="title">
                                Dépenses & Recettes
                            </header>
                            <ul>
                                <li>
                                    <input type="radio" id="f-option" name="selector" value="DPS" checked/>
                                    <label for="f-option">DÉPENSES</label>
                                    <div class="check"></div>
                                </li>

                                <li>
                                    <input type="radio" id="s-option" name="selector" value="RCT" />
                                    <label for="s-option">RECETTES</label>
                                    <div class="check">
                                    </div>
                                </li>
                            </ul>
                            <div class="select-input">
                                <label>Service</label>
                                <select id="select-input">
                                
                            </select>

                            </div>
                            <label>Description</label> <input type="text" id="txt-Descri" style="width: 60%;margin-top: 10px;font-size: 20px;" />
                            <label>Montant</label> <input type="text" id="txt-m" />
                            <div class="popup-numpad">
                                <button class="input-button number-char" data-action="1" onclick="return false">1</button>
                                <button class="input-button number-char" data-action="2" onclick="return false">2</button>
                                <button class="input-button number-char" data-action="3" onclick="return false">3</button>
                                <br />
                                <button class="input-button number-char" data-action="4" onclick="return false">4</button>
                                <button class="input-button number-char" data-action="5" onclick="return false">5</button>
                                <button class="input-button number-char" data-action="6" onclick="return false">6</button>
                                <br />
                                <button class="input-button number-char" data-action="7" onclick="return false">7</button>
                                <button class="input-button number-char" data-action="8" onclick="return false">8</button>
                                <button class="input-button number-char" data-action="9" onclick="return false">9</button>
                                <br />
                                <button class="input-button numpad-char" data-action="CLEAR" onclick="return false">C</button>
                                <button class="input-button number-char" data-action="0" onclick="return false">0</button>
                                <button class="input-button number-char" data-action="." onclick="return false">.</button>
                                <br />
                            </div>
                            <div class="footer">
                                <div class="button confirm">OK</div>
                                <div class="button cancel">Annuler</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-client-fid">
                            <header class="title">
                                Code-Barre Client
                            </header>
                            <div class="container-fid">
                                <input type="text" />
                                <div class="popup-numpad">
                                    <button class="input-button number-char" data-action="1" onclick="return false">1</button>
                                    <button class="input-button number-char" data-action="2" onclick="return false">2</button>
                                    <button class="input-button number-char" data-action="3" onclick="return false">3</button>
                                    <br />
                                    <button class="input-button number-char" data-action="4" onclick="return false">4</button>
                                    <button class="input-button number-char" data-action="5" onclick="return false">5</button>
                                    <button class="input-button number-char" data-action="6" onclick="return false">6</button>
                                    <br />
                                    <button class="input-button number-char" data-action="7" onclick="return false">7</button>
                                    <button class="input-button number-char" data-action="8" onclick="return false">8</button>
                                    <button class="input-button number-char" data-action="9" onclick="return false">9</button>
                                    <br />
                                    <button class="input-button numpad-char" data-action="CLEAR" onclick="return false">C</button>
                                    <button class="input-button number-char" data-action="0" onclick="return false">0</button>
                                    <button class="input-button numpad-backspace" data-action="BACKSPACE" onclick="return false">
                                <img alt="Retour arrière" height="21" src="img/backspace.png" style="pointer-events: none;" width="24" />
                            </button>
                                    <br />
                                </div>
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Annuler</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup-list-offers">
                            <header class="title">
                                Liste des Offres
                            </header>
                            <div class="informationFid">
                                <span id="codeFid">CL001</span> / <span id="nameFid"></span>
                                <h2 id="pointFid" class="focus-in-contract"></h2>
                            </div>
                            <div class="container-fid" id="list-offers">
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Annuler</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-dialog oe_hidden" role="dialog">
                        <div class="popup popup_Ajouter_Client">
                            <header class="title">
                                Ajouter Client
                            </header>
                            <div class="container-fid">
                               <div style="margin: 10px;"><label>Code Client</label> <input type="text" id="codeClient" /></div> 
                               <div style="margin: 10px;"><label>Nom Client</label> <input type="text" id="nomClient"/></div> 
                               <div style="margin: 10px;"> <label>Tele Client</label> <input type="text" id="teleClient"/></div> 
                            </div>
                            <div class="footer centered">
                                <div class="button cancel">Annuler</div>
                                <div class="button confirm">OK</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="../js/jquery-3.6.0.min.js"></script>
            <script src="../js/jquery-ui.js"></script>
            <script src="../js/moment.js"></script>
            <script src="../js/currency.min.js"></script>
            <script src="../vendors/sweetalert2/sweetalert2.all.min.js"></script>
            <script src="../vendors/select2/select2.min.js"></script> 
            <script src="../js/i18n.js"></script> 
            <script src="js/core/app.js"></script>
            <script src="js/app/custom.js"></script>
            <script type="module" src="js/app/login.js"></script>
            <script type="module" src="js/app/pos.js"></script>
        </form>
    </body>

    </html>