const express = require("express");
const app = express();
var fs = require("fs");
var os = require("os");
var ifaces = os.networkInterfaces();
var ip;
const request = require('request');

app.use("/questions", express.static("questions"));
const MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var path = "./questions/";
fs.readdir(path, function (err, items) {
    // console.log(items);

    for (var i = 0; i < items.length; i++) {
        // console.log(items[i]);
    }
});
// const assert = require('assert');
const url = "mongodb://localhost:27017";
const dbName = "LuckyDraw";
var db;
MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function (err, client) {
        // assert.equal(null, err);
        console.log("Connected successfully to server");

        db = client.db(dbName);
        users = db.collection("users");
        drawSlots = db.collection("drawSlots");
        nextCouponNumber = db.collection("nextCouponNumber");
    }
);

app.post("/login", (req, res) => {
    console.log(req.body);
    users.findOne(
        { contactNumber: req.body.contactNumber, password: req.body.password },
        function (err, result) {
            if (err) {
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                if (result) {
                    res.send({
                        questionState: result.questionState,
                        points: result.points,
                        contactNumber: result.contactNumber,
                        username: result.username
                    });
                } else {
                    res.status(404).json({ err: "user not found" });
                }
            }
        }
    );
});

app.get("/questionState", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            console.log(result);
            res.send({ questionState: result.questionState, points: result.points });
        }
    });
});

app.post("/ticketDetails", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (
        err,
        result
    ) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            console.log(result);
            res.send({ totalTickets: result });
        }
    });
});

app.post("/saveUserData", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            users.updateOne({ contactNumber: req.body.contactNumber }, { $set: { questionState: req.body.questionState, points: req.body.points } }, function (err, _result) {
                if (err) {
                    res.status(500).json({ err: "internal server error please try again later." });
                } else {
                    users.findOne({ contactNumber: req.body.contactNumber }, function (err, user) {
                        res.send({
                            questionState: user.questionState,
                            points: user.points,
                            contactNumber: user.contactNumber,
                            username: user.username
                        });
                    });
                }
            });
        }
    });
});


app.post("/profileUpdate", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            users.updateOne({ contactNumber: req.body.contactNumber }, { $set: { username: req.body.username } }, function (err, _result) {
                if (err) {
                    res.status(500).json({ err: "internal server error please try again later." });
                } else {
                    users.findOne({ contactNumber: req.body.contactNumber }, function (err, user) {
                        res.send({
                            questionState: user.questionState,
                            points: user.points,
                            contactNumber: user.contactNumber,
                            username: user.username
                        });
                    });
                }
            });
        }
    });
});


app.post("/otp", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (result) {
                request('http://api.msg91.com/api/sendhttp.php?country=91&sender=LUCKYDRAW&route=4&mobiles=+' + req.body.contactNumber + '&authkey=192315AnTq0Se1Q5a54abb2&message=JSCA! This is your one-time password ' + req.body.otp + '.', { json: true }, (err, otp, body) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        res.send({
                            questionState: result.questionState,
                            points: result.points,
                            contactNumber: result.contactNumber,
                            username: result.username,
                            isNewUser: false
                        });
                    }
                });
            } else {
                if (req.body.contactNumber && req.body.otp) {
                    request('http://api.msg91.com/api/sendhttp.php?country=91&sender=LUCKYDRAW&route=4&mobiles=+' + req.body.contactNumber + '&authkey=192315AnTq0Se1Q5a54abb2&message=JSCA! This is your one-time password ' + req.body.otp + '.', { json: true }, (err, otp, body) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ err: "internal server error please try again later." });
                        } else {
                            res.send({ msg: 'OTP is send to your Contact number.', isNewUser: true })
                            users.insertOne({
                                username: '',
                                contactNumber: req.body.contactNumber,
                                questionState: 0,
                                points: 100,
                                earnedTickets: [],
                                isNewUser: true
                            });
                        }
                    });
                } else {
                    res.status(400).json({ err: "Invalid Data!!" });
                }
            }
        }
    });
});

app.post("/register", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (
        err,
        result
    ) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (result) {
                if (req.body.username && req.body.contactNumber) {
                    users.updateOne({ contactNumber: req.body.contactNumber },
                        {
                            $set: {
                                username: req.body.username,
                                isNewUser: false
                            }
                        });
                    res.send({
                        questionState: 0,
                        points: 100,
                        contactNumber: req.body.contactNumber,
                        username: req.body.username
                    });
                } else {
                    res.status(401).json({ err: "Invalid Data!!" });
                }
            } else {
                res.status(400).json({ err: "User Not Found!!" });
            }
        }
    });
});

app.post("/mapTicket", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, (err, user) => {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (user) {
                drawSlots.updateOne({ date: new Date(req.body.date) }, { $push: { users: { contactNumber: req.body.contactNumber, ticket: req.body.ticket } } }, (err, suc) => {
                    if (err) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        users.updateOne({ contactNumber: req.body.contactNumber }, { $push: { ticketMapping: req.body.ticket }, $pull: { earnedTickets: req.body.ticket } }, (err, success) => {
                            if (err) {
                                res.status(500).json({ err: "internal server error please try again later." });
                            } else {
                                users.findOne({ contactNumber: req.body.contactNumber }, (err, _user) => {
                                    if (err) {
                                        res.status(500).json({ err: "internal server error please try again later." });
                                    } else {
                                        res.send({ earnedTickets: _user.earnedTickets, ticketMapping: _user.ticketMapping })
                                    }
                                })
                            }
                        });
                    }
                });
            } else {
                res.status(400).json({ err: "No user Found!!" });
            }
        }
    })
})

app.post("/getUserTickets", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, (err, _user) => {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (_user) {
                res.send({ earnedTickets: _user.earnedTickets, ticketMapping: _user.ticketMapping })
            } else {
                res.status(400).json({ err: "No user Found!!" });
            }
        }
    })
})

app.post("/questionDetails", (req, res) => {
    fs.readdir(path, function (err, items) {
        if (err) {
            console.log(err);
            res.send({ err: err });
        } else {
            for (var i = 0; i < items.length; i++) {
                let data = items[i].split("_");
                if (parseInt(data[0]) === req.body.questionState + 1) {
                    let _path = path + items[i];
                    fs.readdir(path + items[i], function (err, images) {
                        let _images = [];
                        for (var j = 0; j < images.length; j++) {
                            _images.push(
                                "http://192.168.43.23:3000" + _path.substr(1) + "/" + images[j]
                            );
                        }
                        res.json({
                            imageList: _images,
                            answer: data[1],
                            randomString: data[2]
                        });
                    });
                }
            }
        }
    });
});

app.post("/getDrawSlots", (req, res) => {
    drawSlots
        .find({})
        .project({ date: 1, _id: 0 })
        .toArray(function (err, result) {
            if (err) {
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                res.send({ slots: result });
            }
        });
});



app.post("/generateTicket", (req, res) => {
    users.findOne(
        {
            contactNumber: req.body.contactNumber,
            questionState: req.body.questionState
        },
        function (err, result) {
            if (err) {
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                if (result) {
                    nextCouponNumber.findOne({}, function (err, dbRes) {
                        if (err) {
                            console.log("findone", err);
                        } else {
                            users.updateOne(
                                { contactNumber: req.body.contactNumber },
                                { $push: { earnedTickets: dbRes.coupon } },
                                { upsert: true },
                                function (err, _result) {
                                    if (err) {
                                        res.send({ msg: err });
                                    } else {
                                        nextCouponNumber.updateOne(
                                            { coupon: dbRes.coupon },
                                            { $inc: { coupon: 1 } }
                                        );
                                        // send sms to user
                                        console.log('Hello, suprise ****', req.body.contactNumber, dbRes.coupon)
                                        // request('http://api.msg91.com/api/sendhttp.php?country=91&sender=LUCKYDRAW&route=4&mobiles=+' + req.body.contactNumber + '&authkey=192315AnTq0Se1Q5a54abb2&message=Congratulation! You earned a new Lucky Draw Coupon : ' + dbRes.coupon + '.', { json: true }, (err, otp, body) => {
                                        request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=+91"+ req.body.contactNumber +"&authkey=192315AnTq0Se1Q5a54abb2&message=Congratulation! You earned a new Lucky Draw Coupon :" + dbRes.coupon + ".", { json: true }, (err, otp, body) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).json({ err: "internal server error please try again later." });
                                            } else {
                                                res.send({ msg: "You have got Ticket " + dbRes.coupon });
                                            }
                                        });
                                    }
                                }
                            );
                        }
                    });
                } else {
                    res.status(400).json({ err: "User not found!!" });
                }
            }
        }
    );
});

app.get("/test", (req, res) => {
    res.send({ test: "its working check your code first....." });
});
user = {
    username: "",
    password: "",
    contactNumber: "",
    questionState: "",
    points: "",
    earnedTickets: [],
    totalMappedTicket: "",
    ticketMapping: []
};

drawDetails = {
    date: "",
    users: [{ contactNumber: "", ticket: 1000 }, { contactNumber: "", ticket: 1001 }],
    result: [{ users: [], ranking: "" }]
}

app.listen(3000, () => console.log("Example app listening on port 3000!"));
