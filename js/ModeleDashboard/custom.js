$(document).ready(function () {
    $.tableView = $('.table');
    // SIDEBAR TOGGLE
    var sidebarOpen = false;
    var sidebar = document.getElementById("sidebar");
    function openSidebar() {
        if (!sidebarOpen) {
            sidebar.classList.add("sidebar-responsive");
            sidebarOpen = true;
        }
    }
    function closeSidebar() {
        if (sidebarOpen) {
            sidebar.classList.remove("sidebar-responsive");
            sidebarOpen = false;
        }
    }
    // ---------- CHARTS ----------
    // BAR CHART VENTES ET ACHATS
    // const ctx = document.getElementById('chartVentesAchats');
    // new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ["Jan", "Feb", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    //         datasets: [{
    //             label: 'Achats',
    //             data: [12, 10, 8, 6, 4],
                
    //         },
    //         {
    //             label: 'Ventes',
    //             data: [12, 10, 8, 6, 4],
                
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    // BAR CHART DEPENSES ET RECETTES
    // const ctx2 = document.getElementById('chartDepensesRecettes');
    // new Chart(ctx2, {
    //     type: 'bar',
    //     data: {
    //         labels: ["Jan", "Feb", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    //         datasets: [{
    //             label: 'Dépenses',
    //             data: [12, 10, 8, 6, 4],
                
    //         },
    //         {
    //             label: 'Recettes',
    //             data: [12, 10, 8, 6, 4],
                
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    // LINE CHART CAISSE
    // const ctx3 = document.getElementById('chartCaissier');
    // new Chart(ctx3, {
    //     type: 'line',
    //     data: {
    //         labels: ["Jan", "Feb", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    //         datasets: [{
    //             label: 'Dépenses',
    //             data: [12, 10, 8, 6, 4],
                
    //         },
    //         {
    //             label: 'Recettes',
    //             data: [4, 6, 5, 9, 10],
                
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    // PIE CHART TOP ARTICLES
    // const ctx4 = document.getElementById('topArticles');
    // new Chart(ctx4, {
    //     type: 'pie',
    //     data: {
    //         labels: ["Laptop", "Phone", "Monitor", "Headphones", "Camera"],
    //         datasets: [{
    //             label: 'Count',
    //             data: [12, 10, 8, 6, 4],
    //             backgroundColor: [
    //                 '#f19754',
    //                 '#568158',
    //                 '#d55a5a',
    //                 '#47B5FF',
    //                 '#7992d7'
    //               ],
    //               hoverOffset: 4
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         plugins: {
    //           legend: {
    //             position: 'top',
    //           },
    //           title: {
    //             display: true,
    //             text: 'Top 5 Articles'
    //           }
    //         }
    //       },
    // });
})