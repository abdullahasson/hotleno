"use client";

// Auth
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  // Show a proper loading state
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="mt-4">Checking authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold mb-4">
          Authentication Required
        </h1>

        <p className="mb-6">
          Please sign in to access this page.
        </p>
        
        <div className="flex gap-3">
          <LoginLink className="rounded-md bg-blue-400 py-2 px-4 text-white hover:bg-blue-500 transition-colors">
            Sign In
          </LoginLink>
          <RegisterLink className="rounded-md bg-gray-400 py-2 px-4 text-white hover:bg-gray-500 transition-colors">
            Sign Up
          </RegisterLink>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
