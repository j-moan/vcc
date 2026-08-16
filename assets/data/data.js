"use strict";

window.CLASSROOM_SITE = {
  "startContainer": "home",
  "containers": {
    "home": {
      "title": "Visual Communication for the Classroom",
      "subtitle": "Choose an activity",
      "parent": null,
      "active": true,
      "children": [
        "relaxing-videos-2",
        "morning-meeting",
        "calendar",
        "movement",
        "timers",
        "unique-learning",
        "reading",
        "snack-time-videos"
      ],
      "layout": [
        {
          "id": "section-1786923657282-8a47477ce021c8",
          "type": "section",
          "label": "Daily Routine",
          "active": true
        },
        {
          "type": "navigation",
          "container": "relaxing-videos-2",
          "image": "TitleRelaxingFishAquarium.jpg"
        },
        {
          "id": "nav-morning-meeting",
          "type": "navigation",
          "container": "morning-meeting",
          "image": "morning-meeting.jpg",
          "active": true
        },
        {
          "type": "navigation",
          "container": "calendar",
          "image": "calendar.jpg"
        },
        {
          "type": "navigation",
          "container": "movement",
          "image": "movement fast kid.jpg"
        },
        {
          "type": "navigation",
          "container": "timers",
          "image": "TitleTimers.jpg"
        },
        {
          "id": "section-1786919626615-04a6cd3f15a2a",
          "type": "section",
          "label": "Reading",
          "active": true
        },
        {
          "type": "navigation",
          "container": "unique-learning",
          "image": "TitleN2YUniqueLearning.jpg"
        },
        {
          "type": "navigation",
          "container": "reading",
          "image": "cover brown bear.jpg"
        },
        {
          "type": "navigation",
          "container": "snack-time-videos",
          "image": "Mickey Mouse.jpg"
        }
      ]
    },
    "morning-meeting": {
      "title": "Morning Meeting",
      "subtitle": "Choose a morning activity",
      "parent": "home",
      "active": true,
      "children": [
        "left-or-right-games",
        "counting",
        "alphabet",
        "asl-basic-sign-language"
      ],
      "layout": [
        {
          "id": "hello-song",
          "type": "video",
          "label": "Hello Song",
          "image": "hello-song.jpg",
          "target": "https://www.youtube.com/watch?v=T-wvRTDieGQ",
          "active": true
        },
        {
          "type": "navigation",
          "container": "left-or-right-games",
          "image": "Left Right.jpg"
        },
        {
          "type": "navigation",
          "container": "counting",
          "image": "math counting.jpg"
        },
        {
          "type": "navigation",
          "container": "alphabet",
          "image": "abc alphabet.jpg"
        },
        {
          "type": "navigation",
          "container": "asl-basic-sign-language",
          "image": "ASL hands.jpg"
        }
      ]
    },
    "relaxing-videos-2": {
      "title": "Relaxing Videos",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [
        "august-september",
        "october-november",
        "december",
        "january",
        "february",
        "march",
        "april",
        "may"
      ],
      "layout": [
        {
          "id": "tile-1786225190017-de884e23efa7f",
          "type": "video",
          "label": "Fish Aquarium",
          "image": "RelaxingAquariumFish.jpg",
          "target": "https://www.youtube.com/watch?v=-eP413GaFVE",
          "active": true
        },
        {
          "id": "tile-1786225235593-028b8f56253828",
          "type": "video",
          "label": "Birds",
          "image": "RelaxingBirds.jpg",
          "target": "https://www.youtube.com/watch?v=TtqnTP4ucnY&t=1s",
          "active": true
        },
        {
          "id": "tile-1786229746525-8529f938edecc8",
          "type": "video",
          "label": "Snoopy Scuba Jazz",
          "image": "Video Image Snoopy Scuba.jpg",
          "target": "https://www.youtube.com/watch?v=PMviieC5O3k",
          "active": true
        },
        {
          "id": "tile-1786923540962-88080ba2f8b518",
          "type": "video",
          "label": "Snoopy Chill Day Jazz",
          "image": "Snoopy Chill Day Jazz.jpg",
          "target": "https://www.youtube.com/watch?v=M_n0G4U4-JY&list=PLGl_fXLdnB-o&index=2&t=627s",
          "active": true
        },
        {
          "id": "tile-1786922443033-907e9a90c8b738",
          "type": "video",
          "label": "Panda Bubbles",
          "image": "Panda Bubbles.jpg",
          "target": "https://www.youtube.com/watch?v=A3vbUXLN59o",
          "active": true
        },
        {
          "id": "section-1786923004330-d838468889d728",
          "type": "section",
          "label": "Monthly Themed Videos",
          "active": true
        },
        {
          "type": "navigation",
          "container": "august-september",
          "image": "Aug Sept Sunflower.jpg"
        },
        {
          "type": "navigation",
          "container": "october-november",
          "image": "Oct Nov Pumpkin.jpg"
        },
        {
          "type": "navigation",
          "container": "december",
          "image": "Dec Cocoa Candy Cup.jpg"
        },
        {
          "type": "navigation",
          "container": "january",
          "image": "Jan Snowman.jpg"
        },
        {
          "type": "navigation",
          "container": "february",
          "image": "Feb Heart.jpg"
        },
        {
          "type": "navigation",
          "container": "march",
          "image": "Mar clover.jpg"
        },
        {
          "type": "navigation",
          "container": "april",
          "image": "April Eggs.jpg"
        },
        {
          "type": "navigation",
          "container": "may",
          "image": "May flamingo.jpg"
        }
      ]
    },
    "unique-learning": {
      "title": "Reading - Unique Learning",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786225843298-587fc5ea287188",
          "type": "website",
          "label": "Follow the Rules",
          "image": "follow the rules UL book.jpg",
          "target": "https://unique.n2y.com/view/unit-lesson/student-material/6855586?hl=1&page=11",
          "active": true
        }
      ]
    },
    "reading": {
      "title": "Reading - Animated Books",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [
        "brown-bear-brown-bear",
        "head-to-toe",
        "pete-the-cat-white-shoes"
      ],
      "layout": [
        {
          "type": "navigation",
          "container": "brown-bear-brown-bear",
          "image": "TradeBookTitleBrownBear.jpg"
        },
        {
          "type": "navigation",
          "container": "head-to-toe",
          "image": ""
        },
        {
          "type": "navigation",
          "container": "pete-the-cat-white-shoes",
          "image": ""
        }
      ]
    },
    "brown-bear-brown-bear": {
      "title": "Brown Bear, Brown Bear",
      "subtitle": "",
      "parent": "reading",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786917616725-874cb002f6e328",
          "type": "video",
          "label": "Brown Bear - Song by Mr. Elephant",
          "image": "brown bear mr elephant book song.jpg",
          "target": "https://www.youtube.com/watch?v=E7tvOtt1itA&list=PLNR0wAbzACmQ&index=1",
          "active": true
        },
        {
          "id": "tile-1786918034606-54160d25e9b91",
          "type": "video",
          "label": "Learn Colors",
          "image": "colors video.jpg",
          "target": "https://www.youtube.com/watch?v=qhOTU8_1Af4&list=PLNR0wAbzACmQ&index=5",
          "active": true
        },
        {
          "id": "tile-1786917703478-2e57e1acbdbbf",
          "type": "video",
          "label": "Brown Bear - Animated Read Aloud",
          "image": "Brown bear animated book.jpg",
          "target": "https://www.youtube.com/watch?v=Mc9My7TnxFU&list=PLNR0wAbzACmQ&index=2",
          "active": true
        },
        {
          "id": "tile-1786917901029-a88f820c2c02",
          "type": "video",
          "label": "Going on a Bear Hunt",
          "image": "Bear Hunt.jpg",
          "target": "https://www.youtube.com/watch?v=AuQ9jefyMIA&list=PLNR0wAbzACmQ&index=4",
          "active": true
        }
      ]
    },
    "left-or-right-games": {
      "title": "Left or Right Games",
      "subtitle": "",
      "parent": "morning-meeting",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786915809843-3185b84d114d28",
          "type": "video",
          "label": "Dance It Out",
          "image": "dance it out.jpg",
          "target": "https://www.youtube.com/watch?v=Jg-B3w5per4",
          "active": true
        },
        {
          "id": "tile-1786915837428-fd36fd0a3a7d18",
          "type": "video",
          "label": "Salamander",
          "image": "salamander.jpg",
          "target": "https://www.youtube.com/watch?v=gRbwFq9665k",
          "active": true
        },
        {
          "id": "tile-1786915871932-b5389253c451c",
          "type": "video",
          "label": "Boey Bear",
          "image": "Boey Bear Left Right.jpg",
          "target": "https://www.youtube.com/watch?v=BzlAHJ54VQI",
          "active": true
        }
      ]
    },
    "counting": {
      "title": "Counting",
      "subtitle": "",
      "parent": "morning-meeting",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786916207380-3d6698dd7074d",
          "type": "video",
          "label": "How Many Fingers?",
          "image": "how many fingers song.jpg",
          "target": "https://www.youtube.com/watch?v=xNw1SSz18Gg&list=RDxNw1SSz18Gg&start_radio=1",
          "active": true
        },
        {
          "id": "tile-1786916233284-adfff067f8bcb8",
          "type": "video",
          "label": "Counting to 20",
          "image": "count to 20 song.jpg",
          "target": "https://www.youtube.com/watch?v=dZUTtpddOKs&list=RDdZUTtpddOKs&start_radio=1",
          "active": true
        },
        {
          "id": "tile-1786916292236-61e140548fcfe",
          "type": "video",
          "label": "8 Little Planets",
          "image": "eight little planets song.jpg",
          "target": "https://www.youtube.com/watch?v=EO1GV4qUxgE&list=RDEO1GV4qUxgE&start_radio=1",
          "active": true
        },
        {
          "id": "tile-1786916317140-e7de31d1aaa1",
          "type": "video",
          "label": "Counting to 10",
          "image": "count to 10 song.jpg",
          "target": "https://www.youtube.com/watch?v=rTsvKlDADj4",
          "active": true
        }
      ]
    },
    "alphabet": {
      "title": "Alphabet",
      "subtitle": "",
      "parent": "morning-meeting",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786916625757-55143eb247c2d8",
          "type": "video",
          "label": "ASL Alphabet",
          "image": "ASL alphabet.jpg",
          "target": "https://www.youtube.com/watch?v=wMQHd1UBkeI&t=7s",
          "active": true
        },
        {
          "id": "tile-1786916656757-331d7be0b0dc48",
          "type": "video",
          "label": "Alphabet Song",
          "image": "Shark Alphabet Song.jpg",
          "target": "https://www.youtube.com/watch?v=ccEpTTZW34g&t=2s",
          "active": true
        },
        {
          "id": "tile-1786916684300-e8a5004ee0c868",
          "type": "video",
          "label": "Alpha-Motion",
          "image": "Alpha Motion Alphabet Song.jpg",
          "target": "https://www.youtube.com/watch?v=JSzyDA6fTXU&list=RDJSzyDA6fTXU&start_radio=1",
          "active": true
        },
        {
          "id": "tile-1786916711180-a42893cf03e708",
          "type": "video",
          "label": "Letter Sounds",
          "image": "ABC Phonics Song Alphabet.jpg",
          "target": "https://www.youtube.com/watch?v=Hr97eoA0eUw",
          "active": true
        }
      ]
    },
    "asl-basic-sign-language": {
      "title": "ASL - Basic Sign Language",
      "subtitle": "",
      "parent": "morning-meeting",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786916980852-e3f58ba640bcf8",
          "type": "video",
          "label": "ASL Alphabet Dance",
          "image": "ASL alphabet Song Dance.jpg",
          "target": "https://www.youtube.com/watch?v=T4FKufhMc44",
          "active": true
        },
        {
          "id": "tile-1786917013037-28368d98cb1f48",
          "type": "video",
          "label": "ASL Emotions",
          "image": "ASL Emotions.jpg",
          "target": "https://www.youtube.com/watch?v=YuX7-UvZy-8&t=16s",
          "active": true
        },
        {
          "id": "tile-1786917108204-51a0a8ccf4b7b8",
          "type": "video",
          "label": "ASL Basic Signs",
          "image": "ASL Basic King Ron.jpg",
          "target": "https://www.youtube.com/watch?v=vz6nwxccuoc",
          "active": true
        }
      ]
    },
    "head-to-toe": {
      "title": "Head to Toe",
      "subtitle": "",
      "parent": "reading",
      "active": true,
      "children": [],
      "layout": []
    },
    "pete-the-cat-white-shoes": {
      "title": "Pete the Cat - White Shoes",
      "subtitle": "",
      "parent": "reading",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786920142495-87f8f05c8f36e",
          "type": "video",
          "label": "I Love My White Shoes - Read Aloud",
          "image": "",
          "target": "https://www.youtube.com/watch?v=3ucxf9oTpa0",
          "active": true
        }
      ]
    },
    "calendar": {
      "title": "Calendar",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786918884974-33371c694c88f",
          "type": "video",
          "label": "Days of the Week Song",
          "image": "days of the week song.jpg",
          "target": "https://www.youtube.com/watch?v=1OiG2AVz6wE&list=PLGl_fXLdnB-o&index=16",
          "active": true
        },
        {
          "id": "tile-1786918778407-859cb3b7e3edb8",
          "type": "video",
          "label": "Months of the Year",
          "image": "Months of the Year Song.jpg",
          "target": "https://www.youtube.com/watch?v=Fe9bnYRzFvk&list=PLGl_fXLdnB-o&index=22",
          "active": true
        },
        {
          "id": "section-1786918944678-7565183da3af8",
          "type": "section",
          "label": "Days of the Week",
          "active": true
        },
        {
          "id": "tile-1786918908310-73967016df4458",
          "type": "video",
          "label": "Monday Song",
          "image": "monday song.jpg",
          "target": "https://www.youtube.com/watch?v=Nk5EUUnm7rc&list=PLGl_fXLdnB-o&index=17",
          "active": true
        },
        {
          "id": "tile-1786918989510-197e5865e5f298",
          "type": "video",
          "label": "Tuesday Song",
          "image": "Tuesday song.jpg",
          "target": "https://www.youtube.com/watch?v=j_vWB2XYkaA&list=PLGl_fXLdnB-o&index=18",
          "active": true
        },
        {
          "id": "tile-1786919018046-86471fd2cb6668",
          "type": "video",
          "label": "Wednesday Song",
          "image": "Wednesday Song.jpg",
          "target": "https://www.youtube.com/watch?v=wqfSXMzN8Hs&list=PLGl_fXLdnB-o&index=19",
          "active": true
        },
        {
          "id": "tile-1786918850087-0ae4c9b47b054",
          "type": "video",
          "label": "Thursday Song",
          "image": "Thursday Song.jpg",
          "target": "https://www.youtube.com/watch?v=IGENkpaPkgw&list=PLGl_fXLdnB-o&index=20",
          "active": true
        },
        {
          "id": "tile-1786918807774-a4937a96b4b278",
          "type": "video",
          "label": "Friday Song",
          "image": "friday Song.jpg",
          "target": "https://www.youtube.com/watch?v=y511_AkazQQ&list=PLGl_fXLdnB-o&index=21",
          "active": true
        }
      ]
    },
    "timers": {
      "title": "Timers",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": []
    },
    "snack-time-videos": {
      "title": "Snack Time Stories",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786920074342-ebb89a3bc6cb88",
          "type": "video",
          "label": "Mickey Mouse- Goofy the Great",
          "image": "Mickey Mouse.jpg",
          "target": "https://www.youtube.com/watch?v=mreBT21u8_U",
          "active": true
        },
        {
          "id": "tile-1786920387823-c39a4da4d4d77",
          "type": "video",
          "label": "Mickey Mouse - Surprise for Minnie",
          "image": "Mickey Mouse Minnie Surprise Hearts.jpg",
          "target": "https://www.youtube.com/watch?v=MnMma8P5uQY",
          "active": true
        },
        {
          "id": "tile-1786920706391-48806adf015a6",
          "type": "video",
          "label": "Mickey Mouse - Dr. Daisy",
          "image": "Mickey Mouse Doctor Daisy.jpg",
          "target": "https://www.youtube.com/watch?v=e0O6lW38ew4",
          "active": true
        },
        {
          "id": "tile-1786920336959-7e5b84096b46b8",
          "type": "video",
          "label": "Pete the Cat - Four Groovy Buttons",
          "image": "Pete Groovy Buttons.jpg",
          "target": "https://www.youtube.com/watch?v=-GSnmRZlgc4",
          "active": true
        },
        {
          "id": "tile-1786920803600-3750948705363",
          "type": "video",
          "label": "Pete the Cat - Scuba Cat",
          "image": "Pete Scuba Cat.jpg",
          "target": "https://www.youtube.com/watch?v=enq3zMMB4Gg",
          "active": true
        },
        {
          "id": "tile-1786920892248-9e7155eb307978",
          "type": "video",
          "label": "Pete the Cat - Shapes",
          "image": "Pete Shapes.jpg",
          "target": "https://www.youtube.com/watch?v=hQO1soadGAA",
          "active": true
        },
        {
          "id": "tile-1786920992248-2a83e83a7f1908",
          "type": "video",
          "label": "Pete the Cat - Alphabet",
          "image": "Pete ABC alphabet.jpg",
          "target": "https://www.youtube.com/watch?v=8lshQ2Pjom8",
          "active": true
        },
        {
          "id": "tile-1786921100568-7967016e961ab",
          "type": "video",
          "label": "Pete the Cat - Old McDonald Farm",
          "image": "Pete McDonald Farm.jpg",
          "target": "https://www.youtube.com/watch?v=mPE4397J37E&list=RDmPE4397J37E&start_radio=1",
          "active": true
        }
      ]
    },
    "movement": {
      "title": "Movement",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786921229303-24a39409ce17c8",
          "type": "video",
          "label": "Shake",
          "image": "Patty Shukla Shake.jpg",
          "target": "https://www.youtube.com/watch?v=I5RUzkySseE",
          "active": true
        },
        {
          "id": "tile-1786921346992-62a99e2e8e74c8",
          "type": "video",
          "label": "Jump",
          "image": "Patty Shukla Jump.jpg",
          "target": "https://www.youtube.com/watch?v=kcQJDpj5TSY",
          "active": true
        },
        {
          "id": "tile-1786921412768-070ad056a85208",
          "type": "video",
          "label": "Stand Up, Sit Down",
          "image": "Stand Up Sit Down Patty Shukla.jpg",
          "target": "https://www.youtube.com/watch?v=t9WAGkQUUL0",
          "active": true
        },
        {
          "id": "tile-1786921476768-bafc2da615b528",
          "type": "video",
          "label": "Wheels on the Bus",
          "image": "Patty Shukla Wheels on the Bus.jpg",
          "target": "https://www.youtube.com/watch?v=S9XZX3m06cE",
          "active": true
        },
        {
          "id": "tile-1786921560640-7e951094e60e28",
          "type": "video",
          "label": "Baby Shark",
          "image": "Baby Shark.jpg",
          "target": "https://www.youtube.com/watch?v=RxCwVQGlDis",
          "active": true
        },
        {
          "id": "tile-1786921634264-eea3d36425b53",
          "type": "video",
          "label": "Danny Go - Robot Dance",
          "image": "Danny Go Robot Dance.jpg",
          "target": "https://www.youtube.com/watch?v=T8Df3VZCKUc",
          "active": true
        }
      ]
    },
    "august-september": {
      "title": "August & September",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "october-november": {
      "title": "October & November",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "december": {
      "title": "December",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "january": {
      "title": "January",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "february": {
      "title": "February",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "march": {
      "title": "March",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "april": {
      "title": "April",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    },
    "may": {
      "title": "May",
      "subtitle": "",
      "parent": "relaxing-videos-2",
      "active": true,
      "children": [],
      "layout": []
    }
  }
};
