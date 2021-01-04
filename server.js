const express = require('express');
const rosnodejs = require('rosnodejs');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {PythonShell} = require('python-shell');
const port = 8080;
var pub = null;

rosnodejs.initNode('my_node')
.then((nh) => {
    const StringMsg = rosnodejs.require('std_msgs').msg.String;
    pub = nh.advertise('/chatter', StringMsg);    
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
        console.log('Arm received');
        pub.publish({data: "ROS TEST"});
    });
});

let pyshell = new PythonShell('video_retriever.py');
pyshell.on('message', function (message) {
    io.emit('video', message.toString());
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});