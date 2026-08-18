'use client';

import React, { useEffect, useState } from 'react';
import DynamicForm from './DynamicForm';
import { FormFieldConfig } from '@/Interfaces/FormField';
import { useAuthStore } from '@/store/authStore';
import {
  FileTextIcon,
  ImageIcon,
  PaletteIcon,
  ListOrderedIcon,
  HelpCircleIcon,
  HeadingIcon,
  TypeIcon,
  BuildingIcon,
} from 'lucide-react';
import { getArtTreatmentForm } from '@/services/user';

const artTreatmentFields: FormFieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', icon: FileTextIcon, required: true },
  {
    name: 'department_name',
    label: 'Department Name',
    type: 'text',
    icon: BuildingIcon,
    required: true,
  },
  { name: 'title', label: 'Title', type: 'text', icon: HeadingIcon, required: true },
  { name: 'subtitle', label: 'Subtitle', type: 'text', icon: TypeIcon, required: true },
  {
    name: 'colour_code',
    label: 'Colour Code (e.g. #FF5733)',
    type: 'text',
    icon: PaletteIcon,
    required: true,
  },
  { name: 'order', label: 'Order', type: 'number', icon: ListOrderedIcon, required: true },
  {
    name: 'on_dashboard',
    label: 'On Dashboard',
    type: 'select',
    required: true,
    options: [
      { label: 'True', value: 'true' },
      { label: 'False', value: 'false' },
    ],
  },
  { name: 'faq', label: 'FAQ', type: 'text', icon: HelpCircleIcon, required: true },
  { name: 'main_image', label: 'Main Image', type: 'file', icon: ImageIcon, required: true },
  { name: 'banner_image', label: 'Banner Image', type: 'file', icon: ImageIcon, required: true },
];

const ArtTreatmentFormWrapper: React.FC = () => {
  const { auth } = useAuthStore();
  const [artTreatment, setArtTreatment] = useState<any[]>([]);

  const handleArtTreatmentSubmit = async (data: any) => {
    if (!auth?.access) {
      console.error('No auth token available');
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    try {
      alert('Art Treatment logged to console! (API not yet implemented)');
    } catch (error) {
      console.error('Failed to create Art Treatment:', error);
      alert('Failed to create Art Treatment');
    }
  };

  useEffect(() => {
    const fetchArtTreatmentDetails = async () => {
      if (auth?.access) {
        try {
          const res = await getArtTreatmentForm(auth.access);
          if (Array.isArray(res)) {
            setArtTreatment(res);
          } else if (res && Array.isArray(res.results)) {
            setArtTreatment(res.results);
          } else if (res && Array.isArray(res.data)) {
            setArtTreatment(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setArtTreatment([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setArtTreatment([]);
        }
      }
    };
    fetchArtTreatmentDetails();
  }, [auth?.access]);

  return (
    <>
      <div className="flex gap-2">
        <div className="p-6 border border-border rounded-2xl bg-card/60 backdrop-blur-xl shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-heading text-foreground dark:from-blue-400 dark:to-indigo-400">
              Art Treatment Form
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 h-[50vh] overflow-auto">
            {artTreatment.map((art) => (
              <div
                key={art.id}
                className="group p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-linear-to-br from-primary-400 to-primary-600 text-white font-bold text-lg shadow-inner">
                    {art.name.trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {art.name.trim() || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      ID: {art.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 bg-card/60 flex-1 rounded-2xl border border-border backdrop-blur-xl shadow-xl">
          <DynamicForm
            title="Art Treatment Create Form"
            fields={artTreatmentFields}
            onSubmit={handleArtTreatmentSubmit}
            submitButtonText="Create Art Treatment"
          />
        </div>
      </div>
    </>
  );
};

export default ArtTreatmentFormWrapper;
