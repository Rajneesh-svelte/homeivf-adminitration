import {
  CHANGE_DOCTOR_APPROVE_API,
  CHANGE_DOCTOR_LIST,
  REJECT_DOCTOR_CHANGE,
} from '@/utils/contants';

export async function getChangeDoctorList(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CHANGE_DOCTOR_LIST}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function approveRequest(token: string, data: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CHANGE_DOCTOR_APPROVE_API}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}

export async function rejectRequest(token: string, data: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${REJECT_DOCTOR_CHANGE}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }

  return result;
}
