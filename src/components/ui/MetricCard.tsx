import { ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function MetricCard({
  label,
  value,
  subtitle,
  icon,
  color,
  trend,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-xl ${color}`}>{icon}</div>
        {trend === 'up' && (
          <ArrowUpRight className="w-4 h-4 text-sage-500" />
        )}
      </div>
      <p className="text-2xl font-bold text-sage-900">{value}</p>
      <p className="text-sm font-medium text-sage-700">{label}</p>
      <p className="text-xs text-sage-400 mt-1">{subtitle}</p>
    </div>
  );
}
