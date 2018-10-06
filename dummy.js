
const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'LuckyDraw';
MongoClient.connect(url, function (err, client) {
    // assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    // insert a single users
     /*const users = db.collection('users');
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
    })*/

    // storing tickets number
    // const nextCouponNumber = db.collection('nextCouponNumber');
    // nextCouponNumber.insert({
    //     coupon: 1000
    // });
    
    const ak_questions = db.collection('ak_questions');
    ak_questions.insertMany(
        [
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/1.JPG",
                "answers": [
                {
                    "answer": "Fight",
                    "related_words": [
                    "not talking",
                    "fighting"
                    ]
                },
                {
                    "answer": "Angry",
                    "related_words": [
                    "anger",
                    "sad"
                    ]
                },
                {
                    "answer": "Irritation",
                    "related_words": [
                    "frustration",
                    "pissed off"
                    ]
                },
                {
                    "answer": "Window",
                    "related_words": [
                    "frame",
                    "glass"
                    ]
                },
                {
                    "answer": "Color",
                    "related_words": [
                    "green",
                    "yellow",
                    "white",
                    "brown"
                    ]
                },
                {
                    "answer": "Disagree",
                    "related_words": [
                    "disagreement",
                    "misunderstanding"
                    ]
                },
                {
                    "answer": "Pattern",
                    "related_words": [
                    "design"
                    ]
                },
                {
                    "answer": "Girls",
                    "related_words": [
                    "girl",
                    "gender",
                    "female"
                    ]
                },
                {
                    "answer": "Youth",
                    "related_words": [
                    "teenage"
                    ]
                },
                {
                    "answer": "Magazine",
                    "related_words": [
                    "month",
                    "year",
                    "price",
                    "cost",
                    "amount",
                    "rupees",
                    "logo",
                    "language"
                    ]
                },
                {
                    "answer": "Shadow",
                    "related_words": [
                    "silhouette"
                    ]
                },
                {
                    "answer": "Nature Trees",
                    "related_words": [
                    "sky",
                    "water",
                    "daylight",
                    "day"
                    ]
                },
                {
                    "answer": "Numbers",
                    "related_words": [
                    "two",
                    "twelve"
                    ]
                },
                {
                    "answer": "Standing",
                    "related_words": [
                    "body posture",
                    "folded hands"
                    ]
                },
                {
                    "answer": "Friends",
                    "related_words": [
                    "friendship",
                    "relation",
                    "sisters"
                    ]
                },
                {
                    "answer": "Enemies",
                    "related_words": [
                    "relation"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/2.JPG",
                "answers": [
                {
                    "answer": "Fight",
                    "related_words": [
                    "not talking",
                    "fighting"
                    ]
                },
                {
                    "answer": "Anger",
                    "related_words": [
                    "angry",
                    "sad"
                    ]
                },
                {
                    "answer": "Frustration",
                    "related_words": [
                    "irritation",
                    "pissed off"
                    ]
                },
                {
                    "answer": "Effect",
                    "related_words": [
                    "effects",
                    "mirror effect",
                    "blur effect",
                    "blur",
                    "focus"
                    ]
                },
                {
                    "answer": "Animal",
                    "related_words": [
                    "Lion",
                    "Lioness",
                    "cat family",
                    "cat",
                    "cats"
                    ]
                },
                {
                    "answer": "Jungle",
                    "related_words": [
                    "forest"
                    ]
                },
                {
                    "answer": "Roar",
                    "related_words": [
                    "shout",
                    "howl",
                    "express",
                    "expression"
                    ]
                },
                {
                    "answer": "Language",
                    "related_words": [
                    "magazine",
                    "month",
                    "year",
                    "price",
                    "cost",
                    "amount",
                    "rupees",
                    "logo"
                    ]
                },
                {
                    "answer": "Violent",
                    "related_words": [
                    "violence"
                    ]
                },
                {
                    "answer": "Teeth",
                    "related_words": [
                    "tooth",
                    "jaws",
                    "jaw"
                    ]
                },
                {
                    "answer": "Face",
                    "related_words": [
                    "faces"
                    ]
                },
                {
                    "answer": "Whiskers",
                    "related_words": [
                    "hair"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/3.JPG",
                "answers": [
                {
                    "answer": "Love",
                    "related_words": [
                    "loves",
                    "care",
                    "cares",
                    "affection"
                    ]
                },
                {
                    "answer": "White",
                    "related_words": [
                    "color",
                    "green",
                    "purple"
                    ]
                },
                {
                    "answer": "Hands",
                    "related_words": [
                    "hand"
                    ]
                },
                {
                    "answer": "Namashkar",
                    "related_words": [
                    "greetings",
                    "gesture"
                    ]
                },
                {
                    "answer": "Smile",
                    "related_words": [
                    "smiles",
                    "happy"
                    ]
                },
                {
                    "answer": "Pillow",
                    "related_words": [
                    "cushion"
                    ]
                },
                {
                    "answer": "Sofa",
                    "related_words": [
                    "chair",
                    "couch"
                    ]
                },
                {
                    "answer": "Mother",
                    "related_words": [
                    "mom",
                    "maa"
                    ]
                },
                {
                    "answer": "Female",
                    "related_words": [
                    "lady",
                    "gender"
                    ]
                },
                {
                    "answer": "Logo",
                    "related_words": [
                    "language",
                    "magazine",
                    "month",
                    "year",
                    "price",
                    "cost",
                    "amount",
                    "rupees",
                    "language"
                    ]
                },
                {
                    "answer": "Nurture",
                    "related_words": [
                    "upbringing"
                    ]
                },
                {
                    "answer": "Saree",
                    "related_words": [
                    "clothes",
                    "dress"
                    ]
                },
                {
                    "answer": "Gnani",
                    "related_words": [
                    "spiritual leader",
                    "leader",
                    "teacher",
                    "guru"
                    ]
                },
                {
                    "answer": "Pure",
                    "related_words": [
                    "purity"
                    ]
                },
                {
                    "answer": "Noble",
                    "related_words": [
                    "nobility"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/4.JPG",
                "answers": [
                {
                    "answer": "Pictures",
                    "related_words": [
                    "picture",
                    "images",
                    "image",
                    "snapshot"
                    ]
                },
                {
                    "answer": "Present",
                    "related_words": [
                    "now",
                    "today"
                    ]
                },
                {
                    "answer": "Freedom",
                    "related_words": [
                    "liberty"
                    ]
                },
                {
                    "answer": "Peace",
                    "related_words": [
                    "calm"
                    ]
                },
                {
                    "answer": "Enjoy",
                    "related_words": [
                    "happy",
                    "happiness",
                    "pleasure"
                    ]
                },
                {
                    "answer": "Pose",
                    "related_words": [
                    "statue"
                    ]
                },
                {
                    "answer": "Family",
                    "related_words": [
                    "friends",
                    "mother",
                    "father",
                    "mom",
                    "dad",
                    "children",
                    "kids"
                    ]
                },
                {
                    "answer": "Krishna",
                    "related_words": [
                    "god",
                    "lord"
                    ]
                },
                {
                    "answer": "Price",
                    "related_words": [
                    "logo",
                    "language",
                    "magazine",
                    "month",
                    "year",
                    "cost",
                    "amount",
                    "rupees",
                    "language"
                    ]
                },
                {
                    "answer": "Food",
                    "related_words": [
                    "dishes",
                    "fruits",
                    "fruit",
                    "dish"
                    ]
                },
                {
                    "answer": "Shoes",
                    "related_words": [
                    "belt",
                    "wallet",
                    "shades",
                    "goggles",
                    "accessories"
                    ]
                },
                {
                    "answer": "Book",
                    "related_words": [
                    "books",
                    "knowledge",
                    "gnan"
                    ]
                },
                {
                    "answer": "Home",
                    "related_words": [
                    "house",
                    "bungalow"
                    ]
                },
                {
                    "answer": "Sunset",
                    "related_words": [
                    "sun",
                    "light",
                    "day"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/5.JPG",
                "answers": [
                {
                    "answer": "Pride",
                    "related_words": [
                    "proud"
                    ]
                },
                {
                    "answer": "Rude",
                    "related_words": [
                    "arrogance"
                    ]
                },
                {
                    "answer": "Suffer",
                    "related_words": [
                    "suffering",
                    "guilt"
                    ]
                },
                {
                    "answer": "Arrows",
                    "related_words": [
                    "arrow"
                    ]
                },
                {
                    "answer": "Thermometer",
                    "related_words": [
                    "manometer",
                    "temperature"
                    ]
                },
                {
                    "answer": "Temple",
                    "related_words": [
                    "mandir",
                    "trimandir"
                    ]
                },
                {
                    "answer": "Flags",
                    "related_words": [
                    "dhaja"
                    ]
                },
                {
                    "answer": "Ego",
                    "related_words": [
                    "attitude"
                    ]
                },
                {
                    "answer": "Pose",
                    "related_words": [
                    "figure",
                    "human",
                    "body",
                    "structure"
                    ]
                },
                {
                    "answer": "Yellow",
                    "related_words": [
                    "color",
                    "green",
                    "blue",
                    "white",
                    "red"
                    ]
                },
                {
                    "answer": "Month",
                    "related_words": [
                    "price",
                    "logo",
                    "language",
                    "magazine",
                    "",
                    "year",
                    "cost",
                    "amount",
                    "rupees",
                    "language"
                    ]
                },
                {
                    "answer": "Yuva",
                    "related_words": [
                    "youth",
                    "teenage"
                    ]
                },
                {
                    "answer": "Shapes",
                    "related_words": [
                    "triangle",
                    "square",
                    "rectangle"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/6.JPG",
                "answers": [
                {
                    "answer": "Brain",
                    "related_words": [
                    "mind"
                    ]
                },
                {
                    "answer": "Intellect",
                    "related_words": [
                    "intelligence",
                    "clever",
                    "cleverness"
                    ]
                },
                {
                    "answer": "Ego",
                    "related_words": [
                    "Egoism",
                    "Egoistic"
                    ]
                },
                {
                    "answer": "Computer",
                    "related_words": [
                    "Pc",
                    "Laptop"
                    ]
                },
                {
                    "answer": "Bulb",
                    "related_words": [
                    "light",
                    "bulbs",
                    "tube light"
                    ]
                },
                {
                    "answer": "Nerves",
                    "related_words": [
                    "veins",
                    "capillaries",
                    "nervous system"
                    ]
                },
                {
                    "answer": "Red",
                    "related_words": [
                    "orange",
                    "color",
                    "green",
                    "yellow"
                    ]
                },
                {
                    "answer": "Effect",
                    "related_words": [
                    "glow",
                    "aura"
                    ]
                },
                {
                    "answer": "Year",
                    "related_words": [
                    "month",
                    "price",
                    "logo",
                    "language",
                    "magazine",
                    "",
                    "cost",
                    "amount",
                    "rupees",
                    "language"
                    ]
                },
                {
                    "answer": "Curves",
                    "related_words": [
                    "lines",
                    "",
                    "clouds",
                    "waves",
                    "design",
                    "pattern"
                    ]
                },
                {
                    "answer": "Round",
                    "related_words": [
                    "balloons",
                    "shape",
                    "shapes"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/7.JPG",
                "answers": [
                {
                    "answer": "Goddess",
                    "related_words": [
                    "Lakshmi",
                    "deity",
                    "devi"
                    ]
                },
                {
                    "answer": "Money",
                    "related_words": [
                    "wealth",
                    "fortune"
                    ]
                },
                {
                    "answer": "Coin",
                    "related_words": [
                    "currency"
                    ]
                },
                {
                    "answer": "Metal",
                    "related_words": [
                    "copper",
                    "metallic"
                    ]
                },
                {
                    "answer": "Kumkum",
                    "related_words": [
                    "sindur",
                    "vermilion"
                    ]
                },
                {
                    "answer": "Law",
                    "related_words": [
                    "rule",
                    "rules"
                    ]
                },
                {
                    "answer": "Elephant",
                    "related_words": [
                    "Elephants",
                    "Animal"
                    ]
                },
                {
                    "answer": "Vehicle",
                    "related_words": [
                    "automobile",
                    "motor"
                    ]
                },
                {
                    "answer": "Gold",
                    "related_words": [
                    "Golden"
                    ]
                },
                {
                    "answer": "Lotus",
                    "related_words": [
                    "Flower"
                    ]
                },
                {
                    "answer": "Follow",
                    "related_words": [
                    "obey",
                    "abide"
                    ]
                },
                {
                    "answer": "Vishnu",
                    "related_words": [
                    "Narayan",
                    "Husband"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/8.JPG",
                "answers": [
                {
                    "answer": "Cigarette",
                    "related_words": [
                    "tobacco",
                    "cigar"
                    ]
                },
                {
                    "answer": "Smoking",
                    "related_words": [
                    "smokes",
                    "smoke"
                    ]
                },
                {
                    "answer": "Bad company",
                    "related_words": [
                    "kusang"
                    ]
                },
                {
                    "answer": "Skull",
                    "related_words": [
                    "skeleton"
                    ]
                },
                {
                    "answer": "Death",
                    "related_words": [
                    "die",
                    "kill"
                    ]
                },
                {
                    "answer": "Dark",
                    "related_words": [
                    "darkness",
                    "black"
                    ]
                },
                {
                    "answer": "Harmful",
                    "related_words": [
                    "unhealthy",
                    "damaging",
                    "injurious"
                    ]
                },
                {
                    "answer": "Addiction",
                    "related_words": [
                    "addicted",
                    "craving",
                    "crave"
                    ]
                },
                {
                    "answer": "Factory",
                    "related_words": [
                    "mill",
                    "plant"
                    ]
                },
                {
                    "answer": "Heart",
                    "related_words": [
                    "hearts"
                    ]
                },
                {
                    "answer": "W",
                    "related_words": [
                    "U",
                    "alphabets"
                    ]
                },
                {
                    "answer": "Ghost",
                    "related_words": [
                    "spirit",
                    "bhoot"
                    ]
                }
                ]
            },
            {
                "url": "http://luckydrawapi.dadabhagwan.org:60371/ak_questions/9.JPG",
                "answers": [
                {
                    "answer": "+",
                    "related_words": [
                    "plus",
                    "sign"
                    ]
                },
                {
                    "answer": "Attitude",
                    "related_words": [
                    "approach",
                    "reaction"
                    ]
                },
                {
                    "answer": "Nature",
                    "related_words": [
                    "behavior",
                    "behave"
                    ]
                },
                {
                    "answer": "Placebo",
                    "related_words": [
                    "treatment",
                    "effect"
                    ]
                },
                {
                    "answer": "Clips",
                    "related_words": [
                    "clip",
                    "thread"
                    ]
                },
                {
                    "answer": "Callouts",
                    "related_words": [
                    "chats",
                    "chat",
                    "dialogue box"
                    ]
                },
                {
                    "answer": "Hanging",
                    "related_words": [
                    "hang"
                    ]
                },
                {
                    "answer": "Thoughts",
                    "related_words": [
                    "thought",
                    "thinking"
                    ]
                },
                {
                    "answer": "Positivity",
                    "related_words": [
                    "optimism",
                    "confidence"
                    ]
                },
                {
                    "answer": "Happy",
                    "related_words": [
                    "happiness"
                    ]
                },
                {
                    "answer": "Words",
                    "related_words": [
                    "vowels",
                    "alphabets"
                    ]
                }
                ]
            }
            ]
    );

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
