/*
https://docs.nestjs.com/providers#services
*/

import { MeetingDto } from '@app/dto';
import { Meeting, MeetingDocument } from '@app/schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
  ) {}
  async getMeeting(id: string) {
    return await this.meetingModel.findOne({ _id: id });
  }
  async scheduleMeeting(meeting: MeetingDto) {
    const saved = await this.meetingModel.create(meeting);
    // send email
    return saved;
  }
  async instantMeeting(meeting: MeetingDto) {
    return await this.meetingModel.create(meeting);
  }
}
