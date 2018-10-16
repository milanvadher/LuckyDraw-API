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
        users.find({}).forEach((u) => {
            coupon = voucher_codes.generate({
                length: 8,
                count: 1,
                prefix: 'JJ111-'
            });
            users.updateMany({"contactNumber": u.contactNumber}, {$set: {"vc_code": coupon[0]}});
        })
    }
);





coupon = voucher_codes.generate({
    length: 8,
    count: 2,
    prefix: 'JJ111-'
});



console.log(coupon);