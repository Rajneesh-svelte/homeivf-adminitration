'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { auth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (auth) {
      if (auth.user_role_type === 'CounsellorHead') {
        if (pathname !== '/doctor-change') {
          router.replace('/doctor-change');
        }
      }
    }
  }, [auth, pathname, router, isMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
}
