'use client';
import { BuildingIcon, FileTextIcon } from 'lucide-react';
import DynamicForm from './DynamicForm';
import { FormFieldConfig } from '@/Interfaces/FormField';
import { createRoaster, getDoctorList, updateRoaster, deleteRoaster } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import DoctorSlot from './DoctorSlot';
import { toast } from 'react-toastify';
import { useDoctorList } from '@/hooks/useDoctorList';

const RoasterFormWrapper = () => {
  const { auth } = useAuthStore();
  const { doctor } = useDoctorList(auth?.access);

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [editingRoster, setEditingRoster] = useState<any>(null);
  console.log('editingRoster', editingRoster?.id);

  const handleChange = (field: any, value: any) => {
    if (field === 'assign_doctor') {
      setSelectedDoctorId(value);
    }
  };

  const RoasterForm: FormFieldConfig[] = [
    {
      name: 'assign_doctor',
      label: 'Assign Doctor',
      type: 'select',
      multiple: false,
      icon: BuildingIcon,
      required: true,
      options: doctor.map((data) => ({
        label: data.full_name,
        value: data.id,
      })),
    },
    {
      name: 'start_date',
      label: 'Start Date',
      type: 'date',

      required: true,
    },
    {
      name: 'end_date',
      label: 'End Date',
      type: 'date',

      required: true,
    },
    {
      name: 'shifts',
      label: 'Shift',
      multiple: false,
      type: 'select',
      icon: FileTextIcon,
      required: true,
      options: [
        { label: 'Morning ', value: 'Morning' },
        { label: 'Evening', value: 'Evening' },
        { label: 'General ', value: 'General' },
        { label: 'Night', value: 'Night' },
      ],
    },

    {
      name: 'start_time',
      label: 'Start Time',
      type: 'time',

      required: true,
    },
    {
      name: 'end_time',
      label: 'End Time',
      type: 'time',

      required: true,
    },

    {
      name: 'slot_durations',
      label: 'Slot Duration',
      type: 'select',
      multiple: false,
      icon: BuildingIcon,
      required: true,
      options: [
        { label: '15 minutes', value: '15' },
        { label: '30 minutes ', value: '30' },
        { label: '45 minutes', value: '45' },
      ],
    },
  ];

  const handleRoasterFormSubmit = async (data: any) => {
    if (!auth?.access) {
      toast.error('Authentication token not found.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const payload: any = {
        shifts: data.shifts,
        start_date: data.start_date,
        end_date: data.end_date,
        start_time: data.start_time,
        end_time: data.end_time,
        slot_durations: Number(data.slot_durations),
      };

      let response;
      if (editingRoster) {
        response = await updateRoaster(payload, auth.access, editingRoster.id);
      } else {
        payload.assign_doctor = data.assign_doctor;
        response = await createRoaster(payload, auth.access);
      }

      if (response?.error) {
        toast.error(response.error, {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      toast.success(`Doctor roster ${editingRoster ? 'updated' : 'created'} successfully!`, {
        position: 'top-right',
        autoClose: 3000,
      });

      setEditingRoster(null);
    } catch (error: any) {
      console.error(`${editingRoster ? 'Update' : 'Create'} roster failed:`, error);

      toast.error(
        error?.error ||
          error?.message ||
          `Failed to ${editingRoster ? 'update' : 'create'} doctor roster.`,
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  const handleEditRoster = (roster: any) => {
    setEditingRoster(roster);
    setSelectedDoctorId(roster.assign_doctor);
  };

  const handleDeleteRoster = async (rosterId: string) => {
    if (!auth?.access) return;

    if (!window.confirm('Are you sure you want to delete this roster?')) {
      return;
    }

    try {
      await deleteRoaster(auth.access, rosterId);
      toast.success('Doctor roster deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      if (editingRoster?.id === rosterId) {
        setEditingRoster(null);
      }
    } catch (error: any) {
      console.error('Delete roster failed:', error);
      toast.error(error?.error || error?.message || 'Failed to delete doctor roster.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className=" max-w-2xl w-1/5 p-6 bg-white/60 flex-1 rounded-2xl border border-gray-200 dark:border-gray-800   dark:bg-gray-900/60 backdrop-blur-xl shadow-xl h-screen">
        <DynamicForm
          title={editingRoster ? 'Edit Roaster Details' : 'Roaster Details / Form '}
          fields={RoasterForm}
          onChange={handleChange}
          onSubmit={handleRoasterFormSubmit}
          initialData={editingRoster}
          submitButtonText={editingRoster ? 'Update Roaster' : 'Create Roaster Form'}
        />
        {editingRoster && (
          <button
            onClick={() => setEditingRoster(null)}
            className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </div>
      <div className="  p-6 bg-white/60 flex-1 rounded-2xl border border-gray-200 dark:border-gray-800   dark:bg-gray-900/60 backdrop-blur-xl shadow-xl h-screen">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold font-heading  dark:text-gray-50 text-gray-900 dark:from-blue-400 dark:to-indigo-400">
            Slots Preview
          </h3>
        </div>
        <DoctorSlot
          selectedDoctorId={selectedDoctorId}
          onEditAction={handleEditRoster}
          onDeleteAction={handleDeleteRoster}
        />
      </div>
    </div>
  );
};

export default RoasterFormWrapper;
