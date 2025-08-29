"use client";

// --- MODIFIED: Import 'useActionState' from React ---
import { useActionState } from 'react';
import { resetPassword } from "app/reset-password/actions";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const initialState = {
  error: undefined,
  success: undefined,
};

export default function ResetPasswordPage() {
  // --- MODIFIED: Changed 'useFormState' to 'useActionState' ---
  const [state, formAction] = useActionState(resetPassword, initialState);
  
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 rounded-lg border border-gray-700 bg-black/40 p-10 shadow-lg shadow-electric-blue/20">
        
        {token ? (
          // Set New Password Form
          <div>
            <h1 className="mb-4 text-center text-5xl font-bold">Set a New Password</h1>
            <form action={formAction} className="space-y-8 mt-8">
              {/* ... form content ... */}
              <input type="hidden" name="token" value={token} />
              <div>
                <label htmlFor="password" className="block text-xl font-bold text-gray-200">New Password</label>
                <input id="password" name="password" type="password" required className="mt-2 w-full rounded-lg border border-gray-500 bg-gray-900 p-5 text-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue" placeholder="Enter your new password" />
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="block text-xl font-bold text-gray-200">Confirm New Password</label>
                <input id="passwordConfirm" name="passwordConfirm" type="password" required className="mt-2 w-full rounded-lg border border-gray-500 bg-gray-900 p-5 text-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue" placeholder="Confirm your new password" />
              </div>
              {state.error && <p className="text-lg text-red-500">{state.error}</p>}
              {state.success && (
                <div>
                  <p className="text-lg text-green-500">{state.success}</p>
                  <Link href="/login" className="mt-4 block text-center font-semibold text-electric-blue hover:underline">
                    Click here to log in
                  </Link>
                </div>
              )}
              <button type="submit" className="w-full rounded-lg bg-electric-blue py-5 text-2xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-500">Reset Password</button>
            </form>
          </div>
        ) : (
          // Request Reset Link Form
          <div>
            <h1 className="mb-4 text-center text-5xl font-bold">Forgot Your Password?</h1>
            <p className="text-center text-lg text-gray-400">
              Enter the email address associated with your account, and we will send a link to reset it.
            </p>
            <form action={formAction} className="space-y-8 mt-8">
              {/* ... form content ... */}
              <div>
                <label htmlFor="email" className="block text-xl font-bold text-gray-200">Email</label>
                <input id="email" name="email" type="email" required className="mt-2 w-full rounded-lg border border-gray-500 bg-gray-900 p-5 text-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue" placeholder="Enter your email" />
              </div>
              {state.error && <p className="text-lg text-red-500">{state.error}</p>}
              {state.success && <p className="text-lg text-green-500">{state.success}</p>}
              <button type="submit" className="w-full rounded-lg bg-electric-blue py-5 text-2xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-500">Send Reset Link</button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}