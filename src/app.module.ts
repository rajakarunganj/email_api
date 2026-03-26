import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContactModule,
  ],
})
export class AppModule {}