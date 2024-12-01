# Earthquake Map Visualization

## Overview
This project visualizes earthquake data on a world map using **Leaflet.js**, a leading open-source JavaScript library for interactive maps. The map displays earthquake events that have occurred in the past 7 days, sourced from the USGS (United States Geological Survey) dataset. The markers are dynamically sized based on the magnitude of the earthquakes, and their color reflects the depth of the earthquake. Additionally, tectonic plate boundaries are overlaid on the map for better contextual understanding.

## Features
- **Interactive map** displaying global earthquake data from the past 7 days.
- Earthquake markers are dynamically sized based on their magnitude.
- Marker color indicates the depth of the earthquake.
- **Popup information** that provides details about each earthquake (magnitude, location, depth).
- **Legend** showing the depth ranges and their corresponding colors.
- **Tectonic plate boundaries** displayed as an additional layer on the map.

## Technologies Used
- **Leaflet.js** for creating interactive maps.
- **D3.js** for loading and processing GeoJSON data.
- **OpenStreetMap tiles** for the map background.

## Data Source
- Earthquake data from the **USGS** (United States Geological Survey) showing all earthquakes that have occurred in the past 7 days. The data is in **GeoJSON** format, which contains information on the magnitude, location, and depth of each earthquake.
- Tectonic plate boundary data from the **PB2002** GeoJSON file, showing the outlines of Earth's tectonic plates.

The dataset for earthquakes used in this project can be accessed here:  
[USGS Earthquake Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
