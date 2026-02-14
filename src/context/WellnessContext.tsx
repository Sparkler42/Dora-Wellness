import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DailyCheckIn, MoodLevel, WellnessGoal } from '../types/wellness';

interface WellnessState {
  checkIns: DailyCheckIn[];
  goals: WellnessGoal[];
  currentStreak: number;
}

interface WellnessContextType {
  state: WellnessState;
  addCheckIn: (checkIn: DailyCheckIn) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  todaysMood: MoodLevel | null;
}

const WellnessContext = createContext<WellnessContextType | null>(null);

const initialGoals: WellnessGoal[] = [
  {
    id: 'mindfulness',
    title: 'Daily Mindfulness',
    description: 'Practice mindfulness or meditation',
    category: 'mind',
    progress: 4,
    target: 7,
    streak: 4,
  },
  {
    id: 'movement',
    title: 'Stay Active',
    description: 'Get at least 30 minutes of movement',
    category: 'body',
    progress: 5,
    target: 7,
    streak: 5,
  },
  {
    id: 'energy',
    title: 'Energy Balance',
    description: 'Maintain consistent energy throughout the day',
    category: 'energy',
    progress: 3,
    target: 7,
    streak: 3,
  },
];

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WellnessState>({
    checkIns: [],
    goals: initialGoals,
    currentStreak: 4,
  });

  const addCheckIn = (checkIn: DailyCheckIn) => {
    setState((prev) => ({
      ...prev,
      checkIns: [...prev.checkIns, checkIn],
      currentStreak: prev.currentStreak + 1,
    }));
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setState((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId ? { ...g, progress: Math.min(progress, g.target) } : g
      ),
    }));
  };

  const todaysMood =
    state.checkIns.length > 0
      ? state.checkIns[state.checkIns.length - 1].mood
      : null;

  return (
    <WellnessContext.Provider
      value={{ state, addCheckIn, updateGoalProgress, todaysMood }}
    >
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const ctx = useContext(WellnessContext);
  if (!ctx) throw new Error('useWellness must be used within WellnessProvider');
  return ctx;
}
