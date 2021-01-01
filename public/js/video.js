const socket = io();
socket.on('image', (data) => {
    const image = document.getElementById('image');
    image.src = `data:image/jpeg;base64,${data}`;
});

document.getElementById("test").addEventListener('click', () => {
    console.log('clicked!');
    socket.emit('test', 'test');
});