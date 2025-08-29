"use server";

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

const prisma = new PrismaClient();

export type FormState = {
  error?: string;
  success?: string;
};

// This is the single, combined function for the entire flow
export async function resetPassword(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const email = formData.get("email") as string | null;
    const token = formData.get("token") as string | null;
    const password = formData.get("password") as string | null;
    const passwordConfirm = formData.get("passwordConfirm") as string | null;

    // STEP 1: User requests reset (only email provided)
    if (email && !token) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return { error: "This email is not registered." };
      }

      const asyncRandomBytes = promisify(randomBytes);
      const resetToken = (await asyncRandomBytes(32)).toString('hex');
      const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour expiry

      await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
      await prisma.passwordResetToken.create({
        data: { userId: user.id, token: resetToken, expires },
      });

      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
      console.log("--- PASSWORD RESET LINK (FOR TESTING) ---");
      console.log(resetLink);
      console.log("-----------------------------------------");

      return { success: "Password reset email sent!" };
    }

    // STEP 2: User sets new password (token and passwords provided)
    if (token && password && passwordConfirm) {
      if (password !== passwordConfirm) {
        return { error: "Passwords do not match." };
      }

      const tokenRecord = await prisma.passwordResetToken.findUnique({ where: { token } });
      if (!tokenRecord || tokenRecord.expires < new Date()) {
        return { error: "Invalid or expired reset token." };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: tokenRecord.userId },
        data: { hashedPassword },
      });
      await prisma.passwordResetToken.delete({ where: { id: tokenRecord.id } });

      return { success: "Password has been reset successfully!" };
    }

    return { error: "Invalid request." };

  } catch (err) {
    console.error("resetPassword error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}