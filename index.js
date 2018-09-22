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
        notifications = db.collection("notifications");
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
                        username: result.username,
                        profile: true,
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

app.post("/adminLogin", (req,res) => {
    if (req.body.email === 'admin@gnc.com' && req.body.password === 'Admin@GNC') {
        res.send({token: 'asfdajkhfkksadjnfkjndjskankjfndsjkfkjdskafkandskanfksanafkds'});
    } else {
        res.status(401).json({ err: "You are not authorised" });
    }
})

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
            users.updateOne({ contactNumber: req.body.contactNumber },
                {
                    $set: {
                        username: req.body.username
                        //password: req.body.password
                    }
                }, function (err, _result) {
                    if (err) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        users.findOne({ contactNumber: req.body.contactNumber }, function (err, user) {
                            res.send({
                                questionState: user.questionState,
                                points: user.points,
                                contactNumber: user.contactNumber,
                                username: user.username,
                                profile: true,
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
                //res.send({ msg: 'You are already registered.', isNewUser: false, profile: true })
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
                            isNewUser: false,
                            profile: true
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
                            res.send({ msg: 'OTP is send to your Contact number.', isNewUser: true})
                            // users.insertOne({
                            //     username: '',
                            //     contactNumber: req.body.contactNumber,
                            //     questionState: 0,
                            //     points: 100,
                            //     earnedTickets: [],
                            //     isNewUser: true
                            // });
                        }
                    });
                } else {
                    res.status(400).json({ err: "Invalid Data!!" });
                }
            }
        }
    });
});


app.post("/forgotPassword", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            users.updateOne({ contactNumber: req.body.contactNumber },
                {
                    $set: {
                        password: req.body.password
                    }
                }, function (err, _result) {
                    if (err) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        users.findOne({ contactNumber: req.body.contactNumber }, function (err, user) {
                            res.send({
                                questionState: user.questionState,
                                points: user.points,
                                contactNumber: user.contactNumber,
                                username: user.username,
                                profile: true,
                            });
                        });
                    }
                });
        }
    });
    /*users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (result) {
                request('http://api.msg91.com/api/sendhttp.php?country=91&sender=LUCKYDRAW&route=4&mobiles=+' + req.body.contactNumber + '&authkey=192315AnTq0Se1Q5a54abb2&message=JSCA! This is your one-time password ' + req.body.otp + '.', { json: true }, (err, otp, body) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        res.send({ msg: 'OTP is send to your Contact number.', isNewUser: false, username: result.username })
                    }
                });
            }
        }
    });*/
});

app.post("/notify", (req, res) => {
    notifications.insert({
        created_at: (new Date).getTime(),
        title: req.body.title,
        msg: req.body.msg
    }, (err, result) => {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            res.send({ msg: 'Notification sent.' })
        }
    });
});


app.post("/getNotifications", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, (err, result) => {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            let lastSeenDate = new Date();
            lastSeenDate.setDate(lastSeenDate.getDate() - 1)
            let lastSeenTime = lastSeenDate.getTime()
            if (result.lastSeen) {
                lastSeenTime = result.lastSeen;
            }
            notifications.find({ created_at: { $gte: lastSeenTime } }, (err, result1) => {
                if (err) {
                    res.status(500).json({ err: "internal server error please try again later." });
                } else {
                    users.updateOne({ contactNumber: req.body.contactNumber }, { $set: { lastSeen: (new Date).getTime() } })
                    result1.toArray((error, resultMsg) => {
                        if (error) {
                            res.status(500).json({ err: "internal server error please try again later." });
                        } else {
                            res.send({ msgs: resultMsg });
                        }
                    })

                }
            });
        }
    });
});

app.post("/register", (req, res) => {
    users.findOne({ contactNumber: req.body.contactNumber }, function (err,result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (!result) {
                if (req.body.username && req.body.contactNumber && req.body.password) {
                    users.insertOne({
                        username: req.body.username,
                        contactNumber: req.body.contactNumber,
                        questionState: 0,
                        points: 100,
                        earnedTickets: [],
                        isNewUser: true,
                        password: req.body.password
                    });
                    res.send({
                        questionState: 0,
                        points: 100,
                        contactNumber: req.body.contactNumber,
                        username: req.body.username,
                        profile: true,
                    });
                } else {
                    res.status(401).json({ err: "Invalid Data!!" });
                }
            } else {
                res.status(400).json({ err: "User Already Exist!!" });
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
                const date = req.body.date;
                drawSlots.updateOne({ date: new Date(date[0], date[1] - 1, date[2], date[3] + 7, date[4] - 30, date[5], date[6]) }, { $push: { users: { contactNumber: req.body.contactNumber, ticket: req.body.ticket } } }, (err, suc) => {
                    if (err) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        users.updateOne({ contactNumber: req.body.contactNumber }, { $push: { ticketMapping: { ticketNo: req.body.ticket, assignDate: new Date(date[0], date[1] - 1, date[2], date[3] + 7, date[4] - 30, date[5], date[6]) } }, $pull: { earnedTickets: req.body.ticket } }, (err, success) => {
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
                                "http://luckydrawapi.dadabhagwan.org" + _path.substr(1) + "/" + images[j]
                                // "http://192.168.43.23:3000" + _path.substr(1) + "/" + images[j]
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

mapContactNumber = function() {
    if(this.result.length > 0)
        this.result.map((k) => {
            emit("contactNumber", k.contactNumber)    
        })
}

reduce1 = function(key, values) {
    return values.join(",")
}


/*
Requires 2 parameters
    draws: [
        {prize: 1, count: 1},
        {prize: 2, count: 1},
        {prize: 3, count: 1}
    ]
    date 
*/
app.post("/generateResult", (req, res) => {
    let draws = req.body.draws;
    let date = req.body.date;
    calculateResult(draws, new Date(date[0], date[1] - 1, date[2], date[3] + 7, date[4] - 30, date[5], date[6]), (err, result) => {
        if(err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            print(JSON.stringify(result))
            res.send({"results" : result})
        }
    })
});

//draws = req.body.draws;
calculateResult = function(draws, date,  callback) {
    final_result = []
    max_counter = 1000;
    draws.forEach(draw => {
        k = db.drawSlots.find({"date": date}, {users: 1}).toArray();
        m = db.drawSlots.mapReduce(mapContactNumber, reduce1, {out :{inline: 1}});
        pre_winners = m.results.length > 0 ? m.results[0].value.split(",") : []
        winners = [];
                
        drawSlot_winners = [];
        //print(winners.length, " ", draw.count);
        while(winners.length < draw.count) {
            if(max_counter <= 0) {
                db.drawSlots.updateOne({"date": date}, {$set: {result : []}})
                callback("error") 
            }
            index = Math.ceil(Math.random() * (k[0].users.length))-1;
            lucky_winner = k[0].users[index];
            //print(pre_winners, " ", lucky_winner.contactNumber);
            if(pre_winners.indexOf(lucky_winner.contactNumber) < 0) {
                pre_winners.push(lucky_winner.contactNumber);
                winners.push(lucky_winner);
            } else {
                max_counter--;
                continue;
            }
            drawSlot_winners.push(lucky_winner);
        }
        drawSlot_winners.forEach(d_w => {
            db.drawSlots.updateOne({"date": date}, {$push: {result : {contactNumber: d_w.contactNumber, prize: draw.prize, ticket: d_w.ticket}}})
            final_result.push({contactNumber: d_w.contactNumber, prize: draw.prize, ticket: d_w.ticket})
            //print(d_w.contactNumber, " ", draw.prize)
        });   
    })
    callback(null, final_result)  
}


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
                                        res.send({ msg: "You have got Ticket " + dbRes.coupon });
                                        // send sms to user
                                        /*console.log('Hello, suprise ****', req.body.contactNumber, dbRes.coupon)
                                        // request('http://api.msg91.com/api/sendhttp.php?country=91&sender=LUCKYDRAW&route=4&mobiles=+' + req.body.contactNumber + '&authkey=192315AnTq0Se1Q5a54abb2&message=Congratulation! You earned a new Lucky Draw Coupon : ' + dbRes.coupon + '.', { json: true }, (err, otp, body) => {
                                        request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=+91" + req.body.contactNumber + "&authkey=192315AnTq0Se1Q5a54abb2&message=Congratulation! You earned a new Lucky Draw Coupon :" + dbRes.coupon + ".", { json: true }, (err, otp, body) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).json({ err: "internal server error please try again later." });
                                            } else {
                                                res.send({ msg: "You have got Ticket " + dbRes.coupon });
                                            }
                                        });*/
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


map = function() {
    if(this.questionState <= 25)
        emit("<25", 1);
    if(this.questionState > 25 && this.questionState <= 50)
        emit("<50", 1);
    if(this.questionState > 50 && this.questionState <= 75)
       emit("<75", 1);
    if(this.questionState > 75 && this.questionState < 100)
       emit("<100", 1);
    if(this.questionState >= 100)
       emit("=100", 1);
    emit("userCount", 1)
}

reduce = function(key, values) {
    return Array.sum(values)
}

app.post("/statistics", (req, res) => {
    users.mapReduce(map,reduce,{out:{inline:1}}).then( (stats) => {
        res.send({"stats": stats})
    });
});

app.post("/userList", (req, res) => {
    if (req.body.contactNumber == "7574852413") {
        users.find({}).toArray((_err, users) => {
            if (_err) {
                res.send({ err: "Internal server error", _err })
            } else {
                res.send(users);
            }
        });
    } else {
        res.status(401).json({ err: "You are unauthorised." });
    }
});

app.post("/deleteUser", (req, res) => {
    if (req.body.contactNumber == "7574852413") {
        users.deleteOne({ contactNumber: req.body.deleteUserContact }, (err, _user) => {
            if (err) {
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                if (_user) {
                    res.send({ msg: 'User Deleted successfully.' })
                } else {
                    res.status(400).json({ err: "No user Found!!" });
                }
            }
        })
    } else {
        res.status(401).json({ err: "You are unauthorised." });
    }
})

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

app.listen(60371, () => console.log("Example app listening on port 60371!"));
// app.listen(3000, () => console.log("Example app listening on port 3000!"));
