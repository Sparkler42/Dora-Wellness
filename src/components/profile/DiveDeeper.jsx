import { useState } from "react";
import Icon from "../ui/Icon";
import SectionHeader from "../ui/SectionHeader";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";

const cardDefs = [
  {
    id: "lowerBack",
    title: "Lower Back",
    match: (p) => p.bodyAreas?.includes("Lower back"),
    questions: [
      "How long have you had lower back tension?",
      "What tends to aggravate it?",
      "What brings relief?",
      "Is it more muscular, nerve-related, or you're not sure?",
    ],
  },
  {
    id: "core",
    title: "Core",
    match: (p) => p.bodyAreas?.includes("Core"),
    questions: [
      "Do you have any history of abdominal injury or surgery?",
      "How would you describe your current core strength?",
      "Any diastasis recti or pelvic floor concerns?",
    ],
  },
  {
    id: "hips",
    title: "Hips & Pelvis",
    match: (p) => p.bodyAreas?.includes("Hips & pelvis"),
    questions: [
      "Is the sensation more in the joint, the surrounding muscles, or both?",
      "Any history of hip injury or surgery?",
      "Does sitting or standing for long periods affect it?",
    ],
  },
  {
    id: "shoulders",
    title: "Shoulders",
    match: (p) => p.bodyAreas?.includes("Shoulders"),
    questions: [
      "Which shoulder(s)?",
      "Is it related to posture, injury, or stress holding?",
      "Any impingement or rotator cuff history?",
    ],
  },
  {
    id: "neckJaw",
    title: "Neck & Jaw",
    match: (p) => p.bodyAreas?.includes("Neck & jaw"),
    questions: [
      "Do you grind your teeth or clench your jaw?",
      "Is neck tension related to screen time, stress, or both?",
      "Any diagnosed cervical issues?",
    ],
  },
  {
    id: "feetAnkles",
    title: "Feet & Ankles",
    match: (p) => p.bodyAreas?.includes("Feet & ankles"),
    questions: [
      "Any history of sprains or plantar fasciitis?",
      "Do you spend a lot of time barefoot or in supportive shoes?",
      "How would you describe your arch \u2014 flat, neutral, high?",
    ],
  },
  {
    id: "movementBg",
    title: "Movement Background",
    match: () => true,
    questions: (p) => {
      const exp = p.experience || "";
      if (exp.startsWith("Brand new") || exp.startsWith("Some yoga")) {
        return [
          "What kinds of movement have you tried before?",
          "What felt good?",
          "What felt challenging or uncomfortable?",
        ];
      }
      return [
        "What's your primary movement practice?",
        "How many days per week do you move intentionally?",
        "Any recurring injuries or limitations we should know about?",
      ];
    },
  },
  {
    id: "goals",
    title: "Goals & Intentions",
    match: () => true,
    questions: [
      "What does feeling well in your body mean to you?",
      "Is there a specific event, milestone, or moment you're working toward?",
      "What has gotten in the way of your wellness practice in the past?",
    ],
  },
  {
    id: "stress",
    title: "Stress & Nervous System",
    match: () => true,
    questions: [
      "How would you describe your baseline stress level?",
      "Where do you tend to hold stress in your body?",
      "What helps you return to calm?",
    ],
  },
];

function DiveDeeperCard({ def, profile, saved, onSave }) {
  const [open, setOpen] = useState(false);
  const questions = typeof def.questions === "function" ? def.questions(profile) : def.questions;
  const [answers, setAnswers] = useState(() => {
    const init = {};
    questions.forEach((q, i) => { init[i] = saved?.[i] || ""; });
    return init;
  });
  const hasSaved = saved && Object.values(saved).some((v) => v && v.trim());

  return (
    <div style={{ background: T.bgC, borderRadius: 14, boxShadow: T.sh, marginBottom: 8, overflow: "hidden" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {hasSaved && (
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.sg, flexShrink: 0 }} />
          )}
          <span style={{ fontSize: 15, fontWeight: 500, color: T.tx }}>{def.title}</span>
        </div>
        <span style={{ fontSize: 18, color: T.txL, fontWeight: 300, lineHeight: 1, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>

      {open && (
        <div style={{ padding: "0 16px 16px" }}>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, color: T.txM, marginBottom: 6, lineHeight: 1.5 }}>{q}</label>
              <textarea
                value={answers[i]}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
                rows={2}
                placeholder="Tap to write..."
                style={{
                  width: "100%", background: T.bgW, borderRadius: 10, padding: 12,
                  border: "none", color: T.tx, fontSize: 14, fontFamily: "'DM Sans'",
                  resize: "none", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { onSave(def.id, answers); setOpen(false); }}
              style={{
                flex: 1, padding: "10px 16px", border: "none", borderRadius: 12,
                background: T.ac, color: "#fff", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans'",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: "10px 16px", border: "none", borderRadius: 12,
                background: T.bgW, color: T.txM, fontSize: 14, fontWeight: 500,
                cursor: "pointer", fontFamily: "'DM Sans'",
              }}
            >
              Dive In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiveDeeper() {
  const { profile, diveDeeper, setDiveDeeper } = useApp();
  if (!profile) return null;

  const visibleCards = cardDefs.filter((d) => d.match(profile));
  const savedCount = Object.values(diveDeeper.sections || {}).filter(
    (s) => s && Object.values(s).some((v) => v && v.trim())
  ).length;
  const showNudge = diveDeeper.started && savedCount < 2;

  const handleSave = (cardId, answers) => {
    setDiveDeeper((prev) => ({
      started: true,
      sections: { ...prev.sections, [cardId]: answers },
    }));
  };

  const handleExpand = () => {
    if (!diveDeeper.started) {
      setDiveDeeper((prev) => ({ ...prev, started: true }));
    }
  };

  return (
    <div id="dive-deeper" style={{ marginTop: 24 }} onClick={handleExpand}>
      <SectionHeader icon="sparkle" ic={T.ac} title="Dive Deeper" sub="Your evolving story — return anytime to add or update." />

      {showNudge && (
        <p style={{ color: T.txL, fontSize: 13, lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic" }}>
          Your practice gets more personalized the more we know. No rush — add when it feels right.
        </p>
      )}

      {visibleCards.map((def) => (
        <DiveDeeperCard
          key={def.id}
          def={def}
          profile={profile}
          saved={diveDeeper.sections?.[def.id]}
          onSave={handleSave}
        />
      ))}
    </div>
  );
}
