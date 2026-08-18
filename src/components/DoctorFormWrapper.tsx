'use client';
import { FileTextIcon } from 'lucide-react';
import { FormFieldConfig } from '@/Interfaces/FormField';
import DynamicForm from './DynamicForm';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  BuildingIcon,
  MapPinIcon,
  GlobeIcon,
  HashIcon,
  BriefcaseIcon,
  IdCardIcon,
  GraduationCapIcon,
  ClockIcon,
  StarIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';
import {
  createDoctor,
  getArtTreatmentForm,
  getCertificateList,
  getCounsellorList,
  getDoctorDetailsData,
  updateDoctor,
} from '@/services/user';
import CertificateFormWrapper from './CertificateFormWrapper';
import { useCertificateStore } from '@/store/certificatelist';
import { useCounsellorListStore } from '@/store/counsellorStore';
import DoctorDetails from './DoctorDetails';
import { useDoctorList } from '@/hooks/useDoctorList';
import doctorImage from '@/../public/avatars/doctor.png';
import Image from 'next/image';

const DoctorFormWrapper: React.FC = () => {
  const { auth } = useAuthStore();

  const { setCertificate, certificate } = useCertificateStore();
  const { setCounsellor, counsellor } = useCounsellorListStore();
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [artTreatment, setArtTreatment] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const { doctor } = useDoctorList(auth?.access);
  const isEditMode = !!selectedId;
  console.log('isEditMode', isEditMode);

  const onReset = () => {
    setSelectedId('');
  };

  const doctorFormFields: FormFieldConfig[] = (
    [
      { name: 'first_name', label: 'First Name', type: 'text', icon: UserIcon, required: true },
      { name: 'last_name', label: 'Last Name', type: 'text', icon: UserIcon, required: true },
      { name: 'email', label: 'Email Address', type: 'email', icon: MailIcon, required: false },
      {
        name: 'mobile_number',
        label: 'Mobile Number',
        type: 'text',
        icon: PhoneIcon,
        required: false,
      },
      {
        name: 'alternative_mobile_number',
        label: 'Alternate Mob. Number',
        type: 'text',
        icon: PhoneIcon,
        required: false,
      },
      { name: 'password', label: 'Password', type: 'password', icon: LockIcon, required: true },
      { name: 'city', label: 'City', type: 'text', icon: BuildingIcon, required: true },
      { name: 'state', label: 'State', type: 'text', icon: MapPinIcon, required: true },
      { name: 'country', label: 'Country', type: 'text', icon: GlobeIcon, required: true },
      { name: 'zipcode', label: 'Zipcode', type: 'text', icon: HashIcon, required: true },
      { name: 'role_type', label: 'Role Type', type: 'text', icon: BriefcaseIcon, required: true },
      { name: 'designation', label: 'Designation', type: 'text', icon: IdCardIcon, required: true },
      {
        name: 'qualification',
        label: 'Qualification',
        type: 'text',
        icon: GraduationCapIcon,
        required: true,
      },
      {
        name: 'experience_in_year',
        label: 'Experience (Years)',
        type: 'number',
        icon: ClockIcon,
        required: true,
      },
      { name: 'rating', label: 'Rating', type: 'number', icon: StarIcon, required: true },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        icon: ClockIcon,
        required: true,

        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
      },
      {
        name: 'date_of_signature',
        label: 'Date Of Signature',
        type: 'date',
        icon: ClockIcon,
        required: true,
      },
      {
        name: 'specialization',
        label: 'Specialization',
        type: 'text',
        icon: BriefcaseIcon,
        required: true,
      },
      {
        name: 'work_experience',
        label: 'Work Experience',
        type: 'text',
        icon: ClockIcon,
        required: true,
      },
      {
        name: 'education_and_training',
        label: 'Education & Training',
        type: 'text',
        icon: GraduationCapIcon,
        required: true,
      },
      {
        name: 'consultation_fee',
        label: 'Consultation Fee',
        type: 'number',
        icon: FileTextIcon,
        required: true,
      },
      {
        name: 'state_medical_council',
        label: 'State Medical Council',
        type: 'text',
        icon: BuildingIcon,
        required: true,
      },
      {
        name: 'board_registration',
        label: 'Board Registration',
        type: 'text',
        icon: IdCardIcon,
        required: true,
      },
      {
        name: 'cases_attended',
        label: 'Cases Attended',
        type: 'number',
        icon: FileTextIcon,
        required: true,
      },
      {
        name: 'whatsapp_number',
        label: 'WhatsApp Number',
        type: 'text',
        icon: PhoneIcon,
        required: true,
      },
      {
        name: 'awards',
        label: 'Awards',
        type: 'text',
        icon: StarIcon,
        required: true,
      },
      {
        name: 'profile_summery',
        label: 'Profile Summary',
        type: 'text',
        icon: FileTextIcon,
        required: true,
      },
      {
        name: 'counselor',
        label: 'Counselor',
        type: 'select',
        multiple: false,
        icon: UserIcon,
        required: true,
        options: counsellor.map((data) => ({
          label: data.name,
          value: data.id,
        })),
      },
      {
        name: 'level',
        label: 'Level',
        type: 'select',
        icon: BriefcaseIcon,
        required: true,
        options: [
          { label: 'Obstetrics', value: 'Obstetrics' },
          { label: 'Gynaecology', value: 'Gynaecology' },
          { label: 'Infertility', value: 'Infertility' },
          { label: 'Anesthetist', value: 'Anesthetist' },
          { label: 'Anesthesiologist', value: 'Anesthesiologist' },
          { label: 'Andrologist', value: 'Andrologist' },
          { label: 'Urologist', value: 'Urologist' },
        ],
      },
      {
        name: 'add_certificate_button',
        label: 'Upload New Certificate',
        type: 'button',
        onClick: () => setIsCertificateModalOpen(true),
        icon: FileTextIcon,
      },

      {
        name: 'art_treatments',
        label: 'ART Treatment',
        type: 'select',
        multiple: true,
        required: true,
        options: artTreatment.map((art) => ({
          label: art.name,
          value: art.id,
        })),
      },
      {
        name: 'doctor_certificate',
        label: 'Doctor Certificate ID',
        multiple: true,
        type: 'select',
        icon: FileTextIcon,
        required: true,
        options: certificate.map((data) => ({
          label: data.certificate_name,
          value: data.id,
        })),
      },

      {
        name: 'profile_picture',
        label: 'Profile Picture',
        type: 'file',
        icon: FileTextIcon,
        required: true,
      },
      {
        name: 'signature',
        label: 'Signature',
        type: 'file',
        icon: FileTextIcon,
        required: true,
      },
      {
        name: 'e_stamp',
        label: 'E-Stamp',
        type: 'file',
        icon: FileTextIcon,
        required: true,
      },
    ] as FormFieldConfig[]
  ).map((field) => ({
    ...field,
    required: isEditMode ? false : field.required,
  }));

  const handleCertificateSubmit = (data: any) => {
    setCertificates((prev) => [...prev, data]);
    setIsCertificateModalOpen(false);
  };

  const handleDocorFormSubmit = async (data: unknown) => {
    const formData = new FormData();
    const doctor = data as any;
    Object.entries(doctor).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value.join(','));
      } else {
        formData.append(key, value as any);
      }
    });

    if (certificates && certificates.length > 0) {
      const certData = certificates[0];
      if (typeof certData === 'object' && certData !== null) {
        if (certData.certificate_name) {
          formData.append('certificate_name', certData.certificate_name);
        }
        if (certData.certificate_date) {
          formData.append('certificate_date', certData.certificate_date);
        }
        if (certData.certificate_image) {
          formData.append('certificate_image', certData.certificate_image);
        }
      } else {
        formData.append('doctor_certificate', certData);
      }
    }

    if (!auth?.access) {
      toast.error('Authentication token not found.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      if (isEditMode) {
        await updateDoctor(selectedId, formData, auth.access);
        toast.success('Doctor updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setSelectedId('');
      } else {
        await createDoctor(formData, auth.access);
        toast.success('Doctor created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.error(isEditMode ? 'Failed to update doctor:' : 'Failed to create doctor:', error);
      toast.error(
        error?.error ||
          error?.message ||
          (isEditMode ? 'Failed to update doctor' : 'Failed to create doctor'),
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    const fetchCounselors = async () => {
      if (auth?.access) {
        try {
          const res = await getCounsellorList(auth.access);
          if (Array.isArray(res)) {
            setCounsellor(res);
          } else if (res && Array.isArray(res.results)) {
            setCounsellor(res.results);
          } else if (res && Array.isArray(res.data)) {
            setCounsellor(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setCounsellor([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setCounsellor([]);
        }
      }
    };
    fetchCounselors();
    const fetchArtTreatmentDetails = async () => {
      if (auth?.access) {
        try {
          const res = await getArtTreatmentForm(auth.access);
          if (Array.isArray(res)) {
            setArtTreatment(res);
          } else if (res && Array.isArray(res.results)) {
            setArtTreatment(res.results);
          } else if (res && Array.isArray(res.data)) {
            setArtTreatment(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setArtTreatment([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setArtTreatment([]);
        }
      }
    };
    const fetchCertificateList = async () => {
      if (auth?.access) {
        try {
          const res = await getCertificateList(auth.access);
          if (Array.isArray(res)) {
            setCertificate(res);
          } else if (res && Array.isArray(res.results)) {
            setCertificate(res.results);
          } else if (res && Array.isArray(res.data)) {
            setCertificate(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setCertificate([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setCertificate([]);
        }
      }
    };

    fetchCertificateList();
    fetchArtTreatmentDetails();
  }, [auth?.access, setCertificate, setCounsellor]);

  useEffect(() => {
    const fetchCounselors = async () => {
      if (auth?.access) {
        try {
          const res = await getCounsellorList(auth.access);
          if (Array.isArray(res)) {
            setCounsellor(res);
          } else if (res && Array.isArray(res.results)) {
            setCounsellor(res.results);
          } else if (res && Array.isArray(res.data)) {
            setCounsellor(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setCounsellor([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setCounsellor([]);
        }
      }
    };
    fetchCounselors();
  }, [auth?.access, setCounsellor]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="p-6 border w-full md:max-w-md border-border rounded-2xl bg-card/60 backdrop-blur-xl shadow-xl transition-all duration-300 h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold font-heading text-foreground dark:bg-gradient-to-r dark:from-blue-400 dark:to-indigo-400 dark:bg-clip-text dark:text-transparent">
                Available Doctors
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {doctor.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`group p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-1 ${
                    selectedId === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900'
                      : 'bg-card  border-border  hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-linear-to-t from-primary-200 to-white text-white font-bold text-lg shadow-inner">
                      <Image
                        alt="patient"
                        src={doctorImage}
                        width={50}
                        height={50}
                        className="h-15 w-15 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.full_name.trim() || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        ID: {item.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <DoctorDetails
              selectedId={selectedId}
              token={auth?.access}
              // counsellorData={counsellorData}
            />
          </div>
        </div>
        <div className="p-6 flex-1 rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col relative w-full">
            {isEditMode && onReset && (
              <div className="absolute right-0 top-0 z-10 flex justify-end">
                <button
                  type="button"
                  onClick={onReset}
                  className="px-4 py-2 bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/40 dark:text-primary-300 dark:hover:bg-primary-900/60 rounded-xl text-sm font-semibold transition-all shadow-sm border border-primary-200 dark:border-primary-800"
                >
                  + Create New
                </button>
              </div>
            )}
            <DynamicForm
              title={isEditMode ? 'Edit Doctor' : 'Doctor Create Form'}
              fields={doctorFormFields}
              onSubmit={handleDocorFormSubmit}
              submitButtonText={isEditMode ? 'Update Doctor' : 'Create Doctor'}
            />
          </div>
        </div>
        {isCertificateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-xl p-6">
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <CertificateFormWrapper
                onClose={() => setIsCertificateModalOpen(false)}
                onSubmitCertificate={handleCertificateSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorFormWrapper;
