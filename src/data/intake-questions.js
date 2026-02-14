export const intakeQuestions = [
  { id: "name", q: "What should we call you?", tp: "text", ph: "Your first name" },
  { id: "age", q: "What's your age range?", tp: "choice", o: ["18\u201329", "30\u201339", "40\u201349", "50\u201359", "60+"] },
  { id: "experience", q: "How would you describe your movement experience?", tp: "choice", o: ["Brand new \u2014 I'm curious", "Some yoga or stretching", "Regular mover", "Advanced \u2014 years of practice"] },
  { id: "goals", q: "What draws you to Dora Wellness?", tp: "multi", o: ["Reduce pain or tension", "Build strength", "Improve flexibility", "Mental clarity", "Stress relief", "Better sleep", "Self-discovery", "Fun & play", "Body connection"] },
  { id: "bodyAreas", q: "Areas of your body to focus on?", tp: "multi", o: ["Feet & ankles", "Hips & pelvis", "Lower back", "Core", "Shoulders", "Neck & jaw", "Whole body", "Nothing specific"] },
  { id: "mindInterest", q: "Which mind practices interest you?", tp: "multi", o: ["Meditation", "Attention training", "Sensory awareness", "Memory & cognition", "Self-reflection", "Imagination"] },
  { id: "timeAvail", q: "How much daily practice time?", tp: "choice", o: ["5\u201310 minutes", "15\u201320 minutes", "30\u201345 minutes", "60+ minutes"] },
  { id: "timeOfDay", q: "When do you prefer to practice?", tp: "choice", o: ["Early morning", "Mid-morning", "Afternoon", "Evening", "Varies"] },
  { id: "notifications", q: "How should we nudge you?", tp: "choice", o: ["Very gently \u2014 minimal", "Balanced \u2014 a few daily", "Actively \u2014 keep me on track", "I'll come on my own"] },
  { id: "deviceWellness", q: "Want the app to observe device patterns and suggest wellness alternatives?", tp: "choice", o: ["Yes, I'd love that", "Maybe later", "No thanks"] },
];
