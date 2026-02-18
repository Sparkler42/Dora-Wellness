import React from "react";
import { T } from "../../styles/tokens";

const C = T.oc;
const SKIN = "#E8D5C4";
const HAIR = "#6B5B4F";
const GLOW = "rgba(212, 168, 67, 0.25)";

// Shared stick-figure body part helpers
const head = (cx, cy, r = 8) => <circle cx={cx} cy={cy} r={r} fill={SKIN} />;
const joint = (cx, cy) => <circle cx={cx} cy={cy} r={2.5} fill={C} opacity="0.4" />;
const limb = (props) => <line {...props} stroke={C} strokeWidth="3" strokeLinecap="round" />;
const body = (props) => <line {...props} stroke={C} strokeWidth="3.5" strokeLinecap="round" />;
const floor = (y = 145) => <line x1="20" y1={y} x2="180" y2={y} stroke={T.bgW} strokeWidth="2" strokeDasharray="4 4" />;
const mat = (y = 142) => (
  <rect x="30" y={y} width="140" height="6" rx="3" fill={C} opacity="0.1" />
);

// ═══ 1. PELVIC FLOOR ACTIVATION ══════════════════════════════
function PelvicFloor() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}
      {/* Supine figure, knees bent */}
      {head(60, 128)}
      {body({ x1: 68, y1: 128, x2: 110, y2: 128 })}
      {/* Bent legs */}
      {limb({ x1: 110, y1: 128, x2: 125, y2: 108 })}
      {limb({ x1: 125, y1: 108, x2: 125, y2: 140 })}
      {limb({ x1: 110, y1: 128, x2: 140, y2: 108 })}
      {limb({ x1: 140, y1: 108, x2: 140, y2: 140 })}
      {/* Arms at sides */}
      {limb({ x1: 75, y1: 128, x2: 75, y2: 140 })}
      {limb({ x1: 90, y1: 128, x2: 90, y2: 140 })}
      {/* Pelvic engagement pulse */}
      <ellipse cx="100" cy="128" rx="14" ry="6" fill={C} opacity="0.15">
        <animate attributeName="ry" values="6;9;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Breath arrows */}
      <path d="M95 110 L100 102 L105 110" stroke={C} strokeWidth="1.5" fill="none" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// ═══ 2. DEAD BUG ══════════════════════════════════════════════
function DeadBug() {
  const DUR = "4s";
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}

      {/* ── Core engagement glow (behind figure) ── */}
      <ellipse cx="92" cy="128" rx="22" ry="12" fill={GLOW} opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="ry" values="12;16;12" dur={DUR} repeatCount="indefinite" />
      </ellipse>

      {/* ── Torso: Pelvis ── */}
      <rect x="95" y="124" width="22" height="12" rx="5" fill={SKIN} stroke={C} strokeWidth="1.5" />

      {/* ── Torso: Waist connector ── */}
      <rect x="84" y="122" width="14" height="5" rx="3" fill={SKIN} stroke={C} strokeWidth="1">
        <animate attributeName="width" values="14;12;14" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="x" values="84;85;84" dur={DUR} repeatCount="indefinite" />
      </rect>

      {/* ── Torso: Ribcage with breathing ── */}
      <rect x="68" y="115" width="28" height="14" rx="6" fill={SKIN} stroke={C} strokeWidth="1.5">
        <animate attributeName="height" values="14;16;14" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y" values="115;114;115" dur={DUR} repeatCount="indefinite" />
      </rect>

      {/* ── Head ── */}
      <circle cx="55" cy="120" r="9" fill={SKIN} stroke={C} strokeWidth="1.5" />

      {/* ── Left arm (static, tabletop — pointing up) ── */}
      {/* Upper arm: shoulder → elbow */}
      <line x1="72" y1="120" x2="72" y2="102" stroke={C} strokeWidth="5" strokeLinecap="round" />
      {/* Forearm: elbow → hand */}
      <line x1="72" y1="102" x2="72" y2="85" stroke={C} strokeWidth="4" strokeLinecap="round" />
      {/* Elbow joint */}
      <circle cx="72" cy="102" r="3" fill={C} opacity="0.5" />
      {/* Shoulder joint */}
      <circle cx="72" cy="120" r="3" fill={C} opacity="0.5" />

      {/* ── Right arm (animated — extends overhead then returns) ── */}
      {/* Upper arm: shoulder → elbow */}
      <line x1="88" y1="120" x2="88" y2="102" stroke={C} strokeWidth="5" strokeLinecap="round">
        <animate attributeName="x2" values="88;62;88" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y2" values="102;118;102" dur={DUR} repeatCount="indefinite" />
      </line>
      {/* Forearm: elbow → hand */}
      <line x1="88" y1="102" x2="88" y2="85" stroke={C} strokeWidth="4" strokeLinecap="round">
        <animate attributeName="x1" values="88;62;88" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y1" values="102;118;102" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="x2" values="88;38;88" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y2" values="85;118;85" dur={DUR} repeatCount="indefinite" />
      </line>
      {/* Animated elbow joint */}
      <circle cx="88" cy="102" r="3" fill={C} opacity="0.5">
        <animate attributeName="cx" values="88;62;88" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="cy" values="102;118;102" dur={DUR} repeatCount="indefinite" />
      </circle>
      {/* Shoulder joint */}
      <circle cx="88" cy="120" r="3" fill={C} opacity="0.5" />

      {/* ── Right leg (static, tabletop — knee bent 90°) ── */}
      {/* Thigh: hip → knee */}
      <line x1="112" y1="132" x2="130" y2="112" stroke={C} strokeWidth="6" strokeLinecap="round" />
      {/* Shin: knee → foot */}
      <line x1="130" y1="112" x2="150" y2="112" stroke={C} strokeWidth="5" strokeLinecap="round" />
      {/* Knee joint */}
      <circle cx="130" cy="112" r="3" fill={C} opacity="0.5" />
      {/* Hip joint */}
      <circle cx="112" cy="132" r="3" fill={C} opacity="0.5" />

      {/* ── Left leg (animated — extends straight then returns) ── */}
      {/* Thigh: hip → knee */}
      <line x1="100" y1="132" x2="100" y2="112" stroke={C} strokeWidth="6" strokeLinecap="round">
        <animate attributeName="x2" values="100;132;100" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y2" values="112;136;112" dur={DUR} repeatCount="indefinite" />
      </line>
      {/* Shin: knee → foot */}
      <line x1="100" y1="112" x2="115" y2="112" stroke={C} strokeWidth="5" strokeLinecap="round">
        <animate attributeName="x1" values="100;132;100" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y1" values="112;136;112" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="x2" values="115;168;115" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="y2" values="112;136;112" dur={DUR} repeatCount="indefinite" />
      </line>
      {/* Animated knee joint */}
      <circle cx="100" cy="112" r="3" fill={C} opacity="0.5">
        <animate attributeName="cx" values="100;132;100" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="cy" values="112;136;112" dur={DUR} repeatCount="indefinite" />
      </circle>
      {/* Hip joint */}
      <circle cx="100" cy="132" r="3" fill={C} opacity="0.5" />

      {/* ── Breathing indicator on ribcage ── */}
      <circle cx="82" cy="122" r="2" fill={C} opacity="0.1">
        <animate attributeName="r" values="2;4;2" dur={DUR} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur={DUR} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ═══ 3. BIRD DOG ══════════════════════════════════════════════
function BirdDog() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {floor()}
      {/* Tabletop position */}
      {head(55, 88)}
      {body({ x1: 62, y1: 92, x2: 120, y2: 92 })}
      {/* Left arm on ground */}
      {limb({ x1: 70, y1: 92, x2: 70, y2: 143 })}
      {/* Right arm extended forward */}
      <line x1="80" y1="92" x2="40" y2="78" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="78;74;78" dur="2.5s" repeatCount="indefinite" />
      </line>
      {/* Right leg on ground */}
      {limb({ x1: 115, y1: 92, x2: 115, y2: 143 })}
      {/* Left leg extended back */}
      <line x1="120" y1="92" x2="165" y2="82" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="82;78;82" dur="2.5s" repeatCount="indefinite" />
      </line>
      {joint(70, 143)}
      {joint(115, 143)}
      {/* Balance line */}
      <line x1="40" y1="78" x2="165" y2="82" stroke={C} strokeWidth="1" strokeDasharray="3 3" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2.5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

// ═══ 4. MODIFIED HUNDRED ══════════════════════════════════════
function Hundred() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}
      {/* Curled up figure */}
      {head(65, 112)}
      {/* Curved torso - lifted shoulders */}
      <path d="M72 116 Q90 120 110 128" stroke={C} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Legs tabletop */}
      {limb({ x1: 110, y1: 128, x2: 130, y2: 108 })}
      {limb({ x1: 130, y1: 108, x2: 148, y2: 108 })}
      {limb({ x1: 110, y1: 128, x2: 135, y2: 112 })}
      {limb({ x1: 135, y1: 112, x2: 150, y2: 112 })}
      {/* Arms pumping */}
      <line x1="78" y1="118" x2="78" y2="135" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="135;128;135" dur="0.4s" repeatCount="indefinite" />
      </line>
      <line x1="88" y1="120" x2="88" y2="137" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="137;130;137" dur="0.4s" repeatCount="indefinite" />
      </line>
      {/* Pump motion lines */}
      <g opacity="0.25">
        <line x1="74" y1="133" x2="74" y2="138" stroke={C} strokeWidth="1">
          <animate attributeName="opacity" values="0;0.5;0" dur="0.4s" repeatCount="indefinite" />
        </line>
        <line x1="92" y1="135" x2="92" y2="140" stroke={C} strokeWidth="1">
          <animate attributeName="opacity" values="0;0.5;0" dur="0.4s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}

// ═══ 5. SIDE PLANK HIP LIFT ══════════════════════════════════
function SidePlank() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {floor()}
      {/* Side plank figure */}
      {head(50, 72)}
      {/* Body diagonal */}
      <line x1="55" y1="80" x2="130" y2="130" stroke={C} strokeWidth="3.5" strokeLinecap="round">
        <animate attributeName="y2" values="130;122;130" dur="2s" repeatCount="indefinite" />
      </line>
      {/* Forearm on ground */}
      {limb({ x1: 55, y1: 80, x2: 70, y2: 143 })}
      {limb({ x1: 70, y1: 143, x2: 85, y2: 143 })}
      {/* Top arm on hip */}
      <line x1="80" y1="98" x2="75" y2="85" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y1" values="98;95;98" dur="2s" repeatCount="indefinite" />
      </line>
      {/* Legs stacked */}
      <line x1="130" y1="130" x2="155" y2="143" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y1" values="130;122;130" dur="2s" repeatCount="indefinite" />
      </line>
      {joint(70, 143)}
      {/* Hip lift indicator */}
      <path d="M95 105 L100 98 L105 105" stroke={C} strokeWidth="1.5" fill="none" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// ═══ 6. HOLLOW BODY HOLD ══════════════════════════════════════
function HollowBody() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}
      {/* Hollow body - curved back on ground, limbs lifted */}
      {head(55, 118)}
      {/* Curved body */}
      <path d="M62 122 Q90 135 120 128" stroke={C} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Arms by ears - extended */}
      <line x1="60" y1="120" x2="35" y2="112" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="112;110;112" dur="3s" repeatCount="indefinite" />
      </line>
      {/* Legs extended and lifted */}
      <line x1="120" y1="128" x2="165" y2="118" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="118;115;118" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="120" y1="128" x2="168" y2="122" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y2" values="122;119;122" dur="3s" repeatCount="indefinite" />
      </line>
      {/* Tension line showing hold */}
      <ellipse cx="95" cy="130" rx="30" ry="3" fill={C} opacity="0.1">
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

// ═══ 7. SINGLE LEG BRIDGE ═════════════════════════════════════
function SingleLegBridge() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}
      {/* Supine, hips lifted, one leg extended */}
      {head(50, 132)}
      {/* Torso lifted - bridge */}
      <line x1="58" y1="130" x2="105" y2="112" stroke={C} strokeWidth="3.5" strokeLinecap="round">
        <animate attributeName="y2" values="112;108;112" dur="2.5s" repeatCount="indefinite" />
      </line>
      {/* Grounded leg bent */}
      <line x1="105" y1="112" x2="120" y2="140" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y1" values="112;108;112" dur="2.5s" repeatCount="indefinite" />
      </line>
      {joint(120, 140)}
      {/* Extended leg up */}
      <line x1="105" y1="112" x2="140" y2="80" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y1" values="112;108;112" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y2" values="80;74;80" dur="2.5s" repeatCount="indefinite" />
      </line>
      {/* Arms flat */}
      {limb({ x1: 68, y1: 130, x2: 68, y2: 140 })}
      {limb({ x1: 82, y1: 125, x2: 82, y2: 140 })}
      {/* Glute activation */}
      <circle cx="100" cy="115" r="8" fill={C} opacity="0.1">
        <animate attributeName="r" values="8;11;8" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ═══ 8. ANTI-ROTATION PRESS ═══════════════════════════════════
function AntiRotation() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {floor()}
      {/* Standing figure */}
      {head(100, 30)}
      {body({ x1: 100, y1: 38, x2: 100, y2: 90 })}
      {/* Legs */}
      {limb({ x1: 100, y1: 90, x2: 88, y2: 143 })}
      {limb({ x1: 100, y1: 90, x2: 112, y2: 143 })}
      {/* Arms pressing out and rotating */}
      <line x1="100" y1="58" x2="140" y2="58" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="140;145;130;140" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="58;55;62;58" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Hands clasped */}
      <circle cx="140" cy="58" r="4" fill={C} opacity="0.3">
        <animate attributeName="cx" values="140;145;130;140" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="58;55;62;58" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Anti-rotation arrows around torso */}
      <path d="M88 70 C85 65 85 55 88 50" stroke={C} strokeWidth="1.2" fill="none" opacity="0.25" strokeDasharray="2 2">
        <animate attributeName="opacity" values="0.25;0.5;0.25" dur="4s" repeatCount="indefinite" />
      </path>
      <path d="M112 50 C115 55 115 65 112 70" stroke={C} strokeWidth="1.2" fill="none" opacity="0.25" strokeDasharray="2 2">
        <animate attributeName="opacity" values="0.25;0.5;0.25" dur="4s" repeatCount="indefinite" />
      </path>
      {joint(88, 143)}
      {joint(112, 143)}
    </svg>
  );
}

// ═══ 9. SPIRAL CRUNCH ═════════════════════════════════════════
function SpiralCrunch() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}
      {/* Supine, knees bent, curling with rotation */}
      {head(68, 108)}
      {/* Torso curling and rotating */}
      <path d="M75 114 Q92 122 110 128" stroke={C} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M75 114 Q92 122 110 128;M72 110 Q90 118 110 128;M75 114 Q92 122 110 128" dur="3s" repeatCount="indefinite" />
      </path>
      {/* Bent legs */}
      {limb({ x1: 110, y1: 128, x2: 130, y2: 108 })}
      {limb({ x1: 130, y1: 108, x2: 130, y2: 140 })}
      {limb({ x1: 110, y1: 128, x2: 145, y2: 110 })}
      {limb({ x1: 145, y1: 110, x2: 145, y2: 140 })}
      {/* Reaching arm - crossing to opposite knee */}
      <line x1="78" y1="112" x2="125" y2="108" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="125;130;125" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y2" values="108;104;108" dur="3s" repeatCount="indefinite" />
      </line>
      {/* Other arm behind head */}
      <line x1="72" y1="112" x2="58" y2="100" stroke={C} strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="y2" values="100;96;100" dur="3s" repeatCount="indefinite" />
      </line>
      {/* Spiral indicator */}
      <path d="M90 118 Q95 112 100 118 Q105 124 110 118" stroke={C} strokeWidth="1" fill="none" opacity="0.25">
        <animate attributeName="opacity" values="0.25;0.5;0.25" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// ═══ 10. PLANK TO DOWN DOG ════════════════════════════════════
function PlankDownDog() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {floor()}
      {/* Animates between plank and down dog */}
      {/* Head */}
      <circle cx="55" cy="95" r="8" fill={SKIN}>
        <animate attributeName="cy" values="95;70;95" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cx" values="55;75;55" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Torso */}
      <line x1="60" y1="100" x2="130" y2="100" stroke={C} strokeWidth="3.5" strokeLinecap="round">
        <animate attributeName="y1" values="100;78;100" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x1" values="60;80;60" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="100;110;100" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Arms */}
      <line x1="60" y1="100" x2="55" y2="143" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y1" values="100;78;100" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x1" values="60;80;60" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="55;75;55" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Legs */}
      <line x1="130" y1="100" x2="155" y2="143" stroke={C} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="y1" values="100;110;100" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="155;140;155" dur="4s" repeatCount="indefinite" />
      </line>
      {joint(55, 143)}
      <circle cx="155" cy="143" r="2.5" fill={C} opacity="0.4">
        <animate attributeName="cx" values="155;140;155" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ═══ 11. SUPINE INTEGRATION ═══════════════════════════════════
function SupineIntegration() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      {mat()}
      {/* Fully relaxed supine figure */}
      {head(50, 128)}
      {body({ x1: 58, y1: 128, x2: 115, y2: 128 })}
      {/* Legs extended */}
      {limb({ x1: 115, y1: 128, x2: 155, y2: 132 })}
      {limb({ x1: 115, y1: 128, x2: 158, y2: 126 })}
      {/* Arms relaxed at sides, palms up */}
      {limb({ x1: 72, y1: 128, x2: 65, y2: 140 })}
      {limb({ x1: 88, y1: 128, x2: 82, y2: 140 })}
      {/* Gentle glow - warmth in core */}
      <ellipse cx="95" cy="128" rx="20" ry="10" fill={C} opacity="0.08">
        <animate attributeName="rx" values="20;28;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="ry" values="10;15;10" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.15;0.08" dur="4s" repeatCount="indefinite" />
      </ellipse>
      {/* Breath indicator */}
      <g opacity="0.2">
        <circle cx="85" cy="120" r="3">
          <animate attributeName="r" values="3;5;3" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

// ═══ MAP STEP INDEX TO ILLUSTRATION ═══════════════════════════
const illustrations = [
  PelvicFloor,
  DeadBug,
  BirdDog,
  Hundred,
  SidePlank,
  HollowBody,
  SingleLegBridge,
  AntiRotation,
  SpiralCrunch,
  PlankDownDog,
  SupineIntegration,
];

export default function CoreStrengthIllustration({ stepIndex }) {
  const Illust = illustrations[stepIndex];
  if (!Illust) return null;
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 260,
        margin: "0 auto 8px",
        animation: "fadeIn 0.5s",
      }}
    >
      <Illust />
    </div>
  );
}

export { illustrations as coreStrengthIllustrations };
