import { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "../context/AppContext";

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 22) return "evening";
  return "night";
}

function classifyActivity(mag) {
  if (mag < 0.5) return "stationary";
  if (mag <= 2.5) return "walking";
  return "running";
}

export default function useContextualSensors() {
  const { contextSensors, setContextSensors } = useApp();
  const [activity, setActivity] = useState({ type: "stationary", since: Date.now() });
  const [location, setLocation] = useState({ type: null, name: null });
  const [steps, setSteps] = useState({ total: contextSensors.stepCount, sinceLast: 0 });
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay);
  const [permissions, setPermissions] = useState({
    motion: contextSensors.motion.permission,
    gps: contextSensors.gps.permission,
  });

  const activityRef = useRef(activity);
  const lastStepTime = useRef(0);
  const stepsAtLastExercise = useRef(contextSensors.stepCount);
  const gpsTimerRef = useRef(null);
  const motionCleanup = useRef(null);

  // Update time of day every 60s
  useEffect(() => {
    const id = setInterval(() => setTimeOfDay(getTimeOfDay()), 60000);
    return () => clearInterval(id);
  }, []);

  // Motion sensor
  useEffect(() => {
    if (!contextSensors.motion.enabled || permissions.motion === "denied") return;

    const handleMotion = (e) => {
      const a = e.accelerationIncludingGravity || {};
      const x = (a.x || 0);
      const y = (a.y || 0);
      const z = (a.z || 0);
      // Subtract gravity (~9.8) from magnitude
      const mag = Math.abs(Math.sqrt(x * x + y * y + z * z) - 9.8);
      const type = classifyActivity(mag);

      // Step detection: peak on y-axis with debounce
      if (mag > 0.8 && Date.now() - lastStepTime.current > 250) {
        lastStepTime.current = Date.now();
        setSteps((prev) => {
          const newTotal = prev.total + 1;
          setContextSensors((s) => ({ ...s, stepCount: newTotal }));
          return { total: newTotal, sinceLast: newTotal - stepsAtLastExercise.current };
        });
      }

      setActivity((prev) => {
        if (prev.type !== type) {
          const next = { type, since: Date.now(), prevType: prev.type, prevDuration: Date.now() - prev.since };
          activityRef.current = next;
          return next;
        }
        return prev;
      });
    };

    window.addEventListener("devicemotion", handleMotion);
    motionCleanup.current = () => window.removeEventListener("devicemotion", handleMotion);
    return () => {
      if (motionCleanup.current) motionCleanup.current();
    };
  }, [contextSensors.motion.enabled, permissions.motion, setContextSensors]);

  // GPS polling
  useEffect(() => {
    if (!contextSensors.gps.enabled || permissions.gps === "denied") return;
    if (!navigator.geolocation) return;

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          // Check if near home
          if (contextSensors.homeLocation) {
            const d = haversine(latitude, longitude, contextSensors.homeLocation.lat, contextSensors.homeLocation.lon);
            if (d < 0.1) { // within 100m
              setLocation({ type: "home", name: "Home" });
              return;
            }
          }
          // Reverse geocode via Nominatim
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=16`,
              { headers: { "User-Agent": "SparkWellnessApp/1.0" } }
            );
            const data = await res.json();
            const type = classifyLocation(data);
            setLocation({ type, name: data.display_name?.split(",")[0] || type });
          } catch {
            setLocation({ type: "urban", name: "Unknown" });
          }
        },
        () => {}, // silent fail on position error
        { enableHighAccuracy: false, timeout: 10000 }
      );
    };

    fetchLocation();
    gpsTimerRef.current = setInterval(fetchLocation, 30000);
    return () => clearInterval(gpsTimerRef.current);
  }, [contextSensors.gps.enabled, permissions.gps, contextSensors.homeLocation]);

  // Pause sensors when backgrounded
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (motionCleanup.current) motionCleanup.current();
        if (gpsTimerRef.current) clearInterval(gpsTimerRef.current);
      }
      // Sensors will re-init on next render cycle when visible
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Battery optimization
  useEffect(() => {
    if (!navigator.getBattery) return;
    let cancelled = false;
    navigator.getBattery().then((battery) => {
      if (cancelled) return;
      const check = () => {
        if (battery.level < 0.15 && !battery.charging) {
          setContextSensors((s) => ({
            ...s,
            motion: { ...s.motion, enabled: false },
            gps: { ...s.gps, enabled: false },
          }));
        }
      };
      battery.addEventListener("levelchange", check);
      check();
    });
    return () => { cancelled = true; };
  }, [setContextSensors]);

  const requestMotionPermission = useCallback(async () => {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const result = await DeviceMotionEvent.requestPermission();
        const granted = result === "granted";
        setPermissions((p) => ({ ...p, motion: granted ? "granted" : "denied" }));
        setContextSensors((s) => ({
          ...s,
          motion: { enabled: granted, permission: granted ? "granted" : "denied" },
        }));
        return granted;
      } catch {
        setPermissions((p) => ({ ...p, motion: "denied" }));
        return false;
      }
    }
    // Non-iOS: permission not needed
    setPermissions((p) => ({ ...p, motion: "granted" }));
    setContextSensors((s) => ({
      ...s,
      motion: { enabled: true, permission: "granted" },
    }));
    return true;
  }, [setContextSensors]);

  const requestGpsPermission = useCallback(async () => {
    if (!navigator.geolocation) {
      setPermissions((p) => ({ ...p, gps: "denied" }));
      return false;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissions((p) => ({ ...p, gps: "granted" }));
          setContextSensors((s) => ({
            ...s,
            gps: { enabled: true, permission: "granted" },
          }));
          resolve(true);
        },
        () => {
          setPermissions((p) => ({ ...p, gps: "denied" }));
          setContextSensors((s) => ({
            ...s,
            gps: { ...s.gps, permission: "denied" },
          }));
          resolve(false);
        }
      );
    });
  }, [setContextSensors]);

  const setHomeLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setContextSensors((s) => ({
        ...s,
        homeLocation: { lat: pos.coords.latitude, lon: pos.coords.longitude },
      }));
      setLocation({ type: "home", name: "Home" });
    });
  }, [setContextSensors]);

  // Mark when exercise is completed so we can track steps since last exercise
  const markExerciseDone = useCallback(() => {
    stepsAtLastExercise.current = steps.total;
    setSteps((prev) => ({ ...prev, sinceLast: 0 }));
  }, [steps.total]);

  return {
    activity,
    location,
    steps,
    timeOfDay,
    permissions,
    requestMotionPermission,
    requestGpsPermission,
    setHomeLocation,
    markExerciseDone,
  };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function classifyLocation(data) {
  const type = (data.type || "").toLowerCase();
  const cls = (data.class || "").toLowerCase();
  const name = (data.display_name || "").toLowerCase();
  if (cls === "leisure" && (type.includes("park") || type.includes("garden"))) return "park";
  if (type.includes("trail") || type.includes("path") || name.includes("trail")) return "trail";
  if (cls === "natural" || type.includes("forest") || type.includes("wood")) return "trail";
  return "urban";
}
