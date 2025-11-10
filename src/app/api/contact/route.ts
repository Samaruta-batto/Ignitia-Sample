
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  college: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = formSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
    }
    
    const { name, email, college, message } = validation.data;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Message from Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>College:</strong> ${college}</p>
        <hr />
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
