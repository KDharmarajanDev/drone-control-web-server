const io = require('socket.io-client');
var socket = io();

socket.on('connect', () =>{
    document.getElementById('connection-status').innerHTML = "Connected";
    document.getElementById('connection-status').style.color = "green";
    console.log('Connected!');
    socket.on('disconnect', () =>{
        document.getElementById('connection-status').innerHTML = "Disconnected";
        document.getElementById('connection-status').style.color = "red";
        console.log('Disconnected!');
    });
    socket.on('video', (data) => {
        const image = document.getElementById('video-feed');
        image.src = `data:image/jpeg;base64,${data}`;
    });
});

export {socket}