import { currentUser } from "@clerk/nextjs/server";
import Canvas from "app/dashboard/Canvas";
import Sidebar from "app/dashboard/Sidebar";

export default async function DashboardPage() {
  const user = await currentUser();

  // We get the user's plan and security mode from the metadata we saved.
  // We provide default values in case they haven't been set yet.
  const plan = user?.publicMetadata?.plan || "FREE";
  const securityMode = user?.publicMetadata?.securityMode || "VAULT";

  return (
    <main className="flex h-screen w-full">
      <Sidebar />
      <Canvas
        userPlan={plan as string}
        securityMode={securityMode as string}
      />
    </main>
  );
}