import { DoctorSlotProps, Roster } from '@/Interfaces/DoctorSlot';
import { getRoasterList } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { Edit, Edit3, Trash2 } from 'lucide-react';

const DoctorSlot: React.FC<DoctorSlotProps> = ({
  selectedDoctorId,
  onEditAction,
  onDeleteAction,
}) => {
  const { auth } = useAuthStore();

  const [slot, setSlot] = useState<Roster | null>(null);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchDoctorSlot = async () => {
      if (!auth?.access || !selectedDoctorId) return;
      try {
        const res = await getRoasterList(auth.access, selectedDoctorId, selectedDate);
        if (res.data?.length) {
          setSlot(res.data[0]);
        } else {
          setSlot(null);
        }
      } catch (error) {
        console.error('Failed to fetch roster:', error);
        setSlot(null);
      }
    };
    fetchDoctorSlot();
  }, [auth?.access, selectedDoctorId, selectedDate]);

  return (
    <div className="mt-6 ">
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Date
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="inputBaseStyle"
        />
      </div>

      {slot && (
        <>
          <h2 className="mb-4 text-lg font-semibold text-gray-50">
            <span className="bg-primary-50/10 text-primary-400 rounded-lg p-2">
              {slot.doctor_info[0].doctor_name}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mt-2 sm:mt-0">
              <span className="ml-0 sm:ml-4 text-gray-700">
                Start Date:{' '}
                <span className="text-primary-800 dark:text-primary-200">{slot.start_date}</span>
                {'  '}End Date:{' '}
                <span className="text-primary-800 dark:text-primary-200">{slot.end_date}</span>
              </span>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {onEditAction && (
                  <button
                    onClick={() => onEditAction(slot)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                    title="Edit Roster"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {onDeleteAction && (
                  <button
                    onClick={() => onDeleteAction(slot.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    title="Delete Roster"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </h2>

          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Selected Date: <span className="font-semibold text-primary-600">{selectedDate}</span>
          </p>
        </>
      )}
      <div className="  max-h-175  h-175  overflow-auto ">
        {slot?.roster_list?.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {slot.roster_list.map((item) => {
              const isAvailable = item.status === 'Available';

              return (
                <button
                  key={`${item.start_time}-${item.end_time}`}
                  disabled={!isAvailable}
                  className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                    isAvailable
                      ? 'border-green-200 bg-green-50 hover:border-green-500 hover:bg-green-100'
                      : 'cursor-not-allowed border-red-200 bg-red-50 opacity-70'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        isAvailable ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-gray-800">{item.start_time}</p>

                  <p className="text-xs text-gray-500">to {item.end_time}</p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
            No slots available for the selected date.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSlot;
