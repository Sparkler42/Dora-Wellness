import { T } from "../../styles/tokens";

export default function ExtendedWrapUp({ htPath, userName, onGoToPractice, onLearnAboutSessions }) {
  const name = userName || "friend";

  const shell = (children) => (
    <div style={{
      fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh",
      maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column",
    }}>
      <div style={{ padding: "20px 22px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 20px" }}>
          <span style={{ color: T.ac }}>spark</span>
        </h1>
      </div>
      {children}
    </div>
  );

  // PATH: standard (0-4)
  if (htPath === "standard") {
    return shell(
      <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>✨</div>
        <h2 style={{
          fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx,
          margin: "0 0 16px", lineHeight: 1.3,
        }}>
          You've just told us a lot.
        </h2>
        <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 340 }}>
          Most apps ask for your age and location. We asked about your inner weather, your relationship with your body, and what lights you up. That's the Spark difference.
        </p>
        <p style={{ color: T.txL, fontSize: 14, lineHeight: 1.6, margin: "0 0 40px", maxWidth: 340, fontStyle: "italic" }}>
          Everything you shared will shape what we offer you — and it can grow and change as you do.
        </p>
        <button
          onClick={onGoToPractice}
          style={{
            padding: "18px 36px", border: "none", borderRadius: 14,
            background: `linear-gradient(135deg,${T.ac},${T.acS})`,
            color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans'", boxShadow: `0 4px 16px ${T.ac}30`,
            maxWidth: 340, width: "100%",
          }}
        >
          Let's see what Spark made for you
        </button>
        <div style={{ height: 60 }} />
      </div>
    );
  }

  // PATH: soft (5-7)
  if (htPath === "soft") {
    return shell(
      <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🌱</div>
        <h2 style={{
          fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx,
          margin: "0 0 16px", lineHeight: 1.3,
        }}>
          You've just told us a lot — and we're listening.
        </h2>
        <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 340 }}>
          Your answers paint a rich picture. Spark will meet you where you are.
        </p>

        {/* Soft secondary card */}
        <div style={{
          background: `${T.cl}10`, borderRadius: 18, padding: "20px 18px",
          marginBottom: 32, maxWidth: 340, width: "100%", textAlign: "left",
          border: `1px solid ${T.cl}20`,
        }}>
          <p style={{ color: T.txM, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            One more thing: if you ever feel like you'd benefit from a more personal conversation, David and Caroline offer private sessions. No pressure — just wanted you to know the door is open.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 340 }}>
          <button
            onClick={onGoToPractice}
            style={{
              width: "100%", padding: "18px 20px", border: "none", borderRadius: 14,
              background: `linear-gradient(135deg,${T.ac},${T.acS})`,
              color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans'", boxShadow: `0 4px 16px ${T.ac}30`,
            }}
          >
            See my practice
          </button>
          <button
            onClick={onLearnAboutSessions}
            style={{
              width: "100%", padding: "16px 20px", borderRadius: 14,
              border: `1.5px solid ${T.bgW}`, background: T.bgC,
              color: T.txM, fontSize: 15, fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans'",
            }}
          >
            Tell me more about private sessions
          </button>
        </div>
        <div style={{ height: 60 }} />
      </div>
    );
  }

  // PATH: redirect (8+)
  return shell(
    <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 24 }}>💛</div>
      <h2 style={{
        fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx,
        margin: "0 0 16px", lineHeight: 1.3,
      }}>
        We noticed something.
      </h2>
      <p style={{ color: T.txM, fontSize: 15, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 340 }}>
        You've shared some things that tell us you might be carrying more than an app can hold on its own. Spark is here for you — and so are we.
      </p>
      <p style={{ color: T.txM, fontSize: 14, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 340 }}>
        David and Caroline work directly with people navigating exactly what you described: a body that feels hard to be in, a mind that won't quiet down, a sense that something is blocked but you can't quite name it. A single session can sometimes unlock what months of solo practice can't.
      </p>

      {/* Two cards */}
      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 360, marginBottom: 16 }}>
        <button
          onClick={onLearnAboutSessions}
          style={{
            flex: 1, padding: "20px 14px", border: "none", borderRadius: 18,
            background: `linear-gradient(135deg, ${T.cl}18, ${T.pl}18)`,
            cursor: "pointer", fontFamily: "'DM Sans'",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            boxShadow: T.sh,
          }}
        >
          <span style={{ fontSize: 28 }}>🤲</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.tx, lineHeight: 1.4 }}>
            I'd love a personal session
          </span>
        </button>
        <button
          onClick={onGoToPractice}
          style={{
            flex: 1, padding: "20px 14px", border: "none", borderRadius: 18,
            background: `linear-gradient(135deg, ${T.ac}12, ${T.sg}12)`,
            cursor: "pointer", fontFamily: "'DM Sans'",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            boxShadow: T.sh,
          }}
        >
          <span style={{ fontSize: 28 }}>🌿</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.tx, lineHeight: 1.4 }}>
            Start with Spark for now
          </span>
        </button>
      </div>

      <p style={{ color: T.txL, fontSize: 12, lineHeight: 1.5, margin: "0 0 20px", maxWidth: 320, fontStyle: "italic" }}>
        Your invitation stays open — you'll find it anytime under You.
      </p>
      <div style={{ height: 40 }} />
    </div>
  );
}
