/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findUsers() {
    console.log('finding all users');
    return this.userService.findUsers();
  }
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
  @Get('findbyemail/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Post('')
  createUser(@Body() userData) {
    return this.userService.createUser(userData);
  }

  @Put('/:id')
  updateUser(@Body() userData, @Param('id') id: string) {
    return this.userService.updateUser(id, userData);
  }
}
