import { ChevronRight } from 'lucide-react';
import type { WellnessGoal } from '../../types/wellness';

interface GoalCardProps {
  goal: WellnessGoal;
  icon: React.ReactNode;
  onIncrement: () => void;
}

const categoryColors: Record<string, string> = {
  mind: 'bg-sage-100 text-sage-700',
  body: 'bg-sage-200 text-sage-800',
  energy: 'bg-spark-warm text-spark-orange',
};

export default function GoalCard({ goal, icon, onIncrement }: GoalCardProps) {
  const pct = Math.round((goal.progress / goal.target) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${categoryColors[goal.category]}`}>
            {icon}
          </div>
          <div>
            <p className="font-semibold text-sage-900">{goal.title}</p>
            <p className="text-xs text-sage-400">{goal.description}</p>
          </div>
        </div>
        <button
          onClick={onIncrement}
          className="p-1 rounded-lg hover:bg-sage-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-sage-400" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-sage-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs font-medium text-sage-500">
          {goal.progress}/{goal.target}
        </span>
      </div>

      {goal.streak > 0 && (
        <p className="text-xs text-spark-orange mt-2">
          {goal.streak} day streak
        </p>
      )}
    </div>
  );
}
