import React, { useState } from 'react';
import {
  Brain,
  Heart,
  Zap,
  ChevronRight,
  BarChart,
  Target,
  ArrowUpRight,
} from 'lucide-react';

const GrowingTree = () => {
  return (
    <div className="w-full h-32">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="twinkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground */}
        <path d="M40 180 C80 180, 120 180, 160 180" stroke="#B0C4B1" fill="none" strokeWidth="4">
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="M40 180 C80 180, 120 180, 160 180;
                    M40 180 C80 178, 120 182, 160 180;
                    M40 180 C80 180, 120 180, 160 180"
          />
        </path>

        {/* Trunk */}
        <path d="M100 180 L100 80" stroke="#8B4513" fill="none" strokeWidth="6">
          <animate
            attributeName="d"
            dur="3s"
            begin="0s"
            values="M100 180 L100 180;
                    M100 180 L100 80"
            fill="freeze"
          />
        </path>

        {/* Branches */}
        <g>
          {[
            { start: 160, controlX: 130, endX: 140, delay: '1s' },
            { start: 160, controlX: 70, endX: 60, delay: '1.2s' },
            { start: 140, controlX: 135, endX: 145, delay: '1.4s' },
            { start: 140, controlX: 65, endX: 55, delay: '1.6s' },
            { start: 120, controlX: 140, endX: 150, delay: '1.8s' },
            { start: 120, controlX: 60, endX: 50, delay: '2s' },
            { start: 100, controlX: 130, endX: 140, delay: '2.2s' },
            { start: 100, controlX: 70, endX: 60, delay: '2.4s' },
          ].map((branch, index) => (
            <path
              key={index}
              d={`M100 ${branch.start} Q${branch.controlX} ${branch.start - 10} ${branch.endX} ${branch.start - 5}`}
              stroke="#8B4513"
              fill="none"
              strokeWidth="3"
            >
              <animate
                attributeName="d"
                dur="2s"
                begin={branch.delay}
                values={`M100 ${branch.start} Q100 ${branch.start} 100 ${branch.start};
                        M100 ${branch.start} Q${branch.controlX} ${branch.start - 10} ${branch.endX} ${branch.start - 5}`}
                fill="freeze"
              />
            </path>
          ))}
        </g>

        {/* Flowers/Sparks */}
        <g>
          {[
            { cx: 140, cy: 155, color: '#E9EDC9', delay: '2.6s' },
            { cx: 145, cy: 135, color: '#CFE1B9', delay: '2.8s' },
            { cx: 150, cy: 115, color: '#B0C4B1', delay: '3s' },
            { cx: 140, cy: 95, color: '#E9EDC9', delay: '3.2s' },
            { cx: 60, cy: 155, color: '#CFE1B9', delay: '2.7s' },
            { cx: 55, cy: 135, color: '#E9EDC9', delay: '2.9s' },
            { cx: 50, cy: 115, color: '#B0C4B1', delay: '3.1s' },
            { cx: 60, cy: 95, color: '#CFE1B9', delay: '3.3s' },
            { cx: 100, cy: 75, color: '#E9EDC9', delay: '3.4s' },
            { cx: 85, cy: 80, color: '#B0C4B1', delay: '3.5s' },
            { cx: 115, cy: 80, color: '#CFE1B9', delay: '3.6s' },
          ].map((flower, index) => (
            <g key={index}>
              <circle cx={flower.cx} cy={flower.cy} r="4" fill={flower.color}>
                <animate
                  attributeName="opacity"
                  dur="2s"
                  begin={flower.delay}
                  values="0;1"
                  fill="freeze"
                />
                <animate
                  attributeName="r"
                  dur="1.5s"
                  begin={flower.delay}
                  repeatCount="indefinite"
                  values="4;5;4"
                />
              </circle>
              <circle cx={flower.cx} cy={flower.cy} r="1" fill="url(#twinkle)">
                <animate
                  attributeName="r"
                  dur="1s"
                  begin={flower.delay}
                  repeatCount="indefinite"
                  values="1;2;1"
                />
              </circle>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const categories = [
  { icon: Brain, label: 'Mindfulness', color: 'bg-purple-100 text-purple-600', score: 72 },
  { icon: Heart, label: 'Self-Care', color: 'bg-pink-100 text-pink-600', score: 85 },
  { icon: Zap, label: 'Energy', color: 'bg-yellow-100 text-yellow-600', score: 63 },
  { icon: Target, label: 'Goals', color: 'bg-green-100 text-green-600', score: 90 },
];

const dailyTips = [
  'Take 5 deep breaths before starting your day.',
  'Drink a glass of water first thing in the morning.',
  'Write down 3 things you are grateful for.',
  'Stretch for 10 minutes to energize your body.',
];

const SparkApp = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Zap className="text-emerald-500" size={28} />
            Spark
          </h1>
          <p className="text-gray-500 mt-1">Your daily wellness companion</p>
        </div>
      </header>

      <main className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Growing Tree Animation */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Growth</h2>
            <GrowingTree />
            <p className="text-center text-sm text-gray-400 mt-2">
              Watch your tree grow as you build healthy habits
            </p>
          </div>

          {/* Wellness Score */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Wellness Score</h2>
              <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                <ArrowUpRight size={16} />
                +5% this week
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${78 * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">78</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
              <BarChart size={20} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() =>
                      setSelectedCategory(isSelected ? null : cat.label)
                    }
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-emerald-50 ring-2 ring-emerald-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${cat.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-700">
                        {cat.label}
                      </p>
                      <p className="text-xs text-gray-400">{cat.score}%</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Tips */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Daily Tips
            </h2>
            <div className="space-y-3">
              {dailyTips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl"
                >
                  <ChevronRight size={16} className="text-emerald-500 shrink-0" />
                  <p className="text-sm text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SparkApp;
