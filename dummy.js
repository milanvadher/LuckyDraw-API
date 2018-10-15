
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
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/1.JPG',
    'answers': [
      {
        'answer': 'Fight',
        'related_words': [
          'not talking',
          'fighting'
        ],
        'weight': 10
      },
      {
        'answer': 'Angry',
        'related_words': [
          'anger',
          'sad'
        ],
        'weight': 20
      },
      {
        'answer': 'Irritation',
        'related_words': [
          'frustration',
          'pissed off'
        ],
        'weight': 30
      },
      {
        'answer': 'Window',
        'related_words': [
          'frame',
          'glass'
        ],
        'weight': 10
      },
      {
        'answer': 'Disagree',
        'related_words': [
          'disagreement',
          'misunderstanding'
        ],
        'weight': 5
      },
      {
        'answer': 'Girls',
        'related_words': [
          'girl',
          'gender',
          'female'
        ],
        'weight': 5
      },
      {
        'answer': 'Youth',
        'related_words': [
          'teenage'
        ],
        'weight': 10
      },
      {
        'answer': 'Magazine',
        'related_words': [
          'month',
          'year',
          'price',
          'cost',
          'amount',
          'rupees',
          'logo',
          'language'
        ],
        'weight': 5
      },
      {
        'answer': 'Friends',
        'related_words': [
          'friendship',
          'relation',
          'sisters'
        ],
        'weight': 4
      },
      {
        'answer': 'Enemies',
        'related_words': [
          'relation'
        ],
        'weight': 1
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/2.JPG',
    'answers': [
      {
        'answer': 'Fight',
        'related_words': [
          'not talking',
          'fighting'
        ],
        'weight': 10
      },
      {
        'answer': 'Anger',
        'related_words': [
          'angry',
          'sad'
        ],
        'weight': 10
      },
      {
        'answer': 'Frustration',
        'related_words': [
          'irritation',
          'pissed off'
        ],
        'weight': 44
      },
      {
        'answer': 'Animal',
        'related_words': [
          'Lion',
          'Lioness',
          'cat family',
          'cat',
          'cats'
        ],
        'weight': 8
      },
      {
        'answer': 'Jungle',
        'related_words': [
          'forest'
        ],
        'weight': 4
      },
      {
        'answer': 'Roar',
        'related_words': [
          'shout',
          'howl',
          'express',
          'expression'
        ],
        'weight': 8
      },
      {
        'answer': 'Violent',
        'related_words': [
          'violence'
        ],
        'weight': 1
      },
      {
        'answer': 'Teeth',
        'related_words': [
          'tooth',
          'jaws',
          'jaw'
        ],
        'weight': 5
      },
      {
        'answer': 'Face',
        'related_words': [
          'faces'
        ],
        'weight': 5
      },
      {
        'answer': 'Whiskers',
        'related_words': [
          'hair'
        ],
        'weight': 5
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/3.JPG',
    'answers': [
      {
        'answer': 'Love',
        'related_words': [
          'loves',
          'care',
          'cares',
          'affection'
        ],
        'weight': 16
      },
      {
        'answer': 'White',
        'related_words': [
          'color',
          'green',
          'purple'
        ],
        'weight': 16
      },
      {
        'answer': 'Smile',
        'related_words': [
          'smiles',
          'happy'
        ],
        'weight': 16
      },
      {
        'answer': 'Pillow',
        'related_words': [
          'cushion'
        ],
        'weight': 6
      },
      {
        'answer': 'Sofa',
        'related_words': [
          'chair',
          'couch'
        ],
        'weight': 16
      },
      {
        'answer': 'Mother',
        'related_words': [
          'mom',
          'maa'
        ],
        'weight': 6
      },
      {
        'answer': 'Saree',
        'related_words': [
          'clothes',
          'dress'
        ],
        'weight': 6
      },
      {
        'answer': 'Gnani',
        'related_words': [
          'spiritual leader',
          'leader',
          'teacher',
          'gur'
        ],
        'weight': 6
      },
      {
        'answer': 'Pure',
        'related_words': [
          'purity'
        ],
        'weight': 6
      },
      {
        'answer': 'Noble',
        'related_words': [
          'nobility'
        ],
        'weight': 6
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/4.JPG',
    'answers': [
      {
        'answer': 'Freedom',
        'related_words': [
          'liberty'
        ],
        'weight': 10
      },
      {
        'answer': 'Peace',
        'related_words': [
          'calm'
        ],
        'weight': 20
      },
      {
        'answer': 'Enjoy',
        'related_words': [
          'happy',
          'happiness',
          'pleasure'
        ],
        'weight': 30
      },
      {
        'answer': 'Pose',
        'related_words': [
          'statue'
        ],
        'weight': 10
      },
      {
        'answer': 'Family',
        'related_words': [
          'friends',
          'mother',
          'father',
          'mom',
          'dad',
          'children',
          'kids'
        ],
        'weight': 5
      },
      {
        'answer': 'Krishna',
        'related_words': [
          'god',
          'lord'
        ],
        'weight': 5
      },
      {
        'answer': 'Food',
        'related_words': [
          'dishes',
          'fruits',
          'fruit',
          'dish'
        ],
        'weight': 10
      },
      {
        'answer': 'Shoes',
        'related_words': [
          'belt',
          'wallet',
          'shades',
          'goggles',
          'accessories'
        ],
        'weight': 5
      },
      {
        'answer': 'Book',
        'related_words': [
          'books',
          'knowledge',
          'gnan'
        ],
        'weight': 4
      },
      {
        'answer': 'Sunset',
        'related_words': [
          'sun',
          'light',
          'day'
        ],
        'weight': 1
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/5.JPG',
    'answers': [
      {
        'answer': 'Pride',
        'related_words': [
          'proud'
        ],
        'weight': 10
      },
      {
        'answer': 'Rude',
        'related_words': [
          'arrogance'
        ],
        'weight': 44
      },
      {
        'answer': 'Suffer',
        'related_words': [
          'suffering',
          'guilt'
        ],
        'weight': 10
      },
      {
        'answer': 'Arrows',
        'related_words': [
          'arrow'
        ],
        'weight': 8
      },
      {
        'answer': 'Thermometer',
        'related_words': [
          'manometer',
          'temperature'
        ],
        'weight': 4
      },
      {
        'answer': 'Temple',
        'related_words': [
          'mandir',
          'trimandir'
        ],
        'weight': 8
      },
      {
        'answer': 'Flags',
        'related_words': [
          'dhaja'
        ],
        'weight': 1
      },
      {
        'answer': 'Ego',
        'related_words': [
          'attitude'
        ],
        'weight': 5
      },
      {
        'answer': 'Yuva',
        'related_words': [
          'youth',
          'teenage'
        ],
        'weight': 5
      },
      {
        'answer': 'Shapes',
        'related_words': [
          'triangle',
          'square',
          'rectangle'
        ],
        'weight': 5
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/6.JPG',
    'answers': [
      {
        'answer': 'Brain',
        'related_words': [
          'mind'
        ],
        'weight': 9
      },
      {
        'answer': 'Intellect',
        'related_words': [
          'intelligence',
          'clever',
          'cleverness'
        ],
        'weight': 15
      },
      {
        'answer': 'Ego',
        'related_words': [
          'Egoism',
          'Egoistic'
        ],
        'weight': 15
      },
      {
        'answer': 'Computer',
        'related_words': [
          'Pc',
          'Laptop'
        ],
        'weight': 20
      },
      {
        'answer': 'Bulb',
        'related_words': [
          'light',
          'bulbs',
          'tube light'
        ],
        'weight': 6
      },
      {
        'answer': 'Nerves',
        'related_words': [
          'veins',
          'capillaries',
          'nervous system'
        ],
        'weight': 4
      },
      {
        'answer': 'Red',
        'related_words': [
          'orange',
          'color',
          'green',
          'yellow'
        ],
        'weight': 5
      },
      {
        'answer': 'Effect',
        'related_words': [
          'glow',
          'aura'
        ],
        'weight': 12
      },
      {
        'answer': 'Curves',
        'related_words': [
          'lines',
          '',
          'clouds',
          'waves',
          'design',
          'pattern'
        ],
        'weight': 2
      },
      {
        'answer': 'Round',
        'related_words': [
          'balloons',
          'shape',
          'shapes'
        ],
        'weight': 12
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/7.JPG',
    'answers': [
      {
        'answer': 'Goddess',
        'related_words': [
          'Lakshmi',
          'deity',
          'devi'
        ],
        'weight': 16
      },
      {
        'answer': 'Money',
        'related_words': [
          'wealth',
          'fortune'
        ],
        'weight': 16
      },
      {
        'answer': 'Coin',
        'related_words': [
          'currency'
        ],
        'weight': 16
      },
      {
        'answer': 'Metal',
        'related_words': [
          'copper',
          'metallic'
        ],
        'weight': 16
      },
      {
        'answer': 'Kumkum',
        'related_words': [
          'sindur',
          'vermilion'
        ],
        'weight': 6
      },
      {
        'answer': 'Law',
        'related_words': [
          'rule',
          'rules'
        ],
        'weight': 6
      },
      {
        'answer': 'Elephant',
        'related_words': [
          'Elephants',
          'Animal'
        ],
        'weight': 6
      },
      {
        'answer': 'Vehicle',
        'related_words': [
          'automobile',
          'motor'
        ],
        'weight': 6
      },
      {
        'answer': 'Gold',
        'related_words': [
          'Golden'
        ],
        'weight': 6
      },
      {
        'answer': 'Lotus',
        'related_words': [
          'Flower'
        ],
        'weight': 6
      }
    ]
  },
  {
    'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/8.JPG',
    'answers': [
      {
        'answer': 'Cigarette',
        'related_words': [
          'tobacco',
          'cigar'
        ],
        'weight': 9
      },
      {
        'answer': 'Smoking',
        'related_words': [
          'smokes',
          'smoke'
        ],
        'weight': 15
      },
      {
        'answer': 'Skull',
        'related_words': [
          'skeleton'
        ],
        'weight': 15
      },
      {
        'answer': 'Death',
        'related_words': [
          'die',
          'kill'
        ],
        'weight': 20
      },
      {
        'answer': 'Dark',
        'related_words': [
          'darkness',
          'black'
        ],
        'weight': 6
      },
      {
        'answer': 'Harmful',
        'related_words': [
          'unhealthy',
          'damaging',
          'injurious'
        ],
        'weight': 4
      },
      {
        'answer': 'Addiction',
        'related_words': [
          'addicted',
          'craving',
          'crave'
        ],
        'weight': 5
      },
      {
        'answer': 'Factory',
        'related_words': [
          'mill',
          'plant'
        ],
        'weight': 12
      },
      {
        'answer': 'Heart',
        'related_words': [
          'hearts'
        ],
        'weight': 2
      },
      {
        'answer': 'Ghost',
        'related_words': [
          'spirit',
          'bhoot'
        ],
        'weight': 12
      }
    ]
  },
  // {
  //   'url': 'http://luckydrawapi.dadabhagwan.org/ak_questions/9.JPG',
  //   'answers': [
  //     {
  //       'answer': '+',
  //       'related_words': [
  //         'plus',
  //         'sign'
  //       ],
  //       'weight': 10
  //     },
  //     {
  //       'answer': 'Attitude',
  //       'related_words': [
  //         'approach',
  //         'reaction'
  //       ],
  //       'weight': 44
  //     },
  //     {
  //       'answer': 'Nature',
  //       'related_words': [
  //         'behavior',
  //         'behave'
  //       ],
  //       'weight': 10
  //     },
  //     {
  //       'answer': 'Placebo',
  //       'related_words': [
  //         'treatment',
  //         'effect'
  //       ],
  //       'weight': 8
  //     },
  //     {
  //       'answer': 'Clips',
  //       'related_words': [
  //         'clip',
  //         'thread'
  //       ],
  //       'weight': 4
  //     },
  //     {
  //       'answer': 'Callouts',
  //       'related_words': [
  //         'chats',
  //         'chat',
  //         'dialogue box'
  //       ],
  //       'weight': 8
  //     },
  //     {
  //       'answer': 'Hanging',
  //       'related_words': [
  //         'hang'
  //       ],
  //       'weight': 1
  //     },
  //     {
  //       'answer': 'Thoughts',
  //       'related_words': [
  //         'thought',
  //         'thinking'
  //       ],
  //       'weight': 5
  //     },
  //     {
  //       'answer': 'Positivity',
  //       'related_words': [
  //         'optimism',
  //         'confidence'
  //       ],
  //       'weight': 5
  //     },
  //     {
  //       'answer': 'Happy',
  //       'related_words': [
  //         'happiness'
  //       ],
  //       'weight': 5
  //     }
  //   ]
  // }
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
