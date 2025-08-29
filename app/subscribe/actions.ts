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

  } catch (err) { // --- This is the corrected part ---
    // We check if the error is an object with a message property
    if (err instanceof Error) {
      console.error("Error choosing free plan:", err.message);
    } else {
      console.error("An unknown error occurred:", err);
    }
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}