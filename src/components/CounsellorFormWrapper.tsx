'use client';

import React, { useMemo } from 'react';
import DynamicForm from './DynamicForm';
import { FormFieldConfig } from '@/Interfaces/FormField';
import { createCounsellor, updateCounsellor } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-toastify';
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
  PersonStandingIcon,
} from 'lucide-react';

const counsellorFields: FormFieldConfig[] = [
  { name: 'first_name', label: 'First Name', type: 'text', icon: UserIcon, required: true },
  { name: 'last_name', label: 'Last Name', type: 'text', icon: UserIcon, required: true },
  { name: 'email', label: 'Email Address', type: 'email', icon: MailIcon, required: true },
  { name: 'mobile_number', label: 'Mobile Number', type: 'text', icon: PhoneIcon, required: true },
  {
    name: 'alternative_mobile_number',
    label: 'Alternate Mob. Number',
    type: 'text',
    icon: PhoneIcon,
    required: true,
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
    required: true,
    icon: PersonStandingIcon,
    options: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
  },
];

interface Props {
  initialData?: any;
  counsellorId?: string;
  onReset?: () => void;
}

const CounsellorFormWrapper: React.FC<Props> = ({ initialData, counsellorId, onReset }) => {
  const { auth } = useAuthStore();
  const isEditMode = !!counsellorId;

  const dynamicFields = useMemo(() => {
    return counsellorFields.map((field) => ({
      ...field,
      required: isEditMode ? false : field.required,
    }));
  }, [isEditMode]);

  const handleCounsellorSubmit = async (data: any) => {
    if (!auth?.access) {
      toast.error('Authentication token not found.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    try {
      if (isEditMode) {
        // Only include fields that have been changed
        const changedData = Object.keys(data).reduce((acc, key) => {
          // Compare with initialData if it exists
          if (initialData && data[key] !== initialData[key]) {
            // Also handle cases where initialData might have undefined and data has empty string
            if (!(initialData[key] === undefined && data[key] === '')) {
              acc[key] = data[key];
            }
          }
          return acc;
        }, {} as any);

        if (Object.keys(changedData).length === 0) {
          toast.info('No changes detected to update.', {
            position: 'top-right',
            autoClose: 3000,
          });
          return;
        }

        await updateCounsellor(counsellorId, changedData, auth.access);
        toast.success('Counselor updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        await createCounsellor(data, auth.access);
        toast.success('Counselor created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.error(
        isEditMode ? 'Failed to update counselor:' : 'Failed to create counselor:',
        error
      );
      toast.error(
        error?.error || error?.message || (isEditMode ? 'Failed to update counselor' : 'Failed to create counselor'),
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  return (
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
        title={isEditMode ? 'Edit Counsellor' : 'Counsellor Create Form'}
        fields={dynamicFields}
        onSubmit={handleCounsellorSubmit}
        submitButtonText={isEditMode ? 'Update Counsellor' : 'Create Counsellor'}
        initialData={initialData}
      />
    </div>
  );
};

export default CounsellorFormWrapper;
