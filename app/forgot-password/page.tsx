"use client";

import { useFormState } from 'react-dom';
import { requestPasswordReset } from './actions';

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordReset, { error: undefined, success: undefined });

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 rounded-lg border border-gray-700 bg-black/40 p-10 shadow-lg shadow-electric-blue/20">
        <div>
          <h1 className="mb-4 text-center text-5xl font-bold">Forgot Your Password?</h1>
          <p className="text-center text-lg text-gray-400">
            No problem. Enter the email address associated with your account, and we will send you a link to reset your password.
          </p>
        </div>
        <form action={formAction} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-xl font-bold text-gray-200">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="mt-2 w-full rounded-lg border border-gray-500 bg-gray-900 p-5 text-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue" 
              placeholder="Enter your email" 
            />
          </div>
          
          {state.error && <p className="text-lg text-red-500">{state.error}</p>}
          {state.success && <p className="text-lg text-green-500">{state.success}</p>}

          <button type="submit" className="w-full rounded-lg bg-electric-blue py-5 text-2xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-500">
            Send Reset Link
          </button>
        </form>
      </div>
    </main>
  );
}