import { createContext, useContext, useState, useEffect } from "react";
import { notifCategories } from "../data/notifications";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [screen, setScreen] = useState("intake");
  const [tab, setTab] = useState("home");
  const [modal, setModal] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tier, setTier] = useState("free");
  const [doneToday, setDoneToday] = useState([]);
  const [doneAll, setDoneAll] = useState([]);
  const [streak, setStreak] = useState(0);
  const [notifs, setNotifs] = useState(
    Object.fromEntries(notifCategories.map((n) => [n.id, n.d]))
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    mounted,
    completeExercise,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
