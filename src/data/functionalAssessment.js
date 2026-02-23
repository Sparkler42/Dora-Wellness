// src/data/functionalAssessment.js
// Functional fitness assessment — Branches 1 & 2 only
// Each question has options with score values (1–4)
// Composite 4–16 → profile label

export const functionalQuestions = {
  q4: {
    id: "squatDepth",
    phase: "functional_q4",
    q: "How far can you comfortably sit into a squat, or pick something up from the floor?",
    sub: "Think about the last time you went for it — no holding back, just moving.",
    counter: "Question 1 of 4",
    options: [
      { emoji: "🔽", label: "Straight down, rear near the ground — no problem", detail: "Heels on the floor, relaxed at the bottom. Could hang out there.", score: 4 },
      { emoji: "🎯", label: "All the way down, but I'm paying attention", detail: "I get there with intention — not mindless, but fully available.", score: 3 },
      { emoji: "🏫", label: "I get there when I'm in a class or getting instruction", detail: "Guided context makes the depth available — on my own I'm more cautious.", score: 3 },
      { emoji: "📐", label: "Most of the way — then I place a knee down", detail: "I adapt naturally; one knee becomes a tripod when depth runs out.", score: 2 },
      { emoji: "🙋", label: "About halfway — then I find someone to help me", detail: "That's my comfortable range. Hip depth just isn't in the cards alone.", score: 1 },
      { emoji: "💭", label: "Honestly haven't tried in a while", detail: "Curiosity is a good sign. Scores conservatively.", score: 2 },
    ],
  },
  q5a: {
    id: "balance",
    phase: "functional_q5a",
    q: "How's your balance when you're thinking about it — or not thinking about it?",
    sub: "Standing on one foot, dancing, pivoting, or catching yourself mid-stumble.",
    counter: "Question 2 of 4",
    options: [
      { emoji: "💃", label: "Dancing, one-legged — honestly kind of effortless", detail: "Eyes closed if needed. Balance is an asset, not a question.", score: 4 },
      { emoji: "🧘", label: "Solid on one foot, steady under pressure", detail: "I don't think about it much — it just works when I need it.", score: 3 },
      { emoji: "📦", label: "Good until something unexpected happens", detail: "A sudden pivot or stumble-catch still takes me by surprise occasionally.", score: 2 },
      { emoji: "🌬️", label: "Wind, a slight slope, or a distraction tips the scale", detail: "I recover, but it takes a moment — balance is reliable-ish.", score: 1 },
      { emoji: "🤷", label: "Haven't really tested it lately", detail: "Awareness is the first step. Scores conservatively.", score: 2 },
    ],
  },
  q5b: {
    id: "stamina",
    phase: "functional_q5b",
    q: "How's your stamina when you heat up and get your heart rate up?",
    sub: "Think about a brisk walk uphill, a long hike, a dance floor, a bike ride — sustained effort.",
    counter: "Question 3 of 4",
    options: [
      { emoji: "🔥", label: "I can go hard for a long time — and I love it", detail: "Long hikes, bike rides, runs, dance sessions. Sustained effort is my home base.", score: 4 },
      { emoji: "🏃", label: "Strong for moderate durations — I pace myself well", detail: "30–60 minutes at a solid clip before I notice fatigue setting in.", score: 3 },
      { emoji: "⚡", label: "Short bursts are ideal — not every day", detail: "I can push, but I need more recovery time. Duration wears me down faster than intensity.", score: 3 },
      { emoji: "🚶", label: "I do fine at my own pace — intensity drains me fast", detail: "A brisk walk is fine; steep inclines or fast pace has me winded quickly.", score: 2 },
      { emoji: "🪑", label: "I get tired faster than I'd like — it catches me off guard", detail: "Even moderate sustained effort takes more out of me than expected.", score: 1 },
      { emoji: "🔍", label: "Hard to say — my activity level varies a lot", detail: "Scores conservatively. Better data collected over time.", score: 2 },
    ],
  },
  q5c: {
    id: "strength",
    phase: "functional_q5c",
    q: "How's your strength for the things you actually do?",
    sub: "Lifting, carrying, pushing, holding yourself up — functional strength in real contexts.",
    counter: "Question 4 of 4",
    options: [
      { emoji: "💪", label: "Strong and I know it — I train it deliberately", detail: "I carry heavy things, support my own bodyweight easily, and actively build more.", score: 4 },
      { emoji: "🤝", label: "Solid for daily life with some real capacity to spare", detail: "Moving furniture, long hikes with a pack, supporting others — I manage without drama.", score: 3 },
      { emoji: "📦", label: "Enough for most things — edges show up under real load", detail: "I hold my own day-to-day, but heavy or sustained effort reveals limits.", score: 2 },
      { emoji: "🪶", label: "I get by but feel the gap — strength is something I want more of", detail: "Daily tasks are fine; anything demanding makes me aware of what I'm missing.", score: 1 },
      { emoji: "🔄", label: "It's inconsistent — good days and not-so-good days", detail: "Activity history affects this significantly. Scores in the middle.", score: 2 },
    ],
  },
};

// Composite score → profile label
export function getFitnessLabel(composite) {
  if (composite >= 15) return { label: "Elite Functional", sub: "Practices start at high challenge. We'll work on your edges.", emoji: "🏆" };
  if (composite >= 12) return { label: "Strong", sub: "Broad access across the practice library. We'll find your growing edge.", emoji: "💪" };
  if (composite >= 8)  return { label: "Capable", sub: "Solid foundation. We'll build from what's working and open up from there.", emoji: "🌿" };
  return                      { label: "Emerging", sub: "Great place to start. We'll move at your pace and let the body lead.", emoji: "🌱" };
}

// Snapshot screens content
export const snapshotScreens = {
  invitation: {
    heading: "Before we show you where you're starting —",
    body: "Do you want to try something together? It'll take about a minute.",
    note: "If you're somewhere that standing isn't possible, just follow along in your mind — that counts too.",
    cta: "I'm ready →",
    skip: "Remind me later →",
  },
  breathReset: {
    heading: "First — one breath.",
    body: [
      "OK, great! Go ahead and stand up.",
      "Inhale slowly through your nose. Feel your entire ribcage expand in all directions — top, bottom, sides. Now slowly exhale fully. Take 3–5 seconds to let it all go.",
    ],
    note: "Animated breath guide: 4-count in, 6-count out",
  },
  movement: {
    high: { // composite 10+
      heading: "Now — a squat. Your squat.",
      body: [
        "Start by softening your knees and firmly planting your feet on the ground.",
        "Imagine you're about to carry someone on your shoulders — and now you're gently lowering that person down until their feet touch the floor. Go as far as feels good while knowing you can come back up the same way.",
        "Notice where your attention goes — your knees? Your breath? Your heels? Don't fix anything. Back off from any discomfort, and hold it.",
        "Hold the bottom for one breath if you can. Then come up slowly.",
      ],
    },
    mid: { // composite 6–9
      heading: "Now — a slow sit-to-stand.",
      body: [
        "Find a firm chair — a kitchen chair is ideal.",
        "Sit near the front edge. Feel your feet planted. Push through your feet and feel your chest begin to lead upward — your body wants to lean back as it rises; meet that with a slight forward lean and more foot pressure. Feel your head move toward the ceiling.",
        "Lower slowly: 4 counts down. Pause at the bottom. 4 counts up. That's it.",
        "Notice: where does the effort live? Quads? Hips? Your breath?",
      ],
    },
    low: { // composite 4–5
      heading: "Now — just stand tall for a moment.",
      body: [
        "Feet hip-width apart. Knees slightly soft.",
        "Push your feet into the floor — really press. You'll feel the muscles in your legs engage and wake up. Imagine a lightweight person resting on your shoulders. Let that image help you feel your feet anchor down and your spine lengthen up.",
        "Notice: does one side feel more solid than the other? That's data. That's where we'll start.",
      ],
    },
  },
  balanceMoment: {
    heading: "Let's do one more together — a balance play.",
    body: [
      "Stand with one foot naturally in front of the other, like you're about to step up one stair.",
      "You still have that person on your shoulders. In a slow and deliberate motion, lift your back foot just one inch off the floor. Hold it. Count 5 slow breaths.",
      "Notice: do you wobble and sway, or feel solid? Something else? Let it be whatever it is.",
    ],
    note: "This is a snapshot, not a test. Whatever happens is exactly the right data.",
  },
  reflection: {
    heading: "That's your snapshot.",
    prompt: "Quick — how would you describe what you just felt?",
    options: [
      { emoji: "💪", label: "Strong & steady", value: "strong" },
      { emoji: "🌿", label: "Pretty good", value: "pretty_good" },
      { emoji: "🔍", label: "Interesting — more to learn", value: "curious" },
      { emoji: "🌊", label: "Wobbly but here", value: "wobbly" },
    ],
  },
};
