import { T } from "../styles/tokens";

export default function PrivateSessionsScreen({ onBack, onGoToPractice }) {
  return (
    <div style={{
      fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh",
      maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column",
    }}>
      {/* Top bar with back button */}
      <div style={{ padding: "20px 22px 0", display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={onBack}
          style={{
            width: 40, height: 40, borderRadius: 12,
            border: `1.5px solid ${T.bgW}`, background: T.bgC,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: T.txM, fontFamily: "'DM Sans'",
          }}
        >
          ←
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: 0 }}>
          <span style={{ color: T.ac }}>spark</span>
        </h1>
      </div>

      <div style={{ flex: 1, padding: "32px 22px 40px", display: "flex", flexDirection: "column" }}>
        <h2 style={{
          fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx,
          margin: "0 0 18px", lineHeight: 1.3,
        }}>
          Working with David & Caroline
        </h2>

        <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 28px" }}>
          We've spent over 30 years learning how to help people come home to their bodies. Sometimes that means movement. Sometimes it means sitting still together. Sometimes it means finally being able to name something that's been nameless for a long time.
        </p>

        <h3 style={{
          fontFamily: "'DM Serif Display',serif", fontSize: 18, color: T.tx,
          margin: "0 0 16px",
        }}>
          What a session includes:
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
          {[
            "A one-hour conversation and somatic exploration",
            "Personalized practices designed for your body and goals",
            "These practices can be added directly to your Spark profile",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: T.sg, fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>🌿</span>
              <p style={{ color: T.txM, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href="mailto:david@embodyyournow.com?subject=Spark%20Private%20Session"
            style={{
              display: "block", width: "100%", padding: "18px 20px", border: "none", borderRadius: 14,
              background: `linear-gradient(135deg,${T.ac},${T.acS})`,
              color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
              fontFamily: "'DM Sans'", textAlign: "center", boxSizing: "border-box",
              boxShadow: `0 4px 16px ${T.ac}30`,
            }}
          >
            Book a session with David
          </a>
          <a
            href="mailto:caroline@embodyyournow.com?subject=Spark%20Private%20Session"
            style={{
              display: "block", width: "100%", padding: "18px 20px", border: "none", borderRadius: 14,
              background: `linear-gradient(135deg, ${T.cl}, ${T.pl})`,
              color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
              fontFamily: "'DM Sans'", textAlign: "center", boxSizing: "border-box",
              boxShadow: `0 4px 16px ${T.pl}30`,
            }}
          >
            Book a session with Caroline
          </a>
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={onGoToPractice}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 14,
            border: `1.5px solid ${T.bgW}`, background: T.bgC,
            color: T.txM, fontSize: 14, fontWeight: 500, cursor: "pointer",
            fontFamily: "'DM Sans'", marginTop: 24,
          }}
        >
          Not now — take me to Spark
        </button>
      </div>
    </div>
  );
}
