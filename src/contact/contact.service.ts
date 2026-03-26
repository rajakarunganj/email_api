import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendMail(data: ContactDto) {
    try {
      // ✅ check ENV (important)
      if (!process.env.EMAIL_TO) {
        throw new Error("EMAIL_TO not set in .env");
      }

      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY not set in .env");
      }

      await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.EMAIL_TO, // ✅ now safe
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
      console.error("❌ EMAIL ERROR:", error);

      throw new InternalServerErrorException(
        'Failed to send email. Check server logs.'
      );
    }
  }
}