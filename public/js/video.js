const socket = io();
socket.on('image', (data) => {
    console.log('data', data);
    const image = document.getElementById('image');
    image.src = `data:image/jpeg;base64,${data}`;
});