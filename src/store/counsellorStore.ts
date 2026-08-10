import { create } from 'zustand';
import { CounsellorList } from '@/Interfaces/CounsellorInterface';

interface CounsellorStore {
  counsellor: CounsellorList[];
  setCounsellor: (data: CounsellorList[]) => void;
  resetCounsellor: () => void;
}

export const useCounsellorListStore = create<CounsellorStore>((set) => ({
  counsellor: [],

  setCounsellor: (data) =>
    set({
      counsellor: data,
    }),

  resetCounsellor: () =>
    set({
      counsellor: [],
    }),
}));
