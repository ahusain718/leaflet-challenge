// Create map object showing the world 
let myMap = L.map("map", {
    center: [0, 0],  
    zoom: 2          
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data of all earthquakes in past 7 days
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to make earthquakes with greater depth appear darker
function getColor(depth) {
    if (depth <= 10) {
        return "#98ee00"; //green
    } else if (depth <= 30) {
        return "#d4ee00"; //yellow
    } else if (depth <= 50) {
        return "#eecc00"; //light orange
    } else if (depth <= 70) {
        return "#ee9c00"; //orange
    } else if (depth <= 90) {
        return "#d87d00"; //dark orange
    } else {
        return "#ea822c"; //red
    }
};

// Function to get the radius of the marker based on magnitude
function getRadius(magnitude) {
    return magnitude * 4; // Multiply magnitude by a factor to get a larger size
};

// Get data with d3
d3.json(geoData).then(function(data) {

    // Loop through each earthquake feature in the GeoJSON data
    for (let i = 0; i < data.features.length; i++) {

        let feature = data.features[i];
        let location = feature.geometry;
        let properties = feature.properties;
        let magnitude = properties.mag;
        let depth = location.coordinates[2];

        if (location) {
            // Create a circle marker for each earthquake with size based on magnitude and color based on depth
            L.circleMarker([location.coordinates[1], location.coordinates[0]], {
                radius: getRadius(magnitude),         // Size based on magnitude
                fillColor: getColor(depth),           // Color based on depth
                color: "#000000",                     // Border color for the circle
                weight: 1,                            // Border width
                opacity: 1,                           // Border opacity
                fillOpacity: 0.7                     // Fill opacity
            })
            .bindPopup("<h3>Magnitude: " + magnitude + "</h3><p>Location: " + properties.place + "</p><p>Depth: " + depth + " km</p>")
            .addTo(myMap);
        }
    }

    // Create the legend
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depths = [-10, 10, 30, 50, 70, 90]; // Depth intervals
        let labels = [];
    
        // Loop through depth intervals and create a colored legend
        for (let i = 0; i < depths.length; i++) {
            // Add a colored box for each depth range
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 8px;"></i> ' +  // Set size and color for the box
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km'); // Interval labels
        }
        return div; // Make sure to return the div element for the legend
    };

    // Add legend to map
    legend.addTo(myMap);

});