// components/QuickActions.js
import { useRouter } from 'next/router';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { icon: '📝', label: 'Journal', route: '/journal', color: 'bg-blue-100' },
    { icon: '🎙️', label: 'Voice Log', route: '/voice', color: 'bg-purple-100' },
    { icon: '📊', label: 'Insights', route: '/insights', color: 'bg-green-100' },
    { icon: '🛟', label: 'Crisis Help', route: '/crisis', color: 'bg-red-100' },
  ];

  return (
    <div className="my-6 p-4 bg-white rounded shadow">
      <h3 className="font-bold mb-2">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map(action => (
          <button
            key={action.label}
            onClick={() => router.push(action.route)}
            className={`${action.color} rounded-2xl p-4 flex flex-col items-center justify-center transition-transform hover:scale-105 shadow-md`}
          >
            <span className="text-2xl mb-2">{action.icon}</span>
            <span className="text-sm font-medium text-gray-800">{action.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        <button className="bg-purple-500 text-white px-4 py-2 rounded mr-2">New Entry</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Check Mood</button>
      </div>
    </div>
  );
}