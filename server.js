const express = require('express');
const rosnodejs = require('rosnodejs');
const bodyparser = require('body-parser');
const app = express();
const port = 8080;

const nh = rosnodejs.nh;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/html/index.html");
});

app.post('/api/arm', (req, res) => {
    console.log(req.body);
    if (req.body.arm_status == "ARM"){
        const client = nh.serviceClient('/mavros/cmd/arming', 'mavros_msgs/CommandBool');
        client.call({'value': true});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});