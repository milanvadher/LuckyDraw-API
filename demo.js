var voucher_codes = require('voucher-code-generator');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "LuckyDraw";
var db;
var users;
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
        // users.find({}).forEach((u) => {
        //     coupon = voucher_codes.generate({
        //         length: 8,
        //         count: 1,
        //         prefix: 'JJ111-'
        //     });
        //     users.updateMany({"contactNumber": u.contactNumber}, {$set: {"vc_code": coupon[0]}});
        // })
        // console.log(users.find({})),
        getDrawslots();
        // logic();
    }
);

function logic() {
    users.find({}).toArray((err, user) => {
        if (err) {
            console.log("err");
            console.log(err);
        } else {

        }
    });

}

function getDrawslots() {
    drawSlots.find({ date: new Date(2018, 10, 16, 18, 30, 00) }).toArray((err, getDrawslots) => {
        if (err) {
            console.log("err");
            console.log(err);
        } else {
            // draw slots tickets
            allTkt = getDrawslots[0].users;
            winners = [];
            loop: 
            while (true) {
                console.log('in While');
                if (!winners.length) {
                    winners.push(allTkt[Math.floor(Math.random() * allTkt.length)]);
                }
                for (let i = 0; i < winners.length; i++) {
                    const element = winners[i];
                    let random = Math.floor(Math.random() * allTkt.length);
                    if(element.contactNumber != allTkt[random].contactNumber) {
                        winners.push(allTkt[random]);
                        if (winners.length == 5) {
                            break loop;
                        }
                    }
                    
                }
            }
            // for (let i = 0; i < 5; i++) {
            //     if (winners.indexOf(allTkt[Math.floor(Math.random() * allTkt.length)]) == -1) {
            //         winners.push(allTkt[Math.floor(Math.random() * allTkt.length)]);
            //     } else {

            //     }
            // }
            console.log(winners);
        }
    });
}





coupon = voucher_codes.generate({
    length: 8,
    count: 2,
    prefix: 'JJ111-'
});



console.log(coupon);