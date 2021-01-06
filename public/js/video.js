const socket = io();
socket.on('video', (data) => {
    const image = document.getElementById('video-feed');
    image.src = `data:image/jpeg;base64,${data}`;
});

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