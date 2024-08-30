<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="pos_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <title>POS</title>
    <link type="image/x-icon" rel="shortcut icon" href="image/ITTONEERP.ico"/>
    <link rel="stylesheet" href="../../vendors/bootstrap-5.2.0/css/bootstrap.min.css">  
    <link rel="stylesheet" href="../../vendors/MDB5/css/mdb.min.css">
    <link rel="stylesheet" href="../../vendors/fontawesome-free-6.1.2/css/all.min.css">
    <link rel="stylesheet" href="../../vendors/sweetalert2/sweetalert2.min.css">
    <link rel="stylesheet" href="../../vendors/select2/select2.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container-fluid h-100">
        <header>
            <div class="row top-header text-white">
                <div class="col-3">
                    <span class="p-2 ms-1 fs-5 lin-h" id="homeMenu"><i class="fa-solid fa-house"></i></span>
                    <img src="../image/app/logo.png" height="20">
                    <span class="text-white-opacity fs-6 float-end" id="nomClient">nomClient</span>
                </div>
                <div class="col-4">
                    <div class="lin-h d-flex flex-nowrap">
                        <div class="touch-scrollableX text-nowrap">
                            <div class="order-button selected">
                                <span class="order-sequence">1</span>
                                Active
                            </div>
                            <div class="order-button">
                                <span class="order-sequence">2</span>
                            </div>
                            <div class="order-button">
                                <span class="order-sequence">3</span>
                            </div>
                            <div class="order-button">
                                <span class="order-sequence">3</span>
                            </div>
                            <div class="order-button">
                                <span class="order-sequence">3</span>
                            </div>
                            <div class="order-button">
                                <span class="order-sequence">3</span>
                            </div>
                            <div class="order-button">
                                <span class="order-sequence">3</span>
                            </div>
                        </div>
                        <span class="order-button square neworder-button btn">
                            <i class="fa fa-plus"></i>
                        </span>
                        <span class="order-button square deleteorder-button btn">
                        <i class="fa fa-minus"></i>
                        </span>   
                    </div>
                </div>
                <div class="col-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text bg-white"><i class="fas fa-search"></i></span>
                        <input
                          type="search"
                          class="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                    </div>
                </div>
                <div class="col-2 lin-h">
                    <div class="fs-6 mx-2 text-nowrap overflow-hidden" style="max-width: 70%;">nameCaissier</div>
                    <span class="me-2 fs-1" id="ferme"><i class="fa-solid fa-right-to-bracket"></i></span>
                </div>
            </div>
        </header>
        <div class="product-screen screen">
            <div class="row h-100">
                <div class="col-5 h-100 leftPane p-0">
                    <div class="row subwindow">
                        <div class="order-container">
                            <ul class="orderlines">
                                <li class="orderline selected">
                                    <span class="nomArticle">qsf</span>
                                    <span class="totalVente">0.00 DH</span>
                                    <ul class="info-list">
                                        <li class="info">
                                            <span class="qte">5.00</span>  <span>unité</span>, <span class="prixVente">0.00 DH</span>  
                                        </li>
                                    </ul>
                                </li>
                                <li class="orderline">
                                    <span class="nomArticle">NomenClature</span>
                                    <span class="totalVente">0.00 DH</span>
                                    <ul class="info-list">
                                        <li class="info">
                                            <span class="qte">1.00</span>  <span>unité</span>, <span class="prixVente">0.00 DH</span>  
                                        </li>
                                    </ul>
                                </li>
                                <li class="orderline">
                                    <span class="nomArticle">NomenClature</span>
                                    <span class="totalVente">0.00 DH</span>
                                    <ul class="info-list">
                                        <li class="info">
                                            <span class="qte">1.00</span>  <span>unité</span>, <span class="prixVente">0.00 DH</span>  
                                        </li>
                                    </ul>
                                </li>
                                <li class="orderline">
                                    <span class="nomArticle">NomenClature</span>
                                    <span class="totalVente">0.00 DH</span>
                                    <ul class="info-list">
                                        <li class="info">
                                            <span class="qte">1.00</span>  <span>unité</span>, <span class="prixVente">0.00 DH</span>  
                                        </li>
                                    </ul>
                                </li>
                                <li class="orderline">
                                    <span class="nomArticle">NomenClature</span>
                                    <span class="totalVente">0.00 DH</span>
                                    <ul class="info-list">
                                        <li class="info">
                                            <span class="qte">1.00</span>  <span>unité</span>, <span class="prixVente">0.00 DH</span>  
                                        </li>
                                    </ul>
                                </li>
                                <li class="orderline">
                                    <span class="nomArticle">NomenClature</span>
                                    <span class="totalVente">0.00 DH</span>
                                    <ul class="info-list">
                                        <li class="info">
                                            <span class="qte">1.00</span>  <span>unité</span>, <span class="prixVente">0.00 DH</span>  
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="summary">
                                <div class="d-inline-block float-start mx-2">
                                    <i class="fas fa-shopping-basket text-footer" style="padding-right: 10px;"></i>
                                    <span id="count-lient">0</span>
                                    
                                </div>
                                <div class="entry total d-inline-block">
                                    <span>Total: </span>
                                    <span class="value">0.00 DH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 ">
                        <div class="pads">
                            <div class="row">
                                <div class="col-4 mt-2 p-0">
                                    <button class="btn btn-secondary w-100 btnClient" onclick="return false">
                                        <i  class="fa fa-user" role="img" title="Client"></i>Client
                                    </button>
                                    <button class="btn btn-success w-100 btnPayment" onclick="return false">
                                        <div class="pay-circle">
                                            <i aria-label="Pay" class="fa fa-chevron-right" role="img" title="Payer"></i>
                                        </div>
                                        Paiement
                                    </button>
                                </div>
                                <div class="col-8 mt-2 p-0">
                                    <div class="btn-group numbersGroup fs-1" role="group">
                                        <button type="button" class="btn btn-primary">1</button>
                                        <button type="button" class="btn btn-primary">2</button>
                                        <button type="button" class="btn btn-primary">3</button>
                                        <button type="button" class="btn btn-primary mode-button selected">Qté</button>
                                    </div>
                                    <div class="btn-group numbersGroup" role="group">
                                        <button type="button" class="btn btn-primary">4</button>
                                        <button type="button" class="btn btn-primary">5</button>
                                        <button type="button" class="btn btn-primary">6</button>
                                        <button type="button" class="btn btn-primary mode-button">Rem</button>
                                    </div>
                                    <div class="btn-group numbersGroup" role="group">
                                        <button type="button" class="btn btn-primary">7</button>
                                        <button type="button" class="btn btn-primary">8</button>
                                        <button type="button" class="btn btn-primary">9</button>
                                        <button type="button" class="btn btn-primary mode-button">Prix</button>
                                    </div>
                                    <div class="btn-group numbersGroup" role="group">
                                        <button type="button" class="btn btn-primary">+/-</button>
                                        <button type="button" class="btn btn-primary">0</button>
                                        <button type="button" class="btn btn-primary">.</button>
                                        <button type="button" class="btn btn-primary"><i class="fa-solid fa-delete-left"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div class="btn-group numbersGroup" role="group">
                                        <button type="button" class="btn btn-primary">Annuler</button>
                                        <button type="button" class="btn btn-primary">Annuler Tout</button>
                                        <button type="button" class="btn btn-primary">Depenses</button>
                                    </div>
                                    <div class="btn-group numbersGroup" role="group">
                                        <button type="button" class="btn btn-primary">Select Avoir</button>
                                        <button type="button" class="btn btn-primary">Suivant <i class="fa fa-angle-double-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-7 h-100">
                    <div class="row h-25 overflow-auto" style="border-bottom: 2px solid var(--color-ittone-2);">
                        <div class="col-12 d-flex flex-wrap groupFamille">
                            <span type="button" class="btn favoritebtn" ><i class="fas fa-star"></i>Favoris</span>
                            <span type="button" class="btn btn-primary"><img src="../image/data/famile/category.jpg"></span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary"><img src="../image/data/famile/Default.png"></span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                            <span type="button" class="btn btn-primary">Select Avoir</span>
                        </div>
                    </div>
                    <div class="row h-75">
                        <div class="col-12 h-100">
                            <div class="product-list-scroller h-100 overflow-auto">
                                <div class="product-list">
                                    <article class="product btn" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                    <article class="product" data-product-id="AR001" ar-umvente="unité">
                                        <div class="product-img">
                                            <img src="../image/data/article/Default.png">
                                            <span class="price-tag">0</span>
                                        </div>
                                        <div class="product-name">qsf</div>
                                    </article>
                                </div>
                            </div>
                            <div class="footer-pos">
                                <div>
                                    <span>Solde : </span>
                                    <span id="solde-encore">0.00 DH</span>
                                </div>
                                <div>
                                    <span id="date-footer">26/11/2022 01:39:23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
    </div>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <script src="../js/moment.js"></script>
    <script src="../js/currency.min.js"></script>
    <script src="../vendors/bootstrap-5.2.0/js/bootstrap.bundle.min.js"></script>
    <script src="../vendors/MDB5/js/mdb.min.js"></script> 
    <script src="../vendors/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="../vendors/select2/select2.min.js"></script>   
</body>
</html>
