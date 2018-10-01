
const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'LuckyDraw';
MongoClient.connect(url, function (err, client) {
    // assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    // insert a single users
     const users = db.collection('users');
     users.insert({
         username: "RootNode",
         password: "123123",
         contactNumber: "7777901836",
         questionState: 2,
         points: 100,
         earnedTickets: [2001, 2002, 2003, 2004, 2005, 2006],
         ticketMapping: [{ ticketNo: 1997, assignDate: new Date(2018, 10, 16, 10, 0, 0, 0) }, { ticketNo: 1998, assignDate: new Date(2018, 10, 16, 10, 0, 0, 0) }, { ticketNo: 1999, assignDate: new Date(2018, 10, 16, 10, 0, 0, 0) }]
    });

    const notifications = db.collection("notifications");
    notifications.insert({
        created_at: (new Date).getTime(),
        msg: ""
    })

    // storing tickets number
    // const nextCouponNumber = db.collection('nextCouponNumber');
    // nextCouponNumber.insert({
    //     coupon: 1000
    // });
    
    const ak_questions = db.collection('ak_questions');
    ak_questions.insert({
        url: "http://localhost:60731/ak_questions/1.jpg",
        answers: ["test", "test1", "test2"]
    })

    // insert slots
    // const drawSlots = db.collection('drawSlots');
    // drawSlots.insert({
    //     date: new Date(2018, 10, 16, 10, 0, 0, 0),
    //     users: [],
    //     result: []
    // });
    // drawSlots.insert({
    //     date: new Date(2018, 10, 16, 12, 0, 0, 0),
    //     users: [],
    //     result: []
    // });
    // drawSlots.insert({
    //     date: new Date(2018, 10, 16, 15, 0, 0, 0),
    //     users: [],
    //     result: []
    // });
});

//   var os = require('os');
// var ifaces = os.networkInterfaces();
// Object.keys(ifaces).forEach(function (ifname) {
//     var alias = 0;

//     ifaces[ifname].forEach(function (iface) {
//       if ('IPv4' !== iface.family || iface.internal !== false) {
//         // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//         return;
//       }

//       if (alias >= 1) {
//         // this single interface has multiple ipv4 addresses
//         console.log(ifname + ':' + alias, iface.address);
//       } else {
//         // this interface has only one ipv4 adress
//         console.log(ifname, iface.address);
//       }
//       ++alias;
//     });
//   });
