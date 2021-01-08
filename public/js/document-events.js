import socket from '/public/js/video.js'

document.getElementById("test").addEventListener('click', () => {
    console.log('clicked!');
    socket.emit('test', 'test');
});

document.getElementById("arm-button").addEventListener('click', () => {
    socket.emit('arm', 'true');
});

document.getElementById("fly-button").addEventListener('click', () =>{
    socket.emit('fly-home', 'true');
});