/*
https://docs.nestjs.com/controllers#controllers
*/

import { MeetingDto, UserDto } from '@app/dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../get-user.destructor';
import { MeetingService } from '../services/meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('instant')
  instantMeeting(@Body() meeting: MeetingDto, @GetUser() user: UserDto) {
    // console.log('user: ', user);
    meeting.host = user?.email;
    return this.meetingService.instantMeeting(meeting);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('schedule')
  scheduleMeeting(
    @Body() meeting: MeetingDto,
    @GetUser() user: UserDto,
    @Req() req,
  ) {
    meeting.host = user?.email;
    // console.log('user: ', user);
    return this.meetingService.scheduleMeeting(meeting);
  }
  @Get(':id')
  getMeeting(@Param('id') id: string) {
    return this.meetingService.getMeeting(id);
  }
  @('meeting-code')
  getMeetingByCode(@Param('id') roomId: string) {
    return this.meetingService.getMeetingByCode(roomId);
  }
}
