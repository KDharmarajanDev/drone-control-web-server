import socket from '/devel/js/video.js';
import * as THREE from 'three';
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
var modelTransform = convertToTransform(default_location);

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

map.on('style.load', () => {
    var droneLayer = {
        id: 'drone-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();

            // create two three.js lights to illuminate the model
            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, -70, 100).normalize();
            this.scene.add(directionalLight);

            var directionalLight2 = new THREE.DirectionalLight(0xffffff);
            directionalLight2.position.set(0, 70, 100).normalize();
            this.scene.add(directionalLight2);

            // use the three.js GLTF loader to add the 3D model to the three.js scene
            var loader = new THREE.GLTFLoader();
            loader.load(
                'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
                function (gltf) {
                    this.scene.add(gltf.scene);
                }.bind(this)
            );
            this.map = map;

            // use the Mapbox GL JS map canvas for three.js
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true
            });

            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            var rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            var rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            var rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
            );

            var m = new THREE.Matrix4().fromArray(matrix);
            var l = new THREE.Matrix4()
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                )
                .scale(
                    new THREE.Vector3(
                        modelTransform.scale,
                        -modelTransform.scale,
                        modelTransform.scale
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            this.camera.projectionMatrix = m.multiply(l);
            this.renderer.state.reset();
            this.renderer.render(this.scene, this.camera);
            this.map.triggerRepaint();
        }
    };
    map.addLayer(droneLayer, 'Drone');
});

socket.on('gps', (data) => {
    modelTransform = convertToTransform(data);
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