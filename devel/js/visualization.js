import socket from '/devel/js/video.js';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoia2RoYXJtYXJhamFuIiwiYSI6ImNraXIyMXg0bDFtMnAyemxpdG4wOHloZ2cifQ.4eWxFDwc1F0zscIOBBXnRw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6
});

var default_location = {'latitude': 34.052235, 'longitude': -118.243683, 'altitude': 0};

map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;
     
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
        break;
        }
    }
    map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],    
            'type': 'fill-extrusion',
            'minzoom': 10,
            'paint': {
                'fill-extrusion-color': '#aaa',
     
                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    0,
                    10.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        10,
                        0,
                        10.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
        
    });

function convertToTransform(location) {
    var modelOrigin = [location.latitude, location.longitude];
    var modelAltitude = location.altitude;
    var modelRotate = [Math.PI / 2, 0, 0];
 
    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
    );
 
    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since our 3D model is in real world meters, a scale transform needs to be
        * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };
    return modelTransform;
}