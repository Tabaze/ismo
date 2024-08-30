<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModeleDashboard.aspx.cs" Inherits="ModeleDashboard" %>

  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Dashboard</title>
    <link type="image/x-icon" rel="shortcut icon" href="../image/logo/ITTONEERP.ico" />
    <link rel="stylesheet" href="../css/global.css" />
    <link rel="stylesheet" href="../css/dashboardStyle.css" />
    <style>
      #container {
        margin-top: 10px;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }

      .anychart-zoom .anychart-button {
        height: 32px !important;
        width: 32px !important;
      }

      .anychart-zoom {
        position: absolute;
        right: 10px !important;
        top: 10px;
      }

      .dt-buttons,
      .dataTables_filter,
      .dataTables_info {
        display: none;
      }

      .dataTables_scrollBody {
        max-height: 345px !important;
      }

      .apexcharts-tooltip {
        padding: 10px;
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
              <li class="nav-item px-5 d-flex align-items-center" title="Dashboard" data-model="Dashboard">
                <span>Dashboard</span>
              </li>
              <!-- <li class="nav-item px-5 d-flex align-items-center" title="Comparaison" data-model="Comparaison">
                <span>Comparaison</span>
              </li> -->
              <li class="nav-item px-5 d-flex align-items-center" title="Map" data-model="Map">
                <span>Map</span>
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
      <section class="screen-afficher screen" id="dashboard">
        <div id="root">
          <div class="container pt-5">
            <div class="row align-items-stretch" id="top5">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <div class="form-outline mb-3">
              <div class="d-inline-block bg-white">
                <select class="form-select d-inline-block" id="idCate">
                </select>
              </div>
              <div class="d-inline-block bg-white">
                <select class="form-select d-inline-block" id="idRebri">
                </select>
              </div>
              <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" title="Filtre" id="filterDate">
                <i class="fa-solid fa-filter"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-2 p-1">
          <div class="col-12">
            <div class="row d-flex flex-row align-middle">
              <div class="col-sm-12 col-md-6 p-3">
                <div class="charts-card bg-white shadow p-4">
                  <h2 class="card-title text-black text-center mb-4 dispoCount"></h2>
                  <div id="tableArticle">

                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 p-3">
                <div class="charts-card bg-white shadow p-4 d-flex justify-content-center">
                  <canvas id="chartDepensesRecettes"></canvas>
                </div>
              </div>
            </div>
            <div class="row mb-5 mt-5">
              <div class="col-md-6 col-sm-12">
                <div class="charts">
                  <div class="charts-card bg-white shadow p-4">
                    <div class="col-6">
                      <select class="form-select d-inline-block w-25" id="idClient">
                      </select>
                    </div>
                    <div id="chartCaissier" style="max-height: 450px;"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="row d-flex flex-row align-middle">
                  <div class=" p-3">
                    <div class="charts-card bg-white shadow p-4">
                      <h2 class="card-title text-black text-center col-ms-12 col-md-6">
                        <select class="form-select d-inline-block w-25" id="idPotentiel">
                        </select>
                      </h2>
                      <div id="tableClientPot">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="row mt-4" id="map">
        <div class="row d-flex flex-row align-middle mt-5">
          <div class="col-md-7 col-ms-12 p-3">
            <div class="charts-card bg-white shadow">
              <section id="container" style="padding: 10px;width: 100%; height: 700px;">

              </section>
            </div>
          </div>
          <div class="col-md-5 col-ms-12 p-3">
            <div class="charts-card bg-white shadow p-2 d-flex justify-content-center overflow-auto row">
              <div class="w-50 col-12">
                <select name="" id="idPays"></select>
              </div>
              <div id="tableClient" class="w-100">

              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex flex-row align-middle mt-5">
          <div class="col-md-12 col-ms-12 p-3">
            <div class="form-outline mb-3 d-flex  flex-row  justify-content-center">
              <div class="d-inline-block bg-white">
                <select class="form-select d-inline-block" id="idCateg">
                </select>
              </div>
              <div class="d-inline-block bg-white">
                <select class="form-select d-inline-block" id="idRebriq">
                </select>
              </div>
              <button type="button" class="fs-6 btn btn-outline-ittone btn-floating" title="Filtre" id="filterDate">
                <i class="fa-solid fa-filter"></i>
              </button>
            </div>
            <h1 class="card-title text-black text-center mt-4">Total : <span class="paysTotal"></span></h1>
            <div class="charts-card bg-white shadow">
              <section id="paysTotal" style="padding: 10px;width: 100%;">

              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div role="dialog" class="modal d-none" style="    z-index: 11111111111111">
      <div class="modal-dialog modal-lg modal-dialog-centered" id="paysDetails" style="max-width: 80%;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
          </div>
          <form class="needs-validation" novalidate autocomplete="off">
            <span class="radiosStyle">
              <div class="modal-body">
                <div id="tableDetails">

                </div>
              </div>
            </span>

            <div class="modal-footer" style="border-top: none;">
            </div>
          </form>
        </div>
      </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.35.5/apexcharts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
    <script src="./vendors/anychart-installation-package-8.11.1/js/anychart-base.min.js"></script>
    <script src="./vendors/anychart-installation-package-8.11.1/js/anychart-ui.min.js"></script>
    <script src="./vendors/anychart-installation-package-8.11.1/js/anychart-exports.min.js"></script>
    <script src="./vendors/anychart-installation-package-8.11.1/js/anychart-map.min.js"></script>
    <script src="./vendors/anychart-installation-package-8.11.1/js/anychart-data-adapter.min.js"></script>
    <script src="./vendors/anychart-installation-package-8.11.1/geodata/custom/world/world.js"></script>
    <script src="./vendors/apexcharts-bundle/dist/apexcharts.min.js"></script>
    <script src="./js/pdf.js"></script>
    <script src="./js/xlsx.js"></script>
    <script src="./js/menu.js"></script>
    <script src="./js/i18n.js"></script>
    <script src="./js/ittone.js"></script>
    <script src="./js/notification.js"></script>
    <script src="./js/roles.js"></script>
    <script src="./js/ModeleDashboard/custom.js"></script>
    <script type="module" src="./js/ModeleDashboard/core.js"></script>
  </body>

  </html>