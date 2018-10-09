
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
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/1.JPG',
    u'answers': [
      {
        u'answer': u'Fight',
        u'related_words': [
          u'not talking',
          u'fighting'
        ],
        'weight': 6
      },
      {
        u'answer': u'Angry',
        u'related_words': [
          u'anger',
          u'sad'
        ],
        'weight': 6
      },
      {
        u'answer': u'Irritation',
        u'related_words': [
          u'frustration',
          u'pissed off'
        ],
        'weight': 6
      },
      {
        u'answer': u'Window',
        u'related_words': [
          u'frame',
          u'glass'
        ],
        'weight': 6
      },
      {
        u'answer': u'Color',
        u'related_words': [
          u'green',
          u'yellow',
          u'white',
          u'brown'
        ],
        'weight': 6
      },
      {
        u'answer': u'Disagree',
        u'related_words': [
          u'disagreement',
          u'misunderstanding'
        ],
        'weight': 6
      },
      {
        u'answer': u'Pattern',
        u'related_words': [
          u'design'
        ],
        'weight': 6
      },
      {
        u'answer': u'Girls',
        u'related_words': [
          u'girl',
          u'gender',
          u'female'
        ],
        'weight': 6
      },
      {
        u'answer': u'Youth',
        u'related_words': [
          u'teenage'
        ],
        'weight': 6
      },
      {
        u'answer': u'Magazine',
        u'related_words': [
          u'month',
          u'year',
          u'price',
          u'cost',
          u'amount',
          u'rupees',
          u'logo',
          u'language'
        ],
        'weight': 6
      },
      {
        u'answer': u'Shadow',
        u'related_words': [
          u'silhouette'
        ],
        'weight': 6
      },
      {
        u'answer': u'Nature Trees',
        u'related_words': [
          u'sky',
          u'water',
          u'daylight',
          u'day'
        ],
        'weight': 6
      },
      {
        u'answer': u'Numbers',
        u'related_words': [
          u'two',
          u'twelve'
        ],
        'weight': 6
      },
      {
        u'answer': u'Standing',
        u'related_words': [
          u'body posture',
          u'folded hands'
        ],
        'weight': 6
      },
      {
        u'answer': u'Friends',
        u'related_words': [
          u'friendship',
          u'relation',
          u'sisters'
        ],
        'weight': 6
      },
      {
        u'answer': u'Enemies',
        u'related_words': [
          u'relation'
        ],
        'weight': 6
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/2.JPG',
    u'answers': [
      {
        u'answer': u'Fight',
        u'related_words': [
          u'not talking',
          u'fighting'
        ],
        'weight': 8
      },
      {
        u'answer': u'Anger',
        u'related_words': [
          u'angry',
          u'sad'
        ],
        'weight': 8
      },
      {
        u'answer': u'Frustration',
        u'related_words': [
          u'irritation',
          u'pissed off'
        ],
        'weight': 8
      },
      {
        u'answer': u'Effect',
        u'related_words': [
          u'effects',
          u'mirror effect',
          u'blur effect',
          u'blur',
          u'focus'
        ],
        'weight': 8
      },
      {
        u'answer': u'Animal',
        u'related_words': [
          u'Lion',
          u'Lioness',
          u'cat family',
          u'cat',
          u'cats'
        ],
        'weight': 8
      },
      {
        u'answer': u'Jungle',
        u'related_words': [
          u'forest'
        ],
        'weight': 8
      },
      {
        u'answer': u'Roar',
        u'related_words': [
          u'shout',
          u'howl',
          u'express',
          u'expression'
        ],
        'weight': 8
      },
      {
        u'answer': u'Language',
        u'related_words': [
          u'magazine',
          u'month',
          u'year',
          u'price',
          u'cost',
          u'amount',
          u'rupees',
          u'logo'
        ],
        'weight': 8
      },
      {
        u'answer': u'Violent',
        u'related_words': [
          u'violence'
        ],
        'weight': 8
      },
      {
        u'answer': u'Teeth',
        u'related_words': [
          u'tooth',
          u'jaws',
          u'jaw'
        ],
        'weight': 8
      },
      {
        u'answer': u'Face',
        u'related_words': [
          u'faces'
        ],
        'weight': 8
      },
      {
        u'answer': u'Whiskers',
        u'related_words': [
          u'hair'
        ],
        'weight': 8
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/3.JPG',
    u'answers': [
      {
        u'answer': u'Love',
        u'related_words': [
          u'loves',
          u'care',
          u'cares',
          u'affection'
        ],
        'weight': 6
      },
      {
        u'answer': u'White',
        u'related_words': [
          u'color',
          u'green',
          u'purple'
        ],
        'weight': 6
      },
      {
        u'answer': u'Hands',
        u'related_words': [
          u'hand'
        ],
        'weight': 6
      },
      {
        u'answer': u'Namashkar',
        u'related_words': [
          u'greetings',
          u'gesture'
        ],
        'weight': 6
      },
      {
        u'answer': u'Smile',
        u'related_words': [
          u'smiles',
          u'happy'
        ],
        'weight': 6
      },
      {
        u'answer': u'Pillow',
        u'related_words': [
          u'cushion'
        ],
        'weight': 6
      },
      {
        u'answer': u'Sofa',
        u'related_words': [
          u'chair',
          u'couch'
        ],
        'weight': 6
      },
      {
        u'answer': u'Mother',
        u'related_words': [
          u'mom',
          u'maa'
        ],
        'weight': 6
      },
      {
        u'answer': u'Female',
        u'related_words': [
          u'lady',
          u'gender'
        ],
        'weight': 6
      },
      {
        u'answer': u'Logo',
        u'related_words': [
          u'language',
          u'magazine',
          u'month',
          u'year',
          u'price',
          u'cost',
          u'amount',
          u'rupees',
          u'language'
        ],
        'weight': 6
      },
      {
        u'answer': u'Nurture',
        u'related_words': [
          u'upbringing'
        ],
        'weight': 6
      },
      {
        u'answer': u'Saree',
        u'related_words': [
          u'clothes',
          u'dress'
        ],
        'weight': 6
      },
      {
        u'answer': u'Gnani',
        u'related_words': [
          u'spiritual leader',
          u'leader',
          u'teacher',
          u'guru'
        ],
        'weight': 6
      },
      {
        u'answer': u'Pure',
        u'related_words': [
          u'purity'
        ],
        'weight': 6
      },
      {
        u'answer': u'Noble',
        u'related_words': [
          u'nobility'
        ],
        'weight': 6
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/4.JPG',
    u'answers': [
      {
        u'answer': u'Pictures',
        u'related_words': [
          u'picture',
          u'images',
          u'image',
          u'snapshot'
        ],
        'weight': 7
      },
      {
        u'answer': u'Present',
        u'related_words': [
          u'now',
          u'today'
        ],
        'weight': 7
      },
      {
        u'answer': u'Freedom',
        u'related_words': [
          u'liberty'
        ],
        'weight': 7
      },
      {
        u'answer': u'Peace',
        u'related_words': [
          u'calm'
        ],
        'weight': 7
      },
      {
        u'answer': u'Enjoy',
        u'related_words': [
          u'happy',
          u'happiness',
          u'pleasure'
        ],
        'weight': 7
      },
      {
        u'answer': u'Pose',
        u'related_words': [
          u'statue'
        ],
        'weight': 7
      },
      {
        u'answer': u'Family',
        u'related_words': [
          u'friends',
          u'mother',
          u'father',
          u'mom',
          u'dad',
          u'children',
          u'kids'
        ],
        'weight': 7
      },
      {
        u'answer': u'Krishna',
        u'related_words': [
          u'god',
          u'lord'
        ],
        'weight': 7
      },
      {
        u'answer': u'Price',
        u'related_words': [
          u'logo',
          u'language',
          u'magazine',
          u'month',
          u'year',
          u'cost',
          u'amount',
          u'rupees',
          u'language'
        ],
        'weight': 7
      },
      {
        u'answer': u'Food',
        u'related_words': [
          u'dishes',
          u'fruits',
          u'fruit',
          u'dish'
        ],
        'weight': 7
      },
      {
        u'answer': u'Shoes',
        u'related_words': [
          u'belt',
          u'wallet',
          u'shades',
          u'goggles',
          u'accessories'
        ],
        'weight': 7
      },
      {
        u'answer': u'Book',
        u'related_words': [
          u'books',
          u'knowledge',
          u'gnan'
        ],
        'weight': 7
      },
      {
        u'answer': u'Home',
        u'related_words': [
          u'house',
          u'bungalow'
        ],
        'weight': 7
      },
      {
        u'answer': u'Sunset',
        u'related_words': [
          u'sun',
          u'light',
          u'day'
        ],
        'weight': 7
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/5.JPG',
    u'answers': [
      {
        u'answer': u'Pride',
        u'related_words': [
          u'proud'
        ],
        'weight': 7
      },
      {
        u'answer': u'Rude',
        u'related_words': [
          u'arrogance'
        ],
        'weight': 7
      },
      {
        u'answer': u'Suffer',
        u'related_words': [
          u'suffering',
          u'guilt'
        ],
        'weight': 7
      },
      {
        u'answer': u'Arrows',
        u'related_words': [
          u'arrow'
        ],
        'weight': 7
      },
      {
        u'answer': u'Thermometer',
        u'related_words': [
          u'manometer',
          u'temperature'
        ],
        'weight': 7
      },
      {
        u'answer': u'Temple',
        u'related_words': [
          u'mandir',
          u'trimandir'
        ],
        'weight': 7
      },
      {
        u'answer': u'Flags',
        u'related_words': [
          u'dhaja'
        ],
        'weight': 7
      },
      {
        u'answer': u'Ego',
        u'related_words': [
          u'attitude'
        ],
        'weight': 7
      },
      {
        u'answer': u'Pose',
        u'related_words': [
          u'figure',
          u'human',
          u'body',
          u'structure'
        ],
        'weight': 7
      },
      {
        u'answer': u'Yellow',
        u'related_words': [
          u'color',
          u'green',
          u'blue',
          u'white',
          u'red'
        ],
        'weight': 7
      },
      {
        u'answer': u'Month',
        u'related_words': [
          u'price',
          u'logo',
          u'language',
          u'magazine',
          u'',
          u'year',
          u'cost',
          u'amount',
          u'rupees',
          u'language'
        ],
        'weight': 7
      },
      {
        u'answer': u'Yuva',
        u'related_words': [
          u'youth',
          u'teenage'
        ],
        'weight': 7
      },
      {
        u'answer': u'Shapes',
        u'related_words': [
          u'triangle',
          u'square',
          u'rectangle'
        ],
        'weight': 7
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/6.JPG',
    u'answers': [
      {
        u'answer': u'Brain',
        u'related_words': [
          u'mind'
        ],
        'weight': 9
      },
      {
        u'answer': u'Intellect',
        u'related_words': [
          u'intelligence',
          u'clever',
          u'cleverness'
        ],
        'weight': 9
      },
      {
        u'answer': u'Ego',
        u'related_words': [
          u'Egoism',
          u'Egoistic'
        ],
        'weight': 9
      },
      {
        u'answer': u'Computer',
        u'related_words': [
          u'Pc',
          u'Laptop'
        ],
        'weight': 9
      },
      {
        u'answer': u'Bulb',
        u'related_words': [
          u'light',
          u'bulbs',
          u'tube light'
        ],
        'weight': 9
      },
      {
        u'answer': u'Nerves',
        u'related_words': [
          u'veins',
          u'capillaries',
          u'nervous system'
        ],
        'weight': 9
      },
      {
        u'answer': u'Red',
        u'related_words': [
          u'orange',
          u'color',
          u'green',
          u'yellow'
        ],
        'weight': 9
      },
      {
        u'answer': u'Effect',
        u'related_words': [
          u'glow',
          u'aura'
        ],
        'weight': 9
      },
      {
        u'answer': u'Year',
        u'related_words': [
          u'month',
          u'price',
          u'logo',
          u'language',
          u'magazine',
          u'',
          u'cost',
          u'amount',
          u'rupees',
          u'language'
        ],
        'weight': 9
      },
      {
        u'answer': u'Curves',
        u'related_words': [
          u'lines',
          u'',
          u'clouds',
          u'waves',
          u'design',
          u'pattern'
        ],
        'weight': 9
      },
      {
        u'answer': u'Round',
        u'related_words': [
          u'balloons',
          u'shape',
          u'shapes'
        ],
        'weight': 9
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/7.JPG',
    u'answers': [
      {
        u'answer': u'Goddess',
        u'related_words': [
          u'Lakshmi',
          u'deity',
          u'devi'
        ],
        'weight': 8
      },
      {
        u'answer': u'Money',
        u'related_words': [
          u'wealth',
          u'fortune'
        ],
        'weight': 8
      },
      {
        u'answer': u'Coin',
        u'related_words': [
          u'currency'
        ],
        'weight': 8
      },
      {
        u'answer': u'Metal',
        u'related_words': [
          u'copper',
          u'metallic'
        ],
        'weight': 8
      },
      {
        u'answer': u'Kumkum',
        u'related_words': [
          u'sindur',
          u'vermilion'
        ],
        'weight': 8
      },
      {
        u'answer': u'Law',
        u'related_words': [
          u'rule',
          u'rules'
        ],
        'weight': 8
      },
      {
        u'answer': u'Elephant',
        u'related_words': [
          u'Elephants',
          u'Animal'
        ],
        'weight': 8
      },
      {
        u'answer': u'Vehicle',
        u'related_words': [
          u'automobile',
          u'motor'
        ],
        'weight': 8
      },
      {
        u'answer': u'Gold',
        u'related_words': [
          u'Golden'
        ],
        'weight': 8
      },
      {
        u'answer': u'Lotus',
        u'related_words': [
          u'Flower'
        ],
        'weight': 8
      },
      {
        u'answer': u'Follow',
        u'related_words': [
          u'obey',
          u'abide'
        ],
        'weight': 8
      },
      {
        u'answer': u'Vishnu',
        u'related_words': [
          u'Narayan',
          u'Husband'
        ],
        'weight': 8
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/8.JPG',
    u'answers': [
      {
        u'answer': u'Cigarette',
        u'related_words': [
          u'tobacco',
          u'cigar'
        ],
        'weight': 8
      },
      {
        u'answer': u'Smoking',
        u'related_words': [
          u'smokes',
          u'smoke'
        ],
        'weight': 8
      },
      {
        u'answer': u'Bad company',
        u'related_words': [
          u'kusang'
        ],
        'weight': 8
      },
      {
        u'answer': u'Skull',
        u'related_words': [
          u'skeleton'
        ],
        'weight': 8
      },
      {
        u'answer': u'Death',
        u'related_words': [
          u'die',
          u'kill'
        ],
        'weight': 8
      },
      {
        u'answer': u'Dark',
        u'related_words': [
          u'darkness',
          u'black'
        ],
        'weight': 8
      },
      {
        u'answer': u'Harmful',
        u'related_words': [
          u'unhealthy',
          u'damaging',
          u'injurious'
        ],
        'weight': 8
      },
      {
        u'answer': u'Addiction',
        u'related_words': [
          u'addicted',
          u'craving',
          u'crave'
        ],
        'weight': 8
      },
      {
        u'answer': u'Factory',
        u'related_words': [
          u'mill',
          u'plant'
        ],
        'weight': 8
      },
      {
        u'answer': u'Heart',
        u'related_words': [
          u'hearts'
        ],
        'weight': 8
      },
      {
        u'answer': u'W',
        u'related_words': [
          u'U',
          u'alphabets'
        ],
        'weight': 8
      },
      {
        u'answer': u'Ghost',
        u'related_words': [
          u'spirit',
          u'bhoot'
        ],
        'weight': 8
      }
    ]
  },
  {
    u'url': u'http://luckydrawapi.dadabhagwan.org/ak_questions/9.JPG',
    u'answers': [
      {
        u'answer': u'+',
        u'related_words': [
          u'plus',
          u'sign'
        ],
        'weight': 9
      },
      {
        u'answer': u'Attitude',
        u'related_words': [
          u'approach',
          u'reaction'
        ],
        'weight': 9
      },
      {
        u'answer': u'Nature',
        u'related_words': [
          u'behavior',
          u'behave'
        ],
        'weight': 9
      },
      {
        u'answer': u'Placebo',
        u'related_words': [
          u'treatment',
          u'effect'
        ],
        'weight': 9
      },
      {
        u'answer': u'Clips',
        u'related_words': [
          u'clip',
          u'thread'
        ],
        'weight': 9
      },
      {
        u'answer': u'Callouts',
        u'related_words': [
          u'chats',
          u'chat',
          u'dialogue box'
        ],
        'weight': 9
      },
      {
        u'answer': u'Hanging',
        u'related_words': [
          u'hang'
        ],
        'weight': 9
      },
      {
        u'answer': u'Thoughts',
        u'related_words': [
          u'thought',
          u'thinking'
        ],
        'weight': 9
      },
      {
        u'answer': u'Positivity',
        u'related_words': [
          u'optimism',
          u'confidence'
        ],
        'weight': 9
      },
      {
        u'answer': u'Happy',
        u'related_words': [
          u'happiness'
        ],
        'weight': 9
      },
      {
        u'answer': u'Words',
        u'related_words': [
          u'vowels',
          u'alphabets'
        ],
        'weight': 9
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
