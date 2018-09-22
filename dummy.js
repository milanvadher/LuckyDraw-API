
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

/*test = {
    draws: [
        {prize: 1, count: 1},
        {prize: 2, count: 1},
        {prize: 3, count: 1}
    ]
}


map1 = function() {
    if(this.result.length > 0)
        this.result.map((k) => {
            emit("contactNumber", k.contactNumber)    
        })
}

reduce1 = function(key, values) {
    return values.join(",")
}

db.drawSlots.mapReduce(map1, reduce1, {out :{inline: 1}})

app.post("/generateResult", (req, res) => {
    let draws = req.body.draws;
    let date = req.body.date;
    calculateResult(test.draws, ISODate("2018-11-16T13:00:00Z"), (err, result) => {
        if(err) {
            res.send()
        } else {
            print(JSON.stringify(result))
            //res.send({"results" : result})
        }
    })
});

//draws = req.body.draws;
calculateResult = function(draws, date,  callback) {
    final_result = []
    draws.forEach(draw => {
        k = db.drawSlots.find({"date": date}, {users: 1}).toArray();
        m = db.drawSlots.mapReduce(map1, reduce1, {out :{inline: 1}});
        pre_winners = m.results.length > 0 ? m.results[0].value.split(",") : []
        winners = [];
                
        drawSlot_winners = [];
        print(winners.length, " ", draw.count);
        while(winners.length < draw.count) {
            index = Math.ceil(Math.random() * (k[0].users.length))-1;
            lucky_winner = k[0].users[index];
            print(pre_winners, " ", lucky_winner.contactNumber);
            if(pre_winners.indexOf(lucky_winner.contactNumber) < 0) {
                pre_winners.push(lucky_winner.contactNumber);
                winners.push(lucky_winner);
            } else {
                continue;
            }
            drawSlot_winners.push(lucky_winner);
        }
        drawSlot_winners.forEach(d_w => {
            db.drawSlots.updateOne({"date": date}, {$push: {result : {contactNumber: d_w.contactNumber, prize: draw.prize, ticket: d_w.ticket}}})
            final_result.push({contactNumber: d_w.contactNumber, prize: draw.prize, ticket: d_w.ticket})
            print(d_w.contactNumber, " ", draw.prize)
        });   
    })
    callback(null, final_result)  
}


k = db.drawSlots.find({"date": ISODate("2018-11-16T14:30:00Z")}, {users: 1}).toArray();
    draw_slot_winners = db.drawSlots.aggregate(
        { $group:  {result: {$gt: []}} },
        { $push: {"cns" : $result.$.contactNumber}}
        ).toArray();
winners = [];
draw_slot_winners.forEach((db_w) => winners.push(db_w.contactNumber));
drawSlot_winners = [];
while(winners.length < 3) {
    index = Math.ceil(Math.random() * (k[0].users.length))-1;
    lucky_winner = k[0].users[index];
    if(winners.indexOf(lucky_winner.contactNumber) < 0) {
        winners.push(lucky_winner.contactNumber);
    } else {
        continue;
    }
    drawSlot_winners.push(lucky_winner);
}
*/

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
