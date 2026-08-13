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
      value: '42',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      trend: '+12% this month',
    },
    {
      title: 'Active Treatments',
      value: '18',
      icon: Activity,
      color: 'text-rose-600',
      bg: 'bg-rose-100',
      trend: '+5% this month',
    },
    {
      title: 'Pending Certificates',
      value: '7',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      trend: '3 need urgent review',
    },
    {
      title: "Today's Appointments",
      value: '24',
      icon: CalendarDays,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      trend: 'All doctors on time',
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Welcome back! Here's a snapshot of what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            System Operational
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-10 transition-transform duration-500 group-hover:scale-110">
              <kpi.icon size={120} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                Latest
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {kpi.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-indigo-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-start p-4 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${action.color} dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600`}
                >
                  <div className="p-2 bg-white/60 dark:bg-gray-800 rounded-lg shrink-0">
                    <action.icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{action.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                Recent Activity
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {recentActivities.map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div
                    className={`mt-1 rounded-full p-1.5
                    ${item.type === 'success' ? 'bg-green-100 text-green-600' : ''}
                    ${item.type === 'warning' ? 'bg-amber-100 text-amber-600' : ''}
                    ${item.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                    ${
                      item.type === 'default'
                        ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        : ''
                    }
                  `}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="ml-4 flex-1 border-b border-gray-100 dark:border-gray-700 pb-4 group-last:border-0 group-last:pb-0">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.user}
                      </span>{' '}
                      {item.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Today's Roster */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20">
              <Stethoscope size={160} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold flex items-center mb-6 text-indigo-50">
                <CalendarDays className="w-5 h-5 mr-2 text-indigo-300" />
                Today's Roster
              </h3>
              <div className="space-y-4">
                {todayRoster.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white">{doc.name}</h4>
                        <p className="text-indigo-200 text-xs mt-1">{doc.specialty}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md tracking-wide
                        ${
                          doc.status === 'On Duty'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-indigo-100">
                      <Clock className="w-4 h-4 mr-2 opacity-70" />
                      {doc.time}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/roaster-form"
                className="mt-6 block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-xl text-sm font-medium transition-all backdrop-blur-sm border border-white/10 text-white"
              >
                View Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
