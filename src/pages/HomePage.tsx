import { Brain, Heart, Zap } from 'lucide-react';
import GrowingTree from '../components/animations/GrowingTree';
import MetricCard from '../components/ui/MetricCard';
import GoalCard from '../components/ui/GoalCard';
import { useWellness } from '../context/WellnessContext';

const categoryIcons: Record<string, React.ReactNode> = {
  mind: <Brain className="w-5 h-5" />,
  body: <Heart className="w-5 h-5" />,
  energy: <Zap className="w-5 h-5" />,
};

export default function HomePage() {
  const { state, updateGoalProgress } = useWellness();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center">
        <GrowingTree />
        <h1 className="text-2xl font-bold text-sage-800 mt-2">Spark</h1>
        <p className="text-sage-500 text-sm">Nurture your wellbeing</p>
      </header>

      {/* Streak banner */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100 text-center">
        <p className="text-spark-orange font-semibold text-lg">
          {state.currentStreak} day streak
        </p>
        <p className="text-sage-400 text-xs">Keep it going!</p>
      </div>

      {/* Quick metrics */}
      <section>
        <h2 className="text-sm font-semibold text-sage-600 mb-3">
          Today&apos;s Snapshot
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <MetricCard
            label="Mindfulness"
            value="15m"
            subtitle="of 20m goal"
            icon={<Brain className="w-5 h-5" />}
            color="bg-sage-100 text-sage-700"
            trend="up"
          />
          <MetricCard
            label="Movement"
            value="32m"
            subtitle="of 30m goal"
            icon={<Heart className="w-5 h-5" />}
            color="bg-sage-200 text-sage-800"
            trend="up"
          />
          <MetricCard
            label="Energy"
            value="7/10"
            subtitle="above average"
            icon={<Zap className="w-5 h-5" />}
            color="bg-spark-warm text-spark-orange"
            trend="stable"
          />
        </div>
      </section>

      {/* Active goals */}
      <section>
        <h2 className="text-sm font-semibold text-sage-600 mb-3">
          Weekly Goals
        </h2>
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
      </section>
    </div>
  );
}
