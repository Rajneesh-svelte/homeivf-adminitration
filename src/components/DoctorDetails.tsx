'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getDoctorDetailsData } from '@/services/user';
import Image from 'next/image';
import {
  ChevronLeft,
  Edit3,
  MoreHorizontal,
  Star,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  FlaskConical,
  FileText,
  Info,
} from 'lucide-react';

const DoctorDetails = ({ selectedId }: any) => {
  const { auth } = useAuthStore();
  const [doctorData, setDoctorData] = useState<any>(null);

  useEffect(() => {
    if (!auth?.access || !selectedId) {
      setDoctorData(null);
      return;
    }

    const fetchDoctorData = async () => {
      try {
        const res = await getDoctorDetailsData(auth.access, selectedId);
        setDoctorData(res);
      } catch (error) {
        setDoctorData(null);
      }
    };

    fetchDoctorData();
  }, [auth?.access, selectedId]);

  if (!doctorData || !doctorData.id) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-10 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <Users className="w-16 h-16 mb-4 opacity-30 text-gray-400" />
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">No Doctor Selected</p>
        <p className="text-sm mt-2 max-w-xs text-center leading-relaxed">
          Select a Doctor from the list to view their complete profile and details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] overflow-y-auto rounded-xl bg-gray-300/25 p-2 dark:bg-gray-950  space-y-2 backdrop-blur-xl shadow-xl transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              {doctorData.profile_picture ? (
                <Image
                  width={112}
                  height={112}
                  src={doctorData.profile_picture}
                  alt={`${doctorData.first_name} ${doctorData.last_name}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-primary-500 dark:border-primary-800 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-gray-400 font-bold text-3xl shadow-md border-4 border-primary-600 dark:border-gray-700">
                  {doctorData.first_name?.[0]}
                  {doctorData.last_name?.[0]}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {doctorData.first_name} {doctorData.last_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium text-sm sm:text-base">
                {doctorData.designation} • {doctorData.role_type}
              </p>
              {doctorData.specialization && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {doctorData.specialization}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full border border-primary-100 dark:primary-primary-800">
                  Doctor • {doctorData.level}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                    doctorData.is_active
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 border-green-100'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-600 border-red-100'
                  }`}
                >
                  {doctorData.is_active ? 'Active Profile' : 'Inactive Profile'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none flex flex-col items-center justify-center bg-primary-50 dark:bg-primary-800/50 rounded-xl p-4 border border-primary-100 dark:border-primary-800 min-w-[120px]">
              <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-bold text-lg">
                <Star className="w-5 h-5 fill-current" />
                {doctorData.rating || 'N/A'}
              </div>
              <span className="text-xs text-primary-500 mt-1 font-medium">Rating</span>
            </div>

            <div className="flex-1 lg:flex-none flex flex-col items-center justify-center bg-primary-50 dark:bg-primary-800/50 rounded-xl p-4 border border-primary-100 dark:border-primary-800 min-w-[120px]">
              <div className="flex items-center gap-1 text-primary-900 dark:text-white font-bold text-lg">
                <IndianRupee className="w-5 h-5 text-primary-500" />
                {doctorData.consultation_fee || '0'}
              </div>
              <span className="text-xs text-primary-500 mt-1 font-medium">Consultation Fee</span>
            </div>

            <div className="flex-1 lg:flex-none flex flex-col items-center justify-center bg-primary-50 dark:bg-primary-800/50 rounded-xl p-4 border border-primary-100 dark:border-primary-800 min-w-[120px]">
              <div className="flex items-center gap-2 text-primary-900 dark:text-white font-bold text-lg">
                <Briefcase className="w-5 h-5 text-primary-500" />
                {doctorData.experience_in_year || '0'}
              </div>
              <span className="text-xs text-primary-500 mt-1 font-medium">Experience</span>
            </div>

            <div className="flex-1 lg:flex-none flex flex-col items-center justify-center bg-primary-50 dark:bg-primary-800/50 rounded-xl p-4 border border-primary-100 dark:border-primary-800 min-w-[120px]">
              <div className="flex items-center gap-2 text-primary-900 dark:text-white font-bold text-base text-center">
                <CheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="truncate max-w-[80px]" title={doctorData.qualification}>
                  {doctorData.qualification?.split(',')[0] || 'N/A'}
                </span>
              </div>
              <span className="text-xs text-primary-500 mt-1 font-medium">Qualification</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-2">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Contact & Location</h3>
          </div>
          <div className="p-6 ">
            <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-primary-50 dark:border-primary-800/50 last:border-0 gap-2 sm:gap-0">
              <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mr-4 shrink-0 hidden sm:flex">
                <Mail className="w-5 h-5 text-primary-500" />
              </div>
              <div className="grid grid-cols-3 w-full items-center">
                <span className="text-sm font-medium text-gray-500 col-span-1">Email</span>
                <span
                  className="text-sm text-primary-900 dark:text-primary-300 col-span-2 truncate"
                  title={doctorData.email}
                >
                  {doctorData.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0 gap-2 sm:gap-0">
              <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mr-4 shrink-0 hidden sm:flex">
                <Phone className="w-5 h-5 text-primary-500" />
              </div>
              <div className="grid grid-cols-3 w-full items-center">
                <span className="text-sm font-medium text-gray-500 col-span-1">Phone</span>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                  {doctorData.mobile_number}
                </span>
              </div>
            </div>

            {doctorData.alternative_mobile_number && (
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0 gap-2 sm:gap-0">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mr-4 shrink-0 hidden sm:flex">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div className="grid grid-cols-3 w-full items-center">
                  <span className="text-sm font-medium text-gray-500 col-span-1">Alt Phone</span>
                  <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {doctorData.alternative_mobile_number}
                  </span>
                </div>
              </div>
            )}

            {doctorData.whatsapp_number && (
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0 gap-2 sm:gap-0">
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-4 shrink-0 hidden sm:flex">
                  <Phone className="w-5 h-5 text-green-500" />
                </div>
                <div className="grid grid-cols-3 w-full items-center">
                  <span className="text-sm font-medium text-gray-500 col-span-1">WhatsApp</span>
                  <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {doctorData.whatsapp_number}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0 gap-2 sm:gap-0">
              <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mr-4 shrink-0 hidden sm:flex">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <div className="grid grid-cols-3 w-full items-center">
                <span className="text-sm font-medium text-gray-500 col-span-1">Location</span>
                <span
                  className="text-sm text-gray-900 dark:text-gray-300 col-span-2 truncate"
                  title={`${doctorData.city}, ${doctorData.state}, ${doctorData.country} - ${doctorData.zipcode}`}
                >
                  {doctorData.city}, {doctorData.state}, {doctorData.country}{' '}
                  {doctorData.zipcode ? `- ${doctorData.zipcode}` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Professional Details</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Qualification</span>
                </div>
                <span
                  className="text-sm text-gray-900 dark:text-gray-300 col-span-2 truncate"
                  title={doctorData.qualification}
                >
                  {doctorData.qualification}
                </span>
              </li>
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Experience</span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                  {doctorData.experience_in_year} Years
                </span>
              </li>
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Cases Attended</span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                  {doctorData.cases_attended || '—'}
                </span>
              </li>
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Medical Council</span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2 truncate">
                  {doctorData.state_medical_council || '—'}
                </span>
              </li>
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Board Reg No</span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2 truncate">
                  {doctorData.board_registration || '—'}
                </span>
              </li>
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Consultation Fee</span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                  ₹{doctorData.consultation_fee}
                </span>
              </li>
              <li className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span className="text-sm text-gray-500">Rating</span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-300 col-span-2 flex items-center">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                  {doctorData.rating} / 5
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">About</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-primary-100/50 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
              <Users className="w-4 h-4" />
              <h4 className="font-semibold text-sm">Profile Summary</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {doctorData.profile_summery || 'No summary provided.'}
            </p>
          </div>

          <div className="bg-primary-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-primary-100/50 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
              <Briefcase className="w-4 h-4" />
              <h4 className="font-semibold text-sm">Work Experience</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {doctorData.work_experience || 'No work experience detailed.'}
            </p>
          </div>

          <div className="bg-primary-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-primary-100/50 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
              <GraduationCap className="w-4 h-4" />
              <h4 className="font-semibold text-sm">Education & Training</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {doctorData.education_and_training || 'No education records available.'}
            </p>
          </div>

          <div className="bg-primary-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-primary-100/50 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
              <Star className="w-4 h-4" />
              <h4 className="font-semibold text-sm">Awards</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {doctorData.awards || 'No awards listed.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-2">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Assigned Counselor</h3>
          </div>
          <div className="p-6 flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl shrink-0">
              {doctorData.counselor_name?.[0] || 'C'}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                {doctorData.counselor_name || 'Unassigned'}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                ID: {doctorData.counselor || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">ART Treatments (IDs)</h3>
          </div>
          <div className="p-6 flex-1">
            {doctorData.art_treatments && doctorData.art_treatments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {doctorData.art_treatments.map((treatment: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md border border-purple-100 dark:border-purple-800/50"
                  >
                    {treatment}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">None recorded</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 ">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Documents & Signatures</h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {doctorData.signature && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Authorized Signature
              </span>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center min-h-[100px]">
                <Image
                  width={150}
                  height={80}
                  src={doctorData.signature}
                  alt="Doctor Signature"
                  className="max-h-20 object-contain"
                />
              </div>
            </div>
          )}

          {doctorData.e_stamp && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                E-Stamp
              </span>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center min-h-[100px]">
                <Image
                  width={150}
                  height={80}
                  src={doctorData.e_stamp}
                  alt="Doctor E-Stamp"
                  className="max-h-20 object-contain"
                />
              </div>
            </div>
          )}

          {doctorData.doctor_certificate && doctorData.doctor_certificate.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Certificates
              </span>
              <div className="flex flex-col gap-2">
                {doctorData.doctor_certificate.map((cert: any, idx: number) => (
                  <div
                    key={idx}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span className="truncate">
                      {cert.certificate_name || cert || `Certificate ${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!doctorData.signature &&
            !doctorData.e_stamp &&
            (!doctorData.doctor_certificate || doctorData.doctor_certificate.length === 0) && (
              <p className="text-sm text-gray-500 italic col-span-full">
                No documents or signatures found.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
