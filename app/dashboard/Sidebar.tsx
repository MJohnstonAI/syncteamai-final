import { UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  return (
    <aside className="flex h-full w-20 flex-shrink-0 flex-col items-center justify-between border-r border-gray-700 bg-black/20 p-4">
      <div>
        <h2 className="text-xs font-bold tracking-widest text-gray-400">COUNCIL</h2>
        {/* AI avatars will go here */}
      </div>
      <div>
        {/* This component from Clerk handles the user avatar and sign-out */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}