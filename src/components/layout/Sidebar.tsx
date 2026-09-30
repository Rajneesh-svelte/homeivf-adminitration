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
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSidebarStore } from '@/store/sidebarStore';
import { useEffect, useState } from 'react';
import { deleteCookie } from 'cookies-next';
import { useAuthStore } from '@/store/authStore';

type NavSubItem = {
  name: string;
  href: string;
  roles?: string[];
};

type NavItem = {
  name: string;
  href?: string;
  icon: LucideIcon;
  roles?: string[];
  subItems?: NavSubItem[];
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebarStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Doctor Management': true,
    'Counsellor Management': true,
  });

  const toggleExpand = (name: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setExpanded((prev) => ({ ...prev, [name]: true }));
      return;
    }
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);
  const { auth } = useAuthStore();

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      roles: ['Admin'],
    },
    {
      name: 'Doctor Management',
      icon: UserCog,
      roles: ['Admin', 'CounsellorHead'],
      subItems: [
        {
          name: 'Create Doctor',
          href: '/doctor-create',
          roles: ['Admin'],
        },
        {
          name: 'Certificate',
          href: '/certificate',
          roles: ['Admin'],
        },
        {
          name: 'Roaster Form',
          href: '/roaster-form',
          roles: ['Admin'],
        },
        {
          name: 'Doctor Change',
          href: '/doctor-change',
          roles: ['CounsellorHead', 'Admin'],
        },
        {
          name: 'Category',
          href: '/category-create',
          roles: ['Admin'],
        },
      ],
    },
    {
      name: 'Counsellor Management',
      icon: UserPlus,
      roles: ['Admin'],
      subItems: [
        {
          name: 'Counsellor List',
          href: '/onboard-counsellor',
          roles: ['Admin'],
        },
      ],
    },
    {
      name: 'Art Treatment',
      href: '/art-treatment',
      icon: Stethoscope,
      roles: ['Admin'],
    },
  ];

  const filteredNavItems = navItems.reduce((acc, item) => {
    if (item.roles && !item.roles.includes(auth?.user_role_type ?? '')) {
      return acc;
    }
    if (item.subItems) {
      const filteredSub = item.subItems.filter(
        (sub) => !sub.roles || sub.roles.includes(auth?.user_role_type ?? '')
      );
      if (filteredSub.length > 0) {
        acc.push({ ...item, subItems: filteredSub });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as NavItem[]);

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
        className={`shrink-0 border-r border-border bg-sidebar flex-col h-full shadow-sm z-50 fixed md:relative md:flex transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20' : 'md:w-72'
        } w-72 ${isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden md:translate-x-0'}`}
      >
        {/* Header */}
        <div
          className={`h-16 flex items-center border-b border-border ${
            isCollapsed ? 'md:justify-center md:px-2' : 'justify-between px-6'
          }`}
        >
          {!isCollapsed && (
            <span className="font-heading font-bold text-xl tracking-tight text-primary-700 dark:text-primary-50 truncate">
              HomeIVF - <span className="text-xl"> Admin</span>
            </span>
          )}

          {/* Collapse toggle (desktop only) */}
          <button
            className="hidden md:flex items-center justify-center text-foreground/60 hover:text-foreground/90 p-1.5 rounded-lg hover:bg-primary-50 transition-colors"
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>

          {/* Mobile close */}
          <button
            className="md:hidden text-foreground/60 hover:text-foreground/90"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav
          className={`flex-1 py-6 space-y-2 overflow-y-auto overflow-x-hidden ${
            isCollapsed ? 'md:px-2' : 'px-4'
          }`}
        >
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isActive = !hasSubItems && pathname === item.href;
            const isExpanded = expanded[item.name];
            // When collapsed, don't show sub items
            const showSubItems = hasSubItems && isExpanded && !isCollapsed;

            return (
              <div key={item.name} className="flex flex-col">
                {hasSubItems ? (
                  <button
                    onClick={() => toggleExpand(item.name)}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center rounded-lg text-sm font-medium transition-colors text-foreground/90 hover:bg-primary-50 ${
                      isCollapsed
                        ? 'md:justify-center md:px-2 md:py-2.5 gap-3 px-3 py-2.5'
                        : 'justify-between px-3 py-2.5'
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'md:gap-0' : ''}`}>
                      <Icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed &&
                      (isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center rounded-lg text-sm font-medium transition-colors ${
                      isCollapsed
                        ? 'md:justify-center md:px-2 md:py-2.5 gap-3 px-3 py-2.5'
                        : 'gap-3 px-3 py-2.5'
                    } ${
                      isActive
                        ? 'bg-primary-500/10 text-primary-700'
                        : 'text-foreground/90 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )}

                {showSubItems && (
                  <div className="ml-8 mt-1 space-y-1 flex flex-col relative before:absolute before:left-[-12px] before:top-0 before:bottom-0 before:w-[1px] before:bg-border">
                    {item.subItems!.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors before:absolute before:left-[-12px] before:top-1/2 before:w-[12px] before:h-[1px] before:bg-border ${
                            isSubActive
                              ? 'bg-primary-500/10 text-primary-700'
                              : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div
          className={`p-4 border-t border-border flex flex-col gap-4 bg-sidebar mt-auto ${
            isCollapsed ? 'md:px-2' : ''
          }`}
        >
          <button
            onClick={handleLogout}
            title={isCollapsed ? 'Log out' : undefined}
            className={`flex items-center rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full ${
              isCollapsed
                ? 'md:justify-center md:px-2 md:py-2.5 gap-3 px-3 py-2.5'
                : 'gap-3 px-3 py-2.5'
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
