const express = require('express');
const app = express();
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var path = './questions/';
fs.readdir(path, function (err, items) {
    // console.log(items);

    for (var i = 0; i < items.length; i++) {
        // console.log(items[i]);
    }
});
// const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'LuckyDraw';
var db;
MongoClient.connect(url, function (err, client) {
    // assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    users = db.collection('users');
});




app.post('/login', (req, res) => {
    console.log(req.body);
    users.findOne({ contactNumber: req.body.contactNumber, password: req.body.password }, function (err, result) {
        if (err) {
            res.send({ err: "internal server error please try again later." })
        } else {
            res.send({ quettionState: result.quettionState, points: result.points });
        }
    });
});


app.post('/questionDetails', (req, res) => {
    fs.readdir(path, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
            let data = items[i].split('_');
            if (parseInt(data[0]) == req.body.quettionState+1) {
                fs.readdir(path + items[i], function (err, images) {
                    
                    res.json({ imageList: images, answer: data[1], randomString: data[2] })
                });
            }
        }
    });
});

app.post('/register', (req, res) => {
    console.log(req.body);
    users
    users.insertOne({ contactNumber: req.body.contactNumber, password: req.body.password }, function (err, result) {
        if (err) {
            res.send({ err: "internal server error please try again later." })
        } else {
            res.send({ quettionState: result.quettionState, points: result.points });
        }
    });
});


app.get('/login', (req, res) => {
    res.send({ test: "its working check your code first....." });
})
user = {
    username: "",
    password: "",
    contactNumber: "",
    quettionState: "",
    points: "",
    earnedTickets: [],
    ticketMapping: []
}

drawDetails = {
    date: "",
    slot: "",
    users: [{ number: "", tickets: [] }],
    result: [{ users: [], ranking: "" }]
}




app.listen(3000, () => console.log('Example app listening on port 3000!'))