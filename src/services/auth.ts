import { REFRESH_TOKEN } from '@/utils/contants';
import { toast } from 'react-toastify';
import { fetchApi } from '@/utils/fetchApi';

/**
 * @deprecated Token refreshing is now handled automatically by the fetchApi utility interceptor.
 */
export async function getRefreshToken(token: string) {
  try {
    const response = await fetchApi(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${REFRESH_TOKEN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch doctor list');
    throw error;
  }
}
