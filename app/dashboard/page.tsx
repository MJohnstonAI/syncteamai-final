import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Canvas from "./Canvas"; // Corrected path
import Sidebar from "./Sidebar"; // Corrected path

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect('/');
  }

  const plan = user.publicMetadata?.plan as string | undefined;
  if (!plan) {
    redirect('/subscribe');
  }

  return (
    <main className="flex h-screen w-full">
      <Sidebar />
      <Canvas userPlan={plan} />
    </main>
  );
}