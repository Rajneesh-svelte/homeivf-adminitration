import { DoctorList } from '@/Interfaces/DoctorList';
import { create } from 'zustand';

interface DoctorStore {
  doctor: DoctorList[];
  setDoctorList: (data: DoctorList[]) => void;
  resetDoctorList: () => void;
}

export const useDoctorListStore = create<DoctorStore>((set) => ({
  doctor: [],

  setDoctorList: (data) =>
    set({
      doctor: data,
    }),

  resetDoctorList: () =>
    set({
      doctor: [],
    }),
}));
