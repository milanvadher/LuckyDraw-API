
const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'LuckyDraw';
MongoClient.connect(url, function(err, client) {
    // assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const users = db.collection('users');
    users.insert({
        username: "ch1",
        password: "123",
        contactNumber: "1231231231",
        quettionState: "0",
        points: "0",
        earnedTickets: [],
        ticketMapping: []
    });
  });
