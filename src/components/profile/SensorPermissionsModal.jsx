import React from "react";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";

export default function SensorPermissionsModal({ onClose, onRequestMotion, onRequestGps, onSetHome }) {
  const { contextSensors, setContextSensors, setSuggestionHistory } = useApp();

  const motionStatus = contextSensors.motion.permission === "denied"
    ? "Permission denied"
    : contextSensors.motion.enabled ? "Enabled" : "Disabled";

  const gpsStatus = contextSensors.gps.permission === "denied"
    ? "Permission denied"
    : contextSensors.gps.enabled ? "Enabled" : "Disabled";

  const toggleMotion = async () => {
    if (contextSensors.motion.enabled) {
      setContextSensors((s) => ({ ...s, motion: { ...s.motion, enabled: false } }));
    } else {
      if (onRequestMotion) await onRequestMotion();
    }
  };

  const toggleGps = async () => {
    if (contextSensors.gps.enabled) {
      setContextSensors((s) => ({ ...s, gps: { ...s.gps, enabled: false } }));
    } else {
      if (onRequestGps) await onRequestGps();
    }
  };

  const clearHistory = () => {
    setSuggestionHistory([]);
    setContextSensors((s) => ({ ...s, stepCount: 0, stepResetDate: new Date().toISOString().slice(0, 10) }));
  };

  const statusColor = (enabled, permission) => {
    if (permission === "denied") return T.cl;
    return enabled ? T.sg : T.txL;
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <Icon n="shield" s={22} c={T.pl} />
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: 0, flex: 1 }}>Context & Privacy</h2>
        <button onClick={onClose} style={{ background: T.bgW, border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Icon n="close" s={18} c={T.txM} />
        </button>
      </div>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 24px", lineHeight: 1.5 }}>
        Enable sensors for personalized exercise suggestions based on your activity.
      </p>

      {/* Motion toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${T.bgW}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: T.oc + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n="walk" s={20} c={T.oc} />
          </div>
          <div>
            <span style={{ fontWeight: 600, color: T.tx, fontSize: 15 }}>Motion tracking</span>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: statusColor(contextSensors.motion.enabled, contextSensors.motion.permission) }}>{motionStatus}</p>
          </div>
        </div>
        <button
          onClick={toggleMotion}
          style={{
            width: 50, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
            background: contextSensors.motion.enabled ? T.ac : T.bgW,
            position: "relative", transition: "background 0.2s",
          }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 11, background: "#fff", boxShadow: T.sh,
            position: "absolute", top: 3,
            left: contextSensors.motion.enabled ? 25 : 3,
            transition: "left 0.2s",
          }} />
        </button>
      </div>

      {/* GPS toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${T.bgW}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: T.sg + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n="location" s={20} c={T.sg} />
          </div>
          <div>
            <span style={{ fontWeight: 600, color: T.tx, fontSize: 15 }}>GPS location</span>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: statusColor(contextSensors.gps.enabled, contextSensors.gps.permission) }}>{gpsStatus}</p>
          </div>
        </div>
        <button
          onClick={toggleGps}
          style={{
            width: 50, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
            background: contextSensors.gps.enabled ? T.ac : T.bgW,
            position: "relative", transition: "background 0.2s",
          }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 11, background: "#fff", boxShadow: T.sh,
            position: "absolute", top: 3,
            left: contextSensors.gps.enabled ? 25 : 3,
            transition: "left 0.2s",
          }} />
        </button>
      </div>

      {/* Set Home Location */}
      {contextSensors.gps.enabled && (
        <button
          onClick={onSetHome}
          style={{
            width: "100%", padding: "12px 16px", marginTop: 16, border: `1.5px solid ${T.sg}30`,
            borderRadius: 12, background: T.sg + "08", color: T.sg, fontSize: 14,
            fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Icon n="home" s={16} c={T.sg} />
          {contextSensors.homeLocation ? "Update Home Location" : "Set Home Location"}
        </button>
      )}

      {/* Privacy statement */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, padding: "14px 16px", background: T.pl + "08", borderRadius: 12 }}>
        <Icon n="shield" s={18} c={T.pl} />
        <p style={{ color: T.txM, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
          All context data stays on your device. Nothing is sent to any server.
        </p>
      </div>

      {/* Clear history */}
      <button
        onClick={clearHistory}
        style={{
          width: "100%", padding: "12px 16px", marginTop: 12, border: `1.5px solid ${T.cl}30`,
          borderRadius: 12, background: "transparent", color: T.cl, fontSize: 14,
          fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans'",
        }}
      >
        Clear Sensor History
      </button>
    </Modal>
  );
}
