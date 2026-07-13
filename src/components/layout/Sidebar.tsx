'use client';
import Link from 'next/link';
import { LayoutDashboard, Calendar, HeartPulse, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'OnBoard', href: '/onboard-doctor', icon: Calendar },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar hidden md:flex flex-col h-full shadow-sm z-10 relative">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <HeartPulse className="h-6 w-6 text-primary-500 mr-2" />
        <span className="font-heading font-bold text-lg tracking-tight text-primary-500 dark:text-primary-50">
          HomeIVF
        </span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-500/10 text-primary-700'
                  : 'text-gray-700 hover:bg-primary-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border flex flex-col gap-4">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
