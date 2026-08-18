import ProfileData from '@/components/ProfileData';

export default function AppointmentsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex-row sm:items-center justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold font-heading text-foreground">
          Create Counsellor
        </h2>
      </div>
      <ProfileData />
    </div>
  );
}
