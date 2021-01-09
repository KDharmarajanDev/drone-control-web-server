import {socket} from '/devel/js/video.js';
import 'threebox-plugin/dist/threebox';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
var drone_object = null;

const default_location = {'latitude': 34.052235, 'longitude': -118.243683, 'altitude': 20};
var current_location = default_location;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2RoYXJtYXJhamFuIiwiYSI6ImNraXIyMXg0bDFtMnAyemxpdG4wOHloZ2cifQ.4eWxFDwc1F0zscIOBBXnRw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    center: [default_location['longitude'], default_location['latitude']],
    antialias: true
});

map.on('load', function () {
    // Insert the layer beneath any symbol layer.    
    var labelLayerId = getFirstSymbolLayer(map);
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
        map.addLayer({
            id: 'drone',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, mbxContext) {
                window.tb = new Threebox(
                    map,
                    mbxContext,
                    {
                        defaultLights: true
                    }
                );
                var options = {
                    type: 'gltf',
                    obj: 'public/assets/Hummingbird.glb',
                    scale: 0.1,
                    units: 'meters',
                    anchor: "bottom",
                    rotation: { x: 90, y: 0, z: 0 }, //rotation to postiion the truck and heading properly
                }
                console.log(tb);
                tb.loadObj(options, function(model){
                    console.log('activated');
                    drone_object = model.setCoords(convert_location_to_lnlat(default_location));
                    tb.add(drone_object);
                });
            },
            render: function (gl, matrix) {
                tb.update();
            }
        });
    });
map.dragRotate.enable();
map.dragPan.enable();

function getFirstSymbolLayer(map){
    var layers = map.getStyle().layers;
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
        break;
        }
    }
    return labelLayerId;
}

function setDroneLocation(lnlat){
    drone_object.setCoords(lnlat);
}

function convert_location_to_lnlat(location) {
    return [location['longitude'], location['latitude'], location['altitude']];
}

socket.on('gps', (data) => {
    current_location = data;
    setDroneLocation(convert_location_to_lnlat(current_location));
});