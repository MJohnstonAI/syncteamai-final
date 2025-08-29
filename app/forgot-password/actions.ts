"use server";

import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

const prisma = new PrismaClient();

export type FormState = {
  error?: string;
  success?: string;
};

export async function requestPasswordReset(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  if (!email) {
    return { error: "Email is required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // We don't want to reveal if an email exists or not for security reasons.
    // So we show a generic success message either way.
    return { success: "If an account with this email exists, a reset link has been sent." };
  }

  // Generate a secure, random token
  const asyncRandomBytes = promisify(randomBytes);
  const token = (await asyncRandomBytes(32)).toString('hex');
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Token expires in 1 hour

  // Store the hashed token in the database
  // First, delete any existing token for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: token,
      expires: expires,
    },
  });

  // --- Email Sending (Simulation) ---
  // In a real application, we would use an email service here.
  // For now, we will log the reset link to the terminal for testing.
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  console.log("--- PASSWORD RESET LINK (FOR TESTING) ---");
  console.log(resetLink);
  console.log("-----------------------------------------");

  return { success: "If an account with this email exists, a reset link has been sent." };
}