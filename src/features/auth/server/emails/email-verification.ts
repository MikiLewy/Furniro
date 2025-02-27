'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
) => {
  const verifyEmailLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/verify-email?token=${verificationToken}`;

  const { data, error } = await resend.emails.send({
    from: `Acme <noreply@${process.env.DOMAIN}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verifyEmailLink}">here</a> to verify your email.</p>`,
  });

  if (data) return data;

  if (error) return error;
};
