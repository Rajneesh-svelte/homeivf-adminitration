import Image from 'next/image';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  UserIcon,
  BadgeCheckIcon,
  PencilIcon,
  Users,
} from 'lucide-react';

interface CounsellorFormData {
  id: string;
  profile_picture: string;
  full_name: string;
  is_active: boolean;
  email: string;
  mobile_number: string;
  alternative_mobile_number: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  password: string;
  role_type: string;
  designation: string;
  qualification: string;
  experience_in_year: string;
  rating: string;
  gender: string;
  signature: string;
}

interface CounsellorDetailsProps {
  counsellorData: CounsellorFormData;
}

const CounsellorDetails = ({ counsellorData }: CounsellorDetailsProps) => {
  return (
    <div className="flex flex-col h-[70vh] rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden relative">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-xl font-bold font-heading text-foreground">Profile Data</h3>
      </div>

      <div className="pb-6 px-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          {counsellorData.profile_picture ? (
            <div className="relative">
              <Image
                width={112}
                height={112}
                src={counsellorData.profile_picture}
                alt={`${counsellorData.first_name || ''} ${counsellorData.last_name || ''}`}
                className="w-28 h-28 rounded-full object-cover border-[6px] border-primary-50/50 shadow-sm"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-primary-100 border-[6px] border-primary-50 flex items-center justify-center text-primary-700 font-bold text-4xl shadow-sm">
                {counsellorData.first_name?.[0] || counsellorData.full_name?.[0] || 'U'}
              </div>
            </div>
          )}

          <div className="flex flex-col items-center sm:items-start mt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">
                {counsellorData.full_name ||
                  `${counsellorData.first_name || ''} ${counsellorData.last_name || ''}`}
              </h2>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <p className="text-gray-500 font-medium">
                {counsellorData.designation || 'Counselor'}{' '}
                {counsellorData.role_type ? `• ${counsellorData.role_type}` : ''}
              </p>
              <BadgeCheckIcon className="w-5 h-5 text-primary-600" />
            </div>

            <div className="mt-4">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  counsellorData.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {counsellorData.is_active ? 'Active Profile' : 'Inactive Profile'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Location Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-primary-100 dark:bg-primary-900/30 p-1.5 rounded-lg text-primary-700 dark:text-primary-400">
              <PhoneIcon className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-foreground">Contact & Location</h4>
            <div className="flex-1 h-px bg-gray-100 ml-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                <MailIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-400 mb-0.5">Email</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {counsellorData.email || '—'}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-400 mb-0.5">Phone</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {counsellorData.mobile_number || '—'}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-400 mb-0.5">Location</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {[counsellorData.city, counsellorData.state, counsellorData.country]
                    .filter(Boolean)
                    .join(', ') || '—'}
                  {counsellorData.zipcode ? ` - ${counsellorData.zipcode}` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-primary-100 dark:bg-primary-900/30 p-1.5 rounded-lg text-primary-700 dark:text-primary-400">
              <BriefcaseIcon className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-foreground">Professional Details</h4>
            <div className="flex-1 h-px bg-gray-100 ml-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Qualification Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                <GraduationCapIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-400 mb-0.5">Qualification</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {counsellorData.qualification || '—'}
                </p>
              </div>
            </div>

            {/* Gender Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-400 mb-0.5">Gender</p>
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {counsellorData.gender || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {counsellorData.signature && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1.5 rounded-lg text-primary-700 dark:text-primary-400">
                <PencilIcon className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-foreground">Signature</h4>
              <div className="flex-1 h-px bg-gray-100 ml-2" />
            </div>
            <Image
              width={96}
              height={96}
              src={counsellorData.signature}
              alt="Counselor Signature"
              className="h-16 object-contain border bg-card p-2 rounded-xl shadow-sm"
            />
          </div>
        )}

        {/* Record ID Footer */}
        {counsellorData.id && (
          <div className="mt-12 text-right pb-4">
            <p className="text-xs text-gray-400 font-medium">Record ID: {counsellorData.id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorDetails;
