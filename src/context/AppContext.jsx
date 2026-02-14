import { createContext, useContext, useState, useEffect, useRef } from "react";
import { notifCategories } from "../data/notifications";

const AppContext = createContext(null);

const STORAGE_KEY = "dora_wellness";

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Reset doneToday if saved date isn't today
    const today = new Date().toISOString().slice(0, 10);
    if (data.savedDate !== today) {
      data.doneToday = [];
    }
    return data;
  } catch {
    return null;
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      savedDate: new Date().toISOString().slice(0, 10),
    }));
  } catch { /* storage full or unavailable */ }
}

const defaultNotifs = Object.fromEntries(notifCategories.map((n) => [n.id, n.d]));

export function AppProvider({ children }) {
  const saved = useRef(loadSaved()).current;

  const [screen, setScreen] = useState(saved?.profile ? "app" : "intake");
  const [tab, setTab] = useState(saved?.tab || "home");
  const [modal, setModal] = useState(null);
  const [profile, setProfile] = useState(saved?.profile || null);
  const [tier, setTier] = useState(saved?.tier || "free");
  const [doneToday, setDoneToday] = useState(saved?.doneToday || []);
  const [doneAll, setDoneAll] = useState(saved?.doneAll || []);
  const [streak, setStreak] = useState(saved?.streak || 0);
  const [notifs, setNotifs] = useState(saved?.notifs || defaultNotifs);
  const [journal, setJournal] = useState(saved?.journal || []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Persist on every state change
  useEffect(() => {
    if (!mounted) return;
    save({ profile, tier, doneToday, doneAll, streak, notifs, journal, tab });
  }, [profile, tier, doneToday, doneAll, streak, notifs, journal, tab, mounted]);

  const completeExercise = (id) => {
    if (!doneToday.includes(id)) {
      setDoneToday((p) => [...p, id]);
      setDoneAll((p) => [...p, { id, dt: new Date().toISOString() }]);
      setStreak((s) => s + 1);
    }
  };

  const value = {
    screen, setScreen,
    tab, setTab,
    modal, setModal,
    profile, setProfile,
    tier, setTier,
    doneToday, setDoneToday,
    doneAll, setDoneAll,
    streak, setStreak,
    notifs, setNotifs,
    journal, setJournal,
    mounted,
    completeExercise,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
