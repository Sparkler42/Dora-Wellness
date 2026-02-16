import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { T } from "../../styles/tokens";

const BASE = import.meta.env.BASE_URL + "audio/";

/**
 * Persistent audio player for full-exercise instructor guidance.
 * Renders as a compact bar below the progress bar in ExerciseRunner.
 *
 * Props:
 *   src      – filename relative to public/audio/  (e.g. "gentle-hatha.mp3")
 *   color    – exercise accent color
 *   paused   – mirrors the exercise timer pause state
 *   done     – when true the audio stops
 *
 * Ref handle:
 *   stop()   – stop and reset (called on exercise close / complete)
 */
const ExerciseAudioPlayer = forwardRef(function ExerciseAudioPlayer(
  { src, color, paused: exercisePaused, done },
  fwdRef,
) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const rafRef = useRef(null);

  const fullSrc = BASE + src;

  // Expose stop() to parent
  useImperativeHandle(fwdRef, () => ({
    stop() {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
      setPlaying(false);
      setProgress(0);
    },
  }));

  // Sync with exercise pause state
  useEffect(() => {
    if (!ref.current || !ready) return;
    if (exercisePaused && playing) {
      ref.current.pause();
    } else if (!exercisePaused && playing) {
      ref.current.play().catch(() => {});
    }
  }, [exercisePaused, playing, ready]);

  // Stop when exercise completes
  useEffect(() => {
    if (done && ref.current) {
      ref.current.pause();
      setPlaying(false);
    }
  }, [done]);

  // Progress tracking
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
    if (!el || !ready) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (ref.current) ref.current.muted = !muted;
    setMuted((m) => !m);
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

  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ margin: "0 20px", padding: "8px 12px", background: color + "12", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
      <audio
        ref={ref}
        src={fullSrc}
        preload="metadata"
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
      />

      {/* Play / pause */}
      <button
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? "Pause instructor audio" : "Play instructor audio"}
        style={{
          width: 30, height: 30, borderRadius: "50%", border: "none", flexShrink: 0,
          background: ready ? color : T.bgW, cursor: ready ? "pointer" : "default",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: ready ? 1 : 0.4,
        }}
      >
        {playing ? (
          <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1.5" y="1" width="3" height="10" rx="1" fill="#fff" /><rect x="7.5" y="1" width="3" height="10" rx="1" fill="#fff" /></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11" fill="#fff" /></svg>
        )}
      </button>

      {/* Label + progress */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: color, textTransform: "uppercase", letterSpacing: "0.3px" }}>
            Instructor Audio
          </span>
          <span style={{ fontSize: 10, color: T.txL }}>
            {ready ? `${fmtTime(progress * duration)} / ${fmtTime(duration)}` : "loading..."}
          </span>
        </div>
        <div style={{ height: 3, background: color + "25", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: 3, background: color, borderRadius: 2, width: `${progress * 100}%`, transition: "width 0.15s" }} />
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        style={{ width: 26, height: 26, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 5.5h2.5L8 2.5v11l-3.5-3H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" fill={T.txL} />
            <line x1="11" y1="5" x2="15" y2="11" stroke={T.txL} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="15" y1="5" x2="11" y2="11" stroke={T.txL} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 5.5h2.5L8 2.5v11l-3.5-3H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" fill={T.txL} />
            <path d="M11 5.5a3 3 0 010 5" stroke={T.txL} strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <path d="M12.5 3.5a5.5 5.5 0 010 9" stroke={T.txL} strokeWidth="1.3" strokeLinecap="round" fill="none" />
          </svg>
        )}
      </button>
    </div>
  );
});

export default ExerciseAudioPlayer;
