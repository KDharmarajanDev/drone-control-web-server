const express = require('express');
const rosnodejs = require('rosnodejs');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/html/index.html");
});

app.post('/api/arm/:arm_status?', (req, res) => {
    console.log(req.params);
    if (req.params.arm_status == "true"){
        
    } else if (req.params.arm_status == "false"){

    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});