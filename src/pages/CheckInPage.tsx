import { useState } from 'react';
import { Brain } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import type { MoodLevel } from '../types/wellness';

const moods: { level: MoodLevel; emoji: string; label: string }[] = [
  { level: 'great', emoji: '😊', label: 'Great' },
  { level: 'good', emoji: '🙂', label: 'Good' },
  { level: 'okay', emoji: '😐', label: 'Okay' },
  { level: 'low', emoji: '😔', label: 'Low' },
  { level: 'struggling', emoji: '😞', label: 'Struggling' },
];

export default function CheckInPage() {
  const { addCheckIn, todaysMood } = useWellness();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [energy, setEnergy] = useState(5);
  const [focus, setFocus] = useState(5);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedMood) return;
    addCheckIn({
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      energy,
      focus,
      notes,
    });
    setSubmitted(true);
  };

  if (submitted || todaysMood) {
    return (
      <div className="space-y-6 text-center py-12">
        <div className="text-5xl">✨</div>
        <h1 className="text-xl font-bold text-sage-800">
          Check-in Complete
        </h1>
        <p className="text-sage-500">
          Thanks for checking in today. Keep nurturing your wellbeing!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-sage-600" />
        <h1 className="text-xl font-bold text-sage-800">Daily Check-in</h1>
      </div>

      {/* Mood */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
        <p className="font-semibold text-sage-900 mb-3">How are you feeling?</p>
        <div className="flex justify-between">
          {moods.map((m) => (
            <button
              key={m.level}
              onClick={() => setSelectedMood(m.level)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                selectedMood === m.level
                  ? 'bg-sage-100 ring-2 ring-sage-400'
                  : 'hover:bg-sage-50'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs text-sage-600">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Energy slider */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-sage-900">Energy Level</p>
          <span className="text-sm text-sage-500">{energy}/10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full accent-sage-500"
        />
      </section>

      {/* Focus slider */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-sage-900">Focus Level</p>
          <span className="text-sm text-sage-500">{focus}/10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={focus}
          onChange={(e) => setFocus(Number(e.target.value))}
          className="w-full accent-sage-500"
        />
      </section>

      {/* Notes */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
        <p className="font-semibold text-sage-900 mb-2">Notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything on your mind..."
          className="w-full h-20 resize-none rounded-lg border border-sage-200 p-3 text-sm text-sage-800 placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-400"
        />
      </section>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full bg-sage-600 text-white font-semibold py-3 rounded-2xl disabled:opacity-40 hover:bg-sage-700 transition-colors"
      >
        Complete Check-in
      </button>
    </div>
  );
}
