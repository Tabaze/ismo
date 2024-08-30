<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <title>Login | Manager</title>
    <link type="image/x-icon" rel="shortcut icon" href="image/logo/ITTONEERP.ico"/>  
    <link rel="stylesheet" href="css/global.css"/>
</head>
<body>
    <section class="home min-vh-100">
        <div class="container">
            <div class="row">
                <div class="d-flex align-items-end justify-content-center min-vh-100">
                    <div class="h-50">
                        <span class="btnSignHome">
                            <button type="button" class="btn fw-bold btn-rounded ps-5 pe-5 fs-5" style="color: white; border: 2px solid rgb(160, 239, 246);" onclick="goToSignIn()">se connecter</button>
                        </span>
                    </div>
                </div> 
            </div>
        </div>
    </section>
    <section class="sign-in" style="display: none;">
        <div class="container-full">
            <div class="row m-0 p-0">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 bg min-vh-100 p-0 m-0  hide-on-mobile"></div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0 m-0 min-vh-100">
                    <div class="h-40 bg-ittone">
                        <div class="h-100 bg-white text-center"  style="border-bottom-left-radius: 60px;">
                            <div class="carousel slide h-100" data-bs-ride="carousel">
                                <div class="carousel-inner h-100">
                                    <div class="carousel-item h-100 p-5 active">
                                        <h1 class="fs-4rem text-ittone text-center fw-bold">Bienvenue sur le logiciel ITTONE ERP !</h1>
                                        <span class="fs-6"> Nous assurons qu'il facilitera votre travail quotidien.</span>
                                    </div>
                                    <div class="carousel-item p-5">
                                        <h1 class="fs-4rem text-ittone text-center fw-bold">ON FAIT LA DIFFÉRENCE </h1>
                                        <span class="fs-6">On vous présente un logiciel qui comprend l'ensemble des modèles de gestion commerciale développé par ITTONE destiné à vous quelques soient les spécificités de votre activité ou la taille de votre entreprise sous le nom ITTONE ERP.
Du devis à la facturation en passant par l’approvisionnement, les stocks et la fabrication, restez connecté à vos processus de gestion et à votre écosystème, que vous soyez au bureau, en télétravail ou en déplacement, le tout avec une solution en mode on premise ou hébergé.
</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="h-60 bg-ittone text-center" style="border-top-right-radius: 60px;">
                        <div class="m-auto w-75 w-sm-75 w-md-75 w-lg-50">
                            <ul class="nav justify-content-between p-4 mb-4" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link active p-0 fs-3" id="pills-signIn-tab" data-bs-toggle="pill" data-bs-target="#pills-signIn" type="button" role="tab" aria-controls="pills-signIn" aria-selected="true">se connecter</span>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link p-0 fs-3" id="pillssignUptab" data-bs-toggle="pill" data-bs-target="#pills-signUp" type="button" role="tab" aria-controls="pills-signUp" aria-selected="false" runat="server">Créer</span>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-signIn" role="tabpanel" aria-labelledby="pills-signIn-tab" tabindex="0">
                                    <form class="needs-validation" novalidate autocomplete="off" id="formLogin">
                                        <div class="input-group flex-nowrap mb-5">
                                            <span class="input-group-text ptb-30px"><i class="fa-solid fa-user"></i></span>
                                            <input
                                            type="text"
                                            class="form-control ptb-30px"
                                            aria-label="Username"
                                            placeholder="Nom d'utilisateur"
                                            aria-describedby="basic-addon1"
                                            name="userName"
                                            required 
                                            />
                                            <div class="invalid-feedback mt-5 pt-3">
                                              Nom d'utilisateur est exigé.
                                            </div>
                                        </div>
                                        <div class="input-group flex-nowrap mb-5">
                                            <span class="input-group-text ptb-30px"><i class="fa-solid fa-lock"></i></span>
                                            <input
                                            type="password"
                                            class="form-control ptb-30px"
                                            aria-label="Password"
                                            placeholder="Mot de passe"
                                            aria-describedby="basic-addon1"
                                            name="passwordUser"
                                            required 
                                            />
                                            <span class="input-group-text ptb-30px">
                                                <i class="fa fa-eye-slash" style="cursor: pointer" gid="togglePassword"></i>
                                            </span>
                                            <div class="invalid-feedback mt-5 pt-3">
                                                Mot de passe est exigé
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-light fw-bold btn-rounded fs-6" style="color: var(--color-ittone);padding-left: 50px;padding-right: 50px;">se connecter </button>
                                    </form>
                                </div>
                                <div class="tab-pane fade" id="pills-signUp" role="tabpanel" aria-labelledby="pills-signUp-tab" tabindex="1">
                                    <form class="needs-validation" novalidate autocomplete="off" id="formSignUp">
                                        <div class="input-group flex-nowrap mb-4">
                                            <span class="input-group-text ptb-30px"><i class="fa-solid fa-user"></i></span>
                                            <input
                                            type="text"
                                            class="form-control ptb-30px"
                                            aria-label="Name"
                                            placeholder="Name"
                                            aria-describedby="basic-addon1"
                                            name="nomUser"
                                            required
                                            />
                                            <div class="invalid-feedback mt-5 pt-3">
                                                nomUser is required
                                            </div>
                                        </div>
                                        <div class="input-group flex-nowrap mb-4">
                                            <span class="input-group-text ptb-30px"><i class="fa-solid fa-user"></i></span>
                                            <input
                                            type="text"
                                            class="form-control ptb-30px"
                                            aria-label="Username"
                                            placeholder="Username"
                                            aria-describedby="basic-addon1"
                                            name="userName"
                                            required
                                            />
                                            <div class="invalid-feedback mt-5 pt-3">
                                                userName is required
                                            </div>
                                        </div>
                                        <div class="input-group flex-nowrap mb-4">
                                            <span class="input-group-text ptb-30px"><i class="fa-solid fa-lock"></i></span>
                                            <input
                                            type="text"
                                            class="form-control ptb-30px"
                                            aria-label="Password"
                                            placeholder="Password"
                                            aria-describedby="basic-addon1"
                                            name="passwordUser"
                                            required
                                            />
                                            <div class="invalid-feedback mt-5 pt-3">
                                                Password is required
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-light fw-bold btn-rounded fs-6" style="color: var(--color-ittone);padding-left: 50px;padding-right: 50px;">Créer</button>
                                    </form>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>           
        </div>
    </section>
    <script src="vendors/bootstrap-5.2.0/js/bootstrap.min.js"></script>
    <script src="vendors/MDB5/js/mdb.min.js"></script>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="vendors/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="js/moment.js"></script>
    <script src="vendors/calendar/calendar.min.js"></script>
    <script>
      $('.sign-in .form-control').focus(function(){
          $('.input-group-text').css('border-color','');
          $(this).prev().css('border-color','#4f4f4f');
      }).focusout(function(){
          $('.input-group-text').css('border-color','');
      });
      const goToSignIn = function(){
          // $('.home').hide("slide", { direction: "right",width:'10%' },800);
          // $('.sign-in').delay(820).show("slide", { direction: "left",distance:'80%' },800);
          $( ".home" ).fadeOut( 200, function() {
              //$('.sign-in').removeClass('d-none');
              $('.sign-in').fadeIn(300);
              });
      }
    </script>
    <script src="js/menu.js"></script>
    <script src="js/i18n.js"></script>
    <script src="js/ittone.js"></script>
    <script type="module" src="js/login/core.js"></script>
    <script src="js/login/custom.js"></script>
</body>
</html>
