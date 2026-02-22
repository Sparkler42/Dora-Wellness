export const balanceOptions = [
  "\u2728 Balance and movement come naturally \u2014 my body adapts without me thinking about it",
  "\uD83C\uDF3F Pretty solid overall \u2014 the occasional wobble but nothing that stops me",
  "\uD83D\uDE05 Flat ground is fine, but hills, stairs, and slopes deserve my full attention",
  "\uD83E\uDD14 I've become deliberate about surfaces, sudden movements, and getting up too fast",
  "\uD83C\uDF0A Balance is something I actively think about and work with every day",
];

// Branch 1 — option 1 ("Balance and movement come naturally")
const branch1 = [
  {
    q: "What does easy movement look like for you?",
    o: [
      "\uD83C\uDFC3 I'm genuinely active \u2014 sports, hiking, gym, something physical most days",
      "\uD83D\uDEB6 I move regularly but it's more walking and daily life than structured exercise",
      "\uD83E\uDE91 I'm mostly sedentary but when I do move, my body responds well",
      "\uD83E\uDD38 It varies wildly depending on the week",
    ],
  },
  {
    q: "Have you ever had an injury or physical setback that changed how you move?",
    o: [
      "\uD83D\uDCAA Never really \u2014 I've been fortunate",
      "\uD83E\uDE79 Yes, but I've fully recovered and it's behind me",
      "\uD83D\uDD04 Yes, and I've adapted \u2014 it shaped how I move now",
      "\uD83C\uDF31 Minor things here and there, nothing significant",
    ],
  },
  {
    q: "What's the edge of your physical comfort zone?",
    o: [
      "\uD83D\uDD25 I push hard \u2014 I like finding my limits",
      "\uD83C\uDFAF I know my limits and work with them efficiently",
      "\uD83C\uDF3F I prefer to stay within what feels safe and comfortable",
      "\uD83E\uDD37 I haven't really thought about it in those terms",
    ],
  },
];

// Branch 2 — option 2 ("Pretty solid overall — the occasional wobble")
const branch2 = [
  {
    q: "When do the wobbles tend to show up?",
    o: [
      "\uD83D\uDE34 First thing in the morning right when I get up, otherwise I'm fine",
      "\uD83D\uDE13 When I'm distracted or stressed or anxious",
      "\uD83C\uDF11 In low light or on uneven ground",
      "\uD83E\uDD37 Randomly \u2014 no clear pattern",
    ],
  },
  {
    q: "How does your body feel after a day of more movement than usual?",
    o: [
      "\u2728 Great \u2014 I actually feel better when I've moved more",
      "\uD83D\uDE0C Fine in the moment, a little more tired the next day",
      "\uD83D\uDEC1 I need some recovery time \u2014 a bath, some rest",
      "\uD83D\uDE2C It takes me a couple of days to feel normal again",
    ],
  },
  {
    q: "Is there anything you've quietly started avoiding because of balance or stability?",
    o: [
      "\uD83D\uDE45 No \u2014 nothing's off the table",
      "\uD83E\uDD14 Maybe a thing or two \u2014 nothing I've said out loud",
      "\uD83D\uDE0C Yes, a few things \u2014 and I'm okay with that trade",
      "\uD83D\uDCAD I haven't thought about it that way but maybe yes",
    ],
  },
];

// Branch 3 — option 3 ("Flat ground is fine, but hills, stairs, and slopes")
const branch3 = [
  {
    q: "What's happening in your body on stairs or slopes?",
    o: [
      "\uD83E\uDDB5 My knees are the main thing \u2014 they complain going down",
      "\u2696\uFE0F It's more of a balance and stability thing than pain",
      "\uD83D\uDE24 I get winded faster than I'd like on inclines",
      "\uD83E\uDDB6 My feet and ankles feel uncertain on uneven ground",
      "\uD83D\uDD00 It's a combination of a few things",
    ],
  },
  {
    q: "Has this changed in the last few years?",
    o: [
      "\uD83D\uDCC8 Yes \u2014 it's noticeably different than it was five years ago",
      "\uD83D\uDD04 It comes and goes \u2014 some periods better than others",
      "\u26A1 It changed after a specific event \u2014 injury, illness, or surgery",
      "\uD83E\uDD37 Honestly I'm not sure \u2014 it may have always been this way",
    ],
  },
  {
    q: "How do you currently handle the challenging terrain?",
    o: [
      "\uD83D\uDEAB I avoid it when I can",
      "\uD83D\uDD90\uFE0F I use a handrail or support when available",
      "\uD83D\uDC22 I slow way down and take my time",
      "\uD83D\uDCAA I push through it \u2014 I don't want to give in to it",
      "\uD83C\uDF31 I'm actively working on building strength and stability for it",
    ],
  },
];

// Branch 4 — option 4 ("I've become deliberate") AND option 5 users who continue
const branch4 = [
  {
    q: "When did you first notice you needed to move more deliberately?",
    o: [
      "\uD83C\uDFAF After a specific fall, injury, or health event",
      "\uD83D\uDCC5 Gradually over the past few years \u2014 no single moment",
      "\uD83D\uDC8A After a medication or medical change",
      "\uD83C\uDF21\uFE0F During or after an illness",
      "\uD83E\uDD37 I honestly can't pinpoint it \u2014 it just became my normal",
    ],
  },
  {
    q: "Which situations require the most care and attention for you?",
    tp: "multi3",
    o: [
      "\uD83D\uDECF\uFE0F Getting in and out of bed",
      "\uD83D\uDE97 Getting in and out of a car",
      "\uD83D\uDEC1 The bathroom \u2014 tub, shower, toilet",
      "\uD83E\uDE9C Stairs, curbs, and elevation changes",
      "\uD83C\uDF11 Low light situations",
      "\u26A1 Sudden movements or changes in direction",
    ],
  },
  {
    q: "Do you use any tools or supports currently?",
    o: [
      "\uD83E\uDDAF Yes \u2014 a cane, walker, or similar support",
      "\uD83D\uDD90\uFE0F I use handrails and furniture as support",
      "\uD83D\uDC5F I'm very intentional about my footwear",
      "\uD83E\uDDD8 I do specific exercises or PT to help with this",
      "\uD83D\uDE45 No supports yet \u2014 managing on my own",
    ],
  },
];

export const mobilityBranches = [branch1, branch2, branch3, branch4, branch4];
