import React, { useState, useEffect, useMemo } from "react";
import { T } from "../../styles/tokens";
import Orb from "../ui/Orb";
import Icon from "../ui/Icon";

function Sparkle({ delay, x, y, size, color }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t1);
  }, [delay]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        animation: visible ? `sparkle-twinkle ${1.5 + Math.random()}s ease-in-out infinite` : "none",
        animationDelay: `${Math.random() * 0.5}s`,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path
          d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

const cycleWords = ["Attention", "Imagination", "Health", "Wellbeing", "Movement", "Curiosity", "Presence", "Play"];

export default function WelcomeScreen({ onStart }) {
  const [phase, setPhase] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase < 2) return;
    const interval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % cycleWords.length);
        setWordFade(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [phase]);

  const sparkles = useMemo(() => {
    const colors = [T.ac, T.acS, "#fff", T.sg, T.cl, T.oc];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${5 + Math.random() * 90}%`,
      y: `${5 + Math.random() * 90}%`,
      size: 8 + Math.random() * 14,
      color: colors[i % colors.length],
      delay: 800 + i * 150,
    }));
  }, []);

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
      }}
    >
      <style>{`
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.6) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px ${T.ac}30, 0 0 60px ${T.ac}10; }
          50% { box-shadow: 0 0 30px ${T.ac}50, 0 0 80px ${T.ac}20; }
        }
      `}</style>

      {/* Floating orbs */}
      <Orb color={T.ac} sz="180px" top="8%" left="-15%" d={0} />
      <Orb color={T.sg} sz="140px" top="55%" left="72%" d={2} />
      <Orb color={T.pl} sz="100px" top="75%" left="10%" d={4} />
      <Orb color={T.oc} sz="90px" top="15%" left="80%" d={6} />

      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} size={s.size} color={s.color} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 32px", width: "100%" }}>

        {/* Sparkle icon */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.5)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            marginBottom: 28,
            animation: phase >= 1 ? "float-gentle 3s ease-in-out infinite" : "none",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.ac}40, ${T.acS}40)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              backdropFilter: "blur(10px)",
              animation: phase >= 1 ? "glow-pulse 3s ease-in-out infinite" : "none",
            }}
          >
            <Icon n="sparkle" s={34} c={T.acS} />
          </div>
        </div>

        {/* "Spark" — big shimmer text */}
        <div style={{ overflow: "hidden", marginBottom: 16 }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: 58,
              margin: 0,
              letterSpacing: "5px",
              fontWeight: 400,
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(100%)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              background: `linear-gradient(90deg, ${T.acS}, #fff, ${T.ac}, #fff, ${T.acS})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: phase >= 1 ? "shimmer 4s linear infinite" : "none",
            }}
          >
            Spark
          </h1>
        </div>

        {/* "Your" — stationary */}
        <div style={{ overflow: "hidden", marginBottom: 6 }}>
          <p
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: 22,
              color: "rgba(240,236,230,0.5)",
              margin: 0,
              letterSpacing: "3px",
              fontWeight: 400,
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(100%)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Your
          </p>
        </div>

        {/* Cycling word — pronounced */}
        <div
          style={{
            marginBottom: 40,
            height: 42,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'DM Serif Display',serif",
              fontSize: 32,
              letterSpacing: "2px",
              fontWeight: 400,
              background: `linear-gradient(90deg, ${T.acS}, #fff, ${T.acS})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: phase >= 2 ? "shimmer 4s linear infinite" : "none",
              opacity: wordFade ? 1 : 0,
              transform: wordFade ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {cycleWords[wordIdx]}
          </span>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: phase >= 2 ? 80 : 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${T.acS}, ${T.ac}, ${T.acS}, transparent)`,
            margin: "0 auto 36px",
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            borderRadius: 1,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 15,
            color: "rgba(240,236,230,0.55)",
            lineHeight: 1.7,
            margin: "0 0 12px",
            fontWeight: 300,
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          We are delighted to begin this journey with you.
        </p>

        {/* Quote */}
        <p
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(240,236,230,0.35)",
            lineHeight: 1.6,
            margin: "0 0 48px",
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          &ldquo;You are already doing it right.&rdquo;
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          style={{
            padding: "16px 48px",
            border: "none",
            borderRadius: 14,
            background: `linear-gradient(135deg, ${T.ac}, ${T.acS})`,
            color: "#fff",
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
            letterSpacing: "0.5px",
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: `0 4px 24px ${T.ac}40`,
          }}
        >
          Let's Get Started
        </button>
      </div>

      {/* Bottom attribution */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: phase >= 4 ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      >
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(240,236,230,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>
          David Moll
        </p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(240,236,230,0.18)", marginTop: 4 }}>
          Ukiah, California
        </p>
      </div>
    </div>
  );
}
