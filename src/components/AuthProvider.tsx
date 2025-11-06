// src/components/AuthProvider.tsx
'use client';

import { ReactNode } from 'react';
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <KindeProvider>{children}</KindeProvider>;
}