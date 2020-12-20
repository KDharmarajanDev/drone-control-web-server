const express = require('express');
// const rosnodejs = require('rosnodejs');
const bodyParser = require('body-parser');
const app = express();
const { spawn } = require('child_process');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;

// const nh = rosnodejs.nh;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('./public/'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/public/html/index.html");
});

app.post('/api/arm', (req, res) => {
    if (req.body.arm_status == "ARM"){
        // const client = nh.serviceClient('/mavros/cmd/arming', 'mavros_msgs/CommandBool');
        // client.call({'value': true});
    }
});

const python = spawn('python', ['video_retriever.py'], {
    stdio:[null, null, null, 'ipc']
});
python.on('message', (data) => {
    console.log(data);
    io.emit('image', data.toString());
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});