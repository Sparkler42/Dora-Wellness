import { useState, useEffect } from "react";
import { T } from "../../styles/tokens";
import Orb from "../ui/Orb";
import Icon from "../ui/Icon";

export default function WelcomeScreen({ onStart }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
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
      {/* Floating orbs */}
      <Orb color={T.ac} sz="180px" top="8%" left="-15%" d={0} />
      <Orb color={T.sg} sz="140px" top="55%" left="72%" d={2} />
      <Orb color={T.pl} sz="100px" top="75%" left="10%" d={4} />
      <Orb color={T.oc} sz="90px" top="15%" left="80%" d={6} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px", width: "100%" }}>

        {/* Lotus icon */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.5)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.ac}30, ${T.sg}30)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon n="lotus" s={32} c={T.acS} />
          </div>
        </div>

        {/* "spark" */}
        <div style={{ overflow: "hidden", marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: 52,
              color: T.acS,
              margin: 0,
              letterSpacing: "4px",
              fontWeight: 400,
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(100%)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            spark
          </h1>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: phase >= 2 ? 60 : 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${T.acS}, transparent)`,
            margin: "0 auto 36px",
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Welcome line 1 */}
        <p
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 22,
            color: T.txD,
            lineHeight: 1.5,
            margin: "0 0 14px",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Welcome to your longevity
        </p>

        {/* Welcome line 2 */}
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

        {/* Welcome line 3 */}
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
          David Moll & Caroline Dunham
        </p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(240,236,230,0.18)", marginTop: 4 }}>
          Ukiah, California
        </p>
      </div>
    </div>
  );
}
