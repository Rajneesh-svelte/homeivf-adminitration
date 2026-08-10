import { create } from 'zustand';
import { CertificateList } from '@/Interfaces/CertificateList';

interface CertificateStore {
  certificate: CertificateList[];
  setCertificate: (data: CertificateList[]) => void;
  resetCertificate: () => void;
}

export const useCertificateStore = create<CertificateStore>((set) => ({
  certificate: [],

  setCertificate: (data) =>
    set({
      certificate: data,
    }),

  resetCertificate: () =>
    set({
      certificate: [],
    }),
}));
