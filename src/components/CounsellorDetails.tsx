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
} from 'lucide-react';

interface CounsellorDetails {
  counsellorData: any;
}

const CounsellorDetails = ({ counsellorData }: CounsellorDetails) => {
  return (
    <div className="flex flex-col h-[70vh] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl overflow-hidden relative">
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
          Profile Data
        </h3>
        {/* <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors text-sm font-medium">
          <PencilIcon className="w-4 h-4" />
          Edit
        </button> */}
      </div>

      {counsellorData &&
      (counsellorData.id || counsellorData.email || counsellorData.first_name) ? (
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
              <h4 className="font-bold text-gray-800 dark:text-gray-100">Contact & Location</h4>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 ml-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-400 mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
                    {counsellorData.email || '—'}
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-400 mb-0.5">Phone</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
                    {counsellorData.mobile_number || '—'}
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-400 mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
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
              <h4 className="font-bold text-gray-800 dark:text-gray-100">Professional Details</h4>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 ml-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Qualification Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                  <GraduationCapIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-400 mb-0.5">Qualification</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
                    {counsellorData.qualification || '—'}
                  </p>
                </div>
              </div>

              {/* Gender Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full text-primary-600 dark:text-primary-400 shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-400 mb-0.5">Gender</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
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
                <h4 className="font-bold text-gray-800 dark:text-gray-100">Signature</h4>
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 ml-2" />
              </div>
              <Image
                width={96}
                height={96}
                src={counsellorData.signature}
                alt="Counselor Signature"
                className="h-16 object-contain border bg-white p-2 rounded-xl shadow-sm"
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full pb-10 text-gray-400 dark:text-gray-500">
          <svg
            className="w-20 h-20 mb-4 opacity-50 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
            No counsellor selected
          </p>
          <p className="text-sm mt-2 max-w-xs text-center leading-relaxed">
            Select a counsellor from the list to view their complete profile and details.
          </p>
        </div>
      )}
    </div>
  );
};

export default CounsellorDetails;
