import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller()                    // ← Empty (no 'contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('api/contact')           // ← Explicit full path
  send(@Body() body: ContactDto) {
    return this.contactService.sendMail(body);
  }
}