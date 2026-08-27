import { useAuthStore } from '@/store/authStore';
import { REFRESH_TOKEN } from '@/utils/contants';

let isRefreshing = false;
let failedQueue: { resolve: (value: string) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

export const fetchApi = async (url: string, options?: RequestInit): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    const authStore = useAuthStore.getState();
    const auth = authStore.auth;

    if (auth?.refresh) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          const newOptions = { ...options };
          if (newOptions.headers) {
            (newOptions.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
          }
          return fetch(url, newOptions);
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${REFRESH_TOKEN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: auth.refresh }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          authStore.setAuth({
            ...auth,
            access: data.access,
            refresh: data.refresh || auth.refresh,
          });

          isRefreshing = false;
          processQueue(null, data.access);

          const newOptions = { ...options };
          if (newOptions.headers) {
            (newOptions.headers as Record<string, string>)['Authorization'] = `Bearer ${data.access}`;
          }
          return fetch(url, newOptions);
        } else {
          throw new Error('Refresh token invalid or expired');
        }
      } catch (error) {
        isRefreshing = false;
        processQueue(error, null);
        authStore.logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    } else {
      authStore.logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(new Error('Unauthorized'));
    }
  }

  return response;
};
