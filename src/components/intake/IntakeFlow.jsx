import { useState } from "react";
import Icon from "../ui/Icon";
import { T } from "../../styles/tokens";
import { intakeQuestions } from "../../data/intake-questions";
import { intakeDescriptors } from "../../data/intakeDescriptors";
import { balanceOptions, mobilityBranches } from "../../data/mobilityAssessment";
import { notifCategories } from "../../data/notifications";
import { useApp } from "../../context/AppContext";
import WelcomeScreen from "./WelcomeScreen";
import AudioIntroScreen from "./AudioIntroScreen";

function InfoButton({ option, onOpen }) {
  if (!intakeDescriptors[option]) return null;
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onOpen({ title: option, body: intakeDescriptors[option] });
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: T.bgW,
        color: T.txL,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        flexShrink: 0,
        marginLeft: 8,
        fontFamily: "serif",
        lineHeight: 1,
      }}
    >
      i
    </span>
  );
}

function DescriptorOverlay({ descriptor, onClose }) {
  if (!descriptor) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(44,40,37,0.5)",
        backdropFilter: "blur(6px)",
        padding: 20,
        animation: "descFadeIn 0.25s ease",
      }}
    >
      <style>{`
        @keyframes descFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.bgC,
          borderRadius: 20,
          padding: "24px 22px 20px",
          maxWidth: 360,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: T.shE,
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "none",
            background: T.bgW,
            color: T.txL,
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans'",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 20,
            color: T.tx,
            margin: "0 0 14px",
            paddingRight: 32,
            lineHeight: 1.3,
          }}
        >
          {descriptor.title}
        </h3>

        {/* Body */}
        <p
          style={{
            fontSize: 14,
            color: T.txM,
            lineHeight: 1.7,
            margin: "0 0 20px",
          }}
        >
          {descriptor.body}
        </p>

        {/* Got it button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "none",
            borderRadius: 12,
            background: T.bgW,
            color: T.txM,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans'",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default function IntakeFlow({ skipWelcome = false }) {
  const { setProfile, setScreen, setNotifs, setDiveDeeper, setTab, audioIntroSeen, setAudioIntroSeen } = useApp();
  const [showWelcome, setShowWelcome] = useState(!skipWelcome);
  const [showAudioIntro, setShowAudioIntro] = useState(!skipWelcome && !audioIntroSeen);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFork, setShowFork] = useState(false);
  const [descriptor, setDescriptor] = useState(null);

  // Mobility assessment state
  // phases: null, "welcome", "balance", "redirect", "followup"
  const [mobilityPhase, setMobilityPhase] = useState(null);
  const [mobilityBalance, setMobilityBalance] = useState(null); // index 0-4
  const [mobilityFollowUp, setMobilityFollowUp] = useState([null, null, null]);
  const [mobilityFollowUpStep, setMobilityFollowUpStep] = useState(0);
  const [mobilityRedirectSeen, setMobilityRedirectSeen] = useState(false);

  const finishIntake = (goDeeper) => {
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
    if (goDeeper) {
      setDiveDeeper((prev) => ({ ...prev, started: true, scrollTo: true }));
      setTab("profile");
    }
    setScreen("app");
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (showAudioIntro) {
    return (
      <AudioIntroScreen
        onContinue={() => {
          setAudioIntroSeen(true);
          setShowAudioIntro(false);
        }}
      />
    );
  }

  const exitMobility = () => {
    // Store mobility answers and go to main app
    const p = {
      ...answers,
      mobilityBalance: mobilityBalance !== null ? balanceOptions[mobilityBalance] : null,
      mobilityFollowUp: mobilityFollowUp.filter(Boolean),
      mobilityRedirectSeen,
    };
    setProfile(p);
    setScreen("app");
  };

  // --- Mobility Assessment Screens ---
  if (mobilityPhase) {
    const shell = (children) => (
      <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 22px 0" }}>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 20px" }}>
            <span style={{ color: T.ac }}>spark</span>
          </h1>
        </div>
        {children}
      </div>
    );

    // Screen A — Warm Welcome
    if (mobilityPhase === "welcome") {
      return shell(
        <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🌿</div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "0 0 14px", lineHeight: 1.3 }}>
            Welcome, {answers.name || "friend"}
          </h2>
          <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 8px", maxWidth: 340 }}>
            Before we go further, we'd love to understand how your body moves through the world right now.
          </p>
          <p style={{ color: T.txL, fontSize: 14, lineHeight: 1.6, margin: "0 0 40px", maxWidth: 340, fontStyle: "italic" }}>
            There are no wrong answers — this helps us meet you where you are.
          </p>
          <button
            onClick={() => setMobilityPhase("balance")}
            style={{
              padding: "16px 48px", border: "none", borderRadius: 14,
              background: `linear-gradient(135deg,${T.ac},${T.acS})`,
              color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans'", boxShadow: `0 4px 16px ${T.ac}30`,
            }}
          >
            Next →
          </button>
          <div style={{ height: 60 }} />
        </div>
      );
    }

    // Screen B — Balance Question
    if (mobilityPhase === "balance") {
      return shell(
        <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 8px", lineHeight: 1.3 }}>
            How would you describe your balance and stability?
          </h2>
          <p style={{ color: T.txL, fontSize: 14, margin: "0 0 20px", lineHeight: 1.5, fontStyle: "italic" }}>
            Pick the one that feels closest to your everyday experience.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1 }}>
            {balanceOptions.map((o, i) => {
              const sel = mobilityBalance === i;
              const emoji = o.slice(0, 2);
              const text = o.slice(3);
              return (
                <button
                  key={i}
                  onClick={() => setMobilityBalance(i)}
                  style={{
                    padding: "14px 16px", borderRadius: 16,
                    border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                    background: sel ? T.acG : T.bgC,
                    textAlign: "left", cursor: "pointer",
                    fontFamily: "'DM Sans'", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 14,
                  }}
                >
                  <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                  <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, flex: 1, lineHeight: 1.4 }}>{text}</span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: "20px 0 40px", display: "flex", gap: 12 }}>
            <button
              onClick={() => { setMobilityPhase("welcome"); setMobilityBalance(null); }}
              style={{ width: 50, height: 50, borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon n="back" s={18} c={T.txM} />
            </button>
            <button
              onClick={mobilityBalance !== null ? () => {
                if (mobilityBalance === 4) {
                  setMobilityPhase("redirect");
                } else {
                  setMobilityPhase("followup");
                  setMobilityFollowUpStep(0);
                }
              } : undefined}
              disabled={mobilityBalance === null}
              style={{
                flex: 1, padding: "15px", border: "none", borderRadius: 14,
                background: mobilityBalance !== null ? `linear-gradient(135deg,${T.ac},${T.acS})` : T.bgW,
                color: mobilityBalance !== null ? "#fff" : T.txL, fontSize: 16, fontWeight: 600,
                cursor: mobilityBalance !== null ? "pointer" : "not-allowed", fontFamily: "'DM Sans'",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Personal Connection Redirect (option 5 only)
    if (mobilityPhase === "redirect") {
      return shell(
        <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>💛</div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 14px", lineHeight: 1.3 }}>
            We hear you, {answers.name || "friend"}.
          </h2>
          <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 12px", maxWidth: 340 }}>
            Balance is something you navigate every day, and we want to make sure Spark truly supports you.
          </p>
          <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 340 }}>
            Would you like to connect with us directly so we can understand your needs better?
          </p>
          <a
            href="mailto:spark@dorawellness.com?subject=Personal%20Balance%20Support"
            style={{
              display: "inline-block", padding: "16px 40px", borderRadius: 14,
              background: `linear-gradient(135deg, ${T.cl}, ${T.pl})`,
              color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
              fontFamily: "'DM Sans'", boxShadow: `0 4px 16px ${T.pl}30`,
              marginBottom: 20,
            }}
          >
            Reach Out to Us
          </a>
          <button
            onClick={() => {
              setMobilityRedirectSeen(true);
              setMobilityPhase("followup");
              setMobilityFollowUpStep(0);
            }}
            style={{
              background: "none", border: "none", color: T.txL, fontSize: 14,
              cursor: "pointer", fontFamily: "'DM Sans'", padding: "8px 16px",
              textDecoration: "underline", textUnderlineOffset: 3,
            }}
          >
            Continue with the assessment →
          </button>
          <div style={{ height: 60 }} />
        </div>
      );
    }

    // Screen C — Follow-up Questions (3 per branch)
    if (mobilityPhase === "followup") {
      const branchIdx = mobilityBalance !== null ? mobilityBalance : 0;
      const branch = mobilityBranches[branchIdx];
      const fq = branch[mobilityFollowUpStep];
      const fAns = mobilityFollowUp[mobilityFollowUpStep];
      const isMulti3 = fq.tp === "multi3";

      const setFollowUpAns = (v) => {
        setMobilityFollowUp((prev) => {
          const next = [...prev];
          next[mobilityFollowUpStep] = v;
          return next;
        });
      };

      const toggleFollowUpMulti3 = (o) => {
        const c = fAns || [];
        if (c.includes(o)) {
          setFollowUpAns(c.filter((x) => x !== o));
        } else if (c.length < 3) {
          setFollowUpAns([...c, o]);
        }
      };

      const fOk = isMulti3 ? (fAns || []).length > 0 : !!fAns;

      const advanceFollowUp = () => {
        if (mobilityFollowUpStep < 2) {
          setMobilityFollowUpStep((s) => s + 1);
        } else {
          exitMobility();
        }
      };

      const skipFollowUp = () => {
        exitMobility();
      };

      return shell(
        <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column" }}>
          <p style={{ color: T.txL, fontSize: 13, letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 8px" }}>
            Follow-up {mobilityFollowUpStep + 1} of 3
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 20px", lineHeight: 1.3 }}>
            {fq.q}
          </h2>

          {isMulti3 ? (() => {
            const selected = fAns || [];
            const atMax = selected.length >= 3;
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: "50vh", paddingRight: 2 }}>
                {fq.o.map((o) => {
                  const sel = selected.includes(o);
                  const emoji = o.slice(0, 2);
                  const text = o.slice(3);
                  return (
                    <button
                      key={o}
                      onClick={() => toggleFollowUpMulti3(o)}
                      style={{
                        padding: "14px 16px", borderRadius: 16,
                        border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                        background: sel ? T.acG : T.bgC,
                        textAlign: "left", cursor: sel || !atMax ? "pointer" : "default",
                        fontFamily: "'DM Sans'", transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: 14,
                        opacity: !sel && atMax ? 0.45 : 1,
                      }}
                    >
                      <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                      <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, flex: 1, lineHeight: 1.4 }}>{text}</span>
                    </button>
                  );
                })}
                {atMax && (
                  <p style={{ color: T.txL, fontSize: 13, textAlign: "center", margin: "4px 0 0", fontStyle: "italic" }}>
                    You've picked 3 — that's your limit for this one
                  </p>
                )}
              </div>
            );
          })() : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1 }}>
              {fq.o.map((o) => {
                const sel = fAns === o;
                const emoji = o.slice(0, 2);
                const text = o.slice(3);
                return (
                  <button
                    key={o}
                    onClick={() => setFollowUpAns(o)}
                    style={{
                      padding: "14px 16px", borderRadius: 16,
                      border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                      background: sel ? T.acG : T.bgC,
                      textAlign: "left", cursor: "pointer",
                      fontFamily: "'DM Sans'", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 14,
                    }}
                  >
                    <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                    <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, flex: 1, lineHeight: 1.4 }}>{text}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ flex: 1 }} />

          <div style={{ padding: "12px 0 8px", textAlign: "center" }}>
            <button
              onClick={skipFollowUp}
              style={{
                background: "none", border: "none", color: T.txL, fontSize: 14,
                cursor: "pointer", fontFamily: "'DM Sans'", padding: "8px 16px",
              }}
            >
              Skip for now →
            </button>
          </div>
          <div style={{ padding: "0 0 40px", display: "flex", gap: 12 }}>
            <button
              onClick={() => {
                if (mobilityFollowUpStep > 0) {
                  setMobilityFollowUpStep((s) => s - 1);
                } else {
                  setMobilityPhase("balance");
                }
              }}
              style={{ width: 50, height: 50, borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon n="back" s={18} c={T.txM} />
            </button>
            <button
              onClick={fOk ? advanceFollowUp : undefined}
              disabled={!fOk}
              style={{
                flex: 1, padding: "15px", border: "none", borderRadius: 14,
                background: fOk ? `linear-gradient(135deg,${T.ac},${T.acS})` : T.bgW,
                color: fOk ? "#fff" : T.txL, fontSize: 16, fontWeight: 600,
                cursor: fOk ? "pointer" : "not-allowed", fontFamily: "'DM Sans'",
              }}
            >
              {mobilityFollowUpStep === 2 ? "Finish Assessment" : "Continue"}
            </button>
          </div>
        </div>
      );
    }
  }

  if (showFork) {
    return (
      <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 22px 0" }}>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 20px" }}>
            <span style={{ color: T.ac }}>spark</span>
          </h1>
        </div>
        <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <Icon n="sparkle" s={40} c={T.ac} />
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "20px 0 10px", lineHeight: 1.3 }}>
            You're all set, {answers.name || "friend"}
          </h2>
          <p style={{ color: T.txL, fontSize: 15, lineHeight: 1.6, margin: "0 0 40px", maxWidth: 320 }}>
            Your practice is ready. You can jump right in, or take a moment to tell us more about yourself.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
            <p style={{ color: T.txM, fontSize: 14, margin: "0 0 -4px", lineHeight: 1.5, fontStyle: "italic" }}>
              The more we know, the better your practice becomes.
            </p>
            <button
              onClick={() => finishIntake(true)}
              style={{
                width: "100%", padding: "18px 20px", borderRadius: 16,
                border: "none",
                background: `linear-gradient(135deg, ${T.cl}, ${T.pl})`,
                color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans'",
                boxShadow: `0 4px 16px ${T.pl}40`,
              }}
            >
              Dive Deeper
            </button>
            <p style={{ color: T.txL, fontSize: 13, margin: "-4px 0 0" }}>Let's get to know each other more</p>
            <div style={{ height: 4 }} />
            <button
              onClick={() => finishIntake(false)}
              style={{
                width: "100%", padding: "18px 20px", border: "none", borderRadius: 16,
                background: `linear-gradient(135deg,${T.ac},${T.acS})`,
                color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans'",
              }}
            >
              Dive In
            </button>
            <p style={{ color: T.txL, fontSize: 13, margin: "-4px 0 0" }}>Let's play</p>
          </div>
        </div>
        <div style={{ height: 60 }} />
      </div>
    );
  }

  const q = intakeQuestions[step];
  const ans = answers[q.id];

  const setA = (v) => setAnswers((p) => ({ ...p, [q.id]: v }));
  const toggleMulti = (o) => {
    const c = ans || [];
    setA(c.includes(o) ? c.filter((x) => x !== o) : [...c, o]);
  };
  const toggleMulti3 = (o) => {
    const c = ans || [];
    if (c.includes(o)) {
      setA(c.filter((x) => x !== o));
    } else if (c.length < 3) {
      setA([...c, o]);
    }
  };

  const ok =
    q.tp === "text"
      ? (ans || "").trim().length > 0
      : q.tp === "multi" || q.tp === "multi3"
        ? (ans || []).length > 0
        : !!ans;

  const next = () => {
    // Intercept after name (step 0) to enter mobility assessment
    if (step === 0 && mobilityPhase === null && mobilityBalance === null) {
      setMobilityPhase("welcome");
      return;
    }
    if (step < intakeQuestions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowFork(true);
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
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 8px", lineHeight: 1.3 }}>
          {q.q}
        </h2>
        {q.sub && (
          <p style={{ color: T.txL, fontSize: 14, margin: "0 0 20px", lineHeight: 1.5, fontStyle: "italic" }}>
            {q.sub}
          </p>
        )}
        {!q.sub && <div style={{ height: 20 }} />}

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

        {q.tp === "date" && (
          <input
            type="date"
            value={ans || ""}
            onChange={(e) => setA(e.target.value)}
            autoFocus
            style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, fontSize: 18, fontFamily: "'DM Sans'", color: T.tx, outline: "none", boxSizing: "border-box" }}
          />
        )}

        {q.tp === "multi3" && (() => {
          const selected = ans || [];
          const atMax = selected.length >= 3;
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: "55vh", paddingRight: 2 }}>
              {q.o.map((o) => {
                const sel = selected.includes(o);
                const emoji = o.slice(0, 2);
                const text = o.slice(3);
                return (
                  <button
                    key={o}
                    onClick={() => toggleMulti3(o)}
                    style={{
                      padding: "14px 16px", borderRadius: 16,
                      border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                      background: sel ? T.acG : T.bgC,
                      textAlign: "left", cursor: sel || !atMax ? "pointer" : "default",
                      fontFamily: "'DM Sans'", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 14,
                      opacity: !sel && atMax ? 0.45 : 1,
                    }}
                  >
                    <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                    <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, flex: 1, lineHeight: 1.4 }}>{text}</span>
                    <InfoButton option={o} onOpen={setDescriptor} />
                  </button>
                );
              })}
              {atMax && (
                <p style={{ color: T.txL, fontSize: 13, textAlign: "center", margin: "4px 0 0", fontStyle: "italic" }}>
                  You've picked 3 — that's your limit for this one
                </p>
              )}
            </div>
          );
        })()}

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
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <span>{o}</span>
                <InfoButton option={o} onOpen={setDescriptor} />
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
                    display: "flex", alignItems: "center", gap: 4,
                  }}
                >
                  <span>{o}</span>
                  <InfoButton option={o} onOpen={setDescriptor} />
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

      <DescriptorOverlay descriptor={descriptor} onClose={() => setDescriptor(null)} />
    </div>
  );
}
