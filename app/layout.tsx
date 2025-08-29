import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SyncTeamAI - Orchestrate Your AI Council",
  description: "Assemble specialized AI agents. Watch them collaborate in real-time. Direct the future of creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: '#111827',
          colorInputBackground: '#1f2937',
          colorText: '#ffffff',
          colorInputText: '#ffffff',
          colorPrimary: '#0070f3',
          fontSize: '1.25rem',
          spacingUnit: '0.7rem',
          borderRadius: '0.5rem',
        },
        elements: {
          card: {
            backgroundColor: '#1f2937',
            width: '100%',
            maxWidth: '50rem',    // Cap width on desktop
            minHeight: 'auto',    // Auto-expand vertically
            padding: '2.5rem',
            margin: '0 auto',     // Center horizontally
            boxSizing: 'border-box',
          },
          formFieldLabel: {
            fontSize: '1.3rem',
          },
          formFieldInput: {
            fontSize: '1.4rem',
            paddingBlock: '1rem',
            paddingInline: '1rem'
          },
          formButtonPrimary: {
            fontSize: '1.4rem',
            height: '4.5rem',
          },
          headerTitle: {
            fontSize: '2.5rem',
            lineHeight: '1.3',
          },
          headerSubtitle: {
            fontSize: '1.5rem',
            lineHeight: '1.4',
          },
          socialButtonsBlockButton: {
            fontSize: '1.25rem',
            height: '4rem',
            backgroundColor: '#374151',
            color: '#ffffff',
            border: '1px solid #4b5563',
            '&:hover': {
              backgroundColor: '#4b5563',
            },
          },
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-[#111827] text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}