import { CousellorFormData } from '@/Interfaces/CousellorFormData';
import {
  CERTIFICATE_API,
  COUSELLOR_LIST,
  CREATE_DOCTOR_API,
  CREATE_ROASTER_FORM,
  GET_ART_TREATMENT_API,
  GET_COUNSELLOR_API,
  GET_DOCTOR_API,
} from '@/utils/contants';
import { toast } from 'react-toastify';

export async function getCounsellorList(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${COUSELLOR_LIST}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch counsellor list');
    throw error;
  }
}

export async function createCounsellor(formData: CousellorFormData, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${COUSELLOR_LIST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to create counsellor');
    throw error;
  }
}

export async function updateCounsellor(
  id: string,
  formData: Partial<CousellorFormData>,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${GET_COUNSELLOR_API}${id}/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to update counsellor');
    throw error;
  }
}

export async function updateDoctor(
  id: string,
  formData: FormData,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${GET_DOCTOR_API}${id}/`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to update doctor');
    throw error;
  }
}

export async function getArtTreatmentForm(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${GET_ART_TREATMENT_API}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch ART treatment form');
    throw error;
  }
}

export async function getCertificateList(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CERTIFICATE_API}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch certificate list');
    throw error;
  }
}

export async function createDoctor(formData: FormData, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CREATE_DOCTOR_API}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to create doctor');
    throw error;
  }
}

export async function createCertificate(formData: FormData, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CERTIFICATE_API}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to create certificate');
    throw error;
  }
}

export async function createRoaster(formData: FormData, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CREATE_ROASTER_FORM}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to create roaster');
    throw error;
  }
}

export async function updateRoaster(data: any, token: string, id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CREATE_ROASTER_FORM}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to update roaster');
    throw error;
  }
}

export async function deleteRoaster(token: string, id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CREATE_ROASTER_FORM}${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw result;
    }
    return true;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to delete roaster');
    throw error;
  }
}

export async function getDoctorList(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CREATE_DOCTOR_API}`, {
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

export async function getRoasterList(token: string, id: string, date: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${CREATE_ROASTER_FORM}?doctor_id=${id}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch roaster list');
    throw error;
  }
}

export async function getDoctorDetailsData(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${GET_DOCTOR_API}${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch doctor details');
    throw error;
  }
}

export async function getCounsellorDetails(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${GET_COUNSELLOR_API}${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    toast.error(error?.error || error?.message || 'Failed to fetch counsellor details');
    throw error;
  }
}
