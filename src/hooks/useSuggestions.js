import { useState, useEffect, useCallback, useRef } from "react";
import { useApp } from "../context/AppContext";
import { EX } from "../data/exercises";

const COOLDOWN_DISMISSED = 2 * 60 * 60 * 1000; // 2 hours
const COOLDOWN_SHOWN = 30 * 60 * 1000; // 30 minutes
const HISTORY_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const rules = [
  {
    id: "morning_routine",
    priority: 9,
    exercise: EX.selfaware,
    message: "Start your day with a check-in",
    test: (ctx, app) =>
      ctx.timeOfDay === "morning" && !app.doneToday.includes("selfaware"),
  },
  {
    id: "post_walk",
    priority: 8,
    exercise: EX.barefoot,
    message: "Great walk! Ground yourself barefoot",
    test: (ctx) =>
      ctx.steps.sinceLast > 1000 && ctx.activity.type === "stationary",
  },
  {
    id: "post_run",
    priority: 8,
    exercise: EX.stretch,
    message: "Cool down with active stretching",
    test: (ctx) =>
      ctx.activity.prevType === "running" &&
      ctx.activity.type === "stationary" &&
      (ctx.activity.prevDuration || 0) > 5 * 60 * 1000,
  },
  {
    id: "sedentary_alert",
    priority: 7,
    exercise: EX.sensory,
    message: "You've been still a while — awaken your senses",
    test: (ctx) =>
      ctx.activity.type === "stationary" &&
      Date.now() - ctx.activity.since > 90 * 60 * 1000,
  },
  {
    id: "park_location",
    priority: 6,
    exercise: EX.playful,
    message: "Perfect spot for playful movement",
    test: (ctx) => ctx.location.type === "park",
  },
  {
    id: "trail_location",
    priority: 6,
    exercise: EX.somatic,
    message: "Nature setting — try somatic release",
    test: (ctx) => ctx.location.type === "trail",
  },
  {
    id: "evening_winddown",
    priority: 5,
    exercise: EX.meditation,
    message: "Wind down with a body scan",
    test: (ctx, app) =>
      ctx.timeOfDay === "evening" && !app.doneToday.includes("meditation"),
  },
  {
    id: "streak_protection",
    priority: 9,
    exercise: EX.selfaware,
    message: "Keep your streak alive — quick check-in",
    test: (ctx, app) =>
      ctx.timeOfDay === "night" &&
      app.doneToday.length === 0 &&
      app.streak > 3,
  },
  {
    id: "quiet_home_evening",
    priority: 4,
    exercise: EX.meditation,
    message: "Quiet evening at home — perfect for meditation",
    test: (ctx) =>
      ctx.location.type === "home" &&
      ctx.timeOfDay === "evening" &&
      ctx.activity.type === "stationary",
  },
  {
    id: "urban_walking",
    priority: 3,
    exercise: EX.attention,
    message: "Practice attention while walking",
    test: (ctx) =>
      ctx.activity.type === "walking" && ctx.location.type === "urban",
  },
];

export default function useSuggestions(context) {
  const { doneToday, streak, notifs, suggestionHistory, setSuggestionHistory, setModal } = useApp();
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const dismissTimerRef = useRef(null);

  // Prune old history on load
  useEffect(() => {
    const cutoff = Date.now() - HISTORY_MAX_AGE;
    setSuggestionHistory((h) => {
      const pruned = h.filter((e) => e.time > cutoff);
      return pruned.length !== h.length ? pruned : h;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Evaluate rules every 5s
  useEffect(() => {
    if (!context) return;
    // If context suggestions are off, don't show
    if (notifs.context === 0) return;

    const evaluate = () => {
      const now = Date.now();
      const appState = { doneToday, streak };

      // Find highest-priority matching rule
      let best = null;
      for (const rule of rules) {
        try {
          if (!rule.test(context, appState)) continue;
        } catch {
          continue;
        }

        // Check cooldowns
        const lastEntry = suggestionHistory
          .filter((e) => e.ruleId === rule.id)
          .sort((a, b) => b.time - a.time)[0];

        if (lastEntry) {
          const cooldown = lastEntry.action === "dismiss" ? COOLDOWN_DISMISSED : COOLDOWN_SHOWN;
          if (now - lastEntry.time < cooldown) continue;
        }

        if (!best || rule.priority > best.priority) {
          best = rule;
        }
      }

      if (best && (!currentSuggestion || currentSuggestion.ruleId !== best.id)) {
        const suggestion = {
          ruleId: best.id,
          exercise: best.exercise,
          message: best.message,
          priority: best.priority,
          shownAt: now,
        };
        setCurrentSuggestion(suggestion);

        // Record shown
        setSuggestionHistory((h) => [...h, { ruleId: best.id, action: "shown", time: now }]);

        // Auto-dismiss after 8s
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = setTimeout(() => {
          setCurrentSuggestion((cur) => (cur?.ruleId === best.id ? null : cur));
        }, 8000);
      }
    };

    const id = setInterval(evaluate, 5000);
    evaluate(); // run immediately
    return () => {
      clearInterval(id);
      clearTimeout(dismissTimerRef.current);
    };
  }, [context, doneToday, streak, notifs.context, suggestionHistory, setSuggestionHistory, currentSuggestion]);

  const acceptSuggestion = useCallback(() => {
    if (!currentSuggestion) return;
    setSuggestionHistory((h) => [...h, { ruleId: currentSuggestion.ruleId, action: "accept", time: Date.now() }]);
    setModal({ t: "detail", d: currentSuggestion.exercise });
    setCurrentSuggestion(null);
    clearTimeout(dismissTimerRef.current);
  }, [currentSuggestion, setSuggestionHistory, setModal]);

  const dismissSuggestion = useCallback(() => {
    if (!currentSuggestion) return;
    setSuggestionHistory((h) => [...h, { ruleId: currentSuggestion.ruleId, action: "dismiss", time: Date.now() }]);
    setCurrentSuggestion(null);
    clearTimeout(dismissTimerRef.current);
  }, [currentSuggestion, setSuggestionHistory]);

  return { currentSuggestion, acceptSuggestion, dismissSuggestion };
}
