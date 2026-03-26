import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Contact') // ✅ Groups in Swagger UI
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Send contact message' }) // ✅ endpoint description
  @ApiBody({ type: ContactDto }) // ✅ request body schema
  @ApiResponse({
    status: 201,
    description: 'Message sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  send(@Body() body: ContactDto) {
    return this.contactService.sendMail(body);
  }
}