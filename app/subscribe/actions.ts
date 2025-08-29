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

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        plan: "FREE",
        securityMode: securityMode,
      },
    });

  } catch (err: unknown) { // --- This is the corrected part ---
    // We explicitly type 'err' as 'unknown' for maximum type safety
    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Error choosing free plan:", errorMessage);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}