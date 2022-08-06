/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt = require('bcrypt');
import { UserDto } from '@app/dto';
import { User, UserDocument } from '@app/schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUsers(): Promise<UserDto[]> {
    return await this.userModel.find({});
  }
  async findUser(id: string): Promise<UserDto> {
    return await this.userModel.findOne({ _id: id });
  }
  async findUserByEmail(email: string): Promise<UserDto> {
    return await this.userModel.findOne({ email });
  }
  async createUser(user: UserDto): Promise<UserDto> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userModel.create(user);
  }
  async updateUser(id, user: UserDto) {
    return await this.userModel.updateOne({ _id: id }, { $set: user });
  }
}
