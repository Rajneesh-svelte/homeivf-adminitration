import ProfileData from '@/components/ProfileData';

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>
    </div>
  );
}
