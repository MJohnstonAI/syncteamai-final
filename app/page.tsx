import Link from 'next/link';

export default function LandingPage() {
  return (
    <main
      className="relative flex h-screen w-full flex-col items-center bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/RobotTeam.webp')" }}
    >
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Top Header Content */}
      <div className="relative z-10 w-full pt-10 px-4">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Assemble Your Dream Team of AI Minds
          <br />
          All Working together for You
        </h1>
      </div>

      {/* Bottom Call-to-Action Content */}
      <div className="absolute bottom-24 z-10 flex w-full flex-col items-center px-4">
        <p className="max-w-3xl text-lg leading-8 text-gray-300">
          Direct the future of creation.<br />Assemble specialized AI agents
          <br />
          Watch them collaborate in real-time.
        </p>
        <div className="mt-8">
<Link
  href="/login"
  className="
    rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white /* Changed default to bg-blue-500 */
    shadow-lg 
    transition-all duration-150 
    hover:bg-blue-600 /* Added a slightly darker hover state */
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue
    
    /* --- Pressed effect --- */
    active:translate-y-px active:shadow-inner active:bg-blue-700 /* Darkens on press */
  "
>
  Start Building Your AI Council
</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 z-10 w-full text-center text-xs text-gray-400">
        © 2025 NeuroSync AI Dynamics (Pty) Ltd. All Rights Reserved. | Version 1.1
      </footer>
    </main>
  );
}