import { useAuthStore } from '@/store/authStore';

export const fetchApi = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  console.log('response Status', response.status);

  if (response.status === 401) {
    useAuthStore.getState().logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
};
