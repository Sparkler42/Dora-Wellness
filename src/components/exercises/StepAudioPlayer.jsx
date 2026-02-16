import { useState, useRef, useEffect } from "react";
import { T } from "../../styles/tokens";

const BASE = import.meta.env.BASE_URL + "audio/";

export default function StepAudioPlayer({ src, color, paused: exercisePaused }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef(null);

  const fullSrc = BASE + src;

  // Reset when src changes (new step)
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setReady(false);
    if (ref.current) {
      ref.current.pause();
      ref.current.load();
    }
  }, [src]);

  // Pause audio when exercise timer is paused
  useEffect(() => {
    if (!ref.current) return;
    if (exercisePaused && playing) {
      ref.current.pause();
    } else if (!exercisePaused && playing) {
      ref.current.play().catch(() => {});
    }
  }, [exercisePaused, playing]);

  // Track progress via requestAnimationFrame
  useEffect(() => {
    const tick = () => {
      if (ref.current && playing && !ref.current.paused) {
        setProgress(ref.current.currentTime / (ref.current.duration || 1));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const handleLoaded = () => {
    if (ref.current) {
      setDuration(ref.current.duration);
      setReady(true);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(1);
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ width: "100%", maxWidth: 340, margin: "12px auto 4px", padding: "10px 14px", background: color + "14", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
      <audio
        ref={ref}
        src={fullSrc}
        preload="metadata"
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
      />

      {/* Play/pause button */}
      <button
        onClick={toggle}
        disabled={!ready}
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "none", cursor: ready ? "pointer" : "default",
          background: ready ? color : T.bgW, display: "flex", alignItems: "center", justifyContent: "center",
          opacity: ready ? 1 : 0.4, flexShrink: 0,
        }}
        aria-label={playing ? "Pause audio" : "Play audio"}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="#fff" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="#fff" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="3,1 13,7 3,13" fill="#fff" /></svg>
        )}
      </button>

      {/* Progress bar */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ height: 4, background: color + "30", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: 4, background: color, borderRadius: 2, width: `${progress * 100}%`, transition: "width 0.15s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.txL }}>
          <span>{ready ? fmt(progress * duration) : "..."}</span>
          <span>{ready ? fmt(duration) : ""}</span>
        </div>
      </div>
    </div>
  );
}
