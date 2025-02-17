'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendForgotPasswordEmail = async (
  email: string,
  forgotPasswordToken: string,
) => {
  const verifyEmailLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/set-password?token=${forgotPasswordToken}`;

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${verifyEmailLink}">here</a> to reset your password.</p>`,
  });

  if (data) return data;

  if (error) return error;
};
