import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginResponseData } from '@/Interfaces/LoginResponseData';

interface AuthState {
  auth: LoginResponseData | null;
  setAuth: (data: LoginResponseData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (data) =>
        set({
          auth: data,
        }),
      logout: () =>
        set({
          auth: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
