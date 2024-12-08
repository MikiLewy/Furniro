'use server';

import { createSafeActionClient } from 'next-safe-action';
import { resetPasswordSchema } from '../types/reset-password-schema';
import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';
import { generateResetPasswordToken } from './tokens/generate-reset-password-token';
import { sendForgotPasswordEmail } from '../emails/forgot-password';

const actionClient = createSafeActionClient();

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await getUserFromDbByEmail(email);

    if (!user) {
      return { error: 'User not found.' };
    }

    const resetPasswordToken = await generateResetPasswordToken(email);

    if (!resetPasswordToken) {
      return { error: 'Error generating reset password token.' };
    }

    await sendForgotPasswordEmail(email, resetPasswordToken?.[0]?.token);

    return { success: 'Password reset email sent!' };
  });
