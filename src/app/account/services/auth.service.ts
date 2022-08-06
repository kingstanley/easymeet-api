/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import { UserDto } from '@app/dto';
import { User, UserDocument } from '@app/schema';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signin(userData: UserDto): Promise<UserDto> {
    const { email, password } = userData;
    console.log(email, password);
    // Validate user input
    if (!(email && password)) {
      throw new BadRequestException('All input is required');
      // res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const { password, ...result } = user['_doc'];
      // const result = { ...user, token: '' };
      result['token'] = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY || environment.TOKEN_KEY || 'justalittlesecret',
        {
          expiresIn: '6h',
        },
      );

      // return result
      return result;
    }
    throw new BadRequestException('Invalid Credentials');
  }
}
