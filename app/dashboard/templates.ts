// This file contains all demo templates for free users.

// We define a structure for what a message in a script looks like
export interface ScriptMessage {
  senderName: 'Logos' | 'Pathos' | 'Kairos' | 'Tutorial Guide';
  content: string;
  type: 'ai-message' | 'user-prompt-challenge'; // Differentiates between AI speech and user tasks
}

// We define the structure for a whole template
export interface DemoTemplate {
  id: string;
  title: string;
  description: string;
  script: ScriptMessage[];
}

// Our library of templates. We can add more objects to this array later.
export const demoTemplates: DemoTemplate[] = [
  {
    id: 'synergy-session-1',
    title: 'The Synergy Session: Your First AI Council',
    description: 'Witness a live collaboration between three specialized AIs and learn how to direct them to achieve a breakthrough idea.',
    script: [
      {
        senderName: 'Tutorial Guide',
        type: 'ai-message',
        content: "Welcome, Director. You are about to witness your first AI Council meeting. Their goal: design a new fitness app. Observe how they work together.",
      },
      {
        senderName: 'Logos',
        type: 'ai-message',
        content: "Analyzing market data. The target demographic shows a 67% drop-off rate after 30 days with current fitness apps. The primary reason cited is 'lack of motivation'.",
      },
      {
        senderName: 'Pathos',
        type: 'ai-message',
        content: "That's not a data problem; it's a human problem. We don't need more tracking; we need more connection. The app should feel like a supportive teammate, not a drill sergeant.",
      },
      {
        senderName: 'Kairos',
        type: 'ai-message',
        content: "Pathos is right. The market opportunity isn't in features, it's in feeling. If we combine Logos' data with Pathos' focus on human connection, we can create an app that anticipates motivational dips and offers encouragement *before* a user quits.",
      },
      {
        senderName: 'Tutorial Guide',
        type: 'user-prompt-challenge',
        content: "Now, it's your turn to direct. Assign Logos the role of 'Lead Analyst' and Pathos the role of 'UX Advocate'. Type this command into the chat below and press Enter:\n\n`Everyone, for this project, Logos will be the Lead Analyst and Pathos will be the UX Advocate.`"
      },
      // We will add the rest of the script in the next phase
    ],
  },
  // We can add another template here later
  // { id: 'startup-idea-1', title: 'Startup Idea Brainstormer', ... }
];