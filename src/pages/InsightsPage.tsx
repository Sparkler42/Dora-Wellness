import { BarChart, ArrowUpRight } from 'lucide-react';
import type { InsightCard as InsightCardType } from '../types/wellness';

const insights: InsightCardType[] = [
  {
    id: '1',
    title: 'Mindfulness Improving',
    description: 'Your average session length increased by 3 minutes this week.',
    category: 'mind',
    trend: 'up',
    value: '+18%',
  },
  {
    id: '2',
    title: 'Activity Streak',
    description: "You've hit your movement goal 5 days in a row.",
    category: 'body',
    trend: 'up',
    value: '5 days',
  },
  {
    id: '3',
    title: 'Energy Patterns',
    description: 'Your energy tends to dip after 2 PM. Try a short walk.',
    category: 'energy',
    trend: 'stable',
    value: 'Tip',
  },
];

function InsightRow({ insight }: { insight: InsightCardType }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-semibold text-sage-900">{insight.title}</p>
          <p className="text-sm text-sage-500 mt-1">{insight.description}</p>
        </div>
        <div className="flex items-center gap-1 text-sage-500 ml-4">
          <span className="text-sm font-medium">{insight.value}</span>
          {insight.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart className="w-5 h-5 text-sage-600" />
        <h1 className="text-xl font-bold text-sage-800">Insights</h1>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightRow key={insight.id} insight={insight} />
        ))}
      </div>

      <div className="bg-sage-100 rounded-2xl p-5 text-center">
        <p className="text-sage-600 text-sm">
          More detailed analytics coming soon as you log more check-ins.
        </p>
      </div>
    </div>
  );
}
