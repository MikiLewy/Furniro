'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your email',
    html: '<p>Click <a href="https://example.com/verify-email">here</a> to verify your email.</p>',
  });

  if (data) return data;

  if (error) return error;
};
