import { EX } from "../data/exercises";

function scoreExercise(ex, profile, state) {
  let score = 0;

  // GOALS (weight: 3)
  const goalMap = {
    "Reduce pain or tension": ["somatic", "yoga", "stretch", "barefoot"],
    "Build strength": ["strength", "stretch", "barefoot"],
    "Improve flexibility": ["stretch", "yoga", "somatic"],
    "Mental clarity & focus": ["attention", "meditation", "sensory"],
    "Stress relief": ["yoga", "somatic", "meditation", "pleasure"],
    "Better sleep": ["yoga", "somatic", "meditation"],
    "Self-discovery": ["selfaware", "imagine", "sensual"],
    "Fun & play": ["playful", "creative", "sensory"],
    "Connection to my body": ["somatic", "attention", "sensual", "barefoot"],
  };
  profile.goals?.forEach((goal) => {
    if (goalMap[goal]?.includes(ex.id)) score += 3;
  });

  // BODY AREAS (weight: 4 — most specific signal)
  const areaMap = {
    "Feet & ankles": ["barefoot", "somatic"],
    "Hips & pelvis": ["yoga", "stretch", "somatic"],
    "Lower back": ["somatic", "yoga", "strength", "stretch"],
    "Core": ["strength", "somatic", "yoga"],
    "Shoulders": ["stretch", "yoga", "somatic"],
    "Neck & jaw": ["somatic", "yoga", "meditation"],
    "Whole body": ["yoga", "stretch", "playful", "strength"],
    "Nothing specific": [],
  };
  profile.bodyAreas?.forEach((area) => {
    if (areaMap[area]?.includes(ex.id)) score += 4;
  });

  // MIND INTERESTS (weight: 3)
  const mindMap = {
    "Meditation": ["meditation", "yoga", "somatic"],
    "Attention training": ["attention", "sensory", "somatic"],
    "Sensory awareness": ["sensory", "attention", "somatic", "barefoot"],
    "Memory & cognition": ["memory", "attention"],
    "Self-reflection": ["selfaware", "imagine", "pleasure"],
    "Imagination work": ["imagine", "creative", "playful"],
  };
  profile.mindInterest?.forEach((interest) => {
    if (mindMap[interest]?.includes(ex.id)) score += 3;
  });

  // TIME AVAILABLE (weight: 2 — penalize exercises that are too long)
  const maxMinutes = {
    "5–10 minutes": 10,
    "15–20 minutes": 20,
    "30–45 minutes": 45,
    "60+ minutes": 999,
  }[profile.timeAvail] || 999;
  const exMinutes = ex.dur / 60;
  if (exMinutes <= maxMinutes) score += 2;
  else score -= 3;

  // TIME OF DAY (weight: 1)
  const timeMap = {
    "Early morning": ["yoga", "meditation", "attention"],
    "Mid-morning": ["strength", "stretch", "playful"],
    "Afternoon": ["playful", "creative", "sensory"],
    "Evening": ["yoga", "somatic", "meditation", "nutrition"],
  };
  if (timeMap[profile.timeOfDay]?.includes(ex.id)) score += 1;

  // ALREADY DONE TODAY (weight: -5)
  if (state.doneToday?.includes(ex.id)) score -= 5;

  return score;
}

export function getRecommendations(profile, state = {}) {
  const all = Object.values(EX);
  if (!profile) return all.slice(0, 5);

  // Score every exercise
  const scored = all.map((ex) => ({ ex, score: scoreExercise(ex, profile, state) }));
  scored.sort((a, b) => b.score - a.score);

  // Pick top results with category diversity
  const result = [];
  const catCount = { body: 0, mind: 0, play: 0 };
  const maxPerCat = 3;

  for (const { ex } of scored) {
    if (result.length >= 6) break;
    if (catCount[ex.cat] >= maxPerCat) continue;
    result.push(ex);
    catCount[ex.cat]++;
  }

  return result;
}

export function isLocked(ex, tier) {
  if (tier !== "free") return false;
  return !["yoga", "stretch", "strength", "barefoot", "somatic", "nutrition", "meditation", "attention", "selfaware", "imagine"].includes(ex.id);
}
