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
                

                // users.find( {ticketMapping : {$exists:true}, $where:'(this.ticketMapping.length)>38'}).toArray((err, result) => {
                //     for (let i = 0; i < result.length; i++) {
                //         const element = result[i];
                //         let tkts = element.ticketMapping.slice(0, 38);
                //         users.updateOne({"contactNumber": element.contactNumber}, {$set: {"ticketMapping": tkts}});
                //     }
                // });
                // users.find( {earnedTickets : {$exists:true}, $where:'(this.earnedTickets.length)>38'}).toArray((err, result) => {
                //     for (let i = 0; i < result.length; i++) {
                //         const element = result[i];
                //         let tkts = element.earnedTickets.slice(0, 38);
                //         users.updateOne({"contactNumber": element.contactNumber}, {$set: {"earnedTickets": tkts}});
                //     }
                // });
                // users.find( {ticketMapping : {$exists:true}, $where:'(this.earnedTickets.length+this.ticketMapping.length)>38'}).toArray((err, result) => {
                //     for (let i = 0; i < result.length; i++) {
                //         const element = result[i];
                //         let ticketMappingLength = element.ticketMapping.length;
                //         let earnedLength = 38 - ticketMappingLength;
                //         let tkts = element.earnedTickets.slice(0, earnedLength);
                //         users.updateOne({"contactNumber": element.contactNumber}, {$set: {"earnedTickets": tkts}});
                //     }
                // });
                users.find({}).toArray((err, result) => {
                    for(let m = 0; m < result.length; m++) {
                        let tempUser = result[m];
                        // Get ticket count earned through Pikachar
                        let pikacharTktcount = Math.floor(tempUser.questionState / 5);
                        let akTktcount = 0;
                        // Get ticket count earnde trhough ak quiz
                        user_ak_answers.find({"contactNumber": tempUser.contactNumber}).toArray((err1, result1) => {
                            //console.log(result1);
                            for(let k = 0 ; k < result1.length; k++) {
                                if(result1[k].answers.length == 10) {
                                    // If user has answered 10 questions, he gets 2 tickets
                                    akTktcount = akTktcount + 2;
                                } else if(result1[k].answers.length >= 5) {
                                    // If user has answered 5 or more questions, he gets 1 ticket
                                    akTktcount = akTktcount + 1;
                                }
                            }
                            // Ideal Total ticket count
                            let idealTktcount = pikacharTktcount + akTktcount;
                            // User's total ticket count
                            let tktMappingLength = tempUser.ticketMapping ? tempUser.ticketMapping.length : 0;
                            let earnedLength = tempUser.earnedTickets ? tempUser.earnedTickets.length : 0;
                            let userTotalTktCount = tktMappingLength + earnedLength;
                            // Get user's tkt count for pikachar
                            let actualPkTktCount = userTotalTktCount - akTktcount;
                            let questionState = actualPkTktCount * 5;
                            questionState = questionState > 100 ? 100 : questionState;
                            // Update the User's questionState to actual one
                            // if(questionState != tempUser.questionState && ((questionState > tempUser.questionState) )) {
                            //     console.log("con => " + tempUser.contactNumber + " questionState => " + questionState + " was => " + tempUser.questionState);
                            //     users.updateOne({"contactNumber": tempUser.contactNumber}, {$set: {questionState: questionState}});
                            // } 
                            
                            let extraTktCount = userTotalTktCount - idealTktcount;
                            if(extraTktCount > 0) {
                                // User has more tickets than he should have
                                //console.log("con => " + tempUser.contactNumber + " extraTktCount => " + extraTktCount + " userTotalTktCount => " + userTotalTktCount);
                                // if(tktMappingLength <= idealTktcount) {
                                //     idealTktcount = idealTktcount - tktMappingLength;
                                //     tempUser.earnedTickets = tempUser.earnedTickets.slice(0, idealTktcount);
                                // } else if(tktMappingLength > idealTktcount) {
                                //     tempUser.ticketMapping = tempUser.ticketMapping.slice(0, idealTktcount);
                                //     tempUser.earnedTickets = [];
                                // }
                                // users.updateOne({"contactNumber": tempUser.contactNumber}, 
                                //     {
                                //         $set: {
                                //             earnedTickets: tempUser.earnedTickets,
                                //             ticketMapping: tempUser.ticketMapping
                                //         }
                                //     }
                                // );
                                // if(userTotalTktCount - extraTktCount - ((tempUser.ticketMapping ? tempUser.ticketMapping.length : 0) + tempUser.earnedTickets.length) != 0) {
                                //     console.log("con => " + ((tempUser.ticketMapping ? tempUser.ticketMapping.length : 0) + tempUser.earnedTickets.length));
                                // }
                            }        
                            if(extraTktCount < 0) {
                                // User has less tickets than he should have
                                //console.log("con => " + tempUser.contactNumber + " extraTktCount => " + extraTktCount + " userTotalTktCount => " + userTotalTktCount + " idealTktcount => " + idealTktcount);
                            }                  
                        });
                    }
                    
                    
                });


                drawSlots.find({}).toArray((err, result) => {
                    for(let i = 0; i < result.length; i++) {
                        const element = result[i];
                        for(let j = 0; j < element.users.length; j++) {
                            const user = element.users[j];
                            users.findOne({"contactNumber": user.contactNumber}, (err1, result1) => {
                                user.ticket
                            });
                        }
                    }
                });
            }
        );





coupon = voucher_codes.generate({
    length: 8,
    count: 2,
    prefix: 'JJ111-'
});





console.log(coupon);