import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop()
  title!: string;
  @Prop()
  description!: string;
  @Prop()
  startTime!: string;
  @Prop()
  endTime!: string;
  @Prop()
  host!: string;
  @Prop()
  date!: Date;
  @Prop() attendance!: Array<string>;
  @Prop()
  invites!: Array<string>; // emails to invite
  @Prop({ type: String, minlength: 4, maxlength: 8 })
  code!: string;
  @Prop()
  guests!: string;
  // constructor() {
  //   this.title = '';
  //   this.description = '';
  //   this.startTime = '';
  //   this.endTime = '';
  //   this.host = '';
  //   this.date = new Date();
  //   this.attendance = '';
  // }
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
MeetingSchema.pre('save', async function (next) {
  const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  this.code = Math.random().toString(36).substring(2, randomInteger(4, 8));
  next();
});
