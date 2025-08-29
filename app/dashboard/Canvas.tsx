"use client";

import { useState } from 'react';
import TemplateSelector from "app/dashboard/TemplateSelector";
import { type DemoTemplate } from "app/dashboard/templates";

// Define the props that the Canvas component will accept
interface CanvasProps {
  userPlan: string;
  securityMode: string;
}

export default function Canvas({ userPlan }: CanvasProps) {
  const [activeTemplate, setActiveTemplate] = useState<DemoTemplate | null>(null);

  // If a free user has selected a template, show the demo.
  if (userPlan === 'FREE' && activeTemplate) {
    return (
      <section className="flex h-full flex-grow flex-col p-6">
        <div className="flex-grow overflow-y-auto">
          <h1 className="text-2xl font-bold text-white">{activeTemplate.title}</h1>
          <p className="text-gray-400 mt-2">The full, interactive demo script will be displayed here.</p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Follow the tutorial instructions here..."
            className="w-full rounded-lg border border-electric-blue bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
          />
        </div>
      </section>
    );
  }

  // If the user is on a free plan and has NOT selected a template, show the selector.
  if (userPlan === 'FREE') {
    return <TemplateSelector onSelectTemplate={setActiveTemplate} />;
  }

  // Otherwise (if the user is on a paid plan), show the full, empty canvas.
  return (
    <section className="flex h-full flex-grow flex-col p-6">
      <div className="flex-grow overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Your Orchestration Canvas is ready.</p>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Direct your AI Council..."
          className="w-full rounded-lg border border-electric-blue bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
        />
      </div>
    </section>
  );
}