const express = require('express');
// const rosnodejs = require('rosnodejs');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {PythonShell} = require('python-shell');
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

let pyshell = new PythonShell('video_retriever.py');
pyshell.on('message', function (message) {
    io.emit('image', message.toString());
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});