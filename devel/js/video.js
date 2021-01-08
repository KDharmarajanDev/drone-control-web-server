const io = require('socket.io-client');
var socket = io();
socket.on('video', (data) => {
    const image = document.getElementById('video-feed');
    image.src = `data:image/jpeg;base64,${data}`;
});

export {socket}