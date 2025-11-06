// src/components/AuthButtons.tsx
'use client';

import { 
    RegisterLink, 
    LoginLink
} from '@kinde-oss/kinde-auth-nextjs';

import { 
    useKindeBrowserClient 
} from '@kinde-oss/kinde-auth-nextjs';

export default function AuthButtons() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <>
        </>
      ) : (
        <>
          <LoginLink className=" text-white px-4 py-2 rounded">
            Sign in
          </LoginLink>

          <RegisterLink className="text-white px-4 py-2 rounded">
            Sign up
          </RegisterLink>
        </>
      )}
    </div>
  );
}