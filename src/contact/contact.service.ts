import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {

  async sendMail(data: ContactDto) {
    try {
      // ✅ check ENV first
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not set');
      }

      if (!process.env.EMAIL_TO) {
        throw new Error('EMAIL_TO not set');
      }

      // ✅ initialize AFTER env check
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.EMAIL_TO,
        subject: `New Message: ${data.subject}`,
        html: `
          <h2>📩 New Contact Message</h2>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Subject:</b> ${data.subject}</p>
          <p><b>Message:</b></p>
          <p>${data.message}</p>
        `,
      });

      return { message: 'Message sent successfully ✅' };

    } catch (error) {
      console.error('❌ EMAIL ERROR:', error);

      throw new InternalServerErrorException(
        error?.message || 'Failed to send email'
      );
    }
  }
}