"use client";

import { useState } from 'react';
import { useActionState } from 'react';
import { chooseFreePlan } from "./actions"; // Corrected path
import Link from 'next/link';

type SecurityMode = 'VAULT' | 'SPOTLIGHT';

export default function SubscribePage() {
  const [selectedMode, setSelectedMode] = useState<SecurityMode>('VAULT');
  const [state, formAction] = useActionState(chooseFreePlan, { error: undefined });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#111827] to-[#0c0a1d] text-white p-8">
      <form action={formAction} className="w-full flex flex-col items-center">
        <input type="hidden" name="securityMode" value={selectedMode} />
        <div className="w-full max-w-3xl mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">First, Choose Your Security Model</h1>
          <p className="text-gray-400 mb-6">This choice determines the default privacy of your projects.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div
              onClick={() => setSelectedMode('VAULT')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 w-full ${selectedMode === 'VAULT' ? 'border-electric-blue bg-blue-900/20 shadow-lg shadow-electric-blue/20' : 'border-gray-700 bg-black/20 hover:border-gray-500'}`}
            >
              <h2 className="text-xl font-semibold mb-2">🛡️ Vault Mode</h2>
              <p className="text-gray-400">For absolute privacy. Projects are private by default.</p>
            </div>
            <div
              onClick={() => setSelectedMode('SPOTLIGHT')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 w-full ${selectedMode === 'SPOTLIGHT' ? 'border-electric-blue bg-blue-900/20 shadow-lg shadow-electric-blue/20' : 'border-gray-700 bg-black/20 hover:border-gray-500'}`}
            >
              <h2 className="text-xl font-semibold mb-2">💡 Spotlight Mode</h2>
              <p className="text-gray-400">For public-facing work and collaboration.</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-10">Now, Choose Your Plan</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-black/40 border border-gray-700 rounded-lg p-8 w-full max-w-sm flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-electric-blue">Full Access Plan</h3>
              <div className="flex items-baseline mb-6"><span className="text-4xl font-bold">$39</span><span className="text-gray-400 ml-1">/ month</span></div>
              <ul className="space-y-2 text-gray-300 mb-6 flex-grow text-left">
                <li>✓ Access to all AI models</li>
                <li>✓ Unlimited private projects</li>
                <li>✓ Priority support</li>
              </ul>
              <Link href="/payment" className="w-full bg-electric-blue text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300 block text-center">
                Proceed to Payment
              </Link>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-8 w-full max-w-sm flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-gray-300">Free Demo Plan</h3>
              <div className="flex items-baseline mb-6"><span className="text-4xl font-bold">$0</span></div>
              <ul className="space-y-2 text-gray-300 mb-8 flex-grow text-left">
                <li>✓ Access to demo templates</li>
                <li>✓ Use free-tier AI models</li>
                <li>✓ Explore the platform</li>
              </ul>
              <button type="submit" className="w-full bg-gray-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-300 block text-center">
                Continue for Free
              </button>
            </div>
          </div>
          {state.error && <p className="mt-4 text-lg text-red-500">{state.error}</p>}
        </div>
      </form>
    </main>
  );
}