import { FormFieldConfig } from '@/Interfaces/FormField';
import DynamicForm from './DynamicForm';
import { BuildingIcon, FileTextIcon } from 'lucide-react';
import { useEffect } from 'react';
import { createCertificate, getCertificateList } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
import { useCertificateStore } from '@/store/certificatelist';
import { toast } from 'react-toastify';

interface CertificateFormProps {
  onClose?: () => void;
  onSubmitCertificate?: (data: any) => void;
}

const CertificateFormWrapper: React.FC<CertificateFormProps> = ({
  onClose,
  onSubmitCertificate,
}) => {
  const { auth } = useAuthStore();

  const { setCertificate } = useCertificateStore();

  const certificateForm: FormFieldConfig[] = [
    {
      name: 'certificate_name',
      label: 'Certificate Name',
      type: 'text',
      icon: BuildingIcon,
      required: true,
    },
    {
      name: 'certificate_date',
      label: 'Certificate Date',
      type: 'date',
      icon: BuildingIcon,
      required: true,
    },
    {
      name: 'certificate_image',
      label: 'Certificate Image',
      type: 'file',
      icon: FileTextIcon,
      required: true,
    },
  ];

  const handleCertificateSubmit = async (data: any) => {
    if (!auth?.access) {
      toast.error('Authentication token not found.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    try {
      const response = await createCertificate(formData, auth.access);
      toast.success('Certificate created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      let extractedId = response.id || response.uuid || response._id;
      if (!extractedId && response.data) {
        extractedId = response.data.id || response.data.uuid || response.data._id;
      }
      if (!extractedId && Array.isArray(response) && response.length > 0) {
        extractedId = response[0].id || response[0].uuid;
      }

      if (onSubmitCertificate) {
        onSubmitCertificate({
          id: extractedId,
          ...data,
        });
      }
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error('Failed to create certificate:', error);
      toast.error(
        error?.error || error?.message || 'Failed to create certificate',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    const fetchCertificateList = async () => {
      if (auth?.access) {
        try {
          const res = await getCertificateList(auth.access);
          if (Array.isArray(res)) {
            setCertificate(res);
          } else if (res && Array.isArray(res.results)) {
            setCertificate(res.results);
          } else if (res && Array.isArray(res.data)) {
            setCertificate(res.data);
          } else {
            console.error('Unexpected response format:', res);
            setCertificate([]);
          }
        } catch (error) {
          console.error('Failed to fetch counselors', error);
          setCertificate([]);
        }
      }
    };
    fetchCertificateList();
  }, [auth?.access, setCertificate]);

  return (
    <div>
      <DynamicForm
        title="Certificate Form"
        fields={certificateForm}
        onSubmit={handleCertificateSubmit}
        submitButtonText="Create Certificate"
      />
    </div>
  );
};

export default CertificateFormWrapper;
