const express = require("express");
const app = express();
var fs = require("fs");
var os = require("os");
var ifaces = os.networkInterfaces();
var ip;
const request = require('request');
var crypto = require("crypto")
var voucher_codes = require('voucher-code-generator');

app.use("/questions", express.static("questions"));
app.use("/ak_questions", express.static("ak_questions"));
const MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Production URL */
// const port = 60371;
// const endPoint = 'http://luckydrawapi.dadabhagwan.org';

/* Local URL */
const port = 3000;
const endPoint = 'http://192.168.43.23:'+port;

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
        ak_questions = db.collection('ak_questions');
        user_ak_answers = db.collection('user_ak_answers');
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
                        ak_ques_st: result.ak_ques_st,
                        profile: true,
                        vc_code: result.vc_code
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
            res.send({ questionState: result.questionState, points: result.points, ak_ques_st: result.ak_ques_st });
        }
    });
});

app.post("/adminLogin", (req, res) => {
    if (req.body.email === 'admin@gnc.com' && req.body.password === 'Admin@GNC') {
        res.send({ token: 'asfdajkhfkksadjnfkjndjskankjfndsjkfkjdskafkandskanfksanafkds' });
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
    let temp_ak_ques_st = req.body.ak_ques_st ? req.body.ak_ques_st : 1
    let temp_points = (req.body.points > 0) ? req.body.points : 0;
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            let qst = req.body.questionState;
            if((result.questionState >= 100) || (result.questionState > req.body.questionState) || (result.questionState != (req.body.questionState - 1))) {
                qst = result.questionState;
            }
            users.updateOne({ contactNumber: req.body.contactNumber }, { $set: { questionState: qst, points: temp_points, ak_ques_st: temp_ak_ques_st } }, function (err, _result) {
                if (err) {
                    res.status(500).json({ err: "internal server error please try again later." });
                } else {
                    users.findOne({ contactNumber: req.body.contactNumber }, function (err, user) {
                        res.send({
                            questionState: user.questionState,
                            ak_ques_st: user.ak_ques_st,
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
                                ak_ques_st: user.ak_ques_st,
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
                            ak_ques_st: result.ak_ques_st,
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
                            res.send({ msg: 'OTP is send to your Contact number.', isNewUser: true })
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
                                ak_ques_st: user.ak_ques_st,
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
    users.findOne({ contactNumber: req.body.contactNumber }, function (err, result) {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (!result) {
                if (req.body.username && req.body.contactNumber && req.body.password) {
                    let vc_code = voucher_codes.generate({
                        length: 8,
                        count: 1,
                        prefix: 'JJ111-'
                    });
                    users.insertOne({
                        username: req.body.username,
                        contactNumber: req.body.contactNumber,
                        questionState: 0,
                        ak_ques_st: 1,
                        points: 100,
                        earnedTickets: [],
                        isNewUser: true,
                        password: req.body.password,
                        vc_code: vc_code
                    });
                    res.send({
                        questionState: 0,
                        ak_ques_st: 1,
                        points: 100,
                        contactNumber: req.body.contactNumber,
                        username: req.body.username,
                        profile: true,
                        vc_code: vc_code
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
                res.send({ earnedTickets: _user.earnedTickets, ticketMapping: _user.ticketMapping, new_game: false })
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
                if (parseInt(data[0]) === parseInt(req.body.questionState) + 1) {
                    let _path = path + items[i];
                    fs.readdir(path + items[i], function (err, images) {
                        let _images = [];
                        for (var j = 0; j < images.length; j++) {
                            _images.push(
                                endPoint + _path.substr(1) + "/" + images[j]
                                // "http://192.168.43.23:3000" + _path.substr(1) + "/" + images[j]
                                // "http://192.168.1.103:3000" + _path.substr(1) + "/" + images[j]
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

app.post("/ak_questionDetails", (req, res) => {
    let url = endPoint + "/ak_questions/" + req.body.ak_ques_st + ".JPG";
    // let url = "http://192.168.43.23:3000/ak_questions/" + req.body.ak_ques_st + ".JPG";
    // let url = "http://192.168.1.103:3000/ak_questions/" + req.body.ak_ques_st + ".JPG";
    ak_questions.findOne({ url: url }, (err, result) => {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            let encoded_results = [];
            let weights = [];
            for (let i = 0; i < result.answers.length; i++) {
                let ans = result.answers[i];
                encoded_related_words = [Buffer.from(ans.answer).toString("base64")];
                weights.push(ans.weight)
                for (let v = 0; v < ans.related_words.length; v++) {
                    encoded_related_words.push(Buffer.from(ans.related_words[v]).toString("base64"));
                }
                encoded_results.push(encoded_related_words);
            }
            user_ak_answers.findOne({ "ak_ques_st": req.body.ak_ques_st, "contactNumber": req.body.contactNumber }, (error, result1) => {
                if (error) {
                    res.status(500).json({ err: "internal server error please try again later." });
                } else {
                    if (result1) {
                        res.send({ url: result.url, answers: encoded_results, answered: result1.answers, weight: weights });
                    } else {
                        res.send({ url: result.url, answers: encoded_results, answered: [], weight: weights });
                    }
                }
            });

        }
    })
});

app.post("/save_user_answers", (req, res) => {
    user_ak_answers.findOne({ "contactNumber": req.body.contactNumber, "ak_ques_st": req.body.ak_ques_st }, (err, result) => {
        if (err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if (result) {
                user_ak_answers.updateOne({ "contactNumber": req.body.contactNumber, "ak_ques_st": req.body.ak_ques_st },
                    { $set: { "answers": req.body.answer } }, { upsert: true }, (error, result1) => {
                        if (error) {
                            res.status(500).json({ err: "internal server error please try again later." });
                        } else {
                            res.status(200).json({ "msg": "State saved" });
                        }
                    })
            } else {
                user_ak_answers.insertOne({
                    "contactNumber": req.body.contactNumber,
                    "ak_ques_st": req.body.ak_ques_st,
                    "answers": req.body.answer
                }, (error, result1) => {
                    if (error) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        res.status(200).json({ "msg": "State saved" });
                    }
                });
            }
        }
    });
});


app.post("/getAKUserState", (req, res) => {
    final_result = [];
    ak_questions.aggregate([{ "$project": { "_id": "$url", "total": { $size: "$answers" } } }]).toArray((error, result) => {
        console.log(result);
        user_ak_answers.find({ "contactNumber": req.body.contactNumber })
            .toArray((error, result1) => {
                for (let uaa = 0; uaa < result.length; uaa++) {
                    let temp_url = result[uaa]._id;
                    //let answerCount = result1[uaa].answers.length;
                    if(result1.length == 0) {
                        let ak_ques_st = temp_url.replace(endPoint + "/ak_questions/", "").replace(".JPG", "");
                        // let ak_ques_st = temp_url.replace("http://192.168.43.23:3000/ak_questions/", "").replace(".JPG", "");
                        // let ak_ques_st = temp_url.replace("http://192.168.1.103:3000/ak_questions/", "").replace(".JPG", "");
                        final_result.push({ "ak_ques_st": ak_ques_st, "total": result[uaa].total, "answered": 0 });
                    } else {
                        for (let i = 0; i < result1.length; i++) {
                            if(temp_url == endPoint + "/ak_questions/" + result1[i].ak_ques_st + ".JPG") {
                            // if (temp_url == "http://192.168.43.23:3000/ak_questions/" + result1[i].ak_ques_st + ".JPG") {
                                // if (temp_url == "http://192.168.1.103:3000/ak_questions/" + result1[i].ak_ques_st + ".JPG") {
                                final_result.push({ "ak_ques_st": result1[i].ak_ques_st, "total": result[uaa].total, "answered": result1[i].answers.length });
                                break;
                            }
                            if (i == (result1.length - 1)) {
                                let ak_ques_st = temp_url.replace(endPoint + "/ak_questions/", "").replace(".JPG", "");
                                // let ak_ques_st = temp_url.replace("http://192.168.43.23:3000/ak_questions/", "").replace(".JPG", "");
                                // let ak_ques_st = temp_url.replace("http://192.168.1.103:3000/ak_questions/", "").replace(".JPG", "");
                                final_result.push({ "ak_ques_st": ak_ques_st, "total": result[uaa].total, "answered": 0 });
                            }
                        }
                    }
                    
                }
                res.send({ "result_stats": final_result });
            });
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

/*app.post("/generateResult", (req, res) => {
    drawSlots.find({date: new Date("2018-11-16T15:00:00Z")}).
    toArray((error, result) => {
        if(error) {

        } else {
            slotUsers = result[0].users;
            p = {}
            slotUsers.forEach((k) => p[k["contactNumber"]] ? p[k["contactNumber"]].push(k["ticket"]) : p[k["contactNumber"]] = [k["ticket"]]);
            console.log(p);
            Math.ceil(Math.random() * Object.keys(p).length)
        }
    });
})*/


app.post("/generateTicket", (req, res) => {
    users.findOne(
        {
            contactNumber: req.body.contactNumber,
            questionState: req.body.questionState
        },
        function (err, result) {
            console.log(req.body.contactNumber, req.body.questionState);
            if (err) {
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                if (result) {
                    nextCouponNumber.findOneAndUpdate({}, {$inc: {coupon: 1}}, {upsert: true}, function (err, dbRes) {
                        if (err) {
                            console.log("findone", err);
                        } else {
                            users.updateOne(
                                { contactNumber: req.body.contactNumber },
                                { $push: { earnedTickets: dbRes.value.coupon } },
                                { upsert: true },
                                function (err, _result) {
                                    if (err) {
                                        res.send({ msg: err });
                                    } else {
                                        // nextCouponNumber.updateOne(
                                        //     { coupon: dbRes.coupon },
                                        //     { $inc: { coupon: 1 } }
                                        // );
                                        res.send({ msg: "You have got Ticket " + dbRes.value.coupon });
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


app.post("/generateTicketForAK", (req, res) => {
    users.findOne(
        {
            contactNumber: req.body.contactNumber,
        },
        function (err, result) {
            if (err) {
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                if (result) {
                    nextCouponNumber.findOneAndUpdate({}, {$inc: {coupon: 1}}, {upsert: true}, function (err, dbRes) {
                        if (err) {
                            console.log("findone", err);
                        } else {
                            users.updateOne(
                                { contactNumber: req.body.contactNumber },
                                { $push: { earnedTickets: dbRes.value.coupon } },
                                { upsert: true },
                                function (err, _result) {
                                    if (err) {
                                        res.send({ msg: err });
                                    } else {
                                        // nextCouponNumber.updateOne(
                                        //     { coupon: dbRes.coupon },
                                        //     { $inc: { coupon: 1 } }
                                        // );
                                        res.send({ msg: "You have got Ticket " + dbRes.value.coupon });
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

app.post("/registerAndGenerateTicket", (req, res) => {
    users.findOne({"contactNumber": req.body.contactNumber}, (error, user) => {
        if (error) {
                res.status(500).json({ err: "internal server error please try again later." });
        } else {
            if(user) {
                nextCouponNumber.findOneAndUpdate({}, {$inc: {coupon: 1}}, {upsert: true}, (err, dbRes) => {
                    if(err) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        drawSlots.find({"result": []}).sort({date: 1}).toArray((error1, drawSlot1) => {
                            console.log("jjj");
                            console.log(drawSlot1[0].date);
                            let date = drawSlot1[0].date;
                            users.updateOne({"contactNumber": user.contactNumber}, 
                            {$push: 
                                { ticketMapping: 
                                    { ticketNo: dbRes.value.coupon, 
                                        assignDate: date } 
                                }
                            },
                            {upsert: true}, (e, _res) => {
                                if(e) {
                                    res.status(500).json({ err: "internal server error please try again later." });
                                } else {
                                    drawSlots.updateOne({ date: date },
                                    { $push: { users: { contactNumber: user.contactNumber, ticket: dbRes.value.coupon } } })
                                    res.send({"contactNumber": user.contactNumber, "coupon": dbRes.value.coupon, "drawTime": date});
                                }
                            });
                        });
                    }
                })
            } else {
                users.insertOne({"contactNumber": req.body.contactNumber, "username": "jj111", "password": "jj111", ticketMapping: []}, (err, result) => {
                    if(err) {
                        res.status(500).json({ err: "internal server error please try again later." });
                    } else {
                        nextCouponNumber.findOneAndUpdate({}, {$inc: {coupon: 1}}, {upsert: true}, (err1, dbRes) => {
                            if(err1) {
                                res.status(500).json({ err: "internal server error please try again later." });
                            } else {
                                drawSlots.find({"result": []}).sort({date: 1}).toArray((error1, drawSlot1) => {
                                    let date = drawSlot1[0].date;
                                    users.updateOne({"contactNumber": req.body.contactNumber}, 
                                    {$push: 
                                        { ticketMapping: 
                                            { ticketNo: dbRes.value.coupon, 
                                                assignDate: date } 
                                        }
                                    },
                                    {upsert: true}, (e, _res) => {
                                        if(e) {
                                            res.status(500).json({ err: "internal server error please try again later." });
                                        } else {
                                            drawSlots.updateOne({ date: date },
                                        { $push: { users: { contactNumber: req.body.contactNumber, ticket: dbRes.value.coupon } } })
                                            res.send({"contactNumber": req.body.contactNumber, "coupon": dbRes.value.coupon, "drawTime": date});
                                        }
                                    });
                                });
                            }
                        })
                    }
                })
            }
        }
    })
});

map = function () {
    if (this.questionState <= 25 && this.questionState > 0)
        emit("<25", 1);
    if (this.questionState > 25 && this.questionState <= 50)
        emit("<50", 1);
    if (this.questionState > 50 && this.questionState <= 75)
        emit("<75", 1);
    if (this.questionState > 75 && this.questionState < 100)
        emit("<100", 1);
    if (this.questionState >= 100)
        emit("=100", 1);
    if (this.questionState == 0)
        emit("=0", 1);
    emit("userCount", 1)
}

reduce = function (key, values) {
    return Array.sum(values)
}

app.post("/statistics", (req, res) => {
    users.mapReduce(map, reduce, { out: { inline: 1 } }).then((stats) => {
        res.send({ "stats": stats })
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

app.post("/sos", (req, res) => {
    if (req.body.name && req.body.number && req.body.center) {
        let message = "Jsca ! Please help me. " + req.body.name + " from " + req.body.center + " Mo: " + req.body.number;
        request('http://api.msg91.com/api/sendhttp.php?country=91&sender=MBASOS&route=4&mobiles=8153922317&authkey=192315AnTq0Se1Q5a54abb2&message=' + message, { json: true }, (err, otp, body) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "internal server error please try again later." });
            } else {
                res.status(200).json({ "result": "Message sent" });
            }
        });
    }
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
    //let date = req.body.date;
    drawSlots.find({"date": new Date(2018, 10, 16, 18, 30, 00)}, {users: 1}).toArray((err, result) => {
        if(err) {
            res.status(500).json({ err: "internal server error please try again later." });
        } else {
            drawSlots.mapReduce(mapContactNumber, reduce1, {out :{inline: 1}}).then((m) => {
                //console.log("nn", m, draws, result)
                pre_winners = m.length > 0 ? m[0].value.split(",") : []
                drawSlot_winners = [];
                draws.forEach(draw => {
                    winners = [];
                    
                    console.log("in 111")
                    while(winners.length < draw.count) {
                        //console.log("in 111", winners.length, draw.count)
                        /*if(max_counter <= 0) {
                            db.drawSlots.updateOne({"date": date}, {$set: {result : []}})
                        }*/
                        index = Math.ceil(Math.random() * (result[0].users.length))-1;
                        lucky_winner = result[0].users[index];
                        if(pre_winners.indexOf(lucky_winner.contactNumber) < 0) {
                            pre_winners.push(lucky_winner.contactNumber);
                            winners.push(lucky_winner);
                        } else {
                            //max_counter--;
                            continue;
                        }
                        drawSlot_winners.push(lucky_winner);
                    }
                });
                console.log("in 112222221", drawSlot_winners)
                let tempCounter = 0;
                final_result = []
                let temp_draws = []
                draws.forEach(d => {
                    for(let g=0; g < d.count; g++) {
                        temp_draws.push({"prize": d.prize})
                    }
                });
                console.log()
                drawSlot_winners.forEach(d_w => {
                    drawSlots.updateOne({"date": new Date(2018, 10, 16, 18, 30, 00)}, {$push: {result : {contactNumber: d_w.contactNumber, prize: draws[tempCounter].prize, ticket: d_w.ticket}}}, (err1, res1) => {
                        console.log("tempCounter ", tempCounter);
                        final_result.push({contactNumber: d_w.contactNumber, prize: temp_draws[tempCounter].prize, ticket: d_w.ticket})
                        //console.log("in 112221", drawSlot_winners.length, tempCounter)
                        if(drawSlot_winners.length == ++tempCounter) {
                            console.log("sending final_result", drawSlot_winners.length, tempCounter);
                            res.send({"results" : final_result})
                        }
                    })
                });
            }).catch((err2) => {
                res.status(500).json({ err: "internal server error please try again later." });
            })
        }
    });
});




user = {
    username: "",
    password: "",
    contactNumber: "",
    questionState: "",
    ak_ques_st: "",
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));