import React, { useState, useRef, useEffect } from "react";
import { T } from "../../styles/tokens";
import Orb from "../ui/Orb";

export default function AudioIntroScreen({ onContinue }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL || "/";
    const audio = new Audio(`${base}audio/Spark Intro.mp3`);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setEnded(true);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Auto-advance 1.5s after audio ends
  useEffect(() => {
    if (!ended) return;
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onContinue, 500);
    }, 1500);
    return () => clearTimeout(t);
  }, [ended, onContinue]);

  // Progress tracking
  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = () => {
      const audio = audioRef.current;
      if (audio && audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      if (ended) {
        audio.currentTime = 0;
        setEnded(false);
        setProgress(0);
      }
      audio.play();
      setPlaying(true);
    }
  };

  const skip = () => {
    setFadeOut(true);
    setTimeout(onContinue, 300);
  };

  const formatTime = (s) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        background: T.bgD,
        minHeight: "100vh",
        maxWidth: 430,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <style>{`
        @keyframes somatic-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes somatic-pulse-outer {
          0% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Floating orbs */}
      <Orb color={T.cl} sz="160px" top="10%" left="-10%" d={0} />
      <Orb color={T.sg} sz="120px" top="60%" left="75%" d={3} />
      <Orb color={T.pl} sz="90px" top="78%" left="15%" d={5} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px", width: "100%" }}>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 26,
            color: T.txD,
            margin: "0 0 10px",
            lineHeight: 1.3,
            fontWeight: 400,
            animation: "fade-in-up 0.8s ease both",
          }}
        >
          A word from David
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 15,
            color: "rgba(240,236,230,0.5)",
            margin: "0 0 48px",
            fontWeight: 300,
            lineHeight: 1.6,
            animation: "fade-in-up 0.8s ease 0.2s both",
          }}
        >
          Take a moment before we begin
        </p>

        {/* Play button with pulse rings */}
        <div
          style={{
            position: "relative",
            width: 120,
            height: 120,
            margin: "0 auto 20px",
            animation: "fade-in-up 0.8s ease 0.4s both",
          }}
        >
          {/* Pulse rings — only when playing */}
          {playing && (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `2px solid ${T.cl}`,
                  animation: "somatic-pulse 3s ease-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `1.5px solid ${T.cl}`,
                  animation: "somatic-pulse-outer 3s ease-out 0.8s infinite",
                }}
              />
            </>
          )}

          {/* Button */}
          <button
            onClick={togglePlay}
            style={{
              position: "relative",
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "none",
              background: `linear-gradient(135deg, ${T.cl}, ${T.pl})`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 32px ${T.cl}40`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {playing ? (
              /* Pause icon */
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 6, height: 28, borderRadius: 3, background: "#fff" }} />
                <div style={{ width: 6, height: 28, borderRadius: 3, background: "#fff" }} />
              </div>
            ) : (
              /* Play icon */
              <svg width="32" height="36" viewBox="0 0 32 36" style={{ marginLeft: 4 }}>
                <path d="M4 2 L30 18 L4 34 Z" fill="#fff" />
              </svg>
            )}
          </button>
        </div>

        {/* Duration label */}
        <p
          style={{
            fontSize: 13,
            color: "rgba(240,236,230,0.35)",
            margin: "0 0 32px",
            fontWeight: 300,
            animation: "fade-in-up 0.8s ease 0.5s both",
          }}
        >
          {playing || progress > 0
            ? `${formatTime(duration * progress)} / ${formatTime(duration)}`
            : "~60 seconds"}
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: "70%",
            maxWidth: 260,
            height: 3,
            background: "rgba(240,236,230,0.12)",
            borderRadius: 2,
            margin: "0 auto",
            overflow: "hidden",
            animation: "fade-in-up 0.8s ease 0.6s both",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${T.cl}, ${T.acS})`,
              borderRadius: 2,
              transition: playing ? "none" : "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Skip link */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          textAlign: "center",
          animation: "fade-in-up 0.8s ease 0.8s both",
        }}
      >
        <button
          onClick={skip}
          style={{
            background: "none",
            border: "none",
            color: "rgba(240,236,230,0.3)",
            fontSize: 13,
            fontWeight: 300,
            cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
            padding: "8px 16px",
          }}
        >
          Skip for now →
        </button>
      </div>
    </div>
  );
}
