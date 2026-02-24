// src/data/extended-intake.js
// Extended intake flow — Body, Mind, Play sections with High Touch scoring

export const EXTENDED_INTAKE_SECTIONS = [
  {
    id: "body",
    label: "Body 🌿",
    emoji: "🌿",
    header: "Let's talk about your body",
    subtext: "Not to fix it — to understand it.",
    intro: {
      heading: "Let's talk about your body",
      body: "Not to analyze it or fix it — just to understand it a little better. These questions are about your lived experience: where you feel at home, where you feel tension, and how movement fits into your life right now. There are no wrong answers. Your body's story is exactly right.",
      audioSrc: null,
    },
    questions: [
      {
        id: "B1",
        text: "Where do you live in your body?",
        type: "single",
        options: [
          { label: "Mostly in my head — I forget I have a body", value: "head", htScore: 1, fork: "B1a" },
          { label: "I push through — body is a tool for getting things done", value: "push_through", htScore: 1, fork: "B1b" },
          { label: "I have a pretty good relationship with mine", value: "good_relationship", htScore: 0, fork: null },
          { label: "I'm learning to listen to it — we're in the early stages", value: "learning", htScore: 0, fork: "B1c" },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "B1a",
        text: "When does your body get your attention?",
        type: "multi",
        options: [
          { label: "When something hurts", value: "when_hurts", htScore: 0, fork: null },
          { label: "During exercise or movement", value: "during_movement", htScore: 0, fork: null },
          { label: "When I'm sick or exhausted", value: "when_sick", htScore: 0, fork: null },
          { label: "Rarely — I'm usually distracted", value: "rarely", htScore: 0, fork: null },
          { label: "In moments of pleasure or relaxation", value: "pleasure", htScore: 0, fork: null },
        ],
        parentQuestion: "B1",
        parentValues: ["head"],
        acknowledgment: null,
      },
      {
        id: "B1b",
        text: "What does your body do to get your attention?",
        type: "multi",
        options: [
          { label: "Pain or tension", value: "pain", htScore: 0, fork: null },
          { label: "Fatigue", value: "fatigue", htScore: 0, fork: null },
          { label: "Injury", value: "injury", htScore: 0, fork: null },
          { label: "Illness", value: "illness", htScore: 0, fork: null },
          { label: "Emotional overwhelm", value: "emotional", htScore: 0, fork: null },
          { label: "It doesn't — I override it", value: "override", htScore: 2, fork: null },
        ],
        parentQuestion: "B1",
        parentValues: ["push_through"],
        acknowledgment: null,
      },
      {
        id: "B1c",
        text: "What's making you want to tune in now?",
        type: "multi",
        options: [
          { label: "Something hurts or has been hurting", value: "hurting", htScore: 0, fork: null },
          { label: "I want to feel better in general", value: "feel_better", htScore: 0, fork: null },
          { label: "A health scare or diagnosis", value: "health_scare", htScore: 0, fork: null },
          { label: "Stress is catching up with me", value: "stress", htScore: 0, fork: null },
          { label: "I'm just curious", value: "curious", htScore: 0, fork: null },
        ],
        parentQuestion: "B1",
        parentValues: ["learning"],
        acknowledgment: null,
      },
      {
        id: "B2",
        text: "What's your body's current chapter?",
        type: "single",
        options: [
          { label: "I'm new to intentional movement", value: "new", htScore: 0, fork: null },
          { label: "I'm returning after a break", value: "returning", htScore: 0, fork: null },
          { label: "I'm active and want to go deeper", value: "active", htScore: 0, fork: null },
          { label: "I'm recovering from injury, illness, or burnout", value: "recovering", htScore: 0, fork: "B2a" },
          { label: "It's complicated — my body surprises me", value: "complicated", htScore: 2, fork: "B2b" },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "B2a",
        text: "What kind of recovery are you in?",
        type: "multi",
        options: [
          { label: "Physical injury", value: "physical_injury", htScore: 0, fork: null },
          { label: "Surgery", value: "surgery", htScore: 0, fork: null },
          { label: "Chronic pain or illness", value: "chronic", htScore: 0, fork: null },
          { label: "Burnout or exhaustion", value: "burnout", htScore: 0, fork: null },
          { label: "Emotional or trauma-related", value: "trauma", htScore: 2, fork: null },
          { label: "I'd rather not say", value: "prefer_not", htScore: 0, fork: null },
        ],
        parentQuestion: "B2",
        parentValues: ["recovering"],
        acknowledgment: null,
      },
      {
        id: "B2b",
        text: "How does your body tend to surprise you?",
        type: "multi",
        options: [
          { label: "Pain that comes and goes without clear cause", value: "unpredictable_pain", htScore: 0, fork: null },
          { label: "Fatigue that doesn't match my activity level", value: "unpredictable_fatigue", htScore: 0, fork: null },
          { label: "Sensitivity or numbness in different areas", value: "sensitivity", htScore: 1, fork: null },
          { label: "Reactions to stress that show up physically", value: "stress_physical", htScore: 0, fork: null },
          { label: "Other", value: "other", htScore: 0, fork: null },
        ],
        parentQuestion: "B2",
        parentValues: ["complicated"],
        acknowledgment: null,
      },
      {
        id: "B3",
        text: "Where do you feel it most? (pick up to 3)",
        type: "multi",
        maxSelect: 3,
        options: [
          { label: "Neck & shoulders", value: "neck_shoulders", htScore: 0, fork: null },
          { label: "Upper back", value: "upper_back", htScore: 0, fork: null },
          { label: "Lower back", value: "lower_back", htScore: 0, fork: null },
          { label: "Hips & pelvis", value: "hips", htScore: 0, fork: null },
          { label: "Knees", value: "knees", htScore: 0, fork: null },
          { label: "Feet & ankles", value: "feet", htScore: 0, fork: null },
          { label: "Core / belly", value: "core", htScore: 0, fork: null },
          { label: "Chest / breath", value: "chest", htScore: 0, fork: null },
          { label: "Jaw & face", value: "jaw", htScore: 0, fork: null },
          { label: "Hands & wrists", value: "hands", htScore: 0, fork: null },
          { label: "Everywhere", value: "everywhere", htScore: 0, fork: null },
          { label: "I feel pretty balanced", value: "balanced", htScore: 0, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "B3a",
        text: "In the areas you mentioned, what does it feel like most often?",
        type: "single",
        options: [
          { label: "Tension or tightness", value: "tension", htScore: 0, fork: null },
          { label: "Achiness or dull pain", value: "aching", htScore: 0, fork: null },
          { label: "Stiffness — especially in the morning", value: "stiffness", htScore: 0, fork: null },
          { label: "Sharp or acute pain", value: "sharp", htScore: 1, fork: null },
          { label: "Weakness", value: "weakness", htScore: 0, fork: null },
          { label: "Numbness or tingling", value: "numbness", htScore: 1, fork: null },
          { label: "It's more emotional than physical", value: "emotional", htScore: 2, fork: null },
        ],
        parentQuestion: "B3",
        parentValues: ["neck_shoulders", "upper_back", "lower_back", "hips", "knees", "feet", "core", "chest", "jaw", "hands", "everywhere"],
        acknowledgment: null,
      },
      {
        id: "B4",
        text: "How does your body like to move?",
        type: "multi",
        options: [
          { label: "Slow and deliberate", value: "slow", htScore: 0, fork: null },
          { label: "Flowing and rhythmic", value: "flowing", htScore: 0, fork: null },
          { label: "Strong and effortful", value: "strong", htScore: 0, fork: null },
          { label: "Stretchy and spacious", value: "stretchy", htScore: 0, fork: null },
          { label: "Playful and unpredictable", value: "playful", htScore: 0, fork: null },
          { label: "I don't have a preference yet", value: "no_preference", htScore: 0, fork: null },
          { label: "Moving feels hard right now", value: "hard", htScore: 2, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
    ],
  },
  {
    id: "mind",
    label: "Mind 🌀",
    emoji: "🌀",
    header: "Now let's visit your mind",
    subtext: "Where does your attention tend to go?",
    intro: {
      heading: "Now let's visit your mind",
      body: "The mind is where attention lives — and attention is at the heart of everything we do in Spark. These questions explore your inner landscape: your thought patterns, your emotional weather, and what you're genuinely curious about. Honesty here shapes everything that follows.",
      audioSrc: null,
    },
    questions: [
      {
        id: "M1",
        text: "Which best describes your inner weather lately?",
        type: "single",
        options: [
          { label: "Stormy — lots of stress, anxiety, or overwhelm", value: "stormy", htScore: 1, fork: "M1a" },
          { label: "Foggy — low motivation, hard to focus", value: "foggy", htScore: 0, fork: "M1b" },
          { label: "Variable — good days and hard days", value: "variable", htScore: 0, fork: null },
          { label: "Pretty clear — I just want to go deeper", value: "clear", htScore: 0, fork: null },
          { label: "Quiet in a way that worries me a little", value: "worried_quiet", htScore: 3, fork: "M1c" },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "M1a",
        text: "What's the main source of the storm?",
        type: "multi",
        options: [
          { label: "Work or career pressure", value: "work", htScore: 0, fork: null },
          { label: "Relationships", value: "relationships", htScore: 0, fork: null },
          { label: "Health concerns (mine or someone else's)", value: "health", htScore: 0, fork: null },
          { label: "Financial stress", value: "financial", htScore: 0, fork: null },
          { label: "Feeling scattered or unfocused", value: "scattered", htScore: 0, fork: null },
          { label: "I can't quite name it", value: "unnamed", htScore: 0, fork: null },
        ],
        parentQuestion: "M1",
        parentValues: ["stormy"],
        acknowledgment: null,
      },
      {
        id: "M1b",
        text: "When did the fog set in?",
        type: "single",
        options: [
          { label: "Recently — it's new", value: "recent", htScore: 0, fork: null },
          { label: "It's been a few months", value: "months", htScore: 0, fork: null },
          { label: "It comes and goes", value: "comes_goes", htScore: 0, fork: null },
          { label: "It's been a long time — feels like baseline", value: "baseline", htScore: 2, fork: null },
        ],
        parentQuestion: "M1",
        parentValues: ["foggy"],
        acknowledgment: null,
      },
      {
        id: "M1c",
        text: null,
        type: null,
        options: [],
        parentQuestion: "M1",
        parentValues: ["worried_quiet"],
        acknowledgment: "We hear you. Spark is a gentle place — no pressure to push. We'll offer practices that meet you quietly.",
      },
      {
        id: "M2",
        text: "What does your mind do when it's left alone?",
        type: "single",
        options: [
          { label: "Makes lists and plans", value: "lists", htScore: 0, fork: null },
          { label: "Replays conversations or worries", value: "replays", htScore: 0, fork: "M2a" },
          { label: "Wanders to random, creative places", value: "wanders", htScore: 0, fork: null },
          { label: "Goes mostly quiet", value: "quiet", htScore: 0, fork: null },
          { label: "Reaches for distraction (phone, TV, food)", value: "distraction", htScore: 0, fork: null },
          { label: "Tends toward self-criticism", value: "self_criticism", htScore: 2, fork: "M2b" },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "M2a",
        text: "What helps most when your mind gets stuck?",
        type: "multi",
        options: [
          { label: "Movement or exercise", value: "movement", htScore: 0, fork: null },
          { label: "Talking it out", value: "talking", htScore: 0, fork: null },
          { label: "Distraction", value: "distraction", htScore: 0, fork: null },
          { label: "Sleep", value: "sleep", htScore: 0, fork: null },
          { label: "Breathing or grounding", value: "grounding", htScore: 0, fork: null },
          { label: "Nothing seems to help yet", value: "nothing", htScore: 3, fork: null },
        ],
        parentQuestion: "M2",
        parentValues: ["replays"],
        acknowledgment: null,
      },
      {
        id: "M2b",
        text: null,
        type: null,
        options: [],
        parentQuestion: "M2",
        parentValues: ["self_criticism"],
        acknowledgment: "A lot of us are working with that voice. Spark offers practices that gently redirect attention — not to silence it, but to expand what else is there.",
      },
      {
        id: "M3",
        text: "What are you curious about in your mind?",
        type: "multi",
        options: [
          { label: "How attention works — and how to direct it", value: "attention", htScore: 0, fork: null },
          { label: "Patterns in my thinking and behavior", value: "patterns", htScore: 0, fork: null },
          { label: "The mind-body connection", value: "mind_body", htScore: 0, fork: null },
          { label: "Imagination and creativity", value: "imagination", htScore: 0, fork: null },
          { label: "Memory and presence", value: "memory", htScore: 0, fork: null },
          { label: "Emotional intelligence", value: "emotional", htScore: 0, fork: null },
          { label: "Stillness and meditation", value: "meditation", htScore: 0, fork: null },
          { label: "I don't know yet — I'm open", value: "open", htScore: 0, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "M4",
        text: "How do you learn best?",
        type: "single",
        options: [
          { label: "Through direct experience and sensation", value: "sensation", htScore: 0, fork: null },
          { label: "Through ideas and concepts", value: "concepts", htScore: 0, fork: null },
          { label: "Through stories and metaphor", value: "stories", htScore: 0, fork: null },
          { label: "Through challenge and exploration", value: "challenge", htScore: 0, fork: null },
          { label: "A mix — I like variety", value: "variety", htScore: 0, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
    ],
  },
  {
    id: "play",
    label: "Play 🎪",
    emoji: "🎪",
    header: "One more — let's talk about play",
    subtext: "This one surprises people. Stay curious.",
    intro: {
      heading: "One more — let's talk about play",
      body: "This section surprises people. Play isn't frivolous — it's how the nervous system resets, how creativity opens, and how we remember what it feels like to be alive without an agenda. Stay curious. There's no wrong relationship with play — only your honest one.",
      audioSrc: null,
    },
    questions: [
      {
        id: "P1",
        text: "When did you last do something just for the fun of it?",
        type: "single",
        options: [
          { label: "Recently — play is part of my life", value: "recent", htScore: 0, fork: "P1a" },
          { label: "A while ago — I can't quite remember", value: "while_ago", htScore: 0, fork: null },
          { label: "I'm not sure what that means for me anymore", value: "unsure", htScore: 2, fork: "P1b" },
          { label: "I was more playful as a kid — I want that back", value: "as_kid", htScore: 0, fork: null },
          { label: "Play feels a little uncomfortable, honestly", value: "uncomfortable", htScore: 2, fork: "P1c" },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "P1a",
        text: "What does play look like for you?",
        type: "multi",
        options: [
          { label: "Creative expression (art, music, writing)", value: "creative", htScore: 0, fork: null },
          { label: "Physical play (sports, dance, movement)", value: "physical", htScore: 0, fork: null },
          { label: "Games and puzzles", value: "games", htScore: 0, fork: null },
          { label: "Nature and exploration", value: "nature", htScore: 0, fork: null },
          { label: "Social play — laughter with others", value: "social", htScore: 0, fork: null },
          { label: "Daydreaming and imagination", value: "daydreaming", htScore: 0, fork: null },
          { label: "Sensory pleasure", value: "sensory", htScore: 0, fork: null },
        ],
        parentQuestion: "P1",
        parentValues: ["recent"],
        acknowledgment: null,
      },
      {
        id: "P1b",
        text: null,
        type: null,
        options: [],
        parentQuestion: "P1",
        parentValues: ["unsure"],
        acknowledgment: "Play is anything that absorbs your attention without needing a reason. Spark will help you rediscover it.",
      },
      {
        id: "P1c",
        text: "What makes play feel hard?",
        type: "multi",
        options: [
          { label: "I feel guilty if I'm not being productive", value: "guilt", htScore: 0, fork: null },
          { label: "I'm not sure how to 'let go'", value: "letting_go", htScore: 0, fork: null },
          { label: "I worry about looking silly", value: "silly", htScore: 0, fork: null },
          { label: "I've been burned out for a long time", value: "burnout", htScore: 2, fork: null },
          { label: "I'm not sure", value: "unsure", htScore: 0, fork: null },
        ],
        parentQuestion: "P1",
        parentValues: ["uncomfortable"],
        acknowledgment: null,
      },
      {
        id: "P2",
        text: "What kinds of experiences light you up?",
        type: "multi",
        options: [
          { label: "Moving my body in unexpected ways", value: "unexpected_movement", htScore: 0, fork: null },
          { label: "Creating something with my hands", value: "creating", htScore: 0, fork: null },
          { label: "Being in nature", value: "nature", htScore: 0, fork: null },
          { label: "Music — listening or making it", value: "music", htScore: 0, fork: null },
          { label: "Laughter and silliness", value: "laughter", htScore: 0, fork: null },
          { label: "Imagining, daydreaming, storytelling", value: "imagining", htScore: 0, fork: null },
          { label: "Sensory pleasure — textures, tastes, beauty", value: "sensory", htScore: 0, fork: null },
          { label: "Problem-solving or strategy", value: "problem_solving", htScore: 0, fork: null },
          { label: "Connection with others", value: "connection", htScore: 0, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "P3",
        text: "What gets in the way of enjoying your life?",
        type: "multi",
        options: [
          { label: "Time — I'm too busy", value: "time", htScore: 0, fork: null },
          { label: "Energy — I'm too tired", value: "energy", htScore: 0, fork: null },
          { label: "Stress and worry", value: "stress", htScore: 0, fork: null },
          { label: "Feeling disconnected from my body", value: "disconnected", htScore: 0, fork: null },
          { label: "A critical inner voice", value: "inner_critic", htScore: 0, fork: null },
          { label: "Comparison to others", value: "comparison", htScore: 0, fork: null },
          { label: "I'm not sure — something just feels blocked", value: "blocked", htScore: 2, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
      {
        id: "P4",
        text: "What would more play give you, if it could?",
        type: "multi",
        options: [
          { label: "Stress relief", value: "stress_relief", htScore: 0, fork: null },
          { label: "More creativity", value: "creativity", htScore: 0, fork: null },
          { label: "A sense of freedom", value: "freedom", htScore: 0, fork: null },
          { label: "Better connection with others", value: "connection", htScore: 0, fork: null },
          { label: "Joy — just for its own sake", value: "joy", htScore: 0, fork: null },
          { label: "I don't know yet — I'm finding out", value: "finding_out", htScore: 0, fork: null },
        ],
        parentQuestion: null,
        parentValues: null,
        acknowledgment: null,
      },
    ],
  },
];

// Build a lookup of all questions by id
const allQuestions = {};
for (const section of EXTENDED_INTAKE_SECTIONS) {
  for (const q of section.questions) {
    allQuestions[q.id] = q;
  }
}

/**
 * Calculate the High Touch score from the user's extended answers.
 * @param {Object} answers — keys are question ids, values are selected value(s)
 * @returns {number} total htScore
 */
export function calculateHighTouchScore(answers) {
  let total = 0;
  for (const [qId, answer] of Object.entries(answers)) {
    const q = allQuestions[qId];
    if (!q) continue;
    const values = Array.isArray(answer) ? answer : [answer];
    for (const val of values) {
      const opt = q.options.find((o) => o.value === val);
      if (opt) total += opt.htScore;
    }
  }
  return total;
}

/**
 * Map a High Touch score to a path label.
 * @param {number} score
 * @returns {"standard" | "soft" | "redirect"}
 */
export function getHighTouchPath(score) {
  if (score >= 8) return "redirect";
  if (score >= 5) return "soft";
  return "standard";
}

/**
 * Determine the ordered sequence of question ids the user should see,
 * resolving forks based on current answers.
 * @param {Object} answers — keys are question ids, values are selected value(s)
 * @returns {string[]} ordered array of question ids
 */
export function getExtendedSequence(answers) {
  const baseIds = ["B1", "B2", "B3", "B4", "M1", "M2", "M3", "M4", "P1", "P2", "P3", "P4"];
  const sequence = [];

  for (const id of baseIds) {
    sequence.push(id);

    const answer = answers[id];
    if (answer == null) continue;

    const q = allQuestions[id];
    if (!q) continue;

    const values = Array.isArray(answer) ? answer : [answer];

    // Check each selected option for a fork
    for (const opt of q.options) {
      if (opt.fork && values.includes(opt.value)) {
        const forkQ = allQuestions[opt.fork];
        if (forkQ) {
          // Verify parent match
          const parentMatch = !forkQ.parentValues || values.some((v) => forkQ.parentValues.includes(v));
          if (parentMatch) {
            sequence.push(opt.fork);
          }
        }
      }
    }

    // Special case: B3 → B3a if any area other than "balanced" is selected
    if (id === "B3" && Array.isArray(answer) && answer.length > 0 && !answer.every((v) => v === "balanced")) {
      if (!sequence.includes("B3a")) {
        sequence.push("B3a");
      }
    }
  }

  return sequence;
}
