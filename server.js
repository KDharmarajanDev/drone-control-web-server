const express = require('express');
const rosnodejs = require('rosnodejs');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {PythonShell} = require('python-shell');
const port = 8080;

// ROS Services, Publishers, and Subscribers
var arm_service = null;

rosnodejs.initNode('web_control_node')
.then((nh) => {
    arm_service = nh.serviceClient('/mavros/cmd/arming', 'mavros_msgs/CommandBool');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('./public/'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/public/html/index.html");
});

io.on('connection', function(socket){
    console.log('Client connected with socket ID: '+ socket.client.id);
    socket.on('test', function(data){
        console.log(data);
    });
    socket.on('arm', function(data) {
        console.log('Arming drone!');
        arm_service.call({value: true});
    });
});

let pyshell = new PythonShell('video_retriever.py');
pyshell.on('message', function (message) {
    io.emit('video', message.toString());
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});