import { Brain, Heart, Zap, Plus } from 'lucide-react';
import GoalCard from '../components/ui/GoalCard';
import { useWellness } from '../context/WellnessContext';

const categoryIcons: Record<string, React.ReactNode> = {
  mind: <Brain className="w-5 h-5" />,
  body: <Heart className="w-5 h-5" />,
  energy: <Zap className="w-5 h-5" />,
};

export default function GoalsPage() {
  const { state, updateGoalProgress } = useWellness();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-sage-800">Your Goals</h1>
        <button className="flex items-center gap-1 text-sm text-sage-500 bg-white rounded-xl px-3 py-2 shadow-sm border border-sage-100 hover:bg-sage-50 transition-colors">
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      <div className="space-y-3">
        {state.goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            icon={categoryIcons[goal.category]}
            onIncrement={() =>
              updateGoalProgress(goal.id, goal.progress + 1)
            }
          />
        ))}
      </div>
    </div>
  );
}
