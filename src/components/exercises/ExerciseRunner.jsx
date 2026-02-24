import { useState, useEffect, useRef } from "react";
import Icon from "../ui/Icon";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";
import { fmt } from "../../utils/formatTime";
import CoreStrengthIllustration from "./CoreStrengthIllustrations";
import { playSingingBowl, unlockAudio } from "../../utils/singingBowl";
import StepAudioPlayer from "./StepAudioPlayer";
import ExerciseAudioPlayer from "./ExerciseAudioPlayer";

export default function ExerciseRunner({ exercise, onComplete, onClose }) {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [done, setDone] = useState(false);
  const timer = useRef(null);
  const bellSignal = useRef(null); // "step" | "complete" | null
  const audioUnlocked = useRef(false);
  const exerciseAudioRef = useRef(null);

  // Unlock AudioContext on first user interaction within the exercise runner
  const handleUserInteraction = () => {
    if (!audioUnlocked.current) {
      console.log("[ExerciseRunner] Unlocking audio on user interaction");
      unlockAudio();
      audioUnlocked.current = true;
    }
  };

  useEffect(() => {
    if (!paused && !done) {
      timer.current = setInterval(() => {
        setTime((t) => {
          const sd = exercise.steps[step].d;
          if (t + 1 >= sd) {
            if (step + 1 < exercise.steps.length) {
              bellSignal.current = "step";
              setStep((s) => s + 1);
              return 0;
            } else {
              bellSignal.current = "complete";
              setDone(true);
              clearInterval(timer.current);
              return sd;
            }
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer.current);
  }, [exercise, step, paused, done]);

  // Play singing bowl when a step or the exercise completes
  useEffect(() => {
    if (bellSignal.current) {
      console.log("[ExerciseRunner] Bell signal triggered:", bellSignal.current, "step:", step, "done:", done);
      playSingingBowl(bellSignal.current);
      bellSignal.current = null;
    }
  }, [step, done]);

  const st = exercise.steps[step];
  const sp = time / st.d;
  const tn = exercise.steps.length;
  const overallProgress = (step + sp) / tn;
  const r = (100 - 6) / 2;
  const ci = 2 * Math.PI * r;

  if (done) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, background: T.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, animation: "fadeIn 0.5s" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg,${exercise.color},${exercise.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <Icon n="check" s={36} c="#fff" />
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: T.tx, margin: "0 0 8px" }}>Practice Complete</h2>
        <p style={{ color: T.txM, fontSize: 16, margin: "0 0 8px" }}>{exercise.title}</p>
        <p style={{ color: T.txL, fontSize: 14, margin: "0 0 32px", textAlign: "center", maxWidth: 280, lineHeight: 1.6 }}>
          Notice how your body feels now compared to when you began.
        </p>
        <button
          onClick={() => onComplete(exercise.id)}
          style={{ width: "100%", maxWidth: 300, padding: 16, border: "none", borderRadius: 14, background: `linear-gradient(135deg,${exercise.color},${exercise.color}CC)`, color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}
        >
          Complete & Return
        </button>
      </div>
    );
  }

  return (
    <div onClick={handleUserInteraction} style={{ position: "fixed", inset: 0, zIndex: 200, background: T.bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="close" s={24} c={T.txM} />
        </button>
        <span style={{ fontSize: 14, color: T.txM, fontWeight: 500 }}>{step + 1} / {tn}</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: T.bgW, margin: "0 20px" }}>
        <div style={{ height: 3, background: exercise.color, borderRadius: 2, width: `${overallProgress * 100}%`, transition: "width 0.3s" }} />
      </div>

      {/* Exercise-level instructor audio */}
      {exercise.audio && (
        <div style={{ marginTop: 10 }}>
          <ExerciseAudioPlayer ref={exerciseAudioRef} src={exercise.audio} color={exercise.color} paused={paused} done={done} />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 28px", textAlign: "center" }}>
        {/* Timer ring */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <svg width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={50} cy={50} r={r} fill="none" stroke={T.bgW} strokeWidth={6} />
            <circle cx={50} cy={50} r={r} fill="none" stroke={exercise.color} strokeWidth={6} strokeDasharray={ci} strokeDashoffset={ci * (1 - Math.min(sp, 1))} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: T.tx }}>{fmt(st.d - time)}</span>
          </div>
        </div>

        {exercise.id === "strength" && <CoreStrengthIllustration stepIndex={step} />}

        <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 6px" }}>{st.n}</h3>
        <p style={{ color: T.txL, fontSize: 13, margin: "0 0 16px", letterSpacing: "0.5px", textTransform: "uppercase" }}>{exercise.title}</p>
        <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, maxWidth: 380 }}>{st.t}</p>

        {st.audio && <StepAudioPlayer src={st.audio} color={exercise.color} paused={paused} />}
      </div>

      {/* Controls */}
      <div style={{ padding: "20px 28px 40px", display: "flex", justifyContent: "center", gap: 16, alignItems: "center" }}>
        <button
          onClick={() => { if (step > 0) { setStep((s) => s - 1); setTime(0); } }}
          disabled={step === 0}
          style={{ width: 48, height: 48, borderRadius: "50%", background: T.bgW, border: "none", cursor: step === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: step === 0 ? 0.3 : 1 }}
        >
          <Icon n="back" s={20} c={T.txM} />
        </button>
        <button
          onClick={() => setPaused(!paused)}
          style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${exercise.color},${exercise.color}CC)`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${exercise.color}40` }}
        >
          <Icon n={paused ? "playBtn" : "pause"} s={24} c="#fff" />
        </button>
        <button
          onClick={() => { if (step < tn - 1) { setStep((s) => s + 1); setTime(0); } else setDone(true); }}
          style={{ width: 48, height: 48, borderRadius: "50%", background: T.bgW, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon n="arrow" s={20} c={T.txM} />
        </button>
      </div>
    </div>
  );
}
