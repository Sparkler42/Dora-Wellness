import { useState, useRef } from "react";
import { T } from "../../styles/tokens";
import {
  EXTENDED_INTAKE_SECTIONS,
  getExtendedSequence,
  calculateHighTouchScore,
  getHighTouchPath,
} from "../../data/extended-intake";

const extQuestionMap = {};
EXTENDED_INTAKE_SECTIONS.forEach((s) =>
  s.questions.forEach((q) => {
    extQuestionMap[q.id] = q;
  })
);

const sectionPrefixes = { body: "B", mind: "M", play: "P" };

export default function ExtendedIntakeFlow({ onComplete, onSkip }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState("B1");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showingSectionIntro, setShowingSectionIntro] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioComingSoon, setAudioComingSoon] = useState(false);
  const audioRef = useRef(null);

  const sequence = getExtendedSequence(answers);
  const currentQ = extQuestionMap[currentQuestionId];
  const section = EXTENDED_INTAKE_SECTIONS[sectionIndex];
  const prefix = sectionPrefixes[section.id];

  const seqIdx = sequence.indexOf(currentQuestionId);
  const progressFraction = sequence.length > 0 ? Math.max(0, seqIdx) / sequence.length : 0;

  const isAcknowledgment = currentQ?.acknowledgment != null;
  const currentAnswer = answers[currentQuestionId];

  const canContinue = isAcknowledgment
    ? true
    : currentQ?.type === "multi"
      ? (currentAnswer || []).length > 0
      : !!currentAnswer;

  const handleSelect = (val) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: val }));
  };

  const handleMultiToggle = (val) => {
    const current = currentAnswer || [];
    if (current.includes(val)) {
      handleSelect(current.filter((v) => v !== val));
    } else {
      if (currentQ.maxSelect && current.length >= currentQ.maxSelect) return;
      handleSelect([...current, val]);
    }
  };

  const advance = () => {
    const freshSeq = getExtendedSequence(answers);
    const idx = freshSeq.indexOf(currentQuestionId);

    if (idx < freshSeq.length - 1) {
      const nextId = freshSeq[idx + 1];
      const nextPrefix = nextId.charAt(0);

      if (nextPrefix !== prefix) {
        const newSecIdx = nextPrefix === "M" ? 1 : 2;
        setSectionIndex(newSecIdx);
        setShowingSectionIntro(true);
        setAudioPlaying(false);
        setAudioComingSoon(false);
        setCurrentQuestionId(nextId);
      } else {
        setCurrentQuestionId(nextId);
      }
    } else {
      const score = calculateHighTouchScore(answers);
      const path = getHighTouchPath(score);
      onComplete(answers, path);
    }
  };

  const goBack = () => {
    const freshSeq = getExtendedSequence(answers);
    const idx = freshSeq.indexOf(currentQuestionId);
    if (idx > 0) {
      const prevId = freshSeq[idx - 1];
      const prevPrefix = prevId.charAt(0);
      if (prevPrefix !== prefix) {
        const prevSecIdx = prevPrefix === "B" ? 0 : prevPrefix === "M" ? 1 : 2;
        setSectionIndex(prevSecIdx);
      }
      setCurrentQuestionId(prevId);
    }
  };

  const handleAudioTap = () => {
    const intro = section.intro;
    if (!intro?.audioSrc) {
      setAudioComingSoon(true);
      return;
    }
    if (audioPlaying) {
      audioRef.current?.pause();
      setAudioPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(intro.audioSrc);
        audioRef.current.onended = () => setAudioPlaying(false);
      }
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  // Section intro screen
  if (showingSectionIntro) {
    const intro = section.intro;
    return (
      <div style={{
        fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh",
        maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column",
      }}>
        {/* Top bar */}
        <div style={{ padding: "20px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: 0 }}>
            <span style={{ color: T.ac }}>spark</span>
          </h1>
          <button
            onClick={onSkip}
            style={{
              background: "none", border: "none", color: T.txL, fontSize: 13,
              cursor: "pointer", fontFamily: "'DM Sans'", padding: "4px 0",
            }}
          >
            Skip for now
          </button>
        </div>

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: "48px 28px 40px", textAlign: "center",
        }}>
          {/* Section label */}
          <p style={{
            color: T.txL, fontSize: 11, letterSpacing: "1.5px",
            textTransform: "uppercase", margin: "0 0 16px", fontWeight: 500,
          }}>
            {section.label}
          </p>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'DM Serif Display',serif", fontSize: 28, color: T.tx,
            margin: "0 0 20px", lineHeight: 1.3,
          }}>
            {intro.heading}
          </h2>

          {/* Body text */}
          <p style={{
            color: T.txM, fontSize: 15, lineHeight: 1.8, margin: "0 auto 32px",
            maxWidth: 340,
          }}>
            {intro.body}
          </p>

          {/* Audio button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
            <button
              onClick={handleAudioTap}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                border: `2px solid ${T.ac}`,
                background: audioPlaying ? T.acG : "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 22, color: T.ac, marginLeft: audioPlaying ? 0 : 3 }}>
                {audioPlaying ? "❚❚" : "▶"}
              </span>
            </button>
            <p style={{
              color: T.txL, fontSize: 13, margin: "10px 0 0", fontStyle: "italic",
            }}>
              Hear this from David & Caroline
            </p>
            {audioComingSoon && (
              <p style={{
                color: T.txL, fontSize: 12, margin: "6px 0 0",
                fontStyle: "italic", opacity: 0.7,
              }}>
                Audio coming soon
              </p>
            )}
          </div>

          <div style={{ flex: 1 }} />

          {/* Section dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {EXTENDED_INTAKE_SECTIONS.map((_, i) => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: i === sectionIndex ? T.ac : i < sectionIndex ? T.acS : T.bgW,
                transition: "background 0.3s",
              }} />
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={() => {
              setShowingSectionIntro(false);
              setAudioPlaying(false);
              setAudioComingSoon(false);
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
              }
            }}
            style={{
              width: "100%", padding: "16px", border: "none", borderRadius: 14,
              background: `linear-gradient(135deg,${T.ac},${T.acS})`,
              color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans'", boxShadow: `0 4px 16px ${T.ac}30`,
            }}
          >
            Let's explore →
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  // Question card
  return (
    <div style={{
      fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh",
      maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column",
    }}>
      {/* Top bar */}
      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ color: T.txL, fontSize: 13, fontWeight: 500 }}>
            {section.label}
          </span>
          <button
            onClick={onSkip}
            style={{
              background: "none", border: "none", color: T.txL, fontSize: 13,
              cursor: "pointer", fontFamily: "'DM Sans'", padding: "4px 0",
            }}
          >
            Skip for now
          </button>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: T.bgW, borderRadius: 2, marginBottom: 24 }}>
          <div style={{
            height: 4, background: T.ac, borderRadius: 2,
            width: `${progressFraction * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column" }}>
        {/* Section header (small) */}
        <p style={{
          color: T.txL, fontSize: 11, letterSpacing: "1.5px",
          textTransform: "uppercase", margin: "0 0 8px", fontWeight: 500,
        }}>
          {section.id.toUpperCase()}
        </p>

        {isAcknowledgment ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>💛</div>
            <p style={{
              color: T.txM, fontSize: 16, lineHeight: 1.8, margin: "0 0 40px",
              maxWidth: 340, fontStyle: "italic",
            }}>
              {currentQ.acknowledgment}
            </p>
            <button
              onClick={advance}
              style={{
                padding: "16px 48px", border: "none", borderRadius: 14,
                background: `linear-gradient(135deg,${T.ac},${T.acS})`,
                color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans'", boxShadow: `0 4px 16px ${T.ac}30`,
              }}
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            {/* Question text */}
            <h2 style={{
              fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx,
              margin: "0 0 8px", lineHeight: 1.3,
            }}>
              {currentQ.text}
            </h2>
            {currentQ.maxSelect && (
              <p style={{ color: T.txL, fontSize: 13, margin: "0 0 16px", fontStyle: "italic" }}>
                Pick up to {currentQ.maxSelect}
              </p>
            )}
            {!currentQ.maxSelect && <div style={{ height: 16 }} />}

            {/* Single select */}
            {currentQ.type === "single" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1 }}>
                {currentQ.options.map((opt) => {
                  const sel = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      style={{
                        padding: "14px 16px", borderRadius: 16,
                        border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                        background: sel ? T.acG : T.bgC,
                        textAlign: "left", cursor: "pointer",
                        fontFamily: "'DM Sans'", transition: "all 0.2s",
                      }}
                    >
                      <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, lineHeight: 1.4 }}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Multi select */}
            {currentQ.type === "multi" && (() => {
              const selected = currentAnswer || [];
              const atMax = currentQ.maxSelect ? selected.length >= currentQ.maxSelect : false;
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1, maxHeight: "50vh" }}>
                  {currentQ.options.map((opt) => {
                    const sel = selected.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleMultiToggle(opt.value)}
                        style={{
                          padding: "14px 16px", borderRadius: 16,
                          border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                          background: sel ? T.acG : T.bgC,
                          textAlign: "left", cursor: sel || !atMax ? "pointer" : "default",
                          fontFamily: "'DM Sans'", transition: "all 0.2s",
                          opacity: !sel && atMax ? 0.45 : 1,
                        }}
                      >
                        <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, lineHeight: 1.4 }}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                  {atMax && (
                    <p style={{ color: T.txL, fontSize: 13, textAlign: "center", margin: "4px 0 0", fontStyle: "italic" }}>
                      You've picked {currentQ.maxSelect} — that's your limit for this one
                    </p>
                  )}
                </div>
              );
            })()}

            <div style={{ flex: 1 }} />

            {/* Navigation */}
            <div style={{ padding: "20px 0 40px", display: "flex", gap: 12 }}>
              {seqIdx > 0 && (
                <button
                  onClick={goBack}
                  style={{
                    width: 50, height: 50, borderRadius: 14,
                    border: `1.5px solid ${T.bgW}`, background: T.bgC,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, color: T.txM, fontFamily: "'DM Sans'",
                  }}
                >
                  ←
                </button>
              )}
              <button
                onClick={canContinue ? advance : undefined}
                disabled={!canContinue}
                style={{
                  flex: 1, padding: "15px", border: "none", borderRadius: 14,
                  background: canContinue ? `linear-gradient(135deg,${T.ac},${T.acS})` : T.bgW,
                  color: canContinue ? "#fff" : T.txL, fontSize: 16, fontWeight: 600,
                  cursor: canContinue ? "pointer" : "not-allowed", fontFamily: "'DM Sans'",
                }}
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
