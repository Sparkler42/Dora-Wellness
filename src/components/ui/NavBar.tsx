import { NavLink } from 'react-router-dom';
import { Home, Target, BarChart, Brain } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/insights', icon: BarChart, label: 'Insights' },
  { to: '/checkin', icon: Brain, label: 'Check-in' },
];

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-sage-100 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-around">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-sage-700 font-semibold'
                  : 'text-sage-400 hover:text-sage-500'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
