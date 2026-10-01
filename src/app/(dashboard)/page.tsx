import Link from 'next/link';
import {
  Users,
  Activity,
  Calendar,
  FileText,
  UserPlus,
  Clock,
  CheckCircle2,
  CalendarDays,
  Microscope,
  Award,
  ChevronRight,
  Stethoscope,
  ArrowUpRight,
} from 'lucide-react';

export default function Home() {
  const kpis = [
    {
      title: 'Total Doctors',
      value: 'TBD',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      trend: 'TBD% this month',
    },
    {
      title: 'Active Treatments',
      value: 'TBD',
      icon: Activity,
      color: 'text-rose-600',
      bg: 'bg-rose-100',
      trend: 'TBD% this month',
    },
    {
      title: 'Pending Certificates',
      value: 'TBD',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      trend: 'TBD need urgent review',
    },
    {
      title: "Today's Appointments",
      value: 'TBD',
      icon: CalendarDays,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      trend: 'TBD',
    },
  ];

  const quickActions = [
    {
      title: 'Onboard Counsellor',
      desc: 'Add a new medical professional',
      icon: UserPlus,
      href: '/onboard-counsellor',
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
    },
    {
      title: 'Manage Rosters',
      desc: 'Update schedules and shifts',
      icon: Calendar,
      href: '/roaster-form',
      color: 'bg-sky-50 hover:bg-sky-100 border-sky-200',
    },
    {
      title: 'ART Treatments',
      desc: 'View and manage active cycles',
      icon: Microscope,
      href: '/art-treatment',
      color: 'bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200',
    },
    {
      title: 'Certificates',
      desc: 'Approve or reject submissions',
      icon: FileText,
      href: '/certificate',
      color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
    },
  ];

  const recentActivities = [
    {
      user: 'Dr. Sarah Jenkins',
      action: 'completed onboarding process',
      time: '2 hours ago',
      icon: CheckCircle2,
      type: 'success',
    },
    {
      user: 'Admin',
      action: 'updated roster for Cardiology wing',
      time: '4 hours ago',
      icon: Clock,
      type: 'info',
    },
    {
      user: 'Dr. Rajesh Kumar',
      action: 'submitted new medical certificates',
      time: '5 hours ago',
      icon: FileText,
      type: 'warning',
    },
    {
      user: 'System',
      action: 'generated weekly performance report',
      time: '1 day ago',
      icon: Activity,
      type: 'default',
    },
  ];

  const todayRoster = [
    {
      name: 'Dr. Emily Chen',
      specialty: 'IVF Specialist',
      time: '09:00 AM - 05:00 PM',
      status: 'On Duty',
    },
    {
      name: 'Dr. Marcus Johnson',
      specialty: 'Embryologist',
      time: '10:00 AM - 06:00 PM',
      status: 'On Duty',
    },
    {
      name: 'Dr. Priya Patel',
      specialty: 'Fertility Consultant',
      time: '02:00 PM - 09:00 PM',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Welcome back! Here&apos;s a snapshot of what&apos;s happening today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-10 transition-transform duration-500 group-hover:scale-110">
              <kpi.icon size={120} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm font-medium text-gray-500 bg-background px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                Latest
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">{kpi.title}</h3>
              <p className="text-3xl font-bold text-foreground mt-1">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">{kpi.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1  gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-indigo-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-start p-4 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${action.color}   dark:hover:bg-gray-600`}
                >
                  <div className="p-2 bg-card/60 rounded-lg shrink-0">
                    <action.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-bold text-foreground">{action.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{action.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
