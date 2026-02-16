import { useState } from "react";
import Icon from "../ui/Icon";
import { T } from "../../styles/tokens";
import { intakeQuestions } from "../../data/intake-questions";
import { notifCategories } from "../../data/notifications";
import { useApp } from "../../context/AppContext";
import WelcomeScreen from "./WelcomeScreen";

export default function IntakeFlow({ skipWelcome = false }) {
  const { setProfile, setScreen, setNotifs } = useApp();
  const [showWelcome, setShowWelcome] = useState(!skipWelcome);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  const q = intakeQuestions[step];
  const ans = answers[q.id];

  const setA = (v) => setAnswers((p) => ({ ...p, [q.id]: v }));
  const toggleMulti = (o) => {
    const c = ans || [];
    setA(c.includes(o) ? c.filter((x) => x !== o) : [...c, o]);
  };

  const ok =
    q.tp === "text"
      ? (ans || "").trim().length > 0
      : q.tp === "multi"
        ? (ans || []).length > 0
        : !!ans;

  const next = () => {
    if (step < intakeQuestions.length - 1) {
      setStep((s) => s + 1);
    } else {
      const p = { ...answers };
      const nl = ["Very gently \u2014 minimal", "Balanced \u2014 a few daily", "Actively \u2014 keep me on track", "I'll come on my own"].indexOf(p.notifications);
      setNotifs(
        Object.fromEntries(
          notifCategories.map((n) => [
            n.id,
            n.id === "insight" ? (p.deviceWellness?.startsWith("Yes") ? 2 : 0) : Math.max(0, nl),
          ])
        )
      );
      setProfile(p);
      setScreen("main");
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 22px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 20px" }}>
          <span style={{ color: T.ac }}>spark</span>
        </h1>
        <div style={{ height: 4, background: T.bgW, borderRadius: 2, marginBottom: 32 }}>
          <div style={{ height: 4, background: T.ac, borderRadius: 2, width: `${((step + 1) / intakeQuestions.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column" }}>
        <p style={{ color: T.txL, fontSize: 13, letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 8px" }}>
          {step + 1} of {intakeQuestions.length}
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 28px", lineHeight: 1.3 }}>
          {q.q}
        </h2>

        {q.tp === "text" && (
          <input
            value={ans || ""}
            onChange={(e) => setA(e.target.value)}
            placeholder={q.ph}
            onKeyDown={(e) => e.key === "Enter" && ok && next()}
            autoFocus
            style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, fontSize: 18, fontFamily: "'DM Sans'", color: T.tx, outline: "none", boxSizing: "border-box" }}
          />
        )}

        {q.tp === "choice" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.o.map((o) => (
              <button
                key={o}
                onClick={() => setA(o)}
                style={{
                  padding: "16px 18px", borderRadius: 14,
                  border: ans === o ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                  background: ans === o ? T.acG : T.bgC,
                  textAlign: "left", fontSize: 15, color: T.tx, cursor: "pointer",
                  fontFamily: "'DM Sans'", fontWeight: ans === o ? 600 : 400, transition: "all 0.2s",
                }}
              >
                {o}
              </button>
            ))}
          </div>
        )}

        {q.tp === "multi" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {q.o.map((o) => {
              const sel = (ans || []).includes(o);
              return (
                <button
                  key={o}
                  onClick={() => toggleMulti(o)}
                  style={{
                    padding: "11px 16px", borderRadius: 20,
                    border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                    background: sel ? T.acG : T.bgC,
                    fontSize: 14, color: sel ? T.ac : T.txM, cursor: "pointer",
                    fontFamily: "'DM Sans'", fontWeight: sel ? 600 : 400, transition: "all 0.2s",
                  }}
                >
                  {o}
                </button>
              );
            })}
          </div>
        )}

        <div style={{ flex: 1 }} />

        <div style={{ padding: "20px 0 40px", display: "flex", gap: 12 }}>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ width: 50, height: 50, borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon n="back" s={18} c={T.txM} />
            </button>
          )}
          <button
            onClick={ok ? next : undefined}
            disabled={!ok}
            style={{
              flex: 1, padding: "15px", border: "none", borderRadius: 14,
              background: ok ? `linear-gradient(135deg,${T.ac},${T.acS})` : T.bgW,
              color: ok ? "#fff" : T.txL, fontSize: 16, fontWeight: 600,
              cursor: ok ? "pointer" : "not-allowed", fontFamily: "'DM Sans'",
            }}
          >
            {step === intakeQuestions.length - 1 ? "Begin Your Practice" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
