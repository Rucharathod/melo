// components/BottomNav.js
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function BottomNav() {
  const router = useRouter();

  const navItems = [
    { icon: '🏠', label: 'Home', route: '/dashboard' },
    { icon: '📔', label: 'Journal', route: '/journal' },
    { icon: '🤖', label: 'Chat', route: '/chat' },
    { icon: '📊', label: 'Insights', route: '/insights' },
    { icon: '👤', label: 'Profile', route: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-10">
      <div className="grid grid-cols-5">
        {navItems.map(item => (
          <Link key={item.route} href={item.route}>
            <a className={`flex flex-col items-center py-3 transition-colors ${
              router.pathname === item.route ? 'text-purple-600' : 'text-gray-500'
            }`}>
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}