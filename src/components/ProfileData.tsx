'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import CounsellorFormWrapper from './CounsellorFormWrapper';
import { getCounsellorDetails, getCounsellorList } from '@/services/user';
import { useCounsellorListStore } from '@/store/counsellorStore';
import CounsellorDetails from './CounsellorDetails';
import counsellorImage from '@/../public/avatars/counsellor.png';
import Image from 'next/image';

export default function ProfileData() {
  const { auth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { setCounsellor, counsellor } = useCounsellorListStore();
  const [selectedId, setSelectedId] = useState('');
  const [counsellorData, setCounsellorData] = useState<any>();

  useEffect(() => {
    const fetchCounselors = async () => {
      if (auth?.access) {
        try {
          setLoading(true);
          const res = await getCounsellorList(auth.access);
          if (Array.isArray(res)) {
            setCounsellor(res);
          } else if (res && Array.isArray(res.results)) {
            setCounsellor(res.results);
          } else if (res && Array.isArray(res.data)) {
            setCounsellor(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setCounsellor([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setCounsellor([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchCounselors();
  }, [auth?.access, setCounsellor]);

  useEffect(() => {
    const fetchCounsellorDetails = async () => {
      if (auth?.access && selectedId) {
        try {
          const res = await getCounsellorDetails(auth?.access, selectedId);
          setCounsellorData(res);
        } catch (error) {
          console.error('Failed to fetch doctor details:', error);
          setCounsellorData(null);
        }
      } else {
        setCounsellorData(null);
      }
    };
    fetchCounsellorDetails();
  }, [auth?.access, selectedId, setCounsellor]);

  if (loading) {
    return (
      <div className="p-6 max-w-md border border-border rounded-2xl bg-card/50 backdrop-blur-xl shadow-lg animate-pulse">
        <div className="h-7 w-48 bg-gray-200 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!counsellor || counsellor.length === 0) {
    return (
      <div className="mt-6 p-6 border border-border rounded-2xl bg-card/50 backdrop-blur-xl shadow-lg">
        <h3 className="text-xl font-bold font-heading text-foreground mb-4">
          Counselors List
        </h3>
        <p className="text-gray-500">No counselors found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="p-6 border w-full md:max-w-md border-border rounded-2xl bg-card/60 backdrop-blur-xl shadow-xl transition-all duration-300 h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-heading text-foreground dark:bg-gradient-to-r dark:from-blue-400 dark:to-indigo-400 dark:bg-clip-text dark:text-transparent">
              Available Counselors
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {counsellor.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-1 ${
                  selectedId === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900'
                    : 'bg-card  border-border  hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-linear-to-t from-primary-200 to-white text-white font-bold text-lg shadow-inner">
                    {/* {item.name.trim().charAt(0).toUpperCase()} */}
                    <Image
                      alt="patient"
                      src={counsellorImage}
                      width={50}
                      height={50}
                      className="h-15 w-15 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name.trim() || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      ID: {item.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <CounsellorDetails counsellorData={counsellorData} />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-xl w-full">
        <CounsellorFormWrapper
          counsellorId={selectedId}
          initialData={counsellorData}
          onReset={() => {
            setSelectedId('');
            setCounsellorData(null);
          }}
        />
      </div>
    </div>
  );
}
