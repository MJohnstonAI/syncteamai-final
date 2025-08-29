"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type FormState = {
  error?: string;
};

export async function chooseFreePlan(prevState: FormState, formData: FormData): Promise<FormState> {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to choose a plan." };
  }

  try {
    const securityMode = formData.get("securityMode") as string;
    if (securityMode !== "VAULT" && securityMode !== "SPOTLIGHT") {
      return { error: "Invalid security mode selected." };
    }

    // Await the client to ensure it's ready
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        plan: "FREE",
        securityMode: securityMode,
      },
    });

  } catch (err: any) {
    // Log the actual error to the terminal for debugging
    console.error("Error choosing free plan:", err.message);
    return { error: "Something went wrong. Please try again." };
  }

  // This must be called outside the try/catch block
  redirect("/dashboard");
}