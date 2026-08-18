'use client';
import { Search, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';

export function Header() {
  const { auth } = useAuthStore();
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  return (
    <header className="h-16 shrink-0 border-b border-border bg-sidebar flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center flex-1">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="max-w-md w-full hidden sm:block relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/60" />
          <Input
            type="search"
            placeholder="Search patients, appointments..."
            className="w-full pl-9 bg-background/50 border-border focus-visible:ring-primary-500 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium text-sm shadow-sm ring-2 ring-white dark:ring-gray-900 cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
}
