import { MeetingService } from './services/meeting.service';
import { MeetingController } from './controllers/meeting.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Meeting, MeetingSchema } from '@app/schema';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
