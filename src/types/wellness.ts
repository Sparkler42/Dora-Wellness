export interface WellnessMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

export interface DailyCheckIn {
  date: string;
  mood: MoodLevel;
  energy: number;
  focus: number;
  notes: string;
}

export type MoodLevel = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export interface WellnessGoal {
  id: string;
  title: string;
  description: string;
  category: WellnessCategory;
  progress: number;
  target: number;
  streak: number;
}

export type WellnessCategory = 'mind' | 'body' | 'energy';

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: WellnessCategory;
  trend: 'up' | 'down' | 'stable';
  value: string;
}
