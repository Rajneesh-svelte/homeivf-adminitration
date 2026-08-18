import {
  CHANGE_DOCTOR_APPROVE_API,
  CHANGE_DOCTOR_LIST,
  REJECT_DOCTOR_CHANGE,
  CHANGE_DOCTOR_DATES_API,
  CHANGE_DOCTOR_SLOTS_API,
} from '@/utils/contants';
import { toast } from 'react-toastify';

export async function getChangeDoctorList(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CHANGE_DOCTOR_LIST}`, {
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

export async function approveRequest(token: string, data: any) {
  try {
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
    toast.success('Request approved successfully');
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to approve request');
    throw error;
  }
}

export async function rejectRequest(token: string, data: any) {
  try {
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
    toast.success('Request rejected successfully');
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to reject request');
    throw error;
  }
}

export async function getChangeDoctorDates(token: string, requestId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CHANGE_DOCTOR_DATES_API}${requestId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch doctor dates');
    throw error;
  }
}

export async function getChangeDoctorSlots(token: string, requestId: string, appointmentDate: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CHANGE_DOCTOR_SLOTS_API}${requestId}/?appointment_date=${appointmentDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch doctor slots');
    throw error;
  }
}
