import { ADMIN_LOGIN } from '@/utils/contants';

export async function login(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${ADMIN_LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
