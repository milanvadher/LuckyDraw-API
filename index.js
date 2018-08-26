const express = require('express');
const app = express();
var fs = require('fs');
var os = require('os');
var ifaces = os.networkInterfaces();
var ip;

app.use('/questions', express.static('questions'))
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            ip = iface.address;
        }
        ++alias;
    });
});
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
    drawSlots = db.collection('drawSlots');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    users.findOne({ contactNumber: req.body.contactNumber, password: req.body.password }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." })
        } else {
            if (result) {
                res.send({ quettionState: result.quettionState, points: result.points, contactNumber: result.contactNumber, username: result.username });
            } else {
                res.status(404).json({ err: "user not found" });
            }
        }
    });
});

app.get('/questionState', (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.send({ err: "internal server error please try again later." });
        } else {
            console.log(result);
            res.send({ quettionState: result.quettionState, points: result.points });

        }
    });
});

app.post('/ticketDetails', (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.send({ err: "internal server error please try again later." })
        } else {
            console.log(result);
            res.send({ totalTickets:result });
        }
    });
});

// app.get('/questions/:queNo/:image', (req, res) => {
//     const dir = '.' + req.originalUrl;
//     console.log(dir);
//     fs.readdir(dir, function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(dir + data);
//         res.send(data);
//     });
// });


app.post('/questionDetails', (req, res) => {
    fs.readdir(path, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            let data = items[i].split('_');
            if (parseInt(data[0]) == req.body.quettionState + 1) {
                let _path = path + items[i];
                fs.readdir(path + items[i], function (err, images) {
                    let _images = []
                    for (var j = 0; j < images.length; j++) {
                        _images.push('http://' + ip + ':3000' + _path.substr(1) + '/' + images[j])
                    }
                    res.json({ imageList: _images, answer: data[1], randomString: data[2] })
                });
            }
        }
    });
});

app.post('/getDrawSlots', (req, res) => {
    drawSlots.find({}).project({ date: 1, _id: 0 }).toArray(function (err, result) {
        if (err) {
            res.send({ err: "internal server error please try again later." })
        } else {
            res.send({ slots: result });
        }
    });
});
app.post('/generateTicket', (req, res) => {
    // console.log(req.body.contactNumber);
    // console.log(req.body.slot);
    // console.log(req.body.ticketNumber);
    users.findModify({ contactNumber: req.body.contactNumber, password: req.body.password }, function (err, result) {
        if (err) {

        } else {
            if (!result) {
                console.log("result.contactNumber");
            } else {
                users.updateOne({ contactNumber: req.body.contactNumber }, {}, function (err, result) {

                });
            }
        }
    });
    res.send({});
});


app.post('/register', (req, res) => {
    console.log(req.body);
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        users.insertOne({ contactNumber: req.body.contactNumber, password: req.body.password }, function (err, result) {
            if (err) {
                res.send({ err: "internal server error please try again later." })
            } else {
                res.send({ quettionState: result.quettionState, points: result.points });
            }
        });
    });
});

app.get('/test', (req, res) => {
    res.send({ test: "its working check your code first....." });
})
user = {
    username: "",
    password: "",
    contactNumber: "",
    quettionState: "",
    points: "",
    earnedTickets: [],
    totalMappedTicket: '',
    ticketMapping: []
}

drawDetails = {
    date: "",
    users: [{ number: "", tickets: [] }],
    result: [{ users: [], ranking: "" }]
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
