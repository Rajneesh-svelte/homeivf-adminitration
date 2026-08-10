import { create } from 'zustand';
import { CousellorFormData } from '@/Interfaces/CousellorFormData';

interface FormStore {
  formData: CousellorFormData;
  setFormData: (data: Partial<CousellorFormData>) => void;
  resetForm: () => void;
}

const initialData: CousellorFormData = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  alternative_mobile_number: '',
  password: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
  role_type: '',
  designation: '',
  qualification: '',
  experience_in_year: '',
  rating: '',
  gender: '',
};

export const useFormStore = create<FormStore>((set) => ({
  formData: initialData,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: initialData }),
}));
