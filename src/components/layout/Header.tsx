import { Search, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 shrink-0 border-b border-border bg-white dark:bg-sidebar flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center flex-1">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="max-w-md w-full hidden sm:block relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search patients, appointments..."
            className="w-full pl-9 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 focus-visible:ring-primary-500 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium text-sm shadow-sm ring-2 ring-white dark:ring-gray-900 cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
}
