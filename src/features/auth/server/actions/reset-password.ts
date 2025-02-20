'use server';

import { createSafeActionClient } from 'next-safe-action';

import { sendForgotPasswordEmail } from '../emails/forgot-password';
import { resetPasswordSchema } from '../validation-schemas/reset-password-schema';

import { generateResetPasswordToken } from './tokens/generate-reset-password-token';
import { getUserFromDbByEmail } from './user/get-user-from-db-by-email';

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
