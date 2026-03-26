import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ContactDto {
  @ApiProperty({
    example: 'Itachi Uchiha',
    description: 'Name of the user',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'itachi@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Regarding Event',
    description: 'Subject of the message',
  })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: 'I would like to know more about the event details.',
    description: 'Message content',
    minLength: 10,
  })
  @IsNotEmpty()
  @MinLength(10)
  message: string;
}