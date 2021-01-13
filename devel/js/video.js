const io = require('socket.io-client');
var socket = io();
socket.on('video', (data) => {
    const image = document.getElementById('video-feed');
    image.src = `data:image/jpeg;base64,${data}`;
});

// Handles connections
if (socket.connected) {
    document.getElementById('connection-status').innerHTML = "Connected";
    document.getElementById('connection-status').style.color = "green";
}

socket.on('connection', () =>{
    document.getElementById('connection-status').innerHTML = "Connected";
    document.getElementById('connection-status').style.color = "green";
});

socket.on('disconnection', () =>{
    document.getElementById('connection-status').innerHTML = "Disconnected";
    document.getElementById('connection-status').style.color = "red";
});


export {socket}