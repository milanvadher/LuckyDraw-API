
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
         username: "ch1",
         password: "123123",
         contactNumber: "7777901836",
         questionState: 2,
         points: 100,
         earnedTickets: [1007, 1008, 1009, 1010, 1011],
         ticketMapping: []
    });

    // storing tickets number
    const nextCouponNumber = db.collection('nextCouponNumber');
    nextCouponNumber.insert({
        coupon: 1000
    });
    

    // insert slots
    const drawSlots = db.collection('drawSlots');
    drawSlots.insert({
        date: new Date(2018, 10, 16, 10, 0, 0, 0),
        users: [],
        result: []
    });
    drawSlots.insert({
        date: new Date(2018, 10, 16, 12, 0, 0, 0),
        users: [],
        result: []
    });
    drawSlots.insert({
        date: new Date(2018, 10, 16, 15, 0, 0, 0),
        users: [],
        result: []
    });
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
