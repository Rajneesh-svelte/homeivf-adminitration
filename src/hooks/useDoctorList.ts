import { getDoctorList } from '@/services/user';
import { useDoctorListStore } from '@/store/DoctorStore';
import { useEffect, useState } from 'react';

export const useDoctorList = (token: any) => {
  // const [doctorList, setDoctorList] = useState([]);
  const { setDoctorList, doctor } = useDoctorListStore();
  useEffect(() => {
    const fetchCounselors = async () => {
      if (token) {
        try {
          const res = await getDoctorList(token);
          if (Array.isArray(res)) {
            setDoctorList(res);
          } else if (res && Array.isArray(res.results)) {
            setDoctorList(res.results);
          } else if (res && Array.isArray(res.data)) {
            setDoctorList(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setDoctorList([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setDoctorList([]);
        }
      }
    };
    fetchCounselors();
  }, [token]);
  return { doctor };
};
