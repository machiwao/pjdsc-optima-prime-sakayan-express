// script.js
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('active-buses-doughnut').getContext('2d');
    const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{
                label: 'Buses',
                data: [12, 19], // Replace with your actual data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Active Buses'
                }
            }
        }
    });
});

let chart; // Global variable for the chart instance

function createChart() {
    const ctx = document.getElementById('demand-chart').getContext('2d');
    const data = {
        labels: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4', 'Stop 5'], // Define your labels
        datasets: [{
            label: 'Passenger Demand',
            data: [12, 19, 3, 5, 2], // Example data
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
            borderColor: 'rgba(54, 162, 235, 1)', // Border color
            borderWidth: 1
        }]
    };

    // Destroy previous chart instance if it exists
    if (chart) {
        chart.destroy(); 
    }

    // Create new chart instance
    chart = new Chart(ctx, {
        type: 'bar', // Fixed to bar chart
        data: data,
        options: {
            responsive: true, // Enable responsiveness
            maintainAspectRatio: false, // Allows setting absolute size
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false // Show all x-axis labels
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initial chart creation
createChart();