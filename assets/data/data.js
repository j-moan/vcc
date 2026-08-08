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
        "unique-learning",
        "reading"
      ],
      "layout": [
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
          "id": "section-1785203463355-90b18c247f7028",
          "type": "section",
          "label": "line of text",
          "active": true
        },
        {
          "id": "movement-video",
          "type": "video",
          "label": "Movement",
          "image": "movement.jpg",
          "target": "M7lc1UVf-VE",
          "active": true
        },
        {
          "id": "tile-568cf242-6d2e-4fdd-8f97-d7adac63702e",
          "type": "placeholder",
          "label": "Under Construction",
          "image": "UnderConstruction.jpg",
          "target": "",
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
          "image": "reading.jpg"
        }
      ]
    },
    "morning-meeting": {
      "title": "Morning Meeting",
      "subtitle": "Choose a morning activity",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "section-songs",
          "type": "section",
          "label": "Songs and Activities",
          "active": true
        },
        {
          "id": "hello-song",
          "type": "video",
          "label": "Hello Song",
          "image": "hello-song.jpg",
          "target": "M7lc1UVf-VE",
          "active": true
        },
        {
          "id": "tile-25fd7fe9-ccee-424d-bfb0-8250b3800912",
          "type": "information",
          "label": "helloo song message",
          "image": "hello-song.jpg",
          "target": "hello i am working :-)",
          "active": true
        },
        {
          "id": "tile-65c5b1e9-dc03-4644-b15e-3ffc8f17ff75",
          "type": "placeholder",
          "label": "null test",
          "image": "",
          "target": "",
          "active": true
        }
      ]
    },
    "relaxing-videos-2": {
      "title": "Relaxing Videos",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
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
        }
      ]
    },
    "unique-learning": {
      "title": "Unique Learning",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [],
      "layout": [
        {
          "id": "tile-1786225843298-587fc5ea287188",
          "type": "website",
          "label": "Follow the Rules",
          "image": "",
          "target": "https://unique.n2y.com/view/unit-lesson/student-material/6855586?hl=1&page=11",
          "active": true
        }
      ]
    },
    "reading": {
      "title": "Reading",
      "subtitle": "",
      "parent": "home",
      "active": true,
      "children": [
        "brown-bear-brown-bear"
      ],
      "layout": [
        {
          "type": "navigation",
          "container": "brown-bear-brown-bear",
          "image": "TradeBookTitleBrownBear.jpg"
        }
      ]
    },
    "brown-bear-brown-bear": {
      "title": "Brown Bear, Brown Bear",
      "subtitle": "",
      "parent": "reading",
      "active": true,
      "children": [],
      "layout": []
    }
  }
};
