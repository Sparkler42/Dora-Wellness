import { T } from "../styles/tokens";

export const tiers = [
  {
    id: "free", nm: "Embody Free", pr: "Free", per: "", c: T.sg,
    f: ["Daily intention & body scan", "3 guided sessions/week", "Basic awareness exercises", "Community forum", "Weekly tip from David"],
  },
  {
    id: "flow", nm: "Embody Flow", pr: "$14", per: "/mo", c: T.oc, pop: true,
    f: ["Everything in Free, plus:", "Full practice library", "Active Stretching course", "Imagination & pleasure practices", "Personalized daily suggestions", "Device awareness insights", "Monthly live Q&A"],
  },
  {
    id: "deep", nm: "Embody Deep", pr: "$29", per: "/mo", c: T.ac,
    f: ["Everything in Flow, plus:", "AI Wellness Agent \u2014 24/7", "Art of Self-Practice modules", "Advanced interoceptive training", "Nutrition & lifestyle integration", "Quarterly live workshops", "Practice journal & analytics"],
  },
  {
    id: "private", nm: "Embody Private", pr: "$150", per: "/session", c: T.pl,
    f: ["Everything in Deep, plus:", "1-on-1 with David", "Movement assessment", "Custom bodywork guidance", "In-person sessions (Ukiah)", "Direct messaging", "Custom programming"],
  },
];
