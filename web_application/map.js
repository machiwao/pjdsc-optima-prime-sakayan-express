var mymap = L.map('EDSA Bus Map').setView([14.587134469805761, 121.05639025496566], 12.2); // Adjust center coordinates and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Sample data for bus stations
var stations = [
    { name: "Monumento", lat: 14.65738694051428, lng: 120.98625732485976 },
    { name: "Bagong Barrio", lat: 14.657607538727653, lng: 120.99805238067285 },
    { name: "Balintawak", lat: 14.659311815931066, lng: 121.00545325439627 },
    { name: "Kaingin Road", lat: 14.65785515714347, lng: 121.01148270950785 },
    { name: "LRT1 Roosevelt", lat: 14.657826199494895, lng: 121.0196568852256 },
    { name: "MRT3 North Ave", lat: 14.651905548960054, lng: 121.03297512232082 },
    { name: "MRT3 QAve", lat: 14.641857312688964, lng: 121.0392193029942 },
    { name: "Main Ave", lat: 14.614218805154854, lng: 121.05354778432272 },
    { name: "MRT3 Santolan", lat: 14.60894288068559, lng: 121.0553810741853 },
    { name: "MRT3 Ortigas", lat: 14.587134469805761, lng: 121.05639025496566 },
    { name: "Guadalupe", lat: 14.568509386422997, lng: 121.04594661135259 },
    { name: "MRT3 Buendia", lat: 14.555138722684385, lng: 121.03489678067145 },
    { name: "MRT3 Ayala", lat: 14.54880455290404, lng: 121.02722698153256 },
    { name: "Tramo", lat: 14.538076251023815, lng: 121.00339839601176 },
    { name: "Taft Ave", lat: 14.53778923657108, lng: 120.99966109601168 },
    { name: "Roxas Boulevard", lat: 14.537226465655696, lng: 120.99219019854456 },
    { name: "MOA", lat: 14.535662280001935, lng: 120.98334196717656 },
    { name: "Ayala Malls Manila Bay", lat: 14.524351103672359, lng: 120.99038002047995 },
    { name: "PITX", lat: 14.51017291880952, lng: 120.99123832203274 }
];

// Data storage for demand and fleet
var demandData = {};
var fleetData = {};

// Function to generate random demand and fleet sizes
function generateRandomData() {
    stations.forEach(station => {
        demandData[station.name] = Math.floor(Math.random() * 251) + 50; // Demand: 50 to 300
        fleetData[station.name] = Math.floor(Math.random() * 15) + 1;    // Fleet: 1 to 15
    });
}

// Function to update the markers on the map
function updateMarkers() {
    // Clear existing markers
    mymap.eachLayer(function(layer) {
        if (layer instanceof L.CircleMarker) {
            mymap.removeLayer(layer);
        }
    });

    // Create new markers with updated data
    stations.forEach(function(station) {
        var demand = demandData[station.name] || 0;
        var fleet = fleetData[station.name] || 0;
        var utilizationRatio = fleet / (demand / 50);
        var markerColor;

        // Determine marker color based on utilization ratio
        if (utilizationRatio < 0.3) {
            markerColor = "red"; // Underserved
        } else if (utilizationRatio < 0.6) {
            markerColor = "orange"; // Moderate service
        } else {
            markerColor = "green"; // Well served
        }

        // Create a new circle marker
        var marker = L.circleMarker([station.lat, station.lng], {
            radius: 8,
            fillColor: markerColor,
            color: markerColor,
            fillOpacity: 0.7,
            weight: 1
        }).addTo(mymap);

        // Bind popup with current data
        marker.bindPopup(`${station.name}<br>Passenger Demand: ${demand}<br>Fleet: ${fleet}<br>Utilization Ratio: ${utilizationRatio.toFixed(2)}`);
    });
}

// Initial data generation and marker update
generateRandomData();
updateMarkers();

// Update data and markers every 5 seconds
setInterval(function() {
    generateRandomData();
    updateMarkers();
}, 5000);
