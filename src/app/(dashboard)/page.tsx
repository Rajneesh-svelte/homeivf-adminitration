import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, TrendingUp, CalendarCheck } from 'lucide-react';

export default function Home() {
  const stats = [
    { name: 'Total Patients', value: '2,543', icon: Users, change: '+12.5%', positive: true },
    { name: 'Active Cycles', value: '142', icon: Activity, change: '+5.2%', positive: true },
    { name: 'Success Rate', value: '68.4%', icon: TrendingUp, change: '+2.1%', positive: true },
    { name: 'Appointments Today', value: '28', icon: CalendarCheck, change: '-4', positive: false },
  ];

  const recentPatients = [
    {
      id: 'P-1042',
      name: 'Sarah Jenkins',
      stage: 'Stimulation Phase',
      doctor: 'Dr. Smith',
      status: 'Active',
    },
    {
      id: 'P-1043',
      name: 'Emily Chen',
      stage: 'Embryo Transfer',
      doctor: 'Dr. Lee',
      status: 'Active',
    },
    {
      id: 'P-1044',
      name: 'Jessica Taylor',
      stage: 'Initial Consultation',
      doctor: 'Dr. Patel',
      status: 'Pending',
    },
    {
      id: 'P-1045',
      name: 'Amanda Rossi',
      stage: 'Egg Retrieval',
      doctor: 'Dr. Smith',
      status: 'Active',
    },
  ];

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
