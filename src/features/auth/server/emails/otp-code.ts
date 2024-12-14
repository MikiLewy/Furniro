'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPCodeEmail = async (email: string, otpCode: string) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'One-Time Password',
    html: `<p>Here is your one-time password to log in ${otpCode}</p>`,
  });

  if (data) return data;

  if (error) return error;
};
