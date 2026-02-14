import { useState, useRef, useEffect } from "react";
import { T } from "./styles/tokens";
import "./styles/global.css";
import Icon from "./components/ui/Icon";
import Orb from "./components/ui/Orb";
import SectionHeader from "./components/ui/SectionHeader";
import IntakeFlow from "./components/intake/IntakeFlow";
import ExerciseCard from "./components/exercises/ExerciseCard";
import ExerciseDetail from "./components/exercises/ExerciseDetail";
import ExerciseRunner from "./components/exercises/ExerciseRunner";
import PaywallModal from "./components/profile/PaywallModal";
import NotificationsModal from "./components/profile/NotificationsModal";
import DeviceWellnessModal from "./components/profile/DeviceWellnessModal";
import { useApp } from "./context/AppContext";
import { EX } from "./data/exercises";
import { intentions } from "./data/intentions";
import { tiers } from "./data/tiers";
import { getRecommendations } from "./hooks/useRecommendations";

// ═══ HOME TAB ═════════════════════════════════════════════════
function HomeTab() {
  const { profile, streak, doneToday, tier, setModal, setTab } = useApp();
  const rec = getRecommendations(profile);
  const din = intentions[new Date().getDay() % intentions.length];

  return (
    <div style={{ paddingBottom: 20 }}>
      {/* Hero */}
      <div style={{ background: T.bgD, borderRadius: 24, padding: "28px 22px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <Orb color={T.ac} sz="120px" top="-30px" left="-20px" />
        <Orb color={T.sg} sz="100px" top="50px" left="70%" d={3} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "rgba(240,236,230,0.5)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 12px" }}>
            {profile?.name
              ? `Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, ${profile.name}`
              : "Today's Intention"}
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 21, color: T.txD, margin: "0 0 10px", lineHeight: 1.4 }}>
            &ldquo;{din.t}&rdquo;
          </h2>
          <p style={{ color: "rgba(240,236,230,0.5)", fontSize: 13, margin: "0 0 16px" }}>&mdash; {din.b}</p>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: T.ac, borderRadius: 20, padding: "8px 18px", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon n="sparkle" s={14} c="#fff" />
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{streak}-day streak</span>
            </div>
            <span style={{ color: "rgba(240,236,230,0.5)", fontSize: 13 }}>{doneToday.length} today</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
        <button onClick={() => setModal({ t: "device" })} style={{ flex: 1, background: T.bgC, borderRadius: 14, padding: 14, border: "none", boxShadow: T.sh, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon n="phone" s={18} c={T.oc} /><span style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Device Wellness</span>
        </button>
        <button onClick={() => setModal({ t: "notifs" })} style={{ flex: 1, background: T.bgC, borderRadius: 14, padding: 14, border: "none", boxShadow: T.sh, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon n="bell" s={18} c={T.ac} /><span style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Notifications</span>
        </button>
      </div>

      {/* Recommendations */}
      <SectionHeader icon="sparkle" ic={T.ac} title="For You" sub="Personalized based on your intake" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rec.map((e, i) => <ExerciseCard key={e.id} ex={e} idx={i} />)}
      </div>

      {/* AI Agent CTA */}
      <div
        onClick={() => tier === "free" || tier === "flow" ? setModal({ t: "pay" }) : setTab("chat")}
        style={{
          background: `linear-gradient(135deg,${T.oc}12,${T.ac}12)`, borderRadius: 18, padding: "18px 20px", marginTop: 28,
          border: `1.5px solid ${T.oc}25`, cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 14, background: T.ocG, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon n="chat" s={24} c={T.oc} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: T.tx, margin: "0 0 3px" }}>AI Wellness Guide</h4>
          <p style={{ color: T.txL, fontSize: 13, margin: 0 }}>{tier === "deep" || tier === "private" ? "Ask about your practice" : "Unlock with Embody Deep"}</p>
        </div>
        {(tier === "free" || tier === "flow") && <Icon n="lock" s={18} c={T.txL} />}
      </div>

      {/* Deepen CTA */}
      <div
        onClick={() => setModal({ t: "pay" })}
        style={{
          background: `linear-gradient(135deg,${T.ac}12,${T.pl}12)`, borderRadius: 18, padding: "18px 20px", marginTop: 12,
          border: `1.5px solid ${T.ac}25`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div>
          <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: T.tx, margin: "0 0 3px" }}>Deepen your practice</h4>
          <p style={{ color: T.txL, fontSize: 13, margin: 0 }}>Private sessions with David & Caroline</p>
        </div>
        <Icon n="arrow" s={20} c={T.ac} />
      </div>
    </div>
  );
}

// ═══ PRACTICE (BODY) TAB ══════════════════════════════════════
function BodyTab() {
  return (
    <div style={{ paddingBottom: 20 }}>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "0 0 4px" }}>Practice Library</h2>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 8px" }}>Your body is your gym. Your attention is the key.</p>
      <SectionHeader icon="lotus" ic={T.sg} title="Body" sub="Yoga, stretching, strength & nourishment" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[EX.yoga, EX.stretch, EX.strength, EX.barefoot, EX.somatic, EX.nutrition].map((e, i) => <ExerciseCard key={e.id} ex={e} idx={i} />)}
      </div>
      <SectionHeader icon="brain" ic={T.oc} title="Mind" sub="Meditation, attention & awareness" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[EX.meditation, EX.attention, EX.sensory, EX.memory, EX.selfaware].map((e, i) => <ExerciseCard key={e.id} ex={e} idx={i} />)}
      </div>
      <SectionHeader icon="sparkle" ic={T.pl} title="Play" sub="Imagination, pleasure & creativity" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[EX.imagine, EX.pleasure, EX.playful, EX.creative, EX.sensual].map((e, i) => <ExerciseCard key={e.id} ex={e} idx={i} />)}
      </div>
    </div>
  );
}

// ═══ MIND TAB ═════════════════════════════════════════════════
function MindTab() {
  const { setModal } = useApp();
  return (
    <div style={{ paddingBottom: 20 }}>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "0 0 4px" }}>Mind & Awareness</h2>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>
        Attention is at the heart of our lives. Here, you'll cultivate the capacity to sense what's happening as it's happening.
      </p>
      <div style={{ background: T.bgD, borderRadius: 20, padding: "24px 20px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <Orb color={T.oc} sz="80px" top="-20px" left="75%" d={1} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: T.acS, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px" }}>Featured</p>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.txD, margin: "0 0 8px" }}>The Art of Attention</h3>
          <p style={{ color: "rgba(240,236,230,0.65)", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
            David's signature interoceptive training. Develop refined awareness that transforms your relationship with your body.
          </p>
          <button onClick={() => setModal({ t: "detail", d: EX.attention })} style={{ background: T.ac, border: "none", borderRadius: 12, padding: "10px 20px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}>
            Begin
          </button>
        </div>
      </div>
      <SectionHeader icon="eye" ic={T.ac} title="Awareness Practices" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[EX.meditation, EX.attention, EX.sensory, EX.memory, EX.selfaware].map((e, i) => <ExerciseCard key={e.id} ex={e} idx={i} />)}
      </div>
    </div>
  );
}

// ═══ PLAY TAB ═════════════════════════════════════════════════
function PlayTab() {
  const { setDoneAll, setStreak } = useApp();
  const [jEntry, setJEntry] = useState("");

  return (
    <div style={{ paddingBottom: 20 }}>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "0 0 4px" }}>Play & Imagination</h2>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>
        When we follow the trail of inquiry with interest, we are rewarded with the blessing of imagination.
      </p>
      <SectionHeader icon="sparkle" ic={T.pl} title="Explorations" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[EX.imagine, EX.pleasure, EX.playful, EX.creative, EX.sensual].map((e, i) => <ExerciseCard key={e.id} ex={e} idx={i} />)}
      </div>
      <SectionHeader icon="heart" ic={T.cl} title="Pleasure Journal" sub="Track what feels good" />
      <div style={{ background: T.bgC, borderRadius: 16, padding: 18, boxShadow: T.sh }}>
        <p style={{ color: T.txM, fontSize: 14, lineHeight: 1.6, margin: "0 0 14px" }}>
          Putting attention on expanding what feels good is the starting place toward healing. What brought you pleasure today?
        </p>
        <textarea
          value={jEntry}
          onChange={(e) => setJEntry(e.target.value)}
          placeholder="Tap to write..."
          rows={3}
          style={{ width: "100%", background: T.bgW, borderRadius: 12, padding: 14, border: "none", color: T.tx, fontSize: 14, fontFamily: "'DM Sans'", resize: "none", outline: "none", boxSizing: "border-box" }}
        />
        {jEntry.trim() && (
          <button
            onClick={() => { setDoneAll((p) => [...p, { id: "journal", dt: new Date().toISOString(), note: jEntry }]); setJEntry(""); setStreak((s) => s + 1); }}
            style={{ marginTop: 10, padding: "10px 20px", border: "none", borderRadius: 12, background: T.cl, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}
          >
            Save Entry
          </button>
        )}
      </div>
    </div>
  );
}

// ═══ CHAT TAB ═════════════════════════════════════════════════
function ChatTab() {
  const { tier, profile, streak, doneToday, doneAll, setModal } = useApp();
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  if (tier !== "deep" && tier !== "private") {
    return (
      <div style={{ paddingBottom: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: T.ocG, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Icon n="chat" s={32} c={T.oc} />
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 8px" }}>AI Wellness Guide</h2>
        <p style={{ color: T.txL, fontSize: 14, margin: "0 0 24px", lineHeight: 1.6, maxWidth: 300 }}>
          A personalized AI guide trained in David & Caroline's philosophy, with access to your practice metrics and goals.
        </p>
        <button onClick={() => setModal({ t: "pay" })} style={{ padding: "14px 32px", border: "none", borderRadius: 14, background: `linear-gradient(135deg,${T.ac},${T.acS})`, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}>
          Unlock with Embody Deep
        </button>
      </div>
    );
  }

  const sendChat = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs((p) => [...p, { r: "user", c: userMsg }]);
    setLoading(true);
    try {
      const p = profile || {};
      const sys = `You are the Dora Wellness AI guide, by David Moll and Caroline Dunham. You support users in movement, attention, and wellbeing practice.
PHILOSOPHY: "Putting attention on expanding what feels good is the starting place toward healing." Active stretching integrates interested attention with physical engagement. Distinguish nerve sensation (electric, zingy) from muscle/fascia stretch (broad, warm). Self-care is responsive, not formulaic. Attention is the master skill. Movement should be playful and curious.
You have the user's profile and metrics. Give personalized recommendations. Be warm, embodied, direct. 2-4 paragraphs max. Reference David and Caroline's teachings naturally. Suggest specific exercises when relevant.
Available exercises: yoga, stretch, strength, barefoot, somatic, nutrition, meditation, attention, sensory, memory, selfaware, imagine, pleasure, playful, creative, sensual.
USER: ${p.name || "User"}, Age: ${p.age || "?"}, Experience: ${p.experience || "?"}, Goals: ${(p.goals || []).join(", ") || "none"}, Focus: ${(p.bodyAreas || []).join(", ") || "none"}, Mind: ${(p.mindInterest || []).join(", ") || "none"}, Time: ${p.timeAvail || "?"}, When: ${p.timeOfDay || "?"}.
METRICS: Tier: ${tier}, Streak: ${streak}, Today: ${doneToday.length} (${doneToday.join(",") || "none"}), Total: ${doneAll.length}.`;
      const hist = msgs.slice(-16).map((m) => ({ role: m.r === "user" ? "user" : "assistant", content: m.c }));
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, system: sys, messages: [...hist, { role: "user", content: userMsg }] }),
      });
      const d = await r.json();
      const reply = d.content?.map((b) => (b.type === "text" ? b.text : "")).filter(Boolean).join("\n") || "I'm here. Tell me more about what you need.";
      setMsgs((p) => [...p, { r: "assistant", c: reply }]);
    } catch {
      setMsgs((p) => [...p, { r: "assistant", c: "I'm having trouble connecting. In the meantime, try a Self-Practice Check-in \u2014 pause, breathe, and ask your body what it needs." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 4px" }}>Wellness Guide</h2>
      <p style={{ color: T.txL, fontSize: 13, margin: "0 0 12px" }}>Trained in David & Caroline's philosophy · Sees your practice data</p>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 10 }}>
        {msgs.length === 0 && (
          <div style={{ background: T.ocG, borderRadius: 16, padding: 18, marginTop: 10 }}>
            <p style={{ color: T.txM, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Hi{profile?.name ? ` ${profile.name}` : ""}, I'm your Dora Wellness guide. I can see your practice history and goals. Ask me about exercises, your progress, body questions, or what to practice next. I'm here to support your journey.
            </p>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.r === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
            <div style={{
              background: m.r === "user" ? T.ac : T.bgC, borderRadius: 16, padding: "12px 16px",
              borderBottomRightRadius: m.r === "user" ? 4 : 16,
              borderBottomLeftRadius: m.r === "user" ? 16 : 4,
              boxShadow: m.r === "user" ? "none" : T.sh,
            }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: m.r === "user" ? "#fff" : T.tx, whiteSpace: "pre-wrap" }}>{m.c}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", maxWidth: "85%" }}>
            <div style={{ background: T.bgC, borderRadius: 16, padding: "12px 16px", boxShadow: T.sh }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: T.txL, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>
      <div style={{ display: "flex", gap: 10, paddingTop: 10, borderTop: `1px solid ${T.bgW}` }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()}
          placeholder="Ask about your practice..."
          style={{ flex: 1, padding: "12px 16px", borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, fontSize: 14, fontFamily: "'DM Sans'", color: T.tx, outline: "none" }}
        />
        <button
          onClick={sendChat}
          disabled={!input.trim() || loading}
          style={{ width: 48, height: 48, borderRadius: 14, background: input.trim() && !loading ? T.ac : T.bgW, border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon n="send" s={18} c={input.trim() && !loading ? "#fff" : T.txL} />
        </button>
      </div>
    </div>
  );
}

// ═══ PROFILE TAB ══════════════════════════════════════════════
function ProfileTab() {
  const { profile, streak, doneToday, doneAll, tier, setModal, setScreen } = useApp();

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px", background: `linear-gradient(135deg,${T.sg},${T.oc})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 32, color: "#fff", fontFamily: "'DM Serif Display',serif" }}>{(profile?.name || "Y")[0].toUpperCase()}</span>
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 4px" }}>{profile?.name || "Your Practice"}</h2>
        <p style={{ color: T.txL, fontSize: 14, margin: 0 }}>{streak} day streak · {doneAll.length} total sessions</p>
        <p style={{ color: T.ac, fontSize: 13, fontWeight: 600, margin: "6px 0 0" }}>{tiers.find((t) => t.id === tier)?.nm}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[{ l: "Streak", v: `${streak}d`, c: T.ac }, { l: "Today", v: String(doneToday.length), c: T.sg }, { l: "Total", v: String(doneAll.length), c: T.oc }].map((s, i) => (
          <div key={i} style={{ background: T.bgC, borderRadius: 14, padding: "14px 12px", textAlign: "center", boxShadow: T.sh }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: s.c, marginBottom: 4 }}>{s.v}</div>
            <div style={{ color: T.txL, fontSize: 12 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {[
        { icon: "bell", c: T.ac, l: "Notifications", a: () => setModal({ t: "notifs" }) },
        { icon: "phone", c: T.oc, l: "Device Wellness", a: () => setModal({ t: "device" }) },
        { icon: "star", c: T.acS, l: "Upgrade Plan", a: () => setModal({ t: "pay" }) },
        { icon: "back", c: T.txL, l: "Retake Intake", a: () => setScreen("retake") },
      ].map((it, i) => (
        <div key={i} onClick={it.a} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: T.bgC, borderRadius: 14, marginBottom: 8, boxShadow: T.sh, cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: it.c + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n={it.icon} s={20} c={it.c} />
          </div>
          <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: T.tx }}>{it.l}</span>
          <Icon n="arrow" s={16} c={T.txL} />
        </div>
      ))}

      <div style={{ background: T.bgD, borderRadius: 20, padding: "22px 20px", marginTop: 20, position: "relative", overflow: "hidden" }}>
        <Orb color={T.ac} sz="80px" top="-20px" left="-10px" d={2} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: T.txD, margin: "0 0 10px" }}>About Dora Wellness</h3>
          <p style={{ color: "rgba(240,236,230,0.7)", fontSize: 14, lineHeight: 1.6, margin: "0 0 10px" }}>
            Founded by David Moll and Caroline Dunham in Ukiah, California. Over three decades of combined experience in bodywork, yoga, and functional movement.
          </p>
          <p style={{ color: "rgba(240,236,230,0.5)", fontSize: 13, margin: 0, fontStyle: "italic" }}>&ldquo;You are already doing it right.&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

// ═══ MAIN APP ═════════════════════════════════════════════════
export default function App() {
  const {
    screen, tab, setTab, modal, setModal,
    tier, setTier, completeExercise,
  } = useApp();
  const [runningExercise, setRunningExercise] = useState(null);

  // Show intake flow
  if (screen === "intake") return <IntakeFlow />;
  if (screen === "retake") return <IntakeFlow skipWelcome />;

  const startExercise = (ex) => {
    setRunningExercise(ex);
    setModal({ t: "ex" });
  };

  const renderModal = () => {
    if (!modal) return null;
    if (modal.t === "ex" && runningExercise) {
      return (
        <ExerciseRunner
          exercise={runningExercise}
          onComplete={(id) => { completeExercise(id); setRunningExercise(null); setModal(null); }}
          onClose={() => { setRunningExercise(null); setModal(null); }}
        />
      );
    }
    if (modal.t === "detail") {
      return <ExerciseDetail ex={modal.d} onStart={startExercise} />;
    }
    if (modal.t === "pay") {
      return <PaywallModal onClose={() => setModal(null)} onSelect={(id) => { setTier(id); setModal(null); }} />;
    }
    if (modal.t === "notifs") {
      return <NotificationsModal onClose={() => setModal(null)} />;
    }
    if (modal.t === "device") {
      return <DeviceWellnessModal onClose={() => setModal(null)} />;
    }
    return null;
  };

  const tabList = [
    { id: "home", icon: "home", l: "Today" },
    { id: "body", icon: "clock", l: "Practice" },
    { id: "mind", icon: "brain", l: "Mind" },
    { id: "play", icon: "sparkle", l: "Play" },
    { id: "chat", icon: "chat", l: "Guide" },
    { id: "profile", icon: "profile", l: "You" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, maxWidth: 430, margin: "0 auto", minHeight: "100vh", position: "relative", color: T.tx }}>
      {/* Header */}
      <div style={{ padding: "12px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50, background: T.bg }}>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, letterSpacing: "-0.3px" }}>
          <span style={{ color: T.ac }}>dora</span> wellness
        </h1>
        <button onClick={() => setModal({ t: "notifs" })} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="bell" s={20} c={T.txM} />
        </button>
      </div>

      {/* Tab content */}
      <div style={{ padding: "16px 18px 110px" }}>
        {tab === "home" && <HomeTab />}
        {tab === "body" && <BodyTab />}
        {tab === "mind" && <MindTab />}
        {tab === "play" && <PlayTab />}
        {tab === "chat" && <ChatTab />}
        {tab === "profile" && <ProfileTab />}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "rgba(247,243,238,0.92)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(44,40,37,0.06)",
        display: "flex", justifyContent: "space-around",
        padding: "6px 4px calc(6px + env(safe-area-inset-bottom,0px))", zIndex: 50,
      }}>
        {tabList.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 8px", borderRadius: 10 }}
          >
            <Icon n={t.icon} s={20} c={tab === t.id ? T.ac : T.txL} />
            <span style={{ fontSize: 10, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? T.ac : T.txL }}>{t.l}</span>
          </button>
        ))}
      </div>

      {renderModal()}
    </div>
  );
}
