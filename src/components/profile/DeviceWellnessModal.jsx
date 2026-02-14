import { useState, useEffect, useCallback } from "react";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";

function fmt(min) {
  if (min < 1) return "< 1m";
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getToday(sessions) {
  const d = todayStr();
  return sessions.filter((s) => s.date === d);
}

function getYesterday(sessions) {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const d = y.toISOString().slice(0, 10);
  return sessions.filter((s) => s.date === d);
}

function getWeek(sessions) {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const cutoff = weekAgo.toISOString().slice(0, 10);
  return sessions.filter((s) => s.date >= cutoff);
}

export default function DeviceWellnessModal({ onClose }) {
  const { deviceUsage, setDeviceUsage } = useApp();
  const [battery, setBattery] = useState(null);
  const [connection, setConnection] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [goalInput, setGoalInput] = useState(String(deviceUsage.dailyGoal || 120));

  const enabled = deviceUsage.enabled;
  const sessions = deviceUsage.sessions || [];

  // Live clock for current session
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(id);
  }, [enabled]);

  // Battery API
  useEffect(() => {
    if (!navigator.getBattery) return;
    let batt = null;
    const update = () => {
      if (batt) setBattery({ level: Math.round(batt.level * 100), charging: batt.charging });
    };
    navigator.getBattery().then((b) => {
      batt = b;
      update();
      b.addEventListener("levelchange", update);
      b.addEventListener("chargingchange", update);
    });
    return () => {
      if (batt) {
        batt.removeEventListener("levelchange", update);
        batt.removeEventListener("chargingchange", update);
      }
    };
  }, []);

  // Network info
  useEffect(() => {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return;
    const update = () => setConnection({ type: c.effectiveType, downlink: c.downlink, saveData: c.saveData });
    update();
    c.addEventListener("change", update);
    return () => c.removeEventListener("change", update);
  }, []);

  // Track session on enable — record opens via visibility
  const recordSession = useCallback(() => {
    if (!enabled) return;
    setDeviceUsage((prev) => {
      const s = { date: todayStr(), time: new Date().toISOString(), dur: 0 };
      return { ...prev, sessions: [...prev.sessions, s] };
    });
    setCurrentSession(Date.now());
  }, [enabled, setDeviceUsage]);

  useEffect(() => {
    if (!enabled) return;

    // Record initial open
    if (!currentSession) {
      recordSession();
    }

    const onVis = () => {
      if (document.visibilityState === "visible") {
        recordSession();
      } else if (currentSession) {
        // Close current session with duration
        const dur = Math.round((Date.now() - currentSession) / 60000);
        setDeviceUsage((prev) => {
          const updated = [...prev.sessions];
          if (updated.length > 0) {
            updated[updated.length - 1] = { ...updated[updated.length - 1], dur };
          }
          return { ...prev, sessions: updated };
        });
        setCurrentSession(null);
      }
    };

    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [enabled, currentSession, recordSession, setDeviceUsage]);

  const enableTracking = () => {
    setDeviceUsage((prev) => ({
      ...prev,
      enabled: true,
      sessions: [...prev.sessions, { date: todayStr(), time: new Date().toISOString(), dur: 0 }],
    }));
    setCurrentSession(Date.now());
  };

  const disableTracking = () => {
    setDeviceUsage((prev) => ({ ...prev, enabled: false }));
    setCurrentSession(null);
  };

  const updateGoal = () => {
    const v = parseInt(goalInput, 10);
    if (v > 0) setDeviceUsage((prev) => ({ ...prev, dailyGoal: v }));
  };

  const clearHistory = () => {
    setDeviceUsage((prev) => ({ ...prev, sessions: [] }));
  };

  // Compute metrics
  const todaySessions = getToday(sessions);
  const yesterdaySessions = getYesterday(sessions);
  const weekSessions = getWeek(sessions);

  const todayTotal = todaySessions.reduce((s, x) => s + (x.dur || 0), 0) +
    (currentSession ? Math.round((now - currentSession) / 60000) : 0);
  const yesterdayTotal = yesterdaySessions.reduce((s, x) => s + (x.dur || 0), 0);
  const todayOpens = todaySessions.length;
  const yesterdayOpens = yesterdaySessions.length;
  const longestToday = Math.max(0, ...todaySessions.map((s) => s.dur || 0),
    currentSession ? Math.round((now - currentSession) / 60000) : 0);

  const weekDays = {};
  weekSessions.forEach((s) => {
    weekDays[s.date] = (weekDays[s.date] || 0) + (s.dur || 0);
  });
  const weekDayValues = Object.values(weekDays);
  const weekAvg = weekDayValues.length > 0 ? Math.round(weekDayValues.reduce((a, b) => a + b, 0) / weekDayValues.length) : 0;

  const dailyGoal = deviceUsage.dailyGoal || 120;
  const goalPct = Math.min(100, Math.round((todayTotal / dailyGoal) * 100));
  const overGoal = todayTotal > dailyGoal;

  const firstOpen = todaySessions.length > 0 ? new Date(todaySessions[0].time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "\u2014";

  // Build metrics cards
  const metrics = [];
  if (enabled) {
    metrics.push({
      m: "Screen time today", v: fmt(todayTotal),
      n: yesterdayTotal > 0
        ? todayTotal < yesterdayTotal
          ? `${fmt(yesterdayTotal - todayTotal)} less than yesterday`
          : `${fmt(todayTotal - yesterdayTotal)} more than yesterday`
        : "Tracking started",
      g: yesterdayTotal === 0 || todayTotal <= yesterdayTotal,
    });
    metrics.push({
      m: "App opens today", v: String(todayOpens),
      n: yesterdayOpens > 0
        ? todayOpens <= yesterdayOpens
          ? `Down from ${yesterdayOpens} yesterday`
          : `Up from ${yesterdayOpens} yesterday`
        : "First day tracking",
      g: yesterdayOpens === 0 || todayOpens <= yesterdayOpens,
    });
    metrics.push({
      m: "Longest session", v: fmt(longestToday),
      n: longestToday > 30 ? "Try a movement break after 30 min" : "Good \u2014 keeping sessions short",
      g: longestToday <= 30,
    });
    metrics.push({
      m: "First open today", v: firstOpen,
      n: todaySessions.length > 0 && new Date(todaySessions[0].time).getHours() < 7
        ? "Early riser \u2014 try a morning practice first"
        : "Try: morning practice before screen",
      g: todaySessions.length > 0 && new Date(todaySessions[0].time).getHours() >= 7,
    });
    metrics.push({
      m: "7-day average", v: fmt(weekAvg),
      n: `Across ${weekDayValues.length} day${weekDayValues.length !== 1 ? "s" : ""} tracked`,
      g: weekAvg <= dailyGoal,
    });
  }

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <Icon n="phone" s={22} c={T.oc} />
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: 0 }}>Device Wellness</h2>
      </div>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 6px", lineHeight: 1.5 }}>
        When you notice the urge for your phone, pause and feel the underlying state. Ask: <em>&ldquo;What does my body-mind actually need?&rdquo;</em>
      </p>
      <p style={{ color: T.txL, fontSize: 13, margin: "0 0 20px", fontStyle: "italic" }}>
        &mdash; David&rsquo;s attention practice
      </p>

      {/* Enable / Disable tracking */}
      {!enabled ? (
        <div style={{ background: T.ocG, borderRadius: 16, padding: 20, marginBottom: 20, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: T.oc + "20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Icon n="phone" s={28} c={T.oc} />
          </div>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: T.tx, margin: "0 0 8px" }}>Enable Device Tracking</h3>
          <p style={{ color: T.txM, fontSize: 13, lineHeight: 1.6, margin: "0 0 16px" }}>
            Track how often and how long you use this app. Monitor screen time, session lengths, open frequency, and set daily goals. All data stays on your device.
          </p>
          <button
            onClick={enableTracking}
            style={{
              padding: "14px 28px", border: "none", borderRadius: 14,
              background: `linear-gradient(135deg,${T.oc},${T.ac})`,
              color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'",
            }}
          >
            Start Tracking
          </button>
        </div>
      ) : (
        <>
          {/* Status banner */}
          <div style={{ background: T.sgG, borderRadius: 14, padding: 14, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon n="check" s={16} c={T.sg} />
              <span style={{ color: T.sg, fontSize: 13, fontWeight: 600 }}>Tracking Active</span>
            </div>
            <button
              onClick={disableTracking}
              style={{ background: "none", border: "none", color: T.txL, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'", textDecoration: "underline" }}
            >
              Pause
            </button>
          </div>

          {/* Daily goal progress */}
          <div style={{ background: T.bgC, borderRadius: 16, padding: 18, boxShadow: T.sh, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: T.txM }}>Daily Goal</span>
              <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: overGoal ? T.cl : T.sg }}>
                {fmt(todayTotal)} / {fmt(dailyGoal)}
              </span>
            </div>
            <div style={{ height: 8, background: T.bgW, borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: 8, borderRadius: 4, transition: "width 0.5s ease",
                width: `${goalPct}%`,
                background: overGoal ? T.cl : `linear-gradient(90deg,${T.sg},${T.oc})`,
              }} />
            </div>
            <p style={{ fontSize: 12, color: overGoal ? T.cl : T.sg, margin: "6px 0 0" }}>
              {overGoal ? `${fmt(todayTotal - dailyGoal)} over goal` : goalPct < 100 ? `${fmt(dailyGoal - todayTotal)} remaining` : "Goal reached"}
            </p>
          </div>

          {/* Live metrics */}
          {metrics.map((d, i) => (
            <div key={i} style={{ background: T.bgC, borderRadius: 14, padding: "14px 16px", boxShadow: T.sh, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ color: T.txM, fontSize: 13 }}>{d.m}</span>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: T.tx }}>{d.v}</span>
              </div>
              <p style={{ color: d.g ? T.sg : T.cl, fontSize: 13, margin: 0 }}>{d.n}</p>
            </div>
          ))}
        </>
      )}

      {/* Device info section */}
      {(battery || connection) && (
        <div style={{ marginTop: 6 }}>
          <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: T.tx, margin: "0 0 10px" }}>Device Info</h4>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {battery && (
              <div style={{ flex: 1, minWidth: 120, background: T.bgC, borderRadius: 12, padding: "12px 14px", boxShadow: T.sh }}>
                <p style={{ color: T.txL, fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px" }}>Battery</p>
                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: battery.level < 20 ? T.cl : T.sg, margin: "0 0 2px" }}>
                  {battery.level}%
                </p>
                <p style={{ color: T.txL, fontSize: 12, margin: 0 }}>{battery.charging ? "Charging" : "On battery"}</p>
              </div>
            )}
            {connection && (
              <div style={{ flex: 1, minWidth: 120, background: T.bgC, borderRadius: 12, padding: "12px 14px", boxShadow: T.sh }}>
                <p style={{ color: T.txL, fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px" }}>Network</p>
                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: T.oc, margin: "0 0 2px" }}>
                  {(connection.type || "unknown").toUpperCase()}
                </p>
                <p style={{ color: T.txL, fontSize: 12, margin: 0 }}>
                  {connection.downlink ? `${connection.downlink} Mbps` : ""}{connection.saveData ? " \u00B7 Data saver on" : ""}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings when enabled */}
      {enabled && (
        <div style={{ marginTop: 16 }}>
          <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: T.tx, margin: "0 0 10px" }}>Settings</h4>
          <div style={{ background: T.bgC, borderRadius: 14, padding: 16, boxShadow: T.sh, marginBottom: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flex: 1, fontSize: 14, color: T.txM }}>Daily screen time goal (minutes)</span>
              <input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                onBlur={updateGoal}
                onKeyDown={(e) => e.key === "Enter" && updateGoal()}
                min="1"
                style={{
                  width: 70, padding: "8px 10px", borderRadius: 10,
                  border: `1.5px solid ${T.bgW}`, background: T.bg,
                  fontSize: 16, fontFamily: "'DM Serif Display',serif",
                  color: T.tx, textAlign: "center", outline: "none",
                }}
              />
            </label>
          </div>
          <button
            onClick={clearHistory}
            style={{
              width: "100%", padding: "12px", border: `1.5px solid ${T.bgW}`,
              borderRadius: 12, background: T.bgC, color: T.txL, fontSize: 13,
              cursor: "pointer", fontFamily: "'DM Sans'",
            }}
          >
            Clear Tracking History
          </button>
        </div>
      )}

      {/* Suggestion */}
      <div style={{ marginTop: 16, background: T.acG, borderRadius: 14, padding: 16 }}>
        <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: T.tx, margin: "0 0 8px" }}>Mindful Suggestion</h4>
        <p style={{ color: T.txM, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          {enabled && longestToday > 30
            ? `Your longest session today is ${fmt(longestToday)}. Next time you hit 30 minutes, try pausing for a 5-minute Active Stretching or Sensory Observation break.`
            : enabled && todayOpens > 10
              ? `You\u2019ve opened the app ${todayOpens} times today. Before your next open, try one conscious breath and ask: what do I actually need right now?`
              : "Each time you reach for your device, pause for one breath. Feel what\u2019s underneath the impulse. Sometimes the body just wants movement, connection, or stillness."
          }
        </p>
      </div>
    </Modal>
  );
}
