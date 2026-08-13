import { Roster } from '@/Interfaces/DoctorSlot';
import { getRoasterList } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

interface UseDoctorSlotProps {
  selectedDoctorId: string;
  selectedDate: string;
}

export const useDoctorSlot = ({ selectedDoctorId, selectedDate }: UseDoctorSlotProps) => {
  const { auth } = useAuthStore();
  const [slot, setSlot] = useState<Roster | null>(null);

  useEffect(() => {
    const fetchDoctorSlot = async () => {
      if (!selectedDoctorId || !selectedDate) {
        setSlot(null);
        return;
      }
      try {
        if (!auth?.access) return;
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

  return { slot };
};
