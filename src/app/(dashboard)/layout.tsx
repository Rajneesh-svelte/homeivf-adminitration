import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import RouteGuard from '@/components/Auth/RouteGuard';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RouteGuard>
      <div className="h-full flex overflow-hidden w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-4 bg-background">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
