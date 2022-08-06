/*
https://docs.nestjs.com/controllers#controllers
*/

import { UserDto } from '@app/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  signin(@Body() user: UserDto) {
    return this.authService.signin(user);
  }
}
