'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  UserPlus,
  Stethoscope,
  UserCog,
  BadgeCheck,
  LogOut,
  X,
} from 'lucide-react';
import { useSidebarStore } from '@/store/sidebarStore';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { useAuthStore } from '@/store/authStore';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebarStore();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);
  const { auth } = useAuthStore();
  console.log('auth', auth?.user_role_type);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Counsellor',
      href: '/onboard-counsellor',
      icon: UserPlus,
    },
    {
      name: 'Doctor',
      href: '/doctor-create',
      icon: UserCog,
    },
    {
      name: 'Art Treatment',
      href: '/art-treatment',
      icon: Stethoscope,
    },

    {
      name: 'Certificate',
      href: '/certificate',
      icon: BadgeCheck,
    },
    {
      name: 'Roaster Form',
      href: '/roaster-form',
      icon: BadgeCheck,
    },
    {
      name: 'Doctor Change',
      href: '/doctor-change',
      icon: BadgeCheck,
    },
  ];
  const filteredNavItems =
    auth?.user_role_type === 'CounsellorHead'
      ? navItems.filter((item) => item.name === 'Doctor Change')
      : navItems.filter((item) => item.name !== 'Doctor Change');

  const handleLogout = () => {
    localStorage.removeItem('token');
    deleteCookie('token');
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`w-64 shrink-0 border-r border-border bg-sidebar flex-col h-full shadow-sm z-50 fixed md:relative md:flex transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden md:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <span className="font-heading font-bold text-xl tracking-tight text-primary-700 dark:text-primary-50">
            HomeIVF - <span className="text-xl"> Admin</span>
          </span>
          <button
            className="md:hidden text-foreground/60 hover:text-foreground/90"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-700'
                    : '  text-foreground/90 hover:bg-primary-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border flex flex-col gap-4 bg-sidebar mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
