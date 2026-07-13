import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Search, User, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 'APT-001',
      patient: 'Sarah Jenkins',
      type: 'Consultation',
      date: 'Oct 24, 2026',
      time: '10:00 AM',
      doctor: 'Dr. Smith',
      status: 'Confirmed',
    },
    {
      id: 'APT-002',
      patient: 'Emily Chen',
      type: 'Ultrasound',
      date: 'Oct 24, 2026',
      time: '11:30 AM',
      doctor: 'Dr. Lee',
      status: 'Pending',
    },
    {
      id: 'APT-003',
      patient: 'Jessica Taylor',
      type: 'Follow-up',
      date: 'Oct 24, 2026',
      time: '02:00 PM',
      doctor: 'Dr. Patel',
      status: 'Confirmed',
    },
    {
      id: 'APT-004',
      patient: 'Amanda Rossi',
      type: 'Embryo Transfer',
      date: 'Oct 25, 2026',
      time: '09:00 AM',
      doctor: 'Dr. Smith',
      status: 'Scheduled',
    },
    {
      id: 'APT-005',
      patient: 'Michael Brown',
      type: 'Semen Analysis',
      date: 'Oct 25, 2026',
      time: '11:00 AM',
      doctor: 'Dr. Lee',
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
            On Board Doctor
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">OnBoard Doctor & Counselor.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Doctor
        </Button>
      </div>
    </div>
  );
}
