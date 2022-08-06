import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
  @Prop()
  password: string;

  @Prop()
  accountType: string;
  constructor() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.password = '';
    this.accountType = '';
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
